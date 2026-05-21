import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        arc:     "#63caff",
        "arc-2": "#00e5ff",
        "arc-bg":"#060810",
        "arc-s": "#0c1020",
        green:   "#00ffa3",
        gold:    "#f5c842",
        purple:  "#a78bfa",
        danger:  "#ff4d6d",
        muted:   "#5b7a99",
      },
    },
  },
  plugins: [],
};

export default config;
