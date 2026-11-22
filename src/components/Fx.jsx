import { useEffect, useRef, useState } from 'react';

const calm = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Thin gold reading-progress line at the very top of the page.
export function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    let raf = 0;
    const tick = () => { raf = 0; const h = document.documentElement.scrollHeight - innerHeight; if (ref.current) ref.current.style.transform = `scaleX(${h > 0 ? Math.min(1, scrollY / h) : 0})`; };
    const on = () => { if (!raf) raf = requestAnimationFrame(tick); };
    addEventListener('scroll', on, { passive: true }); on();
    return () => { removeEventListener('scroll', on); if (raf) cancelAnimationFrame(raf); };
  }, []);
  return <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[80] h-[2px]"><div ref={ref} className="h-full origin-left scale-x-0 bg-gradient-to-r from-gold via-moss to-gold" /></div>;
}

// Desktop only: a soft gold ring that trails the pointer and swells over links and buttons.
export function CursorRing() {
  const ring = useRef(null);
  useEffect(() => {
    if (!fine() || calm()) return undefined;
    const el = ring.current; let x = -100; let y = -100; let tx = -100; let ty = -100; let raf = 0; let big = false;
    const loop = () => { x += (tx - x) * 0.2; y += (ty - y) * 0.2; el.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%) scale(${big ? 1.9 : 1})`; raf = requestAnimationFrame(loop); };
    const move = (e) => { tx = e.clientX; ty = e.clientY; el.style.opacity = '1'; big = !!e.target.closest?.('a,button,[role=tab],input,select,label'); };
    const out = () => { el.style.opacity = '0'; };
    addEventListener('pointermove', move, { passive: true }); document.addEventListener('mouseleave', out); raf = requestAnimationFrame(loop);
    return () => { removeEventListener('pointermove', move); document.removeEventListener('mouseleave', out); cancelAnimationFrame(raf); };
  }, []);
  return <div ref={ring} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[90] hidden h-7 w-7 rounded-full border border-gold bg-gold/10 opacity-0 mix-blend-multiply transition-[opacity] duration-300 [@media(hover:hover)_and_(pointer:fine)]:block" />;
}

// 3D lean toward the pointer for tiles (touch and reduced motion: static).
export function Tilt({ children, className = '', max = 9 }) {
  const ref = useRef(null);
  const move = (e) => {
    if (e.pointerType === 'touch' || calm() || !ref.current) return;
    const r = ref.current.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width - 0.5; const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateY(${(x * max).toFixed(2)}deg) rotateX(${(-y * max).toFixed(2)}deg) translateZ(0)`;
  };
  return <div className={`[perspective:900px] ${className}`}><div ref={ref} onPointerMove={move} onPointerLeave={() => { if (ref.current) ref.current.style.transform = ''; }} className="h-full transition-transform duration-300 ease-out will-change-transform">{children}</div></div>;
}

// Counts up once when scrolled into view.
export function CountUp({ to, suffix = '' }) {
  const ref = useRef(null); const [n, setN] = useState(calm() ? to : 0);
  useEffect(() => {
    if (calm() || !ref.current || typeof IntersectionObserver === 'undefined') { setN(to); return undefined; }
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect(); const t0 = performance.now();
      const step = (t) => { const k = Math.min(1, (t - t0) / 1400); setN(Math.round(to * (1 - (1 - k) ** 3))); if (k < 1) raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(ref.current); return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}
