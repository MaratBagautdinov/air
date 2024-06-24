/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./app.vue",
        "./error.vue",
    ],
    theme: {
        extend: {
            colors: {
                dark: "#121212",
                gray: "#787878",
                orange: "#FF8562",
                light: "#D9D9D9",
            },
            fontSize: {
                12: "12px",
                14: "14px",
                base: "16px",
                18: "18px",
                20: "20px",
                22: "22px",
                24: "24px",
                30: "30px",
                34: "34px",
            },
        },
    },
    plugins: [],
};
