/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens:{
      'lg':'1280px',
      'md': '768px',
      'tablet': '640px',
      'sm': '480px',
    }
  },
  plugins: [],
}
