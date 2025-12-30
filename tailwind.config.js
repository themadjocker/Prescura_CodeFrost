/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          500: "#8b5cf6",
          600: "#7c3aed"
        },
        secondary: {
          500: "#f97316"
        },
        glass: {
          surface: "rgba(255, 255, 255, 0.65)",
          border: "rgba(255, 255, 255, 0.5)"
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Poppins", "sans-serif"]
      },
      boxShadow: {
        neo: "20px 20px 60px #d1d1d1, -20px -20px 60px #ffffff",
        "neo-sm": "5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)"
      },
      animation: {
        float: "float 6s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" }
        }
      }
    }
  },
  plugins: []
};


