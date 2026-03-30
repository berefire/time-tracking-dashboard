import { ACTIVITY_MAP } from "./dashboard.mapper.js";

let elements = {};

export function initView() {
  elements = Object.fromEntries(
    [...document.querySelectorAll("[data-activity]")].map((card) => [
      card.dataset.activity,
      {
        currentTime: card.querySelector('.activity__current-time'),
        previousTime: card.querySelector('.activity__previous-time'),
        labelTime: card.querySelector('.activity__previous-timeframe'),
      }
    ])
  );
}

const LABELS = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
}

function mapActivity(activity, timeframe) {
    const { current, previous } = activity.timeframes[timeframe];
    return {
        current: `${current}hrs`,
        previous: `${previous}hrs`
    };
}

export function render(state) {
  state.data.forEach((activity) => {
    const key = ACTIVITY_MAP[activity.title];
    const actions = elements[key];

    if (!actions) return;

    const data = mapActivity(activity, state.timeframe);

    actions.currentTime.textContent = data.current;
    actions.previousTime.textContent = data.previous;
    actions.labelTime.textContent = LABELS[state.timeframe];
  });
}
