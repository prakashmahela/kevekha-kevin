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
    { name: 'Author', href: '#author' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#020617]/95 backdrop-blur-2xl py-3 md:py-4 border-b border-brand-gold/30 shadow-[0_10px_40px_rgba(0,0,0,0.5)]' 
          : 'bg-[#020617]/40 backdrop-blur-lg py-4 md:py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="font-display text-2xl md:text-3xl tracking-tighter uppercase text-white hover:text-brand-gold hover:scale-105 transition-all duration-300">
          K.K. ZEHOL
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70 hover:text-brand-gold transition-all duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-gold transition-all duration-300 group-hover:w-full" />
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

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-zinc-950 z-[60] flex flex-col p-8"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-display text-2xl tracking-tighter uppercase text-white">K.K. ZEHOL</span>
              <motion.button 
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(false)} 
                className="text-white p-2 rounded-[12px] hover:bg-brand-gold/10 transition-colors"
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
                  className="font-display text-5xl tracking-tighter uppercase text-white/60 hover:text-brand-gold transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>
            <div className="mt-auto flex items-center space-x-6">
              <a href="#" className="text-white/60 hover:text-brand-gold transition-colors"><Instagram size={24} /></a>
              <a href="#" className="text-white/60 hover:text-brand-gold transition-colors"><Twitter size={24} /></a>
              <a href="https://youtube.com" className="text-red-600 hover:scale-110 transition-transform"><Youtube size={32} /></a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
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
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tight uppercase leading-[1.1] mb-12">
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
      color: "bg-[#FF2D55]", // Premium Vibrant Red
      textColor: "text-white"
    },
    {
      year: "34 Years",
      title: "Civil Service Career",
      desc: "Distinguished service in the Nagaland Civil Service across various administrative roles.",
      icon: <Award className="text-white" />,
      color: "bg-[#FFD60A]", // Premium Vibrant Gold
      textColor: "text-white"
    },
    {
      year: "Legacy",
      title: "Administrative Excellence",
      desc: "Pioneering initiatives in governance and community development throughout the state.",
      icon: <Award className="text-white" />,
      color: "bg-[#32D74B]", // Premium Vibrant Green
      textColor: "text-white"
    }
  ];

  return (
    <section id="statesman" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-display text-5xl md:text-7xl tracking-normal uppercase mb-4">Public Service Legacy</h2>
            <div className="h-2 w-24 bg-brand-gold" />
          </div>
          <p className="text-zinc-500 max-w-md uppercase tracking-[0.2em] text-xs font-bold">
            A 34-year journey of dedication, leadership, and service to the people of Nagaland.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {careerHighlights.map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -12, scale: 1.03 }}
              className={`p-6 md:p-10 ${item.color} ${item.textColor} shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[12px] flex flex-col h-full transition-all duration-500 border border-white/10`}
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-6 md:mb-10 shadow-inner">
                {item.icon}
              </div>
              <span className="font-display text-3xl md:text-4xl mb-3 opacity-95 tracking-tight">{item.year}</span>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-5 uppercase tracking-wide leading-tight">{item.title}</h3>
              <p className="opacity-90 leading-relaxed font-medium text-base md:text-lg">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Bento Style Grid for more details */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 h-48 md:h-64 bg-zinc-50 border border-zinc-100 rounded-[12px] p-6 md:p-8 flex flex-col justify-end text-zinc-900 overflow-hidden relative group">
            <img 
              src="https://picsum.photos/seed/nssb/800/400" 
              className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:scale-110 transition-transform duration-700" 
              alt="NSSB"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10">
              <h4 className="font-display text-3xl uppercase tracking-normal text-zinc-900">Governance</h4>
              <p className="text-sm opacity-60 uppercase tracking-widest">Nagaland Staff Selection Board</p>
            </div>
          </div>
          <div className="h-48 md:h-64 bg-brand-gold rounded-[12px] p-6 md:p-8 flex flex-col justify-end text-white relative overflow-hidden group">
             <img 
              src="https://picsum.photos/seed/service/400/400" 
              className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-700" 
              alt="Service"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10">
              <h4 className="font-display text-3xl uppercase tracking-normal text-white">34+</h4>
              <p className="text-sm opacity-80 uppercase tracking-widest">Years of Service</p>
            </div>
          </div>
          <div className="h-48 md:h-64 bg-zinc-100 border border-zinc-200 rounded-[12px] p-6 md:p-8 flex flex-col justify-end text-zinc-900 relative overflow-hidden group">
            <img 
              src="https://picsum.photos/seed/impact/400/400" 
              className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:scale-110 transition-transform duration-700" 
              alt="Impact"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-10">
              <h4 className="font-display text-3xl uppercase tracking-normal text-zinc-900">Impact</h4>
              <p className="text-sm opacity-60 uppercase tracking-widest">State-wide Legacy</p>
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
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="aspect-[3/4] w-full max-w-sm mx-auto bg-brand-white shadow-2xl rounded-[12px] overflow-hidden border-8 border-white relative z-10">
                <img 
                  src="https://picsum.photos/seed/book/600/800" 
                  alt="Women in Naga Society" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-brand-gold/10 rounded-full -z-10 blur-3xl" />
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-brand-blue/5 rounded-full -z-10 blur-2xl" />
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center space-x-2 text-brand-gold mb-6">
              <BookOpen size={20} />
              <span className="uppercase tracking-[0.3em] text-xs font-bold">Literary Works</span>
            </div>
            <h2 className="font-display text-6xl md:text-8xl tracking-tighter uppercase mb-8 leading-[0.85]">The <br />Author</h2>
            <h3 className="text-2xl font-bold mb-6">"Women in Naga Society"</h3>
            <p className="text-zinc-600 text-lg leading-relaxed mb-10">
              An insightful exploration into the roles, challenges, and contributions of women within the rich cultural tapestry of Naga society. A seminal work that bridges history and contemporary sociology.
            </p>
            <div className="flex items-center space-x-8">
              <div className="flex flex-col">
                <span className="text-3xl font-display animate-color-flow">200+</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Pages</span>
              </div>
              <div className="h-10 w-[1px] bg-zinc-200" />
              <div className="flex flex-col">
                <span className="text-3xl font-display animate-color-flow">1st</span>
                <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">Edition</span>
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="mt-12 px-10 py-4 btn-animate-flow font-bold uppercase tracking-widest text-sm rounded-[12px] shadow-xl flex items-center space-x-3"
            >
              <span>View Publication</span>
              <ExternalLink size={16} />
            </motion.button>
          </div>
        </div>
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
              <motion.a whileHover={{ y: -3 }} whileTap={{ scale: 0.9 }} href="#" className="w-10 h-10 rounded-[12px] border border-zinc-700 flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-all">
                <Youtube size={18} />
              </motion.a>
            </div>
          </div>
          
          <div>
            <h4 className="uppercase tracking-widest text-xs font-bold mb-8">Quick Links</h4>
            <ul className="space-y-4 text-sm text-zinc-400">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#statesman" className="hover:text-white transition-colors">The Statesman</a></li>
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
        <Author />
      </main>
      <Footer />
    </div>
  );
}
