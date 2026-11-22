import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Copy } from 'lucide-react';
import SafeImage from '../components/SafeImage';
import ProductCard from '../components/ProductCard';
import { PageHeader, Section, SectionHead } from '../components/ui';
import { PROMOTIONS, promoState, BUNDLES, bundlePrice, SET_SAVING_PCT, getBundle } from '../data/offers';
import { getProduct, products } from '../data/products';
import { BANNERS } from '../data/site';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/helpers';

const ORDER = ['welcome-privilege', 'curated-room-privilege', 'complimentary-delivery', 'seasonal-edit', 'selected-pieces'];
const LETTER = { 'welcome-privilege': 'A', 'curated-room-privilege': 'B', 'complimentary-delivery': 'C', 'seasonal-edit': 'D', 'selected-pieces': 'E' };

export default function Offers() {
  const { addToCart, applyCoupon, notify } = useStore(); const [copied, setCopied] = useState('');
  const copy = async (c) => { try { await navigator.clipboard.writeText(c); } catch { /* clipboard unavailable */ } setCopied(c); applyCoupon(c); notify(`${c} saved — it will apply at the cart if eligible`); };
  const addSet = (id) => { getBundle(id).items.forEach(([slug, q]) => addToCart(getProduct(slug).id, getProduct(slug).variants[0]?.name || '', q, true)); notify('Room set added to your cart'); };
  const sale = products.filter((p) => p.salePct);
  return (
    <>
      <PageHeader eyebrow="The Considered Home Event" title="Selected privileges for considered homes." intro="Enjoy selected privileges on eligible furniture and curated room collections. Everything here is calculated by the same engine as your cart." />
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {ORDER.map((id) => { const p = PROMOTIONS.find((x) => x.id === id); const live = promoState(p) === 'live';
            return (<article key={id} className={`border p-7 ${live ? 'border-espresso/20 bg-beige/40' : 'border-espresso/10 opacity-60'}`}>
              <p className="eyebrow">Offer {LETTER[id]}</p><h2 className="mt-2 text-3xl">{p.title}</h2><p className="mt-2">{p.summary}</p>
              {p.code && <button onClick={() => copy(p.code)} className="mt-4 inline-flex items-center gap-2 border border-dashed border-walnut px-3 py-1.5 text-sm tracking-widest text-walnut">{copied === p.code ? <Check size={14} /> : <Copy size={14} />}{p.code}</button>}
              <p className="mt-4 text-xs text-espresso/60">{p.terms}</p>
              <p className="mt-2 text-xs">{live ? <span className="text-moss">Active{p.endsAt ? ` until ${new Date(p.endsAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}` : ''}</span> : <span className="text-cherry">Not currently active</span>}</p>
            </article>); })}
        </div>
      </Section>

      <section className="relative isolate overflow-hidden bg-espresso text-ivory"><SafeImage src={BANNERS.slow} alt="" className="absolute inset-0 -z-10 h-full w-full opacity-40" /><div className="container-x py-24"><p className="eyebrow !text-gold">Seasonal Edit</p><h2 className="mt-4 max-w-2xl text-5xl md:text-7xl">The Art of Living, Considered.</h2><Link to="/collections" className="btn-light mt-8">Explore the collections</Link></div></section>

      <Section id="sets">
        <SectionHead eyebrow="Curated room sets" title="Complete a room, save on the set." />
        <p className="-mt-6 mb-10 max-w-xl text-sm text-espresso/70">Add every piece of a set and save {SET_SAVING_PCT}% automatically — or 12% with ROOM12 (the code replaces the {SET_SAVING_PCT}%, they do not add up).</p>
        <div className="grid gap-6 md:grid-cols-2 md:[&>article:last-child:nth-child(odd)]:col-span-2">
          {BUNDLES.map((b) => { const base = bundlePrice(b); return (
            <article key={b.id} className="border border-espresso/15 bg-ivory"><div className="grid sm:grid-cols-[200px_minmax(0,1fr)] md:grid-cols-1 lg:grid-cols-[200px_minmax(0,1fr)]"><SafeImage src={b.image} alt={b.name} className="aspect-[4/3] h-full w-full sm:aspect-auto md:aspect-[4/3] lg:aspect-auto" />
              <div className="p-5"><h3 className="text-3xl">{b.name}</h3><p className="mt-1 text-sm text-espresso/70">{b.blurb}</p>
                <ul className="mt-3 space-y-0.5 text-sm">{b.items.map(([s, q]) => <li key={s}>{q} × <Link className="underline-offset-2 hover:underline" to={`/product/${s}`}>{getProduct(s).name}</Link></li>)}</ul>
                <p className="mt-3 text-sm">Set price {formatINR(base)} → <b>{formatINR(base - Math.round(base * SET_SAVING_PCT / 100))}</b> · with ROOM12 <b className="text-moss">{formatINR(base - Math.round(base * 0.12))}</b></p>
                <button className="btn-dark mt-4 !py-2" onClick={() => addSet(b.id)}>Add the set to cart</button></div></div></article>); })}
        </div>
      </Section>

      <Section className="!pt-0"><SectionHead eyebrow="Selected pieces" title="Up to 20% off." to="/shop?offer=1" /><div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">{sale.slice(0, 8).map((p) => <ProductCard key={p.id} p={p} />)}</div></Section>
    </>
  );
}
