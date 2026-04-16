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

// ── CLOCK ──────────────────────────────────────────────────────────────────
const DAYS   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function updateClock() {
  const n = new Date();
  const h = String(n.getHours()).padStart(2,'0');
  const m = String(n.getMinutes()).padStart(2,'0');
  document.getElementById('clock').textContent =
    `${DAYS[n.getDay()]} ${MONTHS[n.getMonth()]} ${n.getDate()}  ${h}:${m}`;
}
updateClock();
setInterval(updateClock, 10000);

// ── TERMINAL ───────────────────────────────────────────────────────────────
const output = document.getElementById('terminal-body');
const input  = document.getElementById('cmd-input');

const SECTIONS = {
  about: `
<div class="section-head">── about ──────────────────────────────────</div>
<div class="output">Hi, I'm <span class="accent">Eirin Maisarah Khairunisa (She/Her)</span> — I like
to larp as a sysadmin.

Obligatory, I use Arch Manual Install BTW</div>
<br>
<div class="output">I'm also transgender if you can't tell lmao</div>
<br>
<div class="output">Location   <span class="accent">Kuala Lumpur, Malaysia</span></div>
<div class="output">Focus      <span class="accent">Game Development, Data Science, Computer Architecture</span></div>
<div class="output">Status     <span class="accent">Currently under a traineeship</span></div>
`,

  projects: `
<div class="section-head">── projects ────────────────────────────────</div>

<div class="proj">
  <div class="proj-name">◆ pppa-kdn</div>
  <div class="output">Multilingual NLP pipeline reclassifying 2,485 Malaysian
banned publications. Dual-model approach: BART-large-MNLI
zero-shot classification + UMAP/K-Means clustering.</div>
  <div class="muted">Python · sentence-transformers · BART · UMAP · scikit-learn</div>
</div>

<div class="proj">
  <div class="proj-name">◆ news-aggregator</div>
  <div class="output">Self-hosted AI news dashboard for Malaysia & SEA. Daily
RSS scraping via GitHub Actions, Claude-generated article
summaries, live search, and topic-filtered briefings.</div>
  <div class="muted">Python · Anthropic API · GitHub Actions · Vanilla JS</div>
</div>
<div class="proj">
  <div class="proj-name">◆ chunithm-ocr</div>
  <div class="output">Local OCR tool for CHUNITHM score screenshots. Supports
NEW/SUN/LUMINOUS layouts with Japanese OCR, auto image
preprocessing, duplicate detection, and a Streamlit UI.</div>
  <div class="muted">Python · pytesseract · OpenCV · PaddleOCR · Streamlit</div>
</div>
<div class="proj">
  <div class="proj-name">◆ danmaku</div>
  <div class="output">Bullet hell game written in C with SDL2. Full game loop,
collision detection, bombs, score tracking, and multiple
game states — built from scratch.</div>
  <div class="muted">C · SDL2</div>
</div>
`,

  skills: `
<div class="section-head">── skills ──────────────────────────────────</div>
<div class="output" style="margin-bottom:6px">Languages</div>
<div style="margin-bottom:12px">
  <span class="stag">Python</span><span class="stag">Rust</span><span class="stag">JavaScript</span><span class="stag">C</span>
</div>
<div class="output" style="margin-bottom:6px">ML / NLP</div>
<div style="margin-bottom:12px">
  <span class="stag">sentence-transformers</span><span class="stag">BART</span><span class="stag">UMAP</span><span class="stag">scikit-learn</span><span class="stag">HDBSCAN</span>
</div>
<div class="output" style="margin-bottom:6px">Audio / DSP</div>
<div style="margin-bottom:12px">
  <span class="stag">VST3/CLAP</span><span class="stag">nih-plug</span><span class="stag">real-time audio</span><span class="stag">physical modeling</span>
</div>
<div class="output" style="margin-bottom:6px">Data &amp; Web</div>
<div style="margin-bottom:12px">
  <span class="stag">pandas</span><span class="stag">Streamlit</span><span class="stag">GitHub Actions</span><span class="stag">Docker</span>
</div>
<div class="output" style="margin-bottom:6px">CV &amp; OCR</div>
<div>
  <span class="stag">OpenCV</span><span class="stag">Tesseract</span><span class="stag">PaddleOCR</span><span class="stag">Pillow</span>
</div>
`,

  contact: `
<div class="section-head">── contact ─────────────────────────────────</div>
<div class="output" style="margin-bottom:14px">Let's build something together.</div>
<div class="output"> Email    <span class="tlink" onclick="location.href='mailto:m.khairie11@gmail.com'">m.khairie11@gmail.com</span></div>
<div class="output"> GitHub   <span class="tlink" onclick="window.open('https://github.com/erin-mqy')">github.com/erin-mqy</span></div>
`,

  help: `
<div class="section-head">── manual ─────────────────────────────────</div>
Open to opportunities
<div class="accent" style="margin-bottom:6px">about</div>
<div style="margin-bottom:12px">
  <span class="output">all you need to know</span>
</div>

<div class="accent" style="margin-bottom:6px">skills</div>
<div style="margin-bottom:12px">
  <span class="output">what I know how to do</span>
</div>

<div class="accent" style="margin-bottom:6px">projects</div>
<div style="margin-bottom:12px">
  <span class="output">what I have done</span>
</div>

<div class="accent" style="margin-bottom:6px">contact</div>
<div style="margin-bottom:12px">
  <span class="output">how to reach out</span>
</div>
`,

  'sudo rm -rf': '<div class="muted" style="margin-bottom:6px">haha funny</div>' 
};

