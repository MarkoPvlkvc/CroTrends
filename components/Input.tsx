import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const Input = ({
  hasIcon = true,
  text,
  className,
}: {
  hasIcon?: boolean;
  text: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        `
      flex w-fit items-center gap-12 rounded-full px-6
      transition-all focus-within:outline-none focus-within:ring-2 focus-within:ring-purple
      `,
        className,
      )}
    >
      <input
        placeholder={text}
        className="w-full bg-transparent py-2.5 text-white focus:outline-none"
        type="text"
      />
      {hasIcon && <Search className="-mr-2 flex-shrink-0 p-0.5 text-white" />}
    </div>
  );
};

export default Input;
