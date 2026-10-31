// Product catalogue. `price` is the selling price in INR (sale already applied); `mrp` is set only
// when a piece is part of the "selected pieces" offer. Variants may change price (delta) and image.
export const img = (f) => `/images/${f}.jpg`;

const FIN = {
  wood: [['Natural Oak', '#C8A97E', 0], ['Walnut', '#624634', 6], ['Espresso Stain', '#30251F', 6]],
  fabric: [['Ivory Bouclé', '#EDE6D8', 0], ['Sage', '#A1AA91', 4], ['Cocoa', '#7A5A44', 4]],
  stone: [['Travertine', '#D8CBB4', 0], ['Warm Grey', '#A9A196', 5]],
  lacquer: [['Cherry', '#B3121C', 0], ['Oxblood', '#4A0F14', 3], ['Ivory Gloss', '#F2EDE2', 0]],
  metal: [['Brushed Brass', '#B49A70', 0], ['Matte Black', '#2A2623', 0], ['Chrome', '#C9CDD0', 5]],
  ceramic: [['Ivory', '#EEE7DA', 0], ['Sage', '#A1AA91', 0], ['Charcoal', '#3A3430', 0]],
  linen: [['Natural', '#E2D8C6', 0], ['Taupe', '#A89B88', 0], ['Sage', '#A1AA91', 0]],
};
const mk = (kind, price) => (FIN[kind] || []).map(([name, color, pct]) => ({ name, color, delta: Math.round((price * pct) / 100 / 100) * 100 }));

const CARE = {
  wood: 'Wipe with a soft, dry cloth. Avoid standing water and direct heat. Refresh with a wood wax once a year.',
  fabric: 'Vacuum gently with a soft brush. Blot spills straight away; do not rub. Professional cleaning for deep marks.',
  stone: 'Natural stone varies piece to piece. Wipe with a damp cloth and dry; avoid acidic cleaners.',
  metal: 'Dust with a dry microfibre cloth. Avoid abrasive cleaners that can mark the finish.',
  lacquer: 'Clean with a damp soft cloth. Avoid solvents; use coasters under hot items.',
  ceramic: 'Hand wash or wipe with a damp cloth. Glazes can show small variations — this is part of the material.',
  glass: 'Clean with a soft cloth and glass cleaner. Handle with care.',
  textile: 'Follow the care label. Spot clean or dry clean; air out regularly.',
  light: 'Switch off and let cool before cleaning. Dust with a dry cloth; never immerse.',
  plant: 'Use a liner or drainage tray inside. Wipe the surface with a damp cloth.',
};

