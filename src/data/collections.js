import { img } from './products';

export const collections = [
  { slug: 'the-cherry-edit', name: 'The Cherry Edit', eyebrow: 'Collection 01', image: img('lifestyle-cherry-edit-room'), caption: 'High-gloss red against warm neutrals.',
    intro: 'One bold colour, used with intent.', body: 'Lacquer, glass and fringe in cherry and oxblood. Each piece is a single confident note in an otherwise calm room.',
    products: ['red-modular-sofa', 'cherry-pod-chair', 'cherry-lacquer-side-table', 'cherry-dome-lamp', 'oxblood-stool', 'fringe-chaise', 'travertine-cherry-table', 'abstract-tufted-rug', 'red-ribbon-vases'], theme: { bg: '#2B1816', fg: '#F8F6F1', accent: '#B3121C' } },
  { slug: 'quiet-living', name: 'Quiet Living', eyebrow: 'Collection 02', image: img('lifestyle-sunlit-living'), caption: 'Soft shapes for the room you relax in.',
    intro: 'Low, rounded and calm.', body: 'Bouclé, limestone and linen in a neutral range. These pieces are meant to be lived with for years.',
    products: ['wave-base-coffee-table', 'ocean-wave-sofa', 'boucle-cloud-sofa', 'raw-stone-coffee-table', 'cloud-boucle-stool', 'oatmeal-wool-rug', 'arc-floor-lamp', 'linen-throw-cushions', 'twisted-floor-vases'], theme: { bg: '#E9E1D5', fg: '#30251F', accent: '#624634' } },
  { slug: 'sculpted-forms', name: 'Sculpted Forms', eyebrow: 'Collection 03', image: img('lifestyle-sculpted-lounge'), caption: 'Furniture shaped like sculpture.',
    intro: 'Curves, cantilevers and carved wood.', body: 'Shelves that wind, chairs that unfold and tables that twist. Designed to be seen from every side.',
    products: ['live-edge-coffee-table', 'honeycomb-reading-chair', 'sculpted-platform-bed', 'serpentine-bookshelf', 'petal-back-chair', 'spiral-pedestal-table', 'walnut-shell-chaise', 'sculpted-oak-shelf', 'tree-bracket-desk', 'chrome-ripple-bench'], theme: { bg: '#F1E6D6', fg: '#30251F', accent: '#624634' } },
  { slug: 'considered-workspace', name: 'Considered Workspace', eyebrow: 'Collection 04', image: img('lifestyle-walnut-desk-studio'), caption: 'A desk that helps you think.',
    intro: 'Work with intention.', body: 'Desks, chairs, light and small organisers that keep the day tidy and the room pleasant.',
    products: ['curved-laptop-stand', 'wireless-keyboard-mouse', 'leather-file-set', 'navy-desk-set', 'minimal-oak-desk', 'tree-bracket-desk', 'tan-executive-chair', 'desk-organiser', 'infinity-pen-holder', 'bookends', 'sitting-globe-lamp', 'lantern-table-lamps', 'sage-ceramic-planter'], theme: { bg: '#30251F', fg: '#F8F6F1', accent: '#B49A70' } },
  { slug: 'soft-light', name: 'Soft Light', eyebrow: 'Collection 05', image: img('lifestyle-wave-sconce-lounge'), caption: 'Warm, layered lighting.',
    intro: 'Light at every height.', body: 'Floor, table, wall and pendant lamps that give an evening glow.',
    products: ['brass-leaf-pendants', 'arc-floor-lamp', 'brass-wall-sconce', 'bronze-pendant-light', 'ceramic-table-lamp', 'stone-table-lamp', 'backlit-organic-mirror', 'sage-cloud-chandelier'], theme: { bg: '#E7DDC9', fg: '#30251F', accent: '#B49A70' } },
  { slug: 'everyday-rituals', name: 'Everyday Rituals', eyebrow: 'Collection 06', image: img('category-everyday-objects'), caption: 'Small things you use daily.',
    intro: 'Objects for slow mornings.', body: 'Stoneware, glass and linen chosen to feel good in the hand.',
    products: ['ribbed-stoneware-set', 'stoneware-tableware-set', 'cream-pitcher', 'cream-stone-bowl', 'smoked-glass-vase', 'linen-bed-throw', 'catchall-tray'], theme: { bg: '#EDE5D6', fg: '#30251F', accent: '#624634' } },
  { slug: 'the-green-room', name: 'The Green Room', eyebrow: 'Collection 07', image: img('lifestyle-curved-sofa-green'), caption: 'Planters, sage and greenery.',
    intro: 'Bring the outside in.', body: 'Planters and green accents that make a room feel alive.',
    products: ['hourglass-planter-trio', 'travertine-block-planter', 'white-wave-planter', 'olive-tree-planter', 'sage-ceramic-planter', 'sage-chesterfield-sofa', 'sage-cloud-chandelier', 'olive-wave-mirror', 'anthurium-stone-vase'], theme: { bg: '#DDE0D2', fg: '#30251F', accent: '#6F7A5F' } },
];
export const getCollection = (slug) => collections.find((c) => c.slug === slug);
