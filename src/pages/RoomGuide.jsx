import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SafeImage from '../components/SafeImage';
import { ROOMS } from '../data/site';
import { roomGuide } from '../data/roomGuide';
import NotFoundMsg from '../components/NotFoundMsg';

// Click a room, see everything that room needs, grouped by purpose.
export default function RoomGuide() {
  const { id } = useParams(); const room = ROOMS.find((r) => r.id === id);
  const [only, setOnly] = useState('');
  if (!room) return <NotFoundMsg />;
  const { total, groups } = roomGuide(room.id);
  const shown = only ? groups.filter((g) => g.id === only) : groups;
  return (
    <>
      <div className="relative isolate overflow-hidden bg-espresso text-ivory">
        <SafeImage src={room.image} alt="" className="absolute inset-0 -z-20 h-full w-full opacity-70" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-espresso/90 via-espresso/60 to-espresso/20" />
        <div className="container-x py-10 md:py-16">
          <p className="eyebrow rise !text-gold">Everything for the room</p>
          <h1 className="rise mt-3 text-[clamp(2.4rem,6vw,4.5rem)] leading-none" style={{ animationDelay: '80ms' }}>The complete {room.name.toLowerCase()}</h1>
          <p className="rise mt-4 max-w-xl text-ivory/80" style={{ animationDelay: '160ms' }}>{room.blurb} {total} pieces, grouped by what the room needs.</p>
          <div className="rise mt-6 flex flex-wrap gap-3" style={{ animationDelay: '240ms' }}>
            <Link to={`/design-your-space?room=${room.id}`} className="btn-light">Plan this room <ArrowRight size={15} className="ml-1 inline" /></Link>
            <Link to={`/shop?room=${room.id}`} className="btn-ghost-light">Browse as a list</Link>
          </div>
        </div>
      </div>
      <div className="border-b border-espresso/10 bg-ivory">
        <div className="container-x"><div role="tablist" aria-label="Sections" className="-mx-4 flex flex-nowrap gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
          <button role="tab" aria-selected={!only} onClick={() => setOnly('')} className={`fchip ${!only ? 'fchip-on' : ''}`}>All ({total})</button>
          {groups.map((g) => <button key={g.id} role="tab" aria-selected={only === g.id} onClick={() => setOnly(only === g.id ? '' : g.id)} className={`fchip ${only === g.id ? 'fchip-on' : ''}`}>{g.title.split(',')[0].split(' & ')[0]} <span className="ml-1.5 text-espresso/45">{g.items.length}</span></button>)}
        </div></div>
      </div>
      <div className="container-x space-y-14 py-10 md:space-y-20 md:py-14">
        {shown.map((g) => (
          <section key={g.id} aria-labelledby={`g-${g.id}`}>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-2 border-b border-espresso/10 pb-3"><div><h2 id={`g-${g.id}`} className="text-3xl md:text-4xl">{g.title}</h2>{g.note && <p className="mt-1 text-sm text-espresso/60">{g.note}</p>}</div><p className="text-sm text-espresso/50">{g.items.length} piece{g.items.length === 1 ? '' : 's'}</p></div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-3 xl:grid-cols-4">{g.items.slice(0, only ? 999 : 12).map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}</div>
            {!only && g.items.length > 12 && <button className="mt-6 text-sm underline underline-offset-4" onClick={() => setOnly(g.id)}>See all {g.items.length} {g.title.toLowerCase()}</button>}
          </section>
        ))}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-espresso/10 pt-8"><p className="text-espresso/70">Not sure where to start?</p><Link to={`/offers`} className="btn-dark">See curated room sets <ArrowRight size={15} className="ml-1 inline" /></Link></div>
      </div>
    </>
  );
}
