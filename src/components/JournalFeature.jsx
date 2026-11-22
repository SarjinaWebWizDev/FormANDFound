import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import SafeImage from './SafeImage';
import { Reveal } from './ui';
import { articles } from '../data/content';

// Editorial journal block: one large feature story plus a numbered list of reads.
export default function JournalFeature() {
  const [lead, ...rest] = articles; const list = rest.slice(0, 3);
  return (
    <section aria-labelledby="jf-h" className="relative overflow-hidden bg-beige/60 py-14 md:py-24">
      <div className="container-x relative">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="eyebrow">Stories &amp; guides</p><h2 id="jf-h" className="mt-3 text-4xl leading-[1.05] md:text-6xl">Ideas for <em className="text-moss">considered</em> homes.</h2></div>
          <Link to="/journal" className="btn-ghost inline-flex items-center gap-2 py-3">Read more <ArrowRight size={14} /></Link>
        </div>
        <div className="mt-8 grid gap-5 md:mt-12 lg:grid-cols-[1.25fr_1fr] lg:gap-8">
          <Reveal>
            <Link to={`/journal/${lead.slug}`} className="group relative block aspect-[4/5] overflow-hidden rounded-sm bg-espresso sm:aspect-[16/11] lg:aspect-auto lg:h-full lg:min-h-[520px]">
              <SafeImage src={lead.image} alt="" className="absolute inset-0 h-full w-full transition duration-[1200ms] ease-out group-hover:scale-105" />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-espresso/95 via-espresso/50 to-espresso/5" />
              <span className="absolute left-4 top-4 rounded-sm border border-ivory/50 bg-espresso/40 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-ivory backdrop-blur sm:left-6 sm:top-6">Featured · {lead.category}</span>
              <div className="absolute inset-x-0 bottom-0 p-5 text-ivory sm:p-8">
                <p className="text-xs uppercase tracking-[0.2em] text-ivory/90">{lead.date}</p>
                <h3 className="mt-2 max-w-xl text-3xl leading-tight sm:text-4xl md:text-5xl">{lead.title}</h3>
                <p className="mt-3 hidden max-w-md text-ivory/80 sm:block">{lead.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-2 rounded-sm bg-ivory py-2 pl-5 pr-2 text-xs uppercase tracking-[0.16em] text-espresso transition group-hover:bg-gold">Read story <span className="grid h-8 w-8 place-items-center rounded-sm bg-espresso text-ivory transition group-hover:rotate-45"><ArrowUpRight size={15} /></span></span>
              </div>
            </Link>
          </Reveal>
          <ul className="flex flex-col gap-3 md:gap-4">
            {list.map((a, n) => (
              <Reveal key={a.slug} delay={n * 0.08} className="flex-1">
                <li className="h-full list-none"><Link to={`/journal/${a.slug}`} className="group flex h-full items-center gap-4 rounded-sm border border-espresso/10 bg-ivory p-3 transition duration-500 hover:-translate-y-1 hover:border-gold hover:shadow-[0_18px_40px_-22px_rgba(43,33,27,.5)] sm:gap-5 sm:p-4">
                  <SafeImage src={a.image} alt="" className="h-20 w-20 shrink-0 rounded-sm min-[400px]:h-24 min-[400px]:w-24 sm:h-32 sm:w-32" />
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-walnut"><span className="font-display text-lg normal-case tracking-normal text-gold">0{n + 2}</span>{a.category} · {a.date}</p>
                    <h3 className="mt-1 text-xl leading-snug sm:text-2xl">{a.title}</h3>
                  </div>
                  <span className="hidden h-10 w-10 shrink-0 place-items-center rounded-sm border min-[400px]:grid border-espresso/20 text-espresso transition duration-500 group-hover:rotate-45 group-hover:border-moss group-hover:bg-moss group-hover:text-ivory"><ArrowUpRight size={16} /></span>
                </Link></li>
              </Reveal>))}
          </ul>
        </div>
      </div>
    </section>
  );
}
