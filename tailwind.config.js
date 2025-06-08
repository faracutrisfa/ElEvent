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
                    100: "#",
                    200: "#",
                    300: "#",
                    400: "#",
                    500: "#",
                    600: "#",
                    700: "#",
                    800: "#",
                    900: "#",
                    1000: "#",
                    1100: "#",
                },
                cream: {
                    100: "#",
                    200: "#",
                    300: "#",
                    400: "#",
                    500: "#",
                    600: "#",
                    700: "#",
                    800: "#",
                    900: "#",
                    1000: "#",
                    1100: "#",
                },
            },
        },
    },

    plugins: [forms],
};