const WELCOME = `\
<div style="display:flex;gap:22px;align-items:flex-start;padding-bottom:4px">
  <img src="img/The_New_Sound.png" alt="The New Sound" style="width:130px;height:130px;object-fit:cover;border-radius:6px;flex-shrink:0;display:block;border:1px solid rgba(244,114,182,0.2)">
  <div style="font-size:12px;line-height:1.75;padding-top:2px">
    <div><span style="color:#f9a8d4;font-weight:bold">erin</span><span class="muted">@</span><span style="color:#f9a8d4;font-weight:bold">portfolio</span></div>
    <div class="muted" style="margin-bottom:4px">─────────────────────────</div>
    <div><span class="accent" style="display:inline-block;width:52px">name</span>  <span class="output">Geordie Greep</span></div>
    <div><span class="accent" style="display:inline-block;width:52px">born</span>  <span class="output">1998 · Bristol, UK</span></div>
    <div><span class="accent" style="display:inline-block;width:52px">band</span>  <span class="output">black midi <span class="muted">(2017–2024)</span></span></div>
    <div><span class="accent" style="display:inline-block;width:52px">solo</span>  <span class="output">The New Sound <span class="muted">(2024)</span></span></div>
    <div><span class="accent" style="display:inline-block;width:52px">genre</span> <span class="output">avant-garde · jazz · chaos</span></div>
    <div><span class="accent" style="display:inline-block;width:52px">wm</span>    <span class="output">Niri</span></div>
    <div><span class="accent" style="display:inline-block;width:52px">shell</span> <span class="output">zsh</span></div>
    <div><span class="accent" style="display:inline-block;width:52px">uptime</span><span class="output">67 days</span></div>
    <div><span class="accent" style="display:inline-block;width:52px">quote</span> <span class="muted">"everyone knows i'm holy"</span></div>
    <br>
    <div class="muted">type <span class="accent">help</span> to explore ·  type <span class="accent">clear</span> to reset</div>
  </div>
</div>`;

function appendHTML(html) {
  const wrap = document.createElement('div');
  wrap.innerHTML = html;
  output.appendChild(wrap);
  output.scrollTop = output.scrollHeight;
}

function appendLine(html) {
  appendHTML(`<div style="margin-bottom:2px">${html}</div>`);
}

appendHTML(WELCOME);

const cmdHistory = [];
let histPtr = -1;

input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const raw = input.value.trim();
    const cmd = raw.toLowerCase();
    if (!cmd) return;
    cmdHistory.unshift(raw);
    histPtr = -1;
    appendLine(`<span class="prompt">visitor@portfolio:~$</span>&nbsp;<span class="cmd-txt">${escHtml(raw)}</span>`);
    runCommand(cmd);
    input.value = '';
    e.preventDefault();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (histPtr < cmdHistory.length - 1) histPtr++;
    input.value = cmdHistory[histPtr] ?? '';
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (histPtr > 0) histPtr--;
    else { histPtr = -1; input.value = ''; return; }
    input.value = cmdHistory[histPtr] ?? '';
  } else if (e.key === 'Tab') {
    e.preventDefault();
    const partial = input.value.toLowerCase();
    const match = Object.keys(SECTIONS).concat(['clear','help']).find(c => c.startsWith(partial));
    if (match) input.value = match;
  }
});

function runCommand(cmd) {
  if (SECTIONS[cmd]) {
    appendHTML(SECTIONS[cmd]);
  } else if (cmd === 'clear') {
    output.innerHTML = '';
    appendHTML(WELCOME);
  } else if (cmd === 'fastfetch') {
    appendHTML(WELCOME);
  } else {
    appendLine(`<span class="bad">command not found:</span> <span class="cmd-txt">${escHtml(cmd)}</span> <span class="muted">— try 'help'</span>`);
  }
}

function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

document.getElementById('desktop').addEventListener('click', e => {
  if (!window.getSelection().toString()) input.focus();
});

document.querySelector('.dot.red').addEventListener('click', () => {
  const term = document.getElementById('terminal');
  term.style.opacity = '0';
  term.style.transform = 'scale(0.95)';
  term.style.transition = 'all .2s';
  setTimeout(() => {
    term.style.opacity = '1';
    term.style.transform = 'scale(1)';
  }, 600);
});

