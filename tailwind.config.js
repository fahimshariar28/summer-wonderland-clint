/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#102582",
          secondary: "#baffaf",
          accent: "#e26361",
          neutral: "#191622",
          "base-100": "#f8fafb",
          info: "#40a9dd",
          success: "#3de1ce",
          warning: "#f1c541",
          error: "#da2f54",
        },
      },
      "light",
      "dark",
      "fantasy",
    ],
  },
  plugins: [require("daisyui")],
};
