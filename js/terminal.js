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
<div style="white-space:pre;line-height:1.9;font-size:12px"><span class="accent">NAME</span>
    portfolio — erin's terminal portfolio

<span class="accent">PORTFOLIO COMMANDS</span>
    <span class="output">about</span>        who I am
    <span class="output">skills</span>       what I can do
    <span class="output">projects</span>     what I've built
    <span class="output">contact</span>      how to reach me
    <span class="output">fastfetch</span>    system info
    <span class="output">clear</span>        clear the terminal

<span class="accent">FILESYSTEM</span>
    <span class="output">ls</span> [-la]      list directory contents
    <span class="output">cd</span> &lt;dir&gt;      change directory
    <span class="output">cat</span> &lt;file&gt;    print file contents
    <span class="output">pwd</span>          print working directory

<span class="accent">SYSTEM</span>
    <span class="output">whoami</span>       print current user
    <span class="output">uname</span> [-a]   print kernel info
    <span class="output">uptime</span>       show system uptime
    <span class="output">ps</span>           list running processes
    <span class="output">echo</span> &lt;...&gt;   print arguments

<span class="accent">PRIVILEGED</span> <span class="muted">(requires sudo — good luck)</span>
    <span class="muted">rm  mv  cp  mkdir  chmod  chown</span>
    <span class="muted">apt  pacman  systemctl  kill  ...</span>

<span class="accent">OTHER</span>
    <span class="output">sudo</span> &lt;cmd&gt;   run as root
    <span class="output">man</span> &lt;cmd&gt;    display manual page
    <span class="output">ssh</span>          connect to remote host
    <span class="output">ping</span>         send ICMP packets
    <span class="output">exit</span>         exit the shell</div>
`,

  fastfetch: `
<div style="display:flex;gap:22px;align-items:flex-start;padding-bottom:4px">
  <img src="img/Patchouli Knowledge - Touhou Lostword Icon.jpg" alt="The New Sound" style="width:130px;height:130px;object-fit:cover;border-radius:6px;flex-shrink:0;display:block;border:1px solid rgba(244,114,182,0.2)">
  <div style="font-size:12px;line-height:1.75;padding-top:2px">
    <div><span style="color:#f9a8d4;font-weight:bold">erin</span><span class="muted">@</span><span style="color:#f9a8d4;font-weight:bold">portfolio</span></div>
    <div class="muted" style="margin-bottom:4px">─────────────────────────</div>
    <div><span class="accent" style="display:inline-block;width:52px">name</span>  <span class="output">Erin Maisarah Khairunisa</span></div>
    <div><span class="accent" style="display:inline-block;width:52px">born</span>  <span class="output">2002 · Kuching, MY</span></div>
    <div><span class="accent" style="display:inline-block;width:52px">edu</span>  <span class="output">BS in Computer and Information Science, Ohio State University
    <div><span class="accent" style="display:inline-block;width:52px">skill</span> <span class="output">Web-Dev · Data Science · Computer Architecture</span></div>
    <div><span class="accent" style="display:inline-block;width:52px">wm</span>    <span class="output">Niri</span></div>
    <div><span class="accent" style="display:inline-block;width:52px">shell</span> <span class="output">zsh</span></div>
    <div><span class="accent" style="display:inline-block;width:52px">distro</span><span class="output">I use Arch btw</span></div>
    <br>
    <div class="muted">type <span class="accent">help</span> to explore ·  type <span class="accent">clear</span> to reset</div>
  </div>
