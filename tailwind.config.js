/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        90: "22.5rem",
      },
      padding: {
        30: "7.5rem",
      },
    },
  },
  plugins: [],
};
