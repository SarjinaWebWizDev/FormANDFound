/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F6F1',
        beige: '#E9E1D5',
        walnut: '#624634',
        espresso: '#30251F',
        sage: '#A1AA91',
        moss: '#6F7A5F',
        gold: '#B49A70',
        cherry: '#B3121C',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { wider2: '0.22em' },
    },
  },
  plugins: [],
};
