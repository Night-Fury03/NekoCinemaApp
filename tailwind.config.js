/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        customOrange: '#FD9564',
        customRed: '#E3463F'
      },
      backgroundColor: {
        customBlue: '#1C2743',
        customRed: '#E3463F',
        customPink: '#F84464'
      }
    },
  },
  plugins: [],
}

