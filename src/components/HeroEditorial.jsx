import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, Sparkles, Truck } from 'lucide-react';
import OfferPopup from './OfferPopup';
import { img } from '../data/products';

// Six editorial chapters. Each one has its own room photograph, headline, line and destination.
const SCENES = [
  { id: 'editorial', title: 'Editorial Living', line: 'Rooms composed like a magazine spread: calm, considered and lived in.', src: img('hero-warm-living'), pos: '50% 60%', to: '/room/living', cta: 'Explore the living room' },
  { id: 'architectural', title: 'Architectural Luxury', line: 'Arches, stone and sculpted forms that give a room its structure.', src: img('hero-arched-villa-living'), pos: '50% 55%', to: '/collections/sculpted-forms', cta: 'Explore Sculpted Forms' },
  { id: 'gallery', title: 'The Furniture Gallery', line: 'Pieces chosen one at a time and shown like objects in a gallery.', src: img('hero-stone-timber-living'), pos: '50% 60%', to: '/shop?category=Furniture', cta: 'Browse furniture' },
  { id: 'softer', title: 'A Softer Living', line: 'Bouclé, linen and rounded forms for a quieter home.', src: img('hero-living-curved-sofa'), pos: '45% 60%', to: '/collections/quiet-living', cta: 'Explore Quiet Living' },
  { id: 'detail', title: 'Design in Every Detail', line: 'From the grain of the wood to the line of a brass handle.', src: img('hero-brass-bedroom'), pos: '50% 55%', to: '/room/bedroom', cta: 'Explore the bedroom' },
];
const BENEFITS = [
  { i: Truck, t: 'Complimentary delivery', d: 'On orders above ₹10,000' },
  { i: Clock, t: 'Ready in 5–7 days', d: 'On in-stock pieces' },
  { i: Sparkles, t: 'Save on room sets', d: 'Up to 12% off complete rooms' },
  { i: BookOpen, t: 'Care & assembly guides', d: 'With every piece' },
];
const ease = [0.22, 1, 0.36, 1];