</div>
  `
};

const FXCTION = {

};

function appendHTML(html) {
  const wrap = document.createElement('div');
  wrap.innerHTML = html;
  output.appendChild(wrap);
  output.scrollTop = output.scrollHeight;
}

function appendLine(html) {
  appendHTML(`<div style="margin-bottom:2px">${html}</div>`);
}

appendHTML(SECTIONS.fastfetch);

const cmdHistory = [];
let histPtr = -1;
let sudoState = null; // { attempts: 0, cmd: '' } while awaiting password
const inputPrompt = document.getElementById('input-prompt');

let cwd = 'home';
const VDIRS = {
  home:   { display: '~',              parent: null,    subdirs: ['blog', 'media'] },
  blog:   { display: '~/blog',         parent: 'home',  subdirs: [] },
  media:  { display: '~/media',        parent: 'home',  subdirs: ['videos', 'photos'] },
  videos: { display: '~/media/videos', parent: 'media', subdirs: [] },
  photos: { display: '~/media/photos', parent: 'media', subdirs: [] },
};
function getPrompt() { return `visitor@portfolio:${VDIRS[cwd].display}$`; }
function updatePrompt() { if (sudoState === null) inputPrompt.textContent = getPrompt(); }

input.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    // ── sudo password mode ────────────────────────────────────────────────
    if (sudoState !== null) {
      sudoState.attempts++;
      input.value = '';
      if (sudoState.attempts < 3) {
        appendLine(`<span class="bad">Sorry, try again.</span>`);
      } else {
        const dangerous = ['rm -rf /', 'rm -rf /*', 'rm -rf ~', 'rm -rf .', 'dd if=/dev/zero of=/dev/sda', 'mkfs /dev/sda'];
        if (dangerous.some(d => sudoState.cmd.startsWith(d.split(' ')[0]) && sudoState.cmd.includes('-rf'))) {
          appendLine(`<span class="accent">nice try.</span>`);
        }
        appendLine(`<span class="bad">sudo: ${sudoState.attempts} incorrect password attempts</span>`);
        appendLine(`<span class="muted">visitor is not in the sudoers file. This incident will be reported.</span>`);
        sudoState = null;
        input.style.color = '';
        updatePrompt();
      }
      e.preventDefault();
      return;
    }
    // ── normal mode ───────────────────────────────────────────────────────
    const raw = input.value.trim();
    const cmd = raw.toLowerCase();
    if (!cmd) return;
    cmdHistory.unshift(raw);
    histPtr = -1;
    appendLine(`<span class="prompt">${escHtml(getPrompt())}</span>&nbsp;<span class="cmd-txt">${escHtml(raw)}</span>`);
    runCommand(cmd);
    input.value = '';
    e.preventDefault();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (sudoState !== null) return;
    if (histPtr < cmdHistory.length - 1) histPtr++;
    input.value = cmdHistory[histPtr] ?? '';
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (sudoState !== null) return;
    if (histPtr > 0) histPtr--;
    else { histPtr = -1; input.value = ''; return; }
    input.value = cmdHistory[histPtr] ?? '';
  } else if (e.key === 'Tab') {
    e.preventDefault();
  }
});

// ── PERMISSION-DENIED COMMANDS ──────────────────────────────────────────────
const PERM_CMDS = {
  rm: 'remove', mv: 'move', cp: 'copy', mkdir: 'create directory',
  touch: 'touch', chmod: 'change permissions of', chown: 'change ownership of',
  dd: 'open', mkfs: 'open', fdisk: 'open', parted: 'open',
  apt: 'run', 'apt-get': 'run', pacman: 'run', yum: 'run', dnf: 'run',
  systemctl: 'control', service: 'run', kill: 'send signal to',
  useradd: 'add user', userdel: 'delete user', su: 'switch user to',
  mount: 'mount', umount: 'unmount', iptables: 'modify',
};

function runCommand(cmd) {
  const parts = cmd.split(/\s+/);
  const base  = parts[0];
  const rest  = parts.slice(1).join(' ');

  // ── exact SECTIONS match ────────────────────────────────────────────────
  if (SECTIONS[cmd]) { appendHTML(SECTIONS[cmd]); return; }
  if (cmd === 'clear') { output.innerHTML = ''; return; }

  // ── sudo ────────────────────────────────────────────────────────────────
  if (base === 'sudo') {
    if (!rest || rest === '-l') {
      appendLine(`<span class="bad">sorry, user visitor is not allowed to execute anything as root on portfolio</span>`);
      return;
    }
    sudoState = { attempts: 0, cmd: rest };
    input.style.color = 'transparent';
    inputPrompt.textContent = '[sudo] password for visitor:';
    return;
  }

  // ── permission-denied commands ──────────────────────────────────────────
  if (PERM_CMDS[base]) {
    const target = parts[1] ? `'${escHtml(parts[1])}'` : `'${escHtml(base)}'`;
    appendLine(`<span class="bad">${escHtml(base)}: cannot ${PERM_CMDS[base]} ${target}: Permission denied</span>`);
    appendLine(`<span class="muted">you may need <span class="accent">sudo</span> for that</span>`);
    return;
  }

  // ── commands that work ──────────────────────────────────────────────────
  if (base === 'whoami') {
    appendLine(`<span class="output">visitor</span>`);
    return;
  }

  if (base === 'pwd') {
    appendLine(`<span class="output">${VDIRS[cwd].display.replace('~', '/home/visitor')}</span>`);
    return;
  }

  if (base === 'uname') {
    const full = parts.includes('-a') || parts.includes('-s');
    appendLine(`<span class="output">${full ? 'Linux portfolio 6.14.0-arch1-1 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux' : 'Linux'}</span>`);
    return;
  }

  if (base === 'uptime') {
    const now = new Date();
    const h = String(now.getHours()).padStart(2,'0');
    const m = String(now.getMinutes()).padStart(2,'0');
    appendLine(`<span class="output"> ${h}:${m}:00 up 69 days,  4:20,  1 user,  load average: 0.00, 0.00, 0.00</span>`);
    return;
  }

  if (base === 'echo') {
    appendLine(`<span class="output">${escHtml(rest)}</span>`);
    return;
  }

  if (base === 'ls') {
    const showHidden = parts.some(p => /^-[a-z]*a/.test(p));
    const longFmt    = parts.some(p => /^-[a-z]*l/.test(p));
    (async () => {
      if (cwd === 'home') {
        if (longFmt || showHidden) {
          let dotRows = '';
          if (showHidden) {
            dotRows = `-rw-------  1 visitor visitor  220 Apr 17 12:00 <span class="muted">.bash_history</span>
