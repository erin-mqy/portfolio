// ── TEXT VIEWER ────────────────────────────────────────────────────────────
function openTextViewer(filename, content) {
  const id = 'tv-' + filename.replace(/\W/g, '-');
  const existing = document.getElementById(id);
  if (existing) { bringToFront(existing); return; }

  const win = document.createElement('div');
  win.id = id;
  win.className = 'fe-win';
  win.innerHTML = `
    <div class="fe-titlebar">
      <div class="dot red"></div>
      <div class="dot yellow"></div>
      <div class="dot green"></div>
      <div class="fe-title">~/blog/${filename}</div>
    </div>
    <div class="tv-body">
      <div class="tv-post"></div>
    </div>
    <div class="resize-handle"></div>
  `;

  renderBlogPost(win.querySelector('.tv-post'), content);

  document.getElementById('desktop').appendChild(win);
  centerWin(win, 80, 20);
  bringToFront(win);
  makeDraggable(win, win.querySelector('.fe-titlebar'));
  makeResizable(win);
  makeMaximizable(win);
  registerTaskbarEntry(win, '📄', filename);

  win.querySelector('.dot.red').addEventListener('click', () => {
    win.style.transition = 'opacity .15s, transform .15s';
    win.style.opacity = '0';
    win.style.transform = 'scale(0.95)';
    setTimeout(() => win.remove(), 150);
  });
}

function renderBlogPost(container, text) {
  const lines = text.split('\n');
  const isUnderline = s => /^[=\-]{2,}\s*$/.test(s);

  let bodyStart = 0;
  if (lines.length > 1 && isUnderline(lines[1])) {
    const h1 = document.createElement('h1');
    h1.textContent = lines[0].trim();
    container.appendChild(h1);
    bodyStart = 2;
  }

  const body = lines.slice(bodyStart).join('\n').trim();
  const blocks = body.split(/\n{2,}/);

  for (const block of blocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    const m = trimmed.match(/^:::html\n([\s\S]*)\n:::$/);
    if (m) {
      appendDemoBlock(container, m[1]);
    } else {
      const p = document.createElement('p');
      p.textContent = trimmed;
      container.appendChild(p);
    }
  }
}

function appendDemoBlock(container, code) {
  const demo = document.createElement('div');
  demo.className = 'tv-demo';

  const label = document.createElement('span');
  label.className = 'tv-demo-label';
  label.textContent = 'live demo';

  const frame = document.createElement('iframe');
  frame.className = 'tv-demo-frame';
  frame.setAttribute('sandbox', 'allow-scripts');
  frame.srcdoc = `<!doctype html><html><head><meta charset="utf-8"><base href="${location.origin}/"><style>
    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; padding: 14px; font-family: system-ui, sans-serif;
           color: #cdd6f4; background: #13131f; }
  </style></head><body>${code}</body></html>`;

  const details = document.createElement('details');
  details.className = 'tv-demo-source';
  const summary = document.createElement('summary');
  summary.textContent = 'source';
  const pre = document.createElement('pre');
  pre.textContent = code;
  details.appendChild(summary);
  details.appendChild(pre);

  demo.appendChild(label);
  demo.appendChild(frame);
  demo.appendChild(details);
  container.appendChild(demo);

  const tvBody = container.closest('.tv-body');
  if (tvBody) {
    new ResizeObserver(entries => {
      frame.style.height = Math.max(120, Math.round(entries[0].contentRect.height * 0.55)) + 'px';
    }).observe(tvBody);
  }
}

// ── VIDEO PLAYER ───────────────────────────────────────────────────────────
function openVideoPlayer(title, youtubeId) {
  const id = 'vp-' + youtubeId;
  const existing = document.getElementById(id);
  if (existing) { bringToFront(existing); return; }

  const win = document.createElement('div');
  win.id = id;
  win.className = 'fe-win';
  win.style.width  = '640px';
  win.style.height = '396px';
  win.innerHTML = `
    <div class="fe-titlebar">
      <div class="dot red"></div>
      <div class="dot yellow"></div>
      <div class="dot green"></div>
      <div class="fe-title">~/media/videos/${title}</div>
    </div>
    <div class="media-body">
      <iframe
        src="https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1"
        allow="autoplay; fullscreen; picture-in-picture"
        allowfullscreen>
      </iframe>
    </div>
    <div class="resize-handle"></div>
  `;

  document.getElementById('desktop').appendChild(win);
  centerWin(win, 60, 30);
  bringToFront(win);
  makeDraggable(win, win.querySelector('.fe-titlebar'));
  makeResizable(win, 320, 220);
  makeMaximizable(win);
  registerTaskbarEntry(win, '▶', title);

  win.querySelector('.dot.red').addEventListener('click', () => {
    win.querySelector('iframe').src = '';
    win.style.transition = 'opacity .15s, transform .15s';
    win.style.opacity = '0';
    win.style.transform = 'scale(0.95)';
    setTimeout(() => win.remove(), 150);
  });
}

// ── PHOTO VIEWER ───────────────────────────────────────────────────────────
function openPhotoViewer(name, src) {
  const id = 'ph-' + name.replace(/\W/g, '-');
  const existing = document.getElementById(id);
  if (existing) { bringToFront(existing); return; }

  const win = document.createElement('div');
  win.id = id;
  win.className = 'fe-win';
  win.style.width  = '560px';
  win.style.height = '460px';
  win.innerHTML = `
    <div class="fe-titlebar">
      <div class="dot red"></div>
      <div class="dot yellow"></div>
      <div class="dot green"></div>
      <div class="fe-title">~/media/photos/${name}</div>
    </div>
    <div class="photo-body">
      <img src="${src}" alt="${escHtml(name)}">
    </div>
    <div class="resize-handle"></div>
  `;

  document.getElementById('desktop').appendChild(win);
  centerWin(win, 60, 30);
  bringToFront(win);
  makeDraggable(win, win.querySelector('.fe-titlebar'));
  makeResizable(win, 200, 180);
  makeMaximizable(win);
  registerTaskbarEntry(win, '🖼', name);

  win.querySelector('.dot.red').addEventListener('click', () => {
    win.style.transition = 'opacity .15s, transform .15s';
    win.style.opacity = '0';
    win.style.transform = 'scale(0.95)';
    setTimeout(() => win.remove(), 150);
  });
}
