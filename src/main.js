import '@fontsource/lilita-one';
import '@fontsource-variable/nunito';
import './style.css';
import {
  SITE, LEADERBOARD, SKATES, SHOW_ESTIMATED_STATS, APEX_TEASER_COUNT, TIERS,
  EVENT, UPDATES, MOVES, FAQ, DEV,
} from './data.js';
import { skateArt, apexTeaser, shotArt, skaterArt, devArt, smartImg, slug } from './placeholders.js';

const $ = (s, el = document) => el.querySelector(s);
const el = (tag, cls, html) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (html != null) n.innerHTML = html;
  return n;
};
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = (n) => Number(n).toLocaleString('en-IN');
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------------ */
/* Play links, contact, socials                                        */
/* ------------------------------------------------------------------ */
document.querySelectorAll('[data-play]').forEach((a) => {
  a.href = SITE.playStoreUrl;
  a.target = '_blank';
  a.rel = 'noopener';
});
$('#mailLink').href = `mailto:${SITE.contactEmail}`;
$('#devName').textContent = SITE.developerName;
{
  const slot = $('#socialSlot');
  Object.entries(SITE.socials).forEach(([k, v]) => {
    if (!v) return;
    const a = el('a', '', k[0].toUpperCase() + k.slice(1));
    a.href = v; a.target = '_blank'; a.rel = 'noopener';
    slot.append(a);
  });
}

