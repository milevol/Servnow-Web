import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
=======
  server: {
    proxy: {
      "/api": "https://www.servnow.kro.kr",
    },
  },
>>>>>>> develop
});
