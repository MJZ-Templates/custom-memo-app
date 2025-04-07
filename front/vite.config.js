import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [
      // ex) "custom-memo-front.ap-northeast-2.arkain.site"
      // add your own domain here
    ]
  },
});