/**
 * Valentine Animation — Floating Hearts
 * 20 pastel hearts rising and fading.
 */
const CONTAINER_ID = 'holiday-valentine-overlay';
const MAX_HEARTS = 20;
const COLORS = ['#FFB3C1', '#FF8FA3', '#FFCCD5', '#FF99AC', '#FB6F92'];
let styleEl = null;
let container = null;
let running = false;

const HEART_SVG = (color) => `<svg viewBox="0 0 24 24" fill="${color}" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
</svg>`;

function injectStyles() {
  if (document.getElementById('holiday-valentine-styles')) return;
  styleEl = document.createElement('style');
  styleEl.id = 'holiday-valentine-styles';
  styleEl.textContent = `
    @keyframes hol-heart-rise {
      0% { transform: translateY(100vh) scale(var(--heart-scale)); opacity: 0; }
      10% { opacity: var(--heart-opacity); }
      80% { opacity: var(--heart-opacity); }
      100% { transform: translateY(-60px) scale(var(--heart-scale)); opacity: 0; }
    }
    .hol-heart {
      position: absolute;
      bottom: -30px;
      pointer-events: none;
      will-change: transform, opacity;
      animation: hol-heart-rise var(--duration) ease-in-out infinite;
      animation-delay: var(--delay);
    }
  `;
  document.head.appendChild(styleEl);
}

function createHeart() {
  const el = document.createElement('div');
  el.className = 'hol-heart';
  const size = 14 + Math.random() * 14;
  const left = Math.random() * 100;
  const duration = 10 + Math.random() * 10;
  const delay = Math.random() * -duration;
  const opacity = 0.2 + Math.random() * 0.35;
  const scale = 0.7 + Math.random() * 0.6;
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  el.innerHTML = HEART_SVG(color);
  el.style.cssText = `
    left: ${left}%;
    width: ${size}px;
    height: ${size}px;
    --duration: ${duration}s;
    --delay: ${delay}s;
    --heart-opacity: ${opacity};
    --heart-scale: ${scale};
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
  for (let i = 0; i < MAX_HEARTS; i++) {
    container.appendChild(createHeart());
  }
  document.body.appendChild(container);
}

export function stop() {
  running = false;
  if (container) { container.remove(); container = null; }
  if (styleEl) { styleEl.remove(); styleEl = null; }
}
