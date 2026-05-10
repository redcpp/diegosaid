/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        creme: '#F5F3EF',
        ink: '#1A1A1A',
        cobalt: '#2B4C8C',
        oxblood: '#8C2B3D',
        blush: '#E8D5D0',
        sage: '#A8B5A0',
        parchment: '#FAF8F4',
        stone: '#C4BFB5',
        'stone-text': '#8A8579',
        terracotta: '#D4745C',
      },
      fontFamily: {
        headline: ['Outfit', 'Arial Black', 'sans-serif'],
        body: ['Courier Prime', 'Courier', 'monospace'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['80px', { lineHeight: '0.94em', letterSpacing: '-0.02em' }],
        'display-lg': ['64px', { lineHeight: '0.95em', letterSpacing: '-0.02em' }],
        'display-md': ['48px', { lineHeight: '1.05em', letterSpacing: '-0.01em' }],
        'heading': ['24px', { lineHeight: '1.3em', letterSpacing: '0.02em' }],
        'body-lg': ['18px', { lineHeight: '1.6em' }],
        'body': ['16px', { lineHeight: '1.65em' }],
        'body-sm': ['14px', { lineHeight: '1.6em' }],
        'label': ['12px', { lineHeight: '1.4em', letterSpacing: '0.08em' }],
        'mono-text': ['13px', { lineHeight: '1.7em', letterSpacing: '0.02em' }],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "cursor-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "pulse-slow": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.06" },
          "50%": { transform: "scale(1.05)", opacity: "0.12" },
        },
        "noise": {
          "0%, 100%": { opacity: "0.03" },
          "50%": { opacity: "0.06" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "cursor-blink": "cursor-blink 1s step-end infinite",
        "pulse-slow": "pulse-slow 8s ease-in-out infinite",
        "noise": "noise 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
