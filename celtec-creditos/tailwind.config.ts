import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark — hero y header
        bg: "#111827",
        surface: "#1C2333",
        surface2: "#26303F",
        ink: "#F9FAFB",
        inkmuted: "#9CA3AF",
        // Light — catálogo y simulador
        light: {
          bg: "#F9FAFB",
          card: "#FFFFFF",
          border: "#E5E7EB",
          text: "#111827",
          muted: "#6B7280",
        },
        celtec: {
          blue: "#3B82F6",
          bluedark: "#2563EB",
          green: "#22C55E",
          greendark: "#16A34A",
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
