import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { join } = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': join(__dirname, 'src') //把src改为@
    }
  },
  server: {
    host: '0.0.0.0'
  }
})
