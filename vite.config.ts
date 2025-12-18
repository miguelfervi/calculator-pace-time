import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: process.env.VERCEL ? "/" : "/pace-calculator/", // "/" for Vercel, "/pace-calculator/" for GitHub Pages
});
