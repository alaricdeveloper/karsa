import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ['"Instrument Serif"', "serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        sand: {
          50: "#FBFBFA",
          100: "#F5F5F3",
          200: "#EBEBE8",
          300: "#DDDCD7",
          700: "#4A4844",
          800: "#2A2927",
          900: "#171615",
        },
      },
    },
  },
  plugins: [],
};
export default config;
