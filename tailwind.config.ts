import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    'gradient-bright-fire',
    'gradient-bright-electric',
    'gradient-bright-sunset',
    'gradient-bright-ocean',
    'gradient-bright-emerald',
    'gradient-bright-purple',
    'gradient-bright-white',
    'gradient-bright-yellow',
    'hero-section',
  ],
  theme: {
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif"],
      heading: ["ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "sans-serif"],
    },
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "hsl(210, 60%, 95%)",
          100: "hsl(210, 60%, 90%)",
          200: "hsl(210, 60%, 80%)",
          300: "hsl(210, 60%, 70%)",
          400: "hsl(210, 60%, 60%)",
          500: "hsl(210, 60%, 50%)",
          600: "hsl(210, 60%, 40%)",
          700: "hsl(210, 60%, 30%)",
          800: "hsl(210, 60%, 25%)",
          900: "hsl(210, 60%, 20%)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
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
      },
      boxShadow: {
        'premium-sm': '0 2px 8px rgba(0, 0, 0, 0.08)',
        'premium-md': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'premium-lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'metal': '0 4px 12px rgba(0, 0, 0, 0.3), inset 0 1px 3px rgba(255, 255, 255, 0.1), inset 0 -1px 2px rgba(0, 0, 0, 0.2)',
        'bevel': '0 2px 4px rgba(0, 0, 0, 0.1), inset 0 1px 1px rgba(255, 255, 255, 0.2), inset 0 -1px 1px rgba(0, 0, 0, 0.2)',
        'glow-cyan': '0 0 15px rgba(56, 176, 222, 0.5), 0 0 30px rgba(56, 176, 222, 0.3)',
        'glow-orange': '0 0 15px rgba(255, 140, 0, 0.5), 0 0 30px rgba(255, 140, 0, 0.3)',
        'card-3d': '0 10px 20px rgba(0, 0, 0, 0.2), 0 6px 6px rgba(0, 0, 0, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.1), inset 0 -1px 1px rgba(0, 0, 0, 0.25)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 0 2px rgba(255, 255, 255, 0.5)',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            h1: {
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
            },
            h2: {
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
            },
            h3: {
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
            },
            h4: {
              fontFamily: 'var(--font-heading)',
              fontWeight: '600',
            },
          },
        },
      },
      keyframes: {
        "background-position-spin": {
          "0%": { backgroundPosition: "top center" },
          "100%": { backgroundPosition: "bottom center" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6", boxShadow: "0 0 15px rgba(56, 176, 222, 0.3), 0 0 30px rgba(56, 176, 222, 0.1)" },
          "50%": { opacity: "1", boxShadow: "0 0 20px rgba(56, 176, 222, 0.6), 0 0 40px rgba(56, 176, 222, 0.4)" },
        },
        "glow-pulse-orange": {
          "0%, 100%": { opacity: "0.6", boxShadow: "0 0 15px rgba(255, 140, 0, 0.3), 0 0 30px rgba(255, 140, 0, 0.1)" },
          "50%": { opacity: "1", boxShadow: "0 0 20px rgba(255, 140, 0, 0.6), 0 0 40px rgba(255, 140, 0, 0.4)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "shimmer-slow": {
          "0%": { backgroundPosition: "-200% 0", opacity: "0.1" },
          "50%": { opacity: "0.3" },
          "100%": { backgroundPosition: "200% 0", opacity: "0.1" },
        },
        "border-flow": {
          "0%, 100%": { borderColor: "rgba(56, 176, 222, 0.5)" },
          "50%": { borderColor: "rgba(255, 140, 0, 0.5)" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "subtle-pulse": {
          "0%, 100%": { opacity: "0.9" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "background-position-spin": "background-position-spin 3000ms infinite alternate",
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "glow-pulse-orange": "glow-pulse-orange 3s ease-in-out infinite",
        "shimmer": "shimmer 3s ease-in-out infinite",
        "shimmer-once": "shimmer 2.5s ease-in-out forwards",
        "shimmer-slow": "shimmer-slow 6s ease-in-out infinite",
        "border-flow": "border-flow 3s ease-in-out infinite",
        "rotate-slow": "rotate-slow 10s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
        "subtle-pulse": "subtle-pulse 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
