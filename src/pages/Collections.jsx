import { Link, useParams } from 'react-router-dom';
import SafeImage from '../components/SafeImage';
import ProductCard from '../components/ProductCard';
import NotFoundMsg from '../components/NotFoundMsg';
import { PageHeader } from '../components/ui';
import { collections, getCollection } from '../data/collections';
import { byIds } from '../data/products';

export default function Collections() {
  return (
    <>
      <PageHeader eyebrow="Collections" title="Edits of furniture, lighting and objects." intro={`${collections.length} edits chosen to sit well together.`} />
      <div className="container-x space-y-16 py-16">
        {collections.map((c, i) => (
          <Link key={c.slug} to={`/collections/${c.slug}`} className={`group grid items-center gap-8 md:grid-cols-2 ${i % 2 ? 'md:[&>div:first-child]:order-2' : ''}`}>
            <div className="aspect-[4/3] overflow-hidden bg-beige"><SafeImage src={c.image} alt={c.name} className="h-full w-full transition duration-700 group-hover:scale-105" /></div>
            <div><p className="eyebrow">{c.eyebrow}</p><h2 className="mt-3 text-5xl">{c.name}</h2><p className="mt-4 max-w-md text-espresso/70">{c.intro}</p><span className="mt-6 inline-block text-sm underline underline-offset-4">View the collection →</span></div>
          </Link>))}
      </div>
    </>
  );
}
export function CollectionPage() {
  const { slug } = useParams(); const c = getCollection(slug);
  if (!c) return <NotFoundMsg text="That collection does not exist." />;
  const items = byIds(c.products);
  return (
    <>
      <section style={{ background: c.theme.bg, color: c.theme.fg }}>
        <div className="container-x grid items-center gap-10 py-16 md:grid-cols-2 md:py-24"><div><p className="eyebrow" style={{ color: c.theme.accent }}>{c.eyebrow}</p><h1 className="mt-4 text-6xl leading-[1] md:text-7xl">{c.name}</h1><p className="mt-5 max-w-md text-lg opacity-80">{c.body}</p></div><SafeImage src={c.image} alt={c.name} className="aspect-[4/3] w-full" /></div>
      </section>
      <div className="container-x py-16"><div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div></div>
    </>
  );
}
