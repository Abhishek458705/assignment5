/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
  "./views/**/*.ejs",
  "./server.js"
],

  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui')
  ],
  daisyui: {
    themes: ["dark"]
  }
}
