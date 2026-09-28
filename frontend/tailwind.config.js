/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#FDF7F9',
          100: '#F8DDE5',
          200: '#F4B6C2',
          300: '#EA8FA2',
          400: '#E06883',
          500: '#D81B60', // Rose
          600: '#BD1250',
          700: '#9B1143',
          800: '#7A1738', // Deep Burgundy
          900: '#4A0C20',
          950: '#2B1B20', // Dark
        },
        cream: {
          50: '#FFFFFF',
          100: '#FFFDFB',
          200: '#FFF9F5', // Cream
          300: '#FAF0E8',
          400: '#F4E3D5',
        },
        gold: {
          100: '#F8F1D8',
          200: '#EEDDA9',
          300: '#DFBA3C',
          400: '#C9A227', // Gold
          500: '#A68218',
          600: '#836511',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(122, 23, 56, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'soft-lg': '0 10px 30px -4px rgba(122, 23, 56, 0.1), 0 4px 10px -2px rgba(0, 0, 0, 0.05)',
        'gold': '0 4px 20px -2px rgba(201, 162, 39, 0.25)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
