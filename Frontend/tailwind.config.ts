import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
      default: '#43315A',
      button: '#FFD600',
      lightGray: '#EAEAEA'
    },
    },
    screens: {
      sm: { max: '640px' },
      md: { min: '641px', max: '1024px' },
      lg: { min: '1025px', max: '1372px' },
      xl: { min: '1373px' },
    },
  },
  plugins: [],
}
export default config
