import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Youtube, Menu, X, BookOpen, Music, Award, 
  ChevronRight, ExternalLink, Mail, Instagram, Twitter, Linkedin,
  BarChart2, Globe, Layers, Star, Sun, Moon
} from 'lucide-react';

/* ===== THEME CONTEXT ===== */
const ThemeCtx = createContext({ light: false, toggle: () => {} });
const useTheme = () => useContext(ThemeCtx);

/* ===== SCROLL REVEAL HOOK ===== */
function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('in-view'); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return ref;
}

/* ===== LIGHT MODE COLOR HELPERS ===== */
// Returns dark-mode value or light-mode value
function lm(light: boolean, dark: string, lite: string) {
  return light ? lite : dark;
}

/* ===== CUSTOM CURSOR ===== */
const Cursor = () => {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onEnter = () => setIsHover(true);
    const onLeave = () => setIsHover(false);
    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a,button,[data-hover]').forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });
    let frame: number;
    const animate = () => {
      if (dot.current) { dot.current.style.left = mx - 2.5 + 'px'; dot.current.style.top = my - 2.5 + 'px'; }
      rx += (mx - rx) * 0.15; ry += (my - ry) * 0.15;
      if (ring.current) { ring.current.style.left = rx - 15 + 'px'; ring.current.style.top = ry - 15 + 'px'; }
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(frame); };
  }, []);

  return (
    <>
      <div ref={dot} className="cursor-dot" style={{ position:'fixed', pointerEvents:'none', zIndex:99999 }} />
      <div ref={ring} className={`cursor-ring${isHover ? ' hover' : ''}`} style={{ position:'fixed', pointerEvents:'none', zIndex:99998 }} />
    </>
  );
};

/* ===== TICKER ===== */
const Ticker = () => {
  const { light } = useTheme();
  const items = ['Statesman','•','Artist','•','Author','•','Kevekha Kevin Zehol','•','Nagaland','•','NSSB Chairman','•','Contemporary Naga Music','•','34 Years of Service','•'];
  const doubled = [...items, ...items];
  return (
    <div className="ticker-wrap py-2.5" style={{
      background: lm(light,'rgba(0,210,255,0.04)','rgba(181,84,10,0.05)'),
      borderTop: `1px solid ${lm(light,'rgba(0,210,255,0.08)','rgba(160,100,30,0.15)')}`,
      borderBottom: `1px solid ${lm(light,'rgba(0,210,255,0.08)','rgba(160,100,30,0.15)')}`,
    }}>
      <div className="ticker-content">
        {doubled.map((item, i) => (
          <span key={i} className="mx-6 text-[10px] font-semibold uppercase tracking-[0.3em]"
            style={{ fontFamily:'Poppins,sans-serif', color: lm(light,'rgba(0,210,255,0.55)','rgba(140,70,10,0.7)') }}
          >{item}</span>
        ))}
      </div>
    </div>
  );
};

/* ===== THEME TOGGLE ===== */
const ThemeToggle = () => {
  const { light, toggle } = useTheme();
  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme">
      <div className="theme-toggle-knob">
        {light ? <Sun size={11} color="#fff" /> : <Moon size={11} color="#06060f" />}
      </div>
    </button>
  );
};

