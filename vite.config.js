import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Tambahkan ini
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // Tambahkan ini supaya React-nya jalan
    tailwindcss()
  ],
})