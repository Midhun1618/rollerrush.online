// Placeholder art. Every <img> on the site first tries your real file in
// /public/images/... and falls back to one of these drawings if the file
// is not there yet. Drop in a PNG with the right name and it replaces the
// placeholder automatically.

const enc = (svg) => 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);

const TIER = {
  starter: { boot: '#e0524f', wheel: '#6be39b', frame: '#cfd6de' },
  pro: { boot: '#3b8bd9', wheel: '#9be8ee', frame: '#ffffff' },
  apex: { boot: '#f0a21b', wheel: '#ffe27a', frame: '#fff4cf' },
  mythic: { boot: '#8d4fe0', wheel: '#ff8ad1', frame: '#e6d9ff' },
};

function hash(s) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h;
}

export function skateArt(name, tier = 'starter') {
  const t = TIER[tier] || TIER.starter;
  const h = hash(name);
  const hue = h % 360;
  const boot = tier === 'starter' || tier === 'pro' ? t.boot : `hsl(${hue} 70% 58%)`;
  const wheelCount = 3 + (h % 2);
  const wheels = Array.from({ length: wheelCount }, (_, i) => {
    const cx = 62 + i * (130 / (wheelCount - 1));
    return `<circle cx="${cx}" cy="168" r="20" fill="${t.wheel}" stroke="#14203d" stroke-width="5"/><circle cx="${cx}" cy="168" r="6" fill="#14203d"/>`;
  }).join('');
  return enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 220">
    <path d="M42 150 L206 150 L206 138 Q206 112 178 106 L132 98 L118 52 Q112 36 92 38 L62 44 Q46 48 46 66 L44 122 Z" fill="${boot}" stroke="#14203d" stroke-width="6" stroke-linejoin="round"/>
    <path d="M60 60 L110 52" stroke="#fff" stroke-opacity=".55" stroke-width="7" stroke-linecap="round"/>
    <path d="M72 84 l18 -5 M70 100 l22 -6 M70 116 l26 -7" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
    <rect x="40" y="148" width="170" height="14" rx="7" fill="${t.frame}" stroke="#14203d" stroke-width="5"/>
    ${wheels}
  </svg>`);
}

export function apexTeaser() {
  return enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 220">
    <g opacity=".9" fill="#14203d"><path d="M42 150 L206 150 L206 138 Q206 112 178 106 L132 98 L118 52 Q112 36 92 38 L62 44 Q46 48 46 66 L44 122 Z"/>
    <rect x="40" y="148" width="170" height="14" rx="7"/><circle cx="62" cy="168" r="20"/><circle cx="127" cy="168" r="20"/><circle cx="192" cy="168" r="20"/></g>
    <text x="108" y="122" text-anchor="middle" font-family="Lilita One, Arial Black, sans-serif" font-size="84" fill="#ffd23f">?</text>
  </svg>`);
}

export function shotArt(label, size = '1920×1080', tint = 0, dy = 0) {
  const a = ['#43b5ff', '#7ad0ff', '#ffb36b', '#c79bff'][tint % 4];
  const b = ['#d6f0ff', '#e8f7ff', '#ffe7c7', '#eadcff'][tint % 4];
  return enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs>
    <rect width="640" height="360" fill="url(#g)"/>
    <g fill="#5a7787"><rect x="30" y="170" width="70" height="140"/><rect x="120" y="120" width="90" height="190"/><rect x="230" y="190" width="60" height="120"/><rect x="320" y="140" width="100" height="170"/><rect x="440" y="180" width="70" height="130"/><rect x="530" y="110" width="80" height="200"/></g>
    <rect y="300" width="640" height="60" fill="#14203d"/>
    <rect x="170" y="${140 + dy}" width="300" height="84" rx="16" fill="#14203d" opacity=".82"/>
    <text x="320" y="${176 + dy}" text-anchor="middle" font-family="Lilita One, Arial Black, sans-serif" font-size="22" fill="#ffd23f">${label}</text>
    <text x="320" y="${204 + dy}" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" fill="#fff">${size}</text>
  </svg>`);
}

export function skaterArt() {
  return enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 520">
    <g stroke="#14203d" stroke-width="9" stroke-linejoin="round" stroke-linecap="round">
      <path d="M210 250 L130 330 L96 372" fill="none" stroke="#ff7a2f" stroke-width="40"/>
      <path d="M250 262 L328 336 L372 366" fill="none" stroke="#ff7a2f" stroke-width="40"/>
      <path d="M200 120 Q250 96 306 140 L346 242 Q300 290 224 276 Z" fill="#2fa4ff"/>
      <path d="M300 160 L394 112" fill="none" stroke="#f0b48a" stroke-width="30"/>
      <path d="M210 150 L130 196" fill="none" stroke="#f0b48a" stroke-width="30"/>
      <circle cx="262" cy="92" r="40" fill="#f0b48a"/>
      <path d="M220 86 Q226 40 270 44 Q312 48 306 90 Z" fill="#e0233f"/>
      <rect x="248" y="84" width="46" height="20" rx="8" fill="#2a74d6"/>
      <g fill="#f2f2f2"><path d="M68 372 L128 372 L140 392 L56 392 Z"/><path d="M352 366 L420 366 L430 388 L342 388 Z"/></g>
      <g fill="#ffe27a"><circle cx="76" cy="412" r="16"/><circle cx="108" cy="412" r="16"/><circle cx="142" cy="412" r="16"/><circle cx="358" cy="408" r="16"/><circle cx="392" cy="408" r="16"/><circle cx="426" cy="408" r="16"/></g>
    </g>
  </svg>`);
}

export function devArt() {
  return enc(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 480">
    <rect width="400" height="480" fill="none"/>
    <circle cx="200" cy="170" r="84" fill="#ffd23f" stroke="#14203d" stroke-width="8"/>
    <path d="M40 470 Q40 300 200 300 Q360 300 360 470 Z" fill="#43b5ff" stroke="#14203d" stroke-width="8"/>
    <text x="200" y="196" text-anchor="middle" font-family="Lilita One, Arial Black, sans-serif" font-size="70" fill="#14203d">MK</text>
    <text x="200" y="440" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="#14203d">dev/portrait.png · transparent PNG</text>
  </svg>`);
}

// Create an <img> that tries the real file first and falls back to art.
export function smartImg({ src, fallback, alt = '', cls = '', eager = false }) {
  const img = new Image();
  img.alt = alt;
  if (cls) img.className = cls;
  img.decoding = 'async';
  if (!eager) img.loading = 'lazy';
  const useFallback = () => {
    if (img.dataset.fallback) return;
    img.dataset.fallback = '1';
    img.src = fallback;
  };
  img.addEventListener('error', useFallback);
  img.addEventListener('load', () => {
    if (!img.dataset.fallback && img.naturalWidth === 0) useFallback();
  });
  img.src = src;
  return img;
}

export const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
