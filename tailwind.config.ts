import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    extend: {
      height: {
        'screen-without-header': 'calc(var(--viewport-height, 100vh) - var(--shreddit-header-height) - 1px)',
      },
      colors: {
      gray: "#4D4D4D",
      darkWhite: "#FAFAFA",
      "light-gray": "#F0F0F0",
      "mid-gray": "#C7C7C7"
      },
      gridTemplateColumns: {
        '256-1fr-256': '256px minmax(0, 1fr) 256px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({
      nocompatible: true
    })
  ]
} satisfies Config

export default config