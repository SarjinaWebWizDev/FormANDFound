import { useRef, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import SafeImage from '../components/SafeImage';
import CouponBox from '../components/CouponBox';
import NotFoundMsg from '../components/NotFoundMsg';
import { PageHeader } from '../components/ui';
import { Totals } from './Cart';
import { useStore } from '../context/StoreContext';
import { ORDER_IMAGES } from '../data/site';
import { formatINR } from '../utils/helpers';

const FIELDS = [['name', 'Full name', 'text'], ['email', 'Email', 'email'], ['phone', 'Phone (10 digits)', 'tel'], ['address', 'Address', 'text'], ['city', 'City', 'text'], ['pin', 'PIN code (6 digits)', 'text']];
const check = {
  name: (v) => v.trim().length > 1 || 'Enter your name', email: (v) => /^\S+@\S+\.\S+$/.test(v) || 'Enter a valid email',
  phone: (v) => /^\d{10}$/.test(v.replace(/\s/g, '')) || 'Enter a 10-digit phone number', address: (v) => v.trim().length > 5 || 'Enter your address',
  city: (v) => v.trim().length > 1 || 'Enter your city', pin: (v) => /^\d{6}$/.test(v) || 'Enter a 6-digit PIN code',
};

export default function Checkout() {
  const { calc, placeOrder } = useStore(); const nav = useNavigate();
  const [f, setF] = useState({ name: '', email: '', phone: '', address: '', city: '', pin: '' }); const [err, setErr] = useState({});
  const placed = useRef(false);
  if (!calc.lines.length && !placed.current) return <Navigate to="/cart" replace />;
  if (!calc.lines.length) return null;
  const submit = (e) => {
    e.preventDefault();
    const er = {}; FIELDS.forEach(([k]) => { const r = check[k](f[k]); if (r !== true) er[k] = r; });
    setErr(er); if (Object.keys(er).length) return;
    placed.current = true; const o = placeOrder(f); nav(`/order/${o.id}`);
  };
  return (
    <>
      <PageHeader eyebrow="Checkout" title="Delivery details" />
      <div className="container-x grid gap-12 py-12 lg:grid-cols-[1fr_380px]">
        <form onSubmit={submit} noValidate className="space-y-5">
          <div className="border border-sage bg-sage/15 p-4 text-sm"><b>Demo checkout.</b> No payment is taken and no real order is placed. Your order is saved in this browser so you can try tracking.</div>
          <div className="grid gap-5 sm:grid-cols-2">{FIELDS.map(([k, label, type]) => (
            <label key={k} className={k === 'address' ? 'sm:col-span-2' : ''}><span className="eyebrow mb-1 block">{label}</span><input className="field" type={type} value={f[k]} aria-invalid={!!err[k]} onChange={(e) => setF({ ...f, [k]: e.target.value })} />{err[k] && <span role="alert" className="mt-1 block text-xs text-cherry">{err[k]}</span>}</label>))}</div>
          <button className="btn-dark w-full sm:w-auto sm:px-14">Place demo order — {formatINR(calc.total)}</button>
        </form>
        <aside className="h-fit space-y-5 border border-espresso/15 bg-beige/40 p-6"><h2 className="text-3xl">Your order</h2>
          <ul className="space-y-3">{calc.lines.map((l) => <li key={l.id + l.variant} className="flex items-center gap-3 text-sm"><SafeImage src={l.image} alt="" className="h-14 w-12" /><span className="flex-1">{l.product.name}{l.variant ? ` · ${l.variant}` : ''} × {l.qty}</span><span>{formatINR(l.total)}</span></li>)}</ul>
          <CouponBox /><Totals /></aside>
      </div>
    </>
  );
}

export function OrderConfirmation() {
  const { id } = useParams(); const { orders } = useStore(); const o = orders.find((x) => x.id === id);
  if (!o) return <NotFoundMsg text="We could not find that order in this browser." />;
  return (
    <>
      <PageHeader eyebrow="Demo order placed" title="Thank you." intro={`Order ${o.id} was saved in this browser. No payment was taken and nothing will be shipped.`} />
      <div className="container-x grid gap-10 py-12 md:grid-cols-2">
        <div><h2 className="text-3xl">Summary</h2><ul className="mt-4 divide-y divide-espresso/10">{o.lines.map((l) => <li key={l.id + l.variant} className="flex items-center gap-3 py-3 text-sm"><SafeImage src={l.image} alt="" className="h-14 w-12" /><span className="flex-1">{l.name}{l.variant ? ` · ${l.variant}` : ''} × {l.qty}</span><span>{formatINR(l.unit * l.qty)}</span></li>)}</ul>
          <div className="mt-4 space-y-1 text-sm"><div className="flex justify-between"><span>Subtotal</span><span>{formatINR(o.totals.subtotal)}</span></div>{o.totals.discount > 0 && <div className="flex justify-between text-moss"><span>Discounts{o.totals.code ? ` (${o.totals.code})` : ''}</span><span>− {formatINR(o.totals.discount)}</span></div>}<div className="flex justify-between"><span>Delivery</span><span>{o.totals.delivery ? formatINR(o.totals.delivery) : 'Complimentary'}</span></div><div className="flex justify-between border-t border-espresso/15 pt-2 text-lg"><span>Total</span><span>{formatINR(o.totals.total)}</span></div></div>
          <div className="mt-8 flex gap-3"><Link to={`/track-order?id=${o.id}`} className="btn-dark">Track this order</Link><Link to="/shop" className="btn-ghost">Keep browsing</Link></div></div>
        <SafeImage src={ORDER_IMAGES.packaging} alt="Furniture being carefully packaged" className="aspect-[4/3] w-full" />
      </div>
    </>
  );
}
