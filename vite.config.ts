import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // GitHub Pages serves from /repo-name/ — local dev stays at /
  base: command === 'build' ? '/design-compare/' : '/',
  plugins: [react()],
}))
