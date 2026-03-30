import { ACTIVITY_MAP } from "./dashboard.mapper.js";

let elements = {};

export function initView() {
  // Build a safe map of elements and throw helpful errors in dev
elements = Object.fromEntries(
  [...document.querySelectorAll("[data-activity]")].map((card) => {
    const key = card.dataset.activity;
    const current = card.querySelector('.activity__current-time'); // may be null
    const previous = card.querySelector('.activity__previous-time');
    const label = card.querySelector('.activity__previous-timeframe');

    // Fail early so the stacktrace points to a clear cause (remove or change for prod)
    if (!current || !previous || !label) {
      throw new Error(`Missing activity element in card "${key}". Check selectors/HTML.`);
    }

    return [key, { currentTime: current, previousTime: previous, labelTime: label }];
  }));
}

const LABELS = {
    daily: "Yesterday",
    weekly: "Last Week",
    monthly: "Last Month",
}

// after — defensive checks and defaults
function mapActivity(activity, timeframe) {
    // Use optional chaining to avoid throwing if timeframes or key are missing
    const timeframeData = activity?.timeframes?.[timeframe];

    // Provide sensible defaults so UI can render even with missing data
    const current = timeframeData?.current ?? 0;   // default 0 hours
    const previous = timeframeData?.previous ?? 0; // default 0 hours

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
