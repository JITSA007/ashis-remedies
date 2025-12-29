/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enables toggle-based dark mode
  theme: {
    extend: {
      colors: {
        // Light Mode Palette (Organic/Soil)
        soil: {
          50: '#F9F7F2', // Cream White (Background)
          100: '#EBE5D9',
          200: '#D6CDB8',
          300: '#B8AD91',
          400: '#948868',
          500: '#756A4E', // Earthy Brown
          600: '#5C523D',
          700: '#453D2E',
          800: '#302B21',
          900: '#1C1914',
        },
        // Primary Brand Color (Sage/Leaf)
        leaf: {
          50: '#F0F7F2',
          100: '#DEEFE2',
          200: '#C0DFC7',
          300: '#9AC8A6',
          400: '#74AD83', // Fresh Green
          500: '#569268', // Primary Action
          600: '#427452',
          700: '#335A40',
          800: '#284633', // Dark Green Text
          900: '#1F3729',
        },
        // Dark Mode Palette (Night/Cyber)
        night: {
          900: '#0F1C15', // Deep Forest Black (Background)
          800: '#16261D',
          700: '#1E3328',
          600: '#2A4536',
        },
        // Accent Colors
        gold: {
          400: '#E2D9C2', // Soft Gold for text in dark mode
          500: '#C6B074', // Turmeric Yellow
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'], // For the "Ancient" feel
      },
      animation: {
        'sway': 'sway 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        sway: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}