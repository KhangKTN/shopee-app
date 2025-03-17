/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ee4d2d'
      },
      backgroundColor: {
        'primary': '#ee4d2d'
      }
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp")
  ],
}
