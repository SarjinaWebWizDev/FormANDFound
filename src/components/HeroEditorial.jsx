import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, BookOpen, Clock, Sparkles, Truck } from 'lucide-react';
import OfferPopup from './OfferPopup';
import { img } from '../data/products';

// Six editorial chapters. Each one has its own room photograph, headline, line and destination.
const SCENES = [
  { id: 'editorial', title: 'Editorial Living', line: 'Rooms composed like a magazine spread: calm, considered and lived in.', src: img('hero-warm-living'), pos: '50% 60%', to: '/room/living', cta: 'Explore the living room' },
  { id: 'architectural', title: 'Softly Sculpted', line: 'Rounded, channelled forms that give a room its quiet structure.', src: img('hero-living-cream-sofa'), pos: '50% 60%', to: '/collections/sculpted-forms', cta: 'Explore Sculpted Forms' },
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
        <span key={i} className="inline-block pb-[0.12em] align-bottom [perspective:700px]">
          <motion.span className="inline-block" style={{ transformOrigin: '50% 100%' }} initial={reduced ? false : { y: 40, rotateX: -85, opacity: 0 }} animate={{ y: 0, rotateX: 0, opacity: 1 }} transition={{ duration: 0.8, delay: delay + i * 0.08, ease }}>{w}</motion.span>
          {i < text.split(' ').length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
}

// 3D button: tilts toward the cursor in perspective, the arrow chip floats forward, a light glare follows the pointer.
function Magnetic({ to, className, children }) {
  const ref = useRef(null);
  const move = (e) => {
    if (e.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches || !ref.current) return;
    const r = ref.current.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5; const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(600px) rotateY(${(x * 22).toFixed(1)}deg) rotateX(${(-y * 26).toFixed(1)}deg) translateZ(14px)`;
    ref.current.style.setProperty('--gx', `${(x + 0.5) * 100}%`);
  };
  return <span className="inline-block [perspective:800px]"><Link ref={ref} to={to} onPointerMove={move} onPointerLeave={() => { if (ref.current) ref.current.style.transform = ''; }} className={`${className} btn3d`}>{children}</Link></span>;
}

export default function HeroEditorial() {
  const root = useRef(null); const reduced = useReducedMotion();
  const [i, setI] = useState(0); const [hover, setHover] = useState(false);
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end start'] });
  const py = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const mx = useMotionValue(0); const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 }); const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const rY = useTransform(sx, [-0.5, 0.5], [-2.2, 2.2]); const rX = useTransform(sy, [-0.5, 0.5], [1.6, -1.6]);
  const tX = useTransform(sx, [-0.5, 0.5], [14, -14]); const textX = useTransform(sx, [-0.5, 0.5], [-10, 10]); const textY = useTransform(sy, [-0.5, 0.5], [-6, 6]);
  const onMove = (e) => { if (reduced || e.pointerType === 'touch') return; const r = root.current.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); };
  const go = (d) => setI((n) => (n + d + SCENES.length) % SCENES.length);
  useEffect(() => {
    if (reduced || hover) return undefined;
    const t = setTimeout(() => go(1), 6500); return () => clearTimeout(t);
  }, [i, hover, reduced]);
  const scene = SCENES[i];
  useEffect(() => { const im = new Image(); im.src = SCENES[(i + 1) % SCENES.length].src; }, [i]);
  const down = () => root.current && window.scrollTo({ top: root.current.offsetTop + root.current.offsetHeight - 64, behavior: reduced ? 'auto' : 'smooth' });

  return (
    <>
      <section ref={root} onPointerMove={onMove} aria-label="Featured rooms" className="relative isolate flex min-h-[600px] sm:min-h-[680px] flex-col overflow-hidden bg-[#EADCC8] lg:h-[calc(100svh-4rem)] lg:max-h-[920px]">
        {/* image: clip-path reveal, slow zoom, scroll parallax */}
        <motion.div aria-hidden style={{ y: reduced ? 0 : py }} className="absolute inset-x-0 -top-[20%] -z-10 h-[120%] [perspective:1200px]">
          <motion.div className="absolute -inset-[4%]" style={{ rotateY: reduced ? 0 : rY, rotateX: reduced ? 0 : rX, x: reduced ? 0 : tX }}>
            <AnimatePresence initial={false}>
              <motion.img key={scene.id} src={scene.src} alt="" decoding="async" fetchPriority={i === 0 ? 'high' : undefined} draggable={false} className="absolute inset-0 h-full w-full select-none object-cover" style={{ objectPosition: scene.pos }}
                initial={reduced ? false : { opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ opacity: { duration: 1.2, ease: 'easeInOut' }, scale: { duration: 7, ease: 'linear' } }} />
            </AnimatePresence>
          </motion.div>
        </motion.div>
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-espresso/85 via-espresso/35 to-espresso/10 sm:bg-gradient-to-r sm:from-espresso/75 sm:via-espresso/30 sm:to-transparent" />
        <div aria-hidden className="sunbeam" /><div aria-hidden className="sunbeam sunbeam-b" />
        <div aria-hidden className="grain" />
        <div aria-hidden className="motes">{Array.from({ length: 14 }).map((_, n) => <span key={n} style={{ left: `${(n * 37 + 8) % 100}%`, animationDelay: `${(n * 1.7) % 11}s`, animationDuration: `${14 + (n % 5) * 3}s`, width: `${2 + (n % 3)}px`, height: `${2 + (n % 3)}px` }} />)}</div>

        <motion.div aria-hidden initial={reduced ? false : { opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.6, ease }} className="absolute bottom-32 right-8 z-10 hidden xl:block">
          <div className="coin3d grid h-24 w-24 place-items-center rounded-full border border-gold/70 bg-moss/90 text-center text-ivory shadow-xl backdrop-blur sm:h-32 sm:w-32"><p className="font-display text-sm leading-tight sm:text-lg">Curated<br />for Modern<br />Living</p></div>
        </motion.div>

        <div className="container-x relative flex flex-1 items-center py-10 sm:py-14">
          <motion.div className="max-w-2xl [transform-style:preserve-3d]" style={{ x: reduced ? 0 : textX, y: reduced ? 0 : textY }} aria-live="polite">
            <h1 key={scene.id} className="text-[clamp(2.7rem,6vw,5.6rem)] leading-[1] tracking-tight text-ivory">
              <Words text={scene.title} delay={0} reduced={reduced} />
            </h1>
            <motion.p key={`${scene.id}-l`} initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.25, ease }} className="mt-6 max-w-md text-base leading-relaxed text-ivory/90 sm:text-lg">{scene.line}</motion.p>
            <motion.div key={`${scene.id}-c`} initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.35, ease }} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap [&>a]:w-full sm:[&>a]:w-auto">
              <Magnetic to={scene.to} className="btn-royal group">{scene.cta}<span className="chip"><ArrowRight size={15} /></span></Magnetic>
            </motion.div>
          </motion.div>
          <button onClick={down} aria-label="Scroll down" className="absolute bottom-3 right-6 hidden flex-col items-center gap-2 text-ivory/80 lg:flex"><span className="grid h-9 w-6 justify-center rounded-full border border-ivory/60 pt-1.5"><span className="h-2 w-1 animate-bounce rounded-full bg-ivory/80" /></span></button>
        </div>

        <ul className="relative grid grid-cols-2 gap-x-4 gap-y-4 border-t border-gold/40 bg-espresso/80 px-5 py-4 backdrop-blur-md sm:px-10 lg:grid-cols-4 lg:px-[max(2.5rem,calc((100vw-80rem)/2))]">
          {BENEFITS.map(({ i: Icon, t, d }) => (
            <li key={t} className="flex items-center gap-3 lg:border-r lg:border-ivory/15 lg:last:border-0"><Icon size={26} strokeWidth={1.2} className="shrink-0 text-gold" aria-hidden /><div><p className="text-sm text-ivory">{t}</p><p className="text-xs text-ivory/65">{d}</p></div></li>
          ))}
        </ul>
      </section>
      <OfferPopup watch={root} />
    </>
  );
}
