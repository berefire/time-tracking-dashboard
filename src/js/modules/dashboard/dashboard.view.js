function getLabel(timeframe) {
  switch (timeframe) {
    case "daily":
      return "Yesterday";
    case "weekly":
      return "Last Week";
    case "monthly":
      return "Last Month";
    default:
      return "";
  }
}

function mapTitleToKey(title) {
  return title.toLowerCase().replace(/\s+/g, "-");
}

export function render(state) {
  state.data.forEach((activity) => {
    const key = mapTitleToKey(activity.title);

    const card = document.querySelector(`[data-activity="${key}"]`);
    if (!card) return;

    const currentTime = card.querySelector('.activity__current-time');
    const previousTime = card.querySelector('.activity__previous-time');
    const labelTime = card.querySelector('.activity__previous-timeframe');

    const timeframeData = activity.timeframes[state.timeframe];

    currentTime.textContent = `${timeframeData.current}hrs`;
    previousTime.textContent = `${timeframeData.previous}hrs`;
    labelTime.textContent = getLabel(state.timeframe);
  });
}
