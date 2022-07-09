module.exports = {
  // mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('img/pattern-bkg.png')",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
