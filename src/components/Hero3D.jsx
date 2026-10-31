import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MoveHorizontal } from 'lucide-react';
import SafeImage from './SafeImage';
import { getProduct } from '../data/products';
import { formatINR } from '../utils/helpers';

const SLUGS = ['cherry-pod-chair', 'petal-back-chair', 'serpentine-bookshelf', 'liquid-chrome-table', 'cloud-boucle-stool', 'spiral-pedestal-table', 'walnut-shell-chaise', 'twisted-floor-vases'];
const N = SLUGS.length; const STEP = 360 / N;

// A rotating 3D gallery ring made with CSS 3D transforms. Drag to spin, move the pointer to tilt the scene.
// With prefers-reduced-motion the ring is static and can be turned with the arrow buttons.
export default function Hero3D() {
  const items = SLUGS.map(getProduct).filter(Boolean);
  const root = useRef(null); const stage = useRef(null); const ring = useRef(null); const panels = useRef([]);
  const st = useRef({ rot: 0, vel: 0, drag: false, lastX: 0, hover: false, reduced: false, front: 0 });
  const [dim, setDim] = useState({ w: 250, h: 340, R: 420 });
  const [front, setFront] = useState(0);
  const [reduced, setReduced] = useState(false);

  const box = useRef(null);
  // Size the ring from the width of its own column so it never runs into the headline.
  useEffect(() => {
    const fit = () => {
      const cw = box.current ? box.current.clientWidth : window.innerWidth;
      const R = Math.round(Math.min(420, Math.max(190, cw * 0.6))); const w = Math.round(Math.min(250, R * 0.6));
      setDim({ w, h: Math.round(w * 1.36), R });
    };
    fit();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(fit) : null;
    if (ro && box.current) ro.observe(box.current); window.addEventListener('resize', fit);
    return () => { window.removeEventListener('resize', fit); ro && ro.disconnect(); };
  }, []);

  const apply = () => {
    const s = st.current; if (!ring.current) return;
    ring.current.style.transform = `translateZ(${-dim.R}px) rotateY(${s.rot}deg)`;
    panels.current.forEach((el, i) => {
      if (!el) return;
      const a = ((((i * STEP + s.rot) % 360) + 540) % 360) - 180; // -180..180, 0 = facing the viewer
      const f = (Math.cos((a * Math.PI) / 180) + 1) / 2;
      el.style.opacity = (0.28 + 0.72 * f).toFixed(3);
      el.style.filter = `saturate(${(0.55 + 0.45 * f).toFixed(2)})`;
    });
    const idx = (((Math.round(-s.rot / STEP)) % N) + N) % N;
    if (idx !== s.front) { s.front = idx; setFront(idx); }
  };

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    st.current.reduced = mq.matches; setReduced(mq.matches);
    let raf; let last = performance.now();
    const loop = (t) => {
      const s = st.current; const dt = Math.min(48, t - last); last = t;
      if (!s.reduced) {
        if (!s.drag) { s.vel *= 0.94; s.rot += (s.hover ? 0.004 : 0.018) * dt + s.vel; }
        apply();
      }
      raf = requestAnimationFrame(loop);
    };
    apply(); raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [dim]);

  const onMove = (e) => {
    const r = root.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5; const y = (e.clientY - r.top) / r.height - 0.5;
    if (stage.current && !st.current.reduced) stage.current.style.transform = `rotateX(${(-7 - y * 8).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg)`;
    root.current.style.setProperty('--mx', x.toFixed(3)); root.current.style.setProperty('--my', y.toFixed(3));
    const s = st.current;
    if (s.drag) { const dx = e.clientX - s.lastX; s.lastX = e.clientX; s.rot += dx * 0.35; s.vel = dx * 0.12; apply(); }
  };
  const down = (e) => { st.current.drag = true; st.current.lastX = e.clientX; e.currentTarget.setPointerCapture?.(e.pointerId); };
  const up = () => { st.current.drag = false; };
  const turn = (dir) => { st.current.rot -= dir * STEP; apply(); };

  const cur = items[front] || items[0];
  const par = (k) => ({ transform: `translate3d(calc(var(--mx,0) * ${k}px), calc(var(--my,0) * ${k}px), 0)` });

  return (
    <section ref={root} onPointerMove={onMove} className="relative overflow-hidden bg-gradient-to-b from-ivory via-ivory to-beige [contain:paint]" aria-label="Featured pieces">
      {/* depth layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="layer3d absolute -left-24 top-10 h-80 w-80 rounded-full bg-sage/40 blur-3xl drift" style={par(-30)} />
        <div className="layer3d absolute right-[-6rem] top-1/3 h-96 w-96 rounded-full bg-gold/30 blur-3xl drift" style={{ ...par(40), animationDelay: '-6s' }} />
        <div className="layer3d absolute inset-x-0 top-1/2 -translate-y-1/2 select-none whitespace-nowrap text-center font-display text-[22vw] font-medium leading-none tracking-tight text-transparent" style={{ ...par(18), WebkitTextStroke: '1px rgba(98,70,52,.14)' }}>FORM &amp; FOUND</div>
      </div>

      <div className="container-x relative grid items-center gap-6 py-10 sm:py-14 lg:min-h-[calc(100svh-8.5rem)] lg:grid-cols-[1fr_1.15fr] lg:py-0">
        <div className="relative z-10 max-w-xl">
          <p className="eyebrow">The Considered Home Event</p>
          <h1 className="mt-5 text-[clamp(2.7rem,9.5vw,4.6rem)] leading-[0.97] lg:text-[clamp(3.6rem,5.2vw,5.6rem)] 2xl:text-[6.4rem]">Furniture with a <em className="text-walnut">sense of place.</em></h1>
          <p className="mt-6 max-w-md text-lg text-espresso/70">Thoughtfully selected pieces for spaces that feel like you. Enjoy selected privileges on eligible furniture and curated room collections.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap [&>a]:w-full sm:[&>a]:w-auto">
            <Link to="/offers" className="btn-dark">Explore the Edit <ArrowRight size={15} /></Link>
            <Link to="/design-your-space" className="btn-ghost">Design your space</Link>
          </div>
          <div className="mt-10 flex items-center gap-4 text-xs text-espresso/60">
            <span className="flex items-center gap-2"><MoveHorizontal size={14} /> {reduced ? 'Use the arrows to turn the ring' : 'Drag the ring to spin it'}</span>
          </div>
        </div>

        <div ref={box} className="relative hero3d h-[400px] touch-pan-y sm:h-[500px] lg:h-[clamp(560px,72svh,760px)] 2xl:h-[820px]" onPointerDown={down} onPointerUp={up} onPointerCancel={up} onPointerLeave={() => { st.current.hover = false; up(); }} onPointerEnter={() => { st.current.hover = true; }} style={{ cursor: 'grab' }}>
          <div ref={stage} className="stage3d absolute inset-0" style={{ transform: 'rotateX(-7deg)' }}>
            <div className="absolute left-1/2 top-1/2" style={{ transformStyle: 'preserve-3d' }}>
              <div ref={ring} className="ring3d" style={{ transform: `translateZ(${-dim.R}px)` }}>
                {items.map((p, i) => (
                  <Link key={p.id} to={`/product/${p.slug}`} draggable={false} aria-label={`${p.name}, ${formatINR(p.price)}`} ref={(el) => { panels.current[i] = el; }}
                    className="panel3d block overflow-hidden bg-ivory shadow-[0_30px_60px_-25px_rgba(48,37,31,.55)]"
                    style={{ width: dim.w, height: dim.h, marginLeft: -dim.w / 2, marginTop: -dim.h / 2, transform: `rotateY(${i * STEP}deg) translateZ(${dim.R}px)` }}>
                    <SafeImage src={p.image} alt={p.name} draggable={false} loading="eager" className="h-full w-full select-none" />
                  </Link>
                ))}
              </div>
            </div>
            <div aria-hidden className="absolute left-1/2 top-[88%] h-10 w-[70%] -translate-x-1/2 rounded-[50%] bg-espresso/25 blur-2xl" />
          </div>

          <div className="absolute bottom-2 left-1/2 z-10 w-[min(92%,340px)] -translate-x-1/2 border border-espresso/10 bg-ivory/90 px-4 py-3 text-sm shadow-lg backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0"><p className="text-[10px] uppercase tracking-[0.2em] text-espresso/50">Now showing</p><p className="font-display text-lg leading-tight sm:text-xl">{cur.name}</p></div>
              <div className="flex shrink-0 items-center gap-3"><span className="font-medium">{formatINR(cur.price)}</span><Link to={`/product/${cur.slug}`} className="grid h-10 w-10 place-items-center rounded-full bg-espresso text-ivory" aria-label={`View ${cur.name}`}><ArrowRight size={14} /></Link></div>
            </div>
          </div>
          {reduced && (<div className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 justify-between px-2"><button className="btn-ghost !px-3" onClick={() => turn(-1)} aria-label="Previous piece">‹</button><button className="btn-ghost !px-3" onClick={() => turn(1)} aria-label="Next piece">›</button></div>)}
        </div>
      </div>
    </section>
  );
}
