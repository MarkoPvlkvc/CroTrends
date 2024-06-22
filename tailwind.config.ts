import type { Config } from "tailwindcss";

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
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
