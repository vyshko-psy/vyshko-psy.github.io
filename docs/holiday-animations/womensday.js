/**
 * International Women's Day Animation — Floating Pink Flowers
 * 25 soft pink flower petals drifting upward gracefully.
 */
const CONTAINER_ID = 'holiday-womensday-overlay';
const MAX_FLOWERS = 25;
let styleEl = null;
let container = null;
let running = false;

const FLOWERS = [
  // Cherry blossom
  `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g opacity="0.85"><circle cx="16" cy="16" r="3" fill="#e879a0"/><ellipse cx="16" cy="8" rx="5" ry="7" fill="#f9a8c9" transform="rotate(0 16 16)"/><ellipse cx="16" cy="8" rx="5" ry="7" fill="#f4b8d0" transform="rotate(72 16 16)"/><ellipse cx="16" cy="8" rx="5" ry="7" fill="#f9a8c9" transform="rotate(144 16 16)"/><ellipse cx="16" cy="8" rx="5" ry="7" fill="#f4b8d0" transform="rotate(216 16 16)"/><ellipse cx="16" cy="8" rx="5" ry="7" fill="#f9a8c9" transform="rotate(288 16 16)"/></g></svg>`,
  // Simple petal
  `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="12" rx="8" ry="5" fill="#f472b6" opacity="0.7" transform="rotate(30 12 12)"/></svg>`,
  // Rose-like
  `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g opacity="0.8"><circle cx="16" cy="16" r="4" fill="#ec4899"/><ellipse cx="16" cy="9" rx="4" ry="6" fill="#f9a8d4" transform="rotate(0 16 16)"/><ellipse cx="16" cy="9" rx="4" ry="6" fill="#fbcfe8" transform="rotate(60 16 16)"/><ellipse cx="16" cy="9" rx="4" ry="6" fill="#f9a8d4" transform="rotate(120 16 16)"/><ellipse cx="16" cy="9" rx="4" ry="6" fill="#fbcfe8" transform="rotate(180 16 16)"/><ellipse cx="16" cy="9" rx="4" ry="6" fill="#f9a8d4" transform="rotate(240 16 16)"/><ellipse cx="16" cy="9" rx="4" ry="6" fill="#fbcfe8" transform="rotate(300 16 16)"/></g></svg>`,
];

function injectStyles() {
  if (document.getElementById('holiday-womensday-styles')) return;
  styleEl = document.createElement('style');
  styleEl.id = 'holiday-womensday-styles';
  styleEl.textContent = `
    @keyframes hol-flower-float {
      0% { transform: translateY(100vh) rotate(0deg) scale(var(--s)); opacity: 0; }
      10% { opacity: 1; }
      90% { opacity: 0.8; }
      100% { transform: translateY(-30px) rotate(var(--spin)) scale(var(--s)); opacity: 0; }
    }
    .hol-flower {
      position: absolute;
      bottom: -40px;
      pointer-events: none;
      will-change: transform, opacity;
      animation: hol-flower-float var(--duration) ease-in-out infinite;
      animation-delay: var(--delay);
    }
  `;
  document.head.appendChild(styleEl);
}

function createFlower() {
  const el = document.createElement('div');
  el.className = 'hol-flower';
  const size = 18 + Math.random() * 20;
  const left = Math.random() * 100;
  const duration = 8 + Math.random() * 10;
  const delay = Math.random() * -duration;
  const spin = 60 + Math.random() * 240;
  const scale = 0.6 + Math.random() * 0.6;
  const flower = FLOWERS[Math.floor(Math.random() * FLOWERS.length)];
  el.innerHTML = flower;
  el.style.cssText = `
    left: ${left}%;
    width: ${size}px;
    height: ${size}px;
    --duration: ${duration}s;
    --delay: ${delay}s;
    --spin: ${spin}deg;
    --s: ${scale};
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
  for (let i = 0; i < MAX_FLOWERS; i++) {
    container.appendChild(createFlower());
  }
  document.body.appendChild(container);
}

export function stop() {
  running = false;
  if (container) { container.remove(); container = null; }
  if (styleEl) { styleEl.remove(); styleEl = null; }
}
