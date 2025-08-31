/**
 * ==========================================================================
 * Tailwind CSS Configuration for CDN
 * ==========================================================================
 * Version: 1.1
 * Author: Irfan Ukil
 *
 * --- DESCRIPTION ---
 * This file extends the default Tailwind CSS theme with custom settings for this project.
 * It's used to define the website's color palette, fonts, and other design
 * tokens in one central place, ensuring brand consistency.
 *
 * --- HOW IT WORKS ---
 * The `<script src="https://cdn.tailwindcss.com"></script>` in the HTML files
 * automatically detects a global JavaScript object named `tailwind.config`.
 * It merges the settings from this object with its default configuration.
 *
 * This allows you to use custom utility classes in your HTML, such as
 * `bg-primary-500` or `text-secondary-700`, which correspond to the
 * colors defined below.
 * ==========================================================================
 */
tailwind.config = {
    theme: {
        /**
         * The 'extend' object allows us to add new values to Tailwind's
         * default theme without overwriting the existing ones.
         */
        extend: {
            /**
             * The 'colors' object is used to define a custom color palette.
             * We've defined 'primary' (a purple shade) and 'secondary' (a blue shade)
             * color schemes. Each color has a range of shades from 50 (lightest)
             * to 900 (darkest), following Tailwind's naming convention.
             */
            colors: {
                primary: {
                    50: '#f5f3ff',
                    100: '#ede9fe',
                    200: '#ddd6fe',
                    300: '#c4b5fd',
                    400: '#a78bfa',
                    500: '#8b5cf6',
                    600: '#7c3aed',
                    700: '#6d28d9',
                    800: '#5b21b6',
                    900: '#4c1d95',
                },
                secondary: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',
                }
            }
        }
    }
}