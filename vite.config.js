import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://c855-2001-448a-11b0-1ae8-9853-3c93-4efa-4314.ngrok-free.app/",
        changeOrigin: true,
      },
    },
  },
});
