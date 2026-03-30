import { updateTimeframe } from "./dashboard.controller.js";

export function setupEvents() {
  const group = document.querySelector('[role="radiogroup"]');
  if (!group) return;

  const radios = [...group.querySelectorAll('[type="radio"]')];

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-timeframe]");
    if (!btn) return;

    updateTimeframe(btn.dataset.timeframe);
    btn.focus();
  });

  // Helper that returns true for activation keys (Enter or Space)
  function isActivationKey(e) {
    const k = e.key; // value depends on browser/locale
    const c = e.code; // physical key, consistent for Space -> "Space"
    return (
      k === "Enter" || // standard Enter key
      k === " " || // some browsers report space as ' ' (space char)
      k === "Spacebar" || // older engines (legacy)
      c === "Space" // modern standardized code for spacebar
    );
  }

  group.addEventListener("keydown", (e) => {
    const currentIndex = radios.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % radios.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + radios.length) % radios.length;
    } else if (isActivationKey(e)) {
      e.preventDefault();

      const active = document.activeElement;
      active.checked = true;
      updateTimeframe(active.dataset.timeframe);
      return;
    }

    const nextBtn = radios[nextIndex];

    nextBtn.checked = true;
    updateTimeframe(nextBtn.dataset.timeframe);
    nextBtn.focus();
  });
}
