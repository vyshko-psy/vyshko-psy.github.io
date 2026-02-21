/**
 * New Year Animation — Soft Confetti Drift
 * 30 small colored squares drifting down elegantly.
 */
const CONTAINER_ID = 'holiday-newyear-overlay';
const MAX_CONFETTI = 30;
const COLORS = ['#FFD700', '#FF6B8A', '#64D2FF', '#A78BFA', '#34D399', '#FB923C'];
let styleEl = null;
let container = null;
let running = false;

function injectStyles() {
  if (document.getElementById('holiday-newyear-styles')) return;
  styleEl = document.createElement('style');
  styleEl.id = 'holiday-newyear-styles';
  styleEl.textContent = `
    @keyframes hol-confetti-fall {
      0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
      80% { opacity: 0.6; }
      100% { transform: translateY(100vh) rotate(var(--spin)); opacity: 0; }
    }
    .hol-confetti {
      position: absolute;
      top: -10px;
      pointer-events: none;
      will-change: transform, opacity;
      animation: hol-confetti-fall var(--duration) linear infinite;
      animation-delay: var(--delay);
    }
  `;
  document.head.appendChild(styleEl);
}

function createPiece() {
  const el = document.createElement('div');
  el.className = 'hol-confetti';
  const size = 4 + Math.random() * 5;
  const left = Math.random() * 100;
  const duration = 7 + Math.random() * 8;
  const delay = Math.random() * -duration;
  const spin = 180 + Math.random() * 360;
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];
  const isRect = Math.random() > 0.5;
  el.style.cssText = `
    left: ${left}%;
    width: ${size}px;
    height: ${isRect ? size * 1.5 : size}px;
    background: ${color};
    border-radius: ${isRect ? '1px' : '50%'};
    opacity: ${0.5 + Math.random() * 0.5};
    --duration: ${duration}s;
    --delay: ${delay}s;
    --spin: ${spin}deg;
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
  for (let i = 0; i < MAX_CONFETTI; i++) {
    container.appendChild(createPiece());
  }
  document.body.appendChild(container);
}

export function stop() {
  running = false;
  if (container) { container.remove(); container = null; }
  if (styleEl) { styleEl.remove(); styleEl = null; }
}
