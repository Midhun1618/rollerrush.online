import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Zap, Gem, Play, Menu, X, Sparkles, ChevronRight, Gauge, MoveUpRight } from 'lucide-react';
import './style.css';

const PLAY_URL = 'https://play.google.com/store/apps/details?id=com.voxcom.rollerrush';
const PRIVACY_URL = 'https://sites.google.com/d/1Ecr4bmxwaNzxVeRXQVYgQMNv6VnbPlkX/p/1mrruKG1vYmmWb299mmtfiVaIOAWIqiHz/';

const gameplay = [
  { src: '/gameplay-run.jpg', alt: 'Nico skating into the city', label: 'THE STREETS ARE YOURS', number: '01' },
  { src: '/gameplay-jump.jpg', alt: 'Nico jumping onto a shipping container', label: 'TAKE THE HIGH ROAD', number: '02' },
  { src: '/gameplay-boost.jpg', alt: 'Nico activating a speed booster', label: 'HIT THE BOOST', number: '03' },
  { src: '/gameplay-slide.jpg', alt: 'Nico sliding through an obstacle section', label: 'SLIDE THROUGH', number: '04' },
];

// EFFECT PLACEHOLDERS: swap each CSS particle treatment for the final transparent
// particle sprite / short loop supplied by the developer when those assets are ready.
const skates = [
  { name: 'Toxic', tier: 'STARTER', color: '#a8ff4d', effect: 'TOXIC GREEN EMITTER', mark: '☣', copy: 'A radioactive green wake that makes every push feel dangerous.', visual: 'toxic' },
  { name: 'Cosmic Drift', tier: 'MYTHIC', color: '#a78bfa', effect: 'COSMIC PARTICLES', mark: '✦', copy: 'A drifting nebula of violet dust, glowing stars and cosmic shimmer.', visual: 'cosmic' },
  { name: 'Sonic Wave', tier: 'PRO', color: '#66e9ff', effect: 'SONIC PULSE TRAIL', mark: '〰', copy: 'Electric rings ripple outward from the wheels with every stride.', visual: 'sonic' },
  { name: 'Solar Flare', tier: 'APEX', color: '#ffb34f', effect: 'SOLAR BURST', mark: '☀', copy: 'Hot golden sparks flare behind the skate on every landing.', visual: 'solar' },
  { name: 'Void Reaper', tier: 'MYTHIC', color: '#d1a6ff', effect: 'VOID WISP TRAIL', mark: '◈', copy: 'A mysterious purple haze trails behind this dark ride.', visual: 'void' },
];

const floaters = Array.from({ length: 15 }, (_, i) => ({
  left: (i * 17 + 7) % 100,
  top: (i * 29 + 9) % 100,
  delay: (i % 6) * 0.55,
  scale: 0.55 + (i % 4) * 0.22,
  type: i % 3,
}));

