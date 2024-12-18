module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        scroll: 'scroll 20s linear infinite',
      },
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      colors: {
        'primary': '#34B450',
        'gradient-start': '#58BF4D',
        'gradient-end': '#F8F887',
      },
      fontFamily: {
        'kaisei': ['Kaisei Decol', 'serif'],
        'syne': ['Syne', 'sans-serif'],
        'andale': ['Andale Mono', 'monospace'],
      },
    },
  },
  plugins: [],
};
