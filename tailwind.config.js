/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html, ts}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-25': '#f7f9fa',
        'primary-50': '#e8f7fb',
        'primary-100': '#92d9ec',
        'primary-200': '#4cc8f1',
        'primary-300': '#1db9ed',
        'primary-400': '#1caad9',
        'primary-500': '#1c88bb',
        'primary-600': '#007396',
        'primary-700': '#005e74',
        'primary-800': '#023748',
        'primary-900': '#01222d',
      }
    },
  },
  plugins: [],
}

