import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/



export default defineConfig(({ command, mode }) => {


  const env = loadEnv(mode, process.cwd(), ''); //use process.env

  return {
    define: {
      'process.env': env
    },
    plugins: [
      vue(),
      vueJsx(),
    ],
    build: {
      emptyOutDir: true, // deletes the dist folder before building
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
});