function App() {
  const [activeSkate, setActiveSkate] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 0.3], [0, 90]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const active = skates[activeSkate];

  useEffect(() => {
    const onKey = (event) => { if (event.key === 'Escape') setLightbox(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const navItems = [['THE RIDE', '#ride'], ['GAMEPLAY', '#gameplay'], ['SKATE LAB', '#skatelab']];

  return (
    <div className="site">
      <motion.div className="scroll-progress" style={{ scaleX: progressScale }} />
      <div className="grain" />
      <nav className="nav">
        <a href="#top" className="brand"><span className="brand-mark">RR</span><span>ROLLER <b>RUSH</b></span></a>
        <div className="nav-links">{navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</div>
        <a className="nav-cta" href={PLAY_URL} target="_blank" rel="noreferrer">GET THE GAME <ArrowUpRight size={16} /></a>
        <button className="mobile-menu" aria-label="Toggle navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)}>{mobileOpen ? <X /> : <Menu />}</button>
      </nav>
      <AnimatePresence>
        {mobileOpen && <motion.div className="mobile-panel" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
          {navItems.map(([label, href]) => <a key={href} onClick={() => setMobileOpen(false)} href={href}>{label}</a>)}
          <a href={PLAY_URL} target="_blank" rel="noreferrer">GET THE GAME ↗</a>
        </motion.div>}
      </AnimatePresence>

      <main id="top">
        <section className="hero">
          <div className="sky-orb orb-a" /><div className="sky-orb orb-b" />
          <div className="hero-scribble">NO BRAKES<br />NO LIMITS</div>
          <div className="floating-field" aria-hidden="true">
            {floaters.map((f, i) => <motion.div key={i} className={f.type === 0 ? 'float-coin' : f.type === 1 ? 'float-ruby' : 'float-star'} style={{ left: `${f.left}%`, top: `${f.top}%`, scale: f.scale }} animate={{ y: [0, -18, 0], rotate: [0, 12, -8, 0] }} transition={{ duration: 4 + i % 4, repeat: Infinity, delay: f.delay, ease: 'easeInOut' }}>
              {f.type === 0 ? <img src="/rush_coin.webp" alt="" /> : f.type === 1 ? <img src="/rush_ruby.webp" alt="" /> : '✦'}
            </motion.div>)}
          </div>
          <div className="hero-inner">
            <motion.div className="hero-copy" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <div className="eyebrow"><span className="eyebrow-dot" /> THE CITY IS YOUR PLAYGROUND</div>
              <h1>OWN THE<br /><span>STREETS.</span></h1>
              <p className="hero-lede">One skater. Endless streets. Zero chill.</p>
              <p className="hero-desc">Meet Nico and roll into a wild endless-runner adventure. Dodge obstacles, collect coins, unleash boosters and chase that one-more-run feeling.</p>
              <div className="hero-buttons">
                <a className="btn-primary" href={PLAY_URL} target="_blank" rel="noreferrer"><Play fill="currentColor" size={18} /> PLAY ON GOOGLE PLAY <ArrowUpRight size={16} /></a>
                <a className="btn-ghost" href="#gameplay">SEE THE ACTION <ArrowDown size={16} /></a>
              </div>
              <div className="hero-proof"><span><Zap /> ENDLESS RUNNER</span><i /><span><Gem /> COLLECT & UPGRADE</span><i /><span><Gauge /> BUILT FOR SPEED</span></div>
            </motion.div>
            <motion.div className="hero-stage" style={{ y: parallaxY }}>
              <div className="hero-sunburst" />
              <div className="hero-game-card">
                <div className="game-card-top"><span>THE RUSH STARTS HERE</span><span className="live-pill"><i /> ANDROID</span></div>
                <img src="/gameplay-run.jpg" alt="Roller Rush gameplay preview" />
              </div>
              <motion.div className="hero-coin" animate={{ y: [0, -14, 0], rotate: [-10, 12, -10] }} transition={{ duration: 4, repeat: Infinity }}><img src="/rush_coin.webp" alt="Rush coin" /></motion.div>
              <motion.div className="hero-ruby" animate={{ y: [0, 14, 0], rotate: [8, -9, 8] }} transition={{ duration: 4.8, repeat: Infinity }}><img src="/rush_ruby.webp" alt="Rush Ruby" /></motion.div>
              <div className="hero-character"><img src="/nico-character.png" alt="Nico, the Roller Rush skater" /></div>
              <div className="hero-sticker">GO<br />FAST<br /><span>✦</span></div>
              <div className="hero-caption">NICO IS ALREADY<br />OUT THERE.</div>
            </motion.div>
          </div>
          <div className="hero-bottom"><span>ROLL. RUSH. REPEAT.</span><span>SCROLL TO DROP IN <ArrowDown size={14} /></span><span>© VOXCOM GAMES</span></div>
        </section>

        <div className="ticker"><div className="ticker-track">{Array.from({ length: 2 }, (_, i) => <span key={i}>DODGE <b>✦</b> COLLECT <b>✦</b> BOOST <b>✦</b> UPGRADE <b>✦</b> REPEAT <b>✦</b> CHASE THE RUSH <b>✦</b></span>)}</div></div>

        <section className="intro section" id="ride">
          <motion.div className="intro-art" initial={{ opacity: 0, x: -35 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="intro-art-frame"><img src="/gameplay-run.jpg" alt="Nico racing through Roller Rush" /></div>
            <div className="intro-burst">ONE MORE<br /><b>RUN!</b></div><span className="art-coordinate">RR / 001 — THE CITY RUN</span>
          </motion.div>
          <motion.div className="intro-copy" initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="eyebrow">WELCOME TO NICO'S WORLD</div><h2>MEET YOUR<br /><span>NEW OBSESSION.</span></h2>
            <p>This city doesn't slow down. Neither should you. Take control of Nico, weave through unexpected obstacles and see just how far your wheels can take you.</p>
            <div className="intro-stats"><div><strong>∞</strong><small>STREETS TO RIDE</small></div><div><strong>04</strong><small>WAYS TO MOVE</small></div><div><strong>100%</strong><small>PURE RUSH</small></div></div>
            <a className="text-link" href="#gameplay">SHOW ME THE MOVES <ChevronRight /></a>
          </motion.div>
        </section>

        <section className="gameplay section" id="gameplay">
          <div className="section-heading"><div><div className="eyebrow">A LITTLE PREVIEW OF THE CHAOS</div><h2>THIS IS WHAT<br /><span>THE RUSH LOOKS LIKE.</span></h2></div><p>Every run is a new chance to get further, grab more and pull off a cleaner escape.</p></div>
          <div className="gameplay-grid">
            {gameplay.map((shot, i) => <motion.button type="button" key={shot.src} className={`shot shot-${i}`} onClick={() => setLightbox(shot)} whileHover={{ y: -8, rotate: i % 2 ? 1 : -1 }} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}>
              <img src={shot.src} alt={shot.alt} /><span className="shot-index">{shot.number}</span><span className="shot-label">{shot.label}</span><span className="shot-expand">↗</span>
            </motion.button>)}
          </div>
        </section>

        <section className="skatelab" id="skatelab">
          <div className="skatelab-head"><div className="eyebrow">YOUR RIDE. YOUR SIGNATURE.</div><h2>DON'T JUST<br /><span>ROLL. GLOW.</span></h2><p>Every skate has its own personality. And its own booster trail. Pick a ride and see what you leave behind.</p></div>
          <div className="skate-showcase">
            <div className="skate-tabs">{skates.map((skate, i) => <button key={skate.name} className={activeSkate === i ? 'active' : ''} onClick={() => setActiveSkate(i)} style={{ '--skate': skate.color }}><span>0{i + 1}</span>{skate.name}<ChevronRight size={16} /></button>)}</div>
            <AnimatePresence mode="wait">
              <motion.div key={activeSkate} className={`skate-display ${active.visual}`} style={{ '--skate': active.color }} initial={{ opacity: 0, x: 24, scale: 0.98 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.24 }}>
                <div className="skate-display-top"><span>{active.tier} SERIES</span><span>BOOSTER LAB / 0{activeSkate + 1}</span></div>
                <div className="skate-aura"><div className="aura-ring" /><div className="aura-ring ring-two" /><div className="skate-glyph">{active.mark}</div><div className="trail-particles">{Array.from({ length: 18 }, (_, i) => <i key={i} style={{ '--i': i, '--offset': `${(i - 8.5) * 13}px`, '--offsetY': `${((i % 4) - 1.5) * 23}px` }} />)}</div></div>
                <div className="skate-info"><div className="skate-kicker">MEET THE RIDE</div><h3>{active.name.toUpperCase()}</h3><p>{active.copy}</p><div className="effect-chip"><Sparkles size={15} />{active.effect}</div></div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="skate-market-strip"><div><span>THE COLLECTION</span><b>FIND YOUR NEXT FAVOURITE RIDE</b></div><img src="/skate-market-starter.jpg" alt="Roller Rush starter skate collection" /><img src="/skate-market-pro.jpg" alt="Roller Rush pro skate collection" /><img src="/skate-market-mythic.jpg" alt="Roller Rush mythic skate collection" /></div>
        </section>

        <section className="loot section">
          <div className="loot-copy"><div className="eyebrow">SHINY THINGS AHEAD</div><h2>CHASE THE<br /><span>GOOD STUFF.</span></h2><p>Coins keep your collection growing. Rush Rubies are rare finds worth celebrating. And sometimes, a mystery reward is waiting after a run. Grab your loot and build a skate setup that feels like yours.</p><a className="btn-dark" href={PLAY_URL} target="_blank" rel="noreferrer">START COLLECTING <ArrowUpRight /></a></div>
          <div className="loot-art"><motion.img className="loot-coin" src="/rush_coin.webp" alt="Roller Rush coin" animate={{ y: [0, -16, 0], rotate: [-8, 8, -8] }} transition={{ duration: 4, repeat: Infinity }} /><motion.img className="loot-ruby" src="/rush_ruby.webp" alt="Rush Ruby" animate={{ y: [0, 18, 0], rotate: [0, 9, 0] }} transition={{ duration: 3.5, repeat: Infinity }} /><motion.img className="loot-mystery" src="/mystery_bubble.webp" alt="Mystery reward bubble" animate={{ y: [0, -12, 0], rotate: [4, -5, 4] }} transition={{ duration: 5, repeat: Infinity }} /><span className="loot-orbit orbit-one" /><span className="loot-orbit orbit-two" /></div>
        </section>

        <section className="final-cta"><div className="cta-confetti">✦　✧　✦　✧　✦</div><div className="eyebrow">YOUR NEXT FAVOURITE RUN IS ONE TAP AWAY</div><h2>LESS TALK.<br /><span>MORE ROLL.</span></h2><p>Grab your skates. Nico's waiting.</p><a href={PLAY_URL} target="_blank" rel="noreferrer" className="btn-primary cta-button"><Play fill="currentColor" /> DOWNLOAD FREE ON GOOGLE PLAY <ArrowUpRight /></a><div className="cta-sub">ANDROID • FREE TO DOWNLOAD • MADE FOR THE RUSH</div><div className="cta-track" /></section>
      </main>

      <footer className="footer"><a href="#top" className="brand"><span className="brand-mark">RR</span><span>ROLLER <b>RUSH</b></span></a><p>© {new Date().getFullYear()} Roller Rush · A VOXCOM game</p><div className="footer-links"><a href={PLAY_URL} target="_blank" rel="noreferrer">GOOGLE PLAY <ArrowUpRight size={14} /></a><a href={PRIVACY_URL} target="_blank" rel="noreferrer">PRIVACY POLICY <ArrowUpRight size={14} /></a><a href="mailto:voxcom.online@gmail.com">CONTACT <ArrowUpRight size={14} /></a></div></footer>

      <AnimatePresence>{lightbox && <motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={lightbox.label} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLightbox(null)}><button aria-label="Close preview" onClick={() => setLightbox(null)}>×</button><motion.img src={lightbox.src} alt={lightbox.alt} initial={{ scale: 0.92 }} animate={{ scale: 1 }} /><p>{lightbox.label}</p></motion.div>}</AnimatePresence>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
