import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        space: {
          950: "#0C0915",
          900: "#151024",
          800: "#1F1836",
          700: "#2B2247",
          600: "#3A2F5C",
        },
        brand: {
          blue: "#2F5597",
          blueLight: "#5B85C9",
          orange: "#E86524",
          orangeLight: "#F58B4D",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "cosmic-gradient": "linear-gradient(180deg, #241B3D 0%, #3A2748 45%, #7A4438 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(91, 133, 201, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
