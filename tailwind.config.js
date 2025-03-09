/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "background-app": "#1A1A1A",
        "screen-app": "#3A3A3A",
        "button-app": "#E9EDF0",
        "button-op-app": "#007AFF",
        //"accent-app": "#FF6B6B",
      },
    },
  },
  variants: {},
  plugins: [],
};
