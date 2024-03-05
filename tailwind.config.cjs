/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
  content: [
    './index.html',
    './src/**/*.{cjs,js,jsx,ts,tsx,vue,css}'
  ],
  theme: {
    extend: {
      colors: {
        //using css color variables here
        'background': 'var(--color-background)',
        'text-primary': 'var(--color-text-primary)',
        'accent': 'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        // Dark theme colors
        'background-dark': 'var(--color-background-dark)',
        'text-primary-dark': 'var(--color-text-primary-dark)',
        'accent-dark': 'var(--color-accent-dark)',
        'accent-hover-dark': 'var(--color-accent-hover-dark)',
        'brown': 'var(--color-header-theme)'

        //'mint': '#65e7ba', // Replace with your preferred mint green color code
        //'darkPurple': '#482a88',
        //'darkMint': '#027954',
        //'lightMint': '#abf5d8',
      },
      fontFamily: {
        'bebas': ['"Bebas Neue"', 'sans-serif'], // Note the quotes around font names with spaces
        'madimi': ['"Madimi One"', 'sans-serif'],
        'quicksand': ['Quicksand', 'sans-serif'],
        'teko': ['Teko', 'sans-serif'],
        'raleway': ['Raleway', 'sans-serif'],
      },

      plugins: [
        plugin(function({ addUtilities }) {
          const newUtilities = {
            '.backdrop-blur': {
              backdropFilter: 'blur(8px)',
            },
          };
          addUtilities(newUtilities, ['responsive', 'hover']);
        }),
      ],
    },
  },
}
