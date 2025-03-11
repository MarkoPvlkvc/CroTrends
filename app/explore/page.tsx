"use client";

import Autocomplete from "@/components/Autocomplete";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/Button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";
import Graph from "@/components/Graph";
import { useRouter, useSearchParams } from "next/navigation";
import { TermData, AutocompleteRef } from "@/interfaces/interfaces";
import SearchTermButton from "@/components/SearchTermButton";

const suggestions = [
  "Jadranka Kosor",
  "Kornati",
  "Hajduk",
  "Zagreb",
  "Rade Šerbedžija",
  "Mia Dimšić",
  "Ivan Penava",
  "Vesna Pisarović",
  "USKOK",
  "Zdravko Mamić",
  "Dino Merlin",
  "Socijaldemokratska partija Hrvatske (SDP)",
  "Zoran Milanović",
  "Ivo Josipović",
  "Davor Bernardić",
  "Severina Vučković",
  "UEFA Euro",
  "Eurovision",
  "Europska Unija",
  "Mate Rimac",
  "Trg Bana Jelačića",
  "Zlatko Dalić",
  "Velebit",
  "Hvar",
  "Stjepan Mesić",
  "Plitvička jezera",
  "Hrvatska demokratska zajednica (HDZ)",
  "Luka Modrić",
  "Kolinda Grabar-Kitarović",
  "Nina Badrić",
  "Hrvatska gorska služba spašavanja (HGSS)",
  "Hrvatski sabor",
  "Hrvatski autoklub (HAK)",
  "Šibenik",
  "Sandra Perković",
  "Pula",
  "Dinamo",
  "Dalmacija",
  "Andrej Plenković",
  "Tomislav Karamarko",
  "Hrvatski nogometni savez",
];

type TimeInterval = "All Time" | "Year" | "Month" | "Week";

