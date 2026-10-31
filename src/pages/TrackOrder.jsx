import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import SafeImage from '../components/SafeImage';
import { PageHeader } from '../components/ui';
import { useStore } from '../context/StoreContext';
import { ORDER_IMAGES } from '../data/site';

export default function TrackOrder() {
  const [sp] = useSearchParams(); const { orders, advanceOrder, STATUSES } = useStore();
  const [id, setId] = useState(sp.get('id') || ''); const [q, setQ] = useState(sp.get('id') || '');
  const o = orders.find((x) => x.id.toLowerCase() === q.trim().toLowerCase());
  return (
    <>
      <PageHeader eyebrow="Track an order" title="Where is my order?" intro="Simulated tracking for demo orders placed in this browser. There is no real courier." />
      <div className="container-x grid gap-12 py-12 md:grid-cols-2">
        <div>
          <form onSubmit={(e) => { e.preventDefault(); setQ(id); }} className="flex gap-2"><label className="sr-only" htmlFor="oid">Order number</label><input id="oid" className="field" placeholder="Order number, e.g. FF-123456" value={id} onChange={(e) => setId(e.target.value)} /><button className="btn-dark">Track</button></form>
          {orders.length > 0 && !o && <p className="mt-3 text-xs text-espresso/60">Your orders: {orders.map((x) => <button key={x.id} className="mr-2 underline" onClick={() => { setId(x.id); setQ(x.id); }}>{x.id}</button>)}</p>}
          {q && !o && <p role="alert" className="mt-4 text-cherry">No order with that number was found in this browser.</p>}
          {o && (
            <div className="mt-8"><h2 className="text-3xl">Order {o.id}</h2>
              <ol className="mt-6 space-y-5">{STATUSES.map((s, i) => { const done = i <= o.status; const at = o.history.find((h) => h.s === i)?.at; return (
                <li key={s} className="flex items-start gap-4"><span className={`mt-0.5 grid h-7 w-7 place-items-center rounded-full border text-xs ${done ? 'border-espresso bg-espresso text-ivory' : 'border-espresso/30 text-espresso/40'}`}>{done ? <Check size={14} /> : i + 1}</span><div><p className={done ? 'font-medium' : 'text-espresso/50'}>{s}</p>{at && <p className="text-xs text-espresso/50">{new Date(at).toLocaleString('en-IN')}</p>}</div></li>); })}</ol>
              {o.status < STATUSES.length - 1 ? <button className="btn-ghost mt-8" onClick={() => advanceOrder(o.id)}>Simulate next step</button> : <p className="mt-8 text-sm text-moss">This demo order is marked Delivered.</p>}
              <p className="mt-3 text-xs text-espresso/50">Demo only: statuses move when you press the button.</p></div>)}
        </div>
        <SafeImage src={ORDER_IMAGES.delivery} alt="Furniture delivery" className="aspect-[4/3] w-full" />
      </div>
    </>
  );
}
