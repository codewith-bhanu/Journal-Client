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
        accent: "var(--accent)",
        accentSoft: "var(--accent-soft)",
        accentInk: "var(--accent-ink)",
        ink: "var(--ink)",
        ink2: "var(--ink-2)",
        ink3: "var(--ink-3)",
        paper: "var(--paper)",
        appBg: "var(--app-bg)",
        surface: "var(--surface)",
        surface2: "var(--surface-2)",
        line: "var(--line)",
        live: "var(--live)",
        onAccent: "var(--on-accent)",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      borderRadius: {
        sm: "10px",
        md: "16px",
        lg: "22px",
      },
      screens: {
        sm:      "640px",
        md:      "760px",  // BottomNav hides / sidebar appears above this
        lg:      "1024px", // Full 250px sidebar appears above this
        xl:      "1280px",
        "2xl":   "1536px",
        "900":   "900px",  // ColumnRailLayout stacking breakpoint
      },
    },
  },
  plugins: [],
};

export default config;
