"use client";

import { ArrowRight } from "lucide-react";

interface ButtonProps {
  text: string;
  href: string;
}

const ButtonSecondary = ({ text, href }: ButtonProps) => {
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
    <button
      onClick={(event) => handleLinkClick(event, href)}
      className="flex gap-2 text-nowrap bg-transparent py-2 font-semibold text-purple transition-transform hover:rotate-3 hover:scale-105"
    >
      {text} <ArrowRight />
    </button>
  );
};

export default ButtonSecondary;
