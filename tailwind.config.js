/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        khanyaPink: '#D75A8B',
        khanyaPinkDeep: '#B13F6C',
        rose: '#8B0F0F',
        rose2: '#B22222',
        ivory: '#FBF5F0',
      },
      fontFamily: {
        serif: ['Merriweather', 'serif'],
        handwriting: ['"Patrick Hand"', 'cursive'],
      },
    },
  },
  plugins: [],
}

