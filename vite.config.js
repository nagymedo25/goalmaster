import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: "/goalmaster/", // اسم الريبو الخاص بك على GitHub
  plugins: [react()],
})
