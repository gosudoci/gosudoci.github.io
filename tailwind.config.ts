/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Pretendard', 'system-ui', 'sans-serif'],
          montserrat: ['Montserrat', 'sans-serif'],
          display: ['Montserrat', 'sans-serif'],
        },
        fontSize: {
          xs: ['0.8125rem', { lineHeight: '1.25rem' }],
        },
        colors: {
          'app-black': '#111111',
          'app-gray': '#666666',
          'app-light': '#F5F5F5',
        },
      },
    },
    plugins: [],
  }