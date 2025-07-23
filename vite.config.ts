import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000
    },
    resolve: {
        alias: [{ find: '~', replacement: '/src' }]
    },
    test: {
        environment: 'jsdom'
    }
})
