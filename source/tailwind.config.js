/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    // Desktop-first: each breakpoint applies at and below its width.
    screens: {
      lg: { max: "2535px" },
      md: { max: "1050px" },
      sm: { max: "950px" },
    },
    extend: {
      colors: {
        primary: "#2a1b3f",
        secondary: "#f24432",
        tertiary: "#f8f8f8",
        "bg-dark": "#0a182e",
        "dark-secondary": "#f97316",
      },
    },
  },
  plugins: [],
};
