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
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
        serif: ['"Instrument Serif"', "serif"],
        mono: ['"Space Mono"', "monospace"],
      },
      colors: {
        canvas: "#FBF9F4",
        surface: "#FFFFFF",
        ink: "#181511",
        terracotta: "#E75A3C",
        terracottaLight: "#FDF0ED",
        wasabi: "#D4E882",
        wasabiDark: "#4A5B11",
        sunflower: "#FCD34D",
        borderInk: "#181511",
      },
      boxShadow: {
        "brutal-sm": "2px 2px 0px #181511",
        brutal: "3.5px 3.5px 0px #181511",
        "brutal-lg": "5px 5px 0px #181511",
      },
    },
  },
  plugins: [],
};
export default config;
