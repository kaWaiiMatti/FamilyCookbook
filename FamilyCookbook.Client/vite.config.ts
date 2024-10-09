import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/weatherforecast": "http://localhost:5263",
      "/MicrosoftIdentity/": "http://localhost:5263",
      "/signin-oidc": "http://localhost:5263",
    },
  },
})
