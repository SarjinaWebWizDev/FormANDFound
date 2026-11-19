import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Gift, X } from 'lucide-react';
import { livePromotions } from '../data/offers';

const KEY = 'ff-offer-popup-closed';
const read = () => { try { return sessionStorage.getItem(KEY) === '1'; } catch { return false; } };
const write = () => { try { sessionStorage.setItem(KEY, '1'); } catch { /* storage may be blocked */ } };

// A highlighted popup that cycles through the live offers. It is position: fixed, so it never pushes the hero layout.
// It is shown only while the hero (the `watch` ref) is on screen.
export default function OfferPopup({ watch }) {
  const live = livePromotions(); const has = (id) => live.some((p) => p.id === id);
  const slides = [
    has('welcome-privilege') && { tag: 'Welcome offer', title: '10% off your first order', sub: 'Use the code at checkout', code: 'FIRST10', to: '/shop', cta: 'Shop now' },
    has('curated-room-privilege') && { tag: 'Room sets', title: '12% off curated room sets', sub: '5% off automatically, 12% with the code', code: 'ROOM12', to: '/offers', cta: 'See sets' },
    has('complimentary-delivery') && { tag: 'Delivery', title: 'Complimentary delivery', sub: 'On orders above ₹10,000', to: '/shop', cta: 'Start shopping' },
    has('seasonal-edit') && { tag: 'Seasonal Edit', title: 'The Art of Living, Considered', sub: 'Pieces chosen for the season', to: '/collections', cta: 'Explore' },
  ].filter(Boolean);
  const [i, setI] = useState(0); const [closed, setClosed] = useState(read); const [inView, setInView] = useState(true);
  const [paused, setPaused] = useState(false); const [copied, setCopied] = useState('');
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 1500); return () => clearTimeout(t); }, []);
  useEffect(() => {
    if (!watch?.current || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.05 });
    io.observe(watch.current); return () => io.disconnect();
  }, [watch]);
  useEffect(() => {
    if (paused || slides.length < 2) return undefined;
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), 4500); return () => clearTimeout(t);
  }, [i, paused, slides.length]);
  if (!slides.length) return null;
  const s = slides[i % slides.length];
  const copy = async (c) => { try { await navigator.clipboard.writeText(c); } catch { /* clipboard may be blocked */ } setCopied(c); setTimeout(() => setCopied(''), 2000); };
  const reopen = () => { try { sessionStorage.removeItem(KEY); } catch { /* ignore */ } setClosed(false); setInView(true); };
  const showPill = ready && (closed || !inView);
  return (
    <>
    {/* Closing the card never removes the offers: it folds into this pill, which stays on screen and re-opens them. */}
    <AnimatePresence>
      {showPill && (
        <motion.button key="offer-pill" onClick={reopen} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.4 }}
          aria-label={`Show ${slides.length} current offers`} className="fixed bottom-4 left-4 z-50 flex items-center gap-2 border border-gold bg-espresso py-2 pl-3 pr-4 text-xs uppercase tracking-[0.16em] text-ivory shadow-[0_10px_30px_-8px_rgba(0,0,0,.55)] transition hover:bg-walnut sm:bottom-6 sm:left-6">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-70" /><span className="relative inline-flex h-2 w-2 rounded-full bg-gold" /></span><Gift size={14} className="text-gold" aria-hidden /> {slides.length} offers
        </motion.button>
      )}
    </AnimatePresence>
    <AnimatePresence>
      {ready && inView && !closed && (
        <motion.aside key="offer-popup" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}
          aria-label="Current offers" className="fixed inset-x-3 bottom-3 z-50 overflow-hidden border-2 border-gold bg-espresso text-ivory shadow-[0_0_0_5px_rgba(180,154,112,.22),0_24px_60px_-12px_rgba(0,0,0,.55)] sm:inset-x-auto sm:bottom-auto sm:left-auto sm:right-6 sm:top-[5.25rem] sm:w-[370px]">
          <button onClick={() => { write(); setClosed(true); }} aria-label="Minimise offers" className="absolute right-1.5 top-1.5 z-10 grid h-8 w-8 place-items-center text-ivory/70 hover:text-ivory"><X size={15} /></button>
          <div className="flex min-h-[112px] items-stretch">
            <div aria-hidden className="grid w-14 shrink-0 place-items-center bg-gold text-espresso"><Gift size={22} /></div>
            <div className="min-w-0 flex-1 px-4 py-3 pr-9" aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.div key={s.title} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.3 }}>
                  <p className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-gold"><span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-70" /><span className="relative inline-flex h-2 w-2 rounded-full bg-gold" /></span>{s.tag}</p>
                  <p className="mt-1 font-display text-xl leading-tight sm:text-[1.4rem]">{s.title}</p>
                  <p className="mt-0.5 text-xs text-ivory/65">{s.sub}</p>
                  <div className="mt-2.5 flex flex-wrap items-center gap-2">
                    {s.code && <button onClick={() => copy(s.code)} aria-label={`Copy code ${s.code}`} className="flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-[11px] font-semibold tracking-[0.16em] text-espresso transition hover:bg-ivory">{copied === s.code ? <><Check size={11} /> Copied</> : <>{s.code} <Copy size={11} /></>}</button>}
                    <Link to={s.to} className="text-xs underline underline-offset-4 hover:text-gold">{s.cta} →</Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
    </>
  );
}
