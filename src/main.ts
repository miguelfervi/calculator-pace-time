import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "./composables/useTheme";
import { inject } from "@vercel/analytics";
import { injectSpeedInsights } from "@vercel/speed-insights";

// Initialize Vercel Web Analytics
inject();

// Initialize Vercel Speed Insights
injectSpeedInsights();

createApp(App).mount("#app");
