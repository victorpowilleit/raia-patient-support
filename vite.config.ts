import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react()],
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {enabled: true},
      manifest:{
        orientation: "portrait",
        lang: "pt-br",
        name: "Raia Customer Support Counter",
        short_name: "RCS",
      }
    })
  ],
})
