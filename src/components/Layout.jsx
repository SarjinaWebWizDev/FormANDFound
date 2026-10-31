import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Menu, Minus, Plus, Scale, Search, ShoppingBag, X } from 'lucide-react';
import AnnouncementBar from './AnnouncementBar';
import Newsletter from './Newsletter';
import CouponBox from './CouponBox';
import SafeImage from './SafeImage';
import { NAV } from '../data/site';
import { products } from '../data/products';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/helpers';

function SearchOverlay({ onClose }) {
  const [q, setQ] = useState(''); const nav = useNavigate();
  const res = q.trim().length > 1 ? products.filter((p) => `${p.name} ${p.category} ${p.material}`.toLowerCase().includes(q.toLowerCase())).slice(0, 6) : [];
  const go = (e) => { e.preventDefault(); nav(`/shop?q=${encodeURIComponent(q)}`); onClose(); };
  return (
    <div className="fixed inset-0 z-[70] bg-ivory/95 backdrop-blur" role="dialog" aria-modal="true" aria-label="Search">
      <div className="container-x pt-10">
        <div className="flex justify-end"><button onClick={onClose} aria-label="Close search" className="grid h-11 w-11 place-items-center"><X /></button></div>
        <form onSubmit={go} className="mt-6"><input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search furniture, lighting, objects…" className="w-full border-b border-espresso bg-transparent pb-3 font-display text-2xl outline-none sm:text-3xl md:text-5xl" /></form>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {res.map((p) => (<li key={p.id}><Link onClick={onClose} to={`/product/${p.slug}`} className="flex items-center gap-4 border border-espresso/10 p-3 hover:border-espresso"><SafeImage src={p.image} alt="" className="h-16 w-16" /><span><span className="block font-display text-xl">{p.name}</span><span className="text-sm text-espresso/60">{formatINR(p.price)}</span></span></Link></li>))}
        </ul>
        {q.trim().length > 1 && !res.length && <p className="mt-6 text-espresso/60">No matches. Try “chair”, “lamp” or “oak”.</p>}
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { drawer, setDrawer, calc, setQty, removeLine } = useStore();
  return (
    <AnimatePresence>
      {drawer && (
        <>
          <motion.div key="bg" className="fixed inset-0 z-[60] bg-espresso/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(false)} />
          <motion.aside key="dr" role="dialog" aria-modal="true" aria-label="Cart" className="fixed right-0 top-0 z-[61] flex h-full w-full max-w-md flex-col bg-ivory shadow-2xl" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.35 }}>
            <div className="flex items-center justify-between border-b border-espresso/10 p-5"><h2 className="text-3xl">Your cart</h2><button aria-label="Close cart" className="grid h-11 w-11 place-items-center" onClick={() => setDrawer(false)}><X /></button></div>
            <div className="flex-1 overflow-y-auto p-5">
              {!calc.lines.length && <p className="text-espresso/60">Your cart is empty.</p>}
              <ul className="space-y-5">
                {calc.lines.map((l) => (
                  <li key={l.id + l.variant} className="flex gap-4">
                    <SafeImage src={l.image} alt={l.product.name} className="h-24 w-20 shrink-0" />
                    <div className="min-w-0 flex-1"><Link onClick={() => setDrawer(false)} to={`/product/${l.product.slug}`} className="font-display text-xl leading-tight">{l.product.name}</Link>
                      {l.variant && <p className="text-xs text-espresso/60">{l.variant}</p>}
                      <div className="mt-2 flex items-center justify-between"><div className="flex items-center border border-espresso/20"><button aria-label="Decrease" className="grid h-9 w-9 place-items-center" onClick={() => setQty(l.id, l.variant, l.qty - 1)}><Minus size={12} /></button><span className="w-6 text-center text-sm">{l.qty}</span><button aria-label="Increase" className="grid h-9 w-9 place-items-center" onClick={() => setQty(l.id, l.variant, l.qty + 1)}><Plus size={12} /></button></div><span className="text-sm">{formatINR(l.total)}</span></div>
                      <button className="mt-1 py-2 text-xs text-espresso/60 underline" onClick={() => removeLine(l.id, l.variant)}>Remove</button></div>
                  </li>))}
              </ul>
            </div>
            {calc.lines.length > 0 && (
              <div className="space-y-3 border-t border-espresso/10 p-5 text-sm">
                <CouponBox />
                <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(calc.subtotal)}</span></div>
                {calc.subtotal - calc.merchandise > 0 && <div className="flex justify-between text-moss"><span>Discount</span><span>− {formatINR(calc.subtotal - calc.merchandise)}</span></div>}
                <div className="flex justify-between"><span>Delivery</span><span>{calc.deliveryFree ? 'Complimentary' : formatINR(calc.delivery)}</span></div>
                {calc.deliveryGap > 0 && <p className="text-xs text-espresso/60">Add {formatINR(calc.deliveryGap)} more for complimentary delivery.</p>}
                <div className="flex justify-between border-t border-espresso/10 pt-3 text-lg"><span>Total</span><span>{formatINR(calc.total)}</span></div>
                <div className="grid grid-cols-2 gap-3"><Link onClick={() => setDrawer(false)} to="/cart" className="btn-ghost">View cart</Link><Link onClick={() => setDrawer(false)} to="/checkout" className="btn-dark">Checkout</Link></div>
              </div>)}
          </motion.aside>
        </>)}
    </AnimatePresence>
  );
}

