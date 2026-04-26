// ── WALLPAPER + DYNAMIC PALETTE ────────────────────────────────────────────

const WALLPAPERS = [
  'img/mujica.png',
  'img/card_after_training.png',
];

const CYCLE_MS = 5 * 60 * 1000; // 5 minutes

let wpCurrent  = 0;
let wpActive   = 'a';
const wpSlotA  = document.getElementById('wallpaper-a');
const wpSlotB  = document.getElementById('wallpaper-b');

function wpSlot(id)  { return id === 'a' ? wpSlotA : wpSlotB; }
function wpOther(id) { return id === 'a' ? 'b'     : 'a';     }

// ── Color math ────────────────────────────────────────────────────────────

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return [h * 360, s, l];
}

function hslToRgb(h, s, l) {
  h /= 360;
  if (s === 0) {
    const v = Math.round(l * 255);
    return [v, v, v];
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  const hue2rgb = (t) => {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1/6) return p + (q - p) * 6 * t;
    if (t < 1/2) return q;
    if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
    return p;
  };
  return [
    Math.round(hue2rgb(h + 1/3) * 255),
    Math.round(hue2rgb(h)       * 255),
    Math.round(hue2rgb(h - 1/3) * 255),
  ];
}

function toHex(r, g, b) {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

// ── Dominant hue extraction ───────────────────────────────────────────────

function extractDominantHue(img) {
  const SIZE = 80;
  const off  = document.createElement('canvas');
  off.width  = SIZE;
  off.height = SIZE;
  const c    = off.getContext('2d');
  c.drawImage(img, 0, 0, SIZE, SIZE);
  const data = c.getImageData(0, 0, SIZE, SIZE).data;

  // 36 hue buckets (10° each), weighted by saturation to prefer vivid colours
  const buckets = new Float32Array(36);
  for (let i = 0; i < data.length; i += 4) {
    const [h, s, l] = rgbToHsl(data[i], data[i+1], data[i+2]);
    if (s < 0.15 || l < 0.08 || l > 0.92) continue; // skip grey / near-black / near-white
    buckets[Math.floor(h / 10) % 36] += s;
  }

  let best = 0;
  for (let i = 1; i < 36; i++) if (buckets[i] > buckets[best]) best = i;
  return best * 10 + 5; // centre of the winning bucket
}

// ── CSS palette application ───────────────────────────────────────────────

function applyPalette(hue) {
  const root = document.documentElement;

  const accent        = hslToRgb(hue, 0.80, 0.65);
  const accentLight   = hslToRgb(hue, 0.80, 0.78);
  const accentLighter = hslToRgb(hue, 0.70, 0.89);
  const starColor     = hslToRgb(hue, 0.60, 0.88);

  // Very dark hue-tinted backgrounds
  const bgRgb         = hslToRgb(hue, 0.55, 0.038);
  const panelRgb      = hslToRgb(hue, 0.50, 0.050);
  const statusbarRgb  = hslToRgb(hue, 0.45, 0.060);
  const titlebarRgb   = hslToRgb(hue, 0.50, 0.090);

  root.style.setProperty('--accent',         toHex(...accent));
  root.style.setProperty('--accent-rgb',     accent.join(', '));
  root.style.setProperty('--accent-light',   toHex(...accentLight));
  root.style.setProperty('--accent-lighter', toHex(...accentLighter));
  root.style.setProperty('--bg-rgb',         bgRgb.join(', '));
  root.style.setProperty('--panel-rgb',      panelRgb.join(', '));
  root.style.setProperty('--statusbar-rgb',  statusbarRgb.join(', '));
  root.style.setProperty('--titlebar-rgb',   titlebarRgb.join(', '));

  // Expose star colour to starfield.js
  window.starAccentRgb = starColor.join(', ');
}

// ── Image loading ─────────────────────────────────────────────────────────

function loadImg(src) {
  return new Promise(resolve => {
    const img     = new Image();
    img.onload    = () => resolve(img);
    img.onerror   = () => resolve(null);
    img.src       = src;
  });
}

// ── Wallpaper switcher ────────────────────────────────────────────────────

async function wpSwitchTo(index) {
  const src    = WALLPAPERS[index % WALLPAPERS.length];
  const next   = wpOther(wpActive);
  const nextEl = wpSlot(next);
  const currEl = wpSlot(wpActive);

  // Preload image and extract palette
  const img = await loadImg(src);
  if (img) {
    applyPalette(extractDominantHue(img));
  }

  // Prepare next slot (invisible, no transition)
  nextEl.style.transition       = 'none';
  nextEl.style.backgroundImage  = `url("${src}")`;
  nextEl.style.opacity          = '0';

  // Force reflow so transition applies cleanly
  void nextEl.offsetWidth;

  // Crossfade
  nextEl.style.transition = 'opacity 1.8s ease';
  nextEl.style.opacity    = '0.38';
  currEl.style.transition = 'opacity 1.8s ease';
  currEl.style.opacity    = '0';

  wpActive = next;
}

// ── Reset to default pink palette ────────────────────────────────────────

function wpClear() {
  const root = document.documentElement;
  root.style.setProperty('--accent',         '#ef4444');
  root.style.setProperty('--accent-rgb',     '239, 68, 68');
  root.style.setProperty('--accent-light',   '#fca5a5');
  root.style.setProperty('--accent-lighter', '#fecaca');
  root.style.setProperty('--bg-rgb',         '5, 5, 16');
  root.style.setProperty('--panel-rgb',      '7, 6, 18');
  root.style.setProperty('--statusbar-rgb',  '10, 8, 20');
  root.style.setProperty('--titlebar-rgb',   '18, 10, 28');
  window.starAccentRgb = '255, 160, 160';

  [wpSlotA, wpSlotB].forEach(el => {
    el.style.transition = 'opacity 1.8s ease';
    el.style.opacity    = '0';
  });
}

// ── Boot ──────────────────────────────────────────────────────────────────

(() => {
  wpCurrent = -1;
  wpClear();
})();
