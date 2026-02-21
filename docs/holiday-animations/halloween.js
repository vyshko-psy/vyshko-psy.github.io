/**
 * Halloween Animation — Floating Ghosts
 * 12 SVG ghosts floating upward with lateral oscillation.
 */
const CONTAINER_ID = 'holiday-halloween-overlay';
const MAX_GHOSTS = 12;
let styleEl = null;
let container = null;
let running = false;

const GHOST_SVG = `<svg viewBox="0 0 40 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 2C10 2 4 10 4 20v22c0 2 2 3 4 1l4-4 4 4c1 1 3 1 4 0l4-4 4 4c1 1 3 1 4 0l4-4 4 4c2 2 4 1 4-1V20C40 10 30 2 20 2z"/>
  <circle cx="14" cy="18" r="3" fill="rgba(0,0,0,0.4)"/>
  <circle cx="26" cy="18" r="3" fill="rgba(0,0,0,0.4)"/>
  <ellipse cx="20" cy="28" rx="3" ry="4" fill="rgba(0,0,0,0.3)"/>
</svg>`;

function injectStyles() {
  if (document.getElementById('holiday-halloween-styles')) return;
  styleEl = document.createElement('style');
  styleEl.id = 'holiday-halloween-styles';
  styleEl.textContent = `
    @keyframes hol-ghost-rise {
      0% { transform: translateY(110vh) translateX(0); opacity: 0; }
      10% { opacity: var(--ghost-opacity); }
      90% { opacity: var(--ghost-opacity); }
      100% { transform: translateY(-60px) translateX(var(--sway)); opacity: 0; }
    }
    @keyframes hol-ghost-sway {
      0%, 100% { margin-left: 0; }
      50% { margin-left: var(--sway); }
    }
    .hol-ghost {
      position: absolute;
      bottom: -60px;
      pointer-events: none;
      will-change: transform, opacity;
      color: rgba(255, 255, 255, 0.7);
      animation: hol-ghost-rise var(--duration) ease-in-out infinite, hol-ghost-sway 3s ease-in-out infinite;
      animation-delay: var(--delay);
    }
  `;
  document.head.appendChild(styleEl);
}

function createGhost() {
  const el = document.createElement('div');
  el.className = 'hol-ghost';
  el.innerHTML = GHOST_SVG;
  const size = 24 + Math.random() * 20;
  const left = 5 + Math.random() * 90;
  const duration = 10 + Math.random() * 10;
  const delay = Math.random() * -duration;
  const sway = -25 + Math.random() * 50;
  const opacity = 0.15 + Math.random() * 0.25;
  el.style.cssText = `
    left: ${left}%;
    width: ${size}px;
    height: ${size}px;
    --duration: ${duration}s;
    --delay: ${delay}s;
    --sway: ${sway}px;
    --ghost-opacity: ${opacity};
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
  for (let i = 0; i < MAX_GHOSTS; i++) {
    container.appendChild(createGhost());
  }
  document.body.appendChild(container);
}

export function stop() {
  running = false;
  if (container) { container.remove(); container = null; }
  if (styleEl) { styleEl.remove(); styleEl = null; }
}
