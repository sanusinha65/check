import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "postcss.config.cjs",
  },
  ssr: {
    noExternal: ['@fortawesome/fontawesome-free/css/all.min.css']
  },
  build: {
    cssCodeSplit: false
  }
});
