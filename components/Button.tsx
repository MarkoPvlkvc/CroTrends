import { cn } from "@/lib/utils";

const Button = ({ text, className }: { text?: string; className?: string }) => {
  return (
    <button
      className={cn(
        "rounded-full bg-gray px-6 py-2 font-bold text-black",
        className,
      )}
    >
      {text}
    </button>
  );
};

export default Button;
