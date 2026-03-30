import { fetchDashboardData } from "./dashboard.service";
import { state, setData, setTimeframe } from "./dashboard.state";
import { render, initView } from "./dashboard.view";

export async function initDashboard() {
  initView();
  try {
    const data = await fetchDashboardData();
    setData(data);
    render(state);
  } catch (error) {
    console.error("Failed to initialize dashboard:", error);
  }
}

export function updateTimeframe(timeframe) {
  if (state.timeframe === timeframe) return;

  setTimeframe(timeframe);
  render(state);
}
