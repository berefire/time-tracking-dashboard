import "@styles/main.css";
import { initDashboard } from "./modules/dashboard/dashboard.controller";
import { setupEventListeners } from "./modules/dashboard/dashboard.events";

initDashboard();
setupEventListeners();
