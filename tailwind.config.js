/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Light Mode (Cozy)
        cream: '#FFF5E1',
        wood: '#C9A57B',
        woodDark: '#8B6F47',
        pink: '#F8D7DA',
        mint: '#B8E0D2',
        orange: '#F4A261',
        orangeDark: '#D97A3F',
        lavender: '#D4C5E2',
        // Dark Mode (Night)
        night: '#2D2B4E',
        nightCard: '#4A3F6B',
        nightAccent: '#5C6BC0',
        star: '#FFE082',
        // Semantic
        ink: '#3A2E2E',
        inkLight: '#6B5B5B'
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        retro: ['"VT323"', 'monospace']
      },
      boxShadow: {
        pixel: '4px 4px 0 0 rgba(58, 46, 46, 1)',
        'pixel-sm': '2px 2px 0 0 rgba(58, 46, 46, 1)',
        'pixel-lg': '6px 6px 0 0 rgba(58, 46, 46, 1)',
        'pixel-dark': '4px 4px 0 0 rgba(0, 0, 0, 0.6)',
        'pixel-inset': 'inset 2px 2px 0 0 rgba(255,255,255,0.3), inset -2px -2px 0 0 rgba(0,0,0,0.2)'
      },
      borderWidth: {
        '3': '3px',
        '5': '5px'
      },
      animation: {
        'pixel-bounce': 'pixelBounce 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'blink': 'blink 4s infinite',
        'flicker': 'flicker 0.4s infinite alternate',
        'twinkle': 'twinkle 2s ease-in-out infinite',
        'pulse-fast': 'pulse 1s ease-in-out infinite',
        'walk': 'walk 8s linear infinite',
        'sway': 'sway 3s ease-in-out infinite',
        'rise': 'rise 0.6s ease-out',
        'shake': 'shake 0.4s ease-in-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out'
      },
      keyframes: {
        pixelBounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' }
        },
        blink: {
          '0%, 90%, 100%': { transform: 'scaleY(1)' },
          '95%': { transform: 'scaleY(0.1)' }
        },
        flicker: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0.85', transform: 'scale(1.05)' }
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' }
        },
        walk: {
          '0%': { left: '10%' },
          '25%': { left: '70%', transform: 'scaleX(1)' },
          '26%': { transform: 'scaleX(-1)' },
          '50%': { left: '20%' },
          '51%': { transform: 'scaleX(1)' },
          '75%': { left: '80%' },
          '76%': { transform: 'scaleX(-1)' },
          '100%': { left: '10%', transform: 'scaleX(1)' }
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' }
        },
        rise: {
          '0%': { transform: 'translateY(20px) scale(0.5)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' }
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-3px)' },
          '75%': { transform: 'translateX(3px)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    }
  },
  plugins: []
}
