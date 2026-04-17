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
      <pre class="tv-content">${escHtml(content)}</pre>
    </div>
    <div class="resize-handle"></div>
  `;

  document.getElementById('desktop').appendChild(win);
  centerWin(win, 80, 20);
  bringToFront(win);
  makeDraggable(win, win.querySelector('.fe-titlebar'));
  makeResizable(win);
  makeMaximizable(win);

  win.querySelector('.dot.red').addEventListener('click', () => {
    win.style.transition = 'opacity .15s, transform .15s';
    win.style.opacity = '0';
    win.style.transform = 'scale(0.95)';
    setTimeout(() => win.remove(), 150);
  });
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

  win.querySelector('.dot.red').addEventListener('click', () => {
    win.style.transition = 'opacity .15s, transform .15s';
    win.style.opacity = '0';
    win.style.transform = 'scale(0.95)';
    setTimeout(() => win.remove(), 150);
  });
}
