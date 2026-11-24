import React from 'react';
import { createRoot } from 'react-dom/client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Zap, Trophy, Gem, Play, Instagram, Youtube, Gamepad2, Sparkles } from 'lucide-react';
import './style.css';

const playUrl = 'https://play.google.com/store/apps/details?id=com.voxcom.rollerrush';
const reveal = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: .7, ease: [0.22,1,0.36,1] } } };
function App(){
  const { scrollY } = useScroll();
  const floatY = useTransform(scrollY, [0,700], [0,100]);
  return <div className="site">
    <div className="grain"/>
    <nav className="nav">
      <a href="#top" className="brand"><span className="brand-mark">RR</span><span>ROLLER <b>RUSH</b></span></a>
      <div className="nav-links"><a href="#game">THE GAME</a><a href="#features">FEATURES</a><a href="#updates">UPDATES</a></div>
      <a className="nav-cta" href={playUrl} target="_blank" rel="noreferrer">PLAY NOW <ArrowUpRight size={16}/></a>
    </nav>
    <main id="top">
      <section className="hero">
        <div className="hero-bg"/>
        <div className="hero-content">
          <motion.div initial="hidden" animate="show" variants={reveal} className="hero-copy">
            <div className="eyebrow"><Sparkles size={15}/> THE STREET IS YOURS</div>
            <h1>CHASE<br/><span>THE RUSH.</span></h1>
            <p>Roll into the chaos. Dodge, slide, jump and push your distance further in an endless skating adventure.</p>
            <div className="hero-buttons"><a className="btn-primary" href={playUrl} target="_blank" rel="noreferrer"><Play fill="currentColor" size={18}/> PLAY ON GOOGLE PLAY</a><a className="btn-ghost" href="#game">DISCOVER THE GAME <ArrowDown size={16}/></a></div>
            <div className="stats"><div><strong><Zap size={18}/> ENDLESS</strong><small>RUN YOUR WAY</small></div><div><strong><Gem size={18}/> REWARDS</strong><small>COLLECT & UPGRADE</small></div><div><strong><Trophy size={18}/> LEADERBOARD</strong><small>CHASE YOUR BEST</small></div></div>
          </motion.div>
          <motion.div className="hero-art" style={{y:floatY}}>
            <div className="screen-frame"><img src="/roller-rush-menu.jpg" alt="Roller Rush gameplay menu"/><div className="screen-glow"/></div>
            <div className="floating-tag tag-one"><Gem size={19}/> RUSH RUBY</div><div className="floating-tag tag-two"><Zap size={18}/> KEEP MOVING</div>
          </motion.div>
        </div>
        <div className="hero-bottom"><span>ANDROID GAME</span><span>BUILT FOR THE RUSH <span className="yellow">✦</span></span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>
      <section className="intro section" id="game">
        <motion.div initial="hidden" whileInView="show" viewport={{once:true,amount:.3}} variants={reveal} className="intro-heading"><div className="eyebrow">WELCOME TO ROLLER RUSH</div><h2>ONE RUN.<br/><span>INFINITE POSSIBILITIES.</span></h2></motion.div>
        <motion.div initial="hidden" whileInView="show" viewport={{once:true,amount:.3}} variants={reveal} className="intro-text"><p>Speed through a vibrant world where every second counts. React quick, master your moves and make every run count.</p><a className="text-link" href={playUrl} target="_blank" rel="noreferrer">GET IN THE GAME <ArrowUpRight/></a></motion.div>
      </section>
      <section className="features section" id="features">
        <div className="section-top"><div className="eyebrow">THE RIDE</div><h2>MOVE. <span>COLLECT.</span><br/>LEVEL UP.</h2></div>
        <div className="feature-grid">
          <motion.article whileHover={{y:-8}} className="feature-card card-blue"><div className="feature-icon"><Zap/></div><span className="card-number">01 / MOVEMENT</span><h3>FIND YOUR FLOW</h3><p>Slide, leap and react. Every obstacle is a chance to keep the momentum alive.</p><div className="card-orbit orbit-blue"/></motion.article>
          <motion.article whileHover={{y:-8}} className="feature-card card-yellow"><div className="feature-icon"><Gem/></div><span className="card-number">02 / LOOT</span><h3>GRAB THE GOODIES</h3><p>Gather coins and rare Rush Rubies as you carve your path through the run.</p><div className="card-orbit orbit-yellow"/></motion.article>
          <motion.article whileHover={{y:-8}} className="feature-card card-purple"><div className="feature-icon"><Trophy/></div><span className="card-number">03 / PROGRESS</span><h3>MAKE IT YOURS</h3><p>Unlock style, upgrade your skates and chase a new personal best.</p><div className="card-orbit orbit-purple"/></motion.article>
        </div>
      </section>
      <section className="showcase">
        <div className="showcase-image"><img src="/roller-rush-menu.jpg" alt="Roller Rush game scene"/></div><div className="showcase-overlay"/>
        <motion.div className="showcase-copy" initial="hidden" whileInView="show" viewport={{once:true}} variants={reveal}><div className="eyebrow">THE NEXT RUN IS YOURS</div><h2>DON'T JUST<br/>PLAY IT.<br/><span>RIDE IT.</span></h2><p>Ready to hit the streets?</p><a href={playUrl} target="_blank" rel="noreferrer" className="btn-primary"><Play fill="currentColor"/> DOWNLOAD ROLLER RUSH</a></motion.div>
      </section>
      <section className="updates section" id="updates"><div className="updates-head"><div><div className="eyebrow">FROM THE DEVELOPER</div><h2>THE RUSH<br/><span>CONTINUES.</span></h2></div><div className="updates-note">New features, improvements and announcements will land here. Stay tuned for the next ride.</div></div><div className="update-card"><div className="update-label"><span className="dot"/> CURRENT RELEASE</div><h3>Roller Rush is live on Google Play.</h3><p>Download the game, hit the track and start chasing your best distance.</p><a href={playUrl} target="_blank" rel="noreferrer" className="text-link">PLAY ON GOOGLE PLAY <ArrowUpRight/></a></div></section>
      <section className="final-cta"><div className="eyebrow">READY, SKATER?</div><h2>LET'S <span>ROLL.</span></h2><a href={playUrl} target="_blank" rel="noreferrer" className="btn-primary"><Play fill="currentColor"/> PLAY FREE</a><div className="skate-lines"/></section>
    </main>
    <footer className="footer"><a href="#top" className="brand"><span className="brand-mark">RR</span><span>ROLLER <b>RUSH</b></span></a><p>© {new Date().getFullYear()} Roller Rush. Built for the rush.</p><div className="footer-links"><a href={playUrl} target="_blank" rel="noreferrer">GOOGLE PLAY <ArrowUpRight size={14}/></a><a href="mailto:voxcom.online@gmail.com">CONTACT <ArrowUpRight size={14}/></a></div></footer>
  </div>
}
createRoot(document.getElementById('root')).render(<App/>);