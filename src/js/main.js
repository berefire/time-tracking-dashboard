import "@styles/main.css";
import { initDashboard } from "./modules/dashboard/dashboard.controller";
import { setupEvents } from "./modules/dashboard/dashboard.events";

initDashboard();
setupEvents();
