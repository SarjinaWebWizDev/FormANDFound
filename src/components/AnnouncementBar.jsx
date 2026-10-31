import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { livePromotions } from '../data/offers';

// One message at a time. Offer messages come from the promotion config and only show while live.
function useMessages() {
  const live = livePromotions();
  const has = (id) => live.some((p) => p.id === id);
  const list = [{ t: 'Thoughtfully selected pieces for spaces that feel like you.', to: '/shop' }];
  if (has('complimentary-delivery')) list.push({ t: 'Complimentary delivery on orders above ₹10,000.', to: '/offers' });
  if (has('welcome-privilege')) list.push({ t: 'Welcome Privilege: 10% off your first eligible order with FIRST10.', to: '/offers' });
  if (has('curated-room-privilege')) list.push({ t: 'Curated Room Privilege: 12% off eligible room sets with ROOM12.', to: '/offers' });
  if (has('seasonal-edit')) list.push({ t: 'The Art of Living, Considered — the Seasonal Edit.', to: '/collections' });
  return list;
}
export default function AnnouncementBar() {
  const msgs = useMessages(); const [i, setI] = useState(0); const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || msgs.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => setI((x) => (x + 1) % msgs.length), 5000); return () => clearInterval(t);
  }, [paused, msgs.length]);
  const m = msgs[i % msgs.length];
  return (
    <div className="bg-espresso text-ivory" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <div className="container-x flex min-h-9 items-center justify-between py-1.5 text-[11px] sm:text-xs">
        <button aria-label="Previous message" className="-mx-2 grid h-9 w-9 place-items-center opacity-60 hover:opacity-100" onClick={() => setI((x) => (x - 1 + msgs.length) % msgs.length)}><ChevronLeft size={14} /></button>
        <p aria-live="polite" className="px-2 text-center leading-snug tracking-wide"><Link to={m.to} className="hover:underline">{m.t}</Link></p>
        <button aria-label="Next message" className="-mx-2 grid h-9 w-9 place-items-center opacity-60 hover:opacity-100" onClick={() => setI((x) => (x + 1) % msgs.length)}><ChevronRight size={14} /></button>
      </div>
    </div>
  );
}