-rw-r--r--  1 visitor visitor  220 Apr 17 12:00 <span class="muted">.bash_logout</span>
-rw-r--r--  1 visitor visitor  523 Apr 17 12:00 <span class="muted">.bashrc</span>
-rw-r--r--  1 visitor visitor  807 Apr 17 12:00 <span class="muted">.profile</span>
`;
          }
          appendHTML(`<div class="output" style="white-space:pre;line-height:1.75">total ${showHidden ? 24 : 8}
drwxr-xr-x  4 visitor visitor  160 Apr 17 12:34 <span class="accent">.</span>
drwxr-xr-x 15 root    root    300 Apr 17 12:00 <span class="muted">..</span>
${dotRows}drwxr-xr-x  2 visitor visitor   80 Apr 17 12:00 <span class="accent">blog</span>
drwxr-xr-x  2 visitor visitor   80 Apr 17 12:00 <span class="accent">media</span></div>`);
        } else {
          appendHTML(`<div class="output"><span class="accent">blog</span>  <span class="accent">media</span></div>`);
        }
      } else if (cwd === 'blog') {
        try {
          const res = await fetch('blog/index.json');
          const names = await res.json();
          if (!names.length) {
            appendLine(`<span class="muted">— empty —</span>`);
          } else if (longFmt) {
            const rows = names.map(n => `-rw-r--r--  1 visitor visitor   1024 Apr 17 12:00 ${escHtml(n)}`);
            appendHTML(`<div class="output" style="white-space:pre;line-height:1.75">total ${names.length}\n${rows.join('\n')}</div>`);
          } else {
            appendHTML(`<div class="output">${names.map(n => escHtml(n)).join('  ')}</div>`);
          }
        } catch {
          appendLine(`<span class="bad">ls: cannot open directory: I/O error</span>`);
        }
      } else if (cwd === 'media') {
        if (longFmt || showHidden) {
          appendHTML(`<div class="output" style="white-space:pre;line-height:1.75">total 8
drwxr-xr-x  4 visitor visitor  160 Apr 17 12:00 <span class="accent">.</span>
drwxr-xr-x  4 visitor visitor  160 Apr 17 12:34 <span class="muted">..</span>
drwxr-xr-x  2 visitor visitor   80 Apr 17 12:00 <span class="accent">photos</span>
drwxr-xr-x  2 visitor visitor   80 Apr 17 12:00 <span class="accent">videos</span></div>`);
        } else {
          appendHTML(`<div class="output"><span class="accent">photos</span>  <span class="accent">videos</span></div>`);
        }
      } else if (cwd === 'videos') {
        try {
          const res = await fetch('media/videos/index.json');
          const videos = await res.json();
          if (!videos.length) {
            appendLine(`<span class="muted">— empty —</span>`);
          } else if (longFmt) {
            const rows = videos.map(v => `-rw-r--r--  1 visitor visitor   1024 Apr 17 12:00 ${escHtml(v.title)}`);
            appendHTML(`<div class="output" style="white-space:pre;line-height:1.75">total ${videos.length}\n${rows.join('\n')}</div>`);
          } else {
            appendHTML(`<div class="output">${videos.map(v => escHtml(v.title)).join('  ')}</div>`);
          }
        } catch {
          appendLine(`<span class="bad">ls: cannot open directory: I/O error</span>`);
        }
      } else if (cwd === 'photos') {
        try {
          const res = await fetch('media/photos/index.json');
          const entries = await res.json();
          if (!entries.length) {
            appendLine(`<span class="muted">— empty —</span>`);
          } else if (longFmt) {
            const rows = entries.map(e => `-rw-r--r--  1 visitor visitor   2048 Apr 17 12:00 ${escHtml(e.name)}`);
            appendHTML(`<div class="output" style="white-space:pre;line-height:1.75">total ${entries.length}\n${rows.join('\n')}</div>`);
          } else {
            appendHTML(`<div class="output">${entries.map(e => escHtml(e.name)).join('  ')}</div>`);
          }
        } catch {
          appendLine(`<span class="bad">ls: cannot open directory: I/O error</span>`);
        }
      }
    })();
    return;
  }

  if (base === 'cat') {
    const file = parts[1];
    if (!file) { appendLine(`<span class="bad">cat: missing operand</span>`); return; }
    if (file === '.bashrc' || file === '~/.bashrc') {
      appendHTML(`<div class="output muted" style="white-space:pre;line-height:1.75"># ~/.bashrc
