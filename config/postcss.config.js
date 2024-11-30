export default {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: require('./tailwind.config.js'),
    autoprefixer: {}
  }
};
