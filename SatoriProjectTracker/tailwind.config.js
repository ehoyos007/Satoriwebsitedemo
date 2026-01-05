/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        satori: {
          bg: '#0a0a0f',
          surface: '#1a1a2e',
          border: '#2a2a4a',
        }
      }
    },
  },
  plugins: [],
}
