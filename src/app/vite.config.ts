import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [reactRefresh(), tsconfigPaths(),
   cssInjectedByJsPlugin(),],
  build: {
    rollupOptions: {
      input: "/src/index.tsx",
      output: {
        entryFileNames: "main.js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "index.css") return "index.css";
          return assetInfo.name;
        },
      },
    },
    assetsDir: "",
    sourcemap: false,
    minify: "terser", // or false to disable minification
    target: "es2018",
  },
  css: {
    preprocessorOptions: {
      includePaths: ["./src"],
    },
  },
});
