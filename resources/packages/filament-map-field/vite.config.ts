import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import { viteExternalsPlugin } from 'vite-plugin-externals'

// https://vitejs.dev/config/
// https://github.com/Accudio/async-alpine/issues/27
export default defineConfig({
  build: {
    // rollupOptions: {
    //   output: {
    //     entryFileNames: 'assets/[name].js',
    //     chunkFileNames: 'assets/[name].js',
    //     assetFileNames: 'assets/[name][extname]',
    //   },
    // },
    manifest: true,
  },
  plugins: [
    react(),
    viteExternalsPlugin({
      alpinejs: 'Alpine',
      'async-alpine': 'AsyncAlpine',
    }),
  ],
})
