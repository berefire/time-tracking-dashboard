import { fetchDashboardData } from "./dashboard.service";
import { state, setData, setTimeFrame } from "./dashboard.state";
import { render } from "./dashboard.view";

export async function initDashboard() {
    const data = await fetchDashboardData();
    setData(data);
    render(state);
}

export function updateTimeFrame(timeframe) {
    setTimeFrame(timeframe);
    render(state);
}