import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>
);
export const SectionHead = ({ eyebrow, title, to, cta = 'View all', center }) => (
  <div className={`mb-10 flex items-end justify-between gap-6 ${center ? 'flex-col items-center text-center' : ''}`}>
    <div>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-4xl leading-[1.05] md:text-5xl">{title}</h2>
    </div>
    {to && <Link to={to} className="hidden shrink-0 items-center gap-2 text-sm underline-offset-4 hover:underline md:inline-flex">{cta} <ArrowRight size={14} /></Link>}
  </div>
);
export const Section = ({ children, className = '', id }) => <section id={id} className={`py-16 md:py-24 ${className}`}><div className="container-x">{children}</div></section>;
export const PageHeader = ({ eyebrow, title, intro }) => (
  <div className="border-b border-espresso/10 bg-beige/50">
    <div className="container-x py-14 md:py-20">
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h1 className="max-w-3xl text-5xl leading-[1.02] md:text-7xl">{title}</h1>
      {intro && <p className="mt-6 max-w-xl text-lg text-espresso/70">{intro}</p>}
    </div>
  </div>
);
