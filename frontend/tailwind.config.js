/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        matrix: {
          50: "#e6f7e6",
          100: "#ccefe6",
          200: "#99e0d1",
          300: "#66d1bb",
          400: "#33c2a8",
          500: "#00b395",
          600: "#008f77",
          700: "#006c5a",
          800: "#004a3c",
          900: "#00271e",
        },
        accent: {
          50: "#ccfff5",
          100: "#99ffe6",
          200: "#66ffd9",
          300: "#33ffd0",
          400: "#00ffc6",
          500: "#00ffb3",
          600: "#00e6a2",
          700: "#00cc91",
          800: "#00b380",
          900: "#00996f",
        },
      },
      backgroundColor: {
        dark: "#0d0d0d",
        darker: "#050505",
      },
      boxShadow: {
        glow: "0 0 5px theme(colors.matrix.500), 0 0 10px theme(colors.matrix.500), 0 0 20px theme(colors.matrix.400)",
        "glow-lg": "0 0 10px theme(colors.matrix.400), 0 0 20px theme(colors.matrix.400), 0 0 40px theme(colors.matrix.300)",
      },
      borderColor: {
        DEFAULT: "hsl(150 100% 50% / 0.2)",
      },
    },
  },
  plugins: [],
};
