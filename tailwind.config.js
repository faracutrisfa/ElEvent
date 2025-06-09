import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                Lexend: ["Lexend", "sans-serif"],
                tiltWrap: ["Tilt Warp", "sans-serif"],
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: "1rem",
                    sm: "2rem",
                    lg: "3rem",
                    xl: "4rem",
                },
                screens: {
                    sm: "600px",
                    md: "768px",
                    lg: "1024px",
                    xl: "1240px",
                    "2xl": "1440px",
                },
            },
            colors: {
                blue: {
                    50: "#EFF6FF",
                    100: "#D4E0F1",
                    200: "#AAC2E3",
                    300: "#7FA4D6",
                    400: "#5586C8",
                    500: "#2A68BA",
                    600: "#004AAD",
                    700: "#003D90",
                    800: "#003173",
                    900: "#002556",
                    1000: "#001839",
                    1100: "#000C1C",
                },
                mustard: {
                    100: "#FEF5D4",
                    200: "#FEEBAA",
                    300: "#FEE17F",
                    400: "#FED755",
                    500: "#FECD2A",
                    600: "#FEC400",
                    700: "#D3A300",
                    800: "#A98200",
                    900: "#7F6200",
                    1000: "#544100",
                    1100: "#2A2000",
                },
                cream: {
                    100: "#FDFDFC",
                    200: "#FBFBFA",
                    300: "#FAF9F8",
                    400: "#F8F7F6",
                    500: "#F6F5F4",
                    600: "#F5F4F2",
                    700: "#CCCBC9",
                    800: "#A3A2A1",
                    900: "#7A7A79",
                    1000: "#7A7A79",
                    1100: "#282828",
                },
            },
            backgroundImage: (theme) => ({
                gradasi: "linear-gradient(to bottom, #004AAD, #001E47)",
            }),
        },
    },

    plugins: [
        forms,
        function ({ addUtilities, theme }) {
            const newUtilities = {
                ".text-gradasi": {
                    "background-image":
                        "linear-gradient(to bottom, #004AAD, #001E47)",
                    "background-clip": "text",
                    "-webkit-text-fill-color": "transparent",
                },
            };
            addUtilities(newUtilities, ["responsive", "hover"]);
        },
    ],
};
