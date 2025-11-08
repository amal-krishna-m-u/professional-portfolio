/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#0a0a0a',
        'bg-secondary': '#1a1a1a',
        'accent-blue': '#00D9FF',
        'text-primary': '#ffffff',
        'text-secondary': '#888888',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'terminal-fade-in': 'terminalFadeIn 0.5s ease forwards',
        'bounce': 'bounce 2s infinite',
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        terminalFadeIn: {
          'from': {
            opacity: '0',
          },
          'to': {
            opacity: '1',
          },
        },
        blink: {
          '50%': {
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [],
}