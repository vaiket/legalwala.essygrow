/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#08080a',
        'brand-surface': '#0c0d12',
        'brand-surface-light': '#12141c',
        'brand-gold': '#c5a059',
        'brand-gold-dark': '#8a6d3b',
        'brand-border': '#1e293b',
        'brand-border-light': '#334155',
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'display': ['Playfair Display', 'ui-serif', 'Georgia', 'serif'],
        'bricolage': ['Bricolage Grotesque', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
