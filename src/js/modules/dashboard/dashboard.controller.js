import { fetchDashboardData } from "./dashboard.service";
import { state, setData, setTimeframe } from "./dashboard.state";
import { render, initView } from "./dashboard.view";


function announceTimeframe(timeframe) {
  const statusEl = document.getElementById('timeframe-status');
  if (!statusEl) return;

  const labels = {
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly'
  };

  statusEl.textContent = `Timeframe set to ${labels[timeframe]}. Activity times updated.`;
}

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

  announceTimeframe(timeframe);
}
