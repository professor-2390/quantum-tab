import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  mode:'production',
  plugins: [preact()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },},
})
