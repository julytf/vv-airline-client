/** @type {import('tailwindcss').Config} */

import tailwindcssForm from '@tailwindcss/forms'
import colors from 'tailwindcss/colors'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.sky['400'],
        ['primary-lighter']: colors.sky['300'],
        ['primary-darker']: colors.sky['500'],
        secondary: colors.sky['500'],
      },
      fontFamily: {
        // popi: 'Poppins',
        // meri: 'Merriweather',
        robo: 'Roboto',
        nuni: 'Nunito',
      },
      fontSize: {},
      width: {},
    },
  },
  plugins: [
    // tailwindcssForm
  ],
  darkMode: 'class',
  // important: true,
}
