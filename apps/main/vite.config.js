import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // 构建配置
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  // 开发服务器配置
  server: {
    port: 3000,
    open: true,
  },
}); 