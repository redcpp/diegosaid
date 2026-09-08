/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FCFCFA',
        ink: '#1A1A1A',
        muted: '#6B6B70',
        rule: '#E4E4E1',
        // Named after hyperref's own link roles. Accent is the site's voice;
        // the other three appear on tag chips and citation markers. Every one
        // clears 4.5:1 on paper.
        accent: '#C5221F',
        url: '#185ABC',
        cite: '#137333',
        note: '#B45309',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', '"Times New Roman"', 'serif'],
        mono: ['"IBM Plex Mono"', '"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
}
