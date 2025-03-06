import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        audiowide: 'var(--font-audiowide)',
        geist: 'var(--font-geist-sans)',
        'geist-mono': 'var(--font-geist-mono)',
      },
      maxWidth: {
        laptop: '1024px',
      },
      borderWidth: {
        1: '1px',
      },
      colors: {
        transparent: '#0000',
        ablack: "#0a0a0a",
        background: '#0A192F',
        foreground: '#112240',
        primary: '#64FFDA',
        text: '#CCD6F6',
        'text-secondary': '#8892B0',
        interactive: '#1F4C7A',
        hover: '#233554',
        border: '#2E3A4D',
      },
    },
  },
  plugins: [],
} satisfies Config;
