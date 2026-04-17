// ── STARFIELD ──────────────────────────────────────────────────────────────
const canvas = document.getElementById('stars');
const ctx    = canvas.getContext('2d');
let stars    = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function initStars() {
  stars = Array.from({ length: 220 }, () => ({
    x:       Math.random() * canvas.width,
    y:       Math.random() * canvas.height,
    r:       Math.random() * 1.4 + 0.2,
    baseA:   Math.random() * 0.8 + 0.1,
    phase:   Math.random() * Math.PI * 2,
    speed:   Math.random() * 0.004 + 0.001,
  }));
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const s of stars) {
    s.phase += s.speed;
    const alpha = s.baseA * (0.55 + 0.45 * Math.sin(s.phase));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    const pinkish = s.r > 1.1;
    ctx.fillStyle = pinkish
      ? `rgba(255, 200, 230, ${alpha})`
      : `rgba(230, 225, 255, ${alpha})`;
    ctx.fill();
  }
  requestAnimationFrame(drawStars);
}

resizeCanvas();
initStars();
requestAnimationFrame(drawStars);
window.addEventListener('resize', () => { resizeCanvas(); initStars(); });
