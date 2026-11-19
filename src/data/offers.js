import { products, getProduct } from './products';
import { img } from './products';
import { DELIVERY_FEE, FREE_DELIVERY_ABOVE, formatINR } from '../utils/helpers';

// ---------------------------------------------------------------------------
// Curated room sets ("bundles"). Pieces are listed by slug with a quantity.
// ---------------------------------------------------------------------------
export const BUNDLES = [
  { id: 'contemporary-living', name: 'Contemporary Living Room', image: img('bundle-contemporary-living-room'), room: 'living',
    blurb: 'A soft, neutral living room built around a bouclé sofa.',
    items: [['boucle-cloud-sofa', 1], ['raw-stone-coffee-table', 1], ['arc-floor-lamp', 1], ['oatmeal-wool-rug', 1], ['cream-ripple-vase', 1]] },
  { id: 'minimalist-bedroom', name: 'Minimalist Bedroom', image: img('bundle-minimalist-bedroom'), room: 'bedroom',
    blurb: 'Quiet textures and a soft bedside light.',
    items: [['oak-side-table', 2], ['ceramic-table-lamp', 2], ['linen-bed-throw', 1], ['linen-cushion-pair', 1], ['pebble-wall-mirror', 1]] },
  { id: 'modern-dining', name: 'Modern Dining Space', image: img('bundle-modern-dining-space'), room: 'dining',
    blurb: 'A pedestal table, four chairs, a pendant and tableware.',
    items: [['spiral-pedestal-table', 1], ['walnut-dining-chair', 4], ['bronze-pendant-light', 1], ['stoneware-tableware-set', 1]] },
  { id: 'natural-home-office', name: 'Natural Home Office', image: img('bundle-natural-home-office'), room: 'office',
    blurb: 'An oak desk, a good chair and the small things that go with them.',
    items: [['minimal-oak-desk', 1], ['tan-executive-chair', 1], ['desk-organiser', 1], ['sculptural-table-lamp', 1], ['olive-tree-planter', 1]] },
  { id: 'cherry-lounge', name: 'The Cherry Lounge', image: img('lifestyle-cherry-lounge'), room: 'living',
    blurb: 'A pod chair, lacquer table, dome lamp and a bold rug.',
    items: [['cherry-pod-chair', 1], ['cherry-lacquer-side-table', 1], ['cherry-dome-lamp', 1], ['abstract-tufted-rug', 1]] },
  { id: 'sculpted-wood-bedroom', name: 'Sculpted Wood Bedroom', image: img('bundle-sculpted-wood-bedroom'), room: 'bedroom',
    blurb: 'A carved wooden bed, woven pendants and natural linen.',
    items: [['sculpted-platform-bed', 1], ['brass-leaf-pendants', 1], ['oak-side-table', 1], ['linen-bed-throw', 1], ['linen-cushion-pair', 1]] },
  { id: 'sandstone-retreat', name: 'Sandstone Retreat Bedroom', image: img('bundle-sandstone-retreat-bedroom'), room: 'bedroom',
    blurb: 'Warm, rounded and calm, like a room carved from stone.',
    items: [['cloud-boucle-stool', 1], ['oatmeal-wool-rug', 1], ['twisted-floor-vases', 1], ['linen-bed-throw', 1], ['ceramic-table-lamp', 1]] },
  { id: 'blush-arch-bedroom', name: 'Blush Arch Bedroom', image: img('bundle-blush-arch-bedroom'), room: 'bedroom',
    blurb: 'Soft boucle, ribbed panels and a glow by the bed.',
    items: [['ceramic-table-lamp', 1], ['cloud-boucle-stool', 1], ['linen-bed-throw', 1], ['linen-cushion-pair', 1], ['oatmeal-wool-rug', 1]] },
  { id: 'curved-lacquer-bedroom', name: 'Curved Lacquer Bedroom', image: img('bundle-curved-lacquer-bedroom'), room: 'bedroom',
    blurb: 'A sweeping bed profile with warm wood and pendant light.',
    items: [['oak-side-table', 2], ['lantern-table-lamps', 1], ['linen-bed-throw', 1], ['pebble-wall-mirror', 1]] },
  { id: 'oxblood-bedroom', name: 'The Oxblood Bedroom', image: img('bundle-oxblood-bedroom'), room: 'bedroom',
    blurb: 'Deep red, cream boucle and glowing lamps for evening calm.',
    items: [['oxblood-stool', 1], ['cherry-lacquer-side-table', 1], ['ceramic-table-lamp', 1], ['abstract-tufted-rug', 1], ['linen-bed-throw', 1]] },
  { id: 'chrome-sculpt-living', name: 'Chrome Sculpt Living Room', image: img('bundle-chrome-sculpt-living'), room: 'living',
    blurb: 'Mirror chrome against cream boucle and a plush rug.',
    items: [['boucle-cloud-sofa', 1], ['liquid-chrome-table', 1], ['chrome-ripple-bench', 1], ['oatmeal-wool-rug', 1]] },
  { id: 'coastal-blue-living', name: 'Coastal Blue Living Room', image: img('bundle-coastal-blue-living'), room: 'living',
    blurb: 'A soft blue chair, travertine table and warm glow shelves.',
    items: [['royal-blue-lounge-chair', 1], ['raw-stone-coffee-table', 1], ['ocean-wave-sofa', 1], ['smoked-glass-vase', 1], ['oatmeal-wool-rug', 1]] },
  { id: 'cocoa-boucle-bedroom', name: 'Cocoa Bouclé Bedroom', image: img('bundle-cocoa-boucle-bedroom'), room: 'bedroom',
    blurb: 'Chocolate bouclé, soft linen and a deep ivory rug.',
    items: [['oval-mirror-dressing-table', 1], ['cloud-boucle-stool', 1], ['oatmeal-wool-rug', 1], ['stoneware-linen-table-lamp', 1], ['linen-bed-throw', 1]] },
  { id: 'sculpted-mirror-corner', name: 'Sculpted Mirror Corner', image: img('bundle-sculpted-mirror-corner'), room: 'living',
    blurb: 'Soft-edged mirrors, a fluted planter and a brass floor lamp.',
    items: [['pebble-wall-mirror', 1], ['brass-drum-arc-lamp', 1], ['cloud-boucle-stool', 1], ['hourglass-planter-trio', 1]] },
];
export const getBundle = (id) => BUNDLES.find((b) => b.id === id);
export const bundlePrice = (b) => b.items.reduce((s, [slug, q]) => s + (getProduct(slug)?.price || 0) * q, 0);

