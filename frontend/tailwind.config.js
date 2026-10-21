/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary:  { DEFAULT: '#1e40af', light: '#3b82f6', dark: '#1e3a8a' },
        accent:   { DEFAULT: '#06b6d4', light: '#22d3ee' },
        success:  '#22c55e',
        warning:  '#f59e0b',
        danger:   '#ef4444',
        critical: '#7c3aed',
      },
      fontFamily: {
        sans:    ['DM Sans', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow':    'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'slide-up':      'slideUp 0.4s ease-out',
        'fade-in':       'fadeIn 0.5s ease-out',
        'spin-slow':     'spin 3s linear infinite',
      },
      keyframes: {
        slideUp:  { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        fadeIn:   { from: { opacity: 0 }, to: { opacity: 1 } },
      },
    },
  },
  plugins: [],
};
