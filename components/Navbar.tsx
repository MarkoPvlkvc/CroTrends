"use client";

import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const dropdownVariants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.1,
      staggerChildren: 0.05,
      duration: 0.15,
      ease: [0.16, 1, 0.3, 1],
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
};

const buttonVariants = {
  hidden: {
    opacity: 0,
    y: -10,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isButtonPurple, setIsButtonPurple] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
    console.log(isDropdownOpen);
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

    setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => {
        const secondSection = document.querySelectorAll("section")[1];

        const rect = secondSection.getBoundingClientRect();

        if (rect.top < 10 && !isButtonPurple) {
          setIsButtonPurple(true);
        } else if (rect.top > 10 && isButtonPurple) {
          setIsButtonPurple(false);
        }
      };

      window.addEventListener("scroll", handleScroll);

      // Cleanup the event listener on component unmount
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [isButtonPurple]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("click", handleClickOutside);
      document.body.style.overflowY = "hidden";
    } else {
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflowY = "auto";
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav
      style={{ WebkitBackdropFilter: "blur(16px)" }}
      className="sticky top-2 z-20 grid h-fit w-[85%] max-w-4xl grid-cols-[auto_1fr] items-center rounded-full bg-black/75 p-3 backdrop-blur-lg lg:w-full lg:grid-cols-[auto_1fr_auto]"
    >
      <button onClick={(event) => handleLinkClick(event, "#home")}>
        <img
          src="CroTrends-cropped.svg"
          className="pointer-events-none my-1.5 ml-4 h-7 select-none"
        />
      </button>

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
        <Button
          text="Explore"
          className={`${isButtonPurple ? "bg-purple" : ""} ring-[hsl(269,7%,68%)] hover:bg-[hsl(269,7%,68%)]`}
        />
      </Link>

      <div className="relative justify-self-end lg:hidden">
        <button
          onClick={handleDropdownToggle}
          className="flex size-10 items-center justify-center rounded-full bg-containerElevated hover:cursor-pointer"
        >
          <Menu className="size-5 text-gray" />
        </button>

        <motion.div
          initial="hidden"
          animate={isDropdownOpen ? "visible" : "hidden"}
          variants={dropdownVariants}
          className={`${isDropdownOpen ? "" : "hidden"} absolute right-0 top-14 w-64 overflow-hidden rounded-3xl border-2 border-containerBorder bg-containerElevated font-medium text-gray`}
          ref={dropdownRef}
        >
          <motion.button
            variants={buttonVariants}
            onClick={(event) => handleLinkClick(event, "#home")}
            className="mt-6 w-full px-8 py-2 text-start hover:text-white"
          >
            Home
          </motion.button>
          <motion.button
            variants={buttonVariants}
            onClick={(event) => handleLinkClick(event, "#howItWorks")}
            className="w-full text-nowrap px-8 py-2 text-start hover:text-white"
          >
            How it works
          </motion.button>
          <motion.button
            variants={buttonVariants}
            onClick={(event) => handleLinkClick(event, "#about")}
            className="w-full px-8 py-2 text-start hover:text-white"
          >
            About
          </motion.button>
          <motion.button
            variants={buttonVariants}
            onClick={(event) => handleLinkClick(event, "#contact")}
            className="w-full px-8 py-2 text-start hover:text-white"
          >
            Contact
          </motion.button>
          <div className="mb-2 w-full px-8 py-6">
            <Link href="/explore">
              <motion.button
                variants={buttonVariants}
                className={`${isButtonPurple ? "bg-purple" : "bg-gray hover:bg-[hsl(269,7%,68%)]"} rounded-full px-6 py-2 font-bold text-black transition-colors`}
              >
                Explore
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
