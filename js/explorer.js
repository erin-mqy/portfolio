// ── FILE EXPLORER ────────────────────────────────────────────────────────────
const FILES = [
  { icon: '📁', name: 'blog' },
  { icon: '📁', name: 'media' },
];

const MEDIA_FILES = [
  { icon: '📁', name: 'videos' },
  { icon: '📁', name: 'photos' },
];

async function loadBlogIndex() {
  const res = await fetch('blog/index.json');
  const names = await res.json();
  return names.map(name => ({ icon: '📄', name }));
}

async function loadBlogPost(filename) {
  const res = await fetch(`blog/${filename}`);
  return res.text();
}

async function loadVideos() {
  const res = await fetch('media/videos/index.json');
  return res.json();
}

async function loadPhotos() {
  const res = await fetch('media/photos/index.json');
  const entries = await res.json();
  return entries.map(e => ({ name: e.name, src: `media/photos/${e.path}` }));
}

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
        <div class="fe-sb-item active" data-nav="home">🏠 Home</div>
        <div class="fe-sb-item" data-nav="blog">📝 Blog</div>
        <div class="fe-sb-item" data-nav="videos">🎬 Videos</div>
        <div class="fe-sb-item" data-nav="photos">🖼️ Photos</div>
      </div>
      <div class="fe-grid"></div>
    </div>
    <div class="resize-handle"></div>
  `;

  function setActive(dest) {
    win.querySelectorAll('.fe-sb-item').forEach(i => i.classList.remove('active'));
    const el = win.querySelector(`[data-nav="${dest}"]`);
    if (el) el.classList.add('active');
  }

  function loading(path) {
    win.querySelector('.fe-title').textContent = `~/${path} — file explorer`;
    win.querySelector('.fe-grid').innerHTML =
      '<span class="muted" style="padding:8px;font-size:12px">loading...</span>';
  }

  function makeItem(icon, label, onClick) {
    const item = document.createElement('div');
    item.className = 'fe-item';
    item.innerHTML = `${icon}<span>${label}</span>`;
    item.addEventListener('click', onClick);
    return item;
  }

  function showHome() {
    win.querySelector('.fe-title').textContent = '~/home — file explorer';
    const grid = win.querySelector('.fe-grid');
    grid.innerHTML = '';
    FILES.forEach(f => {
      const dest = f.name === 'blog' ? 'blog' : f.name === 'media' ? 'media' : null;
      grid.appendChild(makeItem(f.icon, f.name, dest ? () => navigate(dest) : () => {}));
    });
  }

  function showMedia() {
    win.querySelector('.fe-title').textContent = '~/home/media — file explorer';
    const grid = win.querySelector('.fe-grid');
    grid.innerHTML = '';
    MEDIA_FILES.forEach(f => {
      const dest = f.name === 'videos' ? 'videos' : 'photos';
      grid.appendChild(makeItem(f.icon, f.name, () => navigate(dest)));
    });
  }

  async function showBlog() {
    loading('home/blog');
    const grid = win.querySelector('.fe-grid');
    try {
      const files = await loadBlogIndex();
      grid.innerHTML = '';
      files.forEach(f => {
        grid.appendChild(makeItem(f.icon, f.name, async () => {
          const content = await loadBlogPost(f.name);
          openTextViewer(f.name, content);
        }));
      });
    } catch {
      grid.innerHTML = '<span class="bad" style="padding:8px;font-size:12px">could not load blog</span>';
    }
  }

  async function showVideos() {
    loading('home/media/videos');
    const grid = win.querySelector('.fe-grid');
    try {
      const videos = await loadVideos();
      grid.innerHTML = '';
      if (!videos.length) {
        grid.innerHTML = '<span class="muted" style="padding:8px;font-size:12px">no videos yet</span>';
        return;
      }
      videos.forEach(v => {
        grid.appendChild(makeItem('🎬', v.title, () => openVideoPlayer(v.title, v.id)));
      });
    } catch {
      grid.innerHTML = '<span class="bad" style="padding:8px;font-size:12px">could not load videos</span>';
    }
  }

  async function showPhotos() {
    loading('home/media/photos');
    const grid = win.querySelector('.fe-grid');
    try {
      const photos = await loadPhotos();
      grid.innerHTML = '';
      if (!photos.length) {
        grid.innerHTML = '<span class="muted" style="padding:8px;font-size:12px">no photos yet</span>';
        return;
      }
      photos.forEach(p => {
        grid.appendChild(makeItem('🖼️', p.name, () => openPhotoViewer(p.name, p.src)));
      });
    } catch {
      grid.innerHTML = '<span class="bad" style="padding:8px;font-size:12px">could not load photos</span>';
    }
  }

  function navigate(dest) {
    setActive(dest);
    if (dest === 'home')   showHome();
    if (dest === 'media')  showMedia();
    if (dest === 'blog')   showBlog();
    if (dest === 'videos') showVideos();
    if (dest === 'photos') showPhotos();
  }

  showHome();

  win.querySelectorAll('.fe-sb-item').forEach(item => {
    item.addEventListener('click', () => navigate(item.dataset.nav));
  });

  document.getElementById('desktop').appendChild(win);
  centerWin(win, 40, -40);
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

document.getElementById('sb-file').addEventListener('click', openFileExplorer);
