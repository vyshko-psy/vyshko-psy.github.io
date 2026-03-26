/**
 * Easter Animation — Spectacular Decorated Eggs with Sparkles & Petals
 * Colorful eggs rising with wobble, glowing sparkles, and flower petals.
 */
const CONTAINER_ID = 'holiday-easter-overlay';
const MAX_EGGS = 18;
const MAX_SPARKLES = 12;
const MAX_PETALS = 10;

const PATTERNS = [
  { bg: '#FFB347', stripe: '#FF6B6B', dot: '#FFF', glow: '#FFD700' },
  { bg: '#87CEEB', stripe: '#4A90D9', dot: '#FFF', glow: '#00BFFF' },
  { bg: '#98FB98', stripe: '#3CB371', dot: '#FFD700', glow: '#7CFC00' },
  { bg: '#DDA0DD', stripe: '#9B59B6', dot: '#FFF', glow: '#DA70D6' },
  { bg: '#FFDAB9', stripe: '#E67E22', dot: '#FF6B8A', glow: '#FFA07A' },
  { bg: '#F0E68C', stripe: '#DAA520', dot: '#FF6B6B', glow: '#FFD700' },
  { bg: '#FF69B4', stripe: '#FF1493', dot: '#FFF', glow: '#FF69B4' },
  { bg: '#40E0D0', stripe: '#20B2AA', dot: '#FFD700', glow: '#48D1CC' },
];

let styleEl = null;
let container = null;
let running = false;

function eggSVG(p) {
  return `<svg viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="eg${p.bg.slice(1)}" cx="40%" cy="35%" r="60%">
        <stop offset="0%" stop-color="#fff" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="${p.bg}" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="15" cy="22" rx="12" ry="16" fill="${p.bg}"/>
    <ellipse cx="15" cy="22" rx="12" ry="16" fill="url(#eg${p.bg.slice(1)})"/>
    <path d="M5 17 Q10 15 15 17 Q20 15 25 17" stroke="${p.stripe}" stroke-width="2" fill="none" opacity="0.6"/>
    <path d="M6 23 Q11 25 15 23 Q19 25 24 23" stroke="${p.stripe}" stroke-width="1.8" fill="none" opacity="0.5"/>
    <circle cx="9" cy="13" r="1.8" fill="${p.dot}" opacity="0.8"/>
    <circle cx="21" cy="13" r="1.8" fill="${p.dot}" opacity="0.8"/>
    <circle cx="15" cy="10" r="1.2" fill="${p.dot}" opacity="0.6"/>
    <path d="M12 28 L15 32 L18 28" stroke="${p.stripe}" stroke-width="1.2" fill="none" opacity="0.5"/>
    <ellipse cx="15" cy="22" rx="12" ry="16" fill="none" stroke="#fff" stroke-width="0.5" opacity="0.3"/>
  </svg>`;
}

function sparkleSVG() {
  const colors = ['#FFD700', '#FFF', '#FF69B4', '#87CEEB', '#98FB98'];
  const c = colors[Math.floor(Math.random() * colors.length)];
  return `<svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="${c}" opacity="0.9"/>
  </svg>`;
}

function petalSVG() {
  const colors = ['#FFB6C1', '#FF69B4', '#DDA0DD', '#FFDAB9', '#F0E68C', '#98FB98'];
  const c = colors[Math.floor(Math.random() * colors.length)];
  return `<svg viewBox="0 0 16 20" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="8" cy="10" rx="5" ry="9" fill="${c}" opacity="0.6"/>
    <ellipse cx="8" cy="10" rx="2" ry="7" fill="#fff" opacity="0.2"/>
  </svg>`;
}

