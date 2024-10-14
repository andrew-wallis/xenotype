/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': 'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    },
    extend: {
      spacing: {
        "2.25": "0.5625rem",
        "4.5": "1.125rem"
      },
      colors: {
        "white": "#FFF",
        "gray-100": "#EAEAEA",
        "gray-200": "#DEDEDF",
        "gray-300": "#C9C9CA",
        "gray-400": "#B2B2B3",
        "gray-500": "#9C9D9E",
        "gray-600": "#858688",
        "gray-700": "#707073",
        "gray-800": "#434447",
        "gray-900": "#2D2E31",
        "black": "#17181C",
        "dark-bg": "#0C0C12",
        "dark-text": "#EEEEF7",
        "dark-secondary": "#C1C1CA"
      }
    },
  },
  plugins: [],
}

