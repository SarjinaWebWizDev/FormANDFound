import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Heart, Minus, Plus, Scale, Truck } from 'lucide-react';
import SafeImage from '../components/SafeImage';
import PriceTag from '../components/PriceTag';
import ProductCard from '../components/ProductCard';
import { getProduct, related } from '../data/products';
import { BUNDLES } from '../data/offers';
import { unitImage, unitPrice } from '../data/offers';
import { useStore } from '../context/StoreContext';
import { formatINR, FREE_DELIVERY_ABOVE } from '../utils/helpers';
import NotFoundMsg from '../components/NotFoundMsg';

export default function ProductPage() {
  const { slug } = useParams(); const p = getProduct(slug);
  const { addToCart, wishlist, toggleWish, compare, toggleCompare, viewed } = useStore();
  const [variant, setVariant] = useState(''); const [qty, setQty] = useState(1);
  useEffect(() => { if (p) { setVariant(p.variants[0]?.name || ''); setQty(1); viewed(p.id); } }, [p?.id]);
  if (!p) return <NotFoundMsg />;
  const unit = unitPrice(p, variant); const image = unitImage(p, variant);
  const mrp = p.mrp ? p.mrp + (unit - p.price) : null;
  const sets = BUNDLES.filter((b) => b.items.some(([s]) => s === p.slug));
  return (
    <>
      <div className="container-x py-4 text-xs text-espresso/60"><Link to="/">Home</Link> / <Link to={`/shop?category=${encodeURIComponent(p.category)}`}>{p.category}</Link> / {p.name}</div>
      <div className="container-x grid items-start gap-8 pb-16 md:grid-cols-2 lg:gap-12">
        <div className="bg-beige"><SafeImage key={image} src={image} alt={`${p.name}${variant ? ` — ${variant}` : ''}`} loading="eager" className="aspect-[4/5] w-full" /></div>
        <div className="md:py-2 lg:py-6">
          <p className="eyebrow">{p.category}</p>
          <h1 className="mt-3 text-4xl leading-[1.02] sm:text-5xl lg:text-6xl">{p.name}</h1>
          <PriceTag price={unit} mrp={mrp} className="mt-4 text-xl" />
          <p className="mt-5 max-w-lg text-espresso/75">{p.description}</p>
          {p.variants.length > 0 && (
            <fieldset className="mt-7"><legend className="eyebrow mb-3">Finish — <span className="normal-case tracking-normal text-espresso">{variant}</span></legend>
              <div className="flex flex-wrap gap-3">{p.variants.map((v) => (
                <button key={v.name} aria-pressed={variant === v.name} onClick={() => setVariant(v.name)} className={`flex items-center gap-2 border px-3 py-2 text-sm transition ${variant === v.name ? 'border-espresso bg-beige' : 'border-espresso/20 hover:border-espresso'}`}><i className="h-4 w-4 rounded-full border border-espresso/20" style={{ background: v.color }} />{v.name}{v.delta ? <span className="text-xs text-espresso/50">+{formatINR(v.delta)}</span> : null}</button>))}</div></fieldset>)}
          <div className="mt-8 space-y-3">
            <div className="flex items-stretch gap-3">
              <div className="flex shrink-0 items-center border border-espresso/25"><button aria-label="Decrease quantity" className="grid h-12 w-10 place-items-center" onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={14} /></button><span className="w-7 text-center">{qty}</span><button aria-label="Increase quantity" className="grid h-12 w-10 place-items-center" onClick={() => setQty(Math.min(20, qty + 1))}><Plus size={14} /></button></div>
              <button className="btn-dark min-w-0 flex-1 !px-4" onClick={() => addToCart(p.id, variant, qty)}>Add to cart — {formatINR(unit * qty)}</button>
            </div>
            <div className="flex gap-3">
              <button aria-pressed={wishlist.includes(p.id)} className="btn-ghost flex-1 !py-2.5" onClick={() => toggleWish(p.id)}><Heart size={16} className={wishlist.includes(p.id) ? 'fill-cherry text-cherry' : ''} /> {wishlist.includes(p.id) ? 'Saved' : 'Save'}</button>
              <button aria-pressed={compare.includes(p.id)} className={`btn-ghost flex-1 !py-2.5 ${compare.includes(p.id) ? '!bg-espresso !text-ivory' : ''}`} onClick={() => toggleCompare(p.id)}><Scale size={16} /> {compare.includes(p.id) ? 'In compare' : 'Compare'}</button>
            </div>
          </div>
          <p className="mt-4 flex items-center gap-2 text-sm text-espresso/70"><Truck size={15} /> Complimentary delivery above {formatINR(FREE_DELIVERY_ABOVE)}. {p.status === 'Made to order' ? 'Made to order.' : ''}</p>
          <dl className="mt-8 divide-y divide-espresso/10 border-y border-espresso/10 text-sm">
            {[['Material', p.material], ['Dimensions', p.dimensions], ['Availability', p.status], ['Care', p.care]].map(([k, v]) => (<div key={k} className="grid grid-cols-[110px_1fr] gap-4 py-3"><dt className="text-espresso/50">{k}</dt><dd>{v}</dd></div>))}
          </dl>
          {sets.length > 0 && <p className="mt-6 text-sm">Part of: {sets.map((b, i) => <span key={b.id}>{i ? ', ' : ''}<Link className="underline" to="/offers#sets">{b.name}</Link></span>)} — a complete set saves 5% (12% with ROOM12).</p>}
        </div>
      </div>
      <div className="container-x pb-20"><h2 className="mb-8 text-4xl">You may also like</h2><div className="grid grid-cols-2 gap-5 lg:grid-cols-4">{related(p).map((r) => <ProductCard key={r.id} p={r} />)}</div></div>
    </>
  );
}
