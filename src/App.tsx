import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Heart, ChevronLeft, ChevronRight, Play, Pause, Music, Sparkles } from 'lucide-react';

// --- CONFIGURATION SECTION ---
// Paste your Google Drive share links here! 
// Ensure your Drive photos are shared as "Anyone with the link can view".
const CONFIG = {
  heroImage: "/photos/hero.jpeg",
  
  slideshow: [
    { url: "/photos/gallery-3.jpeg", caption: "Where the Journey Began" },
    { url: "/photos/timeline-1.jpeg", caption: "Building a Beautiful Family" },
    { url: "/photos/gallery-2.jpeg", caption: "Adventures Together" },
    { url: "/photos/timeline-2.jpeg", caption: "A Beautiful Anniversary" }
  ],

  timeline: [
    {
      title: "The Beginning",
      description: "The moment two souls decided to walk through life together hand in hand.",
      image: "/photos/gallery-3.jpeg"
    },
    {
      title: "Building a Family",
      description: "Creating a home filled with laughter, warmth, and the first steps of children.",
      image: "/photos/timeline-1.jpeg"
    },
    {
      title: "Beautiful Memories",
      description: "Countless adventures, shared smiles, and overcoming challenges together.",
      image: "/photos/gallery-2.jpeg"
    },
    {
      title: "Forever Together",
      description: "A love that keeps growing stronger. Still in love, still together.",
      image: "/photos/timeline-2.jpeg"
    }
  ],

  gallery: [
    "/photos/gallery-3.jpeg",
    "/photos/gallery-9.jpeg",
    "/photos/slideshow-1.jpeg",
    "/photos/gallery-6.jpeg",
    "/photos/gallery-2.jpeg",
    "/photos/gallery-4.jpeg",
    "/photos/timeline-1.jpeg",
    "/photos/gallery-10.jpeg",
    "/photos/slideshow-4.jpeg",
    "/photos/gallery-1.jpeg",
    "/photos/gallery-7.jpeg",
    "/photos/gallery-12.jpeg",
    "/photos/gallery-11.jpeg",
    "/photos/gallery-5.jpeg",
    "/photos/slideshow-3.jpeg",
    "/photos/hero.jpeg",
    "/photos/slideshow-2.jpeg",
    "/photos/gallery-13.jpeg",
    "/photos/gallery-8.jpeg",
    "/photos/timeline-3.jpeg",
    "/photos/timeline-2.jpeg",
    "/photos/timeline-4.jpeg",
  ]
};

