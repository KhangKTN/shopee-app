/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#ee4d2d'
            },
            backgroundColor: {
                primary: '#ee4d2d'
            },
            animation: {
                'scale-up-center': 'scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both'
            },
            keyframes: {
                'scale-up-center': {
                    '0%': {
                        transform: 'scale(0.5)'
                    },
                    '100%': {
                        transform: 'scale(1)'
                    }
                }
            }
        }
    },
    plugins: []
}
