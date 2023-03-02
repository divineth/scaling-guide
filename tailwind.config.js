/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        comfortaa_reg: ["Comfortaa", "sans-serif"],
        comfortaa_bold: ["Comfortaa-Bold", "sans-serif"],
        lato_reg: ["Lato", "sans-serif"],
        inter_reg: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