/* ------------------------------------------------------------------ */
/* Hero: generated skyline layers + skater                              */
/* ------------------------------------------------------------------ */
function skylineURI(seed, minH, maxH, color, win) {
  let x = 0, s = seed;
  const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  let out = '';
  while (x < 1200) {
    const w = 60 + rnd() * 90;
    const h = minH + rnd() * (maxH - minH);
    out += `<rect x="${x}" y="${360 - h}" width="${w}" height="${h}" fill="${color}"/>`;
    if (win) {
      for (let wy = 360 - h + 16; wy < 340; wy += 26) {
        for (let wx = x + 10; wx < x + w - 14; wx += 20) {
          if (rnd() > 0.35) out += `<rect x="${wx}" y="${wy}" width="10" height="14" fill="${win}"/>`;
        }
      }
    }
    x += w + (rnd() > 0.7 ? 14 : 0);
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="360" viewBox="0 0 1200 360">${out}</svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}
$('#skyFar').style.backgroundImage = skylineURI(7, 120, 240, '#8fc9ec', null);
$('#skyNear').style.backgroundImage = skylineURI(23, 70, 190, '#5f8da4', '#7fb0c6');

$('#heroArt').append(
  smartImg({ src: '/images/hero/skater.png', fallback: skaterArt(), alt: 'Roller Rush skater mid-run', cls: 'skater', eager: true }),
);

/* ------------------------------------------------------------------ */
/* How to play                                                          */
/* ------------------------------------------------------------------ */
{
  const mount = $('#moves');
  MOVES.forEach((m, i) => {
    const card = el('article', 'move');
    const fig = el('div', 'move-shot');
    fig.append(smartImg({ src: `/images/screens/${m.shot}.jpg`, fallback: shotArt(`screens/${m.shot}.jpg`, '1920×1080', i), alt: `Gameplay: ${m.title}` }));
    card.append(fig, el('h3', '', esc(m.title)), el('p', '', esc(m.text)));
    mount.append(card);
  });
}

/* ------------------------------------------------------------------ */
/* Trailer + gallery                                                    */
/* ------------------------------------------------------------------ */
{
  const t = $('#trailer');
  const v = SITE.trailer;
  if (!v) {
    const ph = el('div', 'trailer-ph');
    ph.append(smartImg({ src: '/images/screens/trailer-poster.jpg', fallback: shotArt('Gameplay trailer', 'Set SITE.trailer in data.js', 1, 110), alt: '' }));
    ph.append(el('span', 'play-badge', '<i></i>'));
    t.append(ph);
  } else if (/\.(mp4|webm)$/i.test(v)) {
    const vid = el('video');
    vid.src = v; vid.controls = true; vid.playsInline = true; vid.preload = 'metadata';
    vid.poster = '/images/screens/trailer-poster.jpg';
    t.append(vid);
  } else {
    t.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${esc(v)}" title="Roller Rush trailer" loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
  }

  const gal = $('#gallery');
  for (let i = 1; i <= 5; i++) {
    const f = el('figure', 'shot');
    f.append(smartImg({ src: `/images/screens/shot-${i}.jpg`, fallback: shotArt(`screens/shot-${i}.jpg`, '1920×1080', i), alt: `Roller Rush gameplay screenshot ${i}` }));
    gal.append(f);
  }
  const step = () => gal.clientWidth * 0.8;
  $('#galPrev').addEventListener('click', () => gal.scrollBy({ left: -step(), behavior: 'smooth' }));
  $('#galNext').addEventListener('click', () => gal.scrollBy({ left: step(), behavior: 'smooth' }));
}

/* ------------------------------------------------------------------ */
/* Skate helpers                                                        */
/* ------------------------------------------------------------------ */
const skateImg = (s, cls = '') =>
  smartImg({ src: `/images/skates/${slug(s.name)}.png`, fallback: skateArt(s.name, s.tier), alt: `${s.name} skate`, cls });

function priceText(s) {
  if (s.unlock) return s.unlock;
  if (s.price === 0) return 'Free';
  if (s.price == null) return 'Unlock in game';
  return `${fmt(s.price)} coins`;
}

const STAT_NAMES = ['Speed', 'Jump', 'Control'];
function bars(s) {
  if (!s.stats || (!s.realStats && !SHOW_ESTIMATED_STATS)) return '';
  return `<div class="bars">${STAT_NAMES.map((n, i) => `
    <div class="bar"><span>${n}</span><i><b style="--w:${s.stats[i]}%"></b></i></div>`).join('')}</div>`;
}

/* ------------------------------------------------------------------ */
/* Fresh drops                                                          */
/* ------------------------------------------------------------------ */
{
  const fresh = SKATES.filter((s) => s.new);
  const list = fresh.length ? fresh : SKATES.slice(-2);
  const mount = $('#fresh-mount');
  const picker = el('div', 'fresh-pick');
  const stage = el('div', 'fresh-stage');
  mount.append(picker, stage);

  const show = (s) => {
    picker.querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.name === s.name)));
    stage.innerHTML = '';
    const art = el('div', `fresh-art tier-${s.tier}`);
    art.append(el('span', 'ribbon', 'New'), skateImg(s, 'fresh-img'));
    const info = el('div', 'fresh-info');
    const chips = (s.specialties || []).map((c) => `<li>${esc(c)}</li>`).join('');
    info.innerHTML = `
      <div class="ovr-row"><span class="ovr"><b>${s.ovr}</b>OVR</span><span class="tag tag-${s.tier}">${esc(s.tier)}</span></div>
      <h3>${esc(s.name)}</h3>
      <p class="tagline">${esc(s.tagline)}</p>
      ${chips ? `<ul class="chips">${chips}</ul>` : ''}
      ${bars(s)}
      <p class="price">${esc(priceText(s))}</p>
      <a class="btn btn-yellow" data-play href="${SITE.playStoreUrl}" target="_blank" rel="noopener">Try it in the game</a>`;
    stage.append(art, info);
    requestAnimationFrame(() => stage.classList.add('in'));
  };

  list.forEach((s, i) => {
    const b = el('button', 'pick', esc(s.name));
    b.type = 'button'; b.dataset.name = s.name;
    b.addEventListener('click', () => { stage.classList.remove('in'); setTimeout(() => show(s), 60); });
    picker.append(b);
    if (i === 0) show(s);
  });
}

