import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PageHeader } from '../components/ui';
import { products, CATEGORIES } from '../data/products';
import { ROOMS, STYLES } from '../data/site';
import { formatINR } from '../utils/helpers';

const PRICE = [['', 'Any price'], ['0-5000', 'Under ₹5,000'], ['5000-25000', '₹5,000 – ₹25,000'], ['25000-75000', '₹25,000 – ₹75,000'], ['75000-', 'Over ₹75,000']];
const SORTS = [['featured', 'Featured'], ['new', 'Newest'], ['low', 'Price: low to high'], ['high', 'Price: high to low'], ['name', 'Name A–Z']];
const MATERIALS = ['Oak', 'Walnut', 'Stone', 'Travertine', 'Ceramic', 'Glass', 'Linen', 'Bouclé', 'Brass', 'Steel', 'Lacquer'];

export default function Shop() {
  const [sp, setSp] = useSearchParams(); const [open, setOpen] = useState(false);
  const f = { q: sp.get('q') || '', category: sp.get('category') || '', room: sp.get('room') || '', style: sp.get('style') || '', price: sp.get('price') || '', material: sp.get('material') || '', offer: sp.get('offer') === '1', sort: sp.get('sort') || 'featured', avail: sp.get('avail') || '' };
  const set = (k, v) => { const n = new URLSearchParams(sp); if (v) n.set(k, v); else n.delete(k); setSp(n, { replace: true }); };
  const list = useMemo(() => {
    let r = products.filter((p) => {
      if (f.q && !`${p.name} ${p.category} ${p.material} ${p.description}`.toLowerCase().includes(f.q.toLowerCase())) return false;
      if (f.category && p.category !== f.category) return false;
      if (f.room && !p.rooms.includes(f.room)) return false;
      if (f.style && !p.styles.includes(f.style)) return false;
      if (f.material && !`${p.material} ${p.name}`.toLowerCase().includes(f.material.toLowerCase())) return false;
      if (f.offer && !p.salePct) return false;
      if (f.avail === 'ready' && p.status !== 'Available') return false;
      if (f.price) { const [a, b] = f.price.split('-'); if (p.price < Number(a || 0) || (b && p.price > Number(b))) return false; }
      return true;
    });
    const s = { low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, name: (a, b) => a.name.localeCompare(b.name), new: (a, b) => Number(b.isNew) - Number(a.isNew) || b.order - a.order, featured: (a, b) => Number(b.bestseller) - Number(a.bestseller) || a.order - b.order }[f.sort];
    return [...r].sort(s);
  }, [sp]);
  const active = ['q', 'category', 'room', 'style', 'price', 'material', 'offer', 'avail'].filter((k) => sp.get(k));
  const Sel = ({ k, label, opts }) => (<label className="block text-sm"><span className="eyebrow mb-1 block">{label}</span><select className="field !py-2" value={sp.get(k) || ''} onChange={(e) => set(k, e.target.value)}>{opts.map(([v, t]) => <option key={v} value={v}>{t}</option>)}</select></label>);
  const filters = (<div className="space-y-4">
    <Sel k="category" label="Category" opts={[['', 'All categories'], ...CATEGORIES.map((c) => [c, c])]} />
    <Sel k="room" label="Room" opts={[['', 'Any room'], ...ROOMS.map((r) => [r.id, r.name])]} />
    <Sel k="style" label="Style" opts={[['', 'Any style'], ...STYLES.map((s) => [s.id, s.name])]} />
    <Sel k="material" label="Material" opts={[['', 'Any material'], ...MATERIALS.map((m) => [m, m])]} />
    <Sel k="price" label="Price" opts={PRICE} />
    <Sel k="avail" label="Availability" opts={[['', 'All'], ['ready', 'Available now']]} />
    <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={f.offer} onChange={(e) => set('offer', e.target.checked ? '1' : '')} /> On offer only</label>
    {active.length > 0 && <button className="text-sm underline" onClick={() => setSp({}, { replace: true })}>Clear all filters</button>}
  </div>);
  return (
    <>
      <PageHeader eyebrow="Shop" title={f.category || 'All pieces'} intro={`${list.length} piece${list.length === 1 ? '' : 's'}${f.q ? ` for “${f.q}”` : ''}.`} />
      <div className="container-x grid gap-10 py-10 lg:grid-cols-[230px_1fr]">
        <aside className="hidden lg:block">{filters}</aside>
        <div>
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <button className="btn-ghost !py-2 lg:hidden" onClick={() => setOpen(true)}><SlidersHorizontal size={14} /> Filters{active.length ? ` (${active.length})` : ''}</button>
            <input className="field hidden max-w-xs !py-2 sm:block" placeholder="Search products" value={f.q} onChange={(e) => set('q', e.target.value)} aria-label="Search products" />
            <label className="ml-auto flex items-center gap-2 text-sm">Sort<select className="field !w-auto !py-2" value={f.sort} onChange={(e) => set('sort', e.target.value)}>{SORTS.map(([v, t]) => <option key={v} value={v}>{t}</option>)}</select></label>
          </div>
          {list.length ? <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 md:grid-cols-3">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div> : <p className="py-20 text-center text-espresso/60">No pieces match. <button className="underline" onClick={() => setSp({}, { replace: true })}>Clear filters</button></p>}
        </div>
      </div>
      {open && (<div className="fixed inset-0 z-[65] bg-ivory p-6 lg:hidden" role="dialog" aria-label="Filters"><div className="mb-6 flex items-center justify-between"><h2 className="text-3xl">Filters</h2><button aria-label="Close filters" onClick={() => setOpen(false)}><X /></button></div>{filters}<button className="btn-dark mt-8 w-full" onClick={() => setOpen(false)}>Show {list.length} pieces</button></div>)}
    </>
  );
}
