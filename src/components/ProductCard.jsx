import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Scale } from 'lucide-react';
import SafeImage from './SafeImage';
import PriceTag from './PriceTag';
import { useStore } from '../context/StoreContext';

// 3D tilt: the card leans toward the pointer. Disabled for touch and reduced motion.
export default function ProductCard({ p }) {
  const ref = useRef(null);
  const { wishlist, toggleWish, compare, toggleCompare } = useStore();
  const move = (e) => {
    if (e.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5; const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `rotateY(${(x * 10).toFixed(2)}deg) rotateX(${(-y * 10).toFixed(2)}deg) translateZ(0)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ''; };
  const wished = wishlist.includes(p.id); const cmp = compare.includes(p.id);
  return (
    <div className="tilt-wrap group min-w-0">
      <div ref={ref} onPointerMove={move} onPointerLeave={leave} className="tilt-card relative bg-ivory">
        <Link to={`/product/${p.slug}`} className="block">
          <div className="relative aspect-[4/5] overflow-hidden bg-beige">
            <SafeImage src={p.image} alt={p.name} className="h-full w-full transition duration-700 group-hover:scale-105" />
            <div className="absolute left-3 top-3 flex flex-col gap-1">
              {p.salePct > 0 && <span className="bg-cherry px-2 py-1 text-[10px] uppercase tracking-widest text-white">{p.salePct}% off</span>}
              {p.isNew && <span className="bg-espresso px-2 py-1 text-[10px] uppercase tracking-widest text-ivory">New</span>}
            </div>
          </div>
          <div className="tilt-pop pt-4">
            <p className="text-[11px] uppercase tracking-[0.18em] text-espresso/50">{p.category}</p>
            <h3 className="mt-1 break-words text-lg leading-tight sm:text-xl">{p.name}</h3>
            <PriceTag price={p.price} mrp={p.mrp} className="mt-1 flex-wrap text-sm" />
            {p.variants.length > 1 && <div className="mt-2 flex gap-1">{p.variants.slice(0, 4).map((v) => <span key={v.name} title={v.name} className="h-3 w-3 rounded-full border border-espresso/20" style={{ background: v.color }} />)}</div>}
          </div>
        </Link>
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'} aria-pressed={wished} onClick={() => toggleWish(p.id)} className="grid h-10 w-10 place-items-center rounded-full bg-ivory/90 shadow hover:bg-ivory"><Heart size={16} className={wished ? 'fill-cherry text-cherry' : ''} /></button>
          <button aria-label={cmp ? 'Remove from compare' : 'Add to compare'} aria-pressed={cmp} onClick={() => toggleCompare(p.id)} className={`grid h-10 w-10 place-items-center rounded-full shadow ${cmp ? 'bg-espresso text-ivory' : 'bg-ivory/90 hover:bg-ivory'}`}><Scale size={15} /></button>
        </div>
      </div>
    </div>
  );
}