// Staggered word reveal: each word slides up out of its own mask.
function Words({ text, delay = 0, className = '', reduced }) {
  return (
    <span className={className}>
      {text.split(' ').map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
          <motion.span className="inline-block" initial={reduced ? false : { y: '112%' }} animate={{ y: 0 }} transition={{ duration: 0.85, delay: delay + i * 0.09, ease }}>{w}</motion.span>
          {i < text.split(' ').length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

// Buttons lean slightly toward the cursor (magnetic), with a gold shimmer sweep handled in CSS.
function Magnetic({ to, className, children }) {
  const ref = useRef(null);
  const move = (e) => {
    if (e.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate(${((e.clientX - r.left) / r.width - 0.5) * 10}px, ${((e.clientY - r.top) / r.height - 0.5) * 8}px)`;
  };
  return <Link ref={ref} to={to} onPointerMove={move} onPointerLeave={() => { if (ref.current) ref.current.style.transform = ''; }} className={className}>{children}</Link>;
}

export default function HeroEditorial() {
  const root = useRef(null); const reduced = useReducedMotion();
  const [i, setI] = useState(0); const [hover, setHover] = useState(false);
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end start'] });
  const py = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const go = (d) => setI((n) => (n + d + SCENES.length) % SCENES.length);
  useEffect(() => {
    if (reduced || hover) return undefined;
    const t = setTimeout(() => go(1), 7500); return () => clearTimeout(t);
  }, [i, hover, reduced]);
  const scene = SCENES[i];
  const down = () => root.current && window.scrollTo({ top: root.current.offsetTop + root.current.offsetHeight - 64, behavior: reduced ? 'auto' : 'smooth' });

  return (
    <>
      <section ref={root} aria-label="Featured rooms" className="relative isolate flex min-h-[680px] flex-col overflow-hidden bg-[#EADCC8] lg:h-[calc(100svh-4rem)] lg:max-h-[920px]">
        {/* image: clip-path reveal, slow zoom, scroll parallax */}
        <motion.div aria-hidden style={{ y: reduced ? 0 : py }} className="absolute inset-x-0 -top-[20%] -z-10 h-[120%]">
          <motion.div className="absolute inset-0" initial={reduced ? false : { clipPath: 'inset(0 0 0 100%)' }} animate={{ clipPath: 'inset(0 0 0 0%)' }} transition={{ duration: 1.5, ease }}>
            <AnimatePresence initial={false}>
              <motion.img key={scene.id} src={scene.src} alt="" draggable={false} className="absolute inset-0 h-full w-full select-none object-cover" style={{ objectPosition: scene.pos }}
                initial={reduced ? false : { opacity: 0.4, scale: 1.18, clipPath: 'inset(0 0 0 100%)' }} animate={{ opacity: 1, scale: 1.03, clipPath: 'inset(0 0 0 0%)' }} exit={{ opacity: 0 }} transition={{ opacity: { duration: 1 }, clipPath: { duration: 1.3, ease }, scale: { duration: 9, ease: 'linear' } }} />
            </AnimatePresence>
          </motion.div>
        </motion.div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ivory/90 via-ivory/60 to-ivory/20 sm:bg-gradient-to-r sm:from-ivory/85 sm:via-ivory/40 sm:to-transparent" />
        <div aria-hidden className="sunbeam" /><div aria-hidden className="sunbeam sunbeam-b" />
        <div aria-hidden className="grain" />
        <div aria-hidden className="motes">{Array.from({ length: 14 }).map((_, n) => <span key={n} style={{ left: `${(n * 37 + 8) % 100}%`, animationDelay: `${(n * 1.7) % 11}s`, animationDuration: `${14 + (n % 5) * 3}s`, width: `${2 + (n % 3)}px`, height: `${2 + (n % 3)}px` }} />)}</div>

        <motion.div aria-hidden initial={reduced ? false : { opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 1.1, ease }} className="absolute bottom-32 right-8 z-10 hidden xl:block">
          <div className="floaty grid h-24 w-24 place-items-center rounded-full border border-ivory/50 bg-moss/90 text-center text-ivory shadow-xl backdrop-blur sm:h-32 sm:w-32"><p className="font-display text-sm leading-tight sm:text-lg">Curated<br />for Modern<br />Living</p></div>
        </motion.div>

        <div aria-hidden className="pointer-events-none absolute right-6 top-6 z-10 hidden select-none font-display text-[clamp(7rem,14vw,13rem)] leading-none text-ivory/55 mix-blend-soft-light lg:block">
          <AnimatePresence mode="wait"><motion.span key={scene.id} className="block" initial={reduced ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease }}>{String(i + 1).padStart(2, '0')}</motion.span></AnimatePresence>
        </div>

        <div className="container-x relative flex flex-1 items-center py-10 sm:py-14">
          <div className="max-w-2xl" aria-live="polite">
            <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-espresso/80"><span aria-hidden className="h-px w-9 bg-espresso/50" />Chapter {String(i + 1).padStart(2, '0')} <span className="text-espresso/45">/ {String(SCENES.length).padStart(2, '0')}</span></p>
            <h1 key={scene.id} className="mt-5 text-[clamp(2.7rem,6vw,5.6rem)] leading-[1] tracking-tight text-espresso">
              <Words text={scene.title} delay={0.1} reduced={reduced} />
            </h1>
            <span key={`${scene.id}-r`} aria-hidden className="goldrule mt-5 block h-px w-28" />
            <motion.p key={`${scene.id}-l`} initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease }} className="mt-6 max-w-md text-base leading-relaxed text-espresso/80 sm:text-lg">{scene.line}</motion.p>
            <motion.div key={`${scene.id}-c`} initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65, ease }} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap [&>a]:w-full sm:[&>a]:w-auto">
              <Magnetic to={scene.to} className="btn-royal group">{scene.cta}<span className="chip"><ArrowRight size={15} /></span></Magnetic>
            </motion.div>
            <motion.div initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2, ease }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} className="mt-10 flex max-w-full items-center gap-3 sm:gap-4">
              <div className="flex min-w-0 flex-1 gap-2 sm:gap-3" role="tablist" aria-label="Chapters">
                {SCENES.map((s, n) => (
                  <button key={s.id} role="tab" aria-selected={n === i} aria-label={s.title} onClick={() => setI(n)} className="group min-w-0 flex-1 text-left">
                    <span className="relative block h-[2px] overflow-hidden bg-espresso/25"><span key={n === i ? `on-${i}` : 'off'} className={`absolute inset-0 bg-espresso ${n === i ? (reduced ? '' : 'chapterbar') : 'scale-x-0'}`} style={n === i && hover ? { animationPlayState: 'paused' } : undefined} /></span>
                    <span className={`mt-2 block truncate text-[11px] tracking-[0.12em] transition ${n === i ? 'text-espresso' : 'text-espresso/50 group-hover:text-espresso/80'}`}>{String(n + 1).padStart(2, '0')}<span className={`ml-2 uppercase ${n === i ? 'hidden lg:inline' : 'hidden'}`}>{s.title}</span></span>
                  </button>))}
              </div>
            </motion.div>
          </div>
          <button onClick={down} aria-label="Scroll down" className="absolute bottom-3 right-6 hidden flex-col items-center gap-2 text-espresso/70 lg:flex"><span className="grid h-9 w-6 justify-center rounded-full border border-espresso/50 pt-1.5"><span className="h-2 w-1 animate-bounce rounded-full bg-espresso/70" /></span></button>
        </div>

        <ul className="relative grid grid-cols-2 gap-x-4 gap-y-4 border-t border-ivory/60 bg-ivory/70 px-5 py-5 backdrop-blur-md sm:px-10 lg:grid-cols-4 lg:px-[max(2.5rem,calc((100vw-80rem)/2))]">
          {BENEFITS.map(({ i: Icon, t, d }) => (
            <li key={t} className="flex items-center gap-3 lg:border-r lg:border-espresso/10 lg:last:border-0"><Icon size={26} strokeWidth={1.2} className="shrink-0 text-moss" aria-hidden /><div><p className="text-sm text-espresso">{t}</p><p className="text-xs text-espresso/65">{d}</p></div></li>
          ))}
        </ul>
      </section>
      <OfferPopup watch={root} />
    </>
  );
}
