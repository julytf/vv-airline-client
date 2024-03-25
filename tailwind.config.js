/** @type {import('tailwindcss').Config} */

import tailwindcssForm from '@tailwindcss/forms'
import colors from 'tailwindcss/colors'

import typography from '@tailwindcss/typography'

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
      maxHeight: {
        1000: '250rem ',
      },
    },
  },
  plugins: [
    // tailwindcssForm,
    typography,
  ],
  darkMode: 'class',
  // important: true,
}
