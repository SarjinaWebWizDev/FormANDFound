import { Link } from 'react-router-dom';
import { Minus, Plus } from 'lucide-react';
import SafeImage from '../components/SafeImage';
import CouponBox from '../components/CouponBox';
import { PageHeader } from '../components/ui';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/helpers';

export function Totals() {
  const { calc } = useStore();
  const disc = calc.subtotal - calc.merchandise;
  return (
    <div className="space-y-3 text-sm">
      <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(calc.subtotal)}</span></div>
      {calc.saleSavings > 0 && <div className="flex justify-between text-espresso/60"><span>Already saved on selected pieces</span><span>{formatINR(calc.saleSavings)}</span></div>}
      {calc.bundleDiscount > 0 && <div className="flex justify-between text-moss"><span>{calc.bundleLabel}</span><span>− {formatINR(calc.bundleDiscount)}</span></div>}
      {calc.couponDiscount > 0 && <div className="flex justify-between text-moss"><span>{calc.coupon.title} ({calc.coupon.code})</span><span>− {formatINR(calc.couponDiscount)}</span></div>}
      <div className="flex justify-between"><span>Delivery</span><span>{calc.deliveryFree ? 'Complimentary' : formatINR(calc.delivery)}</span></div>
      {calc.deliveryGap > 0 && <p className="text-xs text-espresso/60">Add {formatINR(calc.deliveryGap)} more for complimentary delivery.</p>}
      <div className="flex justify-between border-t border-espresso/15 pt-3 text-xl"><span>Total</span><span>{formatINR(calc.total)}</span></div>
      {disc + calc.saleSavings > 0 && <p className="text-xs text-moss">You save {formatINR(calc.totalSaved)} on this order.</p>}
    </div>
  );
}

export default function Cart() {
  const { calc, setQty, removeLine, changeVariant } = useStore();
  if (!calc.lines.length) return (<><PageHeader title="Your cart" /><div className="container-x py-20 text-center"><p className="text-espresso/70">Your cart is empty.</p><Link to="/shop" className="btn-dark mt-6">Continue shopping</Link></div></>);
  return (
    <>
      <PageHeader eyebrow="Cart" title="Your cart" />
      <div className="container-x grid gap-12 py-12 lg:grid-cols-[1fr_380px]">
        <ul className="divide-y divide-espresso/10">
          {calc.lines.map((l) => (
            <li key={l.id + l.variant} className="flex gap-5 py-6">
              <Link to={`/product/${l.product.slug}`}><SafeImage src={l.image} alt={l.product.name} className="h-32 w-28 shrink-0" /></Link>
              <div className="flex-1"><div className="flex justify-between gap-4"><Link to={`/product/${l.product.slug}`} className="font-display text-2xl">{l.product.name}</Link><span>{formatINR(l.total)}</span></div>
                {l.product.variants.length > 0 && <label className="mt-2 block text-xs text-espresso/60">Finish <select className="ml-2 border border-espresso/20 bg-ivory px-2 py-1 text-espresso" value={l.variant} onChange={(e) => changeVariant(l.id, l.variant, e.target.value)}>{l.product.variants.map((v) => <option key={v.name}>{v.name}</option>)}</select></label>}
                <p className="mt-1 text-xs text-espresso/60">{formatINR(l.unit)} each{l.mrpUnit ? ` (was ${formatINR(l.mrpUnit)})` : ''}</p>
                <div className="mt-3 flex items-center gap-5"><div className="flex items-center border border-espresso/20"><button aria-label="Decrease" className="grid h-9 w-9 place-items-center" onClick={() => setQty(l.id, l.variant, l.qty - 1)}><Minus size={12} /></button><span className="w-8 text-center text-sm">{l.qty}</span><button aria-label="Increase" className="grid h-9 w-9 place-items-center" onClick={() => setQty(l.id, l.variant, l.qty + 1)}><Plus size={12} /></button></div><button className="text-xs underline" onClick={() => removeLine(l.id, l.variant)}>Remove</button></div></div>
            </li>))}
        </ul>
        <aside className="h-fit space-y-6 border border-espresso/15 bg-beige/40 p-6"><h2 className="text-3xl">Order summary</h2><CouponBox />
          {calc.sets.length > 0 && <p className="text-xs text-moss">Complete set{calc.sets.length > 1 ? 's' : ''} in your cart: {calc.sets.map((s) => s.name).join(', ')}.</p>}
          <Totals /><Link to="/checkout" className="btn-dark w-full">Proceed to checkout</Link></aside>
      </div>
    </>
  );
}
