/**
 * Christmas Animation — Falling Snow
 * Lightweight CSS-based snowflakes, max 40 elements.
 * Respects pointer-events: none overlay.
 */
const CONTAINER_ID = 'holiday-christmas-overlay';
const MAX_FLAKES = 40;
let styleEl = null;
let container = null;
let running = false;

function injectStyles() {
  if (document.getElementById('holiday-christmas-styles')) return;
  styleEl = document.createElement('style');
  styleEl.id = 'holiday-christmas-styles';
  styleEl.textContent = `
    @keyframes hol-snow-fall {
      0% { transform: translateY(-10px) translateX(0); opacity: 1; }
      50% { transform: translateY(50vh) translateX(var(--drift)); opacity: 0.8; }
      100% { transform: translateY(100vh) translateX(calc(var(--drift) * -0.5)); opacity: 0; }
    }
    .hol-snowflake {
      position: absolute;
      top: -20px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.85);
      pointer-events: none;
      will-change: transform, opacity;
      animation: hol-snow-fall var(--duration) linear infinite;
      animation-delay: var(--delay);
    }
  `;
  document.head.appendChild(styleEl);
}

function createFlake() {
  const el = document.createElement('div');
  el.className = 'hol-snowflake';
  const size = 3 + Math.random() * 6;
  const left = Math.random() * 100;
  const duration = 6 + Math.random() * 8;
  const delay = Math.random() * -duration;
  const drift = -30 + Math.random() * 60;
  el.style.cssText = `
    left: ${left}%;
    width: ${size}px;
    height: ${size}px;
    opacity: ${0.4 + Math.random() * 0.6};
    --duration: ${duration}s;
    --delay: ${delay}s;
    --drift: ${drift}px;
  `;
  return el;
}

export function start() {
  if (running) return;
  running = true;
  injectStyles();
  container = document.createElement('div');
  container.id = CONTAINER_ID;
  container.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden;';
  for (let i = 0; i < MAX_FLAKES; i++) {
    container.appendChild(createFlake());
  }
  document.body.appendChild(container);
}

export function stop() {
  running = false;
  if (container) { container.remove(); container = null; }
  if (styleEl) { styleEl.remove(); styleEl = null; }
}
