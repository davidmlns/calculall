/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'background-app': '#1A1A1A',
        'screen-app': '#3A3A3A',
        'button-app': '#E9EDF0',
        'button-op-app': '#007AFF',
        'category-physic': '#2E86C1 ',
        'category-math': '#6C3483 ',
        'category-health': '#E74C3C ',
        'category-economy': '#27AE60  ',
        'category-geo': '#D35400 ',
        'category-transport': '#7F8C8D ',
        'category-kitchen': '#F39C12 ',
        'category-others': '#F0E68C ',
        'category-tech': '#3498DB ',
        'icon-background': '#F1948A   ',
        //"accent-app": "#FF6B6B",
      },
      width: {
        45: '45%',
        98: '98%',
        95: '95%',
        90: '90%',
        99: '99%',
      },
      fontSize: {
        22: '22px',
        20: '20px',
      },
    },
  },
  variants: {},
  plugins: [],
};
