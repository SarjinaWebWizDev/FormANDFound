import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Scale } from 'lucide-react';
import SafeImage from './SafeImage';
import PriceTag from './PriceTag';
import { useStore } from '../context/StoreContext';

// Premium catalogue card: whole card is a link, second image crossfades on hover (when the piece has one),
// subtle 3D lean toward the pointer (disabled for touch and reduced motion).
export default function ProductCard({ p, index = 0 }) {
  const ref = useRef(null);
  const [pop, setPop] = useState(0);
  const { wishlist, toggleWish, compare, toggleCompare } = useStore();
  const move = (e) => {
    if (e.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5; const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `translateY(-4px) rotateY(${(x * 8).toFixed(2)}deg) rotateX(${(-y * 8).toFixed(2)}deg) translateZ(0)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ''; };
  const wished = wishlist.includes(p.id); const cmp = compare.includes(p.id);
  const alt = p.variants.map((v) => v.image).find((i) => i && i !== p.image);
  const material = (p.material || '').split(',')[0];
  return (
    <div className="tilt-wrap group min-w-0 rise" style={{ animationDelay: `${Math.min(index, 11) * 55}ms` }}>
      <div ref={ref} onPointerMove={move} onPointerLeave={leave} className="tilt-card relative bg-ivory">
        <Link to={`/product/${p.slug}`} className="block" aria-label={`${p.name}, ${p.category}`}>
          <div className="relative aspect-[4/5] overflow-hidden bg-beige">
            <SafeImage src={p.image} alt={p.name} className={`h-full w-full transition duration-[700ms] ease-out group-hover:scale-[1.05] ${alt ? 'group-hover:opacity-0' : ''}`} />
            {alt && <SafeImage src={alt} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-[1.02] opacity-0 transition duration-[700ms] ease-out group-hover:scale-105 group-hover:opacity-100" />}
            <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
              {p.salePct > 0 && <span className="bg-cherry px-2 py-1 text-[10px] uppercase tracking-widest text-white">{p.salePct}% off</span>}
              {p.isNew && <span className="bg-espresso/90 px-2 py-1 text-[10px] uppercase tracking-widest text-ivory">New</span>}
              {p.bestseller && <span className="border border-gold/60 bg-ivory/90 px-2 py-1 text-[10px] uppercase tracking-widest text-walnut">Bestseller</span>}
            </div>
          </div>
          <div className="tilt-pop pt-4">
            <p className="text-[11px] uppercase tracking-[0.18em] text-espresso/50">{p.category}{material ? <span className="normal-case tracking-normal"> · {material}</span> : null}</p>
            <h3 className="mt-1 break-words text-lg leading-tight sm:text-xl">{p.name}</h3>
            <PriceTag price={p.price} mrp={p.mrp} className="mt-1 flex-wrap text-sm" />
            {p.variants.length > 1 && <div className="mt-2 flex gap-1">{p.variants.slice(0, 4).map((v) => <span key={v.name} title={v.name} className="h-3 w-3 rounded-full border border-espresso/20" style={{ background: v.color }} />)}</div>}
          </div>
        </Link>
        <div className="absolute right-3 top-3 flex flex-col gap-2">
          <button aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'} aria-pressed={wished} onClick={() => { toggleWish(p.id); setPop((n) => n + 1); }} className="grid h-10 w-10 place-items-center rounded-full bg-ivory/90 shadow-sm backdrop-blur transition duration-300 hover:scale-105 hover:bg-ivory"><Heart key={pop} size={16} className={`${pop ? 'heartpop' : ''} ${wished ? 'fill-cherry text-cherry' : ''}`} /></button>
          <button aria-label={cmp ? 'Remove from compare' : 'Add to compare'} aria-pressed={cmp} onClick={() => toggleCompare(p.id)} className={`grid h-10 w-10 place-items-center rounded-full shadow-sm transition duration-300 hover:scale-105 ${cmp ? 'bg-espresso text-ivory' : 'bg-ivory/90 hover:bg-ivory'}`}><Scale size={15} /></button>
        </div>
      </div>
    </div>
  );
}
