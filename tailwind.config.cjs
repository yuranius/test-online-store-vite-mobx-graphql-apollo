/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
    },
    screens:{
      'lg':'1280px',
      'md': '768px',
      'tablet': '640px',
      'sm': '480px',
    }
  },
  plugins: [],
  darkMode: 'class',
}
