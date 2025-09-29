/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        'primary-dark': '#212121',
        'subtle-gray': '#f7f7f7',
        'mid-gray': '#6b7280',
        'white-card': '#ffffff',
      }
    }
  },
  plugins: [],
}
