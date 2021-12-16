import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const { join } = require('path')
const path = require('path')
const { name } = require('./package')
import htmlPlugin from 'vite-plugin-index-html'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    htmlPlugin({
      input: './src/main.ts'
    })
  ],
  resolve: {
    alias: {
      '@': join(__dirname, 'src') //把src改为@
    }
  },
  server: {
    port: 3000,
    host: '0.0.0.0'
  }
})
