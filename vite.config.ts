import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Production uses `/api/create-checkout-session` (Vercel). Local dev: same path proxies to Express `/create-checkout-session` on 4242.
const checkoutSessionProxy = {
  '/api/create-checkout-session': {
    target: 'http://127.0.0.1:4242',
    changeOrigin: true,
    rewrite: () => '/create-checkout-session',
  },
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
    // Listen on every interface so you can open the site via LAN IP or machine hostname (not only localhost).
    host: true,
    port: 3000,
    // If 3000 is in use, Vite picks the next free port — use the URL printed in the terminal.
    strictPort: false,
    proxy: checkoutSessionProxy,
  },
  preview: {
    port: 3000,
    strictPort: false,
    proxy: checkoutSessionProxy,
  },
})
