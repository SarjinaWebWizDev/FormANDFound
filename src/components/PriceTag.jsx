import { formatINR } from '../utils/helpers';
export default function PriceTag({ price, mrp, className = '' }) {
  return (
    <span className={`inline-flex items-baseline gap-2 ${className}`}>
      <span className="font-medium">{formatINR(price)}</span>
      {mrp ? <><span className="text-xs text-espresso/50 line-through">{formatINR(mrp)}</span><span className="text-xs text-cherry">{Math.round((1 - price / mrp) * 100)}% off</span></> : null}
    </span>
  );
}
