import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Custom domain root (workout-timer.alebettini.com)
  base: '/',
})
