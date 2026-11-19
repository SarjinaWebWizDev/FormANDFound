import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Check, ChevronLeft, ChevronRight, Minus, Plus, Sparkles, Trash2 } from 'lucide-react';
import SafeImage from '../components/SafeImage';
import PriceTag from '../components/PriceTag';
import { ROOMS, STYLES, PALETTES, SAVED_DESIGNS_IMAGE } from '../data/site';
import { products, getProductById } from '../data/products';
import { computeCart, unitPrice, unitImage } from '../data/offers';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/helpers';

// Three short steps instead of six: set up the room, pick pieces (budget lives beside them), review the plan.
const STEPS = ['Your room', 'Pieces', 'Final plan'];
const PRESETS = [75000, 150000, 300000, 500000];

const score = (p, d) => (p.rooms.includes(d.room) ? 3 : 0) + (p.styles.includes(d.style) ? 2 : 0) + (p.tones.includes(d.palette) ? 2 : 0);

export default function DesignYourSpace() {
  const [sp] = useSearchParams(); const { designs, saveDesign, deleteDesign, addToCart, couponCode, orders, notify } = useStore();
  const q = { room: ROOMS.some((r) => r.id === sp.get('room')) ? sp.get('room') : '', style: STYLES.some((s) => s.id === sp.get('style')) ? sp.get('style') : '', palette: PALETTES.some((p) => p.id === sp.get('palette')) ? sp.get('palette') : '' };
  // Style and palette start preselected, so choosing a room is the only required click.
  const [d, setD] = useState({ id: '', name: '', room: q.room, style: q.style || STYLES[0].id, palette: q.palette || PALETTES[0].id, budget: ROOMS.find((r) => r.id === q.room)?.budget || 150000, picks: [] });
  const [step, setStep] = useState(q.room ? 1 : 0);
  const [showAll, setShowAll] = useState({});
  const room = ROOMS.find((r) => r.id === d.room);
  const styleName = STYLES.find((x) => x.id === d.style)?.name; const paletteName = PALETTES.find((x) => x.id === d.palette)?.name;

  const picked = d.picks.map((k) => ({ ...k, product: getProductById(k.id) })).filter((k) => k.product);
  const lines = picked.map((k) => ({ id: k.id, variant: k.variant, qty: k.qty }));
  const calc = useMemo(() => computeCart(lines, { code: couponCode, ordersCount: orders.length }), [d.picks, couponCode, orders.length]);
  const listTotal = calc.subtotal;
  const left = d.budget - listTotal;

  const toggle = (p) => setD((x) => ({ ...x, picks: x.picks.some((k) => k.id === p.id) ? x.picks.filter((k) => k.id !== p.id) : [...x.picks, { id: p.id, variant: p.variants[0]?.name || '', qty: 1 }] }));
  const patch = (id, ch) => setD((x) => ({ ...x, picks: x.picks.map((k) => (k.id === id ? { ...k, ...ch } : k)) }));
  const swap = (fromId, toP) => setD((x) => ({ ...x, picks: x.picks.map((k) => (k.id === fromId ? { id: toP.id, variant: toP.variants[0]?.name || '', qty: k.qty } : k)) }));

  const candidates = (cat) => products.filter((p) => p.category === cat && p.rooms.includes(d.room)).sort((a, b) => score(b, d) - score(a, d) || a.order - b.order);
  const alternatives = (k) => products.filter((p) => p.category === k.product.category && p.id !== k.id && !d.picks.some((x) => x.id === p.id) && p.rooms.includes(d.room) && p.price <= unitPrice(k.product, k.variant) * 0.85)
    .sort((a, b) => score(b, d) - score(a, d) || b.price - a.price)[0];
  const suggest = () => setD((x) => ({ ...x, picks: room.slots.map((cat) => candidates(cat)[0]).filter(Boolean).map((p) => ({ id: p.id, variant: p.variants[0]?.name || '', qty: 1 })) }));

  const save = () => { const s = saveDesign({ ...d, name: d.name || `${room.name} · ${styleName}` }); setD((x) => ({ ...x, id: s.id, name: s.name })); };
  const load = (s) => { setD({ id: s.id, name: s.name, room: s.room, style: s.style, palette: s.palette, budget: s.budget, picks: s.picks }); setStep(2); window.scrollTo(0, 0); };
  const addAll = () => { picked.forEach((k) => addToCart(k.id, k.variant, k.qty, true)); notify('Plan added to your cart'); };
  const go = (n) => { setStep(n); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const canGo = (i) => (i === 0 ? true : i === 1 ? !!d.room : !!d.room && d.picks.length > 0);

  const BudgetBox = () => (
    <div>
      <div className="flex flex-wrap gap-1.5">{PRESETS.map((b) => <button key={b} onClick={() => setD({ ...d, budget: b })} className={`chip ${d.budget === b ? 'chip-on' : ''}`}>{formatINR(b)}</button>)}</div>
      <label className="mt-3 block text-xs text-espresso/70">Budget <b className="text-espresso">{formatINR(d.budget)}</b><input type="range" min={20000} max={800000} step={5000} value={d.budget} onChange={(e) => setD({ ...d, budget: Number(e.target.value) })} className="mt-1 w-full accent-walnut" aria-label="Budget" /></label>
      <div className="mt-2 h-2 w-full bg-beige" aria-label="Budget used"><div className={`h-2 transition-all ${left < 0 ? 'bg-cherry' : 'bg-sage'}`} style={{ width: `${Math.min(100, (listTotal / d.budget) * 100)}%` }} /></div>
      <p className={`mt-1.5 text-xs ${left < 0 ? 'text-cherry' : 'text-moss'}`}>{left < 0 ? `${formatINR(-left)} over budget` : `${formatINR(left)} left of ${formatINR(d.budget)}`}</p>
    </div>
  );

  return (
    <>
      {/* Slim header: the steps are the focus, so the title block stays one short row. */}
      <div className="border-b border-espresso/10 bg-beige/50"><div className="container-x flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 md:py-5"><div className="flex flex-wrap items-baseline gap-x-4"><p className="eyebrow">Design your space</p><h1 className="text-2xl leading-tight md:text-3xl">Plan a room, piece by piece.</h1></div><p className="text-sm text-espresso/60">3 quick steps · saved in this browser</p></div></div>
      <div className="container-x py-5 pb-28 md:py-8 lg:pb-10">
        <ol className="mb-6 flex flex-wrap items-center gap-x-2 gap-y-2 text-sm" aria-label="Steps">{STEPS.map((s, i) => (
          <li key={s} className="flex items-center gap-2"><button disabled={!canGo(i)} onClick={() => go(i)} aria-current={i === step ? 'step' : undefined} className={`flex items-center gap-2 whitespace-nowrap border px-3 py-1.5 transition disabled:cursor-not-allowed ${i === step ? 'border-espresso bg-espresso text-ivory' : i < step ? 'border-sage bg-sage/20' : 'border-espresso/20 text-espresso/50'}`}>{i < step ? <Check size={13} /> : <span>{i + 1}</span>}{s}</button>{i < STEPS.length - 1 && <span aria-hidden="true" className="h-px w-4 bg-espresso/20 sm:w-8" />}</li>))}</ol>

        {step === 0 && (<div className="space-y-9">
          <section aria-labelledby="r-h"><h2 id="r-h" className="text-2xl md:text-3xl">1. Which room?</h2><div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">{ROOMS.map((r) => (<button key={r.id} aria-pressed={d.room === r.id} onClick={() => setD({ ...d, room: r.id, budget: r.budget, picks: d.room === r.id ? d.picks : [] })} className={`group relative overflow-hidden text-left ${d.room === r.id ? 'ring-2 ring-espresso ring-offset-2 ring-offset-ivory' : ''}`}><SafeImage src={r.image} alt="" className="aspect-[4/3] w-full transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-espresso/75 to-transparent p-3 text-ivory"><h3 className="text-xl md:text-2xl">{r.name}</h3></div>{d.room === r.id && <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-ivory text-espresso"><Check size={13} /></span>}</button>))}</div></section>
          <section aria-labelledby="s-h"><h2 id="s-h" className="text-2xl md:text-3xl">2. Your style</h2><div role="radiogroup" aria-label="Style" className="mt-4 flex flex-wrap gap-2">{STYLES.map((s) => <button key={s.id} role="radio" aria-checked={d.style === s.id} onClick={() => setD({ ...d, style: s.id })} className={`chip min-h-[44px] px-4 text-sm ${d.style === s.id ? 'chip-on' : ''}`}>{s.name}</button>)}</div><p className="mt-2 text-xs text-espresso/60">{STYLES.find((s) => s.id === d.style)?.blurb}</p></section>
          <section aria-labelledby="p-h"><h2 id="p-h" className="text-2xl md:text-3xl">3. Your palette</h2><div role="radiogroup" aria-label="Palette" className="mt-4 flex flex-wrap gap-2">{PALETTES.map((p) => <button key={p.id} role="radio" aria-checked={d.palette === p.id} onClick={() => setD({ ...d, palette: p.id })} className={`chip min-h-[44px] gap-2 px-4 text-sm ${d.palette === p.id ? 'chip-on' : ''}`}><span className="flex">{p.swatches.map((c) => <i key={c} className="-ml-1 h-4 w-4 rounded-full border border-ivory first:ml-0" style={{ background: c }} />)}</span>{p.name}</button>)}</div></section>
          <div className="flex items-center justify-between gap-4 border-t border-espresso/10 pt-5"><p className="text-sm text-espresso/60">{room ? `${room.name} · ${styleName} · ${paletteName}` : 'Choose a room to continue.'}</p><div className="flex flex-wrap justify-end gap-2"><button className="btn-ghost" disabled={!room} onClick={() => { suggest(); go(2); }}><Sparkles size={14} /> Skip: build a set for me</button><button className="btn-dark" disabled={!room} onClick={() => go(1)}>Choose pieces <ChevronRight size={14} /></button></div></div>
        </div>)}

        {step === 1 && room && (<div className="grid gap-8 lg:grid-cols-[1fr_300px]"><div className="space-y-10">
          <div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="text-3xl md:text-4xl">Choose your pieces</h2><p className="mt-1 text-sm text-espresso/60">{room.name} · {styleName} · {paletteName}. <button className="underline" onClick={() => go(0)}>Change</button></p></div>
            {!picked.length && <button className="btn-ghost !py-2" onClick={suggest}><Sparkles size={14} /> Suggest a set for me</button>}</div>
          {room.slots.map((cat) => { const all = candidates(cat); const list = showAll[cat] ? all : all.slice(0, 4); if (!all.length) return null; return (
            <section key={cat}><h3 className="mb-3 text-2xl md:text-3xl">{cat}</h3><div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">{list.map((p) => { const on = d.picks.some((k) => k.id === p.id); return (
              <button key={p.id} aria-pressed={on} onClick={() => toggle(p)} className={`relative text-left ${on ? 'ring-2 ring-espresso' : ''}`}><SafeImage src={p.image} alt={p.name} className="aspect-[4/5] w-full" />{on && <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-espresso text-ivory"><Check size={14} /></span>}<div className="p-2"><p className="font-display text-lg leading-tight">{p.name}</p><PriceTag price={p.price} mrp={p.mrp} className="text-sm" /></div></button>); })}</div>
              {all.length > 4 && <button className="mt-2 py-2 text-sm underline" onClick={() => setShowAll({ ...showAll, [cat]: !showAll[cat] })}>{showAll[cat] ? 'Show fewer' : `Show all ${all.length}`}</button>}</section>); })}
        </div>
        <aside className="hidden h-fit space-y-4 border border-espresso/15 bg-beige/40 p-5 lg:sticky lg:top-24 lg:block"><div><h3 className="text-2xl">Your picks</h3><p className="text-sm text-espresso/60">{picked.length} piece{picked.length === 1 ? '' : 's'}</p><p className="mt-1 text-2xl">{formatINR(listTotal)}</p></div><BudgetBox /><button className="btn-dark w-full" disabled={!picked.length} onClick={() => go(2)}>See final plan <ChevronRight size={14} /></button></aside>
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-espresso/15 bg-ivory/95 p-3 backdrop-blur lg:hidden"><div className="mx-auto flex max-w-xl items-center gap-3"><div className="min-w-0 flex-1"><p className="text-sm">{picked.length} piece{picked.length === 1 ? '' : 's'} · <b>{formatINR(listTotal)}</b></p><p className={`truncate text-xs ${left < 0 ? 'text-cherry' : 'text-moss'}`}>{left < 0 ? `${formatINR(-left)} over` : `${formatINR(left)} left`} of {formatINR(d.budget)}</p></div><button className="btn-dark !px-4" disabled={!picked.length} onClick={() => go(2)}>Final plan <ChevronRight size={14} /></button></div></div>
        </div>)}

        {step === 2 && (<div className="grid gap-8 lg:grid-cols-[1fr_360px]"><div>
          <h2 className="text-3xl md:text-4xl">Your final plan</h2><p className="text-sm text-espresso/60">{room?.name} · {styleName} · {paletteName}. <button className="underline" onClick={() => go(1)}>Edit pieces</button></p>
          <ul className="mt-5 divide-y divide-espresso/10">{picked.map((k) => { const alt = alternatives(k); return (<li key={k.id} className="flex gap-4 py-4"><SafeImage src={unitImage(k.product, k.variant)} alt={k.product.name} className="h-24 w-20 shrink-0 md:h-28 md:w-24" /><div className="min-w-0 flex-1"><Link to={`/product/${k.product.slug}`} className="font-display text-xl leading-tight md:text-2xl">{k.product.name}</Link>
            {k.product.variants.length > 0 && <select aria-label="Finish" className="mt-1 block border border-espresso/20 bg-ivory px-2 py-1 text-sm" value={k.variant} onChange={(e) => patch(k.id, { variant: e.target.value })}>{k.product.variants.map((v) => <option key={v.name}>{v.name}</option>)}</select>}
            <div className="mt-2 flex items-center gap-4"><div className="flex items-center border border-espresso/20"><button aria-label="Decrease" className="p-2" onClick={() => k.qty > 1 && patch(k.id, { qty: k.qty - 1 })}><Minus size={12} /></button><span className="w-7 text-center text-sm">{k.qty}</span><button aria-label="Increase" className="p-2" onClick={() => patch(k.id, { qty: Math.min(20, k.qty + 1) })}><Plus size={12} /></button></div><button aria-label="Remove piece" onClick={() => toggle(k.product)}><Trash2 size={15} /></button></div>
            {alt && <button onClick={() => swap(k.id, alt)} className="mt-2 text-left text-xs text-moss underline">Save {formatINR((unitPrice(k.product, k.variant) - alt.price) * k.qty)}: swap for {alt.name}</button>}</div><span className="text-sm md:text-base">{formatINR(unitPrice(k.product, k.variant) * k.qty)}</span></li>); })}</ul>
          {!picked.length && <p className="py-8 text-espresso/60">No pieces yet. <button className="underline" onClick={() => go(1)}>Choose pieces</button></p>}
        </div><aside className="h-fit space-y-4 border border-espresso/15 bg-beige/40 p-5 md:p-6"><h3 className="text-2xl">Plan total</h3>
          <div className="space-y-2 text-sm"><div className="flex justify-between"><span>Pieces</span><span>{formatINR(calc.subtotal)}</span></div>{calc.subtotal - calc.merchandise > 0 && <div className="flex justify-between text-moss"><span>Offers applied</span><span>− {formatINR(calc.subtotal - calc.merchandise)}</span></div>}<div className="flex justify-between"><span>Delivery</span><span>{calc.deliveryFree ? 'Complimentary' : formatINR(calc.delivery)}</span></div><div className="flex justify-between border-t border-espresso/15 pt-2 text-xl"><span>Total</span><span>{formatINR(calc.total)}</span></div><p className={`text-xs ${d.budget - calc.total < 0 ? 'text-cherry' : 'text-moss'}`}>Budget {formatINR(d.budget)} · {d.budget - calc.total < 0 ? `${formatINR(calc.total - d.budget)} over` : `${formatINR(d.budget - calc.total)} left`}</p></div>
          <BudgetBox />
          <input className="field" placeholder="Name this design" value={d.name} onChange={(e) => setD({ ...d, name: e.target.value })} aria-label="Design name" />
          <button className="btn-dark w-full" disabled={!picked.length} onClick={save}>{d.id ? 'Update saved design' : 'Save design'}</button><button className="btn-ghost w-full" disabled={!picked.length} onClick={addAll}>Add all to cart</button></aside></div>)}

        {step === 2 && <div className="mt-8"><button className="btn-ghost" onClick={() => go(1)}><ChevronLeft size={14} /> Back to pieces</button></div>}

        <section className="mt-14 border-t border-espresso/10 pt-10" aria-labelledby="saved-h"><div className="grid gap-6 md:grid-cols-[160px_1fr]"><SafeImage src={SAVED_DESIGNS_IMAGE} alt="A moodboard of saved room designs" className="hidden aspect-square w-full md:block" /><div><h2 id="saved-h" className="text-3xl">Saved designs</h2>
          {designs.length === 0 ? <p className="mt-2 text-espresso/60">Nothing saved yet. Finish a plan and press “Save design”.</p> : <ul className="mt-4 space-y-3">{designs.map((s) => (<li key={s.id} className="flex flex-wrap items-center justify-between gap-3 border border-espresso/10 p-4"><div><p className="font-display text-2xl">{s.name}</p><p className="text-xs text-espresso/60">{s.picks.length} pieces · budget {formatINR(s.budget)} · {new Date(s.createdAt).toLocaleDateString('en-IN')}</p></div><div className="flex gap-2"><button className="btn-dark !py-2" onClick={() => load(s)}>Open</button><button className="btn-ghost !py-2" aria-label={`Delete ${s.name}`} onClick={() => deleteDesign(s.id)}><Trash2 size={14} /></button></div></li>))}</ul>}</div></div></section>
      </div>
    </>
  );
}
