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
          DEFAULT: '#020617',
          secondary: '#0f172a',
          tertiary: '#1e293b',
        },
        foreground: {
          DEFAULT: '#f8fafc',
          secondary: '#94a3b8',
          muted: '#64748b',
        },
        primary: {
          DEFAULT: '#0d9488', // Teal 600
          dark: '#0f766e',
          light: '#2dd4bf',
        },
        secondary: {
          DEFAULT: '#2563eb', // Blue 600
          dark: '#1e40af',
          light: '#60a5fa',
        },
        accent: '#0ea5e9', // Sky 500
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
        border: {
          DEFAULT: '#1e293b',
          light: '#334155',
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
