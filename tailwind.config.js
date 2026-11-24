/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        loy: {
          midnight: '#10152B',
          indigo: '#20264A',
          purple: '#594477',
          lavender: '#C7A9E8',
          gold: '#F5D58B',
          pink: '#F4BBD0',
          cream: '#FFF6E9',
          emerald: '#587F63',
          amberGlow: '#FFDE7D',
          deepRiver: '#090D1C',
        }
      },
      fontFamily: {
        thai: ['Prompt', 'Noto Sans Thai', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        thaiRomantic: ['Charm', 'Prompt', 'cursive'],
        body: ['Prompt', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-gentle': 'floatGentle 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'ripple': 'ripple 3s cubic-bezier(0, 0.2, 0.8, 1) infinite',
        'flicker': 'flicker 1.8s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1.5deg)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '25%': { opacity: '0.85', transform: 'scale(0.97) skewX(-1deg)' },
          '50%': { opacity: '0.95', transform: 'scale(1.03) skewX(1deg)' },
          '75%': { opacity: '0.88', transform: 'scale(0.98)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
