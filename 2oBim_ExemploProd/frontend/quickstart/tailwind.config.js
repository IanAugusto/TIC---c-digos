/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        solidsm: "0 2px 0 0 rgba(0, 0, 0, 1)",
        solidmd: "0 4px 0 0 rgba(0, 0, 0, 1)",
        isolidsm: "0 -2px 0 0 rgba(0, 0, 0, 1)",
        isolidmd: "0 -4px 0 0 rgba(0, 0, 0, 1)",
      }
    },
  },
  plugins: [],
}

