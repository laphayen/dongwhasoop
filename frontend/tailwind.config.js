/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        bazzi: ["Bazzi", "sans-serif"],
        maplestory: ["Maplestory", "sans-serif"],
      },
      screens: {
        tablet2560: "2560px", // 기준 해상도
        xs: "375px", // 아이폰 mini
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      keyframes: {
        "pop-in": {
          "0%": { opacity: "0", transform: "scale(0.7) translateY(30px)" },
          "60%": { opacity: "1", transform: "scale(1.1) translateY(-10px)" },
          "100%": { transform: "scale(1) translateY(0)" },
        },
        /* 동화숲 로고 튀기는 애니메이션 */
        "triple-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "20%": { transform: "translateY(-70px)" },
          "40%": { transform: "translateY(0)" },
          "60%": { transform: "translateY(-40px)" },
          "80%": { transform: "translateY(0)" },
          "90%": { transform: "translateY(-10px)" },
        },
        "bounce-shake1": {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        "bounce-shake2": {
          '0%, 100%': { transform: 'rotate(5deg)' },
          '50%': { transform: 'rotate(-5deg)' },
        },
        "bounce-infinite1": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-40px)" }
        },
        "bounce-infinite2": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-60px)" }
        },
        "bounce-infinite3": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-80px)" }
        },
        "fly": {
          "0%": { transform: "translateX(0) translateY(0) scaleX(1)" },
          "25%": { transform: "translateX(0) translateY(0) scaleX(-1)" },
          "50%": { transform: "translateX(0) translateY(0) scaleX(1)" },
          "75%": { transform: "translateX(0) translateY(0) scaleX(-1)" },
          "100%": { transform: "translateX(0) translateY(0) scaleX(1)" }
        },
      },
      animation: {
        "pop-in": "pop-in 0.6s ease-out",
        "triple-bounce": "triple-bounce 1.2s ease-in-out 1", // 1번만 재생!
        "shake1": "bounce-shake1 1.5s ease-in-out infinite", // 무한 반복!
        "shake2": "bounce-shake2 1.5s ease-in-out infinite", // 무한 반복!
        "bounce-infinite1": "bounce-infinite1 1.5s ease-in-out infinite", // 무한 반복!
        "bounce-infinite2": "bounce-infinite2 2.0s ease-in-out infinite", // 무한 반복!
        "bounce-infinite3": "bounce-infinite3 2.5s ease-in-out infinite", // 무한 반복!
        "fly": "fly 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
