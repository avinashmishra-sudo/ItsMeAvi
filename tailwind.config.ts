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
        cream: {
          50: "#fdfdfb",
          100: "#faf9f5",
          200: "#f4f3ec",
          300: "#eceae0",
        },
        charcoal: {
          800: "#1f2937",
          900: "#111827",
          950: "#0b0f19",
        },
        navy: {
          800: "#141c2e",
          900: "#0b1120",
          950: "#070b14",
        },
        gold: {
          50: "#fdfbf4",
          100: "#f9f4e2",
          200: "#f2e4b8",
          300: "#e9cf8b",
          400: "#deb55b",
          500: "#c59b27",
          600: "#aa801e",
          700: "#86601a",
          800: "#6e4e1a",
          900: "#5b4019",
        },
        accent: {
          blue: "#2563eb",
          "blue-hover": "#1d4ed8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        editorial: ["Georgia", "Cambria", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
