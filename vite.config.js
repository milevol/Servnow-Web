import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        "/api": env.VITE_API_BASE_URL,
      },
    },
  });
};

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": import.meta.env.VITE_API_URL,
//     },
//   },
// });
