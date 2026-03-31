import { updateTimeframe } from "./dashboard.controller.js";

export function setupEvents() {
  const group = document.querySelector('.profile-card__time');
  if (!group) return;

  group.addEventListener("change", (e) => {
    const input = e.target;

    if (!input.matches('[type="radio"]')) return;

    updateTimeframe(input.value);
  });
}
