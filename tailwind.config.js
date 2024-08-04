const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    colors: {
      dark: '#1E1E1E',
      darkGray: '#333333',
      mediumGray: '#555555',
      green: '#4CAF50',
      white: '#FFFFFF',
    },
    // extend: {},
  },
  plugins: [],
});