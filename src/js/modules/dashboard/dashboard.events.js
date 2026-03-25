import { updateTimeframe } from './dashboard.controller.js';

export function setupEvents() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-timeframe]');
    if (!btn) return;

    updateTimeframe(btn.dataset.timeframe);
  });
}
