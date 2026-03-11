import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#040404",
        ink: "#0a0a0a",
        chrome: {
          50: "#f7f7f7",
          100: "#ececec",
          300: "#c8c8c8",
          500: "#999999",
          700: "#626262",
          900: "#2c2c2c"
        }
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        sans: ["Space Grotesk", "sans-serif"]
      },
      boxShadow: {
        panel: "0 30px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.22)",
        chrome: "0 0 0 1px rgba(255,255,255,0.25), 0 10px 30px rgba(255,255,255,0.08)"
      },
      backgroundImage: {
        "chrome-gradient": "linear-gradient(120deg, #f7f7f7 0%, #a6a6a6 35%, #ececec 65%, #727272 100%)",
        "card-gradient": "linear-gradient(145deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.07) 60%, rgba(255,255,255,0.02) 100%)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-7px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" }
        }
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 4s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