// Standard saving when every piece of a set is in the cart.
export const SET_SAVING_PCT = 5;

// ---------------------------------------------------------------------------
// Central promotion config. Everything the offers page, announcement bar, cart
// and checkout show comes from here.
//   type: 'percent' | 'free-delivery' | 'sale' | 'showcase'
//   eligibility: 'first-order' | 'bundles' | 'all' | 'selected'
// ---------------------------------------------------------------------------
export const PROMOTIONS = [
  { id: 'welcome-privilege', title: 'Welcome Privilege', code: 'FIRST10', type: 'percent', value: 10, eligibility: 'first-order',
    minSpend: 5000, maxDiscount: 15000, eligibleProductIds: null, eligibleBundleIds: null,
    startsAt: '2026-10-01', endsAt: null, active: true, stackable: false,
    summary: '10% off your first eligible order.', terms: 'Minimum spend ₹5,000. Applies to products at their current price. Cannot be combined with the set saving or Curated Room Privilege. Maximum discount ₹15,000. "First order" is judged from orders placed in this browser.' },
  { id: 'curated-room-privilege', title: 'Curated Room Privilege', code: 'ROOM12', type: 'percent', value: 12, eligibility: 'bundles',
    minSpend: 0, maxDiscount: null, eligibleProductIds: null, eligibleBundleIds: BUNDLES.map((b) => b.id),
    startsAt: '2026-10-01', endsAt: null, active: true, stackable: false,
    summary: '12% off eligible curated room sets.', terms: 'Applies when every piece of a curated room set is in your cart. Replaces the standard 5% set saving on those pieces. Cannot be combined with FIRST10.' },
  { id: 'complimentary-delivery', title: 'Complimentary Delivery', code: null, type: 'free-delivery', value: 0, eligibility: 'all',
    minSpend: FREE_DELIVERY_ABOVE, maxDiscount: null, eligibleProductIds: null, eligibleBundleIds: null,
    startsAt: '2026-10-01', endsAt: null, active: true, stackable: true,
    summary: `Complimentary delivery on orders above ${formatINR(FREE_DELIVERY_ABOVE)}.`, terms: 'Applied automatically, based on the order value after discounts.' },
  { id: 'seasonal-edit', title: 'The Art of Living, Considered.', code: null, type: 'showcase', value: 0, eligibility: 'all',
    minSpend: 0, maxDiscount: null, eligibleProductIds: null, eligibleBundleIds: null,
    startsAt: '2026-10-15', endsAt: '2026-12-31', active: true, stackable: true,
    summary: 'The Seasonal Edit — a selection of pieces for slower, more considered living.', terms: 'A curated edit. Prices shown are current prices.' },
  { id: 'selected-pieces', title: 'Selected Pieces', code: null, type: 'sale', value: 20, eligibility: 'selected',
    minSpend: 0, maxDiscount: null, eligibleProductIds: products.filter((p) => p.salePct).map((p) => p.id), eligibleBundleIds: null,
    startsAt: '2026-10-01', endsAt: '2026-12-31', active: true, stackable: true,
    summary: 'Selected pieces with up to 20% off.', terms: 'Price shown on each product is the sale price; the original price is struck through.' },
];

