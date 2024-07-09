import clsx from "clsx";
import { Activity, X } from "lucide-react";

interface SearchTermButtonProps {
  search_term: string;
  colorIndex: number;
  disabled: boolean;
  isFocused: boolean;
  isCompareActive: boolean;
  onClick: () => void;
  onRemoveClick: () => void;
}

type ColorIndex = 0 | 1 | 2;

const SearchTermButton = ({
  search_term,
  colorIndex,
  disabled,
  isFocused,
  isCompareActive,
  onClick,
  onRemoveClick,
}: SearchTermButtonProps) => {
  const buttonColorVariants = {
    0: "to-yellow/15 hover:bg-yellow/20",
    1: "to-pink/15 hover:bg-pink/20",
    2: "to-purple/15 hover:bg-purple/20",
  };

  const iconColorVariants = {
    0: "stroke-yellow group-disabled:stroke-yellow/50",
    1: "stroke-pink group-disabled:stroke-pink/50",
    2: "stroke-purple group-disabled:stroke-purple/50",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        isFocused
          ? "ring-2 ring-purple disabled:ring-purple/50 disabled:transition-colors"
          : "ring-4 ring-containerBorder enabled:hover:ring-[hsl(269,7%,68%)]",
        isCompareActive
          ? `bg-gradient-to-tr from-container via-container`
          : "bg-container",
        `group relative flex w-full flex-col justify-center rounded-3xl p-5 pr-10 text-start transition-all hover:ring-2 md:p-7 md:pr-12 lg:p-9 lg:pr-14`,
        buttonColorVariants[colorIndex as ColorIndex],
      )}
    >
      <p className="flex items-center text-lg font-bold transition-colors group-disabled:text-white/50 md:text-xl lg:text-2xl">
        {isCompareActive && (
          <Activity
            className={clsx(
              `mr-2 size-5 flex-shrink-0`,
              iconColorVariants[colorIndex as ColorIndex],
            )}
          />
        )}
        {search_term}
      </p>
      <p className="text-sm font-medium text-gray transition-colors group-disabled:text-gray/50 md:text-base">
        Type: Person
      </p>

      {isCompareActive && (
        <X
          onClick={(e) => {
            e.stopPropagation(); // Prevents the parent div's onClick from firing
            onRemoveClick();
          }}
          className="absolute right-0 top-0 m-4 text-gray hover:text-white group-disabled:text-gray/50"
        />
      )}
    </button>
  );
};

export default SearchTermButton;
