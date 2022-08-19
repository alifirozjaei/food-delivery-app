/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["IRSans"],
        display: ["ABZ"],
        serif: ["kalam"],
      },

      colors: {
        headingColor: "#2e2e2e",
        textColor: "#515151",
        cartNumBg: "#e80013",
        primary: "#f5f3f3",
      },

      keyframes: {
        appear: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0px)", opacity: 1 },
        },

        visible: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },

      animation: {
        appear: "appear 0.5s ease 1",
        visible: "visible 0.5s ease 1",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
