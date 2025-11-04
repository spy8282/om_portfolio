import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: set your repo name here 👇
export default defineConfig({
  base: "om_portfolio/",
  plugins: [react()],
});
