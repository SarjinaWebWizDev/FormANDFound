import { products } from './products';

// "Everything this room needs", grouped by purpose. First matching group wins; anything left over lands in "More for this room".
const G = (id, title, note, test) => ({ id, title, note, test });
const has = (re) => (p) => re.test(`${p.name} ${p.category}`);
const cat = (c) => (p) => p.category === c;

const GROUPS = {
  living: [
    G('sofas', 'Sofas & lounge seating', 'The anchor of the room.', has(/sofa|chaise|armchair|lounge chair|accent chair|reading chair|pod chair|petal|chair|stool|bench|ottoman|pouf/i)),
    G('tables', 'Coffee & side tables', 'Within reach of every seat.', (p) => p.category === 'Furniture' && /coffee table|side table|nesting|\btable\b/i.test(p.name)),
    G('storage', 'Storage, shelving & display', 'Somewhere for books, glass and keepsakes.', has(/shelf|shelving|bookshelf|cabinet|sideboard|console|bar cart|trolley/i)),
    G('lighting', 'Lighting', 'Layers of warm light.', cat('Lighting')),
    G('mirrors', 'Mirrors', 'Light and depth for the walls.', has(/mirror/i)),
    G('soft', 'Rugs & soft furnishings', 'Texture underfoot and on the sofa.', has(/rug|cushion|throw/i)),
    G('decor', 'Vases, trays & decor', 'The finishing touches.', cat('Everyday Objects')),
    G('plants', 'Planters', 'A little green.', cat('Planters')),
  ],
  bedroom: [
    G('beds', 'Beds & wardrobes', 'The essentials for sleep and storage.', has(/\bbed\b|wardrobe/i)),
    G('dressers', 'Dressers & chests', 'Drawers for everyday clothes.', has(/dresser|chest/i)),
    G('bedside', 'Bedside, dressing & vanity', 'Where you put things down.', (p) => p.category === 'Furniture' && /bedside|side table|dressing|vanity|desk|table/i.test(p.name)),
    G('seating', 'Chairs, ottomans & stools', 'A place to sit and dress.', has(/chair|chaise|stool|ottoman|pouf/i)),
    G('lighting', 'Bedside & ambient lighting', 'Soft light for winding down.', cat('Lighting')),
    G('mirrors', 'Mirrors', 'Full-length and wall mirrors.', has(/mirror/i)),
    G('soft', 'Rugs, throws & cushions', 'Texture for the quiet room.', has(/rug|cushion|throw/i)),
    G('storage', 'Shelves & storage', 'Display and keep.', has(/shelf|shelving|bookshelf|cabinet/i)),
    G('decor', 'Trays, vases & planters', 'Small details.', (p) => p.category === 'Everyday Objects' || p.category === 'Planters'),
  ],
  dining: [
    G('tables', 'Dining tables & sets', 'Where everyone gathers.', (p) => p.category === 'Furniture' && /dining set|dining table|pedestal table|\btable\b/i.test(p.name)),
    G('chairs', 'Dining chairs & benches', 'Comfortable for a long meal.', has(/chair|bench|stool/i)),
    G('storage', 'Sideboards & display cabinets', 'Storage for glass, crockery and linen.', has(/sideboard|cabinet|crockery|shelf/i)),
    G('bar', 'Bar carts & trolleys', 'Serve drinks at the table.', has(/bar cart|trolley/i)),
    G('lighting', 'Pendants & lighting', 'Light that sets the mood over the table.', cat('Lighting')),
    G('table-linen', 'Tableware & table linen', 'Set the table.', has(/tableware|stoneware|bowl|placemat|runner|salt|pitcher|serving/i)),
    G('decor', 'Vases & centrepieces', 'For the middle of the table.', cat('Everyday Objects')),
    G('plants', 'Planters', 'A little green.', cat('Planters')),
  ],
  office: [
    G('desks', 'Desks & chairs', 'Where the work happens.', (p) => p.category === 'Furniture' && /desk|chair/i.test(p.name)),
    G('storage', 'Shelving & storage', 'Keep it tidy.', has(/shelf|shelving|bookshelf|cabinet/i)),
    G('rugs', 'Rugs & soft furnishings', 'Warm underfoot.', has(/rug|cushion|throw/i)),
    G('desk-acc', 'Desk accessories', 'Small things that keep it organised.', cat('Office Accessories')),
    G('lighting', 'Task & ambient lighting', 'Light to focus by.', cat('Lighting')),
    G('plants', 'Planters', 'A little green.', cat('Planters')),
    G('decor', 'Desk decor & clocks', 'Finishing touches for the desk.', cat('Everyday Objects')),
  ],
};

export function roomGuide(roomId) {
  // Newest pieces first, so fresh arrivals lead every section.
  const list = products.filter((p) => p.rooms.includes(roomId)).sort((a, b) => b.order - a.order);
  const used = new Set();
  const out = (GROUPS[roomId] || []).map((g) => {
    const items = list.filter((p) => !used.has(p.id) && g.test(p) && (g.id === 'lighting' || p.category !== 'Lighting'));
    items.forEach((p) => used.add(p.id));
    return { ...g, items };
  }).filter((g) => g.items.length);
  const rest = list.filter((p) => !used.has(p.id));
  if (rest.length) out.push({ id: 'more', title: 'More for this room', note: '', items: rest });
  return { total: list.length, groups: out };
}
