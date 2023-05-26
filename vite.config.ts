import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [solidPlugin()],
  base: "fem-expenses-chart-component",
  server: {
    port: 3000,
  },
  build: {
    target: "esnext",
  },
});
