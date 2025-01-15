import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({
  server: {
    proxy: {
      '/generate-model': 'http://52.66.24.190',
    },
  },
  plugins: [react()],
})
