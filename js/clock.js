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
