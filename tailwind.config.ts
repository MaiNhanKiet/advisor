import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Cyber / sci-fi palette (based on poster vibe)
        "void": "#05060A",
        "void-2": "#070A12",
        "neon-cyan": "#22F7FF",
        "electric-blue": "#3B82F6",
        "glow-blue": "#66C7FF",
        "soft-white": "#EAF2FF",
      },
      boxShadow: {
        "neon": "0 0 0 1px rgba(34, 247, 255, 0.35), 0 0 25px rgba(34, 247, 255, 0.18)",
        "neon-strong": "0 0 0 1px rgba(34, 247, 255, 0.55), 0 0 40px rgba(34, 247, 255, 0.28)",
        "glass": "0 10px 40px rgba(0, 0, 0, 0.45)",
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(600px circle at 50% 0%, rgba(34,247,255,0.25), rgba(59,130,246,0.10) 35%, transparent 70%)",
        "grid":
          "linear-gradient(to right, rgba(34,247,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,247,255,0.08) 1px, transparent 1px)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -10px, 0)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "0.9" },
        },
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "pulse-glow": "pulseGlow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

export default config