/* ------------------------------------------------------------------ */
/* Skate market                                                         */
/* ------------------------------------------------------------------ */
{
  const tabs = $('#tabs');
  const grid = $('#grid');
  let active = 'all';

  TIERS.forEach((t) => {
    const b = el('button', 'tab', esc(t.label));
    b.type = 'button'; b.role = 'tab'; b.dataset.tier = t.id;
    b.setAttribute('aria-selected', String(t.id === active));
    b.addEventListener('click', () => { active = t.id; render(); });
    tabs.append(b);
  });

  function card(s) {
    const c = el('button', `skate tier-${s.tier}`);
    c.type = 'button';
    c.setAttribute('aria-label', `${s.name}, ${s.tier}, ${s.ovr} OVR. Open details`);
    c.innerHTML = `<span class="ovr"><b>${s.ovr}</b>OVR</span><span class="tag tag-${s.tier}">${esc(s.tier)}</span>`;
    const art = el('div', 'skate-art');
    art.append(skateImg(s));
    c.append(art, el('span', 'skate-name', esc(s.name)), el('span', 'skate-price', esc(priceText(s))));
    if (s.new) c.append(el('span', 'ribbon sm', 'New'));
    c.addEventListener('click', () => openModal(s));
    return c;
  }
  function teaser() {
    const c = el('div', 'skate tier-apex teaser');
    c.innerHTML = `<span class="tag tag-apex">apex</span>`;
    const art = el('div', 'skate-art');
    art.append(smartImg({ src: '/images/skates/apex-teaser.png', fallback: apexTeaser(), alt: 'Unrevealed Apex skate' }));
    c.append(art, el('span', 'skate-name', 'Classified'), el('span', 'skate-price', 'Revealed soon'));
    return c;
  }

  function render() {
    tabs.querySelectorAll('.tab').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tier === active)));
    grid.innerHTML = '';
    const order = ['starter', 'pro', 'apex', 'mythic'];
    const shown = order.filter((t) => active === 'all' || active === t);
    shown.forEach((t) => {
      const items = SKATES.filter((s) => s.tier === t);
      const teasers = t === 'apex' ? APEX_TEASER_COUNT : 0;
      if (!items.length && !teasers) return;
      grid.append(el('h3', 'series', `${t[0].toUpperCase() + t.slice(1)} series <small>${items.length + teasers} rides</small>`));
      items.forEach((s) => grid.append(card(s)));
      for (let i = 0; i < teasers; i++) grid.append(teaser());
    });
  }
  render();
}

/* ------------------------------------------------------------------ */
/* Modal                                                                */
/* ------------------------------------------------------------------ */
const modal = $('#modal');
function openModal(s) {
  const body = $('#modalCard');
  body.innerHTML = `
    <button class="modal-x" aria-label="Close" type="button">X</button>
    <h3 id="mName">${esc(s.name)}</h3>
    <p class="tagline">${esc(s.tagline)}</p>
    <div class="modal-grid">
      <div class="modal-stats">
        <div class="ovr-row"><span class="ovr"><b>${s.ovr}</b>OVR</span><span class="tag tag-${s.tier}">${esc(s.tier)}</span></div>
        ${bars(s) || '<p class="muted">Stats are shown in the game.</p>'}
        <p class="price">${esc(priceText(s))}</p>
      </div>
      <div class="modal-art tier-${s.tier}"></div>
    </div>
    <a class="btn btn-yellow" href="${SITE.playStoreUrl}" target="_blank" rel="noopener">Get it in the game</a>`;
  $('.modal-art', body).append(skateImg(s));
  $('.modal-x', body).addEventListener('click', () => modal.close());
  modal.showModal();
  requestAnimationFrame(() => modal.classList.add('open'));
}
modal.addEventListener('click', (e) => { if (e.target === modal) modal.close(); });
modal.addEventListener('close', () => modal.classList.remove('open'));

