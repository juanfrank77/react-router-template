import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1D1D1D',
        secondary: '#FFA500',
        tertiary: '#F2F2F2',
      },
    },
  },
  plugins: [],
} satisfies Config