function CompareBar() {
  const { compare, toggleCompare } = useStore(); const loc = useLocation();
  if (!compare.length || loc.pathname === '/compare') return null;
  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-max -translate-x-1/2 items-center gap-3 border border-espresso/20 bg-ivory px-4 py-3 shadow-xl">
      <Scale size={16} /><span className="text-sm">{compare.length} to compare</span>
      <div className="flex -space-x-2">{compare.map((id) => { const p = products.find((x) => x.id === id); return <button key={id} title={`Remove ${p.name}`} onClick={() => toggleCompare(id)}><SafeImage src={p.image} alt={p.name} className="h-8 w-8 rounded-full border-2 border-ivory" /></button>; })}</div>
      <Link to="/compare" className="btn-dark !px-4 !py-2">Compare</Link>
    </div>
  );
}

export default function Layout() {
  const { calc, wishlist, setDrawer, toast } = useStore(); const [menu, setMenu] = useState(false); const [search, setSearch] = useState(false); const loc = useLocation();
  useEffect(() => { window.scrollTo(0, 0); setMenu(false); }, [loc.pathname]);
  // Active only for the exact page. Category links all point at /shop, so the category in the query string must match too.
  const isActive = (to) => {
    const [path, qs] = to.split('?');
    if (path === '/') return loc.pathname === '/';
    if (qs) return loc.pathname === path && new URLSearchParams(loc.search).get('category') === new URLSearchParams(qs).get('category');
    return loc.pathname === path || loc.pathname.startsWith(path + '/');
  };
  const link = (on) => `whitespace-nowrap border-b pb-1 text-[13px] tracking-wide transition hover:text-walnut ${on ? 'border-walnut text-walnut' : 'border-transparent'}`;
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <header className="sticky top-0 z-40 border-b border-espresso/10 bg-ivory/90 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between gap-1 !px-3 sm:!px-5 md:!px-10">
          <button className="-ml-2 grid h-11 w-11 place-items-center lg:hidden" aria-label="Open menu" onClick={() => setMenu(true)}><Menu /></button>
          <Link to="/" className="whitespace-nowrap font-display text-[1.02rem] font-semibold tracking-[0.08em] min-[380px]:text-xl min-[380px]:tracking-[0.12em] sm:text-2xl sm:tracking-[0.18em] lg:text-[1.7rem]">FORM <span className="text-gold">&amp;</span> FOUND</Link>
          <div className="-mr-2 flex items-center sm:gap-1">
            <button aria-label="Search" className="grid h-11 w-10 place-items-center sm:w-11" onClick={() => setSearch(true)}><Search size={19} /></button>
            <Link to="/wishlist" aria-label="Wishlist" className="relative grid h-11 w-10 place-items-center sm:w-11"><Heart size={19} />{wishlist.length > 0 && <span className="absolute right-0 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-cherry text-[9px] text-white">{wishlist.length}</span>}</Link>
            <button aria-label="Open cart" className="relative grid h-11 w-10 place-items-center sm:w-11" onClick={() => setDrawer(true)}><ShoppingBag size={19} />{calc.count > 0 && <span className="absolute right-0 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-espresso text-[9px] text-ivory">{calc.count}</span>}</button>
          </div>
        </div>
        <nav className="hidden border-t border-espresso/10 lg:block" aria-label="Main"><div className="container-x flex justify-center gap-5 py-2.5 xl:gap-8">{NAV.map((n) => <Link key={n.label} to={n.to} aria-current={isActive(n.to) ? 'page' : undefined} className={link(isActive(n.to))}>{n.label}</Link>)}</div></nav>
      </header>
      <AnimatePresence>{menu && (
        <motion.div className="fixed inset-0 z-[65] bg-ivory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="container-x pt-5"><div className="flex justify-end"><button aria-label="Close menu" className="grid h-11 w-11 place-items-center" onClick={() => setMenu(false)}><X /></button></div>
            <ul className="mt-4 space-y-1 overflow-y-auto pb-10">{NAV.map((n) => <li key={n.label}><Link to={n.to} className="block py-2 font-display text-[clamp(1.9rem,8vw,2.6rem)]">{n.label}</Link></li>)}<li><Link to="/offers" className="block py-2 font-display text-[clamp(1.9rem,8vw,2.6rem)] text-cherry">Offers</Link></li></ul></div>
        </motion.div>)}</AnimatePresence>
      {search && <SearchOverlay onClose={() => setSearch(false)} />}
      <main className="flex-1"><Outlet /></main>
      <Newsletter />
      <footer className="bg-espresso text-ivory/80">
        <div className="container-x grid gap-10 border-t border-ivory/10 py-14 sm:grid-cols-2 lg:grid-cols-4 [&_a]:inline-block [&_a]:py-1.5">
          <div><p className="font-display text-2xl tracking-[0.18em] text-ivory">FORM &amp; FOUND</p><p className="mt-3 text-sm">Furniture, lighting and objects for considered homes.</p></div>
          <div><p className="eyebrow !text-gold">Shop</p><ul className="mt-3 space-y-2 text-sm">{NAV.slice(1, 6).map((n) => <li key={n.label}><Link className="hover:text-ivory" to={n.to}>{n.label}</Link></li>)}</ul></div>
          <div><p className="eyebrow !text-gold">Explore</p><ul className="mt-3 space-y-2 text-sm"><li><Link to="/offers">Offers</Link></li><li><Link to="/journal">Journal</Link></li><li><Link to="/about">About</Link></li><li><Link to="/track-order">Track an order</Link></li><li><Link to="/compare">Compare</Link></li></ul></div>
          <div><p className="eyebrow !text-gold">Help</p><ul className="mt-3 space-y-2 text-sm"><li><Link to="/faqs">FAQs</Link></li><li><Link to="/contact">Contact</Link></li><li><Link to="/shipping-returns">Shipping &amp; Returns</Link></li><li><Link to="/privacy">Privacy</Link></li><li><Link to="/terms">Terms</Link></li></ul></div>
        </div>
        <p className="border-t border-ivory/10 py-5 text-center text-xs text-ivory/50">© 2026 FORM &amp; FOUND. Demo storefront — checkout, payment and tracking are simulated.</p>
      </footer>
      <CartDrawer /><CompareBar />
      <AnimatePresence>{toast && <motion.div key={toast.k} role="status" className="fixed inset-x-4 bottom-6 z-[80] sm:inset-x-auto sm:right-6 bg-espresso px-5 py-3 text-sm text-ivory shadow-xl" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>{toast.m}</motion.div>}</AnimatePresence>
    </div>
  );
}
