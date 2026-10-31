import { Link } from 'react-router-dom';
import SafeImage from '../components/SafeImage';
import PriceTag from '../components/PriceTag';
import { PageHeader } from '../components/ui';
import { products } from '../data/products';
import { useStore } from '../context/StoreContext';

// Unique feature: side-by-side comparison of up to three pieces.
export default function Compare() {
  const { compare, toggleCompare, addToCart } = useStore(); const items = compare.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  const rows = [['Category', (p) => p.category], ['Material', (p) => p.material], ['Dimensions', (p) => p.dimensions], ['Availability', (p) => p.status], ['Finishes', (p) => p.variants.map((v) => v.name).join(', ') || '—'], ['Best for', (p) => p.rooms.join(', ')]];
  return (<><PageHeader eyebrow="Compare" title="Side by side" intro="Choose up to three pieces using the scale icon on any product." />
    <div className="container-x overflow-x-auto py-12">{items.length ? (
      <table className="w-full min-w-[640px] text-left text-sm"><thead><tr><th className="w-36" />{items.map((p) => (<th key={p.id} className="p-3 align-top"><Link to={`/product/${p.slug}`}><SafeImage src={p.image} alt={p.name} className="aspect-[4/5] w-full" /><span className="mt-3 block font-display text-2xl font-normal">{p.name}</span></Link><PriceTag price={p.price} mrp={p.mrp} className="mt-1 font-normal" /></th>))}</tr></thead>
        <tbody>{rows.map(([k, f]) => (<tr key={k} className="border-t border-espresso/10"><th className="p-3 text-xs font-medium uppercase tracking-widest text-espresso/50">{k}</th>{items.map((p) => <td key={p.id} className="p-3 align-top">{f(p)}</td>)}</tr>))}
          <tr className="border-t border-espresso/10"><th />{items.map((p) => <td key={p.id} className="space-y-2 p-3"><button className="btn-dark w-full" onClick={() => addToCart(p.id, p.variants[0]?.name || '')}>Add to cart</button><button className="block text-xs underline" onClick={() => toggleCompare(p.id)}>Remove</button></td>)}</tr></tbody></table>
    ) : <div className="py-16 text-center"><p className="text-espresso/70">Nothing to compare yet.</p><Link to="/shop" className="btn-dark mt-6">Browse the shop</Link></div>}</div></>);
}
