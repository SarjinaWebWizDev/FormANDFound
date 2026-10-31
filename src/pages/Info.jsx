import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SafeImage from '../components/SafeImage';
import NotFoundMsg from '../components/NotFoundMsg';
import { PageHeader } from '../components/ui';
import { articles, getArticle, faqs, policies } from '../data/content';
import { STORY_IMAGES, BANNERS } from '../data/site';
import { useStore } from '../context/StoreContext';
import { load, save } from '../utils/helpers';

export function Journal() {
  return (<><PageHeader eyebrow="Journal" title="Ideas for the home." /><div className="container-x grid gap-8 py-14 md:grid-cols-2">{articles.map((a) => (<Link key={a.slug} to={`/journal/${a.slug}`} className="group block"><div className="aspect-[4/3] overflow-hidden bg-beige"><SafeImage src={a.image} alt={a.title} className="h-full w-full transition duration-700 group-hover:scale-105" /></div><p className="eyebrow mt-4">{a.category} · {a.date}</p><h2 className="text-3xl">{a.title}</h2><p className="mt-1 text-espresso/70">{a.excerpt}</p></Link>))}</div></>);
}
export function JournalArticle() {
  const { slug } = useParams(); const a = getArticle(slug); if (!a) return <NotFoundMsg />;
  return (<><PageHeader eyebrow={`${a.category} · ${a.date}`} title={a.title} /><div className="container-x max-w-3xl py-12"><SafeImage src={a.image} alt={a.title} className="aspect-[16/10] w-full" /><div className="mt-8 space-y-5 text-lg text-espresso/80">{a.body.map((t, i) => <p key={i}>{t}</p>)}</div><Link to="/journal" className="btn-ghost mt-10">← All articles</Link></div></>);
}
export function About() {
  return (<><PageHeader eyebrow="About" title="Fewer, better things." intro="FORM & FOUND selects furniture, lighting and objects for their form, materials and honesty." />
    <div className="container-x grid gap-10 py-14 md:grid-cols-3">{[STORY_IMAGES.workshop, STORY_IMAGES.tablet, STORY_IMAGES.detail].map((s) => <SafeImage key={s} src={s} alt="" className="aspect-[4/5] w-full" />)}</div>
    <div className="container-x max-w-2xl space-y-5 pb-20 text-lg text-espresso/80"><p>We start with the room: how it is used, where the light falls and what it needs. Then we choose pieces that suit it.</p><p>Our Design Your Space planner takes you from room to style to palette to a final plan with a live budget, so choices stay clear.</p><p className="text-sm text-espresso/60">This site is a demonstration storefront. Products, prices and orders are samples.</p></div>
    <SafeImage src={BANNERS.work} alt="" className="h-72 w-full" /></>);
}
export function Contact() {
  const { notify } = useStore(); const [f, setF] = useState({ name: '', email: '', message: '' }); const [sent, setSent] = useState(false);
  const submit = (e) => { e.preventDefault(); if (!f.name || !/^\S+@\S+\.\S+$/.test(f.email) || f.message.length < 5) return notify('Please complete all fields'); save('ff.messages', 1, [...load('ff.messages', 1, []), { ...f, at: Date.now() }]); setSent(true); };
  return (<><PageHeader eyebrow="Contact" title="Say hello." intro="Demo form: your message is saved in this browser only." /><div className="container-x max-w-xl py-12">{sent ? <p className="text-xl">Thank you. Your message was saved (demo).</p> : (
    <form onSubmit={submit} className="space-y-4"><input className="field" placeholder="Name" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} aria-label="Name" /><input className="field" placeholder="Email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} aria-label="Email" /><textarea rows={5} className="field" placeholder="Message" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} aria-label="Message" /><button className="btn-dark">Send</button></form>)}</div></>);
}
export function Faqs() {
  return (<><PageHeader eyebrow="Help" title="Frequently asked questions" /><div className="container-x max-w-3xl divide-y divide-espresso/10 py-12">{faqs.map((f) => <details key={f.q} className="group py-5"><summary className="cursor-pointer list-none font-display text-2xl">{f.q}</summary><p className="mt-3 text-espresso/75">{f.a}</p></details>)}</div></>);
}
export function Policy() {
  const { policy } = useParams(); const p = policies[policy]; if (!p) return <NotFound />;
  return (<><PageHeader title={p.title} /><div className="container-x max-w-3xl space-y-8 py-12">{p.sections.map(([h, t]) => <section key={h}><h2 className="text-3xl">{h}</h2><p className="mt-2 text-espresso/75">{t}</p></section>)}</div></>);
}
export const NotFound = () => <NotFoundMsg />;
