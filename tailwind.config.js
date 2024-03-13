/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        unauthorized:
          "linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%);",
        authorized: "linear-gradient(to top, #30cfd0 0%, #330867 100%);",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
};

//
