import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["'IBM Plex Mono'", "Menlo", "monospace"],
      },
      colors: {
        /* ── Clean light palette ─────────────────────────────── */
        "bg-base": "#ffffff",
        "bg-surface": "#f8f9fa",
        "bg-panel": "#f1f3f5",
        "bg-hover": "#e9ecef",

        /* ── Primary: deep trusted blue ──────────────────────── */
        brand: "#1a56db",
        "brand-dim": "rgba(26,86,219,0.06)",
        "brand-border": "rgba(26,86,219,0.15)",
        "brand-light": "#dbeafe",

        /* ── Text ────────────────────────────────────────────── */
        "t-primary": "#111827",
        "t-secondary": "#6b7280",
        "t-dim": "#9ca3af",

        /* ── Borders ─────────────────────────────────────────── */
        bdr: "#e5e7eb",
        bdr2: "#d1d5db",

        /* ── Risk ────────────────────────────────────────────── */
        "risk-h": "#dc2626",
        "risk-hbg": "#fef2f2",
        "risk-hb": "#fecaca",
        "risk-m": "#d97706",
        "risk-mbg": "#fffbeb",
        "risk-mb": "#fde68a",
        "risk-l": "#059669",
        "risk-lbg": "#ecfdf5",
        "risk-lb": "#a7f3d0",

        /* ── Shadcn compat ───────────────────────────────────── */
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
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
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
