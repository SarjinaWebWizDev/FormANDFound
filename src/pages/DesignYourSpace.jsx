import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check, ChevronLeft, ChevronRight, Minus, Plus, Trash2 } from 'lucide-react';
import SafeImage from '../components/SafeImage';
import PriceTag from '../components/PriceTag';
import { PageHeader } from '../components/ui';
import { ROOMS, STYLES, PALETTES, PLANNER_IMAGES, SAVED_DESIGNS_IMAGE } from '../data/site';
import { products, getProductById } from '../data/products';
import { computeCart, unitPrice, unitImage } from '../data/offers';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/helpers';

const STEPS = ['Room', 'Style', 'Palette', 'Products', 'Budget', 'Final Plan'];
const PRESETS = [75000, 150000, 300000, 500000];

const score = (p, d) => (p.rooms.includes(d.room) ? 3 : 0) + (p.styles.includes(d.style) ? 2 : 0) + (p.tones.includes(d.palette) ? 2 : 0);

export default function DesignYourSpace() {
  const [sp] = useSearchParams(); const { designs, saveDesign, deleteDesign, addToCart, couponCode, orders, notify } = useStore();
  const q = { room: ROOMS.some((r) => r.id === sp.get('room')) ? sp.get('room') : '', style: STYLES.some((s) => s.id === sp.get('style')) ? sp.get('style') : '', palette: PALETTES.some((p) => p.id === sp.get('palette')) ? sp.get('palette') : '' };
  const [d, setD] = useState({ id: '', name: '', room: q.room, style: q.style, palette: q.palette, budget: ROOMS.find((r) => r.id === q.room)?.budget || 150000, picks: [] });
  const [step, setStep] = useState(q.palette ? 3 : q.style ? 2 : q.room ? 1 : 0);
  const [showAll, setShowAll] = useState({});
  const room = ROOMS.find((r) => r.id === d.room);

  const picked = d.picks.map((k) => ({ ...k, product: getProductById(k.id) })).filter((k) => k.product);
  const lines = picked.map((k) => ({ id: k.id, variant: k.variant, qty: k.qty }));
  const calc = useMemo(() => computeCart(lines, { code: couponCode, ordersCount: orders.length }), [d.picks, couponCode, orders.length]);
  const spend = calc.merchandise; const listTotal = calc.subtotal;
  const left = d.budget - listTotal;

  const toggle = (p) => setD((x) => ({ ...x, picks: x.picks.some((k) => k.id === p.id) ? x.picks.filter((k) => k.id !== p.id) : [...x.picks, { id: p.id, variant: p.variants[0]?.name || '', qty: 1 }] }));
  const patch = (id, ch) => setD((x) => ({ ...x, picks: x.picks.map((k) => (k.id === id ? { ...k, ...ch } : k)) }));
  const swap = (fromId, toP) => setD((x) => ({ ...x, picks: x.picks.map((k) => (k.id === fromId ? { id: toP.id, variant: toP.variants[0]?.name || '', qty: k.qty } : k)) }));

  const candidates = (cat) => products.filter((p) => p.category === cat && p.rooms.includes(d.room)).sort((a, b) => score(b, d) - score(a, d) || a.order - b.order);
  const alternatives = (k) => products.filter((p) => p.category === k.product.category && p.id !== k.id && !d.picks.some((x) => x.id === p.id) && p.rooms.includes(d.room) && p.price <= unitPrice(k.product, k.variant) * 0.85)
    .sort((a, b) => score(b, d) - score(a, d) || b.price - a.price)[0];

  const canNext = [!!d.room, !!d.style, !!d.palette, d.picks.length > 0, true][step];
  const save = () => { const s = saveDesign({ ...d, name: d.name || `${room.name} · ${STYLES.find((x) => x.id === d.style)?.name}` }); setD((x) => ({ ...x, id: s.id, name: s.name })); };
  const load = (s) => { setD({ id: s.id, name: s.name, room: s.room, style: s.style, palette: s.palette, budget: s.budget, picks: s.picks }); setStep(5); window.scrollTo(0, 0); };
  const addAll = () => { picked.forEach((k) => addToCart(k.id, k.variant, k.qty, true)); notify('Plan added to your cart'); };

  return (
    <>
      <PageHeader eyebrow="Design Your Space" title="Plan a room, piece by piece." intro="Choose a room, style and palette, pick pieces and watch the budget. Everything is saved in this browser." />
      <div className="container-x py-10">
        <ol className="mb-10 flex gap-2 overflow-x-auto no-scrollbar" aria-label="Steps">{STEPS.map((s, i) => (
          <li key={s}><button disabled={i > step && !(d.room && d.style && d.palette && d.picks.length)} onClick={() => setStep(i)} aria-current={i === step ? 'step' : undefined} className={`flex items-center gap-2 whitespace-nowrap border px-4 py-2 text-sm ${i === step ? 'border-espresso bg-espresso text-ivory' : i < step ? 'border-sage bg-sage/20' : 'border-espresso/20 text-espresso/50'}`}>{i < step ? <Check size={14} /> : <span>{i + 1}</span>}{s}</button></li>))}</ol>

        {step === 0 && <div><h2 className="text-4xl">Which room?</h2><div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">{ROOMS.map((r) => (<button key={r.id} onClick={() => { setD({ ...d, room: r.id, budget: r.budget, picks: d.room === r.id ? d.picks : [] }); setStep(1); }} className={`group relative text-left ${d.room === r.id ? 'ring-2 ring-espresso' : ''}`}><SafeImage src={r.image} alt={r.name} className="aspect-[3/4] w-full" /><div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-espresso/75 to-transparent p-4 text-ivory"><h3 className="text-2xl">{r.name}</h3><p className="text-xs opacity-80">{r.blurb}</p></div></button>))}</div></div>}

        {step === 1 && <div><h2 className="text-4xl">Which style?</h2><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{STYLES.map((s) => (<button key={s.id} onClick={() => { setD({ ...d, style: s.id }); setStep(2); }} className={`text-left ${d.style === s.id ? 'ring-2 ring-espresso' : ''}`}><SafeImage src={s.image} alt={s.name} className="aspect-[4/5] w-full" /><div className="p-3"><h3 className="text-2xl">{s.name}</h3><p className="text-xs text-espresso/60">{s.blurb}</p></div></button>))}</div></div>}

        {step === 2 && <div><h2 className="text-4xl">Which palette?</h2><div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">{PALETTES.map((p) => (<button key={p.id} onClick={() => { setD({ ...d, palette: p.id }); setStep(3); }} className={`text-left ${d.palette === p.id ? 'ring-2 ring-espresso' : ''}`}><SafeImage src={p.image} alt={p.name} className="aspect-square w-full" /><div className="flex items-center justify-between p-3"><h3 className="text-xl">{p.name}</h3><span className="flex">{p.swatches.map((c) => <i key={c} className="-ml-1 h-5 w-5 rounded-full border border-ivory first:ml-0" style={{ background: c }} />)}</span></div></button>))}</div></div>}

        {step === 3 && room && (<div className="grid gap-10 lg:grid-cols-[1fr_300px]"><div className="space-y-12">
          <div><h2 className="text-4xl">Choose your pieces</h2><p className="mt-1 text-sm text-espresso/60">Best matches for a {STYLES.find((s) => s.id === d.style)?.name} {room.name.toLowerCase()} in {PALETTES.find((p) => p.id === d.palette)?.name} come first.</p></div>
          {room.slots.map((cat) => { const all = candidates(cat); const list = showAll[cat] ? all : all.slice(0, 4); if (!all.length) return null; return (
            <section key={cat}><h3 className="mb-4 text-3xl">{cat}</h3><div className="grid grid-cols-2 gap-4 md:grid-cols-4">{list.map((p) => { const on = d.picks.some((k) => k.id === p.id); return (
              <button key={p.id} aria-pressed={on} onClick={() => toggle(p)} className={`relative text-left ${on ? 'ring-2 ring-espresso' : ''}`}><SafeImage src={p.image} alt={p.name} className="aspect-[4/5] w-full" />{on && <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-espresso text-ivory"><Check size={14} /></span>}<div className="p-2"><p className="font-display text-lg leading-tight">{p.name}</p><PriceTag price={p.price} mrp={p.mrp} className="text-sm" /></div></button>); })}</div>
              {all.length > 4 && <button className="mt-3 py-2 text-sm underline" onClick={() => setShowAll({ ...showAll, [cat]: !showAll[cat] })}>{showAll[cat] ? 'Show fewer' : `Show all ${all.length}`}</button>}</section>); })}
        </div><aside className="h-fit border border-espresso/15 bg-beige/40 p-5 lg:sticky lg:top-32"><h3 className="text-2xl">Your picks</h3><p className="text-sm text-espresso/60">{picked.length} piece{picked.length === 1 ? '' : 's'}</p><p className="mt-2 text-2xl">{formatINR(listTotal)}</p><p className={`text-xs ${left < 0 ? 'text-cherry' : 'text-moss'}`}>{left < 0 ? `${formatINR(-left)} over budget` : `${formatINR(left)} left of ${formatINR(d.budget)}`}</p></aside></div>)}

        {step === 4 && (<div className="grid items-start gap-10 lg:grid-cols-[1fr_380px]"><div>
          <h2 className="text-4xl">Set your budget</h2>
          <div className="mt-5 flex flex-wrap gap-2">{PRESETS.map((b) => <button key={b} onClick={() => setD({ ...d, budget: b })} className={`chip ${d.budget === b ? 'chip-on' : ''}`}>{formatINR(b)}</button>)}</div>
          <label className="mt-6 block text-sm">Or choose an amount: <b>{formatINR(d.budget)}</b><input type="range" min={20000} max={800000} step={5000} value={d.budget} onChange={(e) => setD({ ...d, budget: Number(e.target.value) })} className="mt-2 w-full accent-walnut" aria-label="Budget" /></label>
          <div className="mt-6" aria-label="Budget used"><div className="h-3 w-full bg-beige"><div className={`h-3 ${left < 0 ? 'bg-cherry' : 'bg-sage'}`} style={{ width: `${Math.min(100, (listTotal / d.budget) * 100)}%` }} /></div><p className={`mt-2 text-sm ${left < 0 ? 'text-cherry' : 'text-moss'}`}>{formatINR(listTotal)} of {formatINR(d.budget)} — {left < 0 ? `${formatINR(-left)} over` : `${formatINR(left)} remaining`}</p></div>
          <h3 className="mt-10 text-3xl">Ways to save</h3>
          <ul className="mt-4 space-y-4">{picked.map((k) => { const alt = alternatives(k); if (!alt) return null; const save = unitPrice(k.product, k.variant) - alt.price; return (
            <li key={k.id} className="flex items-center gap-4 border border-espresso/10 p-3"><SafeImage src={k.product.image} alt="" className="h-16 w-14" /><span className="text-xs">→</span><SafeImage src={alt.image} alt="" className="h-16 w-14" /><div className="flex-1 text-sm"><b>{alt.name}</b> instead of {k.product.name}<br /><span className="text-moss">Saves {formatINR(save * k.qty)}</span></div><button className="btn-ghost !py-2" onClick={() => swap(k.id, alt)}>Swap</button></li>); })}
            {!picked.some((k) => alternatives(k)) && <li className="text-sm text-espresso/60">No cheaper alternatives for your current picks.</li>}</ul>
        </div><aside className="space-y-3"><SafeImage src={PLANNER_IMAGES.budget} alt="Budget planner" className="aspect-[4/3] w-full" /></aside></div>)}

        {step === 5 && (<div className="grid gap-10 lg:grid-cols-[1fr_380px]"><div>
          <h2 className="text-4xl">Your final plan</h2><p className="text-sm text-espresso/60">{room?.name} · {STYLES.find((s) => s.id === d.style)?.name} · {PALETTES.find((p) => p.id === d.palette)?.name}</p>
          <ul className="mt-6 divide-y divide-espresso/10">{picked.map((k) => (<li key={k.id} className="flex gap-4 py-4"><SafeImage src={unitImage(k.product, k.variant)} alt={k.product.name} className="h-28 w-24 shrink-0" /><div className="flex-1"><Link to={`/product/${k.product.slug}`} className="font-display text-2xl">{k.product.name}</Link>
            {k.product.variants.length > 0 && <select aria-label="Finish" className="mt-1 block border border-espresso/20 bg-ivory px-2 py-1 text-sm" value={k.variant} onChange={(e) => patch(k.id, { variant: e.target.value })}>{k.product.variants.map((v) => <option key={v.name}>{v.name}</option>)}</select>}
            <div className="mt-2 flex items-center gap-4"><div className="flex items-center border border-espresso/20"><button aria-label="Decrease" className="p-2" onClick={() => k.qty > 1 && patch(k.id, { qty: k.qty - 1 })}><Minus size={12} /></button><span className="w-7 text-center text-sm">{k.qty}</span><button aria-label="Increase" className="p-2" onClick={() => patch(k.id, { qty: Math.min(20, k.qty + 1) })}><Plus size={12} /></button></div><button aria-label="Remove piece" onClick={() => toggle(k.product)}><Trash2 size={15} /></button></div></div><span>{formatINR(unitPrice(k.product, k.variant) * k.qty)}</span></li>))}</ul>
          {!picked.length && <p className="py-8 text-espresso/60">No pieces yet. <button className="underline" onClick={() => setStep(3)}>Choose pieces</button></p>}
        </div><aside className="h-fit space-y-4 border border-espresso/15 bg-beige/40 p-6"><h3 className="text-2xl">Plan total</h3>
          <div className="space-y-2 text-sm"><div className="flex justify-between"><span>Pieces</span><span>{formatINR(calc.subtotal)}</span></div>{calc.subtotal - calc.merchandise > 0 && <div className="flex justify-between text-moss"><span>Offers applied</span><span>− {formatINR(calc.subtotal - calc.merchandise)}</span></div>}<div className="flex justify-between"><span>Delivery</span><span>{calc.deliveryFree ? 'Complimentary' : formatINR(calc.delivery)}</span></div><div className="flex justify-between border-t border-espresso/15 pt-2 text-xl"><span>Total</span><span>{formatINR(calc.total)}</span></div><p className={`text-xs ${d.budget - calc.total < 0 ? 'text-cherry' : 'text-moss'}`}>Budget {formatINR(d.budget)} · {d.budget - calc.total < 0 ? `${formatINR(calc.total - d.budget)} over` : `${formatINR(d.budget - calc.total)} left`}</p></div>
          <input className="field" placeholder="Name this design" value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} aria-label="Design name" />
          <button className="btn-dark w-full" disabled={!picked.length} onClick={save}>{d.id ? 'Update saved design' : 'Save design'}</button><button className="btn-ghost w-full" disabled={!picked.length} onClick={addAll}>Add all to cart</button></aside></div>)}

        {step < 5 && (<div className="mt-12 flex justify-between border-t border-espresso/10 pt-6"><button className="btn-ghost" disabled={step === 0} onClick={() => setStep(step - 1)}><ChevronLeft size={14} /> Back</button><button className="btn-dark" disabled={!canNext} onClick={() => setStep(step + 1)}>{step === 4 ? 'See final plan' : 'Next'} <ChevronRight size={14} /></button></div>)}

        <section className="mt-20 border-t border-espresso/10 pt-12" aria-labelledby="saved-h"><div className="grid gap-8 md:grid-cols-[260px_1fr]"><SafeImage src={SAVED_DESIGNS_IMAGE} alt="A moodboard of saved room designs" className="aspect-square w-full" /><div><h2 id="saved-h" className="text-4xl">Saved designs</h2>
          {designs.length === 0 ? <p className="mt-3 text-espresso/60">Nothing saved yet. Finish a plan and press “Save design”.</p> : <ul className="mt-5 space-y-3">{designs.map((s) => (<li key={s.id} className="flex flex-wrap items-center justify-between gap-3 border border-espresso/10 p-4"><div><p className="font-display text-2xl">{s.name}</p><p className="text-xs text-espresso/60">{s.picks.length} pieces · budget {formatINR(s.budget)} · {new Date(s.createdAt).toLocaleDateString('en-IN')}</p></div><div className="flex gap-2"><button className="btn-dark !py-2" onClick={() => load(s)}>Open</button><button className="btn-ghost !py-2" aria-label={`Delete ${s.name}`} onClick={() => deleteDesign(s.id)}><Trash2 size={14} /></button></div></li>))}</ul>}</div></div></section>
      </div>
    </>
  );
}
