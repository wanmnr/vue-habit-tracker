export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4FD1C5',
          DEFAULT: '#38B2AC',
          dark: '#319795'
        }
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif']
      }
    }
  },
  plugins: [],
  important: true
};
