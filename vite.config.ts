import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import qiankun from 'vite-plugin-qiankun';
import { resolve } from "path";
const { name } = require('./package.json');
// useDevMode 开启时与热更新插件冲突
const useDevMode = true     // 如果是在主应用中加载子应用vite,必须打开这个,否则vite加载不成功, 单独运行没影响

function pathResolve(dir: string) {
  return resolve(__dirname, '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  let config = {
    plugins: [vue(), qiankun('vue3Vite', { useDevMode })],
    resolve: {
      alias: {
        '@': pathResolve('src') // 设置 @ 指向 src
      }
    },
    server: {
      host: '0.0.0.0',// 暴露内网ip
      port: 3000,
      cors: true,
      origin: 'http://localhost:3000/'
    },
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
    define: {
      'process.env': env
    }
  }
  return config
})