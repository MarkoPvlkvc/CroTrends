import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface AutocompleteProps {
  hasIcon?: boolean;
  text: string;
  className?: string;
  suggestions: string[];
  params: URLSearchParams;
  setParams: React.Dispatch<React.SetStateAction<URLSearchParams>>;
}

const Autocomplete = ({
  hasIcon = true,
  text,
  className,
  suggestions,
  params,
  setParams,
}: AutocompleteProps) => {
  const router = useRouter();

  const [userInput, setUserInput] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (userInput) {
      const unLinked = suggestions.filter(
        (suggestion) =>
          suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1,
      );
      setFilteredSuggestions(unLinked);
      setActiveSuggestionIndex(0);
    } else {
      setFilteredSuggestions([]);
    }
  }, [userInput, suggestions]);

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.select();
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
    }
  };

  const updateTerm = (search_term: string) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set("search_term", search_term);
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
        className="z-10 w-full bg-transparent py-2.5 text-white focus:outline-none"
        type="text"
        value={userInput}
        onClick={handleInputClick}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      {hasIcon && <Search className="-mr-2 flex-shrink-0 p-0.5 text-white" />}

      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="absolute top-1/2 -z-10 -ml-6 mt-[2px] max-h-64 w-full overflow-y-auto rounded-b-3xl bg-[#1f2023] pt-8 ring-2 ring-white/10">
          <li className="mb-1 px-6 text-sm text-gray/50">Results:</li>
          {filteredSuggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleClick(suggestion)}
              className={`${index == activeSuggestionIndex ? "bg-white/[0.03] pl-9 text-white" : "text-gray"} hover:bg-gray-600 cursor-pointer px-6 py-2 transition-all last:mb-2 hover:bg-white/[0.03] hover:text-white`}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
