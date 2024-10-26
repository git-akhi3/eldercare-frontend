/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./components/**/*.jsx",  // Changed this line
    "./app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

