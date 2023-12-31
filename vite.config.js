import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    modules: true, // Включение поддержки модульных стилей
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/assets/scss/helpers/_smart-grid.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
