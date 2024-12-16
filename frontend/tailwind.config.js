/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "kbo-blue": "#1D4ED8",
        "kbo-gradient-start": "#2563EB",
        "kbo-gradient-end": "#1E3A8A",
      },
    },
  },
  plugins: [],
}
