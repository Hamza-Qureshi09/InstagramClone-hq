/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Nunito: ["Nunito", "sans-serif"],
        Nunito_Light: ["Nunito-Light", "sans-serif"],
        Nunito_Medium: ["Nunito-Medium", "sans-serif"],
        Nunito_Regular: ["Nunito-Regular", "sans-serif"],
        Nunito_SemiBold: ["Nunito-SemiBold", "sans-serif"],
        Nunito_Bold: ["Nunito-Bold", "sans-serif"],
        Alaktra_Regular: ['Alkatra-Regular', 'cursive'],
        Alaktra_Bold: ['Alaktra-Bold', 'cursive'],
        BillaBong: ['BillaBong', 'cursive'],
        Lato_Bold: ['Lato-Bold', 'sans-serif'],
        Lato_Regular: ['Lato-Regular', 'sans-serif'],
        Lato_Light: ['Lato-Light', 'sans-serif'],
        Lato_Thin: ['Lato-Thin', 'sans-serif'],
      },
      screens: {
        'xsm': '420px'
      },
    },
  },
  plugins: [],
}

