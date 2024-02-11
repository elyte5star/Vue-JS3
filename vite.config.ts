import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from 'path'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://vitejs.dev/config/



export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), ''); //use process.env
  return {
    server: {
      port: 3000,
    },
    preview: {
      port: 8080,
    },
    define: {
      'process.env': env
    },
    plugins: [
      vue(),
      nodePolyfills(),
      vueJsx(),
      splitVendorChunkPlugin(),
      // copy image files for production
      viteStaticCopy({
        targets: [
          {
            src: path.resolve(__dirname, './src/assets/images') + '/[!.]*',
            dest: './src/assets/images'
          }
        ]
      })
    ],
    build: {
      assetsDir: "assets",
      emptyOutDir: true, // deletes the dist folder before building
      chunkSizeWarningLimit: 1600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
       
      }
    }
  }
});