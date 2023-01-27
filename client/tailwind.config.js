const colors = require('tailwindcss/colors');

module.exports = {
  // purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mycolor: '#718355',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
