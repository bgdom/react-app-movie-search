/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],  theme: {
    extend: {
      colors:{
        'header-light': '#60a5fa',
        'header-dark': '#1F2937',
        'kind-gray': '#4B5563'    
      }
    },
  },
  plugins: [],
}
