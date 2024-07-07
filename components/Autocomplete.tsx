import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { cn } from "@/lib/utils";
import {
  ListEnd,
  Search,
  Square,
  SquareDashedMousePointer,
  SquareMousePointer,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { AutocompleteRef } from "@/interfaces/interfaces";
import { motion } from "framer-motion";
import {
  SquareArrowDown,
  SquareArrowUp,
  CornerDownLeft,
  Forward,
} from "lucide-react";

interface AutocompleteProps {
  hasIcon?: boolean;
  text: string;
  className?: string;
  suggestions: string[];
  params: URLSearchParams;
  setParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
  focusedLine: boolean[];
  onBlur: () => void;
  disabled: boolean;
}

const Autocomplete = forwardRef<AutocompleteRef, AutocompleteProps>(
  (
    {
      hasIcon = true,
      text,
      className,
      suggestions,
      params,
      setParams,
      focusedLine,
      onBlur,
      disabled,
    },
    ref,
  ) => {
    const router = useRouter();

    const [userInput, setUserInput] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>(
      [],
    );
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    // Combine internal ref with forwarded ref
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      select: () => {
        inputRef.current?.select();
      },
    }));

    useEffect(() => {
      if (userInput) {
        const unLinked = suggestions
          .filter(
            (suggestion) =>
              suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1,
          )
          .slice(0, 5);
        setFilteredSuggestions(unLinked);
        setActiveSuggestionIndex(0);
      } else {
        setFilteredSuggestions([]);
      }
    }, [userInput, suggestions]);

    const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
      e.currentTarget.select();
      //setShowSuggestions(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserInput(e.target.value);
      setShowSuggestions(true);
    };

    const handleClick = (suggestion: string) => {
      setUserInput(suggestion);
      setShowSuggestions(false);
      updateTerm(suggestion);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && filteredSuggestions.length > 0) {
        setUserInput(filteredSuggestions[activeSuggestionIndex]);
        updateTerm(filteredSuggestions[activeSuggestionIndex]);
        setShowSuggestions(false);
        inputRef.current?.blur();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveSuggestionIndex((prevIndex) =>
          prevIndex === filteredSuggestions.length - 1 ? 0 : prevIndex + 1,
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveSuggestionIndex((prevIndex) =>
          prevIndex === 0 ? filteredSuggestions.length - 1 : prevIndex - 1,
        );
      } else if (e.key === "Escape") {
        e.currentTarget.blur();
      }
    };

    const updateTerm = (search_term: string) => {
      const newParams = new URLSearchParams(params.toString());

      var searchTermToEdit;
      if (focusedLine[0]) {
        searchTermToEdit = "search_term1";
      } else if (focusedLine[1]) {
        searchTermToEdit = "search_term2";
      } else {
        searchTermToEdit = "search_term3";
      }

      newParams.set(searchTermToEdit, search_term);
      setParams(newParams);
      router.push(`?${newParams.toString()}`, { scroll: false });
    };

    return (
      <div
        className={cn(
          `
          relative flex w-fit items-center rounded-full bg-gradient-to-r from-[#232527] via-[#232527]
          to-[#3e354d] px-6 ring-4 ring-[#1f2023] transition-all focus-within:ring-2 focus-within:ring-purple focus:outline-none
          `,
          className,
        )}
      >
        <input
          ref={inputRef}
          placeholder={text}
          className="placeholder-transition z-10 w-full bg-transparent py-2.5 text-white placeholder:text-white/60 focus:outline-none disabled:text-white/50 disabled:placeholder:text-gray/50"
          type="text"
          value={userInput}
          onClick={handleInputClick}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            setShowSuggestions(false);
            onBlur();
          }}
          onFocus={() => {
            setShowSuggestions(true);
          }}
          disabled={disabled}
        />

        {hasIcon && <Search className="-mr-2 flex-shrink-0 p-0.5 text-white" />}

        <motion.div
          initial={{ height: 0 }}
          animate={{
            height: showSuggestions ? "fit-content" : 0,
          }}
          transition={{
            duration: 0.15,
            ease: [0.16, 1, 0.3, 1],
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
          className="absolute left-0 top-1/2 -z-10 w-full overflow-hidden rounded-b-3xl bg-[#1f2023] ring-2 ring-containerBorder"
        >
          <ul className="w-full pt-8 lg:mb-[52px]">
            <li className="px-6 pb-1 text-sm text-gray/50">Results:</li>
            {filteredSuggestions.map((suggestion, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  duration: 0.15,
                  ease: [0.76, 0, 0.24, 1],
                }}
                onClick={() => handleClick(suggestion)}
                className={`${index == activeSuggestionIndex ? "bg-[hsl(225,6%,14%)] pl-9 text-white" : "text-gray"} cursor-pointer px-6 py-2 transition-[padding] last:pb-2 hover:bg-[hsl(225,6%,14%)] hover:text-white`}
              >
                {suggestion}
              </motion.li>
            ))}
          </ul>

          <div className="absolute bottom-0 hidden w-full gap-4 bg-[hsl(225,6%,15%)] px-6 py-4 text-gray lg:flex">
            <div className="flex items-center">
              <SquareArrowDown className="size-5" />
              <SquareArrowUp className="size-5" />
              <p className="ml-1 text-sm">to navigate</p>
            </div>

            <div className="flex items-center">
              <div className="flex size-[17px] items-center justify-center rounded-[3px] border-[2px] border-gray p-[1px]">
                <CornerDownLeft className="stroke-[3px]" />
              </div>
              <SquareDashedMousePointer className="ml-[1.5px] size-5" />
              <p className="ml-1 text-sm">to select</p>
            </div>

            <div className="flex items-center">
              <div className="pointer-events-none flex h-[17px] w-[22px] select-none items-center justify-center rounded-[3px] border-[2px] border-gray p-[1px] text-[7px] font-bold">
                <span className="h-fit w-fit leading-[0px]">ESC</span>
              </div>
              <p className="ml-1 text-sm">to exit</p>
            </div>
          </div>
        </motion.div>
      </div>
    );
  },
);

// Set the display name for better debugging
Autocomplete.displayName = "Autocomplete";

export default Autocomplete;
