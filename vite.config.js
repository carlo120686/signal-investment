import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ Cambia 'signal-investment' col nome del tuo repository GitHub
export default defineConfig({
  plugins: [react()],
  base: '/signal-investment/',
})
