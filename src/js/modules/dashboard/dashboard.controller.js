import { fetchDashboardData } from "./dashboard.service";
import { state, setData, setTimeframe } from "./dashboard.state";
import { render, initView } from "./dashboard.view";
import { TIMEFRAME_LABELS } from "./dashboard.constants";


function isValidTimeframe(value) {
  return Object.prototype.hasOwnProperty.call(TIMEFRAME_LABELS, value);
}

function announceTimeframe(timeframe) {
  const statusEl = document.getElementById("timeframe-status");
  if (!isValidTimeframe(timeframe)) {
    console.warn(`announceTimeframe: unexpected timeframe "${timeframe}"`);
    // choose whether to early-return or announce a neutral message
    statusEl.textContent = 'Timeframe changed.'; // less specific but always valid
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
