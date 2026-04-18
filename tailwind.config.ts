import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#050509',
          secondary: '#0a0a0f',
          tertiary: '#12121a',
        },
        foreground: {
          DEFAULT: '#e4e4e7',
          secondary: '#a1a1aa',
          muted: '#71717a',
        },
        primary: {
          DEFAULT: '#a855f7',
          dark: '#7c3aed',
          light: '#c084fc',
        },
        secondary: {
          DEFAULT: '#06b6d4',
          dark: '#0891b2',
          light: '#22d3ee',
        },
        accent: '#f97316',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        border: {
          DEFAULT: '#27272a',
          light: '#3f3f46',
        },
      },
      fontFamily: {
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(168, 85, 247, 0.5)',
        'glow-secondary': '0 0 20px rgba(6, 182, 212, 0.5)',
        'glow-primary-lg': '0 0 30px rgba(168, 85, 247, 0.5), 0 0 40px rgba(6, 182, 212, 0.5)',
      },
    },
  },
  plugins: [],
};

export default config;
