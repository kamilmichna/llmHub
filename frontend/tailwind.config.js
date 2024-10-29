/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontSize: {
      base: '1.25rem'
    },
    extend: {},
  },
  plugins: [require("daisyui")],
}

