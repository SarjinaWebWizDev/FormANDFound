import { Link } from 'react-router-dom';
import { ArrowRight, Gift, Truck, Sparkles } from 'lucide-react';
import HeroEditorial from '../components/HeroEditorial';
import ProductCard from '../components/ProductCard';
import JournalFeature from '../components/JournalFeature';
import ShopTheRoom from '../components/ShopTheRoom';
import SafeImage from '../components/SafeImage';
import { Reveal, Section, SectionHead } from '../components/ui';
import { CountUp, Tilt } from '../components/Fx';
import { products, CATEGORIES } from '../data/products';
import { collections } from '../data/collections';
import { ROOMS, CATEGORY_IMAGES, BANNERS, STORY_IMAGES } from '../data/site';
import { BUNDLES, bundlePrice } from '../data/offers';
import { useStore } from '../context/StoreContext';
import { formatINR } from '../utils/helpers';

const MARQUEE = ['Furniture', 'Lighting', 'Office Accessories', 'Planters', 'Everyday Objects', 'Curated Room Sets'];

export default function Home() {
  const { recent } = useStore();
  const best = products.filter((p) => p.bestseller);
  const fresh = products.filter((p) => p.isNew);
  const viewed = recent.map((id) => products.find((p) => p.id === id)).filter(Boolean).slice(0, 4);
  return (
    <>
      <HeroEditorial />
      <div className="overflow-hidden border-y border-espresso/10 bg-ivory py-3 md:py-5" aria-hidden>
        <div className="marquee flex w-max items-center gap-8 whitespace-nowrap font-display text-4xl italic md:gap-12 md:text-6xl">{[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((m, i) => <span key={i} className="flex items-center gap-8 md:gap-12"><span className={i % 2 ? 'text-walnut' : 'text-transparent [-webkit-text-stroke:1px_#5b4636]'}>{m}</span><i className="h-2 w-2 rotate-45 bg-gold" /></span>)}</div>
      </div>

      {/* by the numbers: real counts from the catalogue */}
      <section aria-label="The catalogue in numbers" className="bg-espresso text-ivory"><div className="container-x grid grid-cols-2 gap-y-8 py-10 md:grid-cols-4 md:py-14">
        {[[products.length, '', 'Considered pieces'], [ROOMS.length, '', 'Rooms to furnish'], [collections.length, '', 'Curated collections'], [CATEGORIES.length, '', 'Categories']].map(([n, suf, l]) => (
          <div key={l} className="px-2 text-center md:border-r md:border-gold/25 md:last:border-0"><p className="font-display text-5xl leading-none text-gold md:text-7xl"><CountUp to={n} suffix={suf} /></p><p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-ivory/75">{l}</p></div>))}
      </div></section>

      {/* privileges */}
      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[{ i: Gift, t: 'Welcome Privilege', d: '10% off your first eligible order over ₹5,000.', c: 'FIRST10' }, { i: Sparkles, t: 'Curated Room Privilege', d: '12% off complete curated room sets.', c: 'ROOM12' }, { i: Truck, t: 'Complimentary delivery', d: 'On orders above ₹10,000.', c: null }].map(({ i: Icon, t, d, c }) => (
            <Reveal key={t} className="last:sm:col-span-2 last:lg:col-span-1"><Link to="/offers" className="group flex h-full items-start gap-4 border border-espresso/15 bg-beige/40 p-6 transition hover:border-espresso"><Icon className="mt-1 shrink-0 text-walnut" /><div><h3 className="text-2xl">{t}</h3><p className="mt-1 text-sm text-espresso/70">{d}</p>{c && <span className="mt-3 inline-block border border-dashed border-walnut px-2 py-0.5 text-xs tracking-widest text-walnut">{c}</span>}</div></Link></Reveal>))}
        </div>
      </Section>

      {/* categories */}
      <Section className="!pt-0">
        <SectionHead eyebrow="Shop by category" title="Everything for the room." to="/shop" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-6 sm:gap-4 lg:grid-cols-5">
          {CATEGORIES.map((c, i) => (<Reveal key={c} delay={i * 0.05} className={`${i === CATEGORIES.length - 1 && CATEGORIES.length % 2 ? 'col-span-2' : ''} ${i < 3 ? 'sm:col-span-2' : 'sm:col-span-3'} lg:col-span-1`}><Tilt className="h-full"><Link to={`/shop?category=${encodeURIComponent(c)}`} className={`group relative block overflow-hidden bg-beige ${i === CATEGORIES.length - 1 && CATEGORIES.length % 2 ? 'aspect-[16/9]' : 'aspect-[4/5]'} sm:aspect-[4/5] lg:aspect-[3/4]`}><SafeImage src={CATEGORY_IMAGES[c]} alt={c} className="h-full w-full transition duration-700 group-hover:scale-105" /><div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/70 to-transparent p-4 pt-16 text-ivory"><h3 className="text-xl leading-tight sm:text-2xl">{c}</h3></div></Link></Tilt></Reveal>))}
        </div>
      </Section>

      {/* event banner */}
      <section className="relative isolate overflow-hidden bg-espresso text-ivory">
        <SafeImage src={BANNERS.considered} alt="" className="absolute inset-0 -z-10 h-full w-full opacity-45" />
        <div className="container-x py-24 md:py-32"><p className="eyebrow !text-gold">The Considered Home Event</p><h2 className="mt-4 max-w-2xl text-5xl leading-[1.02] md:text-7xl">Thoughtfully selected pieces for spaces that feel like you.</h2><p className="mt-5 max-w-lg text-ivory/75">Enjoy selected privileges on eligible furniture and curated room collections.</p><Link to="/offers" className="btn-light mt-8">Explore the Edit <ArrowRight size={15} /></Link></div>
      </section>

      <Section>
        <SectionHead eyebrow="Bestsellers" title="Most loved pieces." to="/shop" />
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">{best.slice(0, 8).map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </Section>

      <Section className="!pt-0"><ShopTheRoom /></Section>

      <Section className="bg-beige/50">
        <SectionHead eyebrow="Curated room sets" title="A whole room, considered." to="/offers" cta="See all sets" />
        <div className="grid gap-5 md:grid-cols-3">{BUNDLES.slice(0, 3).map((b) => (
          <Reveal key={b.id}><Link to="/offers#sets" className="group block bg-ivory"><div className="aspect-[4/3] overflow-hidden"><SafeImage src={b.image} alt={b.name} className="h-full w-full transition duration-700 group-hover:scale-105" /></div><div className="p-5"><h3 className="text-2xl">{b.name}</h3><p className="mt-1 text-sm text-espresso/70">{b.blurb}</p><p className="mt-3 text-sm">From {formatINR(bundlePrice(b))} · <span className="text-moss">12% off with ROOM12</span></p></div></Link></Reveal>))}</div>
      </Section>

      <Section>
        <SectionHead eyebrow="Collections" title="Edits to explore." to="/collections" />
        <div className="no-scrollbar -mx-5 flex snap-x gap-5 overflow-x-auto px-5 pb-2 md:mx-0 md:px-0">{collections.map((c) => (
          <Link key={c.slug} to={`/collections/${c.slug}`} className="group relative w-[78vw] shrink-0 snap-start sm:w-[360px]"><div className="aspect-[4/5] overflow-hidden bg-beige"><SafeImage src={c.image} alt={c.name} className="h-full w-full transition duration-700 group-hover:scale-105" /></div><p className="eyebrow mt-4">{c.eyebrow}</p><h3 className="text-3xl">{c.name}</h3><p className="text-sm text-espresso/60">{c.caption}</p></Link>))}</div>
      </Section>

      <Section className="!pt-0">
        <SectionHead eyebrow="Shop by room" title="Start with the room." to="/design-your-space" cta="Design your space" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{ROOMS.map((r) => (<Tilt key={r.id}><Link to={`/room/${r.id}`} className="group relative block aspect-[3/4] overflow-hidden bg-beige"><SafeImage src={r.tile || r.image} alt={r.name} className="h-full w-full transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 flex items-end bg-gradient-to-t from-espresso/70 to-transparent p-4 text-ivory"><h3 className="text-2xl">{r.name}</h3></div></Link></Tilt>))}</div>
      </Section>

      {/* story */}
      <section className="bg-espresso text-ivory"><div className="container-x grid items-center gap-10 py-20 md:grid-cols-2 md:py-28">
        <SafeImage src={STORY_IMAGES.workshop} alt="Makers at work in a woodworking studio" className="aspect-[4/5] w-full" />
        <div><p className="eyebrow !text-gold">Our story</p><h2 className="mt-4 text-5xl leading-[1.02] md:text-6xl">Made to be lived with.</h2><p className="mt-5 max-w-md text-ivory/75">We select furniture and objects for their form, material and honesty. Fewer, better things, chosen to last and to feel like yours.</p><Link to="/about" className="btn-ghost-light mt-8">About us</Link></div></div></section>

      <Section><SectionHead eyebrow="New arrivals" title="Just added." to="/shop?sort=new" /><div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">{fresh.slice(0, 4).map((p) => <ProductCard key={p.id} p={p} />)}</div></Section>

      {viewed.length > 0 && <Section className="!pt-0"><SectionHead eyebrow="Pick up where you left off" title="Recently viewed." /><div className="grid grid-cols-2 gap-5 lg:grid-cols-4">{viewed.map((p) => <ProductCard key={p.id} p={p} />)}</div></Section>}

      <JournalFeature />
    </>
  );
}
