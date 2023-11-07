/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sansation: ["Sansation", "sans"],
        'sans': ['Calibri', 'Helvetica', 'Arial', 'sans-serif'],
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
