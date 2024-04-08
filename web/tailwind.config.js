/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        firefly: {
          50: "#effefd",
          100: "#c8fffb",
          200: "#90fff8",
          300: "#51f7f3",
          400: "#1de3e4",
          500: "#05c2c7",
          600: "#009ba1",
          700: "#057a80",
          800: "#0a5f65",
          900: "#0e4e53",
          950: "#00292e",
        },
        tangerine: {
          50: "#fef6ee",
          100: "#fdead7",
          200: "#fad0ae",
          300: "#f7af7a",
          400: "#f48f56",
          500: "#ef6220",
          600: "#e14915",
          700: "#ba3514",
          800: "#942c18",
          900: "#772617",
          950: "#40100a",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
