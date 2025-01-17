/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        waterdrop: {
          "0%": { opacity: "0", transform: "scale(0.8) translateY(-10px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
      },
      animation: {
        waterdrop: "waterdrop 0.3s ease-out",
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["valentine"], // Kamu bisa tambahkan tema lainnya jika perlu
  },
};
