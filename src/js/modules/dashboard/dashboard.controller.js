import { fetchDashboardData } from "./dashboard.service";
import { state, setData, setTimeframe } from "./dashboard.state";
import { render } from "./dashboard.view";

export async function initDashboard() {
    const data = await fetchDashboardData();
    setData(data);
    
    render(state);
}

export function updateTimeframe(timeframe) {
    setTimeframe(timeframe);
    render(state);
}