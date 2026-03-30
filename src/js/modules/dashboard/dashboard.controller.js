import { fetchDashboardData } from "./dashboard.service";
import { state, setData, setTimeframe } from "./dashboard.state";
import { render, initView } from "./dashboard.view";
import { TIMEFRAME_LABELS } from "./dashboard.constants";


function isValidTimeframe(value) {
  return Object.prototype.hasOwnProperty.call(TIMEFRAME_LABELS, value);
}

function announceTimeframe(timeframe) {
  const statusEl = document.getElementById("timeframe-status");
  if (!statusEl) {
    console.warn('announceTimeframe: missing #timeframe-status element');
    return; // safely exit if there's nowhere to write the announcement
  }

  if (!isValidTimeframe(timeframe)) {
    console.warn(`announceTimeframe: unexpected timeframe "${timeframe}"`);
    statusEl.textContent = 'Timeframe changed.'; // safe: statusEl exists
    return;
  }
  statusEl.textContent = `Timeframe set to ${TIMEFRAME_LABELS[timeframe]}. Activity times updated.`;
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