export PATH="$HOME/.local/bin:$PATH"
alias ls='ls --color=auto'
alias ll='ls -la'
alias grep='grep --color=auto'
# nothing interesting here, move along</div>`);
    } else if (file === '.bash_history' || file === '~/.bash_history') {
      appendHTML(`<div class="output muted" style="white-space:pre;line-height:1.75">sudo rm -rf /
sudo rm -rf /
sudo rm -rf /
sudo !!
sudo apt install sudo
why wont it work
man sudo
:(</div>`);
    } else if (file.startsWith('/etc/') || file.startsWith('/root/') || file.startsWith('/var/') || file.startsWith('/proc/')) {
      appendLine(`<span class="bad">cat: ${escHtml(file)}: Permission denied</span>`);
    } else {
      appendLine(`<span class="bad">cat: ${escHtml(file)}: No such file or directory</span>`);
    }
    return;
  }

  if (base === 'cd') {
    const dir = parts[1];
    if (!dir || dir === '~' || dir === '/home/visitor') {
      cwd = 'home';
    } else if (dir === '..') {
      cwd = VDIRS[cwd].parent ?? 'home';
    } else if (dir.startsWith('/root') || dir.startsWith('/etc') || dir.startsWith('/var') || dir.startsWith('/proc')) {
      appendLine(`<span class="bad">cd: permission denied: ${escHtml(dir)}</span>`);
      return;
    } else {
      const child = VDIRS[cwd].subdirs.find(s => s === dir);
      if (child) {
        cwd = child;
      } else {
        appendLine(`<span class="bad">cd: no such file or directory: ${escHtml(dir)}</span>`);
        return;
      }
    }
    updatePrompt();
    return;
  }

  if (base === 'man') {
    if (!rest) {
      appendLine(`<span class="bad">What manual page do you want?</span>`);
    } else {
      appendLine(`<span class="bad">No manual entry for ${escHtml(rest)}</span>`);
      appendLine(`<span class="muted">try <span class="accent">help</span> instead</span>`);
    }
    return;
  }

  if (base === 'ssh') {
    appendLine(`<span class="bad">ssh: connect to host ${escHtml(parts[1] || 'localhost')} port 22: Connection refused</span>`);
    return;
  }

  if (base === 'ping') {
    appendLine(`<span class="bad">ping: socket: Operation not permitted</span>`);
    appendLine(`<span class="muted">you may need <span class="accent">sudo</span> for that</span>`);
    return;
  }

  if (base === 'exit' || base === 'logout') {
    appendLine(`<span class="muted">logout: not a login shell — can't exit this one, sorry</span>`);
    return;
  }

  if (base === 'ps') {
    appendHTML(`<div class="output" style="white-space:pre;line-height:1.75">  PID TTY          TIME CMD
    1 pts/0    00:00:00 bash
   42 pts/0    00:00:00 <span class="accent">portfolio</span>
   43 pts/0    00:00:00 ps</div>`);
    return;
  }

  // ── fallback ────────────────────────────────────────────────────────────
  appendLine(`<span class="bad">command not found:</span> <span class="cmd-txt">${escHtml(cmd)}</span> <span class="muted">— try 'help'</span>`);
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
    output.innerHTML = '';
    appendHTML(SECTIONS.fastfetch);
    cwd = 'home';
    updatePrompt();
    term.style.opacity = '1';
    term.style.transform = 'scale(1)';
  }, 600);
});

// Make terminal draggable, resizable, and center it
const termWin = document.getElementById('terminal');
centerWin(termWin);
makeDraggable(termWin, document.getElementById('titlebar'));
makeResizable(termWin);
