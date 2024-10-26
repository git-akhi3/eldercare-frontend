/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",  // This will include all js, ts, jsx, tsx files in src directory
    "./components/**/*.{js,ts,jsx,tsx}",  // If you have a components directory at root level
    "./app/**/*.{js,ts,jsx,tsx}",  // If you have an app directory
    "./**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {},
  },
  plugins: [],
}

