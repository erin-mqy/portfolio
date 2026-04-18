// ── UTILITIES ──────────────────────────────────────────────────────────────
function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ── WINDOW MANAGER ─────────────────────────────────────────────────────────
let zTop = 20;

function bringToFront(win) {
  win.style.zIndex = ++zTop;
  document.querySelectorAll('.sb-task-btn').forEach(b => b.classList.remove('focused'));
  if (win._taskBtn) win._taskBtn.classList.add('focused');
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

function registerTaskbarEntry(win, icon, label) {
  const taskbar = document.getElementById('sb-taskbar');
  if (!taskbar) return;

  const btn = document.createElement('button');
  btn.className = 'sb-task-btn';
  btn.innerHTML = `<span>${icon}</span><span>${label}</span>`;
  taskbar.appendChild(btn);
  win._taskBtn = btn;

  btn.addEventListener('click', () => {
    win.classList.remove('hidden');
    bringToFront(win);
    win.querySelector('input')?.focus();
  });

  new MutationObserver(() => {
    btn.classList.toggle('dimmed', win.classList.contains('hidden'));
  }).observe(win, { attributes: true, attributeFilter: ['class'] });

  new MutationObserver(mutations => {
    for (const m of mutations)
      for (const node of m.removedNodes)
        if (node === win) btn.remove();
  }).observe(document.getElementById('desktop'), { childList: true });
}

function makeMaximizable(win) {
  let savedLeft, savedTop, savedWidth, savedHeight;
  win.querySelector('.dot.green').addEventListener('click', () => {
    const maximized = win.classList.toggle('maximized');
    if (maximized) {
      savedLeft   = win.style.left;
      savedTop    = win.style.top;
      savedWidth  = win.style.width;
      savedHeight = win.style.height;
      bringToFront(win);
    } else {
      win.style.left   = savedLeft;
      win.style.top    = savedTop;
      win.style.width  = savedWidth;
      win.style.height = savedHeight;
    }
  });
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
