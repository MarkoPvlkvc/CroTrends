"use client";

import { ArrowRight } from "lucide-react";

interface ButtonProps {
  text: string;
}

const ButtonSecondary = ({ text }: ButtonProps) => {
  const handleLinkClick = (
    event: React.MouseEvent<HTMLElement>,
    targetId: string,
  ) => {
    event?.preventDefault();

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button className="flex gap-2 text-nowrap bg-transparent font-semibold text-purple">
      {text} <ArrowRight />
    </button>
  );
};

export default ButtonSecondary;
