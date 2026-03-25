import { fetchDashboardData } from "./dashboard.service";
import { state, setData, setTimeframe } from "./dashboard.state";
import { render, syncPressedState } from "./dashboard.view";

export async function initDashboard() {
    const data = await fetchDashboardData();
    setData(data);
    
    render(state);
    syncPressedState(state.timeframe);
}

export function updateTimeframe(timeframe) {
    setTimeframe(timeframe);
    render(state);
    syncPressedState(timeframe);
}