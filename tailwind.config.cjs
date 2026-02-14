/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{astro,md,mdx,js,ts}',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Noto Serif SC"', 'serif']
      },
      maxWidth: {
        225: '56rem'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};
