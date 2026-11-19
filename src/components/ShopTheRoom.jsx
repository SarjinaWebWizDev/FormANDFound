import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import SafeImage from './SafeImage';
import PriceTag from './PriceTag';
import { SHOP_THE_ROOM } from '../data/site';
import { getProduct } from '../data/products';

// Unique feature: tappable hotspots over a styled room board.
export default function ShopTheRoom() {
  const pins = SHOP_THE_ROOM.pins.map((p) => ({ ...p, product: getProduct(p.slug) })).filter((p) => p.product);
  const [open, setOpen] = useState(pins[0]?.slug); const cur = pins.find((p) => p.slug === open);
  return (
    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
      <div className="relative mx-auto w-full max-w-[420px] overflow-hidden bg-beige">
        <SafeImage src={SHOP_THE_ROOM.image} alt="A styled board of a lamp, vase, mirror, armchair, side table and rug" className="aspect-[2/3] w-full" />
        {pins.map((p) => (
          <button key={p.slug} aria-label={p.product.name} aria-pressed={open === p.slug} onClick={() => setOpen(p.slug)}
            className={`absolute grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-ivory shadow-lg transition ${open === p.slug ? 'scale-110 bg-cherry text-white' : 'bg-espresso/80 text-ivory hover:scale-110'}`} style={{ left: `${p.x}%`, top: `${p.y}%` }}><Plus size={14} /></button>))}
      </div>
      {cur && (
        <div className="min-w-0">
          <p className="eyebrow">Shop the room</p>
          <h2 className="mt-3 text-4xl md:text-5xl">Tap a piece to see it.</h2>
          <div className="mt-8 flex flex-col gap-5 border border-espresso/10 bg-ivory p-4 sm:flex-row">
            <SafeImage src={cur.product.image} alt={cur.product.name} className="h-52 w-full shrink-0 sm:h-40 sm:w-32" />
            <div><p className="text-[11px] uppercase tracking-[0.18em] text-espresso/50">{cur.product.category}</p><h3 className="text-2xl">{cur.product.name}</h3><PriceTag price={cur.product.price} mrp={cur.product.mrp} className="mt-1" /><p className="mt-2 text-sm text-espresso/70">{cur.product.description}</p><Link to={`/product/${cur.product.slug}`} className="btn-dark mt-4">View piece</Link></div>
          </div>
          <div role="tablist" aria-label="Pieces in this room" className="-mx-4 mt-4 flex snap-x flex-nowrap gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0">{pins.map((p) => <button key={p.slug} role="tab" aria-selected={open === p.slug} onClick={(e) => { setOpen(p.slug); const b = e.currentTarget, c = b.parentElement; c.scrollTo({ left: b.offsetLeft - (c.clientWidth - b.offsetWidth) / 2, behavior: 'smooth' }); }} className={`chip min-h-[40px] shrink-0 snap-start whitespace-nowrap ${open === p.slug ? 'chip-on' : ''}`}>{p.product.name}</button>)}</div>
        </div>
      )}
    </div>
  );
}
