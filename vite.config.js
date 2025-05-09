import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      'analytics-bot-1.onrender.com',
      '.onrender.com' // This will allow all subdomains on onrender.com
    ],
    host: '0.0.0.0',
    port: process.env.PORT || 4173
  }
})
