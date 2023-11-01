/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sansation: ["Sansation", "sans"],
      },
      colors: {
        "action-color-500": "#003D29",
      },
    },
  },
  plugins: [],
};