/* ===== NAVBAR ===== */
const Navbar = ({ onOpenSubPage }: { onOpenSubPage: (page: string) => void }) => {
  const { light } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', action: () => onOpenSubPage('About') },
    { name: 'Statesman', href: '#statesman' },
    { name: 'Artist', href: '#artist' },
    { name: 'Author', href: '#author' },
  ];
  const accent = lm(light,'#00D2FF','#b5540a');
  const navTextColor = lm(light,'rgba(255,255,255,0.4)','rgba(60,40,15,0.55)');

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 header-flow ${isScrolled ? 'py-2' : 'py-4'}`}
        style={{ borderBottom: isScrolled ? `1px solid ${lm(light,'rgba(0,210,255,0.1)','rgba(160,100,30,0.2)')}` : 'none',
          boxShadow: isScrolled ? lm(light,'0 0 40px rgba(0,210,255,0.06)','0 0 40px rgba(181,84,10,0.06)') : 'none' }}>
        <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background:`linear-gradient(90deg, transparent, ${accent}80, transparent)` }} />
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home"
            className="font-display text-xl md:text-2xl tracking-wider uppercase logo-reveal"
            style={{ fontFamily:'Anton,sans-serif', textDecoration:'none', display:'inline-block', color: light ? '#b5540a' : '#00D2FF', letterSpacing:'0.06em' }}
          >K.K. ZEHOL</a>
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link =>
              link.action ? (
                <motion.button key={link.name} onClick={link.action} whileHover={{ y:-1 }}
                  className="text-[10px] font-semibold uppercase tracking-[0.3em] transition-all duration-300 relative group cursor-none"
                  style={{ fontFamily:'Poppins,sans-serif', color:navTextColor }}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-400 group-hover:w-full" style={{ background:accent }} />
                </motion.button>
              ) : (
                <motion.a key={link.name} href={link.href} whileHover={{ y:-1 }}
                  className="text-[10px] font-semibold uppercase tracking-[0.3em] transition-all duration-300 relative group"
                  style={{ fontFamily:'Poppins,sans-serif', color:navTextColor }}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-400 group-hover:w-full" style={{ background:accent }} />
                </motion.a>
              )
            )}
            <ThemeToggle />
            <motion.a whileHover={{ scale:1.15, rotate:5 }} whileTap={{ scale:0.9 }}
              href="https://youtube.com" target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 flex items-center justify-center transition-all"
              style={{ border:`1px solid ${lm(light,'rgba(239,68,68,0.4)','rgba(180,40,40,0.5)')}`, color:lm(light,'rgba(239,68,68,0.8)','rgba(180,40,40,0.85)'), borderRadius:'0.5rem' }}
            ><Youtube size={13} /></motion.a>
          </div>
          <motion.button whileTap={{ scale:0.95 }} className="md:hidden transition-colors" style={{ color:lm(light,'rgba(255,255,255,0.7)','rgba(60,35,10,0.7)') }} onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={22} />
          </motion.button>
        </div>
      </nav>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity:0, x:'100%' }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:'100%' }}
            transition={{ type:'spring', damping:25, stiffness:200 }}
            className="fixed inset-0 z-[60] flex flex-col p-8 grid-bg"
            style={{ background: lm(light,'#06060f','#fdfbf7'), borderLeft:`1px solid ${lm(light,'rgba(0,210,255,0.1)','rgba(160,100,30,0.2)')}` }}
          >
            <div className="flex justify-between items-center mb-16">
              <span className="font-display text-2xl uppercase tracking-wider" style={{ fontFamily:'Anton,sans-serif', color:accent }}>K.K. ZEHOL</span>
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <motion.button whileHover={{ rotate:90 }} whileTap={{ scale:0.9 }} onClick={() => setIsMobileMenuOpen(false)} style={{ color:lm(light,'rgba(255,255,255,0.6)','rgba(60,35,10,0.6)') }}>
                  <X size={28} />
                </motion.button>
              </div>
            </div>
            <div className="flex flex-col space-y-6">
              {navLinks.map((link, i) =>
                link.action ? (
                  <motion.button key={link.name} initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.08 }}
                    onClick={() => { link.action?.(); setIsMobileMenuOpen(false); }}
                    className="font-display text-5xl uppercase text-left transition-all"
                    style={{ fontFamily:'Anton,sans-serif', color:lm(light,'rgba(255,255,255,0.25)','rgba(60,35,10,0.25)') }}
                  >{link.name}</motion.button>
                ) : (
                  <motion.a key={link.name} href={link.href} initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ delay:i*0.08 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-display text-5xl uppercase transition-all"
                    style={{ fontFamily:'Anton,sans-serif', color:lm(light,'rgba(255,255,255,0.25)','rgba(60,35,10,0.25)') }}
                  >{link.name}</motion.a>
                )
              )}
            </div>
            <div className="mt-auto flex items-center space-x-5">
              {[Instagram, Twitter].map((Icon, i) => <a key={i} href="#" style={{ color:lm(light,'rgba(255,255,255,0.3)','rgba(60,35,10,0.35)') }}><Icon size={18} /></a>)}
              <a href="https://www.youtube.com/@kevekhakevinzehol9688" target="_blank" rel="noopener noreferrer" style={{ color:lm(light,'rgba(239,68,68,0.7)','rgba(180,40,40,0.8)') }}><Youtube size={18} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ===== HERO ===== */
const Hero = ({ onOpenSubPage }: { onOpenSubPage: () => void }) => {
  const { light } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const imgY = useTransform(scrollYProgress, [0,1], ['0%','12%']);
  const textY = useTransform(scrollYProgress, [0,1], ['0%','6%']);
  const opacity = useTransform(scrollYProgress, [0,0.8], [1,0]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCount(c => { if (c >= 34) { clearInterval(t); return 34; } return c+1; }), 60);
    return () => clearInterval(t);
  }, []);

  const accent = lm(light,'#00D2FF','#b5540a');
  const accent2 = lm(light,'#BF5FFF','#7c3a8f');
  const accentA = lm(light,'rgba(0,210,255,0.7)','rgba(181,84,10,0.75)');
  const accentA2 = lm(light,'rgba(191,95,255,0.75)','rgba(124,58,143,0.75)');
  const bg = lm(light,'#0d0d1a','#fdfbf7');
  const cardBg = lm(light,'linear-gradient(to top, rgba(13,13,26,0.92) 0%, transparent 60%)','linear-gradient(to top, rgba(250,247,242,0.92) 0%, transparent 60%)');
  const chipBg = lm(light,'rgba(0,210,255,0.05)','rgba(181,84,10,0.06)');
  const chipBorder = lm(light,'rgba(0,210,255,0.22)','rgba(181,84,10,0.28)');
  const mutedText = lm(light,'rgba(255,255,255,0.35)','rgba(60,40,15,0.55)');
  const mutedText2 = lm(light,'rgba(255,255,255,0.22)','rgba(60,40,15,0.3)');
  const divider = lm(light,'rgba(255,255,255,0.08)','rgba(160,100,30,0.15)');
  const scanlineBg = lm(light,'linear-gradient(to bottom, transparent, rgba(0,210,255,0.06), transparent)','linear-gradient(to bottom, transparent, rgba(181,84,10,0.05), transparent)');
  const photoGrad = lm(light,'linear-gradient(90deg,transparent,rgba(0,210,255,0.4),transparent)','linear-gradient(90deg,transparent,rgba(181,84,10,0.4),transparent)');
  const badgesData = [
    { label:'Statesman', color:accentA, bg:lm(light,'rgba(0,210,255,0.1)','rgba(181,84,10,0.08)'), border:lm(light,'rgba(0,210,255,0.25)','rgba(181,84,10,0.3)') },
    { label:'Artist', color:accentA2, bg:lm(light,'rgba(191,95,255,0.1)','rgba(124,58,143,0.08)'), border:lm(light,'rgba(191,95,255,0.25)','rgba(124,58,143,0.3)') },
    { label:'Author', color:lm(light,'rgba(212,175,55,0.75)','rgba(154,122,16,0.8)'), bg:lm(light,'rgba(212,175,55,0.1)','rgba(154,122,16,0.08)'), border:lm(light,'rgba(212,175,55,0.25)','rgba(154,122,16,0.3)') },
  ];
  const backBg = lm(light,'linear-gradient(160deg,rgba(0,8,22,0.99),rgba(0,20,52,0.99))','linear-gradient(160deg,rgba(255,252,246,0.99),rgba(248,240,228,0.99))');
  const backBorder = lm(light,'rgba(0,210,255,0.18)','rgba(181,84,10,0.22)');
  const backStatBg = lm(light,'rgba(0,210,255,0.04)','rgba(181,84,10,0.05)');
  const backStatBorder = lm(light,'rgba(0,210,255,0.1)','rgba(181,84,10,0.15)');
  const backStatColor = lm(light,'#00D2FF','#b5540a');
  const backTextColor = lm(light,'rgba(255,255,255,0.3)','rgba(60,40,15,0.4)');
  const whiteTxt = lm(light,'white','#1a1410');
  const ias = lm(light,'rgba(0,210,255,0.65)','rgba(181,84,10,0.7)');
  const statRoles = [
    { label:'Statesman', color:lm(light,'rgba(0,210,255,0.7)','rgba(181,84,10,0.8)'), border:lm(light,'rgba(0,210,255,0.2)','rgba(181,84,10,0.25)') },
    { label:'Artist', color:accentA2, border:lm(light,'rgba(191,95,255,0.2)','rgba(124,58,143,0.25)') },
    { label:'Author', color:lm(light,'rgba(212,175,55,0.7)','rgba(154,122,16,0.8)'), border:lm(light,'rgba(212,175,55,0.2)','rgba(154,122,16,0.25)') },
  ];

  return (
    <section id="home" ref={containerRef} className="relative overflow-hidden grid-bg" style={{ background:bg, minHeight:'100svh' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] rounded-full" style={{ background:lm(light,'rgba(0,210,255,0.04)','rgba(181,84,10,0.05)'), filter:'blur(140px)', transform:'translate(20%,-20%)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full" style={{ background:lm(light,'rgba(191,95,255,0.04)','rgba(124,58,143,0.04)'), filter:'blur(120px)', transform:'translate(-20%,20%)' }} />
        <motion.div className="absolute top-0 left-[38%] w-[1px] h-full hidden lg:block" style={{ background:scanlineBg }}
          animate={{ opacity:[0.3,0.8,0.3] }} transition={{ duration:5, repeat:Infinity }} />
      </div>

      {/* DESKTOP */}
      <div className="hidden lg:flex max-w-7xl mx-auto px-6 min-h-screen items-center relative z-10">
        <motion.div style={{ y: textY, opacity }} className="flex flex-col items-center text-center w-[52%] pr-12 xl:pr-20 py-24">
          <motion.button initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.7 }}
            onClick={onOpenSubPage}
            className="inline-flex items-center px-5 py-2 mb-6 cursor-none"
            style={{ border:`1px solid ${chipBorder}`, color:accentA, background:chipBg, borderRadius:'999px', fontFamily:'Poppins,sans-serif', fontSize:'9px', fontWeight:600, letterSpacing:'0.45em', textTransform:'uppercase' }}
          >
            <span className="w-1.5 h-1.5 rounded-full mr-2.5 animate-pulse" style={{ background:accentA }} />
            Statesman · Artist · Author
          </motion.button>

          <motion.h1 initial={{ opacity:0, x:-50 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.15, duration:1, ease:[0.16,1,0.3,1] }}
            className="font-display uppercase leading-[0.88] mb-5 animate-premium-navy"
            style={{ fontFamily:'Anton,sans-serif', fontSize:'clamp(3rem, 6vw, 6.5rem)' }}
          >Kevekha Kevin<br/>Zehol</motion.h1>

          <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:0.5, duration:0.8 }}
            className="h-[1px] w-24 mb-5" style={{ background:`linear-gradient(90deg,transparent,${accent},${accent2},transparent)` }} />

          <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.55, duration:0.9 }} className="space-y-1.5 mb-6">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] leading-relaxed" style={{ fontFamily:'Poppins,sans-serif', color:mutedText }}>
              Chairman — <span style={{ color:accentA }}>Nagaland Staff Selection Board</span>
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] leading-relaxed" style={{ fontFamily:'Poppins,sans-serif', color:mutedText }}>
              Voice of <span style={{ color:accentA2 }}>Contemporary Naga Music</span>
            </p>
          </motion.div>

          <motion.blockquote initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7, duration:1 }}
            className="max-w-sm mb-6 px-6 py-3"
            style={{ borderTop:`1px solid ${lm(light,'rgba(0,210,255,0.15)','rgba(181,84,10,0.18)')}`, borderBottom:`1px solid ${lm(light,'rgba(0,210,255,0.15)','rgba(181,84,10,0.18)')}` }}
          >
            <p className="text-sm italic leading-relaxed" style={{ fontFamily:'Poppins,sans-serif', color:mutedText2, fontStyle:'italic' }}>
              "A life dedicated to public service and creative excellence"
            </p>
          </motion.blockquote>

          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.85 }}
            className="flex items-center justify-center gap-8 mb-8"
          >
            {[{ val:`${count}+`, label:'Years Service' }, { val:'12+', label:'Districts' }, { val:'50K+', label:'Candidates' }].map((stat, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="w-[1px] h-7 shrink-0" style={{ background:divider }} />}
                <div className="text-center">
                  <p className="font-display text-2xl animate-color-flow" style={{ fontFamily:'Anton,sans-serif' }}>{stat.val}</p>
                  <p className="text-[8px] uppercase tracking-[0.3em] font-semibold mt-0.5" style={{ fontFamily:'Poppins,sans-serif', color:mutedText }}>{stat.label}</p>
                </div>
              </React.Fragment>
            ))}
          </motion.div>

          <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:1 }} className="flex flex-wrap justify-center gap-3">
            <motion.a whileHover={{ scale:1.03 }} whileTap={{ scale:0.98 }} href="#statesman" className="btn-premium">The Statesman</motion.a>
            <motion.a whileHover={{ scale:1.03 }} whileTap={{ scale:0.98 }} href="#artist" className="btn-premium">The Artist</motion.a>
          </motion.div>
        </motion.div>

        {/* Right image */}
        <motion.div style={{ y: imgY }} className="relative flex w-[48%] items-center justify-center py-24">
          <motion.div initial={{ opacity:0, x:60 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3, duration:1.1, ease:[0.16,1,0.3,1] }}
            className="premium-glow-container relative" style={{ width:'340px', maxWidth:'90%' }}
          >
            <div className="absolute -inset-16 rounded-full" style={{ background:lm(light,'rgba(0,210,255,0.07)','rgba(181,84,10,0.07)'), filter:'blur(80px)', zIndex:-1 }} />
            <div className="flip-card-container w-full" style={{ aspectRatio:'3/4', borderRadius:'1.75rem' }}>
              <div className="flip-card-inner w-full h-full" style={{ borderRadius:'1.75rem' }}>
                <div className="flip-card-front" style={{ borderRadius:'1.75rem', border:`1px solid ${lm(light,'rgba(0,210,255,0.18)','rgba(181,84,10,0.22)')}`, boxShadow:`0 40px 100px -20px ${lm(light,'rgba(0,0,0,0.85)','rgba(100,60,10,0.25)')}` }}>
                  <img src="https://i.ibb.co/ZpbHYXhH/1744384039162-1.png" alt="Kevekha Kevin Zehol"
                    className="w-full h-full object-cover object-top" style={{ borderRadius:'1.75rem', filter:`contrast(1.04) saturate(0.92) ${light ? 'sepia(0.08)' : ''}` }} referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 pointer-events-none" style={{ background:cardBg, borderRadius:'1.75rem' }} />
                  <motion.div className="absolute inset-x-0 h-[1px] pointer-events-none" style={{ background:photoGrad }}
                    animate={{ top:['0%','100%','0%'] }} transition={{ duration:4, repeat:Infinity, ease:'linear' }} />
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                    <p className="text-[8px] uppercase tracking-[0.4em] font-semibold mb-1" style={{ fontFamily:'Poppins,sans-serif', color:ias }}>IAS · Nagaland Civil Service</p>
                    <h2 className="font-display text-xl uppercase mb-2" style={{ fontFamily:'Anton,sans-serif', color:whiteTxt }}>Kevekha Kevin Zehol</h2>
                    <div className="flex gap-1.5 flex-wrap">
                      {badgesData.map((b,i) => (
                        <span key={i} className="px-2 py-0.5 text-[7px] font-semibold uppercase tracking-[0.2em]"
                          style={{ fontFamily:'Poppins,sans-serif', color:b.color, background:b.bg, border:`1px solid ${b.border}`, borderRadius:'999px' }}
                        >{b.label}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flip-card-back flex flex-col items-center justify-center p-6"
                  style={{ borderRadius:'1.75rem', background:backBg, border:`1px solid ${backBorder}` }}>
                  <Award size={28} style={{ color:accent }} className="mb-3" />
                  <h3 className="font-display text-2xl uppercase text-center mb-1" style={{ fontFamily:'Anton,sans-serif', color:whiteTxt }}>K.K. Zehol</h3>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.35em] mb-3" style={{ fontFamily:'Poppins,sans-serif', color:accentA }}>IAS · Nagaland</p>
                  <div className="h-[1px] w-10 mb-4" style={{ background:`linear-gradient(90deg,transparent,${accent},${accent2},transparent)` }} />
                  <div className="grid grid-cols-2 gap-2 w-full mb-4">
                    {[['34+','Years Service'],['12+','Districts'],['NSSB','Current Role'],['1990','Commissioned']].map(([v,l],i) => (
                      <div key={i} className="p-2.5 text-center" style={{ background:backStatBg, border:`1px solid ${backStatBorder}`, borderRadius:'0.75rem' }}>
                        <p className="text-base font-bold" style={{ fontFamily:'Anton,sans-serif', color:backStatColor }}>{v}</p>
                        <p className="text-[7px] uppercase tracking-widest font-semibold mt-0.5" style={{ fontFamily:'Poppins,sans-serif', color:backTextColor }}>{l}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    {statRoles.map((r,i) => (
                      <span key={i} className="px-4 py-1 text-[8px] font-semibold uppercase tracking-[0.3em]"
                        style={{ fontFamily:'Poppins,sans-serif', color:r.color, border:`1px solid ${r.border}`, borderRadius:'999px', background:lm(light,'rgba(255,255,255,0.02)','rgba(181,84,10,0.03)') }}
                      >{r.label}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden relative z-10 flex flex-col items-center text-center px-5 pt-24 pb-12">
        <motion.button initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}
          onClick={onOpenSubPage}
          className="inline-flex items-center px-4 py-1.5 mb-5 cursor-none"
          style={{ border:`1px solid ${chipBorder}`, color:accentA, background:chipBg, borderRadius:'999px', fontFamily:'Poppins,sans-serif', fontSize:'8px', fontWeight:600, letterSpacing:'0.4em', textTransform:'uppercase' }}
        >
          <span className="w-1 h-1 rounded-full mr-2 animate-pulse" style={{ background:accentA }} />
          Statesman · Artist · Author
        </motion.button>
        <motion.h1 initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1, duration:0.9 }}
          className="font-display uppercase leading-[0.9] mb-4 animate-premium-navy"
          style={{ fontFamily:'Anton,sans-serif', fontSize:'clamp(2.4rem, 11vw, 3.8rem)' }}
        >Kevekha Kevin<br/>Zehol</motion.h1>
        <motion.div initial={{ scaleX:0 }} animate={{ scaleX:1 }} transition={{ delay:0.35, duration:0.7 }}
          className="h-[1px] w-16 mb-4" style={{ background:`linear-gradient(90deg,transparent,${accent},${accent2},transparent)` }} />
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.4 }} className="space-y-1 mb-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em]" style={{ fontFamily:'Poppins,sans-serif', color:mutedText }}>
            Chairman — <span style={{ color:accentA }}>NSSB</span>
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em]" style={{ fontFamily:'Poppins,sans-serif', color:mutedText }}>
            Voice of <span style={{ color:accentA2 }}>Contemporary Naga Music</span>
          </p>
        </motion.div>
        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5 }}
          className="text-xs italic mb-5 max-w-[260px]"
          style={{ fontFamily:'Poppins,sans-serif', color:mutedText2, fontStyle:'italic' }}
        >"A life dedicated to public service and creative excellence"</motion.p>
        <motion.div initial={{ opacity:0, scale:0.92 }} animate={{ opacity:1, scale:1 }} transition={{ delay:0.3, duration:0.9 }}
          className="w-full max-w-[220px] mb-5 premium-glow-container relative"
        >
          <div className="flip-card-container w-full" style={{ aspectRatio:'3/4', borderRadius:'1.25rem' }}>
            <div className="flip-card-inner w-full h-full" style={{ borderRadius:'1.25rem' }}>
              <div className="flip-card-front" style={{ borderRadius:'1.25rem', border:`1px solid ${lm(light,'rgba(0,210,255,0.15)','rgba(181,84,10,0.2)')}`, boxShadow:`0 20px 60px -10px ${lm(light,'rgba(0,0,0,0.8)','rgba(100,60,10,0.2)')}` }}>
                <img src="https://i.ibb.co/ZpbHYXhH/1744384039162-1.png" alt="Kevekha Kevin Zehol"
                  className="w-full h-full object-cover object-top" style={{ borderRadius:'1.25rem', filter:light ? 'sepia(0.08)' : '' }} referrerPolicy="no-referrer" />
                <div className="absolute inset-0 pointer-events-none" style={{ background:cardBg, borderRadius:'1.25rem' }} />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[7px] uppercase tracking-[0.35em] font-semibold" style={{ fontFamily:'Poppins,sans-serif', color:ias }}>IAS · Nagaland</p>
                  <h3 className="text-base font-display uppercase mt-0.5" style={{ fontFamily:'Anton,sans-serif', color:whiteTxt }}>K.K. Zehol</h3>
                </div>
              </div>
              <div className="flip-card-back flex flex-col items-center justify-center p-5" style={{ borderRadius:'1.25rem', background:backBg, border:`1px solid ${backBorder}` }}>
                <Award size={22} style={{ color:accent }} className="mb-2" />
                <h3 className="font-display text-lg uppercase mb-1" style={{ fontFamily:'Anton,sans-serif', color:whiteTxt }}>K.K. Zehol</h3>
                <div className="h-[1px] w-8 mb-3" style={{ background:`linear-gradient(90deg,${accent},${accent2})` }} />
                <p className="text-[9px] text-center leading-relaxed" style={{ fontFamily:'Poppins,sans-serif', color:lm(light,'rgba(255,255,255,0.45)','rgba(60,40,15,0.55)') }}>
                  Chairman, NSSB<br/>34+ Years Civil Service<br/>Nagaland, India
                </p>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.55 }}
          className="flex items-center justify-center gap-5 mb-6"
        >
          {[{ val:`${count}+`, label:'Years' }, { val:'12+', label:'Districts' }, { val:'50K+', label:'Candidates' }].map((stat, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className="w-[1px] h-6 shrink-0" style={{ background:divider }} />}
              <div className="text-center">
                <p className="font-display text-xl animate-color-flow" style={{ fontFamily:'Anton,sans-serif' }}>{stat.val}</p>
                <p className="text-[7px] uppercase tracking-[0.25em] font-semibold mt-0.5" style={{ fontFamily:'Poppins,sans-serif', color:mutedText }}>{stat.label}</p>
              </div>
            </React.Fragment>
          ))}
        </motion.div>
        <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.7 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <motion.a whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }} href="#statesman" className="btn-premium">The Statesman</motion.a>
          <motion.a whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }} href="#artist" className="btn-premium">The Artist</motion.a>
        </motion.div>
      </div>
    </section>
  );
};

/* ===== STATESMAN ===== */
const Statesman = ({ onOpenSubPage }: { onOpenSubPage: (page: string) => void }) => {
  const { light } = useTheme();
  const revealTitle = useScrollReveal(0.1);
  const revealCards = useScrollReveal(0.08);
  const accent = lm(light,'rgba(0,210,255,0.5)','rgba(181,84,10,0.6)');

  const careerHighlights = [
    {
      id:"NSSB", year:"Current", title:"Chairman, NSSB",
      desc:"Leading the Nagaland Staff Selection Board with a focus on transparency and meritocracy.",
      colorClass:"premium-card-ruby", accentColor:lm(light,'rgba(255,77,77,0.6)','rgba(180,40,40,0.7)'),
      backBg:lm(light,'linear-gradient(135deg,rgba(80,0,0,0.98),rgba(40,0,0,0.98))','linear-gradient(135deg,rgba(250,230,225,0.99),rgba(240,215,208,0.99))'),
      backAccent:lm(light,'#FF4D4D','#c03030'),
      backStats:[['48,291','Applications/Year'],['112','Exam Centers'],['99.8%','Digital Accuracy']],
      backIcon:<BarChart2 size={28} />,
    },
    {
      id:"CivilService", year:"34 Years", title:"Civil Service Career",
      desc:"Distinguished service in the Nagaland Civil Service across various administrative roles.",
      colorClass:"premium-card-gold", accentColor:lm(light,'rgba(212,175,55,0.6)','rgba(154,122,16,0.7)'),
      backBg:lm(light,'linear-gradient(135deg,rgba(60,45,0,0.98),rgba(30,22,0,0.98))','linear-gradient(135deg,rgba(250,242,218,0.99),rgba(240,230,200,0.99))'),
      backAccent:lm(light,'#D4AF37','#9a7a10'),
      backStats:[['12+','Districts Served'],['34','Years Active'],['1990','Commissioned']],
      backIcon:<Globe size={28} />,
    },
    {
      id:"Legacy", year:"Legacy", title:"Administrative Excellence",
      desc:"Pioneering initiatives in governance and community development throughout the state.",
      colorClass:"premium-card-emerald", accentColor:lm(light,'rgba(0,200,83,0.6)','rgba(30,100,50,0.7)'),
      backBg:lm(light,'linear-gradient(135deg,rgba(0,50,20,0.98),rgba(0,30,12,0.98))','linear-gradient(135deg,rgba(218,245,228,0.99),rgba(205,235,215,0.99))'),
      backAccent:lm(light,'#00C853','#2a7a2a'),
      backStats:[['45','Schools Renovated'],['120km','Roads Built'],['5,000+','Youth Mentored']],
      backIcon:<Layers size={28} />,
    }
  ];

  const bg = lm(light,'#0d0d1a','#fdfbf7');
  const mutedText = lm(light,'rgba(255,255,255,0.3)','rgba(60,40,15,0.45)');
  const iconColor = lm(light,'rgba(255,255,255,0.7)','rgba(60,35,10,0.6)');
  const iconBg = lm(light,'rgba(255,255,255,0.06)','rgba(181,84,10,0.06)');
  const iconBorder = lm(light,'rgba(255,255,255,0.15)','rgba(181,84,10,0.2)');

  return (
    <section id="statesman" className="py-16 grid-bg" style={{ background:bg }}>
      <div className="max-w-7xl mx-auto px-6">
        <div ref={revealTitle} className="section-reveal flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}
            onClick={() => onOpenSubPage('Statesman')} className="cursor-none group"
          >
            <p className="text-[10px] uppercase tracking-[0.5em] font-semibold mb-4" style={{ fontFamily:'Poppins,sans-serif', color:accent }}>01 / Public Service</p>
            <h2 className="font-display text-5xl md:text-7xl tracking-normal uppercase mb-4 animate-bright-flow group-hover:scale-[1.01] transition-transform" style={{ fontFamily:'Anton,sans-serif' }}>
              Public Service Legacy
            </h2>
            <div className="h-[1px] w-24" style={{ background:lm(light,'linear-gradient(90deg,#00C853,#00D2FF,#BF5FFF)','linear-gradient(90deg,#2a7a2a,#b5540a,#7c3a8f)') }} />
          </motion.div>
          <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
            className="max-w-md uppercase tracking-[0.2em] text-xs font-semibold"
            style={{ fontFamily:'Poppins,sans-serif', color:mutedText }}
          >A 34-year journey of dedication, leadership, and service to the people of Nagaland.</motion.p>
        </div>

        <div ref={revealCards} className="section-reveal grid md:grid-cols-3 gap-5" style={{ transitionDelay:'0.15s' }}>
          {careerHighlights.map((item, idx) => (
            <motion.div key={idx}
              initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:idx*0.12 }}
              onClick={() => onOpenSubPage(item.id)}
              className="flip-card-container statesman-flip mx-auto w-full"
              style={{ aspectRatio:'1/1', maxWidth:'300px' }}
            >
              <div className="flip-card-inner statesman-flip">
                <div className={`flip-card-front statesman-front statesman-flip ${item.colorClass} p-5 flex flex-col`}>
                  <div className="absolute top-4 right-4 w-20 h-20 opacity-[0.03] rounded-full" style={{ border:'1px solid white' }} />
                  <div className="w-9 h-9 flex items-center justify-center mb-6 md:mb-8" style={{ border:`1px solid ${iconBorder}`, background:iconBg, borderRadius:'0.6rem' }}>
                    <Award size={15} style={{ color:iconColor }} />
                  </div>
                  <div className="relative z-10 space-y-2 mt-auto">
                    <span className="block font-display text-3xl md:text-4xl opacity-90 tracking-tighter" style={{ fontFamily:'Anton,sans-serif', color:lm(light,'white','#1a0e05'), textShadow:`0 0 30px ${item.accentColor}` }}>
                      {item.year}
                    </span>
                    <h3 className="text-sm md:text-base font-bold uppercase tracking-wider leading-tight" style={{ fontFamily:'Anton,sans-serif', color:lm(light,'white','#1a0e05') }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed font-light" style={{ fontFamily:'Poppins,sans-serif', color:lm(light,'rgba(255,255,255,0.65)','rgba(40,20,5,0.65)') }}>
                      {item.desc}
                    </p>
                  </div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 opacity-20" style={{ borderBottom:`1px solid ${lm(light,'white','#3a1a05')}`, borderRight:`1px solid ${lm(light,'white','#3a1a05')}`, borderRadius:'0 0 0.4rem 0' }} />
                </div>
                <div className="flip-card-back statesman-flip flex flex-col items-center justify-center p-5" style={{ background:item.backBg, border:`1px solid ${item.backAccent}30`, boxShadow:`inset 0 0 60px ${item.backAccent}10` }}>
                  <div className="w-10 h-10 flex items-center justify-center mb-3" style={{ border:`1px solid ${item.backAccent}40`, borderRadius:'0.75rem', background:`${item.backAccent}15`, color:item.backAccent }}>
                    {React.cloneElement(item.backIcon as React.ReactElement, { size: 20 })}
                  </div>
                  <h4 className="font-display text-lg uppercase mb-3 text-center" style={{ fontFamily:'Anton,sans-serif', color:lm(light,'white','#1a0e05') }}>{item.title}</h4>
                  <div className="h-[1px] w-8 mb-3" style={{ background:`linear-gradient(90deg,transparent,${item.backAccent},transparent)` }} />
                  <div className="grid grid-cols-3 gap-2 w-full">
                    {item.backStats.map(([v,l],i) => (
                      <div key={i} className="text-center">
                        <p className="text-base font-bold" style={{ fontFamily:'Anton,sans-serif', color:item.backAccent }}>{v}</p>
                        <p className="text-[7px] uppercase tracking-wide font-semibold mt-0.5" style={{ fontFamily:'Poppins,sans-serif', color:lm(light,'rgba(255,255,255,0.35)','rgba(60,30,5,0.45)') }}>{l}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.3em] font-semibold mt-4" style={{ fontFamily:'Poppins,sans-serif', color:`${item.backAccent}80` }}>Click to explore →</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ===== IMPACT ===== */
const ImpactSection = ({ onOpenSubPage }: { onOpenSubPage: (page: string) => void }) => {
  const { light } = useTheme();
  const revealGrid = useScrollReveal(0.08);
  const bg = lm(light,'#0d0d1a','#fdfbf7');
  const backBg = lm(light,'linear-gradient(135deg,rgba(0,15,30,0.98),rgba(0,5,15,0.98))','linear-gradient(135deg,rgba(250,247,242,0.99),rgba(240,233,220,0.99))');
  const backBorder = lm(light,'rgba(0,210,255,0.2)','rgba(181,84,10,0.22)');
  const accent = lm(light,'rgba(0,210,255,0.5)','rgba(181,84,10,0.55)');
  const cards = [
    {
      id:'GovernanceImpact', src:"https://i.ibb.co/mC6FZzyT/Independence-Day-India-Proud-To-Be-Indian-Tiranga-Love-India-At77-Vande-Mataram.jpg",
      title:"Governance", sub:"Nagaland Staff Selection Board",
      backTitle:"NSSB Leadership", backDesc:"Pioneering digital-first recruitment across 112 exam centers statewide.", backStat:"48,291", backStatLabel:"Annual Applications"
    },
    {
      id:'ServiceImpact', src:"https://i.ibb.co/S77fDhPh/Finding-India-s-lost-musicians-1.jpg",
      title:"34+", sub:"Years of Service",
      backTitle:"Civil Service", backDesc:"From frontier postings to state secretariat — a 34-year journey of principled leadership.", backStat:"12+", backStatLabel:"Districts Served"
    },
    {
      id:'StatewideImpact', src:"https://i.ibb.co/1tcxQGkM/Voices-in-the-Divide-1.jpg",
      title:"Impact", sub:"State-wide Legacy",
      backTitle:"State Legacy", backDesc:"Infrastructure, education, and cultural preservation across all districts of Nagaland.", backStat:"5,000+", backStatLabel:"Youth Mentored"
    },
  ];
  return (
    <section className="py-6" style={{ background:bg }}>
      <div className="max-w-7xl mx-auto px-6">
        <div ref={revealGrid} className="section-reveal grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <motion.div key={card.id}
              initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
              onClick={() => onOpenSubPage(card.id)}
              className="flip-card-container impact-flip mx-auto w-full"
              style={{ aspectRatio:'1/1', maxWidth:'300px' }}
            >
              <div className="flip-card-inner impact-flip">
                <div className="flip-card-front impact-flip flex flex-col justify-end overflow-hidden" style={{ border:`1px solid ${lm(light,'rgba(0,210,255,0.08)','rgba(181,84,10,0.12)')}` }}>
                  <img src={card.src} className="absolute inset-0 w-full h-full object-cover" style={{ filter:'grayscale(0.2)' }} alt={card.title} referrerPolicy="no-referrer" />
                  <div className="absolute inset-0" style={{ background:'linear-gradient(to top, rgba(10,10,20,0.82) 0%, rgba(10,10,20,0.2) 60%, transparent 100%)' }} />
                  <div className="relative z-10 p-6">
                    <h4 className="impact-text-title text-2xl md:text-3xl drop-shadow-2xl">{card.title}</h4>
                    <p className="impact-text-sub text-[10px] md:text-xs uppercase tracking-widest font-semibold mt-1">{card.sub}</p>
                  </div>
                </div>
                <div className="flip-card-back impact-flip flex flex-col items-center justify-center p-5" style={{ background:backBg, border:`1px solid ${backBorder}`, boxShadow:`inset 0 0 60px ${lm(light,'rgba(0,210,255,0.04)','rgba(181,84,10,0.04)')}` }}>
                  <Star size={20} style={{ color:accent }} className="mb-3" />
                  <h4 className="font-display text-lg uppercase mb-2 text-center" style={{ fontFamily:'Anton,sans-serif', color:lm(light,'white','#1a0e05') }}>{card.backTitle}</h4>
                  <div className="h-[1px] w-10 mb-3" style={{ background:`linear-gradient(90deg,transparent,${lm(light,'#00D2FF','#b5540a')},transparent)` }} />
                  <p className="text-[10px] text-center leading-relaxed mb-4" style={{ fontFamily:'Poppins,sans-serif', color:lm(light,'rgba(255,255,255,0.45)','rgba(60,40,15,0.55)') }}>{card.backDesc}</p>
                  <div className="text-center">
                    <p className="font-display text-3xl animate-color-flow" style={{ fontFamily:'Anton,sans-serif' }}>{card.backStat}</p>
                    <p className="text-[8px] uppercase tracking-widest font-semibold mt-1" style={{ fontFamily:'Poppins,sans-serif', color:lm(light,'rgba(255,255,255,0.3)','rgba(60,40,15,0.35)') }}>{card.backStatLabel}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ===== ARTIST ===== */
const Artist = ({ onOpenSubPage }: { onOpenSubPage: () => void }) => {
  const { light } = useTheme();
  const revealHeader = useScrollReveal(0.1);
  const revealVideos = useScrollReveal(0.05);
  const revealBottom = useScrollReveal(0.1);
  const bg = lm(light,'#0a0a18','#faf8f3');
  const accent = lm(light,'rgba(191,95,255,0.6)','rgba(124,58,143,0.65)');
  const accentSolid = lm(light,'rgba(191,95,255,0.5)','rgba(124,58,143,0.5)');
  const sectionBg = lm(light,'rgba(255,255,255,0.02)','rgba(255,248,235,0.6)');
  const sectionBorder = lm(light,'rgba(0,210,255,0.08)','rgba(181,84,10,0.12)');
  const h3color = lm(light,'rgba(255,255,255,0.7)','rgba(60,40,15,0.7)');
  const mutedText = lm(light,'rgba(255,255,255,0.45)','rgba(60,40,15,0.5)');
  const videoBackBg = lm(light,'linear-gradient(135deg,rgba(20,0,40,0.98),rgba(10,0,20,0.98))','linear-gradient(135deg,rgba(238,228,248,0.99),rgba(225,210,240,0.99))');
  const videoBackBorder = lm(light,'rgba(191,95,255,0.25)','rgba(124,58,143,0.25)');
  const videoBackInner = lm(light,'inset 0 0 40px rgba(191,95,255,0.06)','inset 0 0 40px rgba(124,58,143,0.04)');
  const musicIcon = lm(light,'rgba(191,95,255,0.6)','rgba(124,58,143,0.65)');
  const musicText = lm(light,'rgba(191,95,255,0.5)','rgba(124,58,143,0.55)');
  const whiteText = lm(light,'white','#1a0e05');
  const divider = lm(light,'rgba(255,255,255,0.05)','rgba(160,100,30,0.1)');
  const ytBorder = lm(light,'rgba(191,95,255,0.15)','rgba(124,58,143,0.18)');
  const videoTitle = lm(light,'rgba(255,255,255,0.65)','rgba(60,40,15,0.65)');
  const videoSub = lm(light,'rgba(255,255,255,0.2)','rgba(60,40,15,0.3)');

  const videos = [
    { id:"5jYEaV_MSQQ", title:"Mapo Evie (Official Music Video)" },
    { id:"BFj3Bhra20E", title:"In His Grace (Live Recording)" },
    { id:"JNy5FXkFtbU", title:"Naga Spirit (Acoustic Version)" },
    { id:"Co2dRpBgKzo", title:"Traditional Naga Melodies" },
    { id:"-TiqVIbhvFY", title:"Cultural Anthem of the Hills" },
    { id:"6Ysghdn7kHU", title:"Gospel Session: Faith & Grace" },
    { id:"ee_0S0gklt8", title:"Echoes of the Mountains" },
    { id:"oBoUbrD7O-A", title:"A Tribute to the Ancestors" }
  ];

  return (
    <section id="artist" className="py-16 grid-bg" style={{ background:bg }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div ref={revealHeader} initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="section-reveal text-center mb-16 cursor-none group" onClick={onOpenSubPage}
        >
          <div className="inline-flex items-center space-x-3 mb-4" style={{ color:accent }}>
            <Music size={16} />
            <span className="uppercase tracking-[0.4em] text-xs font-semibold" style={{ fontFamily:'Poppins,sans-serif' }}>02 / Musical Journey</span>
          </div>
          <h2 className="font-display text-6xl md:text-8xl tracking-tighter uppercase mb-4 animate-color-flow group-hover:scale-[1.01] transition-transform" style={{ fontFamily:'Anton,sans-serif' }}>
            The Artist
          </h2>
          <div className="h-[1px] w-16 mx-auto" style={{ background:accentSolid }} />
        </motion.div>

        <div className="mb-20">
          <div className="flex items-center justify-between mb-10">
            <h3 className="font-display text-3xl uppercase tracking-tighter" style={{ fontFamily:'Anton,sans-serif', color:h3color }}>Featured Performances</h3>
            <div className="h-[1px] flex-grow mx-6 hidden md:block" style={{ background:divider }} />
            <motion.a whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
              href="https://www.youtube.com/@kevekhakevinzehol9688" target="_blank" rel="noopener noreferrer"
              className="btn-premium-sm whitespace-nowrap"
            ><span className="mr-2">View All</span><ChevronRight size={12} /></motion.a>
          </div>

          <div ref={revealVideos} className="section-reveal grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
            {videos.map((video, idx) => (
              <motion.div key={idx}
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:idx*0.07 }}
                className="flex flex-col"
              >
                <div className="flip-card-container video-flip mb-3" style={{ aspectRatio:'16/9' }}>
                  <div className="flip-card-inner video-flip">
                    <div className="flip-card-front video-flip" style={{ border:`1px solid ${lm(light,'rgba(255,255,255,0.06)','rgba(160,100,30,0.12)')}`, boxShadow:`0 20px 60px -15px ${lm(light,'rgba(0,0,0,0.6)','rgba(100,60,10,0.15)')}` }}>
                      <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${video.id}`} title={video.title}
                        frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen
                        style={{ borderRadius:'1rem' }}
                      />
                    </div>
                    <div className="flip-card-back video-flip flex flex-col items-center justify-center p-6" style={{ background:videoBackBg, border:`1px solid ${videoBackBorder}`, boxShadow:videoBackInner }}>
                      <Music size={22} style={{ color:musicIcon }} className="mb-4" />
                      <h4 className="font-display text-base uppercase text-center mb-3" style={{ fontFamily:'Anton,sans-serif', color:whiteText }}>{video.title}</h4>
                      <div className="h-[1px] w-10 mb-4" style={{ background:`linear-gradient(90deg,transparent,${lm(light,'rgba(191,95,255,0.6)','rgba(124,58,143,0.6)')},transparent)` }} />
                      <p className="text-[10px] uppercase tracking-widest font-semibold" style={{ fontFamily:'Poppins,sans-serif', color:musicText }}>Kevekha Kevin Zehol</p>
                      <motion.a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer"
                        className="mt-4 flex items-center space-x-2 text-[9px] uppercase tracking-widest font-bold transition-colors"
                        style={{ color:lm(light,'rgba(255,255,255,0.4)','rgba(60,40,15,0.4)'), fontFamily:'Poppins,sans-serif' }}
                        whileHover={{ color:lm(light,'#BF5FFF','#7c3a8f') }}
                      >
                        <Youtube size={12} /><span>Watch on YouTube</span>
                      </motion.a>
                    </div>
                  </div>
                </div>
                <div className="px-1">
                  <h4 className="font-display text-base uppercase tracking-tight mb-1" style={{ fontFamily:'Anton,sans-serif', color:videoTitle }}>{video.title}</h4>
                  <div className="flex items-center space-x-2 text-[9px] uppercase tracking-widest font-semibold" style={{ fontFamily:'Poppins,sans-serif', color:videoSub }}>
                    <Music size={9} /><span>Kevekha Kevin Zehol</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div ref={revealBottom} initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="section-reveal p-10 flex flex-col lg:flex-row items-center gap-10"
          style={{ background:sectionBg, border:`1px solid ${sectionBorder}`, borderRadius:'1.5rem' }}
        >
          <div className="lg:w-3/5">
            <h3 className="font-display text-4xl uppercase mb-5 leading-none" style={{ fontFamily:'Anton,sans-serif', color:h3color }}>A Voice for the <br/><span style={{ color:lm(light,'#00D2FF','#b5540a') }}>Naga Spirit</span></h3>
            <p className="mb-7 leading-relaxed text-sm font-light" style={{ fontFamily:'Poppins,sans-serif', color:mutedText }}>
              Kevin's music blends traditional Naga sensibilities with contemporary sounds, creating a unique sonic landscape that resonates across generations. His albums "Mapo Evie" and "In His Grace" have become staples in the local music scene.
            </p>
            <motion.a href="https://www.youtube.com/@kevekhakevinzehol9688" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
              className="btn-premium-sm group w-fit mx-auto lg:mx-0 whitespace-nowrap"
            >
              <span>Listen on YouTube</span>
              <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform ml-2" />
            </motion.a>
          </div>
          <div className="lg:w-2/5 w-full aspect-video overflow-hidden relative group"
            style={{ border:`1px solid ${ytBorder}`, borderRadius:'1.25rem', boxShadow:`0 40px 80px -20px ${lm(light,'rgba(0,0,0,0.8)','rgba(100,60,10,0.2)')}` }}
          >
            <img src="https://img.youtube.com/vi/JNy5FXkFtbU/maxresdefault.jpg" alt="Naga Spirit"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              style={{ filter:'grayscale(0.3)' }} referrerPolicy="no-referrer"
              onError={(e) => { (e.target as HTMLImageElement).src = "https://img.youtube.com/vi/JNy5FXkFtbU/hqdefault.jpg"; }}
            />
            <div className="absolute inset-0 group-hover:bg-[#050508]/60 transition-colors" style={{ background:'rgba(5,5,8,0.4)', borderRadius:'1.25rem' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div whileHover={{ scale:1.15 }} className="w-14 h-14 flex items-center justify-center" style={{ background:'rgba(220,38,38,0.9)', borderRadius:'50%', boxShadow:'0 0 40px rgba(220,38,38,0.5)' }}>
                <Youtube style={{ color:'white' }} size={26} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ===== AUTHOR ===== */
const Author = ({ onOpenSubPage }: { onOpenSubPage: () => void }) => {
  const { light } = useTheme();
  const revealContent = useScrollReveal(0.1);
  const bg = lm(light,'#0d0d1a','#faf8f3');
  const accentGold = lm(light,'rgba(212,175,55,0.6)','rgba(154,122,16,0.65)');
  const accentGoldSolid = lm(light,'#D4AF37','#9a7a10');
  const bookBorder = lm(light,'rgba(212,175,55,0.2)','rgba(154,122,16,0.25)');
  const bookShadow = lm(light,'0 40px 80px -20px rgba(212,175,55,0.15)','0 40px 80px -20px rgba(154,122,16,0.12)');
  const bookBackBg = lm(light,'linear-gradient(135deg,rgba(40,30,0,0.98),rgba(20,15,0,0.98))','linear-gradient(135deg,rgba(250,242,218,0.99),rgba(240,228,200,0.99))');
  const mutedText = lm(light,'rgba(255,255,255,0.35)','rgba(60,40,15,0.5)');
  const whiteTxt = lm(light,'rgba(255,255,255,0.8)','rgba(40,25,5,0.85)');
  const divider = lm(light,'rgba(255,255,255,0.08)','rgba(160,100,30,0.15)');
  const glowBg = lm(light,'rgba(212,175,55,0.05)','rgba(154,122,16,0.06)');

  return (
    <section id="author" className="py-16 overflow-hidden" style={{ background:bg }}>
      <div ref={revealContent} className="section-reveal max-w-4xl mx-auto px-6 text-center">
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          className="inline-flex items-center space-x-2 mb-8 cursor-none group" onClick={onOpenSubPage}
          style={{ color:accentGold }}
        >
          <BookOpen size={16} />
          <span className="uppercase tracking-[0.4em] text-xs font-semibold group-hover:text-[#D4AF37] transition-colors" style={{ fontFamily:'Poppins,sans-serif' }}>03 / Literary Works</span>
        </motion.div>
        <motion.h2 initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          className="font-display text-6xl md:text-8xl tracking-tighter uppercase mb-12 leading-[1.0] cursor-none animate-yellow-flow"
          style={{ fontFamily:'Anton,sans-serif' }} onClick={onOpenSubPage}
        >The <br />Author</motion.h2>

        <motion.div initial={{ opacity:0, scale:0.9 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} className="relative mb-14 flex justify-center">
          <div className="flip-card-container w-full max-w-[240px]" style={{ aspectRatio:'1/1', borderRadius:'1.5rem' }}>
            <div className="flip-card-inner" style={{ borderRadius:'1.5rem' }}>
              <div className="flip-card-front" style={{ borderRadius:'1.5rem', border:`1px solid ${bookBorder}`, boxShadow:bookShadow }}>
                <img src="https://i.ibb.co/rG8Kxwq6/71-XPqw-TRzs-L-AC-UF1000-1000-QL80.jpg" alt="Your Time Will Come"
                  className="w-full h-full object-cover" style={{ filter:'contrast(1.05)', borderRadius:'1.5rem' }} referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0" style={{ background:'rgba(10,10,20,0)', borderRadius:'1.5rem' }} />
              </div>
              <div className="flip-card-back flex flex-col items-center justify-center p-8" style={{ borderRadius:'1.5rem', background:bookBackBg, border:`1px solid ${bookBorder}`, boxShadow:`inset 0 0 60px ${lm(light,'rgba(212,175,55,0.05)','rgba(154,122,16,0.06)')}` }}>
                <BookOpen size={26} style={{ color:accentGold }} className="mb-4" />
                <h3 className="font-display text-lg uppercase text-center mb-2" style={{ fontFamily:'Anton,sans-serif', color:lm(light,'white','#1a0e05') }}>"Your Time Will Come"</h3>
                <div className="h-[1px] w-12 mb-4" style={{ background:`linear-gradient(90deg,transparent,${accentGoldSolid},transparent)` }} />
                <p className="text-[10px] text-center leading-relaxed mb-5" style={{ fontFamily:'Poppins,sans-serif', color:lm(light,'rgba(255,255,255,0.45)','rgba(60,40,15,0.55)') }}>
                  A compelling narrative on resilience, destiny, and the power of patience.
                </p>
                <div className="flex items-center space-x-4 text-center">
                  <div><p className="text-xl font-bold" style={{ fontFamily:'Anton,sans-serif', color:accentGoldSolid }}>200+</p><p className="text-[8px] uppercase font-semibold" style={{ fontFamily:'Poppins,sans-serif', color:lm(light,'rgba(255,255,255,0.3)','rgba(60,40,15,0.35)') }}>Pages</p></div>
                  <div className="h-8 w-[1px]" style={{ background:lm(light,'rgba(255,255,255,0.1)','rgba(160,100,30,0.2)') }} />
                  <div><p className="text-xl font-bold" style={{ fontFamily:'Anton,sans-serif', color:accentGoldSolid }}>2023</p><p className="text-[8px] uppercase font-semibold" style={{ fontFamily:'Poppins,sans-serif', color:lm(light,'rgba(255,255,255,0.3)','rgba(60,40,15,0.35)') }}>Published</p></div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full -z-10 animate-pulse" style={{ background:glowBg, filter:'blur(60px)' }} />
        </motion.div>

        <motion.h3 initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          className="text-2xl font-bold mb-5" style={{ fontFamily:'Poppins,sans-serif', color:whiteTxt }}
        >"Your Time Will Come"</motion.h3>
        <motion.p initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:0.1 }}
          className="text-base leading-relaxed mb-10 max-w-2xl mx-auto font-light"
          style={{ fontFamily:'Poppins,sans-serif', color:mutedText }}
        >
          A compelling narrative that explores resilience, destiny, and the power of patience. A work that inspires readers to embrace their journey and trust in the timing of their lives.
        </motion.p>
        <div className="flex items-center justify-center space-x-12 mb-10">
          {[['200+','Pages'],['1st','Edition']].map((s,i) => (
            <React.Fragment key={i}>
              {i>0 && <div className="h-10 w-[1px]" style={{ background:divider }} />}
              <div className="flex flex-col">
                <span className="text-4xl font-display animate-yellow-flow" style={{ fontFamily:'Anton,sans-serif' }}>{s[0]}</span>
                <span className="text-[9px] uppercase tracking-widest font-semibold mt-1" style={{ fontFamily:'Poppins,sans-serif', color:mutedText }}>{s[1]}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
        <motion.button whileHover={{ scale:1.03, y:-2 }} whileTap={{ scale:0.98 }} onClick={onOpenSubPage} className="btn-premium mx-auto">
          <span>View Publications</span>
          <ExternalLink size={14} className="ml-3" />
        </motion.button>
      </div>
    </section>
  );
};

/* ===== FOOTER ===== */
const Footer = () => {
  const { light } = useTheme();
  const bg = lm(light,'#080812','#f5f1e8');
  const border = lm(light,'rgba(0,210,255,0.06)','rgba(160,100,30,0.18)');
  const accentColor = lm(light,'#00D2FF','#b5540a');
  const accent2 = lm(light,'rgba(0,210,255,0.4)','rgba(181,84,10,0.75)');
  const bodyText = lm(light,'rgba(255,255,255,0.25)','rgba(35,18,5,0.8)');
  const iconBorder = lm(light,'rgba(255,255,255,0.08)','rgba(160,100,30,0.3)');
  const iconColor = lm(light,'rgba(255,255,255,0.3)','rgba(50,28,8,0.7)');
  const ytBorder = lm(light,'rgba(239,68,68,0.3)','rgba(180,40,40,0.45)');
  const ytColor = lm(light,'rgba(239,68,68,0.7)','rgba(180,40,40,0.85)');
  const linkColor = lm(light,'rgba(255,255,255,0.25)','rgba(35,18,5,0.65)');
  const hoverColor = lm(light,'#00D2FF','#b5540a');
  const mailColor = lm(light,'rgba(0,210,255,0.4)','rgba(181,84,10,0.65)');
  const botBorder = lm(light,'rgba(255,255,255,0.04)','rgba(160,100,30,0.18)');
  const botText = lm(light,'rgba(255,255,255,0.15)','rgba(35,18,5,0.55)');
  const nitiColor = lm(light,'rgba(255,255,255,0.18)','rgba(181,84,10,0.6)');

  return (
    <footer className="py-12" style={{ background:bg, borderTop:`1px solid ${border}` }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div className="lg:col-span-2">
            <h2 className="font-display text-4xl tracking-tighter uppercase mb-4" style={{ fontFamily:'Anton,sans-serif', color:accentColor }}>K.K. ZEHOL</h2>
            <p className="max-w-sm leading-relaxed mb-7 text-sm font-light" style={{ fontFamily:'Poppins,sans-serif', color:bodyText }}>
              A life of service, a soul of music, and a mind for literature. Dedicated to the progress and culture of Nagaland.
            </p>
            <div className="flex items-center space-x-3">
              {[Instagram,Twitter,Linkedin].map((Icon,i) => (
                <motion.a key={i} whileHover={{ y:-3 }} whileTap={{ scale:0.9 }} href="#"
                  className="w-9 h-9 flex items-center justify-center transition-all"
                  style={{ border:`1px solid ${iconBorder}`, color:iconColor, borderRadius:'0.625rem' }}
                ><Icon size={15} /></motion.a>
              ))}
              <motion.a whileHover={{ y:-3 }} whileTap={{ scale:0.9 }} href="https://www.youtube.com/@kevekhakevinzehol9688" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center transition-all"
                style={{ border:`1px solid ${ytBorder}`, color:ytColor, borderRadius:'0.625rem' }}
              ><Youtube size={14} /></motion.a>
            </div>
          </div>
          <div>
            <h4 className="uppercase tracking-widest text-[9px] font-bold mb-6" style={{ fontFamily:'Poppins,sans-serif', color:accent2 }}>Quick Links</h4>
            <ul className="space-y-3 text-xs font-light" style={{ fontFamily:'Poppins,sans-serif', color:linkColor }}>
              {['Home','The Statesman','The Artist','The Author'].map((l,i) => (
                <li key={i}><a href={`#${l==='Home'?'home':l.toLowerCase().replace('the ','')}`} className="transition-colors" style={{}} onMouseEnter={e=>(e.target as HTMLElement).style.color=hoverColor} onMouseLeave={e=>(e.target as HTMLElement).style.color=linkColor}>{l}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="uppercase tracking-widest text-[9px] font-bold mb-6" style={{ fontFamily:'Poppins,sans-serif', color:accent2 }}>Contact</h4>
            <ul className="space-y-4 text-xs font-light" style={{ fontFamily:'Poppins,sans-serif', color:linkColor }}>
              <li className="flex items-center space-x-3"><Mail size={14} style={{ color:mailColor }} /><span>contact@kkzehol.com</span></li>
              <li className="flex items-start space-x-3"><Award size={14} style={{ color:mailColor, marginTop:1 }} /><span>NSSB Office, Kohima, Nagaland</span></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop:`1px solid ${botBorder}`, fontFamily:'Poppins,sans-serif' }}
        >
          <p className="text-[9px] uppercase tracking-[0.3em] font-semibold" style={{ color:botText }}>© 2024 Kevekha Kevin Zehol. All Rights Reserved.</p>
          <div className="flex flex-col items-center gap-0.5">
            <p className="text-[8px] uppercase tracking-[0.25em] font-semibold" style={{ color:nitiColor }}>Developed By</p>
            <p className="text-[10px] uppercase tracking-[0.3em] font-bold" style={{ color:nitiColor, letterSpacing:'0.18em' }}>NITI Technologies</p>
          </div>
          <p className="text-[9px] uppercase tracking-[0.3em] font-semibold" style={{ color:botText }}>Crafted with Excellence</p>
        </div>
      </div>
    </footer>
  );
};

/* ===== SUB-PAGE DATA ===== */
const SubPageContent = ({ page, light }: { page: string, light: boolean }) => {
  const accent = lm(light,'rgba(0,210,255,0.5)','rgba(181,84,10,0.6)');
  const accentGold = lm(light,'rgba(212,175,55,0.6)','rgba(154,122,16,0.65)');
  const accentPurple = lm(light,'rgba(191,95,255,0.2)','rgba(124,58,143,0.2)');
  const headingColor = lm(light,'rgba(255,255,255,0.9)','rgba(40,25,5,0.9)');
  const headingBorder = lm(light,'rgba(0,210,255,0.15)','rgba(181,84,10,0.18)');
  const bodyText = lm(light,'rgba(255,255,255,0.7)','rgba(60,40,15,0.65)');
  const statSky = lm(light,'#00D2FF','#b5540a');
  const greenColor = lm(light,'rgba(0,200,83,0.8)','rgba(30,120,50,0.85)');

  const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <section>
      <h3 className="text-lg font-bold mb-5 uppercase tracking-wider pb-2"
        style={{ fontFamily:'Anton,sans-serif', color:headingColor, borderBottom:`1px solid ${headingBorder}` }}>{title}</h3>
      {children}
    </section>
  );

  if (page === 'About') return (
    <div className="space-y-14 text-sm" style={{ fontFamily:'Poppins,sans-serif', color:bodyText }}>
      <Section title="01. Personal Profile">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[['Full Name','Kevekha Kevin Zehol'],['Nationality','Indian'],['State of Origin','Nagaland'],['Primary Vocations','Administration, Music, Literature']].map(([k,v],i) => (
            <div key={i} className="p-4 data-card"><p className="text-[9px] uppercase tracking-widest font-semibold mb-1" style={{ color:accent }}>{k}</p><p className="font-semibold text-xs" style={{ color:headingColor }}>{v}</p></div>
          ))}
        </div>
      </Section>
      <Section title="02. Career Timeline">
        <div className="space-y-0">
          {[["1990","Entry into Nagaland Civil Service (NCS)","Kohima"],["1995","Sub-Divisional Officer (SDO) Postings","Various Districts"],["2000","Under Secretary to the Government","Secretariat"],["2005","Deputy Secretary Level Appointments","Secretariat"],["2010","Joint Secretary, Home Department","Kohima"],["2012","Additional Secretary to the Government","Kohima"],["2015","Commissioner & Secretary, Municipal Affairs","Kohima"],["2018","Secretary, Dept. of Personnel & Admin Reforms","Kohima"],["2022","Appointment as Chairman, NSSB","Kohima"]].map(([yr,ev,loc],i) => (
            <div key={i} className="flex items-center py-3 px-4 data-card mb-1">
              <span className="w-16 font-bold text-xs shrink-0" style={{ color:statSky }}>{yr}</span>
              <span className="flex-grow text-xs" style={{ color:bodyText }}>{ev}</span>
              <span className="text-[9px] uppercase font-semibold shrink-0" style={{ color:lm(light,'rgba(255,255,255,0.25)','rgba(60,40,15,0.3)') }}>{loc}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="03. Impact Metrics">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[['34+','Years of Service'],['12+','Districts Served'],['50k+','Candidates Processed'],['100%','Merit Integrity']].map(([v,l],i) => (
            <div key={i} className="text-center p-7 data-card"><p className="text-3xl font-bold mb-1" style={{ fontFamily:'Anton,sans-serif', color:statSky }}>{v}</p><p className="text-[9px] uppercase font-semibold tracking-widest" style={{ color:lm(light,'rgba(255,255,255,0.3)','rgba(60,40,15,0.35)') }}>{l}</p></div>
          ))}
        </div>
      </Section>
      <Section title="04. Language Proficiency">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[['English','Native/Professional',100],['Nagamese','Native/Fluent',100],['Hindi','Professional',85],['Chakhesang (Tenyi)','Native',100],['Ao','Conversational',60],['Sumi','Conversational',55]].map(([lang,level,score],i) => (
            <div key={i} className="p-4 data-card">
              <div className="flex justify-between mb-1.5"><span className="font-bold text-xs" style={{ color:headingColor }}>{lang}</span><span className="text-[9px]" style={{ color:lm(light,'rgba(255,255,255,0.3)','rgba(60,40,15,0.35)') }}>{score}%</span></div>
              <div className="h-0.5 bg-white/10 w-full rounded-full" style={{ background:lm(light,'rgba(255,255,255,0.1)','rgba(160,100,30,0.15)') }}><div className="h-full rounded-full transition-all" style={{ width:`${score}%`, background:lm(light,'rgba(0,210,255,0.6)','rgba(181,84,10,0.6)') }} /></div>
              <p className="text-[8px] uppercase mt-1 font-semibold" style={{ color:lm(light,'rgba(255,255,255,0.25)','rgba(60,40,15,0.3)') }}>{level}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );

  if (page === 'Statesman') return (
    <div className="space-y-14 text-sm" style={{ fontFamily:'Poppins,sans-serif', color:bodyText }}>
      <Section title="01. Examination Statistics">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead><tr style={{ borderBottom:`1px solid ${headingBorder}` }}>
              {['Metric','Current Value','Variance','Target'].map((h,i) => <th key={i} className="py-3 px-4 text-[9px] uppercase tracking-widest font-bold" style={{ color:accent }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {[['Applications Received','48,291','+12.4%','55,000'],['Exam Centers','112','+5.0%','125'],['Staff Deployed','1,450','+8.2%','1,600'],['Digital Verification','99.8%','+1.5%','100%'],['Attendance Rate','88.5%','+2.1%','92.0%']].map((row,i) => (
                <tr key={i} className="data-card mb-1" style={{ borderBottom:`1px solid ${lm(light,'rgba(255,255,255,0.04)','rgba(160,100,30,0.08)')}` }}>
                  <td className="py-3 px-4 text-xs" style={{ color:bodyText }}>{row[0]}</td>
                  <td className="py-3 px-4 font-bold text-xs" style={{ color:headingColor }}>{row[1]}</td>
                  <td className="py-3 px-4 text-xs font-semibold" style={{ color:greenColor }}>{row[2]}</td>
                  <td className="py-3 px-4 text-xs" style={{ color:lm(light,'rgba(255,255,255,0.25)','rgba(60,40,15,0.3)') }}>{row[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
      <Section title="02. Policy Framework">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[['Transparency Protocol 2.0','End-to-end encrypted question paper distribution. Zero-manual-intervention scoring.',lm(light,'rgba(0,210,255,0.5)','rgba(181,84,10,0.65)')],['Merit-Based Selection','Standardized evaluation criteria across all departmental requirements.',lm(light,'rgba(212,175,55,0.5)','rgba(154,122,16,0.65)')],['Digital Governance','Paperless environment with Aadhaar-based biometric verification.',lm(light,'rgba(0,200,83,0.5)','rgba(30,120,50,0.65)')],['Integrity Monitoring','High-security monitoring to track and mitigate examination breaches.',lm(light,'rgba(255,77,77,0.5)','rgba(180,40,40,0.65)')]].map(([t,d,c],i) => (
            <div key={i} className="p-5 data-card" style={{ borderLeft:`2px solid ${c}` }}>
              <p className="font-bold uppercase text-[10px] mb-2" style={{ color:c as string }}>{t}</p>
              <p className="text-xs leading-relaxed" style={{ color:bodyText }}>{d}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="03. Reform Milestones">
        <div className="space-y-2">
          {[['Phase I','NSSB Secretariat Establishment','Completed'],['Phase II','Digital Portal Launch','Completed'],['Phase III','SOP Finalization','Completed'],['Phase IV','First Recruitment Cycle','Completed'],['Phase V','AI-Driven Evaluation Pilot','In Progress']].map(([p,m,s],i) => (
            <div key={i} className="flex justify-between items-center p-4 data-card">
              <span className="font-bold text-xs" style={{ color:lm(light,'rgba(255,255,255,0.25)','rgba(60,40,15,0.3)') }}>{p}</span>
              <span className="flex-grow px-6 text-xs" style={{ color:bodyText }}>{m}</span>
              <span className="text-[9px] font-bold uppercase px-2 py-1 rounded-full" style={{ background:s==='Completed'?lm(light,'rgba(0,200,83,0.1)','rgba(30,120,50,0.1)'):lm(light,'rgba(0,210,255,0.1)','rgba(181,84,10,0.1)'), color:s==='Completed'?greenColor:lm(light,'rgba(0,210,255,0.8)','rgba(181,84,10,0.85)') }}>{s}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );

  if (page === 'Artist') return (
    <div className="space-y-14 text-sm" style={{ fontFamily:'Poppins,sans-serif', color:bodyText }}>
      <Section title="01. Album Discography">
        <div className="grid md:grid-cols-2 gap-5">
          {[{color:lm(light,'rgba(0,210,255,0.5)','rgba(181,84,10,0.65)'),tag:'Studio Album',name:'MAPO EVIE',year:'2015 • 10 Tracks',tracks:[['01. Mapo Evie','4:22'],['02. Hills of Home','3:45'],['03. Ancestral Echoes','5:10'],['04. Midnight Prayer','4:05'],['05. Spirit of the Naga','4:55'],['06. Mountain Breeze','3:30']]},{color:lm(light,'rgba(212,175,55,0.5)','rgba(154,122,16,0.65)'),tag:'Gospel Album',name:'IN HIS GRACE',year:'2019 • 12 Tracks',tracks:[['01. Grace Abounding','4:50'],['02. Faith in the Valley','3:55'],['03. Eternal Light','4:30'],['04. Worship Medley','6:15'],["05. The Shepherd's Call",'4:10'],['06. Peace Like a River','5:05']]}].map((album,i) => (
            <div key={i} className="p-6 data-card relative overflow-hidden" style={{ borderLeft:`2px solid ${album.color}` }}>
              <div className="absolute top-0 right-0 px-2 py-1 text-[8px] font-black uppercase text-white" style={{ background:album.color as string, borderRadius:'0 1rem 0 0.5rem' }}>{album.tag}</div>
              <p className="font-bold text-xl mb-1" style={{ fontFamily:'Anton,sans-serif', color:album.color as string }}>{album.name}</p>
              <p className="text-xs mb-4 font-semibold" style={{ color:lm(light,'rgba(255,255,255,0.3)','rgba(60,40,15,0.35)') }}>{album.year}</p>
              <ul className="space-y-2">{album.tracks.map(([t,d],j) => <li key={j} className="flex justify-between text-[10px] pb-1.5" style={{ borderBottom:`1px solid ${lm(light,'rgba(255,255,255,0.05)','rgba(160,100,30,0.08)')}` }}><span style={{ color:bodyText }}>{t}</span><span style={{ color:lm(light,'rgba(255,255,255,0.25)','rgba(60,40,15,0.3)') }}>{d}</span></li>)}</ul>
            </div>
          ))}
        </div>
      </Section>
      <Section title="02. Digital Performance Metrics">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[['YouTube Subscribers','12,482','+15%'],['Total Video Views','1,245,690','+22%'],['Monthly Listeners','4,510','+8%'],['Engagement Rate','8.24%','+1.2%'],['Average Watch Time','3:45','+0.5%'],['Share Frequency','1.2K/mo','+5%'],['Playlist Inclusions','450+','+12%'],['Comment Sentiment','98% Pos','Stable']].map(([l,v,va],i) => (
            <div key={i} className="p-5 data-card text-center">
              <p className="text-xl font-bold mb-1" style={{ fontFamily:'Anton,sans-serif', color:headingColor }}>{v}</p>
              <p className="text-[8px] uppercase font-semibold tracking-widest mb-1" style={{ color:lm(light,'rgba(255,255,255,0.25)','rgba(60,40,15,0.35)') }}>{l}</p>
              <p className="text-[9px] font-semibold" style={{ color:greenColor }}>{va}</p>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );

  if (page === 'Author') return (
    <div className="space-y-14 text-sm" style={{ fontFamily:'Poppins,sans-serif', color:bodyText }}>
      <Section title="01. Published Works">
        <div className="space-y-4">
          {[['Your Time Will Come','2023','Heritage Publishing','Autobiography','A profound exploration of resilience, destiny, and strategic patience.'],['The Chakhesang Nagas','1998','Reliance Publishing House','Ethnography','A comprehensive study on the Chakhesang tribe history and culture.'],['The Angami Nagas','2004','Reliance Publishing House','Ethnography','In-depth analysis of the Angami Naga community and traditions.'],['Nagaland: A Journey in Time','2013','Dept. of Art & Culture','Historical Narrative','A curated journey through the milestones of Nagaland.']].map(([t,y,pub,g,d],i) => (
            <div key={i} className="p-6 data-card group">
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-3">
                <div><span className="text-[9px] font-black uppercase tracking-widest block mb-1" style={{ color:accentGold }}>{g}</span><h4 className="text-lg font-bold italic" style={{ color:lm(light,'rgba(255,255,255,0.8)','rgba(40,25,5,0.85)') }}>{t}</h4></div>
                <span className="text-2xl" style={{ fontFamily:'Anton,sans-serif', color:lm(light,'rgba(255,255,255,0.1)','rgba(160,100,30,0.15)') }}>{y}</span>
              </div>
              <p className="text-xs leading-relaxed mb-3" style={{ color:bodyText }}>{d}</p>
              <p className="text-[9px] uppercase font-bold" style={{ color:lm(light,'rgba(255,255,255,0.2)','rgba(60,40,15,0.25)') }}>Publisher: {pub}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title="02. Critical Reception">
        {[["Zehol's work serves as a vital bridge between our ancestral past and our administrative future. His documentation is both meticulous and soulful.","— North-East Literary Forum"],["A rare voice that combines the precision of a civil servant with the sensitivity of an artist.","— Naga Cultural Society"]].map(([q,src],i) => (
          <div key={i} className="p-5 data-card mb-3" style={{ borderLeft:`2px solid ${accentGold}` }}>
            <p className="text-xs italic leading-relaxed mb-2" style={{ color:bodyText }}>{q}</p>
            <p className="text-[9px] uppercase font-black" style={{ color:lm(light,'rgba(255,255,255,0.2)','rgba(60,40,15,0.3)') }}>{src}</p>
          </div>
        ))}
      </Section>
    </div>
  );

  // Misc sub-pages
  const miscContent: Record<string, React.ReactNode> = {
    NSSB: <div className="p-6 data-card" style={{ fontFamily:'Poppins,sans-serif', color:bodyText }}><p className="text-lg mb-4 font-bold" style={{ fontFamily:'Anton,sans-serif', color:lm(light,'#00D2FF','#b5540a') }}>NSSB OPERATIONAL DATA</p><p className="leading-relaxed">The NSSB under Chairman Kevekha Kevin Zehol processes approximately 48,291 applications annually across 112 examination centers. Digital verification rates reach 99.8% with a 24-hour grievance redressal target.</p></div>,
    CivilService: <div className="p-6 data-card" style={{ fontFamily:'Poppins,sans-serif', color:bodyText }}><p className="text-lg mb-4 font-bold" style={{ fontFamily:'Anton,sans-serif', color:accentGold }}>34-YEAR SERVICE RECORD</p><p className="leading-relaxed">Commissioned in 1990, K.K. Zehol served as EAC/SDO, Deputy Secretary, Joint Secretary, Deputy Commissioner across Phek/Mokokchung, Commissioner & Secretary for Home and Personnel departments, before being appointed Chairman of NSSB in 2022.</p></div>,
    Legacy: <div className="space-y-4" style={{ fontFamily:'Poppins,sans-serif' }}><div className="p-6 data-card"><p className="text-lg mb-4 font-bold" style={{ fontFamily:'Anton,sans-serif', color:greenColor }}>LEGACY & IMPACT</p><p className="italic mb-6" style={{ color:bodyText }}>"The legacy of a public servant is not measured in buildings they construct, but in the systems of justice and opportunity they leave behind."</p><div className="grid grid-cols-2 gap-3">{[['45','Schools Renovated'],['120km','Roads Built'],['12','Health Centers'],['5,000+','Youth Mentored']].map(([v,l],i) => <div key={i} className="p-5 data-card text-center"><p className="text-2xl font-bold" style={{ fontFamily:'Anton,sans-serif', color:headingColor }}>{v}</p><p className="text-[9px] uppercase font-semibold mt-1" style={{ color:lm(light,'rgba(255,255,255,0.25)','rgba(60,40,15,0.3)') }}>{l}</p></div>)}</div></div></div>,
    GovernanceImpact: <div className="p-6 data-card" style={{ fontFamily:'Poppins,sans-serif', color:bodyText }}><p className="text-lg mb-4 font-bold" style={{ fontFamily:'Anton,sans-serif', color:lm(light,'#00D2FF','#b5540a') }}>GOVERNANCE IMPACT</p><p className="leading-relaxed">The NSSB stands as a beacon of administrative reform — 100% digital adoption rate, 94% public trust index, and a 40% improvement in recruitment cycle efficiency under Zehol's chairmanship.</p></div>,
    ServiceImpact: <div className="p-6 data-card" style={{ fontFamily:'Poppins,sans-serif', color:bodyText }}><p className="text-lg mb-4 font-bold" style={{ fontFamily:'Anton,sans-serif', color:accentGold }}>SERVICE IMPACT</p><p className="leading-relaxed">Commissioned in 1990, K.K. Zehol served across 12+ districts — from frontier postings in Tuensang and Mon to policy hubs at the Kohima Secretariat — exemplifying steady, principled leadership across three decades.</p></div>,
    StatewideImpact: <div className="space-y-4" style={{ fontFamily:'Poppins,sans-serif' }}><div className="p-6 data-card"><p className="text-lg mb-4 font-bold" style={{ fontFamily:'Anton,sans-serif', color:greenColor }}>STATEWIDE IMPACT</p><p className="leading-relaxed mb-4" style={{ color:bodyText }}>Impact visible in improved infrastructure of remote sub-divisions, streamlined state departments, and renewed hope of thousands of job seekers who trust the state's recruitment systems.</p><p className="italic" style={{ color:lm(light,'rgba(255,255,255,0.25)','rgba(60,40,15,0.35)') }}>"We are the architects of our own destiny. The foundations we lay today will determine the strength of the Nagaland of tomorrow."</p></div></div>,
  };

  return <>{miscContent[page] || null}</>;
};

const subPageTitles: Record<string, string> = {
  About: "Comprehensive Biographical Data",
  Statesman: "Administrative & Governance Data Repository",
  Artist: "Musical Discography & Technical Analysis",
  Author: "Complete Bibliography & Literary Archive",
  NSSB: "NSSB — Operational Data",
  CivilService: "Nagaland Civil Service — Career Record",
  Legacy: "Administrative Excellence & Legacy",
  GovernanceImpact: "Governance: NSSB Leadership",
  ServiceImpact: "Service: 34+ Years of Excellence",
  StatewideImpact: "Impact: State-wide Legacy",
};

/* ===== SUB PAGE ===== */
const SubPage = ({ page, onClose }: { page: string; onClose: () => void }) => {
  const { light } = useTheme();
  const bg = lm(light,'#0d0d1a','#fdfbf7');
  const lineGrad = lm(light,'linear-gradient(90deg,transparent,rgba(0,210,255,0.5),transparent)','linear-gradient(90deg,transparent,rgba(181,84,10,0.5),transparent)');
  const backColor = lm(light,'rgba(255,255,255,0.3)','rgba(60,40,15,0.4)');
  const accent = lm(light,'#00D2FF','#b5540a');
  const headingColor = lm(light,'rgba(255,255,255,0.9)','rgba(40,25,5,0.9)');
  const subLabel = lm(light,'rgba(0,210,255,0.5)','rgba(181,84,10,0.6)');
  const dividerGrad = lm(light,'linear-gradient(90deg,rgba(0,210,255,0.6),transparent)','linear-gradient(90deg,rgba(181,84,10,0.6),transparent)');
  const footerBorder = lm(light,'rgba(255,255,255,0.05)','rgba(160,100,30,0.1)');
  const footerText = lm(light,'rgba(255,255,255,0.1)','rgba(60,40,15,0.2)');

  const title = subPageTitles[page] || page;
  if (!title) return null;

  return (
    <motion.div initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }}
      transition={{ duration:0.5, ease:[0.16,1,0.3,1] }}
      className="fixed inset-0 z-[100] overflow-y-auto grid-bg"
      style={{ background:bg }}
    >
      <div className="fixed top-0 left-0 w-full h-[1px] z-10" style={{ background:lineGrad }} />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.button onClick={onClose}
          className="flex items-center text-[9px] font-semibold uppercase tracking-widest mb-12 transition-colors group"
          style={{ fontFamily:'Poppins,sans-serif', color:backColor }}
          whileHover={{ x:-4 }}
        >
          <ChevronRight size={12} className="rotate-180 mr-2" style={{ color:accent }} />
          <span className="group-hover:text-current transition-colors">Back to Overview</span>
        </motion.button>
        <header className="mb-14">
          <p className="text-[9px] font-semibold uppercase tracking-[0.5em] mb-3" style={{ fontFamily:'Poppins,sans-serif', color:subLabel }}>Detailed Category Analysis</p>
          <h2 className="font-display text-4xl md:text-5xl uppercase tracking-tighter leading-none" style={{ fontFamily:'Anton,sans-serif', color:headingColor }}>{title}</h2>
          <div className="h-[1px] w-24 mt-4" style={{ background:dividerGrad }} />
        </header>
        <SubPageContent page={page} light={light} />
        <footer className="mt-20 pt-10 text-center text-[9px] uppercase tracking-[0.3em] font-semibold" style={{ borderTop:`1px solid ${footerBorder}`, fontFamily:'Poppins,sans-serif', color:footerText }}>
          End of Data Report • Kevekha Kevin Zehol • Archive
        </footer>
      </div>
    </motion.div>
  );
};

/* ===== APP ===== */
export default function App() {
  const [activeSubPage, setActiveSubPage] = useState<string | null>(null);
  const [light, setLight] = useState(true);

  useEffect(() => {
    document.body.classList.add('light-mode');
  }, []);

  const toggle = () => {
    setLight(prev => {
      const next = !prev;
      document.body.classList.toggle('light-mode', next);
      return next;
    });
  };

  return (
    <ThemeCtx.Provider value={{ light, toggle }}>
      <div style={{ fontFamily:'Poppins,sans-serif' }}>
        <Cursor />
        <AnimatePresence>{activeSubPage && <SubPage page={activeSubPage} onClose={() => setActiveSubPage(null)} />}</AnimatePresence>
        <Navbar onOpenSubPage={setActiveSubPage} />
        <Ticker />
        <main>
          <Hero onOpenSubPage={() => setActiveSubPage('About')} />
          <Statesman onOpenSubPage={setActiveSubPage} />
          <ImpactSection onOpenSubPage={setActiveSubPage} />
          <Artist onOpenSubPage={() => setActiveSubPage('Artist')} />
          <Author onOpenSubPage={() => setActiveSubPage('Author')} />
        </main>
        <Footer />
      </div>
    </ThemeCtx.Provider>
  );
}