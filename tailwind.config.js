/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FAFAF8',
        ink: '#2C2C2C',
        accent: '#2B4C8C',
        muted: '#71717A',
        rule: '#E4E4E7',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', '"Times New Roman"', 'serif'],
        mono: ['"IBM Plex Mono"', '"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
}
