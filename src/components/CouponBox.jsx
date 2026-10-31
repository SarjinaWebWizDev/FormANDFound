import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export default function CouponBox() {
  const { applyCoupon, removeCoupon, calc, couponCode } = useStore();
  const [v, setV] = useState(''); const [msg, setMsg] = useState(null);
  const submit = (e) => { e.preventDefault(); setMsg(applyCoupon(v)); setV(''); };
  const applied = calc.coupon;
  return (
    <div>
      {applied ? (
        <div className="flex items-center justify-between border border-sage bg-sage/15 px-3 py-2 text-sm">
          <span className="flex items-center gap-2"><Check size={14} /> <b>{applied.code}</b> applied</span>
          <button onClick={() => { removeCoupon(); setMsg(null); }} aria-label="Remove code"><X size={14} /></button>
        </div>
      ) : (
        <form onSubmit={submit} className="flex gap-2">
          <label className="sr-only" htmlFor="coupon">Promo code</label>
          <input id="coupon" className="field !py-2 uppercase" placeholder="Promo code" value={v} onChange={(e) => setV(e.target.value)} />
          <button className="btn-dark !px-4 !py-2">Apply</button>
        </form>
      )}
      {(msg || (couponCode && !applied)) && <p role="status" className={`mt-2 text-xs ${msg?.ok || applied ? 'text-moss' : 'text-cherry'}`}>{msg?.message || calc.couponMessage}</p>}
      {!applied && !msg && <p className="mt-2 text-xs text-espresso/50">Try FIRST10 or ROOM12.</p>}
    </div>
  );
}
