import type { Config } from "tailwindcss";

export default {
  // darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
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
        sm: "0 1px 2px 0 hsl(var(--foreground) / 0.05)",
        DEFAULT:
          "0 1px 3px 0 hsl(var(--foreground) / 0.1), 0 1px 2px -1px hsl(var(--foreground) / 0.1)",
        md: "0 4px 6px -1px hsl(var(--foreground) / 0.1), 0 2px 4px -2px hsl(var(--foreground) / 0.1)",
        lg: "0 10px 15px -3px hsl(var(--foreground) / 0.1), 0 4px 6px -4px hsl(var(--foreground) / 0.1)",
        xl: "0 20px 25px -5px hsl(var(--foreground) / 0.1), 0 8px 10px -6px hsl(var(--foreground) / 0.1)",
        "2xl": "0 25px 50px -12px hsl(var(--foreground) / 0.25)",
        inner: "inset 0 2px 4px 0 hsl(var(--foreground) / 0.05)",
        none: "none",
        "primary-sm": "5px 5px 0px 0px hsl(var(--primary) /0.7)",
        "primary-lg": "0 10px 20px hsl(var(--primary) / 0.7)",
        "accent-sm":
          "0px 10px 1px hsl(var(--accent)), 0 10px 20px hsl(var(--accent) / 0.7)",
        "secondary-lg": "0 20px 50px hsl(var(--secondary) / 0.7)",
        "muted-layered":
          "5px 5px hsl(var(--muted) / 0.4), 10px 10px hsl(var(--muted) / 0.3), 15px 15px hsl(var(--muted) / 0.2), 20px 20px hsl(var(--muted) / 0.1), 25px 25px hsl(var(--muted) / 0.05)",
        "destructive-sm": "5px 5px 0px 0px hsl(var(--destructive))",
        "chart-1-sm": "5px 5px 0px 0px hsl(var(--chart-1))",
        "chart-2-lg": "0 10px 20px hsl(var(--chart-2) / 0.7)",
        "glow-accent": "0 10px 20px hsl(var(--accent) / 0.7)",
        "glow-destructive":
          "5px 5px hsl(var(--destructive) / 0.4), 10px 10px hsl(var(--destructive) / 0.3), 15px 15px hsl(var(--destructive) / 0.2), 20px 20px hsl(var(--destructive) / 0.1), 25px 25px hsl(var(--destructive) / 0.05)",
        "glow-chart-1":
          "0px 10px 1px hsl(var(--chart-3)), 0 10px 20px hsl(var(--chart-3) / 0.7)",
        "glow-chart-2": "0 20px 50px hsl(var(--chart-4) / 0.7)",
        "glow-chart-3":
          "5px 5px hsl(var(--chart-5) / 0.4), 10px 10px hsl(var(--chart-5) / 0.3), 15px 15px hsl(var(--chart-5) / 0.2), 20px 20px hsl(var(--chart-5) / 0.1), 25px 25px hsl(var(--chart-5) / 0.05)",
        "soft-secondary": "0 10px 20px hsl(var(--secondary) / 0.7)",
        "dual-muted": "0px 10px 1px hsl(var(--muted)), 0 10px 20px hsl(var(--muted-foreground)/ 0.7)",
        "deep-accent": "0 20px 50px hsl(var(--accent) / 0.7)",
        "layered-border": `
          5px 5px hsl(var(--border) / 0.4), 
          10px 10px hsl(var(--border) / 0.3), 
          15px 15px hsl(var(--border) / 0.2), 
          20px 20px hsl(var(--border) / 0.1), 
          25px 25px hsl(var(--border) / 0.05)
        `,
      },
      dropShadow: {
        sm: "0 1px 1px hsl(var(--foreground) / 0.05)",
        DEFAULT: "0 1px 2px hsl(var(--foreground) / 0.1)",
        md: "0 4px 3px hsl(var(--foreground) / 0.1)",
        lg: "0 10px 8px hsl(var(--foreground) / 0.1)",
        xl: "0 20px 13px hsl(var(--foreground) / 0.1)",
        "2xl": "0 25px 25px hsl(var(--foreground) / 0.15)",
        none: "none",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "pulse-shadow": {
          "0%, 100%": {
            boxShadow: "0 0 8px hsl(var(--accent) / 0.5)",
          },
          "50%": {
            boxShadow: "0 0 16px hsl(var(--accent) / 0.7)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-shadow": "pulse-shadow 1.5s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
