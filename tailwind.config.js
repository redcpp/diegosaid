/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      // Every colour resolves through a CSS variable so the light and dark
      // palettes can swap in one place (see global.css). The channels are
      // stored bare — "252 252 250" — which is what lets Tailwind's opacity
      // modifiers (bg-paper/95, text-ink/85) still work.
      colors: {
        paper: 'rgb(var(--paper) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        rule: 'rgb(var(--rule) / <alpha-value>)',
        // Named after hyperref's own link roles. Accent is the site's voice;
        // the other three appear on tag chips and citation markers.
        accent: 'rgb(var(--accent) / <alpha-value>)',
        url: 'rgb(var(--url) / <alpha-value>)',
        cite: 'rgb(var(--cite) / <alpha-value>)',
        note: 'rgb(var(--note) / <alpha-value>)',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', '"Times New Roman"', 'serif'],
        mono: ['"IBM Plex Mono"', '"Courier New"', 'monospace'],
      },
    },
  },
  plugins: [],
}
