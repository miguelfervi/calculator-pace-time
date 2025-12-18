import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "./composables/useTheme";
import { inject } from "@vercel/analytics";

// Initialize Vercel Web Analytics
inject();

createApp(App).mount("#app");
