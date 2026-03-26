import { updateTimeframe } from './dashboard.controller.js';

export function setupEvents() {
  const group = document.querySelector('[role="radiogroup"]');
  if (!group) return;

  const radios = [...group.querySelectorAll('[role="radio"]')];

  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-timeframe]');
    if (!btn) return;

    updateTimeframe(btn.dataset.timeframe);
    btn.focus(); 
  });

  group.addEventListener('keydown', e => {
    const currentIndex = radios.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    let nextIndex = currentIndex;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % radios.length;

    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + radios.length) % radios.length;

    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      updateTimeframe(document.activeElement.dataset.timeframe);
      return;
    }

    const nextBtn = radios[nextIndex];
    updateTimeframe(nextBtn.dataset.timeframe);
    nextBtn.focus();
  });
}
