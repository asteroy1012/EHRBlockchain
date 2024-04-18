/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        primaryRegular:['Regular'],
        primaryMedium:['Medium'],
        primaryBold:['Bold'],
        cherryRegular:['CherryBombOne'],
        'platy': ['Platypi', 'serif']

      }
    },
  },
  plugins: [],
}

