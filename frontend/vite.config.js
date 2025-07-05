import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/business-data': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
      '/regenerate-headline': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
