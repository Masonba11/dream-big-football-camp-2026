import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Browser calls /create-checkout-session on port 3000; Vite forwards to Express on 4242 (no CORS, works with 127.0.0.1 or localhost).
const checkoutSessionProxy = {
  '/create-checkout-session': {
    target: 'http://127.0.0.1:4242',
    changeOrigin: true,
  },
} as const

// https://vite.dev/config/
export default defineConfig({
  appType: 'spa',
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    strictPort: true,
    proxy: checkoutSessionProxy,
  },
  preview: {
    port: 3000,
    strictPort: true,
    proxy: checkoutSessionProxy,
  },
})
