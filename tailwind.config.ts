import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "24px",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
      },
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        primary: "var(--font-inter-tight)",
        logoGuys: "var(--font-orbitron)",
      },
    },
  },

  plugins: [],
};
export default config;
