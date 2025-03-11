import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {  
    proxy: {
     '/api': {
       target: 'https://note-taking-app-8825.onrender.com',
       changeOrigin: true,
       secure: false,
       rewrite: (path) => {
         return path.replace(/^\/api/, '');
       }
     }
    }
 }
})
