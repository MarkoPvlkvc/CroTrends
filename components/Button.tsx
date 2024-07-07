"use client";

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
        "group relative flex items-center justify-center overflow-hidden rounded-full bg-gray px-6 py-2 font-bold text-black transition-all hover:rotate-3 hover:scale-105",
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
