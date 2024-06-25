"use client";

import Input from "@/components/Input";
import Autocomplete from "@/components/Autocomplete";
import React, { PureComponent, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Button from "@/components/Button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { PostgrestError } from "@supabase/supabase-js";
import Graph from "@/components/Graph";
import { useRouter, useSearchParams } from "next/navigation";

/* const mockData = [
  {
    publication_date: "Mon",
    count: 3,
  },
  {
    publication_date: "Tue",
    count: 5,
  },
  {
    publication_date: "Wed",
    count: 3,
  },
  {
    publication_date: "Thu",
    count: 3,
  },
  {
    publication_date: "Fri",
    count: 5,
  },
  {
    publication_date: "Sat",
    count: 1,
  },
  {
    publication_date: "Sun",
    count: 6,
  },
]; */

interface TermData {
  publication_date: string;
  article_count: number;
}

type TimeInterval = "All Time" | "Year" | "Month" | "Week";

export default function Explore() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [params, setParams] = useState(() => {
    const initialParams = new URLSearchParams(searchParams.toString());
    if (!initialParams.get("search_term")) {
      initialParams.set("search_term", "Mate Rimac");
    }
    if (!initialParams.get("time_interval")) {
      initialParams.set("time_interval", "Week");
    }
    return initialParams;
  });

  const [terms, setTerms] = useState<TermData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  const [activeTimeInterval, setActiveTimeInterval] = useState({
    "All Time": false,
    Year: false,
    Month: false,
    Week: false,
  });

  const handleButtonClick = (interval: string) => {
    setActiveTimeInterval({
      "All Time": false,
      Year: false,
      Month: false,
      Week: false,
      [interval]: true,
    });

    updateTime(interval);
  };

  const supabase = createClient();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const term = params.get("search_term");

      const { data, error } = await supabase.rpc(
        "get_term_count_last_time_interval",
        {
          search_term: term,
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
  }, [params]);

  // This needs to be after the params useState
  useEffect(() => {
    // Sync URL with initial params
    router.push(`?${params.toString()}`, { scroll: false });

    const timeInterval = params.get("time_interval") || "Week";
    setActiveTimeInterval({
      "All Time": timeInterval === "All Time",
      Year: timeInterval === "Year",
      Month: timeInterval === "Month",
      Week: timeInterval === "Week",
    });
  }, []);

  const updateTime = (time_interval: string) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set("time_interval", time_interval);
    setParams(newParams);
    router.push(`?${newParams.toString()}`, { scroll: false });
  };

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

  return (
    <main className="flex flex-col items-center">
      <nav className="mt-5 grid h-fit w-[85%] max-w-4xl grid-cols-[auto_1fr] items-center rounded-full bg-black/75 backdrop-blur-lg md:mt-10 lg:mt-20 lg:w-full">
        <Link href="/">
          <img src="CroTrends-cropped.svg" className="mx-7 my-[18px] h-7" />
        </Link>
        <Autocomplete
          text="Search for trends..."
          className="w-full"
          suggestions={suggestions}
          params={params}
          setParams={setParams}
        />
      </nav>

      <section className="flex w-full flex-col items-center px-6">
        <div className="mt-9 grid w-full max-w-screen-lg grid-cols-2 gap-2 md:mt-12 lg:mt-20">
          <div className="flex w-full flex-col justify-center rounded-3xl border-2 border-white/10 bg-container p-5 font-bold transition-all hover:cursor-pointer hover:border-white/50 md:p-7 lg:p-9">
            <p className="text-lg md:text-xl lg:text-2xl">
              {params.get("search_term")}
            </p>
            <p className="text-sm text-gray md:text-base">Type: Person</p>
          </div>
          <div className="flex w-full flex-col justify-center rounded-3xl border-2 border-dashed border-white/5 bg-container/25 p-5 font-bold transition-all hover:cursor-pointer hover:border-white/50 md:p-7 lg:p-9">
            <p className="flex items-center text-base text-gray md:text-lg lg:text-xl">
              <Plus className="mr-2" />
              Compare
            </p>
          </div>
          <div className="col-span-2 flex w-full flex-wrap justify-start gap-2 rounded-3xl border-2 border-white/5 bg-container/25 p-3 font-bold">
            {Object.keys(activeTimeInterval).map((interval) => (
              <Button
                key={interval}
                text={interval}
                className={`${activeTimeInterval[interval as TimeInterval] ? "bg-purple disabled:bg-purple/50" : "enabled:hover:bg-white disabled:bg-gray/50"} w-fit transition-all`}
                onClick={() => handleButtonClick(interval)}
                disabled={loading}
              />
            ))}
          </div>
        </div>
        <div className="mt-9 flex h-[350px] w-full max-w-screen-lg items-center justify-center rounded-3xl border-2 border-white/10 bg-container p-5 md:p-7 lg:p-9">
          <Graph terms={terms} loading={loading} error={error} />
        </div>
      </section>
    </main>
  );
}
