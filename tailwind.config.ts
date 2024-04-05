import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'
import colors from 'tailwindcss/colors'

const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/common/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'selector',
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      aspectRatio: {
        'a4-document': '210 / 297',
      },
      colors: {
        primary: colors.blue,
        'layout-divider-color': colors.gray['200'],
        // sidebar light
        'sidebar-bg-light': colors.white,
        'sidebar-item-bg-light-selected': colors.blue,
        'sidebar-item-text-light': colors.gray['500'],
        'sidebar-item-text-light-selected': colors.white,
        'sidebar-item-text-light-hover': colors.black,
        // sidebar dark
        'sidebar-bg-dark': colors.slate['900'],
        'sidebar-item-bg-dark-selected': colors.gray['200'],
        'sidebar-item-text-dark': colors.white,
        'sidebar-item-text-dark-selected': colors.black,
        'sidebar-item-text-dark-hover': colors.white,
      },
      spacing: {
        'app-header-h-lg': '4rem',
        'app-header-h-sm': '2rem',
        'sidebar-w-closed': '4rem',
        'sidebar-w-open': '13rem',
      },
      borderWidth: {
        DEFAULT: '1px',
      },
      transitionProperty: {
        width: 'width',
        visibility: 'visibility',
      },
      zIndex: {
        '100': '100',
      },
    },
  },
  plugins: [
    require('tailwindcss-react-aria-components'),
    plugin(function ({ addBase }) {
      addBase({
        '[type="search"]::-webkit-search-decoration': { display: 'none' },
        '[type="search"]::-webkit-search-cancel-button': { display: 'none' },
        '[type="search"]::-webkit-search-results-button': { display: 'none' },
        '[type="search"]::-webkit-search-results-decoration': {
          display: 'none',
        },
      })
    }),
  ],
}
export default config
