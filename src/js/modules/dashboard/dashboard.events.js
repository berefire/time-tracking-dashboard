import { updateTimeFrame } from "./dashboard.controller";

export function setupEventListeners() {
  const buttons = document.querySelectorAll("[data-timeframe]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const timeframe = button.dataset.timeframe;

      buttons.forEach((btn) => btn.setAttribute("aria-pressed", "false"));
      button.setAttribute("aria-pressed", "true");

      updateTimeFrame(timeframe);

      button.focus();
    });
  });
}
