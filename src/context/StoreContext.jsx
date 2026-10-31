import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { computeCart, findCoupon } from '../data/offers';
import { getProduct, products } from '../data/products';
import { load, save, uid } from '../utils/helpers';

const Store = createContext(null);
export const useStore = () => useContext(Store);

// Storage versions: bump when the shape changes and add a migrate function.
const V = { cart: 2, wishlist: 1, designs: 2, orders: 2, coupon: 1, recent: 1, compare: 1 };
const lineKey = (l) => `${l.id}::${l.variant || ''}`;

// Designs saved by v1 had { room, style, palette, picks: [ids], budget }. Convert to v2 shape.
function migrateDesigns(parsed) {
  try {
    const list = Array.isArray(parsed) ? parsed : parsed?.data;
    if (!Array.isArray(list)) return [];
    return list.map((d) => ({ id: d.id || uid('d'), name: d.name || 'Saved design', room: d.room, style: d.style, palette: d.palette, budget: d.budget || 150000,
      picks: (d.picks || d.items || []).map((p) => (typeof p === 'string' ? { id: p, variant: '', qty: 1 } : p)), createdAt: d.createdAt || Date.now(), version: 2 }));
  } catch { return []; }
}
const sanitiseCart = (c) => (Array.isArray(c) ? c.filter((l) => products.some((p) => p.id === l.id) && l.qty > 0) : []);

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => sanitiseCart(load('ff.cart', V.cart, [])));
  const [wishlist, setWishlist] = useState(() => load('ff.wishlist', V.wishlist, []));
  const [designs, setDesigns] = useState(() => load('ff.designs', V.designs, [], migrateDesigns));
  const [orders, setOrders] = useState(() => load('ff.orders', V.orders, []));
  const [couponCode, setCouponCode] = useState(() => load('ff.coupon', V.coupon, ''));
  const [recent, setRecent] = useState(() => load('ff.recent', V.recent, []));
  const [compare, setCompare] = useState(() => load('ff.compare', V.compare, []));
  const [drawer, setDrawer] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => save('ff.cart', V.cart, cart), [cart]);
  useEffect(() => save('ff.wishlist', V.wishlist, wishlist), [wishlist]);
  useEffect(() => save('ff.designs', V.designs, designs), [designs]);
  useEffect(() => save('ff.orders', V.orders, orders), [orders]);
  useEffect(() => save('ff.coupon', V.coupon, couponCode), [couponCode]);
  useEffect(() => save('ff.recent', V.recent, recent), [recent]);
  useEffect(() => save('ff.compare', V.compare, compare), [compare]);
  useEffect(() => { if (!toast) return undefined; const t = setTimeout(() => setToast(null), 2600); return () => clearTimeout(t); }, [toast]);

  const notify = useCallback((m) => setToast({ m, k: Date.now() }), []);

  const calc = useMemo(() => computeCart(cart, { code: couponCode, ordersCount: orders.length }), [cart, couponCode, orders.length]);

  const addToCart = useCallback((id, variant = '', qty = 1, quiet = false) => {
    setCart((c) => {
      const k = `${id}::${variant}`;
      const ex = c.find((l) => lineKey(l) === k);
      return ex ? c.map((l) => (lineKey(l) === k ? { ...l, qty: Math.min(20, l.qty + qty) } : l)) : [...c, { id, variant, qty }];
    });
    if (!quiet) { notify('Added to your cart'); setDrawer(true); }
  }, [notify]);
  const setQty = (id, variant, qty) => setCart((c) => (qty < 1 ? c.filter((l) => lineKey(l) !== `${id}::${variant}`) : c.map((l) => (lineKey(l) === `${id}::${variant}` ? { ...l, qty: Math.min(20, qty) } : l))));
  const removeLine = (id, variant) => setQty(id, variant, 0);
  const changeVariant = (id, from, to) => setCart((c) => {
    const moving = c.find((l) => lineKey(l) === `${id}::${from}`); if (!moving) return c;
    const rest = c.filter((l) => lineKey(l) !== `${id}::${from}`);
    const ex = rest.find((l) => lineKey(l) === `${id}::${to}`);
    return ex ? rest.map((l) => (lineKey(l) === `${id}::${to}` ? { ...l, qty: Math.min(20, l.qty + moving.qty) } : l)) : [...rest, { ...moving, variant: to }];
  });
  const clearCart = () => setCart([]);

  const toggleWish = (id) => setWishlist((w) => { const on = w.includes(id); notify(on ? 'Removed from wishlist' : 'Saved to wishlist'); return on ? w.filter((x) => x !== id) : [...w, id]; });
  const toggleCompare = (id) => setCompare((c) => {
    if (c.includes(id)) return c.filter((x) => x !== id);
    if (c.length >= 3) { notify('You can compare up to 3 pieces'); return c; }
    return [...c, id];
  });
  const viewed = useCallback((id) => setRecent((r) => [id, ...r.filter((x) => x !== id)].slice(0, 8)), []);

  const applyCoupon = (code) => {
    const c = code.trim();
    if (!c) { setCouponCode(''); return { ok: false, message: 'Enter a code.' }; }
    const promo = findCoupon(c);
    if (!promo) { setCouponCode(''); return { ok: false, message: 'That code is not valid.' }; }
    setCouponCode(promo.code);
    const r = computeCart(cart, { code: promo.code, ordersCount: orders.length });
    return r.coupon ? { ok: true, message: r.couponMessage } : { ok: false, message: r.couponMessage };
  };
  const removeCoupon = () => setCouponCode('');

  const saveDesign = (d) => { const design = { ...d, id: d.id || uid('d'), createdAt: d.createdAt || Date.now(), version: 2 }; setDesigns((l) => [design, ...l.filter((x) => x.id !== design.id)]); notify('Design saved'); return design; };
  const deleteDesign = (id) => setDesigns((l) => l.filter((d) => d.id !== id));

  const STATUSES = ['Placed', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'];
  const placeOrder = (customer) => {
    const order = { id: 'FF-' + Math.floor(100000 + Math.random() * 900000), placedAt: Date.now(), customer, status: 0, history: [{ s: 0, at: Date.now() }],
      lines: calc.lines.map((l) => ({ id: l.id, variant: l.variant, qty: l.qty, unit: l.unit, name: l.product.name, image: l.image })),
      totals: { subtotal: calc.subtotal, saleSavings: calc.saleSavings, discount: calc.subtotal - calc.merchandise, delivery: calc.delivery, total: calc.total, code: calc.appliedCode }, simulated: true };
    setOrders((o) => [order, ...o]); setCart([]); setCouponCode('');
    return order;
  };
  const advanceOrder = (id) => setOrders((o) => o.map((x) => (x.id === id && x.status < STATUSES.length - 1 ? { ...x, status: x.status + 1, history: [...x.history, { s: x.status + 1, at: Date.now() }] } : x)));

  const value = { cart, calc, addToCart, setQty, removeLine, changeVariant, clearCart, wishlist, toggleWish, compare, toggleCompare, recent, viewed,
    designs, saveDesign, deleteDesign, orders, placeOrder, advanceOrder, STATUSES, couponCode, applyCoupon, removeCoupon, drawer, setDrawer, toast, notify, getProduct };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
