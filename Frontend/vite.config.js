import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Qualquer requisição que comece com /api será redirecionada pelo Vite
      '/api': {
        target: 'http://localhost:3000', // Endereço do seu backend
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