/* ------------------------------------------------------------------ */
/* Event                                                                */
/* ------------------------------------------------------------------ */
{
  const m = $('#event-mount');
  m.innerHTML = `
    <div class="event-copy">
      <h2>${esc(EVENT.name)}</h2>
      <p>${esc(EVENT.blurb)}</p>
      <ul class="rules">${EVENT.rules.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>
      <a class="btn btn-yellow btn-lg" data-play href="${SITE.playStoreUrl}" target="_blank" rel="noopener">Join in the game</a>
    </div>
    <div class="event-side">
      <div class="clock" id="clock" role="timer" aria-label="Time left in the event"></div>
      <ul class="prizes">${EVENT.rewards.map((r) => `<li><b>${esc(r.place)}</b><span>${esc(r.prize)}</span></li>`).join('')}</ul>
    </div>`;
  const clock = $('#clock');
  const end = new Date(EVENT.endsAt).getTime();
  const tick = () => {
    const d = end - Date.now();
    if (d <= 0) { clock.innerHTML = '<p class="ended">This event has ended. The next one is on its way.</p>'; return false; }
    const p = (n) => String(n).padStart(2, '0');
    const days = Math.floor(d / 864e5), h = Math.floor(d / 36e5) % 24, mi = Math.floor(d / 6e4) % 60, s = Math.floor(d / 1e3) % 60;
    clock.innerHTML = `<div><b>${days}</b><span>days</span></div><div><b>${p(h)}</b><span>hours</span></div><div><b>${p(mi)}</b><span>mins</span></div><div><b>${p(s)}</b><span>secs</span></div>`;
    return true;
  };
  if (tick()) { const id = setInterval(() => { if (!tick()) clearInterval(id); }, 1000); }
}

/* ------------------------------------------------------------------ */
/* Leaderboard                                                          */
/* ------------------------------------------------------------------ */
async function loadBoard() {
  const { fields, limit } = LEADERBOARD;
  let rows = null;
  if (LEADERBOARD.url) {
    try {
      const r = await fetch(LEADERBOARD.url, { cache: 'no-store' });
      const j = await r.json();
      const arr = Array.isArray(j) ? j : Object.values(j || {});
      rows = arr
        .map((x) => ({ username: x[fields.username], distance: Number(x[fields.distance]), skate: x[fields.skate] }))
        .filter((x) => x.username && Number.isFinite(x.distance))
        .sort((a, b) => b.distance - a.distance)
        .slice(0, limit);
    } catch (e) { rows = null; }
  }
  const live = !!(rows && rows.length);
  if (!live) rows = LEADERBOARD.sample;
  const board = $('#board');
  board.innerHTML = '';
  rows.forEach((r, i) => {
    const li = el('li', `row r${i + 1}`);
    const skate = SKATES.find((s) => s.name.toLowerCase() === String(r.skate).toLowerCase());
    li.innerHTML = `
      <span class="rank">${i + 1}</span>
      <span class="who"><span class="avatar">${esc(String(r.username)[0] || '?').toUpperCase()}</span><b>${esc(r.username)}</b></span>
      <span class="with"></span>
      <span class="dist"><b>${fmt(r.distance)}</b> m</span>`;
    const w = $('.with', li);
    if (skate) w.append(skateImg(skate, 'mini'));
    w.append(el('span', '', esc(r.skate || '')));
    board.append(li);
  });
  $('#boardNote').textContent = live ? 'Live from the game servers.' : 'Showing sample scores until the live leaderboard is connected.';
}
loadBoard();

/* ------------------------------------------------------------------ */
/* Roadmap                                                              */
/* ------------------------------------------------------------------ */
{
  const label = { live: 'Live now', next: 'Next up', later: 'Later' };
  const road = $('#road');
  UPDATES.forEach((u) => {
    road.append(el('li', `stop ${u.status}`, `
      <span class="stop-dot" aria-hidden="true"></span>
      <div><span class="stop-tag">${esc(label[u.status] || u.status)}${u.status === 'live' && u.version ? ', ' + esc(u.version) : ''}</span>
      <h3>${esc(u.title)}</h3><p>${esc(u.text)}</p></div>`));
  });
}

