import path from "path"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [react()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));






// export default defineConfig({
//   // prevent vite from obscuring rust errors
//   clearScreen: false,
//   server: {
//     // Tauri expects a fixed port, fail if that port is not available
//     strictPort: true,
//     // if the host Tauri is expecting is set, use it
//     host: host || false,
//     port: 1420,
//   },
//   // Env variables starting with the item of `envPrefix` will be exposed in tauri's source code through `import.meta.env`.
//   envPrefix: ['VITE_', 'TAURI_ENV_*'],
//   build: {
//     // Tauri uses Chromium on Windows and WebKit on macOS and Linux
//     target:
//       process.env.TAURI_ENV_PLATFORM == 'windows'
//         ? 'chrome105'
//         : 'safari13',
//     // don't minify for debug builds
//     minify: !process.env.TAURI_ENV_DEBUG ? 'esbuild' : false,
//     // produce sourcemaps for debug builds
//     sourcemap: !!process.env.TAURI_ENV_DEBUG,
//   },
// });