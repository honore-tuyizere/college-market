/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["ui-sans-serif", "Sansation", ...defaultTheme.fontFamily.sans],
      serif: ["ui-serif", "Sansation"],
    },
    extend: {
      fontFamily: {
        sans: ['"Sansation"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "action-color-500": "#003D29",
      },
      screens: {
        xs: "380px",
        xxs: "300px",
      },
    },
  },
  plugins: [],
};
