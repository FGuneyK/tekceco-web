/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'

const config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--foreground)',
            a: {
              color: 'var(--primary)',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': { color: 'var(--primary-foreground)' },
            },
            h1: {
              color: 'var(--foreground)',
              fontWeight: '700',
              fontSize: '2rem',
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h2: {
              color: 'var(--foreground)',
              fontWeight: '600',
              fontSize: '1.5rem',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            },
            p: {
              marginTop: '1em',
              marginBottom: '1em',
              lineHeight: '1.75',
            },
            strong: { color: 'var(--foreground)' },
            blockquote: {
              color: 'var(--muted-foreground)',
              borderLeft: '3px solid var(--border)',
              paddingLeft: '1em',
              fontStyle: 'italic',
            },
          },
        },
      },
    },
  },
  plugins: [typography], // ✅ burası düzeltildi
}

export default config
