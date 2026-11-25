import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { apiApp } from './server/apiApp.js'

function apiServerPlugin(): Plugin {
  return {
    name: 'api-server-plugin',
    configureServer(server) {
      server.middlewares.use(apiApp);
    },
    configurePreviewServer(server) {
      server.middlewares.use(apiApp);
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    apiServerPlugin(),
    react(),
    tailwindcss(),
  ],
})
