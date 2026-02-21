/**
 * Easter Animation — Floating Decorated Eggs
 * 15 colorful eggs rising gently with slight rotation.
 */
const CONTAINER_ID = 'holiday-easter-overlay';
const MAX_EGGS = 15;
const PATTERNS = [
  { bg: '#FFB347', stripe: '#FF6B6B', dot: '#FFF' },
  { bg: '#87CEEB', stripe: '#4A90D9', dot: '#FFF' },
  { bg: '#98FB98', stripe: '#3CB371', dot: '#FFD700' },
  { bg: '#DDA0DD', stripe: '#9B59B6', dot: '#FFF' },
  { bg: '#FFDAB9', stripe: '#E67E22', dot: '#FF6B8A' },
  { bg: '#F0E68C', stripe: '#DAA520', dot: '#FF6B6B' },
];
let styleEl = null;
let container = null;
let running = false;

function eggSVG(p) {
  return `<svg viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="15" cy="22" rx="12" ry="16" fill="${p.bg}"/>
    <rect x="3" y="18" width="24" height="3" rx="1" fill="${p.stripe}" opacity="0.6"/>
    <rect x="5" y="24" width="20" height="2.5" rx="1" fill="${p.stripe}" opacity="0.4"/>
    <circle cx="10" cy="14" r="1.5" fill="${p.dot}" opacity="0.7"/>
    <circle cx="20" cy="14" r="1.5" fill="${p.dot}" opacity="0.7"/>
    <circle cx="15" cy="30" r="1.2" fill="${p.dot}" opacity="0.5"/>
  </svg>`;
}

function injectStyles() {
  if (document.getElementById('holiday-easter-styles')) return;
  styleEl = document.createElement('style');
  styleEl.id = 'holiday-easter-styles';
  styleEl.textContent = `
    @keyframes hol-egg-rise {
      0% { transform: translateY(110vh) rotate(0deg); opacity: 0; }
      10% { opacity: var(--egg-opacity); }
      85% { opacity: var(--egg-opacity); }
      100% { transform: translateY(-60px) rotate(var(--egg-spin)); opacity: 0; }
    }
    .hol-egg {
      position: absolute;
      bottom: -50px;
      pointer-events: none;
      will-change: transform, opacity;
      animation: hol-egg-rise var(--duration) ease-in-out infinite;
      animation-delay: var(--delay);
    }
  `;
  document.head.appendChild(styleEl);
}

function createEgg() {
  const el = document.createElement('div');
  el.className = 'hol-egg';
  const size = 22 + Math.random() * 18;
  const left = Math.random() * 100;
  const duration = 12 + Math.random() * 10;
  const delay = Math.random() * -duration;
  const opacity = 0.25 + Math.random() * 0.35;
  const spin = -30 + Math.random() * 60;
  const pattern = PATTERNS[Math.floor(Math.random() * PATTERNS.length)];
  el.innerHTML = eggSVG(pattern);
  el.style.cssText = `
    left: ${left}%;
    width: ${size}px;
    height: ${size * 1.33}px;
    --duration: ${duration}s;
    --delay: ${delay}s;
    --egg-opacity: ${opacity};
    --egg-spin: ${spin}deg;
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
  for (let i = 0; i < MAX_EGGS; i++) {
    container.appendChild(createEgg());
  }
  document.body.appendChild(container);
}

export function stop() {
  running = false;
  if (container) { container.remove(); container = null; }
  if (styleEl) { styleEl.remove(); styleEl = null; }
}
