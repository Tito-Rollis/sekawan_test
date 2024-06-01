/*eslint-env node*/

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                customBlue: 'var(--color-custom-blue)',
                customBlack: 'var(--color-custom-black)',
                customGray: 'var(--color-custom-gray)',
                customMuted: 'var(--color-custom-muted)',
            },
            // textColor: {
            //     customBlue: 'var(--color-custom-blue)',
            //     customBlack: 'var(--color-custom-black)',
            //     customGray: 'var(--color-custom-gray)',
            //     customMuted: 'var(--color-custom-muted)',
            // },
        },
    },
    plugins: [],
};
