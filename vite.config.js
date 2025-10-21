import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Cấu hình deploy tĩnh
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.js',
    css: true,
    include: ['tests/**/*.{test,spec}.{js,jsx,ts,tsx}'],
  },
})
