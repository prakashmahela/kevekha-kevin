import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Youtube, 
  Menu, 
  X, 
  Play, 
  BookOpen, 
  Music, 
  Award, 
  ChevronRight, 
  ExternalLink,
  Mail,
  Instagram,
  Twitter,
  Linkedin
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Statesman', href: '#statesman' },
    { name: 'Artist', href: '#artist' },
    { name: 'Author', href: '#author' },
  ];

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 header-flow ${
          isScrolled 
            ? 'bg-brand-navy/95 backdrop-blur-xl py-3 md:py-4 border-b border-white/10 shadow-2xl' 
            : 'bg-brand-navy/60 backdrop-blur-md py-4 md:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="font-display text-2xl md:text-3xl tracking-tighter uppercase text-white hover:animate-color-flow hover:scale-105 transition-all duration-300">
            K.K. ZEHOL
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 hover:text-white hover:animate-color-flow transition-all duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <motion.a 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-red-600 text-white p-2.5 rounded-[12px] shadow-lg shadow-red-600/20"
            >
              <Youtube size={18} />
            </motion.a>
          </div>

          {/* Mobile Toggle */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden text-white p-2 rounded-[12px] hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={28} />
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-brand-navy z-[60] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-display text-2xl tracking-tighter uppercase text-white">K.K. ZEHOL</span>
              <motion.button 
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-white p-2 rounded-[12px] hover:bg-white/10 transition-colors"
              >
                <X size={32} />
              </motion.button>
            </div>
            <div className="flex flex-col space-y-8">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-5xl tracking-tighter uppercase text-white/60 hover:text-white hover:animate-color-flow transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="mt-auto flex items-center space-x-6">
              <a href="#" className="text-white/60 hover:text-white transition-colors"><Instagram size={24} /></a>
              <a href="#" className="text-white/60 hover:text-white transition-colors"><Twitter size={24} /></a>
              <a href="https://www.youtube.com/@kevekhakevinzehol9688" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:scale-110 transition-transform"><Youtube size={32} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden bg-brand-white">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-blue/5 -skew-x-12 transform origin-top-right hidden lg:block" />
      
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-block px-4 py-1 bg-brand-gold/10 text-brand-gold text-xs font-bold tracking-widest uppercase rounded-full mb-10">
            Statesman • Artist • Author
          </div>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tight uppercase leading-[1.05] mb-12">
            Kevekha Kevin Zehol
          </h1>
          <p className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Chairman of the Nagaland Staff Selection Board (NSSB) and a celebrated voice in contemporary Naga music. A life dedicated to public service and creative excellence.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: [0, -15, 0] 
            }}
            transition={{ 
              opacity: { duration: 1 },
              scale: { duration: 1 },
              y: { 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }
            }}
            className="relative max-w-lg w-full mx-auto group mb-16"
            style={{ perspective: 2000 }}
          >
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-brand-blue/30 blur-[100px] rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-500 -z-10" />
            
            <motion.div 
              whileHover={{ 
                rotateY: 20, 
                rotateX: -10, 
                z: 50,
                scale: 1.05
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="aspect-square relative z-10 overflow-hidden shadow-[0_30px_60px_rgba(0,102,255,0.3)] rounded-[12px] bg-white"
            >
              <img 
                src="https://i.ibb.co/wryTmcC1/1744384039162.png" 
                alt="Kevekha Kevin Zehol" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -left-6 w-48 h-48 border-8 border-brand-gold/20 -z-10" />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-blue/10 -z-10" />
          </motion.div>

          <div className="flex flex-wrap justify-center gap-4 mb-20">
            <motion.a 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#statesman" 
              className="px-8 py-4 btn-animate-flow font-bold uppercase tracking-widest text-sm rounded-[12px] shadow-xl shadow-brand-blue/20"
            >
              The Statesman
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
              href="#artist" 
              className="px-8 py-4 btn-animate-flow font-bold uppercase tracking-widest text-sm rounded-[12px] shadow-xl shadow-brand-blue/20"
            >
              The Artist
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Statesman = () => {
  const careerHighlights = [
    {
      year: "Current",
      title: "Chairman, NSSB",
      desc: "Leading the Nagaland Staff Selection Board with a focus on transparency and meritocracy.",
      icon: <Award className="text-white" />,
      color: "premium-card-ruby",
      textColor: "text-white"
    },
    {
      year: "34 Years",
      title: "Civil Service Career",
      desc: "Distinguished service in the Nagaland Civil Service across various administrative roles.",
      icon: <Award className="text-white" />,
      color: "premium-card-gold",
      textColor: "text-white"
    },
    {
      year: "Legacy",
      title: "Administrative Excellence",
      desc: "Pioneering initiatives in governance and community development throughout the state.",
      icon: <Award className="text-white" />,
      color: "premium-card-emerald",
      textColor: "text-white"
    }
  ];

  return (
    <section id="statesman" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-display text-5xl md:text-7xl tracking-normal uppercase mb-6">Public Service Legacy</h2>
            <div className="h-2 w-24 bg-brand-gold" />
          </div>
          <p className="text-zinc-500 max-w-md uppercase tracking-[0.2em] text-xs font-bold">
            A 34-year journey of dedication, leadership, and service to the people of Nagaland.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {careerHighlights.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 0 }}
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: idx * 0.5
              }}
              whileHover={{ y: -15, scale: 1.05, rotate: 1 }}
              className={`p-6 md:p-10 ${item.color} ${item.textColor} shimmer-sweep shadow-[0_30px_60px_rgba(0,0,0,0.2)] rounded-[16px] flex flex-col h-full transition-all duration-500 border border-white/20`}
            >
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center mb-6 md:mb-10 shadow-xl border border-white/20">
                {item.icon}
              </div>
              <span className="font-display text-2xl md:text-4xl mb-2 md:mb-3 opacity-95 tracking-tight animate-yellow-flow">{item.year}</span>
              <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-5 uppercase tracking-wide leading-tight drop-shadow-md animate-white-flow">{item.title}</h3>
              <p className="opacity-80 leading-relaxed font-medium text-sm md:text-lg">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bento Style Grid for more details */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 h-48 md:h-64 bg-zinc-950 border border-zinc-800 rounded-[12px] p-6 md:p-8 flex flex-col justify-end text-white overflow-hidden relative group">
            <img 
              src="https://i.ibb.co/mC6FZzyT/Independence-Day-India-Proud-To-Be-Indian-Tiranga-Love-India-At77-Vande-Mataram.jpg" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              alt="Governance"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10">
              <h4 className="font-display text-3xl uppercase tracking-normal animate-yellow-flow drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Governance</h4>
              <p className="text-sm opacity-100 uppercase tracking-widest text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Nagaland Staff Selection Board</p>
            </div>
          </div>
          <div className="h-48 md:h-64 bg-zinc-950 rounded-[12px] p-6 md:p-8 flex flex-col justify-end text-white relative overflow-hidden group">
             <img 
              src="https://i.ibb.co/S77fDhPh/Finding-India-s-lost-musicians-1.jpg" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              alt="Service"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10">
              <h4 className="font-display text-3xl uppercase tracking-normal animate-yellow-flow drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">34+</h4>
              <p className="text-sm opacity-100 uppercase tracking-widest text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">Years of Service</p>
            </div>
          </div>
          <div className="h-48 md:h-64 bg-zinc-950 border border-zinc-800 rounded-[12px] p-6 md:p-8 flex flex-col justify-end text-white relative overflow-hidden group">
            <img 
              src="https://i.ibb.co/DPpmtykR/download-2026-02-27-T101731-645.jpg" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              alt="Impact"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10">
              <h4 className="font-display text-3xl uppercase tracking-normal animate-yellow-flow drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Impact</h4>
              <p className="text-sm opacity-100 uppercase tracking-widest text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">State-wide Legacy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Artist = () => {
  const videos = [
    "Co2dRpBgKzo",
    "6Ysghdn7kHU",
    "5jYEaV_MSQQ",
    "oBoUbrD7O-A"
  ];

  return (
    <section id="artist" className="py-24 bg-brand-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 text-brand-blue mb-4">
            <Music size={20} />
            <span className="uppercase tracking-[0.3em] text-xs font-bold">Musical Journey</span>
          </div>
          <h2 className="font-display text-6xl md:text-8xl tracking-tighter uppercase mb-4">The Artist</h2>
        </div>

        {/* Featured Videos Section */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-12">
            <h3 className="font-display text-4xl uppercase tracking-tighter">Featured Performances</h3>
            <div className="h-[1px] flex-grow bg-zinc-200 mx-8 hidden md:block" />
            <a href="https://www.youtube.com/@kevekhakevinzehol9688" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-red-600 flex items-center hover:translate-x-1 transition-transform">
              View All <ChevronRight size={16} />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videos.map((id, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="aspect-video bg-zinc-100 rounded-[12px] overflow-hidden shadow-xl border border-zinc-200 group relative"
              >
                <iframe 
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${id}`}
                  title={`YouTube video player ${idx}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="p-12 bg-white rounded-[12px] shadow-2xl flex flex-col lg:flex-row items-center gap-12 border border-zinc-100">
          <div className="lg:w-1/2">
            <h3 className="font-display text-4xl uppercase mb-6 leading-none">A Voice for the <br /><span>Naga Spirit</span></h3>
            <p className="text-zinc-600 mb-8 leading-relaxed">
              Kevin's music blends traditional Naga sensibilities with contemporary sounds, creating a unique sonic landscape that resonates across generations. His albums "Mapo Evie" and "In His Grace" have become staples in the local music scene.
            </p>
            <motion.a 
              href="https://www.youtube.com/@kevekhakevinzehol9688"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center space-x-2 px-5 py-2.5 btn-animate-flow font-bold uppercase tracking-widest text-[10px] rounded-[10px] shadow-lg group w-fit mx-auto lg:mx-0"
            >
              <span>Listen on YouTube</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
          <div className="lg:w-1/2 w-full aspect-video bg-zinc-100 rounded-[12px] overflow-hidden relative group">
            <img 
              src="https://picsum.photos/seed/studio/800/450" 
              alt="Studio Session" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <Youtube className="text-white" size={32} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Author = () => {
  return (
    <section id="author" className="py-24 bg-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center space-x-2 text-brand-gold mb-8">
          <BookOpen size={20} />
          <span className="uppercase tracking-[0.3em] text-xs font-bold">Literary Works</span>
        </div>
        <h2 className="font-display text-6xl md:text-8xl tracking-tighter uppercase mb-12 leading-[1.0]">The <br />Author</h2>
        
        <div className="relative mb-16">
          <div className="aspect-[3/4] w-full max-w-sm mx-auto bg-brand-white shadow-2xl rounded-[12px] overflow-hidden border-8 border-white relative z-10">
            <img 
              src="https://i.ibb.co/rG8Kxwq6/71-XPqw-TRzs-L-AC-UF1000-1000-QL80.jpg" 
              alt="Your Time Will Come" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-gold/10 rounded-full -z-10 blur-3xl" />
          <div className="absolute top-0 left-1/4 w-48 h-48 bg-brand-blue/5 rounded-full -z-10 blur-2xl" />
        </div>

        <h3 className="text-3xl font-bold mb-6">"Your Time Will Come"</h3>
        <p className="text-zinc-600 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
          A compelling narrative that explores resilience, destiny, and the power of patience. A work that inspires readers to embrace their journey and trust in the timing of their lives.
        </p>
        
        <div className="flex items-center justify-center space-x-12 mb-12">
          <div className="flex flex-col">
            <span className="text-4xl font-display animate-color-flow">200+</span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Pages</span>
          </div>
          <div className="h-12 w-[1px] bg-zinc-200" />
          <div className="flex flex-col">
            <span className="text-4xl font-display animate-color-flow">1st</span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Edition</span>
          </div>
        </div>

        <motion.button 
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="px-12 py-5 btn-animate-flow font-bold uppercase tracking-widest text-sm rounded-[12px] shadow-xl flex items-center space-x-3 mx-auto"
        >
          <span>View Publication</span>
          <ExternalLink size={16} />
        </motion.button>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-navy text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="lg:col-span-2">
            <h2 className="font-display text-4xl tracking-tighter uppercase mb-6">K.K. ZEHOL</h2>
            <p className="text-zinc-400 max-w-sm leading-relaxed mb-8">
              A life of service, a soul of music, and a mind for literature. Dedicated to the progress and culture of Nagaland.
            </p>
            <div className="flex items-center space-x-4">
              <motion.a whileHover={{ y: -3 }} whileTap={{ scale: 0.9 }} href="#" className="w-10 h-10 rounded-[12px] border border-zinc-700 flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition-all">
                <Instagram size={18} />
              </motion.a>
              <motion.a whileHover={{ y: -3 }} whileTap={{ scale: 0.9 }} href="#" className="w-10 h-10 rounded-[12px] border border-zinc-700 flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition-all">
                <Twitter size={18} />
              </motion.a>
              <motion.a whileHover={{ y: -3 }} whileTap={{ scale: 0.9 }} href="#" className="w-10 h-10 rounded-[12px] border border-zinc-700 flex items-center justify-center hover:bg-brand-blue hover:border-brand-blue transition-all">
                <Linkedin size={18} />
              </motion.a>
              <motion.a whileHover={{ y: -3 }} whileTap={{ scale: 0.9 }} href="https://www.youtube.com/@kevekhakevinzehol9688" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-[12px] border border-zinc-700 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all">
                <Youtube size={18} />
              </motion.a>
            </div>
          </div>
          
          <div>
            <h4 className="uppercase tracking-widest text-xs font-bold mb-8">Quick Links</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#statesman" className="hover:text-white transition-colors">The Statesman</a></li>
              <li><a href="#artist" className="hover:text-white transition-colors">The Artist</a></li>
              <li><a href="#author" className="hover:text-white transition-colors">The Author</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="uppercase tracking-widest text-xs font-bold mb-8">Contact</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-brand-blue" />
                <span>contact@kkzehol.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <div className="mt-1"><Award size={16} className="text-brand-blue" /></div>
                <span>NSSB Office, Kohima, Nagaland</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">
          <p>© 2024 Kevekha Kevin Zehol. All Rights Reserved.</p>
          <p>Crafted with Excellence</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="selection:bg-brand-blue selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Statesman />
        <Artist />
        <Author />
      </main>
      <Footer />
    </div>
  );
}
