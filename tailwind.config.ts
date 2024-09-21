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
      colors: {},
      fontFamily: {
        primary: "var(--font-inter-tight)",
      },
      boxShadow: {
        custom: "0px 24px 48px -12px rgba(16, 24, 40, 0.18)",
      },
    },
  },

  plugins: [],
};
export default config;
