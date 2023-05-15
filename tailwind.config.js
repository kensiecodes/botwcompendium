/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        tan: "#E7E4D6",
        brightteal: "#C5FEF4",
        bgblue: "#142B57CC",
        smoke: "#C5FEF480",
        ghost: "#FFFFFF38",
      },
      fontFamily: {
        hylian: ["Hylia Serif", "san-serif"],
      },
    },
  },
  plugins: [],
};