// --- Helper: Google Drive Link Formatter ---
// This function automatically detects Google Drive sharing links and converts them
// into a format that can be used directly in an <img> tag.
const formatImg = (url: string) => {
  if (url.includes('drive.google.com')) {
    // Extract ID from different possible drive link formats
    const idMatch = url.match(/\/d\/([^/]+)/) || url.match(/id=([^&]+)/);
    if (idMatch && idMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${idMatch[1]}=w1600`;
    }
  }
  return url;
};

// --- Components ---

function FloatingHearts() {
  const [hearts, setHearts] = useState<{ id: number, left: string, size: number, delay: number, duration: number }[]>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() * 20 + 20,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map(heart => (
        <Heart
          key={heart.id}
          className="heart-particle text-blush/40 fill-blush/20"
          style={{
            left: heart.left,
            width: heart.size,
            height: heart.size,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
            bottom: '-10%'
          }}
        />
      ))}
    </div>
  );
}

function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button 
        onClick={() => setPlaying(!playing)}
        className="glass p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center gap-2 group"
      >
        {playing ? (
          <>
            <Pause className="w-5 h-5 text-gold" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all text-xs font-medium uppercase tracking-widest text-gold whitespace-nowrap">Now Playing</span>
          </>
        ) : (
          <>
            <Play className="w-5 h-5 text-gold" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all text-xs font-medium uppercase tracking-widest text-gold whitespace-nowrap">Play Music</span>
          </>
        )}
        <Music className={`w-4 h-4 text-gold ${playing ? 'animate-bounce' : ''}`} />
      </button>
    </div>
  );
}

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  // Slideshow auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CONFIG.slideshow.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % CONFIG.slideshow.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + CONFIG.slideshow.length) % CONFIG.slideshow.length);

  return (
    <div className="relative min-h-screen">
      <FloatingHearts />
      <MusicPlayer />

      {/* 1. HERO SECTION */}
      <section ref={heroRef} className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0 z-0"
        >
          {/* REPLACE PHOTO HERE: images/hero-mom-dad.jpg */}
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `radial-gradient(circle at center, rgba(255, 253, 249, 0.82), rgba(250, 247, 242, 0.62) 42%, rgba(250, 247, 242, 0.86)), url("${formatImg(CONFIG.heroImage)}")` }}
          />
        </motion.div>

        <div className="relative z-10 text-center px-5 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <span className="hero-readable text-[#9a7208] uppercase tracking-[0.22em] sm:tracking-[0.32em] md:tracking-[0.4em] text-[9px] sm:text-[10px] font-bold mb-4 block border-y border-gold/40 bg-ivory/45 px-3 py-1.5 w-fit max-w-full mx-auto leading-relaxed rounded-full">Celebrating Their 21st Anniversary Together</span>
            <h1 className="hero-readable text-5xl sm:text-6xl md:text-8xl text-coffee mb-5 md:mb-6 font-serif leading-[0.95]">
              Happy Anniversary <br />
              <span className="text-[#9a7208] italic">Mom & Dad</span>
            </h1>
            <p className="hero-readable text-base sm:text-lg md:text-xl text-coffee/90 font-medium leading-relaxed max-w-2xl mx-auto mb-8 md:mb-10">
              A celebration of love, togetherness, and the beautiful life you built.
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="flex justify-center"
            >
              <div className="animate-bounce">
                <ChevronLeft className="rotate-[270deg] w-6 h-6 text-gold" />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            animate={{ 
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-4 md:left-10 w-40 h-40 md:w-64 md:h-64 bg-blush/20 rounded-full blur-3xl" 
          />
          <motion.div 
            animate={{ 
              y: [0, 30, 0],
              opacity: [0.05, 0.15, 0.05]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-1/4 right-4 md:right-10 w-56 h-56 md:w-96 md:h-96 bg-gold/10 rounded-full blur-3xl" 
          />
        </div>
      </section>

      {/* 2. SLIDESHOW SECTION */}
      <section className="py-16 md:py-24 px-4 bg-champagne/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl text-coffee mb-4">Cherished Moments</h2>
            <div className="w-24 h-[1px] bg-gold mx-auto" />
          </div>

          <div className="relative aspect-[4/3] md:aspect-[16/10] rounded-3xl md:rounded-[40px] overflow-hidden glass soft-shadow group border border-gold/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                {/* REPLACE PHOTOS HERE: images/family-1.jpg, images/family-2.jpg, etc. */}
                <img
                  src={formatImg(CONFIG.slideshow[currentSlide].url)}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-45"
                />
                <img 
                  src={formatImg(CONFIG.slideshow[currentSlide].url)} 
                  alt="Family Moment"
                  className="relative z-10 w-full h-full object-contain"
                />
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-7 md:pb-8 px-4 text-center">
                  <motion.p 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-white text-lg sm:text-xl md:text-3xl font-serif italic leading-tight"
                  >
                    "{CONFIG.slideshow[currentSlide].caption}"
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>

            <button 
              onClick={prevSlide}
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full glass text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full glass text-white opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {CONFIG.slideshow.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === currentSlide ? 'bg-white w-6' : 'bg-white/40'}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. LOVE STORY TIMELINE */}
      <section className="py-16 md:py-24 bg-beige/30">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12 md:mb-20 italic">
            <h2 className="text-4xl md:text-5xl mb-4 font-serif">Our History</h2>
            <p className="text-gray-500 uppercase tracking-widest text-xs">The chapters of a beautiful life</p>
          </div>

          <div className="relative timeline-line">
            {CONFIG.timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`relative flex items-center justify-between mb-10 md:mb-24 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
              >
                <div className="hidden md:block w-[45%]">
                  <div className="relative p-2 glass rounded-xl shadow-xl rotate-3 hover:rotate-0 transition-transform duration-500 overflow-hidden">
                    <div className="relative h-64 rounded-lg overflow-hidden bg-ivory">
                      <img src={formatImg(item.image)} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-35" />
                      <img src={formatImg(item.image)} alt={item.title} className="relative z-10 w-full h-full object-contain" />
                    </div>
                  </div>
                </div>

                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gold shadow-[0_0_10px_#d4af37] z-20" />

                <div className="w-full md:w-[45%] text-center md:text-left">
                  <div className={`p-6 md:p-8 glass rounded-3xl md:rounded-[32px] soft-shadow border-white transition-colors ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                    <h3 className="text-xl md:text-2xl mb-3 text-coffee italic">{item.title}</h3>
                    <p className="text-coffee/70 leading-relaxed font-light">{item.description}</p>
                    <div className="mt-6 md:hidden">
                      <div className="relative h-48 rounded-lg overflow-hidden bg-ivory shadow-md">
                        <img src={formatImg(item.image)} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-35" />
                        <img src={formatImg(item.image)} alt={item.title} className="relative z-10 w-full h-full object-contain" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FAMILY GALLERY */}
      <section className="py-16 md:py-24 px-4 bg-champagne/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-12 gap-6">
            <div className="text-left w-full">
              <h2 className="text-4xl md:text-6xl text-coffee mb-2">Moments of Joy</h2>
              <p className="text-gold font-serif italic text-lg opacity-60">A mosaic of our happiest days together</p>
            </div>
            <div className="flex items-center gap-2 text-gold/40">
               <Sparkles className="w-5 h-5" />
               <span className="text-[10px] tracking-[0.3em] font-bold uppercase">Explore Gallery</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {CONFIG.gallery.map((img, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative group aspect-square rounded-[32px] overflow-hidden soft-shadow border border-white cursor-pointer bg-ivory"
              >
                {/* REPLACE PHOTOS HERE: images/family-3.jpg, images/family-4.jpg, etc. */}
                <img
                  src={formatImg(img)}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-xl scale-110 opacity-35"
                />
                <img 
                  src={formatImg(img)} 
                  alt="Family Memory" 
                  className="relative z-10 w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 z-20 bg-gold/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                   <Heart className="w-12 h-12 text-white fill-white animate-pulse" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. MESSAGE SECTION (Love Letter) */}
      <section className="py-20 md:py-32 px-4 bg-blush/5 relative overflow-hidden">
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, rotate: -2 }}
            whileInView={{ opacity: 1, rotate: 0 }}
            viewport={{ once: true }}
            className="bg-[#FFFDF9] p-7 pt-12 sm:p-10 md:p-20 soft-shadow rounded-3xl md:rounded-[32px] relative border border-gold/10"
          >
            {/* Wax seal effect */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-rose shadow-lg flex items-center justify-center text-white border-4 border-ivory rotate-12">
               <Heart className="w-8 h-8 fill-current" />
            </div>

            <div className="font-serif text-center mb-12">
              <span className="text-gold text-[10px] uppercase tracking-[0.28em] md:tracking-[0.4em] font-bold block mb-4">A legacy of love</span>
              <h2 className="text-3xl md:text-4xl text-coffee italic">Dear Mom and Dad,</h2>
            </div>
            
            <div className="prose prose-lg mx-auto text-coffee/80 font-serif leading-[1.9] md:leading-[2.5] text-left sm:text-justify text-lg md:text-xl">
              <p className="sm:indent-8 italic opacity-90">
                Your love is the foundation of our family. Thank you for every sacrifice, every smile, and every beautiful memory you've created for me.
              </p>
              <p className="mt-8 opacity-70">
                The way you look at each other, the way you support one another, and the way you have built this incredible life together is the greatest lesson of love I could ever hope to learn.
              </p>
              <p className="mt-8 opacity-70">
                As you celebrate your togetherness, I want you to know how deeply you are loved and appreciated. You are not just my parents; you are my heroes and my greatest inspiration.
              </p>
              <p className="mt-8 opacity-80 italic">
                I love you soo muchhh Mumma Daddy ❤️❤️✨
              </p>
            </div>

            <div className="mt-12 md:mt-16 text-right font-serif italic text-2xl text-rose">
               By Siddhi
            </div>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose/10 rounded-full blur-3xl opacity-20" />
      </section>

      {/* 6. FINAL CELEBRATION */}
      <section className="py-20 md:py-32 px-4 text-center bg-ivory relative overflow-hidden">
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="max-w-2xl mx-auto"
        >
          <Sparkles className="w-12 h-12 text-gold mx-auto mb-8 animate-pulse" />
          <h2 className="text-3xl sm:text-4xl md:text-6xl text-coffee mb-6 md:mb-8 italic leading-tight">
            Wishing You Endless <br /> Happiness & Health
          </h2>
          <p className="text-coffee/60 font-light text-base md:text-lg mb-10 md:mb-12 tracking-wide">
            May your love continue to shine brighter with every shared moment. <br />
            Forever and always.
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Confetti logic or heart explosion
              for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                  const heart = document.createElement('div');
                  heart.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#D88181" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart text-rose"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.505 4.044 3 5.5L12 21Z"></path></svg>`;
                  heart.className = 'fixed bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-[100]';
                  heart.style.left = `${Math.random() * 100}%`;
                  heart.style.animation = `float ${Math.random() * 3 + 2}s ease-out forwards`;
                  heart.style.color = '#D88181';
                  document.body.appendChild(heart);
                  setTimeout(() => heart.remove(), 5000);
                }, i * 100);
              }
            }}
            className="bg-rose text-white px-7 sm:px-10 py-4 rounded-full text-[10px] sm:text-xs font-bold tracking-[0.22em] sm:tracking-[0.3em] uppercase hover:bg-rose/90 transition-all shadow-xl flex items-center gap-2 mx-auto overflow-hidden group relative"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
            <span className="relative z-10">Spread the Love</span>
            <Heart className="w-5 h-5 fill-current relative z-10" />
          </motion.button>
        </motion.div>

        <footer className="mt-20 md:mt-32 pt-10 md:pt-12">
           <div className="max-w-4xl mx-auto bg-champagne p-6 md:p-8 rounded-3xl md:rounded-[32px] gold-border flex flex-col md:flex-row items-center justify-between gap-6 soft-shadow">
              <div className="flex flex-col items-center md:items-start gap-4">
                 <div className="flex gap-4">
                    <Heart className="w-4 h-4 text-gold/60" />
                    <Sparkles className="w-4 h-4 text-gold/60" />
                    <Heart className="w-4 h-4 text-gold/60" />
                 </div>
                 <p className="text-[10px] uppercase tracking-[0.28em] md:tracking-[0.4em] font-bold text-gold text-center md:text-left">MADE WITH LOVE BY SIDDHI</p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-[10px] text-coffee opacity-40 font-serif">Anniversary Tribute • Always & Forever</p>
              </div>
           </div>
        </footer>
      </section>
    </div>
  );
}
