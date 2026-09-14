import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f9fafb",
          subtle: "#f3f4f6",
          border: "#e5e7eb",
          hover: "#f3f4f6",
        },
        dark: {
          DEFAULT: "#0f1013",
          card: "#18191f",
          border: "#262832",
        },
        primary: {
          DEFAULT: "#111827",
          muted: "#4b5563",
          light: "#6b7280",
        },
        accent: {
          DEFAULT: "#2563eb",
          amber: "#d97706",
          emerald: "#059669",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      letterSpacing: {
        widest: ".2em",
      },
      boxShadow: {
        soft: "0 2px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.03)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
