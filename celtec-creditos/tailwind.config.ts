import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#121214",
        surface: "#1C1D22",
        surface2: "#26272E",
        ink: "#F4F4F2",
        inkmuted: "#9B9CA3",
        celtec: {
          yellow: "#FFC72C",
          yellowdark: "#E0A800",
          green: "#4ADE80",
        },
        dashed: "rgba(244,244,242,0.18)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
