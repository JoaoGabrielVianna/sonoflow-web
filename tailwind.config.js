/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sunshine': "#C4A25A", // Amarelo
        'slate': "#A1A3AF", // Cinza
        'deep-blue': '#0F1B40',
        'pale-blue': '#F5F5FD', // background Home
        'foggy-slate': 'rgba(94, 105, 128, 0.2)',
        'custom-black': {
          10: 'rgba(0, 0, 0, 0.15)',
          50: 'rgba(0, 0, 0, 0.50)'
        },
        'custom-white': {
          0.5: 'rgba(255, 255, 255, 0.05)'
        },
        'blue-gradient': {
          topToBottom: 'linear-gradient(to bottom, #101C42, #213A59)',
        },
        'cloud-blue': 'rgba(94, 105, 128, 0.21)'
      },
      backgroundImage: {
        'home-background': "url('./src/assets/images/home-background.png')",
        'login-background': "url('./src/assets/images/login-background.png')",
        'diary-background': "url('./src/assets/images/diary-background.png')",

        'blue-gradient': 'linear-gradient(to bottom, #101C42, #213A59)',
      }
    },
  },
  plugins: [],
}

