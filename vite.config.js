import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { baseURL } from './config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: baseURL,
})
