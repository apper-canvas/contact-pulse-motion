/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        secondary: '#8B5CF6',
        accent: '#EC4899',
        surface: '#FFFFFF',
        background: '#F9FAFB',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'display-md': ['2.25rem', { lineHeight: '1.3', fontWeight: '600' }],
        'display-sm': ['1.875rem', { lineHeight: '1.4', fontWeight: '600' }],
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.1)',
        'modal': '0 20px 40px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'scale-up': 'scaleUp 150ms ease-out',
        'scale-down': 'scaleDown 100ms ease-in',
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 300ms ease-out',
      },
      keyframes: {
        scaleUp: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.02) translateY(-4px)' }
        },
        scaleDown: {
          '0%': { transform: 'scale(1.02) translateY(-4px)' },
          '100%': { transform: 'scale(1)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    },
  },
  plugins: [],
}