export const promoById = (id) => PROMOTIONS.find((p) => p.id === id);

// Validates a single promotion config entry (used at load and in tests).
export function validatePromotion(p) {
  const errs = [];
  if (!p.id) errs.push('id missing');
  if (!p.title) errs.push('title missing');
  if (!['percent', 'free-delivery', 'sale', 'showcase'].includes(p.type)) errs.push('bad type');
  if (p.type === 'percent' && !(p.value > 0 && p.value <= 100)) errs.push('percent value out of range');
  if (p.minSpend < 0) errs.push('minSpend negative');
  if (p.startsAt && p.endsAt && new Date(p.startsAt) > new Date(p.endsAt)) errs.push('start after end');
  if (typeof p.active !== 'boolean') errs.push('active must be boolean');
  if (typeof p.stackable !== 'boolean') errs.push('stackable must be boolean');
  if (p.eligibleProductIds) p.eligibleProductIds.forEach((i) => { if (!products.some((x) => x.id === i)) errs.push('unknown product ' + i); });
  if (p.eligibleBundleIds) p.eligibleBundleIds.forEach((i) => { if (!getBundle(i)) errs.push('unknown bundle ' + i); });
  return errs;
}
export const configErrors = () => PROMOTIONS.flatMap((p) => validatePromotion(p).map((e) => `${p.id}: ${e}`));

export function promoState(p, now = new Date()) {
  if (!p.active) return 'inactive';
  if (p.startsAt && now < new Date(p.startsAt)) return 'upcoming';
  if (p.endsAt && now > new Date(p.endsAt + 'T23:59:59')) return 'expired';
  return 'live';
}
export const livePromotions = (now = new Date()) => PROMOTIONS.filter((p) => promoState(p, now) === 'live');
export const findCoupon = (code) => PROMOTIONS.find((p) => p.code && code && p.code.toUpperCase() === code.trim().toUpperCase());

// ---------------------------------------------------------------------------
// Pricing engine — the single source of truth for cart, drawer, checkout and orders.
// lines: [{ id, variant, qty }]. Order: line price -> set saving / ROOM12 -> FIRST10 -> delivery.
// ---------------------------------------------------------------------------
export function unitPrice(product, variantName) {
  const v = product.variants.find((x) => x.name === variantName);
  return product.price + (v?.delta || 0);
}
export function unitImage(product, variantName) {
  const v = product.variants.find((x) => x.name === variantName);
  return v?.image || product.image;
}

// Pieces counted once per complete set. A bundle is "complete" when every piece is in the cart at the needed quantity.
function detectBundles(lines) {
  const stock = {};
  lines.forEach((l) => { stock[l.id] = (stock[l.id] || 0) + l.qty; });
  const out = [];
  [...BUNDLES].sort((a, b) => bundlePrice(b) - bundlePrice(a)).forEach((b) => {
    const need = b.items.map(([slug, q]) => [getProduct(slug).id, q]);
    while (need.every(([id, q]) => (stock[id] || 0) >= q)) {
      need.forEach(([id, q]) => { stock[id] -= q; });
      out.push(b);
    }
  });
  return out;
}

