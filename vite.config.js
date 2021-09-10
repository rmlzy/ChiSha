import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: process.env.NODE_ENV === 'production' ? '/ChiSha/' : '/',
  plugins: [vue()],
});
