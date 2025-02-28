import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Instrument Sans', 'sans-serif'],
      },
      colors: {
        'custom-blue': '#633CFF',
        'dark-purple': '#BEADFF',
        'light-purple': '#EFEBFF',
        'custom-black': '#333333',
        'light-black': '#737373',
        'dark-grey': '#D9D9D9',
        'light-grey': '#FAFAFA',
        'custom-red':'#FF3939'
      },
      fontSize: {
        'heading-m': ['32px', {
          lineHeight: '48px', // 150% of 32px
          fontWeight: '700', // Bold
        }],
        'heading-s': ['16px', {
          lineHeight: '48px', // 150% of 32px
          fontWeight: '700', // Bold
        }],
        'body-m': ['16px', {
          lineHeight: '48px', // 150% of 32px
          fontWeight: '400', // Bold
        }],
        'body-s': ['12px', {
          lineHeight: '48px', // 150% of 32px
          fontWeight: '400', // Bold
        }],
      },
    },
  },
  plugins: [],
} satisfies Config;
