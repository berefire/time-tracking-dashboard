import "@styles/main.css";
import { initDashboard } from "./modules/dashboard/dashboard.controller";
import { setupEvents } from "./modules/dashboard/dashboard.events";

if ( document.readyState === "loading" ) {
    document.addEventListener("DOMContentLoaded", () => {
        initDashboard();
        setupEvents();
    })} else {
    initDashboard();
    setupEvents();
}