// ── WINDOW MANAGER ──────────────────────────────────────────────────────────
let zTop = 20;

function bringToFront(win) {
  win.style.zIndex = ++zTop;
}

function makeDraggable(win, handle) {
  let ox = 0, oy = 0, active = false;
  handle.addEventListener('mousedown', e => {
    if (e.target.classList.contains('dot')) return;
    active = true;
    ox = e.clientX - win.offsetLeft;
    oy = e.clientY - win.offsetTop;
    bringToFront(win);
    e.preventDefault();
  });
  document.addEventListener('mousemove', e => {
    if (!active) return;
    const dr = document.getElementById('desktop').getBoundingClientRect();
    const nx = Math.max(0, Math.min(e.clientX - ox, dr.width  - win.offsetWidth));
    const ny = Math.max(0, Math.min(e.clientY - oy, dr.height - win.offsetHeight));
    win.style.left = nx + 'px';
    win.style.top  = ny + 'px';
  });
  document.addEventListener('mouseup', () => { active = false; });
  win.addEventListener('mousedown', () => bringToFront(win));
}

function centerWin(win, offsetX = 0, offsetY = 0) {
  const dr = document.getElementById('desktop').getBoundingClientRect();
  win.style.left = Math.max(0, (dr.width  - win.offsetWidth)  / 2 + offsetX) + 'px';
  win.style.top  = Math.max(0, (dr.height - win.offsetHeight) / 2 + offsetY) + 'px';
}

function makeResizable(win, minW = 300, minH = 160) {
  const handle = win.querySelector('.resize-handle');
  if (!handle) return;
  handle.addEventListener('mousedown', e => {
    e.stopPropagation();
    e.preventDefault();
    const startX = e.clientX, startY = e.clientY;
    const startW = win.offsetWidth, startH = win.offsetHeight;
    function onMove(e) {
      win.style.width  = Math.max(minW, startW + (e.clientX - startX)) + 'px';
      win.style.height = Math.max(minH, startH + (e.clientY - startY)) + 'px';
    }
    function onUp() {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    }
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  });
}

// Make terminal draggable, resizable, and center it
const termWin = document.getElementById('terminal');
centerWin(termWin);
makeDraggable(termWin, document.getElementById('titlebar'));
makeResizable(termWin);

// ── FILE EXPLORER ────────────────────────────────────────────────────────────
const FILES = [
  { icon: '📁', name: 'projects'       },
  { icon: '🖼️', name: 'photo_01.jpg'  },
  { icon: '🖼️', name: 'photo_02.jpg'  },
  { icon: '🖼️', name: 'photo_03.jpg'  },
  { icon: '🎵', name: 'track_01.wav'  },
  { icon: '🎵', name: 'track_02.wav'  },
  { icon: '📄', name: 'resume.pdf'    },
  { icon: '📁', name: 'music'         },
  { icon: '🎮', name: 'games'         },
  { icon: '📁', name: 'screenshots'   },
];

function openFileExplorer() {
  const existing = document.getElementById('fe-win');
  if (existing) { bringToFront(existing); return; }

  const win = document.createElement('div');
  win.id = 'fe-win';
  win.className = 'fe-win';
  win.innerHTML = `
    <div class="fe-titlebar">
      <div class="dot red"></div>
      <div class="dot yellow"></div>
      <div class="dot green"></div>
      <div class="fe-title">~/home — file explorer</div>
    </div>
    <div class="fe-body">
      <div class="fe-sidebar">
        <div class="fe-sb-item active">🏠 Home</div>
        <div class="fe-sb-item">🖼️ Pictures</div>
        <div class="fe-sb-item">📁 Projects</div>
        <div class="fe-sb-item">🎵 Music</div>
        <div class="fe-sb-item">📄 Documents</div>
      </div>
      <div class="fe-grid"></div>
    </div>
    <div class="resize-handle"></div>
  `;

  const grid = win.querySelector('.fe-grid');
  FILES.forEach(f => {
    const item = document.createElement('div');
    item.className = 'fe-item';
    item.innerHTML = `${f.icon}<span>${f.name}</span>`;
    grid.appendChild(item);
  });

  document.getElementById('desktop').appendChild(win);
  centerWin(win, 40, -40);
  bringToFront(win);
  makeDraggable(win, win.querySelector('.fe-titlebar'));
  makeResizable(win);

  win.querySelector('.dot.red').addEventListener('click', () => {
    win.style.transition = 'opacity .15s, transform .15s';
    win.style.opacity = '0';
    win.style.transform = 'scale(0.95)';
    setTimeout(() => win.remove(), 150);
  });

  win.querySelectorAll('.fe-sb-item').forEach(item => {
    item.addEventListener('click', () => {
      win.querySelectorAll('.fe-sb-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

document.getElementById('sb-file').addEventListener('click', openFileExplorer);
