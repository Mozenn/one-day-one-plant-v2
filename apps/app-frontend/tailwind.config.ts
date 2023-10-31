import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)'},
          '25%': {transform: 'rotate(-25deg)'},
          '50%': {transform: 'rotate(25deg)'},
          '75%': {transform: 'rotate(-25deg)'},
        }
      },
      animation: {
        wiggle: 'wiggle 0.8s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'primary': "var(--color-primary)",
        'primary-light': "var(--color-primary-light)",
        'primary-dark': "var(--color-primary-dark)",
        'primary-disabled': "var(--color-primary-disabled)",
        'secondary': "var(--color-secondary)",
        'secondary-light': "var(--color-secondary-light)",
        'secondary-dark': "var(--color-secondary-dark)",
        'secondary-dark-light': "var(--color-secondary-dark-light)",
        'secondary-disabled': "var(--color-secondary-disabled)",
        'danger': "var(--color-danger)",
        'danger-dark': "var(--color-danger-dark)",
        'background': "var(--color-background)",
        'background-hex': "var(--color-background-hex)",
        'background-dark': "var(--color-background-dark)",
      }
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.filter-primary': {
          filter: 'invert(65%) sepia(16%) saturate(735%) hue-rotate(68deg) brightness(93%) contrast(83%)',
        },
        '.filter-primary-dark': {
          filter: 'invert(31%) sepia(46%) saturate(251%) hue-rotate(65deg) brightness(92%) contrast(87%)',
        },
        '.filter-primary-light': {
          filter: 'invert(93%) sepia(25%) saturate(351%) hue-rotate(46deg) brightness(93%) contrast(81%)',
        },
        '.filter-primary-disabled': {
          filter: 'invert(38%) sepia(1%) saturate(3628%) hue-rotate(57deg) brightness(105%) contrast(74%)',
        },
        '.filter-secondary': {
          filter: 'invert(57%) sepia(3%) saturate(2475%) hue-rotate(1deg) brightness(93%) contrast(89%)',
        },
        '.filter-secondary-dark': {
          filter: 'invert(60%) sepia(11%) saturate(770%) hue-rotate(1deg) brightness(87%) contrast(85%)',
        },
        '.filter-white': {
          filter: 'invert(100%) sepia(0%) saturate(7500%) hue-rotate(175deg) brightness(121%) contrast(114%)',
        },
        '.filter-danger': {
          filter: 'invert(39%) sepia(44%) saturate(714%) hue-rotate(321deg) brightness(89%) contrast(89%)',
        },
      })
    })
  ],
}
export default config
