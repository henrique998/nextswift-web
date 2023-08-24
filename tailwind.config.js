/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: '#f5f5f4',
          100: '#eaeaea',
          200: '#ebeaea',
          300: '#c1c0c0',
          400: '#bebebf',
        },
        purple: {
          200: '#ece3f8',
          700: '#7913fc',
        },
        red: {
          500: '#fd5c61',
        },
        zinc: {
          800: '#2F3037',
          900: '#1b1c21',
        },
      },
      boxShadow: {
        'product-shadow': '0px 4px 10px 0px rgba(193, 192, 192, 0.25)',
        'badge-shadow': '0px 2px 8px 0px rgba(121, 19, 252, 0.70)',
      },
    },
  },
  plugins: [],
}
