const colors = require('tailwindcss/colors');

module.exports = {
  // purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#202225',
        secondary: '#5865f2',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
