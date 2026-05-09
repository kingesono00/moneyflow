/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0B1014',
        surface: '#121A21',
        card: '#17212B',
        emerald: '#10B981',
        muted: '#8EA0B6',
      },
    },
  },
  plugins: [],
};