const ExploreClient = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const autocompleteRef = useRef<AutocompleteRef>(null);
  const isAddingNew = useRef(false);

  const [params, setParams] = useState(() => {
    const initialParams = new URLSearchParams(searchParams.toString());
    if (!initialParams.get("search_term1")) {
      initialParams.set("search_term1", "Mate Rimac");
    }
    if (!initialParams.get("time_interval")) {
      initialParams.set("time_interval", "Week");
    }
    return initialParams;
  });

  const [terms, setTerms] = useState<TermData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  // Starting time interval, focused line, and active lines
  const timeInterval = params.get("time_interval") || "Week";
  const startingTimeInterval = {
    "All Time": timeInterval === "All Time",
    Year: timeInterval === "Year",
    Month: timeInterval === "Month",
    Week: timeInterval === "Week",
  };

  const nonNullTermsCount = [
    params.get("search_term1"),
    params.get("search_term2"),
    params.get("search_term3"),
  ].filter(Boolean).length;

  const startingFocusedLine = [false, false, false].map(
    (_, index) => index === nonNullTermsCount - 1,
  );

  const [activeTimeInterval, setActiveTimeInterval] =
    useState(startingTimeInterval);
  const [focusedLine, setFocusedLine] = useState(startingFocusedLine);
  // 1, 2, or 3 lines
  const [activeLines, setActiveLines] = useState(nonNullTermsCount);
  // // //

  const handleTimeIntervalButtonClick = (interval: string) => {
    if (activeTimeInterval[interval as TimeInterval]) {
      return;
    }

    setActiveTimeInterval({
      "All Time": false,
      Year: false,
      Month: false,
      Week: false,
      [interval]: true,
    });

    updateTime(interval);
  };

  const handleFocusedLineButtonClick = (line: number) => {
    setFocusedLine(focusedLine.map((_, index) => index === line));

    autocompleteRef.current?.select();

    isAddingNew.current = true;
  };

  const handleCompareButtonClick = () => {
    handleFocusedLineButtonClick(activeLines);
  };

  const autocompleteOnBlur = () => {
    if (focusedLine.indexOf(true) == activeLines) {
      setFocusedLine(focusedLine.map((_, index) => index === activeLines - 1));
      isAddingNew.current = false;
    }
  };

  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const term1 = params.get("search_term1");
      const term2 = params.get("search_term2");
      const term3 = params.get("search_term3");

      const { data, error } = await supabase.rpc(
        "get_combined_term_count_last_time_interval",
        {
          search_term1: term1,
          search_term2: term2,
          search_term3: term3,
          time_interval: params.get("time_interval"),
        },
      );
      if (error) {
        setError(error);
      } else {
        setTerms(data);
      }
      setLoading(false);
    }

    fetchData();

    setActiveLines(nonNullTermsCount);

    if (!isAddingNew.current) {
      setFocusedLine(
        focusedLine.map((_, index) => index === nonNullTermsCount - 1),
      );
    }
  }, [params]);

  // This needs to be after the params useState
  useEffect(() => {
    // Sync URL with initial params
    router.push(`?${params.toString()}`, { scroll: false });
  }, []);

  const updateTime = (time_interval: string) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set("time_interval", time_interval);
    setParams(newParams);
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  const deleteTerm = (search_term: string) => {
    const newParams = new URLSearchParams(params.toString());
    const terms = ["search_term1", "search_term2", "search_term3"];

    // Find the index of the term to delete
    const indexToDelete = terms.indexOf(search_term);

    if (indexToDelete > -1) {
      // Shift the terms to fill the gap
      for (let i = indexToDelete; i < terms.length - 1; i++) {
        const nextTerm = terms[i + 1];
        if (newParams.has(nextTerm)) {
          newParams.set(terms[i], newParams.get(nextTerm) as string);
        } else {
          newParams.delete(terms[i]);
          break;
        }
      }
      newParams.delete(terms[terms.length - 1]);
    }

    setParams(newParams);
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

  const searchTerms = [
    params.get("search_term1") || "",
    params.get("search_term2") || "",
    params.get("search_term3") || "",
  ];

  return (
    <main className="flex flex-col items-center">
      <nav className="relative z-20 mt-5 grid h-fit w-[85%] max-w-4xl grid-cols-[auto_1fr] items-center rounded-full md:mt-10 lg:mt-20 lg:w-full">
        <div className="mx-7 my-[18px] transition-transform hover:rotate-6 hover:scale-105">
          <Link href="/">
            <img
              src="CroTrends-cropped.svg"
              className="pointer-events-none h-7 select-none"
            />
          </Link>
        </div>
        <Autocomplete
          ref={autocompleteRef}
          text="Search for trends..."
          className="w-full"
          suggestions={suggestions}
          params={params}
          setParams={setParams}
          focusedLine={focusedLine}
          onBlur={autocompleteOnBlur}
          disabled={loading}
        />
      </nav>

      <section className="flex w-full flex-col items-center px-6">
        <div
          className={`${activeLines > 1 ? "sm:grid-cols-3" : "sm:grid-cols-2"} mt-9 grid w-full max-w-screen-lg grid-cols-1 gap-4 md:mt-12 lg:mt-20`}
        >
          {searchTerms.slice(0, activeLines).map((search_term, index) => (
            <SearchTermButton
              key={search_term}
              search_term={search_term}
              colorIndex={index}
              disabled={loading}
              isFocused={focusedLine[index]}
              isCompareActive={activeLines > 1}
              onClick={() => handleFocusedLineButtonClick(index)}
              onRemoveClick={() => deleteTerm("search_term" + (index + 1))}
            />
          ))}

          {activeLines < 3 && (
            <button
              onClick={() => handleCompareButtonClick()}
              disabled={loading}
              className={`${focusedLine.indexOf(true) == activeLines ? "border-purple text-purple" : "border-white/5 text-gray hover:text-[hsl(269,7%,68%)] enabled:hover:border-[hsl(269,7%,68%)]"} group flex w-full flex-col justify-center rounded-3xl border-2 border-dashed bg-container/25 p-5 text-start transition-all md:p-7 lg:p-9`}
            >
              <p className="flex items-center font-bold group-disabled:text-gray/50 md:text-lg lg:text-xl">
                <Plus className="mr-2" />
                Compare
              </p>
            </button>
          )}
          <div
            className={`${activeLines > 1 ? "sm:col-span-3" : "sm:col-span-2"} flex w-full flex-wrap justify-start gap-2 rounded-3xl border-2 border-containerElevated bg-container/25 p-3 font-bold`}
          >
            {Object.keys(activeTimeInterval).map((interval) => (
              <Button
                key={interval}
                text={interval}
                className={`${activeTimeInterval[interval as TimeInterval] ? "bg-purple disabled:bg-purple/50" : "enabled:hover:bg-[hsl(269,7%,68%)] disabled:bg-gray/50"} w-fit disabled:transition-colors`}
                onClick={() => handleTimeIntervalButtonClick(interval)}
                disabled={loading}
              />
            ))}
          </div>
        </div>
        <div className="mt-9 flex h-[350px] w-full max-w-screen-lg items-center justify-center rounded-3xl border-2 border-containerBorder bg-container p-5 md:p-7 lg:p-9">
          <Graph
            terms={terms}
            loading={loading}
            error={error}
            activeLines={activeLines}
          />
        </div>
      </section>
    </main>
  );
};

export default function Explore() {
  return (
    <Suspense fallback={<div className="text-2xl font-bold">Loading...</div>}>
      <ExploreClient />
    </Suspense>
  );
}
