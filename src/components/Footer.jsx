import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Loader2, Mail } from 'lucide-react';
import { NAV } from '../data/site';
import { load, save } from '../utils/helpers';

// Add real profile links here when they exist. Only entries in this list are shown, so no dead icons.
// Example: { label: 'Instagram', href: 'https://instagram.com/yourhandle', icon: <svg…/> }
export const SOCIALS = [];

const SHOP = NAV.slice(1, 6).map((n) => ({ label: n.label, to: n.to }));
const DISCOVER = [['Our Story', '/about'], ['The Journal', '/journal'], ['Offers', '/offers'], ['Track Order', '/track-order'], ['Compare', '/compare']];
const SUPPORT = [['FAQs', '/faqs'], ['Contact Us', '/contact'], ['Shipping & Returns', '/shipping-returns'], ['Privacy Policy', '/privacy'], ['Terms & Conditions', '/terms']];

const FootLink = ({ to, children }) => (
  <Link to={to} className="group inline-flex items-center gap-2 py-1 text-sm sm:py-1.5 sm:text-[15px] text-ivory/85 transition-colors hover:text-ivory focus-visible:text-ivory">
    <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px] group-focus-visible:bg-[length:100%_1px]">{children}</span>
    <ArrowRight size={14} aria-hidden="true" className="shrink-0 -translate-x-1 text-gold opacity-40 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
  </Link>
);

const Col = ({ title, items, last }) => (
  <nav aria-label={title} className={`min-w-0 ${last ? '' : ''} lg:border-l lg:border-gold/25 lg:pl-10`}>
    <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-gold">{title}</p>
    <ul className="mt-2 space-y-0 sm:mt-4">{items.map(([label, to]) => <li key={label}><FootLink to={to}>{label}</FootLink></li>)}</ul>
  </nav>
);

function Newsletter() {
  const [email, setEmail] = useState(''); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false); const [done, setDone] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (busy) return;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim())) { setErr('Please enter a valid email address.'); return; }
    setErr(''); setBusy(true);
    // Simulated request: the address is only stored in this browser.
    setTimeout(() => { save('ff.newsletter', 1, [...load('ff.newsletter', 1, []), email.trim()]); setBusy(false); setDone(true); }, 800);
  };
  return (
    <div className="w-full max-w-xl lg:justify-self-end">
      {done ? (
        <div role="status" className="flex items-start gap-3 rounded-[2rem] border border-gold/40 bg-espresso/60 p-5 text-ivory backdrop-blur-sm">
          <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ivory text-espresso"><Check size={16} /></span>
          <p><span className="block font-display text-2xl">Thank you. You are on the list.</span><span className="text-sm text-ivory/70">Demo form: your email is saved in this browser only.</span></p>
        </div>
      ) : (
        <form onSubmit={submit} noValidate aria-label="Newsletter">
          <div className={`flex items-center gap-2 rounded-full border bg-espresso/55 p-1.5 pl-4 backdrop-blur-sm transition-colors duration-300 focus-within:border-ivory/80 focus-within:bg-espresso/70 sm:pl-6 ${err ? 'border-cherry' : 'border-ivory/45 hover:border-ivory/70'}`}>
            <Mail size={19} aria-hidden="true" className="shrink-0 text-ivory/80" />
            <label htmlFor="nl" className="sr-only">Email address</label>
            <input id="nl" type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); if (err) setErr(''); }} placeholder="Your email address" aria-invalid={!!err} aria-describedby={err ? 'nl-err' : undefined} className="min-w-0 flex-1 bg-transparent py-3 text-base text-ivory outline-none placeholder:text-ivory/55" />
            <button type="submit" disabled={busy} className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-ivory px-4 py-3 text-sm font-medium text-espresso transition duration-300 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory disabled:opacity-80 sm:px-7 sm:text-[15px]">
              {busy ? <><Loader2 size={16} className="animate-spin" aria-hidden="true" /> Subscribing…</> : <>Subscribe <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" /></>}
            </button>
          </div>
          {err && <p id="nl-err" role="alert" className="mt-2 pl-6 text-sm text-[#f0b4a8]">{err}</p>}
        </form>
      )}
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="text-ivory">
      <section aria-labelledby="nl-h" className="relative isolate overflow-hidden bg-espresso">
        {/* Photo is mirrored so the sofa sits on the right, under the form, as in the reference. */}
        <img src="/images/footer-living-room.jpg" alt="" loading="lazy" decoding="async" className="absolute inset-0 -z-20 h-full w-full -scale-x-100 object-cover object-[30%_75%] sm:object-[50%_70%]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-espresso/70" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-espresso/90 via-espresso/45 to-espresso/10 max-sm:from-espresso/70 max-sm:to-espresso/40" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-b from-transparent to-espresso" />
        <div className="container-x grid grid-cols-[minmax(0,1fr)] items-center gap-6 pb-14 pt-12 sm:gap-8 sm:pb-20 sm:pt-16 md:pb-24 md:pt-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="flex items-center gap-4 text-[11px] font-medium uppercase tracking-[0.3em] text-gold">Stay in touch</p>
            <h2 id="nl-h" className="mt-4 text-[clamp(1.9rem,5vw,3.6rem)] leading-[1.05] text-ivory">Get the new edit first.</h2>
            <p className="mt-3 max-w-md text-base leading-relaxed text-ivory/85 sm:mt-5 sm:text-lg">New arrivals, room ideas and offers, sent occasionally.</p>
            <ul className="mt-5 flex flex-wrap gap-2 text-xs text-ivory/90">{['10% off your first order (FIRST10)', 'New arrivals first', 'Room styling ideas'].map((t) => <li key={t} className="flex items-center gap-1.5 border border-gold/50 bg-espresso/40 px-3 py-1.5 backdrop-blur-sm"><Check size={12} aria-hidden="true" className="text-gold" />{t}</li>)}</ul>
          </div>
          <Newsletter />
        </div>
      </section>

      <div className="bg-espresso">
        <div className="container-x grid grid-cols-2 gap-x-4 gap-y-8 py-9 sm:gap-x-6 sm:py-12 md:py-14 sm:grid-cols-3 lg:grid-cols-[1.15fr_1fr_1fr_1fr] lg:gap-x-10">
          <div className="col-span-2 min-w-0 sm:col-span-3 lg:col-span-1">
            <Link to="/" className="inline-block font-display text-[1.7rem] font-medium tracking-[0.2em] text-ivory sm:text-3xl">FORM &amp; FOUND</Link>
            <span aria-hidden="true" className="mt-3 block h-px w-24 bg-gold/70" />
            <p className="mt-4 font-display text-lg italic leading-snug sm:mt-6 sm:text-xl text-ivory/85">Objects with purpose.<br />Spaces with character.</p>
            {SOCIALS.length > 0 && <ul className="mt-6 flex gap-3">{SOCIALS.map((s) => <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="grid h-11 w-11 place-items-center rounded-full border border-ivory/50 text-ivory transition hover:border-gold hover:text-gold">{s.icon}</a></li>)}</ul>}
          </div>
          <Col title="Shop" items={SHOP.map((s) => [s.label, s.to])} />
          <Col title="Discover" items={DISCOVER} />
          <Col title="Support" items={SUPPORT} />
        </div>
        <div className="border-t border-gold/40">
          <div className="container-x flex flex-col gap-3 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
            <p className="text-ivory/75">© FORM &amp; FOUND. All rights reserved.</p>
            <p className="font-display text-base italic text-ivory/75 sm:border-l sm:border-gold/60 sm:pl-6">Designed for considered living.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