export function computeCart(lines, { code = '', ordersCount = 0, now = new Date() } = {}) {
  const priced = lines.map((l) => {
    const p = products.find((x) => x.id === l.id);
    if (!p) return null;
    const unit = unitPrice(p, l.variant);
    const mrpUnit = p.mrp ? p.mrp + (unit - p.price) : null;
    return { ...l, product: p, unit, mrpUnit, total: unit * l.qty, image: unitImage(p, l.variant) };
  }).filter(Boolean);

  const subtotal = priced.reduce((s, l) => s + l.total, 0);
  const saleSavings = priced.reduce((s, l) => s + (l.mrpUnit ? (l.mrpUnit - l.unit) * l.qty : 0), 0);

  // Set saving: pct of the base price of the pieces inside each complete set.
  const sets = detectBundles(priced.map((l) => ({ id: l.id, qty: l.qty })));
  const setBase = sets.reduce((s, b) => s + bundlePrice(b), 0);
  const setSaving = Math.round((setBase * SET_SAVING_PCT) / 100);

  const result = { lines: priced, subtotal, saleSavings, sets, setBase, setSaving, bundleDiscount: setSaving, bundleLabel: `Set saving (${SET_SAVING_PCT}%)`, coupon: null, couponMessage: '', couponDiscount: 0, appliedCode: '' };
  let merchandise = subtotal - setSaving;

  if (code) {
    const promo = findCoupon(code);
    const msg = (m) => { result.couponMessage = m; };
    const state = promo ? promoState(promo, now) : null;
    if (!promo) msg('That code is not valid.');
    else if (state === 'upcoming') msg(`${promo.code} is not active yet.`);
    else if (state !== 'live') msg(`${promo.code} is no longer active.`);
    else if (promo.eligibility === 'first-order' && ordersCount > 0) msg(`${promo.code} is for a first order only.`);
    else if (promo.eligibility === 'bundles') {
      const elig = sets.filter((b) => promo.eligibleBundleIds.includes(b.id));
      if (!elig.length) msg(`${promo.code} needs a complete curated room set in your cart.`);
      else {
        const base = elig.reduce((s, b) => s + bundlePrice(b), 0);
        const disc = Math.round((base * promo.value) / 100);
        const replaced = Math.round((base * SET_SAVING_PCT) / 100);
        const extra = disc - replaced;
        result.bundleDiscount = setSaving + extra;
        result.bundleLabel = `Curated Room Privilege (${promo.value}% on ${elig.length > 1 ? 'room sets' : elig[0].name})`;
        merchandise = subtotal - result.bundleDiscount;
        result.coupon = promo; result.appliedCode = promo.code; result.couponDiscount = 0;
        msg(`${promo.code} applied — ${promo.value}% off your room set${elig.length > 1 ? 's' : ''}.`);
      }
    } else if (promo.eligibility === 'first-order') {
      if (subtotal < promo.minSpend) msg(`${promo.code} needs a minimum spend of ${formatINR(promo.minSpend)}. Add ${formatINR(promo.minSpend - subtotal)} more.`);
      else {
        // Not stackable with the set saving: use whichever gives the customer more.
        let disc = Math.round((subtotal * promo.value) / 100);
        if (promo.maxDiscount) disc = Math.min(disc, promo.maxDiscount);
        if (disc >= setSaving) {
          result.bundleDiscount = 0; result.bundleLabel = '';
          result.coupon = promo; result.appliedCode = promo.code; result.couponDiscount = disc;
          merchandise = subtotal - disc;
          msg(setSaving ? `${promo.code} applied. It replaces the set saving because it saves you more.` : `${promo.code} applied — ${promo.value}% off.`);
        } else msg(`${promo.code} is not applied: the set saving already gives you more, and they cannot be combined.`);
      }
    }
  }

  const freePromo = promoById('complimentary-delivery');
  const freeLive = promoState(freePromo, now) === 'live';
  const delivery = !priced.length ? 0 : freeLive && merchandise >= freePromo.minSpend ? 0 : DELIVERY_FEE;
  result.merchandise = merchandise;
  result.delivery = delivery;
  result.deliveryFree = priced.length > 0 && delivery === 0;
  result.deliveryGap = priced.length && delivery ? freePromo.minSpend - merchandise : 0;
  result.total = merchandise + delivery;
  result.totalSaved = saleSavings + (subtotal - merchandise);
  result.count = priced.reduce((s, l) => s + l.qty, 0);
  return result;
}
