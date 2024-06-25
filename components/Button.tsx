import { cn } from "@/lib/utils";

interface ButtonProps {
  text?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

const Button = ({ text, className, onClick, disabled }: ButtonProps) => {
  return (
    <button
      className={cn(
        "rounded-full bg-gray px-6 py-2 font-bold text-black",
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
