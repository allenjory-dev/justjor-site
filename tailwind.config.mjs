/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Brand palette — dark mode by default, warm accent
        bg: {
          DEFAULT: "#0d0d0f",      // near-black, slightly warm
          elevated: "#16161a",      // cards / elevated surfaces
          muted: "#1f1f24",         // dividers, subtle backgrounds
        },
        fg: {
          DEFAULT: "#e8e8ea",       // primary text
          muted: "#a0a0a8",         // secondary text
          subtle: "#6b6b73",        // tertiary text / placeholders
        },
        accent: {
          DEFAULT: "#f97316",       // orange — warm, energetic, matches gritty YouTube vibe
          hover: "#fb8c40",
        },
        border: "#2a2a30",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
        serif: ["Lora", "Georgia", "serif"],
      },
      maxWidth: {
        prose: "65ch",
      },
    },
  },
  plugins: [],
};
