import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { ROOMS, STYLES, PALETTES } from '../data/site';
import { products } from '../data/products';
import ProductCard from './ProductCard';

// Unique feature: a 3-question finder that picks a style + palette and links into the planner.
const Q = [
  { key: 'room', title: 'Which room are you styling?', opts: ROOMS.map((r) => ({ v: r.id, t: r.name })) },
  { key: 'mood', title: 'How should it feel?', opts: [
    { v: 'calm', t: 'Calm and low', style: 'japandi' }, { v: 'warm', t: 'Warm and natural', style: 'scandinavian' },
    { v: 'soft', t: 'Soft and sculptural', style: 'organic-modern' }, { v: 'bold', t: 'Bold and confident', style: 'mid-century' }, { v: 'clean', t: 'Clean and modern', style: 'modern-minimal' } ] },
  { key: 'palette', title: 'Pick a palette', opts: PALETTES.map((p) => ({ v: p.id, t: p.name, sw: p.swatches })) },
];
export default function StyleFinder() {
  const [step, setStep] = useState(0); const [ans, setAns] = useState({});
  const pick = (o) => { const a = { ...ans, [Q[step].key]: o }; setAns(a); setStep(step + 1); };
  const done = step >= Q.length;
  const style = done ? STYLES.find((s) => s.id === ans.mood.style) : null;
  const palette = done ? PALETTES.find((p) => p.id === ans.palette.v) : null;
  const picks = done ? products.map((p) => ({ p, s: (p.rooms.includes(ans.room.v) ? 2 : 0) + (p.styles.includes(style.id) ? 2 : 0) + (p.tones.includes(palette.id) ? 1 : 0) })).filter((x) => x.s >= 3).sort((a, b) => b.s - a.s || a.p.order - b.p.order).slice(0, 4).map((x) => x.p) : [];
  return (
    <div className="bg-beige/70 p-6 md:p-12">
      <div className="flex items-start justify-between gap-4"><div><p className="eyebrow">Style finder</p><h2 id="quiz-h" className="mt-3 text-4xl md:text-5xl">Find your style in three questions.</h2></div>
        {step > 0 && <button className="btn-ghost !px-3 !py-2" onClick={() => { setStep(0); setAns({}); }}><RotateCcw size={14} /> Restart</button>}</div>
      {!done ? (
        <div className="mt-8">
          <p className="text-sm text-espresso/60">Question {step + 1} of {Q.length}</p>
          <h3 className="mt-1 text-2xl">{Q[step].title}</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {Q[step].opts.map((o) => (
              <button key={o.v} onClick={() => pick(o)} className="flex items-center gap-3 border border-espresso/25 bg-ivory px-5 py-3 text-sm transition hover:-translate-y-0.5 hover:border-espresso">
                {o.sw && <span className="flex">{o.sw.map((c) => <i key={c} className="-ml-1 h-4 w-4 rounded-full border border-ivory first:ml-0" style={{ background: c }} />)}</span>}{o.t}
              </button>))}
          </div>
        </div>
      ) : (
        <div className="mt-8">
          <p className="text-lg">Your style: <b className="font-display text-2xl">{style.name}</b> in <b className="font-display text-2xl">{palette.name}</b> for the {ans.room.t.toLowerCase()}.</p>
          <p className="text-espresso/60">{style.blurb}</p>
          <div className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-4">{picks.map((p) => <ProductCard key={p.id} p={p} />)}</div>
          {!picks.length && <p className="mt-4 text-sm text-espresso/60">No close matches in the catalogue yet — start a design and browse everything.</p>}
          <Link className="btn-dark mt-8" to={`/design-your-space?room=${ans.room.v}&style=${style.id}&palette=${palette.id}`}>Start this design <ArrowRight size={15} /></Link>
        </div>
      )}
    </div>
  );
}
