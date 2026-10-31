import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { PageHeader } from '../components/ui';
import { products } from '../data/products';
import { useStore } from '../context/StoreContext';

export default function Wishlist() {
  const { wishlist } = useStore(); const items = wishlist.map((id) => products.find((p) => p.id === id)).filter(Boolean);
  return (<><PageHeader eyebrow="Wishlist" title="Saved pieces" intro="Saved in this browser." />
    <div className="container-x py-12">{items.length ? <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div> : <div className="py-16 text-center"><p className="text-espresso/70">Nothing saved yet. Tap the heart on any piece.</p><Link to="/shop" className="btn-dark mt-6">Browse the shop</Link></div>}</div></>);
}
