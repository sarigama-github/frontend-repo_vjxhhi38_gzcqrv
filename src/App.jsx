import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, Calendar, MapPin, Mail, Phone, Instagram, Youtube, Facebook, Twitter } from 'lucide-react'
import Spline from '@splinetool/react-spline'

// Utility: smooth scroll to an element by id
const scrollToId = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Utility: subtle synth hover ping using WebAudio (no external asset)
const useHoverSound = () => {
  const audioCtxRef = useRef(null)
  const ensureCtx = () => {
    if (!audioCtxRef.current) {
      const Ctx = window.AudioContext || window.webkitAudioContext
      audioCtxRef.current = new Ctx()
    }
    return audioCtxRef.current
  }
  const play = () => {
    try {
      const ctx = ensureCtx()
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'triangle'
      o.frequency.setValueAtTime(660, ctx.currentTime)
      g.gain.setValueAtTime(0.0001, ctx.currentTime)
      g.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.02)
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15)
      o.connect(g)
      g.connect(ctx.destination)
      o.start()
      o.stop(ctx.currentTime + 0.16)
    } catch (e) {
      // ignore
    }
  }
  return play
}

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const hover = useHoverSound()
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'events', label: 'Events' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'contact', label: 'Register' },
  ]
  const LinkItem = ({ id, label }) => (
    <button
      onMouseEnter={hover}
      onClick={() => { setOpen(false); scrollToId(id) }}
      className="px-4 py-2 text-sm tracking-widest uppercase font-semibold text-cyan-200 hover:text-white transition relative"
    >
      <span className="relative z-10 drop-shadow-[0_0_12px_rgba(0,255,255,0.35)]">{label}</span>
      <span className="absolute inset-0 rounded-md opacity-0 hover:opacity-100 transition bg-gradient-to-r from-cyan-500/10 via-transparent to-orange-500/10 blur-md" />
    </button>
  )
  return (
    <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-gradient-to-br from-cyan-400 to-orange-500 animate-pulse shadow-[0_0_24px_rgba(0,255,255,0.35)]" />
          <div className="leading-tight">
            <div className="font-extrabold text-xl tracking-widest text-white spark-logo">SPARK <span className="text-orange-400">2K25</span></div>
            <div className="text-[10px] uppercase tracking-[0.35em] text-cyan-300/70">SV College · Tirupati</div>
          </div>
        </div>
        <div className="hidden md:flex items-center">
          {links.map((l) => (
            <LinkItem key={l.id} {...l} />
          ))}
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-cyan-200 hover:text-white" aria-label="Toggle Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/70">
          <div className="px-4 py-2 flex flex-col">
            {links.map((l) => (
              <LinkItem key={l.id} {...l} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const Hero = () => {
  const hover = useHoverSound()
  return (
    <section id="home" className="relative h-[95vh] w-full overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/7m4PRZ7kg6K1jPfF/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.55)_55%,rgba(0,0,0,0.85)_100%)]" />
      <div className="absolute inset-0 pointer-events-none mix-blend-screen bg-[url('https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=1200&auto=format&fit=crop')] opacity-[0.08] bg-cover" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-orange-400 drop-shadow-[0_0_12px_rgba(255,255,255,0.35)] metallic"
        >
          SPARK 2K25
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-4 max-w-2xl text-cyan-200/80 tracking-wider"
        >
          Where innovation meets adrenaline — a high-octane college fest inspired by the world of modern warfare gaming.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-10">
          <button
            onMouseEnter={hover}
            onClick={() => scrollToId('contact')}
            className="group relative inline-flex items-center gap-3 px-8 py-4 uppercase tracking-[0.25em] font-bold text-black"
          >
            <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400 to-orange-500 shadow-[0_0_32px_rgba(0,255,255,0.35)] group-hover:shadow-[0_0_56px_rgba(255,69,0,0.45)] transition" />
            <span className="relative z-10">Join the Battle</span>
          </button>
        </motion.div>
      </div>

      {/* Ambient smoky particles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="smoke" />
        <div className="smoke delay-1000" />
      </div>
    </section>
  )
}

const About = () => (
  <section id="about" className="relative bg-[#0A0A0A] py-24">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,255,255,0.06),transparent_60%)]" />
    <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <h2 className="section-title">About the Event</h2>
        <p className="mt-4 text-cyan-100/80 leading-relaxed">
          A celebration of talent, technology, and teamwork. Step into an immersive arena where coding meets combat, creativity faces challenges, and every moment feels cinematic.
        </p>
        <p className="mt-3 text-cyan-100/70">
          Join students from across the region in Technical battles, Gaming tournaments, Cultural showcases, and pure Fun events — all under one electrifying sky.
        </p>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-2 gap-4">
        {[
          'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1535223289827-42f1e9919769?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1519985176271-adb1088fa94c?q=80&w=1200&auto=format&fit=crop',
          'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?q=80&w=1200&auto=format&fit=crop',
        ].map((src, i) => (
          <div key={i} className="relative group rounded-lg overflow-hidden border border-white/10 bg-white/5">
            <img src={src} alt="Prev event" className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition duration-700" />
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/0 via-cyan-400/0 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition" />
            <div className="absolute bottom-2 left-2 text-[10px] uppercase tracking-[0.3em] text-cyan-200 glitch">SPARK</div>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
)

const Events = () => {
  const cards = [
    { title: 'Technical', desc: 'Hackathons, AI duels, robotics, dev sprints', color: 'from-cyan-400 to-cyan-600' },
    { title: 'Gaming', desc: 'BGMI, Valorant, FIFA — tournaments & arenas', color: 'from-orange-400 to-red-500' },
    { title: 'Cultural', desc: 'Music, dance, fashion — primetime showcases', color: 'from-purple-400 to-pink-500' },
    { title: 'Fun', desc: 'Mini-games, treasure hunts, chill zones', color: 'from-lime-400 to-emerald-500' },
  ]
  return (
    <section id="events" className="relative bg-[#0A0A0A] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,69,0,0.06),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <h2 className="section-title">Events</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
              className="relative rounded-xl p-6 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 backdrop-blur-sm group perspective"
            >
              <div className={`absolute -inset-px rounded-xl bg-gradient-to-r ${c.color} opacity-0 group-hover:opacity-20 blur-xl transition`} />
              <div className="relative">
                <div className="text-xl font-extrabold tracking-widest text-white drop-shadow">{c.title}</div>
                <p className="mt-2 text-sm text-cyan-100/80">{c.desc}</p>
                <div className={`mt-6 h-1 w-20 rounded-full bg-gradient-to-r ${c.color}`} />
              </div>
              <div className="absolute inset-0 rounded-xl ring-1 ring-white/10 group-hover:ring-cyan-400/40 transition shadow-[inset_0_0_20px_rgba(0,255,255,0.15)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Gallery = () => {
  const imgs = [
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1520975922284-9d8a622dbde1?q=80&w=1200&auto=format&fit=crop',
  ]
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setIndex((p) => (p + 1) % imgs.length), 3500)
    return () => clearInterval(t)
  }, [])
  return (
    <section id="gallery" className="relative bg-[#0A0A0A] py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,255,0.05),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <h2 className="section-title">Gallery</h2>
        <div className="mt-10 relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-white/5 to-white/0">
          <div className="relative h-[320px] sm:h-[420px]">
            {imgs.map((src, i) => (
              <img
                key={i}
                src={src}
                alt="Event shot"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
                style={{ transform: `translateZ(0) scale(${i === index ? 1.05 : 1})` }}
              />
            ))}
            <div className="absolute inset-0 pointer-events-none gallery-smoke" />
            <div className="absolute inset-0 ring-1 ring-white/10" />
          </div>
          <div className="flex justify-center gap-2 py-3 bg-black/40">
            {imgs.map((_, i) => (
              <button key={i} onClick={() => setIndex(i)} className={`h-2 w-8 rounded-full ${i === index ? 'bg-cyan-400' : 'bg-white/20'}`} aria-label={`Go to slide ${i+1}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const useCountdown = (targetDate) => {
  const calc = () => {
    const now = new Date().getTime()
    const diff = Math.max(0, targetDate - now)
    const d = Math.floor(diff / (1000 * 60 * 60 * 24))
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const m = Math.floor((diff / (1000 * 60)) % 60)
    const s = Math.floor((diff / 1000) % 60)
    return { d, h, m, s, done: diff === 0 }
  }
  const [state, setState] = useState(calc())
  useEffect(() => { const t = setInterval(() => setState(calc()), 1000); return () => clearInterval(t) }, [])
  return state
}

const Schedule = () => {
  // Set your main event date/time here (YYYY-MM-DDTHH:mm:ss)
  const target = useMemo(() => new Date('2025-03-15T09:00:00').getTime(), [])
  const { d, h, m, s } = useCountdown(target)
  const items = [
    { day: 'Day 1', date: 'Mar 15', info: 'Inauguration, Tech Battles, Hackathons' },
    { day: 'Day 2', date: 'Mar 16', info: 'BGMI, Valorant, FIFA – Eliminations' },
    { day: 'Day 3', date: 'Mar 17', info: 'Cultural Night, Finals, Closing Ceremony' },
  ]
  return (
    <section id="schedule" className="relative bg-[#0A0A0A] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,69,0,0.06),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-6">
        <h2 className="section-title">Schedule</h2>
        <div className="mt-10 grid lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-6">
            {items.map((it, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="relative p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10">
                <div className="flex items-center gap-3 text-cyan-300">
                  <Calendar className="h-5 w-5" />
                  <div className="uppercase tracking-[0.35em] text-xs">{it.day} · {it.date}</div>
                </div>
                <div className="mt-2 text-white font-semibold">{it.info}</div>
                <div className="absolute inset-0 rounded-xl pointer-events-none shadow-[inset_0_0_32px_rgba(255,255,255,0.04)]" />
              </motion.div>
            ))}
          </div>
          <div className="rounded-2xl border border-white/10 p-8 bg-gradient-to-b from-white/5 to-white/0 text-center">
            <div className="uppercase tracking-[0.35em] text-cyan-300 text-xs">Countdown</div>
            <div className="mt-4 grid grid-cols-4 gap-4">
              {[{ label: 'Days', val: d }, { label: 'Hrs', val: h }, { label: 'Min', val: m }, { label: 'Sec', val: s }].map((b) => (
                <div key={b.label} className="rounded-lg bg-black/60 border border-white/10 p-4">
                  <div className="text-4xl font-extrabold text-white drop-shadow">{String(b.val).padStart(2, '0')}</div>
                  <div className="mt-2 text-xs uppercase tracking-[0.35em] text-cyan-300">{b.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-cyan-100/70">Main arena opens at 9:00 AM, Tirupati</div>
          </div>
        </div>
      </div>
    </section>
  )
}

const Contact = () => {
  const hover = useHoverSound()
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Registration received! We\'ll contact you with details.')
  }
  return (
    <section id="contact" className="relative bg-[#0A0A0A] py-24">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,255,255,0.06),transparent_60%)]" />
      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="section-title">Register</h2>
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="label">Full Name</label>
              <input className="input" placeholder="Your name" required onMouseEnter={hover} />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label">Email</label>
                <input type="email" className="input" placeholder="you@example.com" required onMouseEnter={hover} />
              </div>
              <div>
                <label className="label">Phone</label>
                <input type="tel" className="input" placeholder="98765 43210" required onMouseEnter={hover} />
              </div>
            </div>
            <div>
              <label className="label">Category</label>
              <select className="input bg-black/60" onMouseEnter={hover}>
                <option>Technical</option>
                <option>Gaming</option>
                <option>Cultural</option>
                <option>Fun</option>
              </select>
            </div>
            <div>
              <label className="label">Team / Notes</label>
              <textarea className="input h-28" placeholder="Team name, preferred games, etc." onMouseEnter={hover} />
            </div>
            <button className="relative inline-flex items-center justify-center px-6 py-3 rounded-md font-bold uppercase tracking-[0.25em] text-black group" onMouseEnter={hover}>
              <span className="absolute inset-0 rounded-md bg-gradient-to-r from-cyan-400 to-orange-500" />
              <span className="relative z-10">Submit</span>
            </button>
          </form>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <iframe
              title="SV College Tirupati Map"
              src="https://www.google.com/maps?q=SV%20College%20Tirupati&output=embed"
              className="w-full h-64"
              loading="lazy"
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-4 text-cyan-100/80">
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-cyan-400" /> SV College, Tirupati</div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-cyan-400" /> spark@svcolleges.edu.in</div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-cyan-400" /> +91 98765 43210</div>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Instagram" className="icon-btn"><Instagram /></a>
            <a href="#" aria-label="Twitter" className="icon-btn"><Twitter /></a>
            <a href="#" aria-label="YouTube" className="icon-btn"><Youtube /></a>
            <a href="#" aria-label="Facebook" className="icon-btn"><Facebook /></a>
          </div>
        </div>
      </div>
    </section>
  )
}

const Footer = () => (
  <footer className="relative bg-[#0A0A0A] py-10 border-t border-white/10 overflow-hidden">
    <div className="absolute inset-0 pointer-events-none spark-embers" />
    <div className="relative max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="text-cyan-200/80 text-sm">© {new Date().getFullYear()} SPARK 2K25 · SV College, Tirupati</div>
      <div className="text-center">
        <div className="uppercase tracking-[0.35em] text-cyan-300 text-xs">Rise. Play. Conquer.</div>
      </div>
      <a href="#home" onClick={(e) => { e.preventDefault(); scrollToId('home') }} className="text-cyan-300 hover:text-white">Back to top</a>
    </div>
  </footer>
)

function App() {
  useEffect(() => {
    // enable smooth scroll on hash links if any
    if ('scrollBehavior' in document.documentElement.style === false) {
      // no-op fallback
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-orbitron">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <About />
        <Events />
        <Gallery />
        <Schedule />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