// [slug, name, price, category, image, kind, material, dimensions, rooms, styles, tones, description, extras]
const rows = [
  // ---------------- Furniture ----------------
  ['boucle-cloud-sofa', 'Boucle Cloud Sofa', 112000, 'Furniture', 'product-boucle-sofa-seat', 'fabric', 'Bouclé upholstery, kiln-dried hardwood frame', '230 W × 98 D × 76 H cm', ['living'], ['organic-modern', 'modern-minimal', 'scandinavian'], ['ivory-walnut', 'sand-travertine'], 'A deep, rounded sofa upholstered in soft bouclé. Low arms and a generous seat make it a natural centrepiece.', { bestseller: true }],
  ['serpentine-bookshelf', 'Serpentine Bookshelf', 78000, 'Furniture', 'product-serpentine-bookshelf', 'wood', 'Bent oak veneer, solid oak edging', '90 W × 32 D × 190 H cm', ['living', 'office'], ['organic-modern', 'mid-century'], ['ivory-walnut', 'sage-oak'], 'A shelf that winds like a ribbon, turning books and objects into a display. Designed to be seen from every angle.', { isNew: true }],
  ['lily-pad-side-tables', 'Lily Pad Side Tables (Pair)', 34000, 'Furniture', 'product-lily-pad-side-tables', 'metal', 'Cast brass base, hammered top', 'Tall Ø 38 × 62 H cm; short Ø 44 × 48 H cm', ['living', 'bedroom'], ['mid-century', 'organic-modern'], ['ivory-walnut'], 'Two tables with petal-textured tops on sculpted pedestals. Use together or apart beside a sofa or bed.', {}],
  ['chrome-ripple-bench', 'Chrome Ripple Bench', 96000, 'Furniture', 'product-chrome-ripple-bench', 'metal', 'Polished stainless steel', '180 W × 55 D × 45 H cm', ['living', 'dining'], ['modern-minimal'], ['charcoal-white'], 'A bench that looks like liquid metal caught mid-fold. A statement piece for an entrance or dining space.', { madeToOrder: true }],
  ['cherry-pod-chair', 'Cherry Pod Chair', 42000, 'Furniture', 'product-cherry-pod-chair', 'lacquer', 'Gloss-finished moulded shell, chrome base', '78 W × 74 D × 80 H cm', ['living', 'bedroom'], ['mid-century', 'modern-minimal'], ['cherry-bold'], 'A glossy, egg-shaped chair with a deep seat. The cherry finish is a single, confident note in a neutral room.', { bestseller: true }],
  ['liquid-chrome-table', 'Liquid Chrome Table', 124000, 'Furniture', 'product-liquid-chrome-table', 'metal', 'Mirror-polished steel', '160 W × 90 D × 74 H cm', ['dining', 'living'], ['modern-minimal'], ['charcoal-white'], 'A table whose legs melt into the top. Reflects the room around it.', { madeToOrder: true, sale: 10 }],
  ['hexagon-steel-shelving', 'Hexagon Steel Shelving', 56000, 'Furniture', 'product-hexagon-steel-shelving', 'metal', 'Powder-coated steel', '180 W × 36 D × 160 H cm', ['office', 'living'], ['modern-minimal'], ['charcoal-white'], 'A grid of hexagons that works as storage and as a room divider.', {}],
  ['travertine-cherry-table', 'Travertine & Cherry Side Table', 38000, 'Furniture', 'product-travertine-cherry-table', 'stone', 'Travertine base, lacquered top', '55 W × 45 D × 42 H cm', ['living', 'bedroom'], ['organic-modern', 'mid-century'], ['sand-travertine', 'cherry-bold'], 'A lacquered top resting on blocks of travertine. Warm stone, sharp colour.', { isNew: true }],
  ['sculpted-oak-shelf', 'Sculpted Oak Shelf', 64000, 'Furniture', 'product-sculpted-oak-shelf', 'wood', 'Bent oak veneer', '140 W × 30 D × 120 H cm', ['living', 'dining'], ['organic-modern', 'japandi'], ['sage-oak', 'ivory-walnut'], 'Pockets, curves and open shelves that hold ceramics, plants and books.', {}],
  ['fringe-chaise', 'Oxblood Fringe Chaise', 88000, 'Furniture', 'product-fringe-chaise', 'fabric', 'Textile fringe over foam, hardwood frame', '165 W × 70 D × 75 H cm', ['living', 'bedroom'], ['mid-century', 'organic-modern'], ['cherry-bold'], 'A sinuous chaise covered in deep-red fringe. Texture first, comfort a close second.', { madeToOrder: true }],
  ['cherry-lacquer-side-table', 'Cherry Lacquer Side Table', 18500, 'Furniture', 'product-cherry-stack-side-table', 'lacquer', 'Lacquered MDF', 'Ø 42 × 52 H cm', ['living', 'bedroom'], ['mid-century', 'modern-minimal'], ['cherry-bold'], 'A small table in high-gloss lacquer, in two forms: stacked discs or three stacked beads.', {
    variants: [
      { name: 'Stacked form', color: '#B3121C', delta: 0, image: img('product-cherry-stack-side-table') },
      { name: 'Bead form', color: '#8E0F17', delta: 2500, image: img('product-cherry-bead-side-table') },
    ],
  }],
  ['petal-back-chair', 'Petal-Back Chair', 46000, 'Furniture', 'product-petal-back-chair', 'wood', 'Walnut-stained ash, upholstered seat', '70 W × 68 D × 92 H cm', ['dining', 'living', 'bedroom'], ['organic-modern', 'scandinavian'], ['ivory-walnut'], 'A fan-shaped back that curves into a sculpted wooden base. Equally good as a dining or occasional chair.', { bestseller: true }],
  ['raw-stone-coffee-table', 'Raw Stone Coffee Table', 92000, 'Furniture', 'product-raw-stone-coffee-table', 'stone', 'Natural limestone slab', '120 W × 70 D × 32 H cm', ['living'], ['japandi', 'organic-modern'], ['sand-travertine'], 'A rough-hewn stone surface that sits low and heavy. Every slab is unique.', { madeToOrder: true }],
  ['cherry-stacked-desk', 'Cherry Stacked Desk', 68000, 'Furniture', 'product-cherry-stacked-desk', 'lacquer', 'Lacquered hardwood', '140 W × 60 D × 75 H cm', ['office'], ['mid-century', 'modern-minimal'], ['cherry-bold'], 'A desk with rolled, softly stacked sides and a glossy top. Storage hides in the curves.', { isNew: true }],
  ['amber-glass-table', 'Amber Glass Table', 29500, 'Furniture', 'product-amber-glass-table', 'glass', 'Tinted acrylic', 'Ø 50 × 55 H cm', ['living', 'bedroom'], ['mid-century', 'modern-minimal'], ['cherry-bold'], 'A translucent, draped-glass look in warm amber. Catches low light in the evening.', { sale: 12 }],
  ['walnut-mirror-console', 'Walnut Mirror & Console', 52000, 'Furniture', 'product-walnut-mirror-console', 'wood', 'Solid walnut frame, mirror glass, steel legs', 'Console 120 W × 30 D × 80 H cm; mirror 70 × 110 cm', ['living'], ['scandinavian', 'mid-century'], ['ivory-walnut'], 'A slim console with a rounded walnut mirror above. A calm entrance in two pieces.', {}],
  ['tree-bracket-desk', 'Tree Bracket Desk', 84000, 'Furniture', 'product-tree-bracket-desk', 'wood', 'Solid walnut, drawer unit', '170 W × 60 D × 76 H cm', ['office'], ['organic-modern', 'mid-century'], ['ivory-walnut'], 'A desk that flows into shelves like branches of a tree. Hand-finished walnut.', { madeToOrder: true }],
  ['spiral-pedestal-table', 'Spiral Pedestal Table', 72000, 'Furniture', 'product-spiral-pedestal-table', 'wood', 'Solid walnut, turned base', 'Ø 120 × 75 H cm', ['dining', 'living'], ['organic-modern', 'mid-century'], ['ivory-walnut'], 'A dining table on a twisting pedestal, so there are no legs to dodge. Seats four to six.', { bestseller: true }],
  ['walnut-shell-chaise', 'Walnut Shell Chaise', 138000, 'Furniture', 'product-walnut-shell-chaise', 'wood', 'Solid walnut shell, bouclé cushions', '150 W × 80 D × 70 H cm', ['living', 'bedroom'], ['organic-modern', 'mid-century'], ['ivory-walnut'], 'A boat-shaped chaise carved from walnut with a cushioned interior.', { madeToOrder: true }],
  ['cloud-boucle-stool', 'Cloud Bouclé Stool', 21500, 'Furniture', 'product-cloud-boucle-stool', 'fabric', 'Bouclé over foam', '60 W × 55 D × 42 H cm', ['living', 'bedroom'], ['organic-modern', 'modern-minimal'], ['ivory-walnut'], 'A four-lobed stool that works as a seat, an ottoman or a soft side table.', { sale: 15 }],
  ['oxblood-stool', 'Oxblood Curve Stool', 14500, 'Furniture', 'product-oxblood-stool', 'fabric', 'Moulded foam, velvet cover', '45 W × 40 D × 38 H cm', ['living', 'bedroom'], ['mid-century', 'organic-modern'], ['cherry-bold'], 'A single curl of a stool in deep burgundy. Small footprint, strong shape.', {}],
  ['hammered-gold-side-table', 'Hammered Gold Side Table', 26000, 'Furniture', 'product-hammered-gold-side-table', 'metal', 'Hammered brass-finish metal', 'Ø 40 × 55 H cm', ['living', 'bedroom'], ['mid-century'], ['ivory-walnut'], 'A tray top on a bell-shaped base with a hand-hammered finish.', {}],
  ['royal-blue-lounge-chair', 'Royal Blue Lounge Chair', 54000, 'Furniture', 'product-royal-blue-lounge-chair', 'fabric', 'Velvet upholstery, hardwood frame', '85 W × 78 D × 70 H cm', ['living'], ['mid-century', 'modern-minimal'], ['cherry-bold'], 'A chunky arched chair in deep blue velvet. Pair with a warm rug and red accents.', { isNew: true }],
  ['linen-accent-chair', 'Linen Accent Chair', 36000, 'Furniture', 'product-linen-accent-chair', 'fabric', 'Linen blend, oak legs', '72 W × 74 D × 80 H cm', ['living', 'bedroom'], ['scandinavian', 'japandi'], ['ivory-walnut', 'sand-travertine'], 'A relaxed linen chair on slim oak legs. Easy to place anywhere.', {}],
  ['walnut-dining-chair', 'Walnut Dining Chair', 18500, 'Furniture', 'product-walnut-dining-chair', 'wood', 'Solid walnut, leather-look seat', '48 W × 52 D × 80 H cm', ['dining'], ['scandinavian', 'mid-century'], ['ivory-walnut'], 'A slim, curved-back dining chair in solid walnut. Sold singly.', { sale: 10 }],
  ['minimal-oak-desk', 'Minimal Oak Desk', 48000, 'Furniture', 'product-minimal-oak-desk', 'wood', 'Solid oak, steel frame', '140 W × 65 D × 75 H cm', ['office', 'bedroom'], ['scandinavian', 'modern-minimal', 'japandi'], ['ivory-walnut', 'sage-oak'], 'A clean-lined oak desk with a slim drawer. Built for a laptop, a lamp and a notebook.', { bestseller: true }],
  ['walnut-coffee-table', 'Walnut Coffee Table', 42000, 'Furniture', 'product-walnut-coffee-table', 'wood', 'Solid walnut', '110 W × 60 D × 38 H cm', ['living'], ['mid-century', 'scandinavian'], ['ivory-walnut'], 'A low, softly rounded table in solid walnut.', {}],
  ['sculptural-lounge-chair', 'Sculptural Lounge Chair', 58000, 'Furniture', 'product-sculptural-lounge-chair', 'wood', 'Bent ash, upholstered seat', '78 W × 80 D × 76 H cm', ['living'], ['organic-modern', 'japandi'], ['ivory-walnut'], 'A lounge chair with a carved, sweeping frame and a soft seat.', { sale: 8 }],
  ['sculptural-bookshelf', 'Sculptural Bookshelf', 46000, 'Furniture', 'product-sculptural-bookshelf', 'wood', 'Oak veneer', '80 W × 30 D × 180 H cm', ['living', 'office'], ['organic-modern'], ['ivory-walnut'], 'Staggered shelves in oak veneer. Leave some gaps for objects.', {}],
  ['sculptural-modular-shelf', 'Sculptural Modular Shelf', 62000, 'Furniture', 'product-sculptural-modular-shelf', 'wood', 'Oak veneer, lacquered panels', '120 W × 34 D × 150 H cm', ['living', 'office'], ['modern-minimal', 'organic-modern'], ['ivory-walnut', 'sage-oak'], 'Modular boxes that you can rearrange as your collection changes.', {}],
  ['travertine-side-table', 'Travertine Side Table', 22000, 'Furniture', 'product-travertine-side-table', 'stone', 'Natural travertine', 'Ø 45 × 45 H cm', ['living', 'bedroom'], ['japandi', 'organic-modern'], ['sand-travertine'], 'A solid travertine drum with natural veining.', {}],
  ['oak-side-table', 'Oak Side Table', 16500, 'Furniture', 'product-oak-side-table-main', 'wood', 'Solid oak', '45 W × 38 D × 46 H cm', ['living', 'bedroom'], ['scandinavian', 'japandi'], ['sage-oak', 'ivory-walnut'], 'A curved, stool-height table with an organic outline.', {}],
  ['cherry-dining-table', 'Cherry Lacquer Dining Table', 98000, 'Furniture', 'product-cherry-dining-table', 'lacquer', 'Lacquered hardwood', '240 W × 100 D × 75 H cm', ['dining'], ['mid-century', 'modern-minimal'], ['cherry-bold'], 'A long table with a deep-red gloss top. Seats eight.', { madeToOrder: true }],
  ['sage-chesterfield-sofa', 'Sage Chesterfield Sofa', 135000, 'Furniture', 'lifestyle-sage-chesterfield', 'fabric', 'Button-tufted leather-look upholstery, walnut base', '215 W × 92 D × 78 H cm', ['living'], ['mid-century'], ['sage-oak'], 'A button-tufted sofa in pale sage with a walnut base. A classic, softened.', { madeToOrder: true }],
  ['tan-executive-chair', 'Tan Executive Chair', 64000, 'Furniture', 'product-tan-executive-chair', 'fabric', 'Leather-look upholstery, aluminium base', '68 W × 70 D × 118 H cm', ['office'], ['modern-minimal', 'mid-century'], ['ivory-walnut'], 'A high-back office chair with a quilted shell. Adjustable height and tilt.', {}],

  // ---------------- Lighting ----------------
  ['arc-floor-lamp', 'Arc Floor Lamp', 24000, 'Lighting', 'product-arc-floor-lamp', 'metal', 'Powder-coated steel, marble base', '60 W × 190 H cm', ['living', 'bedroom'], ['modern-minimal', 'mid-century'], ['charcoal-white'], 'A tall arc that leans over a sofa or chair. Weighted base, warm light.', { sale: 12 }],
  ['brass-wall-sconce', 'Brass Wall Sconce', 9800, 'Lighting', 'product-brass-wall-sconce', 'metal', 'Brushed brass', '18 W × 12 D × 26 H cm', ['bedroom', 'living'], ['mid-century', 'organic-modern'], ['ivory-walnut'], 'A simple wall light that gives a soft wash over the wall.', {}],
  ['bronze-pendant-light', 'Bronze Pendant Light', 18500, 'Lighting', 'product-bronze-pendant-light', 'metal', 'Bronze-finish metal, opal glass', 'Ø 45 × 35 H cm', ['dining', 'living'], ['scandinavian', 'mid-century'], ['ivory-walnut'], 'A pendant with a warm bronze finish. Hang low over a dining table.', {}],
  ['ceramic-table-lamp', 'Ceramic Table Lamp', 8900, 'Lighting', 'product-ceramic-table-lamp', 'ceramic', 'Glazed ceramic, linen shade', 'Ø 35 × 52 H cm', ['bedroom', 'living'], ['scandinavian', 'japandi'], ['ivory-walnut', 'sand-travertine'], 'A glazed ceramic base with a pleated linen shade.', {}],
  ['sculptural-table-lamp', 'Sculptural Table Lamp', 11500, 'Lighting', 'product-sculptural-table-lamp-main', 'ceramic', 'Moulded resin, fabric shade', 'Ø 30 × 48 H cm', ['living', 'bedroom'], ['organic-modern', 'japandi'], ['ivory-walnut'], 'A lamp with a carved, flowing base and a pleated shade.', {}],
  ['stone-table-lamp', 'Textured Stone Table Lamp', 12800, 'Lighting', 'product-stone-table-lamp', 'ceramic', 'Textured stoneware, linen shade', 'Ø 40 × 55 H cm', ['bedroom', 'living'], ['japandi', 'organic-modern'], ['sand-travertine'], 'A rough-glazed stoneware base under a cone shade.', { isNew: true }],
  ['backlit-organic-mirror', 'Backlit Organic Mirror', 19500, 'Lighting', 'product-backlit-organic-mirror', 'light', 'Mirror glass, LED backlight', '70 W × 90 H cm', ['bedroom', 'office', 'living'], ['organic-modern', 'modern-minimal'], ['sand-travertine'], 'A pebble-shaped mirror with a soft halo of light behind it.', { bestseller: true }],
  ['sitting-globe-lamp', 'Sitting Globe Lamp', 7800, 'Lighting', 'product-sitting-globe-lamp', 'light', 'Resin, opal glass globe', '25 W × 20 D × 32 H cm', ['office', 'bedroom'], ['modern-minimal', 'organic-modern'], ['ivory-walnut'], 'A little figure holds a glowing globe. A playful desk or bedside lamp.', {}],
  ['lantern-table-lamps', 'Lantern Table Lamps (Pair)', 15500, 'Lighting', 'product-lantern-table-lamps', 'metal', 'Brass frame, frosted glass', '14 × 14 × 38 H cm each', ['office', 'living'], ['modern-minimal', 'mid-century'], ['charcoal-white'], 'Two lantern-style lamps that give an even, glowing light.', {}],
  ['cherry-dome-lamp', 'Cherry Dome Lamp', 9200, 'Lighting', 'product-cherry-dome-lamp', 'lacquer', 'Gloss-lacquered metal', 'Ø 32 × 44 H cm', ['living', 'office', 'bedroom'], ['mid-century', 'modern-minimal'], ['cherry-bold'], 'A dome-shaped lamp with a glossy cherry finish.', { isNew: true }],
  ['sage-cloud-chandelier', 'Sage Cloud Chandelier', 148000, 'Lighting', 'product-sage-cloud-chandelier', 'light', 'Fibre-fill cloud, brass strands', 'Ø 90 × 110 H cm', ['dining', 'living'], ['organic-modern'], ['sage-oak'], 'A cloud-like canopy in deep green with fine brass drops. Made to order for high ceilings.', { madeToOrder: true }],

  // ---------------- Office Accessories ----------------
  ['desk-organiser', 'Desk Organiser', 4800, 'Office Accessories', 'product-walnut-desk-organiser-main', 'wood', 'Walnut veneer / powder-coated steel', '22 W × 14 D × 14 H cm', ['office'], ['scandinavian', 'modern-minimal'], ['ivory-walnut', 'charcoal-white'], 'Pen cups, a note-pad slot and a clip tray in one tidy base.', {
    variants: [
      { name: 'Walnut', color: '#624634', delta: 0, image: img('product-walnut-desk-organiser-main') },
      { name: 'Black & brass', color: '#2A2623', delta: 800, image: img('product-black-desk-organiser') },
    ],
  }],
  ['infinity-pen-holder', 'Infinity Pen Holder', 2400, 'Office Accessories', 'product-infinity-pen-holder', 'wood', 'Matte-black resin', '16 W × 8 D × 12 H cm', ['office'], ['modern-minimal'], ['charcoal-white'], 'A figure-of-eight pen holder that stands on its own.', {}],
  ['bookends', 'Arched Bookends (Pair)', 3600, 'Office Accessories', 'product-walnut-bookends', 'wood', 'Walnut / natural stone', '12 W × 14 D × 18 H cm', ['office', 'living'], ['scandinavian', 'organic-modern'], ['ivory-walnut'], 'A weighty pair of bookends in two finishes.', {
    variants: [
      { name: 'Walnut', color: '#624634', delta: 0, image: img('product-walnut-bookends') },
      { name: 'Stone', color: '#CFC5B3', delta: 300, image: img('product-organic-stone-bookends') },
    ],
  }],
  ['catchall-tray', 'Catchall Tray', 2900, 'Office Accessories', 'product-walnut-catchall-tray', 'wood', 'Walnut / travertine / ivory resin', '22 W × 15 D × 3 H cm', ['office', 'bedroom', 'living'], ['scandinavian', 'japandi'], ['ivory-walnut', 'sand-travertine'], 'A small tray for keys, rings and desk things, in three materials.', {
    variants: [
      { name: 'Walnut', color: '#624634', delta: 0, image: img('product-walnut-catchall-tray') },
      { name: 'Travertine', color: '#D8CBB4', delta: 900, image: img('product-travertine-catchall-tray-main') },
      { name: 'Ivory', color: '#EEE7DA', delta: 300, image: img('product-ivory-decorative-tray-main') },
    ],
  }],

  // ---------------- Planters ----------------
  ['olive-tree-planter', 'Olive Tree Planter', 7500, 'Planters', 'product-olive-tree-planter', 'plant', 'Glazed terracotta', 'Ø 38 × 40 H cm', ['living', 'office', 'dining'], ['scandinavian', 'organic-modern'], ['sage-oak'], 'A deep planter with an earthy glaze, sized for a small tree.', {}],
  ['sage-ceramic-planter', 'Sage Ceramic Planter', 4200, 'Planters', 'product-sage-ceramic-planter-main', 'plant', 'Glazed ceramic', 'Ø 24 × 26 H cm', ['living', 'office', 'bedroom'], ['japandi', 'scandinavian'], ['sage-oak'], 'A soft-green glazed planter with drainage tray.', {}],
  ['white-wave-planter', 'White Wave Planter', 16500, 'Planters', 'product-wave-planter', 'plant', 'Glossy fibreglass', '150 W × 40 D × 45 H cm', ['living', 'dining'], ['organic-modern', 'modern-minimal'], ['ivory-walnut'], 'A long, rippled planter for lilies, grasses or low shrubs.', { isNew: true }],

  // ---------------- Everyday Objects ----------------
  ['smoked-glass-vase', 'Smoked Glass Vase', 4400, 'Everyday Objects', 'product-smoked-glass-vase', 'glass', 'Smoked glass', 'Ø 16 × 28 H cm', ['living', 'dining'], ['modern-minimal'], ['charcoal-white'], 'A tinted glass vase with a heavy base.', { sale: 10 }],
  ['sculptural-ceramic-vases', 'Sculptural Ceramic Vases', 6200, 'Everyday Objects', 'product-sculptural-ceramic-vases', 'ceramic', 'Matte ceramic', 'Set of 3, 14–30 H cm', ['living', 'dining'], ['organic-modern', 'japandi'], ['sand-travertine', 'ivory-walnut'], 'Three organic vases that look good in a group or alone.', {}],
  ['cream-pitcher', 'Cream Pitcher', 2600, 'Everyday Objects', 'product-cream-pitcher', 'ceramic', 'Glazed stoneware', '12 W × 10 D × 16 H cm', ['dining', 'living'], ['japandi', 'scandinavian'], ['sand-travertine'], 'A hand-shaped pitcher with a long looping handle.', { sale: 20 }],
  ['cream-stone-bowl', 'Cream Stone Bowl', 3400, 'Everyday Objects', 'product-cream-stone-bowl', 'ceramic', 'Stone composite', '28 W × 22 D × 8 H cm', ['living', 'dining'], ['japandi', 'modern-minimal'], ['sand-travertine'], 'A shallow, pebble-shaped bowl for fruit or keys.', {}],
  ['red-ribbon-vases', 'Red Ribbon Vases', 5800, 'Everyday Objects', 'product-red-ribbon-vases', 'ceramic', 'Glazed ceramic', 'Set of 2, 20 and 28 H cm', ['living', 'dining'], ['mid-century', 'modern-minimal'], ['cherry-bold'], 'Two vases, one wrapped in a red ribbon, one plain ivory.', {}],
  ['ribbed-stoneware-set', 'Ribbed Stoneware Set', 5200, 'Everyday Objects', 'product-ribbed-stoneware-set', 'ceramic', 'Stoneware', 'Pitcher + 2 cups', ['dining'], ['japandi', 'scandinavian'], ['sand-travertine'], 'A pitcher and two cups with a fine ribbed texture.', { sale: 15 }],
  ['stoneware-tableware-set', 'Stoneware Tableware Set', 7400, 'Everyday Objects', 'product-stoneware-tableware-set', 'ceramic', 'Stoneware', 'Set of 12 pieces', ['dining'], ['scandinavian', 'japandi'], ['sand-travertine', 'ivory-walnut'], 'Plates and bowls for four, in a soft reactive glaze.', {}],
  ['linen-cushion-pair', 'Linen Cushion Pair', 3600, 'Everyday Objects', 'product-linen-cushion-pair', 'linen', 'Washed linen', '50 × 50 cm, set of 2', ['living', 'bedroom'], ['scandinavian', 'japandi'], ['ivory-walnut', 'sand-travertine'], 'Two washed-linen cushions with a relaxed look.', {
    variants: [
      { name: 'Natural', color: '#E2D8C6', delta: 0, image: img('product-linen-cushion-pair') },
      { name: 'Taupe', color: '#A89B88', delta: 0, image: img('product-taupe-linen-cushions') },
    ],
  }],
  ['linen-throw-cushions', 'Linen Throw & Cushions', 4200, 'Everyday Objects', 'product-linen-throw-cushions', 'linen', 'Linen, cotton', 'Throw 130 × 170; cushions 45 × 45', ['living', 'bedroom'], ['scandinavian', 'organic-modern'], ['ivory-walnut'], 'A throw with two fringed cushions in warm neutrals.', {}],
  ['linen-bed-throw', 'Linen Bed Throw', 5500, 'Everyday Objects', 'product-linen-bed-throw', 'linen', 'Washed linen', '220 × 240 cm', ['bedroom'], ['scandinavian', 'japandi'], ['ivory-walnut', 'sand-travertine'], 'A crinkled linen throw for the foot of the bed.', { sale: 15 }],
  ['oatmeal-wool-rug', 'Oatmeal Wool Rug', 42000, 'Everyday Objects', 'product-oatmeal-wool-rug', 'textile', 'Hand-loomed wool', '200 × 300 cm', ['living', 'bedroom'], ['scandinavian', 'japandi', 'modern-minimal'], ['ivory-walnut', 'sand-travertine'], 'A thick, soft rug in a warm oat tone.', { sale: 20 }],
  ['abstract-tufted-rug', 'Abstract Tufted Rug', 38000, 'Everyday Objects', 'product-abstract-tufted-rug', 'textile', 'Hand-tufted wool', '160 × 230 cm', ['living', 'bedroom'], ['mid-century', 'organic-modern'], ['cherry-bold'], 'A free-form rug in cream, oxblood, mustard and green.', {}],
  ['twisted-floor-vases', 'Twisted Floor Vases (Pair)', 12500, 'Everyday Objects', 'product-twisted-floor-vases', 'ceramic', 'Matte ceramic-effect resin', 'Tall 28 Ø × 90 H; short 24 Ø × 70 H cm', ['living', 'dining'], ['organic-modern', 'japandi'], ['ivory-walnut', 'sand-travertine'], 'Two tall twisting vases that suit pampas grass or branches.', {}],
  ['anthurium-stone-vase', 'Stone Vase with Dried Anthurium', 6900, 'Everyday Objects', 'product-dried-anthurium-stone-vase', 'stone', 'Natural stone vase, dried stems', '18 W × 15 D × 40 H cm', ['living', 'bedroom'], ['japandi', 'organic-modern'], ['sand-travertine', 'cherry-bold'], 'A rock-like stone vase with deep-red dried leaves.', {}],
  ['cream-ripple-vase', 'Cream Ripple Vase', 4800, 'Everyday Objects', 'product-cream-ripple-vase', 'ceramic', 'Ceramic', 'Ø 20 × 28 H cm', ['living', 'dining'], ['organic-modern', 'japandi'], ['sand-travertine'], 'A rippled, wave-shaped vase in cream.', {}],
  ['olive-wave-mirror', 'Olive Wave Mirror', 16500, 'Everyday Objects', 'product-olive-wave-mirror', 'wood', 'Mirror glass, olive-lacquered frame', '55 W × 90 H cm', ['bedroom', 'living'], ['organic-modern', 'mid-century'], ['sage-oak'], 'A wavy, dark-green framed mirror.', {}],
  ['arched-floor-mirror', 'Arched Floor Mirror', 28500, 'Everyday Objects', 'product-arched-floor-mirror', 'metal', 'Mirror glass, brushed brass frame', '80 W × 190 H cm', ['bedroom', 'living'], ['modern-minimal', 'scandinavian'], ['ivory-walnut'], 'A tall arch mirror with a slim brass frame.', {}],
  ['pebble-wall-mirror', 'Pebble Wall Mirror', 12500, 'Everyday Objects', 'product-pebble-wall-mirror', 'metal', 'Mirror glass, brass trim', '50 W × 70 H cm', ['bedroom', 'living'], ['japandi', 'organic-modern'], ['sand-travertine'], 'A soft pebble-shaped wall mirror with a thin brass edge.', {}],
  ['circuit-red-wall-mirror', 'Circuit Red Wall Mirror', 21000, 'Everyday Objects', 'lifestyle-cherry-chrome-scene', 'lacquer', 'Lacquered resin, mirror centre', 'Ø 75 cm', ['living', 'office'], ['modern-minimal', 'mid-century'], ['cherry-bold'], 'A round red wall piece with a pattern of fine lines and a mirror in the centre.', {}],

  // ---------------- Added from the section image sets ----------------
  ['wave-base-coffee-table', 'Wave Base Coffee Table', 96000, 'Furniture', 'product-wave-base-coffee-table', 'wood', 'Solid walnut', '150 W × 80 D × 38 H cm', ['living'], ['organic-modern', 'mid-century', 'japandi'], ['ivory-walnut', 'sand-travertine'], 'A walnut top resting on a single sweeping wave of carved wood. The grain runs through the curve.', { madeToOrder: true, isNew: true }],
  ['live-edge-coffee-table', 'Sculpted Live-Edge Coffee Table', 118000, 'Furniture', 'product-live-edge-coffee-table', 'wood', 'Solid hardwood slab', '140 W × 70 D × 40 H cm', ['living'], ['organic-modern', 'japandi'], ['ivory-walnut'], 'A single block of figured wood with carved openings that show the grain from every side.', { madeToOrder: true, isNew: true }],
  ['red-modular-sofa', 'Terracotta Red Modular Sofa', 164000, 'Furniture', 'lifestyle-red-modular-sofa', 'fabric', 'Wool-blend upholstery, hardwood frame', '280 W × 160 D × 70 H cm', ['living'], ['mid-century', 'modern-minimal'], ['cherry-bold'], 'A low, soft-cornered modular sofa with a matching ottoman, in a warm terracotta red.', { madeToOrder: true }],
  ['sculpted-platform-bed', 'Sculpted Walnut Platform Bed', 185000, 'Furniture', 'product-sculpted-platform-bed', 'wood', 'Walnut veneer, solid frame', '200 W × 220 D × 95 H cm (queen)', ['bedroom'], ['organic-modern', 'mid-century'], ['ivory-walnut'], 'A bed with a curved headboard that wraps into built-in side shelves. Made to order.', { madeToOrder: true, isNew: true }],
  ['ocean-wave-sofa', 'Serpentine Bouclé Sofa', 148000, 'Furniture', 'product-ocean-wave-sofa', 'fabric', 'Bouclé upholstery, hardwood frame', '260 W × 110 D × 75 H cm', ['living'], ['organic-modern', 'modern-minimal'], ['ivory-walnut', 'sand-travertine'], 'A long, flowing sofa with a rolled back that curves along the wall.', { madeToOrder: true }],
  ['honeycomb-reading-chair', 'Honeycomb Reading Chair', 92000, 'Furniture', 'product-honeycomb-reading-chair', 'wood', 'Walnut veneer shell, upholstered seat', '90 W × 85 D × 130 H cm', ['living', 'office'], ['mid-century', 'organic-modern'], ['sage-oak', 'ivory-walnut'], 'An egg-shaped chair with honeycomb shelves built into the shell. Books stay within reach.', { madeToOrder: true, bestseller: true }],
  ['brass-leaf-pendants', 'Brass Leaf Pendants', 72000, 'Lighting', 'product-brass-leaf-pendants', 'metal', 'Hammered brass', 'Large 110 W; discs Ø 70 and Ø 60 cm', ['living', 'dining'], ['modern-minimal', 'organic-modern'], ['sand-travertine', 'ivory-walnut'], 'Hand-beaten brass shades that glow warmly. Hang them singly or as a group.', { madeToOrder: true }],
  ['curved-laptop-stand', 'Curved Laptop Stand', 6900, 'Office Accessories', 'product-curved-laptop-stand', 'metal', 'Anodised aluminium', '28 W × 24 D × 20 H cm', ['office'], ['modern-minimal', 'scandinavian'], ['charcoal-white'], 'A one-piece curved stand that lifts a laptop to eye level and keeps the desk clear.', {}],
  ['wireless-keyboard-mouse', 'Wireless Keyboard & Mouse Set', 5400, 'Office Accessories', 'product-keyboard-mouse-white', 'metal', 'Slim ABS and aluminium', 'Keyboard 44 × 12 cm; mouse 11 × 6 cm', ['office'], ['modern-minimal', 'scandinavian'], ['charcoal-white', 'ivory-walnut'], 'A slim keyboard and matching mouse that suit a minimal desk.', {
    variants: [
      { name: 'White', color: '#F2F2EF', delta: 0, image: img('product-keyboard-mouse-white') },
      { name: 'Graphite', color: '#34363A', delta: 0, image: img('product-keyboard-mouse-graphite') },
    ],
  }],
  ['leather-file-set', 'Leather Desk File Set', 7800, 'Office Accessories', 'product-leather-file-set', 'textile', 'Vegetable-tanned leather, powder-coated steel', 'Rack 32 × 14 × 28 H cm', ['office'], ['scandinavian', 'organic-modern'], ['sage-oak', 'sand-travertine'], 'A steel rack with leather folders in sage, tan and cream. Keeps papers upright and in order.', { isNew: true }],
  ['navy-desk-set', 'Navy Quilted Desk Set', 8900, 'Office Accessories', 'product-navy-desk-set', 'textile', 'Quilted leather-look, brass-finish trim', 'Calendar box 26 × 10 × 8 cm; pen cups 8–10 cm', ['office'], ['mid-century', 'modern-minimal'], ['charcoal-white'], 'A calendar box, pen cups and notebook in navy with gold detail.', {}],
  ['travertine-block-planter', 'Travertine Block Planter', 9800, 'Planters', 'product-travertine-block-planter', 'stone', 'Natural travertine', '24 W × 24 D × 20 H cm', ['living', 'bedroom', 'office'], ['japandi', 'organic-modern'], ['sand-travertine'], 'A stepped block of travertine that holds a vase insert or flowers.', {}],
  ['hourglass-planter-trio', 'Hourglass Planter Trio', 18500, 'Planters', 'product-hourglass-planter-trio', 'plant', 'Matte-glazed ceramic', 'Three sizes: 28, 38 and 52 H cm', ['living', 'bedroom'], ['scandinavian', 'japandi', 'modern-minimal'], ['ivory-walnut', 'sage-oak'], 'Three white planters shaped like hourglasses, in graduated sizes.', { bestseller: true }],
  ['travertine-quatrefoil-tray', 'Travertine Quatrefoil Tray', 6400, 'Everyday Objects', 'product-travertine-quatrefoil-tray', 'stone', 'Natural travertine', '34 W × 28 D × 3 H cm', ['bedroom', 'living', 'office'], ['japandi', 'organic-modern'], ['sand-travertine'], 'A four-lobed tray for keys, watches and glasses.', {}],
];

