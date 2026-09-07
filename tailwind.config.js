/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
        display: ['"Bricolage Grotesque"', "sans-serif"],
        serif: ['"Instrument Serif"', "serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        canvas: "#F4F0E6",
        surface: "#FFFFFF",
        ink: "#0D0D0D",
        brutalYellow: "#F1CF69",
        brutalCyan: "#70D6FF",
        brutalPink: "#FF70A6",
        brutalGreen: "#7AE582",
        sand: "#EAE4D6",
        terracotta: "#E75A3C",
        terracottaLight: "#FDF0ED",
        wasabi: "#D4E882",
        wasabiDark: "#4A5B11",
        sunflower: "#FCD34D",
        borderInk: "#0D0D0D",
      },
      boxShadow: {
        "brutal-sm": "2px 2px 0px #0D0D0D",
        brutal: "4px 4px 0px #0D0D0D",
        "brutal-lg": "6px 6px 0px #0D0D0D",
        "brutal-xl": "8px 8px 0px #0D0D0D",
      },
    },
  },
  plugins: [],
};
