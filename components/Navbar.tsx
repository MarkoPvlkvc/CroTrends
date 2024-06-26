"use client";

import { useState } from "react";
import Button from "./Button";
import { Menu } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const [isDropdownOpen, setDropdownIsOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownIsOpen((prev) => !prev);
  };

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
    <nav className="sticky top-2 z-20 grid h-fit w-[85%] max-w-4xl grid-cols-[auto_1fr] items-center rounded-full bg-black/75 p-3 backdrop-blur-lg lg:w-full lg:grid-cols-[auto_1fr_auto]">
      <Link href="/">
        <img
          src="CroTrends-cropped.svg"
          className="pointer-events-none my-1.5 ml-4 h-7 select-none"
        />
      </Link>

      <div className="hidden justify-center gap-8 text-xl font-medium text-gray lg:flex">
        <button
          onClick={(event) => handleLinkClick(event, "#home")}
          className="bg-transparent transition-colors hover:text-white"
        >
          Home
        </button>
        <button
          onClick={(event) => handleLinkClick(event, "#howItWorks")}
          className="bg-transparent transition-colors hover:text-white"
        >
          How it works
        </button>
        <button
          onClick={(event) => handleLinkClick(event, "#about")}
          className="bg-transparent transition-colors hover:text-white"
        >
          About
        </button>
        <button
          onClick={(event) => handleLinkClick(event, "#contact")}
          className="bg-transparent transition-colors hover:text-white"
        >
          Contact
        </button>
      </div>

      <Link href="/explore" className="hidden lg:block">
        <Button text="Explore" />
      </Link>

      <div className="relative justify-self-end lg:hidden">
        <button
          onClick={handleDropdownToggle}
          className="flex size-10 items-center justify-center rounded-full bg-[#1f2023] hover:cursor-pointer"
        >
          <Menu className="size-5 text-gray" />
        </button>

        <div
          className={`${isDropdownOpen ? "block" : "hidden"} absolute right-0 top-14 rounded-3xl bg-[#1f2023] pt-4 font-medium text-gray backdrop-blur-lg`}
        >
          <button
            onClick={(event) => handleLinkClick(event, "#home")}
            className="w-full px-6 py-2 text-start hover:text-white"
          >
            Home
          </button>
          <button
            onClick={(event) => handleLinkClick(event, "#howItWorks")}
            className="w-full text-nowrap px-6 py-2 text-start hover:text-white"
          >
            How it works
          </button>
          <button
            onClick={(event) => handleLinkClick(event, "#about")}
            className="w-full px-6 py-2 text-start hover:text-white"
          >
            About
          </button>
          <button
            onClick={(event) => handleLinkClick(event, "#contact")}
            className="w-full px-6 py-2 text-start hover:text-white"
          >
            Contact
          </button>
          <div className="w-full px-6 py-6">
            <Link href="/explore">
              <button className="rounded-full bg-purple px-6 py-2 font-bold text-black">
                Explore
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
