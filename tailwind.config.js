/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        buttonPrimary: {
          default: "#00AF66",
          hover: "#27A86E",
          disabled: "#D5D6DD",
        },
        buttonSecondary: {
          default: "#F5F5FA",
          hover: "#E7E7F1",
          disabled: "#D5D6DD",
        },
        buttonSpecial: {
          success: "#C0F4DC",
          disable: "#F4E6E6",
          warning: "#F7F0DD",
        },
        primary: "#00AF66",
        secondary: "#70707F",
        black: "#00020F",
        disable: "#8D90A4",
        special: "#557EE7",
        critical: "#F22525",
        success: "#27A86E",
        warning: "#FFAC33",
        blue: "#646cff",
      },
    },
  },
  plugins: [],
  screens: {
    mobile: "320px",
    desktop: "1280px",
  },
};
