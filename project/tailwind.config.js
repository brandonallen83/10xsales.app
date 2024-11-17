/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f7f4',
          100: '#efeae2',
          200: '#dfd3c3',
          300: '#cbb7a0',
          400: '#b79b81',
          500: '#a68468',
          600: '#956f57',
          700: '#7d5b49',
          800: '#664b3f',
          900: '#544038',
        },
        accent: {
          50: '#f3f7f5',
          100: '#e1ebe6',
          200: '#c4d8cf',
          300: '#9dbeb1',
          400: '#75a391',
          500: '#578b76',
          600: '#447062',
          700: '#385a50',
          800: '#2f4a43',
          900: '#283d37',
        },
        earth: {
          50: '#f7f6f4',
          100: '#e8e4dd',
          200: '#d4ccc0',
          300: '#b8aa99',
          400: '#a08f7a',
          500: '#8c7862',
          600: '#796754',
          700: '#635446',
          800: '#52453b',
          900: '#453b33',
        },
      },
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      minHeight: {
        'screen-ios': '-webkit-fill-available',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}