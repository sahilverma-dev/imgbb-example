/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      height: {
        "d-screen": "100dvh",
      },
      minHeight: {
        "d-screen": "100dvh",
      },
    },
  },
  plugins: [],
};
