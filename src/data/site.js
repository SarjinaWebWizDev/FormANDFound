import { img } from './products';

export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Furniture', to: '/shop?category=Furniture' },
  { label: 'Lighting', to: '/shop?category=Lighting' },
  { label: 'Office Accessories', to: '/shop?category=Office%20Accessories' },
  { label: 'Planters', to: '/shop?category=Planters' },
  { label: 'Everyday Objects', to: '/shop?category=Everyday%20Objects' },
  { label: 'Collections', to: '/collections' },
  { label: 'Design Your Space', to: '/design-your-space' },
];

export const ROOMS = [
  { id: 'living', name: 'Living Room', image: img('room-living-room'), blurb: 'Sofas, tables, lamps and rugs for the room you gather in.', slots: ['Furniture', 'Lighting', 'Everyday Objects', 'Planters'], budget: 250000 },
  { id: 'bedroom', name: 'Bedroom', image: img('room-bedroom'), blurb: 'Quiet textures, soft light and a place to put things down.', slots: ['Furniture', 'Lighting', 'Everyday Objects'], budget: 120000 },
  { id: 'dining', name: 'Dining Room', image: img('room-dining-room'), blurb: 'A table worth lingering at, with light and tableware to match.', slots: ['Furniture', 'Lighting', 'Everyday Objects'], budget: 180000 },
  { id: 'office', name: 'Home Office', image: img('room-home-office'), blurb: 'A desk, a good chair and small things that keep it tidy.', slots: ['Furniture', 'Office Accessories', 'Lighting', 'Planters'], budget: 150000 },
];

export const STYLES = [
  { id: 'modern-minimal', name: 'Modern Minimal', image: img('lifestyle-sunlit-living'), blurb: 'Clean lines, restrained colour, nothing extra.' },
  { id: 'scandinavian', name: 'Scandinavian', image: img('lifestyle-oak-dining'), blurb: 'Light woods, linen and everyday warmth.' },
  { id: 'organic-modern', name: 'Organic Modern', image: img('lifestyle-sculpted-lounge'), blurb: 'Soft curves, natural textures, sculptural forms.' },
  { id: 'mid-century', name: 'Mid-Century', image: img('lifestyle-burgundy-salon'), blurb: 'Walnut, brass and confident colour.' },
  { id: 'japandi', name: 'Japandi', image: img('lifestyle-wide-living'), blurb: 'Calm, low and made from natural materials.' },
];

export const PALETTES = [
  { id: 'ivory-walnut', name: 'Ivory & Walnut', image: img('palette-walnut-cream'), swatches: ['#F8F6F1', '#E9E1D5', '#624634'] },
  { id: 'sage-oak', name: 'Sage & Oak', image: img('palette-sage-green'), swatches: ['#A1AA91', '#C8A97E', '#F8F6F1'] },
  { id: 'charcoal-white', name: 'Charcoal & White', image: img('palette-black-white'), swatches: ['#30251F', '#8A8580', '#FFFFFF'] },
  { id: 'sand-travertine', name: 'Sand & Travertine', image: img('palette-warm-beige'), swatches: ['#E9E1D5', '#D8CBB4', '#B49A70'] },
  { id: 'cherry-bold', name: 'Cherry Bold', image: img('lifestyle-cherry-edit-room'), swatches: ['#B3121C', '#4A0F14', '#F8F6F1'] },
];

export const STORY_IMAGES = {
  workshop: img('journal-workshop'),
  tablet: img('journal-designer-tablet'),
  detail: img('editorial-red-tray-detail'),
};
export const ORDER_IMAGES = { delivery: img('furniture-order-delivery'), packaging: img('furniture-order-packaging') };
export const CATEGORY_IMAGES = {
  Furniture: img('category-furniture'), Lighting: img('category-designer-lighting'),
  'Office Accessories': img('category-office-accessories'), Planters: img('category-planters'),
  'Everyday Objects': img('category-everyday-objects'),
};
export const BANNERS = {
  work: img('banner-work-with-intention'), slow: img('banner-the-art-of-slow-living'), considered: img('banner-a-more-considered-home'),
};
export const SAVED_DESIGNS_IMAGE = img('saved-room-designs');
export const PLANNER_IMAGES = { budget: img('design-space-budget-planner'), plan: img('design-space-final-plan'), moodboard: img('lifestyle-design-moodboard') };
export const SHOP_THE_ROOM = {
  image: img('lifestyle-colour-moodboard'),
  pins: [
    { slug: 'cherry-dome-lamp', x: 27, y: 14 }, { slug: 'cream-ripple-vase', x: 50, y: 27 },
    { slug: 'olive-wave-mirror', x: 82, y: 22 }, { slug: 'royal-blue-lounge-chair', x: 33, y: 58 },
    { slug: 'cherry-lacquer-side-table', x: 80, y: 55 }, { slug: 'abstract-tufted-rug', x: 50, y: 85 },
  ],
};