function injectStyles() {
  if (document.getElementById('holiday-easter-styles')) return;
  styleEl = document.createElement('style');
  styleEl.id = 'holiday-easter-styles';
  styleEl.textContent = `
    @keyframes hol-egg-rise {
      0% { transform: translateY(110vh) rotate(0deg) scale(0.6); opacity: 0; }
      8% { opacity: var(--egg-opacity); transform: translateY(95vh) rotate(calc(var(--egg-spin) * 0.1)) scale(0.9); }
      50% { transform: translateY(50vh) rotate(calc(var(--egg-spin) * 0.5)) scale(1); }
      85% { opacity: var(--egg-opacity); }
      100% { transform: translateY(-80px) rotate(var(--egg-spin)) scale(0.8); opacity: 0; }
    }
    @keyframes hol-egg-wobble {
      0%, 100% { margin-left: 0; }
      25% { margin-left: calc(var(--wobble) * 1px); }
      75% { margin-left: calc(var(--wobble) * -1px); }
    }
    @keyframes hol-sparkle-float {
      0% { transform: translateY(100vh) scale(0) rotate(0deg); opacity: 0; }
      15% { opacity: 1; transform: translateY(80vh) scale(1) rotate(90deg); }
      50% { opacity: 0.6; transform: translateY(40vh) scale(0.7) rotate(180deg); }
      70% { opacity: 1; transform: translateY(20vh) scale(1.2) rotate(270deg); }
      100% { transform: translateY(-50px) scale(0) rotate(360deg); opacity: 0; }
    }
    @keyframes hol-petal-drift {
      0% { transform: translateY(-20px) rotate(0deg) translateX(0); opacity: 0; }
      10% { opacity: var(--petal-opacity); }
      50% { transform: translateY(50vh) rotate(180deg) translateX(calc(var(--drift) * 1px)); }
      85% { opacity: var(--petal-opacity); }
      100% { transform: translateY(110vh) rotate(360deg) translateX(calc(var(--drift) * -0.5px)); opacity: 0; }
    }
    .hol-egg {
      position: absolute;
      bottom: -50px;
      pointer-events: none;
      will-change: transform, opacity;
      animation: hol-egg-rise var(--duration) ease-in-out infinite, hol-egg-wobble calc(var(--duration) * 0.4) ease-in-out infinite;
      animation-delay: var(--delay);
      filter: drop-shadow(0 0 6px var(--glow-color));
    }
    .hol-sparkle {
      position: absolute;
      top: 0;
      pointer-events: none;
      will-change: transform, opacity;
      animation: hol-sparkle-float var(--duration) ease-in-out infinite;
      animation-delay: var(--delay);
    }
    .hol-petal {
      position: absolute;
      top: -30px;
      pointer-events: none;
      will-change: transform, opacity;
      animation: hol-petal-drift var(--duration) ease-in-out infinite;
      animation-delay: var(--delay);
    }
  `;
  document.head.appendChild(styleEl);
}

function createEgg() {
  const el = document.createElement('div');
  el.className = 'hol-egg';
  const size = 24 + Math.random() * 22;
  const left = Math.random() * 100;
  const duration = 10 + Math.random() * 12;
  const delay = Math.random() * -duration;
  const opacity = 0.3 + Math.random() * 0.4;
  const spin = -40 + Math.random() * 80;
  const wobble = 8 + Math.random() * 20;
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
    --wobble: ${wobble};
    --glow-color: ${pattern.glow}40;
  `;
  return el;
}

function createSparkle() {
  const el = document.createElement('div');
  el.className = 'hol-sparkle';
  const size = 8 + Math.random() * 14;
  const left = Math.random() * 100;
  const duration = 8 + Math.random() * 10;
  const delay = Math.random() * -duration;
  el.innerHTML = sparkleSVG();
  el.style.cssText = `
    left: ${left}%;
    width: ${size}px;
    height: ${size}px;
    --duration: ${duration}s;
    --delay: ${delay}s;
  `;
  return el;
}

function createPetal() {
  const el = document.createElement('div');
  el.className = 'hol-petal';
  const size = 10 + Math.random() * 12;
  const left = Math.random() * 100;
  const duration = 14 + Math.random() * 10;
  const delay = Math.random() * -duration;
  const drift = 30 + Math.random() * 60;
  const opacity = 0.3 + Math.random() * 0.35;
  el.innerHTML = petalSVG();
  el.style.cssText = `
    left: ${left}%;
    width: ${size}px;
    height: ${size * 1.25}px;
    --duration: ${duration}s;
    --delay: ${delay}s;
    --drift: ${drift};
    --petal-opacity: ${opacity};
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
  for (let i = 0; i < MAX_EGGS; i++) container.appendChild(createEgg());
  for (let i = 0; i < MAX_SPARKLES; i++) container.appendChild(createSparkle());
  for (let i = 0; i < MAX_PETALS; i++) container.appendChild(createPetal());
  document.body.appendChild(container);
}

export function stop() {
  running = false;
  if (container) { container.remove(); container = null; }
  if (styleEl) { styleEl.remove(); styleEl = null; }
}