// Selected-pieces offer: up to 20% off. `price` becomes the sale price; `mrp` the original list price.
const round100 = (n) => Math.round(n / 100) * 100;

export const products = rows.map((r, i) => {
  const [slug, name, base, category, image, kind, material, dimensions, rooms, styles, tones, description, ex] = r;
  const price = ex.sale ? round100(base * (1 - ex.sale / 100)) : base;
  const variants = ex.variants || mk(kind, price);
  return {
    id: `ff-${String(i + 1).padStart(3, '0')}`, slug, name, price, mrp: ex.sale ? base : null, salePct: ex.sale || 0,
    category, image: img(image), material, dimensions, rooms, styles, tones, description,
    variants, care: CARE[kind === 'light' ? 'light' : kind] || CARE.wood,
    bestseller: !!ex.bestseller, isNew: !!ex.isNew,
    status: ex.madeToOrder ? 'Made to order' : 'Available',
    order: i + 1,
  };
});

export const CATEGORIES = ['Furniture', 'Lighting', 'Office Accessories', 'Planters', 'Everyday Objects'];
export const getProduct = (slug) => products.find((p) => p.slug === slug);
export const getProductById = (id) => products.find((p) => p.id === id);
export const byIds = (slugs) => slugs.map(getProduct).filter(Boolean);
export const related = (p, n = 4) =>
  products.filter((x) => x.id !== p.id).map((x) => ({ x, s: (x.category === p.category ? 2 : 0) + x.rooms.filter((r) => p.rooms.includes(r)).length + x.styles.filter((s) => p.styles.includes(s)).length }))
    .sort((a, b) => b.s - a.s || a.x.order - b.x.order).slice(0, n).map((o) => o.x);