/* ------------------------------------------------------------------ */
/* Developer                                                            */
/* ------------------------------------------------------------------ */
{
  const m = $('#dev-mount');
  const links = DEV.links.map((l) => `<a class="btn btn-navy-2 btn-sm" href="${esc(l.href)}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join('');
  const portfolio = DEV.portfolioUrl ? `<a class="btn btn-yellow btn-sm" href="${esc(DEV.portfolioUrl)}" target="_blank" rel="noopener">Portfolio</a>` : '';
  m.innerHTML = `
    <div class="dev-portrait" id="devPortrait"></div>
    <div class="dev-copy">
      <h2>Made by ${esc(DEV.name)}</h2>
      <p class="dev-role">${esc(DEV.role)}, ${esc(DEV.studio)}</p>
      ${DEV.bio.map((p) => `<p>${esc(p)}</p>`).join('')}
      <div class="dev-links">${portfolio}${links}</div>
      <h3>More from the developer</h3>
      <ul class="dev-projects">${DEV.projects.map((p) => `<li><b>${esc(p.name)}</b><span>${esc(p.text)}</span></li>`).join('')}</ul>
    </div>`;
  $('#devPortrait').append(smartImg({ src: '/images/dev/portrait.png', fallback: devArt(), alt: `${DEV.name}, developer of Roller Rush` }));
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                  */
/* ------------------------------------------------------------------ */
$('#faq-mount').innerHTML = FAQ.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('');

/* ------------------------------------------------------------------ */
/* Nav                                                                  */
/* ------------------------------------------------------------------ */
{
  const burger = $('#burger'), links = $('#navLinks'), nav = $('.nav');
  const set = (open) => { nav.classList.toggle('open', open); burger.setAttribute('aria-expanded', String(open)); };
  burger.addEventListener('click', () => set(!nav.classList.contains('open')));
  links.addEventListener('click', (e) => { if (e.target.closest('a')) set(false); });
  const onScroll = () => nav.classList.toggle('scrolled', scrollY > 24);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
}

/* ------------------------------------------------------------------ */
/* Scroll HUD: distance, score and checkpoint coins                     */
/* ------------------------------------------------------------------ */
{
  const dEl = $('#hudDist'), sEl = $('#hudScore'), cEl = $('#hudCoins'), toast = $('#toast');
  let coins = 0, shownD = 0, shownS = 0, shownC = 0, raf = 0, tt;
  const calc = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    return Math.round((scrollY / max) * 1500);
  };
  const paint = () => {
    raf = 0;
    const d = calc();
    const s = d * 3 + coins * 10;
    shownD += (d - shownD) * 0.25; shownS += (s - shownS) * 0.25; shownC += (coins - shownC) * 0.25;
    dEl.textContent = Math.round(shownD);
    sEl.textContent = fmt(Math.round(shownS));
    cEl.textContent = Math.round(shownC);
    if (Math.abs(d - shownD) > 0.6 || Math.abs(s - shownS) > 0.6 || Math.abs(coins - shownC) > 0.6) raf = requestAnimationFrame(paint);
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(paint); };
  addEventListener('scroll', kick, { passive: true });
  addEventListener('resize', kick);
  kick();

  const seen = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const name = e.target.dataset.checkpoint;
      if (seen.has(name)) return;
      seen.add(name);
      coins += 25; kick();
      toast.textContent = `Checkpoint: ${name}. +25 coins`;
      toast.classList.add('show');
      clearTimeout(tt); tt = setTimeout(() => toast.classList.remove('show'), 2200);
    });
  }, { threshold: 0.35 });
  document.querySelectorAll('[data-checkpoint]').forEach((s) => io.observe(s));
}

/* ------------------------------------------------------------------ */
/* Reveal on scroll: only on the few big blocks, and not for reduced motion */
/* ------------------------------------------------------------------ */
if (!reduceMotion) {
  // The leaderboard rows skate in one after another, like a race finishing.
  const board = $('#board');
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { board.classList.add('seen'); io.disconnect(); }
  }), { threshold: 0.25 });
  board.classList.add('pre');
  io.observe(board);
}
