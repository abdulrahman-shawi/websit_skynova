import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fdfcfb",
        foreground: "#1a1620",
        ink: "#1a1620",
        blush: {
          50: "#fdf2f5",
          100: "#fbe4ea",
          200: "#f7c8d6",
          300: "#f09ab3",
          400: "#e6638b",
          500: "#d63a67",
          600: "#ba2451",
          700: "#9c1a43",
        },
        gold: {
          300: "#e8c98a",
          400: "#d9ab5c",
          500: "#c8923e",
          600: "#a9762c",
        },
      },
      fontFamily: {
        sans: ["Cairo", "Segoe UI", "Tahoma", "Arial", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 40px -12px rgba(26, 22, 32, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
