import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  safelist: [
    {
      pattern: /^bg-/
    }
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      Roboto: "'Roboto Condensed', sans-serif"
    },
    colors: {
      transparent: 'transparent',
      black: '#000000',
      white: '#FFFFFF',

      primary: '#185274',
      background: '#F1F2F5',
      placeholder: '#6B7280',

      success: '#1ECE79',
      attenttion: '#E0FF20',
      error: '#C1012F',
      outline: '#A1A3A6',

      green: {
        50: '#e9faf2',
        100: '#b9f0d5',
        200: '#98e8c1',
        300: '#68dea5',
        400: '#4bd894',
        500: '#1ece79',
        600: '#1bbb6e',
        700: '#159256',
        800: '#117143',
        900: '#0d5733'
      },

      yellow: {
        50: '#fcffe9',
        100: '#f5ffba',
        200: '#f1ff98',
        300: '#eaff6a',
        400: '#e6ff4d',
        500: '#e0ff20',
        600: '#cce81d',
        700: '#9fb517',
        800: '#7b8c12',
        900: '#5e6b0d'
      },

      red: {
        50: '#f9e6ea',
        100: '#ecb0bf',
        200: '#e28a9f',
        300: '#d55574',
        400: '#cd3459',
        500: '#c1012f',
        600: '#b0012b',
        700: '#890121',
        800: '#6a011a',
        900: '#510014'
      }
    },
    fontWeight: {
      light: '200',
      normal: '400',
      'semi-bold': '500',
      bold: '600',
      black: '900'
    },
    fontSize: {
      '2xl': '64px',
      xl: '32px',
      lg: '24px',
      md: '16px',
      sm: '14px',
      xs: '12px',
      xxs: '8px'
    },
    extend: {}
  },
  plugins: []
};
export default config;
