/**
 * International Women's Day Animation — Floating Pink Flowers & Green Leaves
 * 35 elements drifting from sides and bottom across the full viewport.
 */
const CONTAINER_ID = 'holiday-womensday-overlay';
const MAX_ITEMS = 35;
let styleEl = null;
let container = null;
let running = false;

const FLOWERS = [
  // Cherry blossom
  `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g opacity="0.9"><circle cx="16" cy="16" r="3" fill="#e879a0"/><ellipse cx="16" cy="8" rx="5" ry="7" fill="#f9a8c9" transform="rotate(0 16 16)"/><ellipse cx="16" cy="8" rx="5" ry="7" fill="#f4b8d0" transform="rotate(72 16 16)"/><ellipse cx="16" cy="8" rx="5" ry="7" fill="#f9a8c9" transform="rotate(144 16 16)"/><ellipse cx="16" cy="8" rx="5" ry="7" fill="#f4b8d0" transform="rotate(216 16 16)"/><ellipse cx="16" cy="8" rx="5" ry="7" fill="#f9a8c9" transform="rotate(288 16 16)"/></g></svg>`,
  // Simple petal
  `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="12" rx="8" ry="5" fill="#f472b6" opacity="0.8" transform="rotate(30 12 12)"/></svg>`,
  // Rose-like
  `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g opacity="0.85"><circle cx="16" cy="16" r="4" fill="#ec4899"/><ellipse cx="16" cy="9" rx="4" ry="6" fill="#f9a8d4" transform="rotate(0 16 16)"/><ellipse cx="16" cy="9" rx="4" ry="6" fill="#fbcfe8" transform="rotate(60 16 16)"/><ellipse cx="16" cy="9" rx="4" ry="6" fill="#f9a8d4" transform="rotate(120 16 16)"/><ellipse cx="16" cy="9" rx="4" ry="6" fill="#fbcfe8" transform="rotate(180 16 16)"/><ellipse cx="16" cy="9" rx="4" ry="6" fill="#f9a8d4" transform="rotate(240 16 16)"/><ellipse cx="16" cy="9" rx="4" ry="6" fill="#fbcfe8" transform="rotate(300 16 16)"/></g></svg>`,
];

const LEAVES = [
  // Simple leaf
  `<svg viewBox="0 0 24 32" xmlns="http://www.w3.org/2000/svg"><path d="M12 2 C6 8 2 16 6 24 C8 28 12 30 12 30 C12 30 16 28 18 24 C22 16 18 8 12 2Z" fill="#4ade80" opacity="0.7"/><line x1="12" y1="6" x2="12" y2="28" stroke="#22c55e" stroke-width="0.8" opacity="0.5"/></svg>`,
  // Round leaf
  `<svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg"><ellipse cx="14" cy="14" rx="10" ry="7" fill="#86efac" opacity="0.65" transform="rotate(-20 14 14)"/><line x1="6" y1="16" x2="22" y2="12" stroke="#4ade80" stroke-width="0.6" opacity="0.4"/></svg>`,
  // Small sprig
  `<svg viewBox="0 0 20 28" xmlns="http://www.w3.org/2000/svg"><path d="M10 2 C5 6 3 12 7 18 C8 20 10 22 10 22 C10 22 12 20 13 18 C17 12 15 6 10 2Z" fill="#34d399" opacity="0.6"/></svg>`,
];

const ALL_ITEMS = [...FLOWERS, ...FLOWERS, ...LEAVES]; // 2:1 flower-to-leaf ratio

function injectStyles() {
  if (document.getElementById('holiday-womensday-styles')) return;
  styleEl = document.createElement('style');
  styleEl.id = 'holiday-womensday-styles';
  styleEl.textContent = `
    @keyframes hol-flower-rise {
      0% { transform: translate(0, 0) rotate(0deg) scale(var(--s)); opacity: 0; }
      8% { opacity: var(--peak-opacity); }
      85% { opacity: var(--peak-opacity); }
      100% { transform: translate(var(--dx), var(--dy)) rotate(var(--spin)) scale(var(--s)); opacity: 0; }
    }
    .hol-flower {
      position: absolute;
      pointer-events: none;
      will-change: transform, opacity;
      animation: hol-flower-rise var(--duration) ease-in-out infinite;
      animation-delay: var(--delay);
    }
  `;
  document.head.appendChild(styleEl);
}

function createItem() {
  const el = document.createElement('div');
  el.className = 'hol-flower';
  const size = 22 + Math.random() * 24;
  const duration = 14 + Math.random() * 12;
  const delay = Math.random() * -duration;
  const spin = 60 + Math.random() * 300;
  const scale = 0.7 + Math.random() * 0.6;
  const item = ALL_ITEMS[Math.floor(Math.random() * ALL_ITEMS.length)];
  const peakOpacity = 0.4 + Math.random() * 0.25;

  // Spawn from different edges for more coverage
  const edge = Math.random();
  let startX, startY, dx, dy;
  if (edge < 0.5) {
    // From bottom, rise up
    startX = Math.random() * 100;
    startY = 100;
    dx = (-20 + Math.random() * 40);
    dy = -(80 + Math.random() * 30);
  } else if (edge < 0.75) {
    // From left side
    startX = -5;
    startY = 30 + Math.random() * 60;
    dx = 30 + Math.random() * 40;
    dy = -(40 + Math.random() * 40);
  } else {
    // From right side
    startX = 105;
    startY = 30 + Math.random() * 60;
    dx = -(30 + Math.random() * 40);
    dy = -(40 + Math.random() * 40);
  }

  el.innerHTML = item;
  el.style.cssText = `
    left: ${startX}%;
    top: ${startY}%;
    width: ${size}px;
    height: ${size}px;
    --duration: ${duration}s;
    --delay: ${delay}s;
    --spin: ${spin}deg;
    --s: ${scale};
    --dx: ${dx}vw;
    --dy: ${dy}vh;
    --peak-opacity: ${peakOpacity};
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
  for (let i = 0; i < MAX_ITEMS; i++) {
    container.appendChild(createItem());
  }
  document.body.appendChild(container);
}

export function stop() {
  running = false;
  if (container) { container.remove(); container = null; }
  if (styleEl) { styleEl.remove(); styleEl = null; }
}
