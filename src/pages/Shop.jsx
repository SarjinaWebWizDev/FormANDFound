import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check, ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import SafeImage from '../components/SafeImage';
import { products, CATEGORIES } from '../data/products';
import { ROOMS, STYLES } from '../data/site';
import { formatINR } from '../utils/helpers';

const PRICE = [['', 'Any price'], ['0-5000', 'Under ₹5,000'], ['0-15000', 'Under ₹15,000'], ['5000-25000', '₹5,000 – ₹25,000'], ['25000-75000', '₹25,000 – ₹75,000'], ['75000-', 'Over ₹75,000']];
const SORTS = [['featured', 'Featured'], ['new', 'Newest'], ['low', 'Price: low to high'], ['high', 'Price: high to low'], ['name', 'Name A–Z']];
const MATERIALS = ['Oak', 'Walnut', 'Stone', 'Travertine', 'Ceramic', 'Glass', 'Linen', 'Bouclé', 'Brass', 'Steel', 'Lacquer'];

export default function Shop() {
  const [sp, setSp] = useSearchParams(); const [open, setOpen] = useState(false);
  const f = { q: sp.get('q') || '', category: sp.get('category') || '', room: sp.get('room') || '', style: sp.get('style') || '', price: sp.get('price') || '', material: sp.get('material') || '', offer: sp.get('offer') === '1', sort: sp.get('sort') || 'featured', avail: sp.get('avail') || '', isNew: sp.get('new') === '1' };
  const set = (k, v) => { const n = new URLSearchParams(sp); if (v) n.set(k, v); else n.delete(k); setSp(n, { replace: true }); };
  const list = useMemo(() => {
    let r = products.filter((p) => {
      if (f.q && !`${p.name} ${p.category} ${p.material} ${p.description}`.toLowerCase().includes(f.q.toLowerCase())) return false;
      if (f.category && p.category !== f.category) return false;
      if (f.room && !p.rooms.includes(f.room)) return false;
      if (f.style && !p.styles.includes(f.style)) return false;
      if (f.material && !`${p.material} ${p.name}`.toLowerCase().includes(f.material.toLowerCase())) return false;
      if (f.offer && !p.salePct) return false;
      if (f.isNew && !p.isNew) return false;
      if (f.avail === 'ready' && p.status !== 'Available') return false;
      if (f.price) { const [a, b] = f.price.split('-'); if (p.price < Number(a || 0) || (b && p.price > Number(b))) return false; }
      return true;
    });
    const s = { low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, name: (a, b) => a.name.localeCompare(b.name), new: (a, b) => Number(b.isNew) - Number(a.isNew) || b.order - a.order, featured: (a, b) => Number(b.bestseller) - Number(a.bestseller) || a.order - b.order }[f.sort] || ((a, b) => a.order - b.order);
    return [...r].sort(s);
  }, [sp]);
  const active = ['q', 'category', 'room', 'style', 'price', 'material', 'offer', 'avail', 'new'].filter((k) => sp.get(k));
  const labelOf = (k, v) => ({ category: v, q: `“${v}”`, room: ROOMS.find((r) => r.id === v)?.name, style: STYLES.find((x) => x.id === v)?.name, price: PRICE.find(([x]) => x === v)?.[1] || `${v.split('-')[0] ? formatINR(Number(v.split('-')[0])) : 'Up'} – ${v.split('-')[1] ? formatINR(Number(v.split('-')[1])) : 'any'}`, material: v, offer: 'On offer', avail: 'Ready to ship', new: 'New arrivals' }[k] || v);
  const toggle = (k, v) => set(k, sp.get(k) === v ? '' : v);
  const [lo, hi] = (f.price || '-').split('-');
  const setRange = (l, h) => set('price', l || h ? `${l}-${h}` : '');
  const Chip = ({ k, v, children }) => { const on = sp.get(k) === v; return <button role="tab" aria-selected={on} onClick={() => toggle(k, v)} className={`fchip ${on ? 'fchip-on' : ''}`}>{children}</button>; };
  const Row = ({ label, children }) => (<div className="flex items-center gap-5"><span className="eyebrow hidden w-24 shrink-0 md:block">{label}</span><div role="tablist" aria-label={label} className="-mx-4 flex min-w-0 flex-1 flex-nowrap gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">{children}</div></div>);
  const Sec = ({ title, children }) => (<div><p className="eyebrow mb-3">{title}</p>{children}</div>);
  const tog = (k, v, on, text) => <button key={text} aria-pressed={on} onClick={() => toggle(k, v)} className={`fchip ${on ? 'fchip-on' : ''}`}>{text}</button>;
  const more = (<div className="space-y-9">
    <Sec title="Material"><div className="flex flex-wrap gap-2">{MATERIALS.map((m) => tog('material', m, sp.get('material') === m, m))}</div></Sec>
    <Sec title="Price"><div className="flex flex-wrap gap-2">{PRICE.filter(([v]) => v).map(([v, t]) => tog('price', v, sp.get('price') === v, t))}</div>
      <div className="mt-4 grid grid-cols-2 gap-3"><label className="text-xs text-espresso/60">Min (₹)<input inputMode="numeric" className="field mt-1" placeholder="0" value={lo || ''} onChange={(e) => setRange(e.target.value.replace(/\D/g, ''), hi || '')} /></label><label className="text-xs text-espresso/60">Max (₹)<input inputMode="numeric" className="field mt-1" placeholder="Any" value={hi || ''} onChange={(e) => setRange(lo || '', e.target.value.replace(/\D/g, ''))} /></label></div></Sec>
    <Sec title="Availability"><div className="flex flex-wrap gap-2">{tog('avail', 'ready', f.avail === 'ready', 'Ready to ship')}{tog('offer', '1', f.offer, 'On offer')}{tog('new', '1', f.isNew, 'New arrivals')}</div></Sec>
  </div>);
  const moreCount = ['material', 'price', 'avail'].filter((k) => sp.get(k)).length;
  return (
    <>
      <div className="relative overflow-hidden border-b border-espresso/10 bg-beige/50">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />
        <div className="container-x relative flex flex-wrap items-end justify-between gap-x-8 gap-y-2 py-8 md:py-12">
          <div>
            <p className="eyebrow rise mb-3 flex items-center gap-3">The collection <span aria-hidden="true" className="h-px w-10 bg-walnut/40" /></p>
            <h1 className="rise max-w-3xl font-display text-[clamp(2.6rem,6.5vw,4.75rem)] font-normal leading-[1] tracking-tight" style={{ animationDelay: '80ms' }}>{f.category || 'All pieces'}</h1>
          </div>
          <p className="rise pb-1 text-sm tracking-wide text-espresso/55" style={{ animationDelay: '160ms' }}>{list.length} piece{list.length === 1 ? '' : 's'}{f.q ? ` for “${f.q}”` : ''}</p>
        </div>
      </div>
      <div className="container-x py-8 md:py-12">
        <section aria-label="Find your piece" className="mb-9 space-y-5">
          <div role="tablist" aria-label="Room" className="-mx-4 flex flex-nowrap gap-3 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
            <button role="tab" aria-selected={!f.room} onClick={() => set('room', '')} className={`group relative grid h-28 w-36 shrink-0 place-items-center overflow-hidden border font-display text-lg transition-colors duration-300 md:h-36 md:w-52 md:text-xl ${!f.room ? 'border-espresso bg-espresso text-ivory' : 'border-espresso/15 bg-beige/40 hover:border-espresso/50'}`}>All rooms</button>
            {ROOMS.map((r) => { const on = f.room === r.id; return (
              <button key={r.id} role="tab" aria-selected={on} aria-label={r.name} onClick={() => toggle('room', r.id)} className={`group relative h-28 w-36 shrink-0 overflow-hidden border transition-colors duration-300 md:h-36 md:w-52 ${on ? 'border-espresso' : 'border-espresso/15'}`}>
                <SafeImage src={r.image} alt="" className="absolute inset-0 h-full w-full transition duration-[900ms] ease-out group-hover:scale-110" />
                <span className={`absolute inset-0 transition-colors duration-500 ${on ? 'bg-espresso/70' : 'bg-gradient-to-t from-espresso/70 via-espresso/25 to-espresso/10 group-hover:from-espresso/80'}`} />
                <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3 text-left font-display text-lg leading-none text-ivory md:text-xl">{r.name}{on && <span className="grid h-5 w-5 place-items-center rounded-full bg-ivory text-espresso"><Check size={12} /></span>}</span>
                <span className={`absolute inset-x-0 bottom-0 h-[3px] bg-gold transition-transform duration-500 origin-left ${on ? 'scale-x-100' : 'scale-x-0'}`} />
              </button>); })}
          </div>
          {f.room && <p className="text-sm text-espresso/65">Furnishing a whole room? <Link to={`/room/${f.room}`} className="underline underline-offset-4 hover:text-espresso">See everything for the {ROOMS.find((r) => r.id === f.room)?.name.toLowerCase()}, grouped by need →</Link></p>}
          <Row label="Category"><button role="tab" aria-selected={!f.category} onClick={() => set('category', '')} className={`fchip ${!f.category ? 'fchip-on' : ''}`}>All</button>{CATEGORIES.map((c) => <Chip key={c} k="category" v={c}>{c}</Chip>)}</Row>
          <Row label="Style">{STYLES.map((x) => <Chip key={x.id} k="style" v={x.id}>{x.name}</Chip>)}</Row>
          <Row label="Quick picks"><Chip k="price" v="0-15000">Under ₹15,000</Chip><Chip k="offer" v="1">On offer</Chip><Chip k="avail" v="ready">Ready to ship</Chip><Chip k="new" v="1">New arrivals</Chip></Row>
        </section>
        <div>
          {active.length > 0 && <div className="mb-6 flex flex-wrap items-center gap-2" aria-label="Active filters">{active.map((k) => <button key={k} onClick={() => set(k, '')} className="fchip fchip-on min-h-[34px] gap-2 !px-3 text-xs" aria-label={`Remove filter ${labelOf(k, sp.get(k))}`}>{labelOf(k, sp.get(k))} <X size={12} /></button>)}<button className="ml-1 text-xs underline underline-offset-4" onClick={() => setSp({}, { replace: true })}>Clear all</button></div>}
          <div className="mb-8 grid grid-cols-[auto_1fr] items-center gap-3 border-y border-espresso/10 py-4 md:grid-cols-[auto_auto_1fr_auto] md:gap-5">
            <button className="fchip gap-2" onClick={() => setOpen(true)} aria-haspopup="dialog"><SlidersHorizontal size={14} /> More filters{moreCount ? <span className="ml-1 grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-espresso px-1 text-[10px] text-ivory">{moreCount}</span> : null}</button>
            <p className="hidden text-sm text-espresso/55 md:block" role="status">{list.length} piece{list.length === 1 ? '' : 's'}</p>
            <label className="relative order-last col-span-2 min-w-0 md:order-none md:col-span-1 md:mx-auto md:w-full md:max-w-sm"><span className="sr-only">Search products</span><Search size={15} aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-espresso/45" /><input type="search" className="w-full rounded-full border border-espresso/20 bg-ivory py-2.5 pl-10 pr-4 text-sm outline-none transition-all duration-300 placeholder:text-espresso/40 focus:border-walnut focus:shadow-[0_0_0_4px_rgba(180,154,112,.2)]" placeholder="Search products" value={f.q} onChange={(e) => set('q', e.target.value)} aria-label="Search products" /></label>
            <label className="relative ml-auto flex items-center gap-2 text-sm text-espresso/60"><span className="hidden sm:inline">Sort by</span><span className="relative"><select className="h-10 cursor-pointer appearance-none border border-espresso/20 bg-ivory py-0 pl-4 pr-9 text-sm text-espresso outline-none transition-colors hover:border-espresso focus:border-walnut" value={f.sort} onChange={(e) => set('sort', e.target.value)}>{SORTS.map(([v, t]) => <option key={v} value={v}>{t}</option>)}</select><ChevronDown size={14} aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" /></span></label>
          </div>
          {list.length ? <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-14 md:grid-cols-3 xl:grid-cols-4">{list.map((p, i) => <ProductCard key={p.id} p={p} index={i} />)}</div> : (
            <div className="py-16 text-center md:py-24">
              <p className="font-display text-[2rem] leading-tight md:text-4xl">No pieces match these filters.</p>
              <p className="mx-auto mt-3 max-w-md text-espresso/65">Try removing one filter to see more. Your other choices stay in place.</p>
              {active.length > 0 && <div className="mt-6 flex flex-wrap justify-center gap-2">{active.map((k) => <button key={k} onClick={() => set(k, '')} className="chip gap-2" aria-label={`Remove ${labelOf(k, sp.get(k))}`}>{labelOf(k, sp.get(k))} <X size={12} /></button>)}</div>}
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><button className="btn-dark" onClick={() => setSp({}, { replace: true })}>Clear all filters</button><Link to="/collections" className="btn-ghost">Browse collections</Link></div>
              <div className="mt-16 text-left"><p className="eyebrow mb-4">Most loved pieces</p><div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4">{products.filter((p) => p.bestseller).slice(0, 4).map((p) => <ProductCard key={p.id} p={p} />)}</div></div>
            </div>)}
        </div>
      </div>
      <div className={`fixed inset-0 z-[65] ${open ? '' : 'pointer-events-none invisible delay-300'}`} role="dialog" aria-modal="true" aria-label="More filters" aria-hidden={!open}>
        <button aria-label="Close filters" tabIndex={open ? 0 : -1} onClick={() => setOpen(false)} className={`absolute inset-0 bg-espresso/45 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} />
        <div className={`absolute inset-y-0 right-0 flex w-full flex-col bg-ivory shadow-2xl transition-transform duration-[400ms] ease-[cubic-bezier(.22,.61,.36,1)] sm:w-[26rem] ${open ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between border-b border-espresso/10 px-6 py-5"><h2 className="text-3xl">More filters</h2><button aria-label="Close filters" tabIndex={open ? 0 : -1} className="-mr-2 grid h-11 w-11 place-items-center transition hover:rotate-90" onClick={() => setOpen(false)}><X /></button></div>
          <div className="flex-1 overflow-y-auto px-6 py-7">{more}{active.length > 0 && <button tabIndex={open ? 0 : -1} className="mt-8 text-sm underline underline-offset-4" onClick={() => setSp({}, { replace: true })}>Clear all filters</button>}</div>
          <div className="sticky bottom-0 border-t border-espresso/10 bg-ivory p-4"><button tabIndex={open ? 0 : -1} className="btn-dark w-full" onClick={() => setOpen(false)}>Show {list.length} piece{list.length === 1 ? '' : 's'}</button></div>
        </div>
      </div>
    </>
  );
}
