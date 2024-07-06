import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: "#121316",
        white: "#EBECEF",
        gray: "#6A6B6D",
        darkGray: "#1D1E20",
        purple: "#AB86D3",
        pink: "#FF8CBC",
        yellow: "#FFDEBD",
        container: "#161b22e6",
        containerBorder: "#28292c",
        containerElevated: "#1f2023",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      clipPath: {
        "about-lg": "polygon(0 20%, 100% 0, 100% 80%, 0% 100%)",
        "about-md": "polygon(0 15%, 100% 0, 100% 85%, 0% 100%)",
        about: "polygon(0 10%, 100% 0, 100% 90%, 0% 100%)",
        rectangle: "polygon(0 70%, 100% 0, 100% 30%, 0 100%)",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, theme, e }) {
      const clipPath = theme("clipPath") as Record<string, string>;
      const utilities = Object.keys(clipPath).map((key) => ({
        [`.${e(`clip-${key}`)}`]: {
          "clip-path": clipPath[key],
        },
      }));

      addUtilities(utilities);
    }),
  ],
};

export default config;
