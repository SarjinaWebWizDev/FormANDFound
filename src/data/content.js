import { img } from './products';

export const articles = [
  { slug: 'how-to-choose-a-sofa', title: 'How to choose a sofa you will keep', category: 'Guide', date: '12 Oct', image: img('lifestyle-curved-sofa-room'), excerpt: 'Depth, fabric and frame: three things to check before you fall for a shape.',
    body: ['Start with how you sit. A deep seat suits lounging, a firm, upright one suits conversation. Sit on a sofa for a few minutes before deciding, if you can.', 'Fabric matters as much as shape. Bouclé and linen blends feel soft and hide small marks, while tight weaves are easier to clean. Ask for a swatch and look at it in your own light.', 'Finally, measure the room and the doorway. A sofa should leave space to walk around it and a clear path to get it in.'] },
  { slug: 'layering-light', title: 'Layering light in a living room', category: 'Lighting', date: '4 Oct', image: img('lifestyle-wave-sconce-lounge'), excerpt: 'Floor, table and wall lights at different heights make a room feel calm.',
    body: ['One ceiling light flattens a room. Add lamps at different heights and the space gains depth.', 'Aim for three sources: a floor lamp near a seat, a table lamp on a side table and a wall or pendant light. Keep bulbs warm, around 2700K.', 'Use dimmers where you can. The same room can be bright in the morning and soft in the evening.'] },
  { slug: 'a-colour-that-means-it', title: 'A colour that means it: using red at home', category: 'Colour', date: '25 Sep', image: img('lifestyle-cherry-edit-room'), excerpt: 'One glossy red piece can anchor a neutral room. Here is how to keep it balanced.',
    body: ['Pick one hero piece, such as a chair, a lamp or a side table, and let the rest of the room stay quiet.', 'Repeat the red once or twice in smaller ways, like a vase or a rug pattern, so the eye travels around the room.', 'Warm woods, travertine and ivory walls all sit well next to a deep, cherry red.'] },
  { slug: 'making-a-desk-work', title: 'Making a small desk work harder', category: 'Workspace', date: '14 Sep', image: img('lifestyle-walnut-desk-studio'), excerpt: 'Light, storage and one good chair beat a bigger desk.',
    body: ['Place the desk where it gets daylight, with the screen at right angles to the window to reduce glare.', 'A small organiser and a tray keep daily tools at hand and clear the surface.', 'Add a plant or a lamp you like looking at. A desk you enjoy is a desk you use.'] },
];
export const getArticle = (s) => articles.find((a) => a.slug === s);

export const faqs = [
  { q: 'Is this a live store?', a: 'This is a demonstration storefront. Checkout, payment and order tracking are simulated in your browser. No payment is taken and no real order is placed.' },
  { q: 'How do promo codes work?', a: 'FIRST10 gives 10% off a first eligible order over ₹5,000. ROOM12 gives 12% off a complete curated room set. Codes are checked for dates, minimum spend and eligibility, and they cannot be combined.' },
  { q: 'When is delivery complimentary?', a: 'Orders above ₹10,000 (after discounts) have complimentary delivery. Below that, delivery is ₹499.' },
  { q: 'Can I change the finish of a piece?', a: 'Yes. Where a piece comes in several finishes, choose one on the product page. The price and picture update, and your choice is saved in the cart.' },
  { q: 'What does "Made to order" mean?', a: 'Those pieces are produced after you order. A lead time would be confirmed by the real store when it opens.' },
  { q: 'Are my saved designs private?', a: 'Saved designs, wishlist and cart are stored only in this browser.' },
];

export const policies = {
  'shipping-returns': { title: 'Shipping & Returns', sections: [
    ['Demo notice', 'This storefront is a demonstration. Nothing here is a binding offer, and no goods are shipped.'],
    ['Delivery', 'Delivery is ₹499 per order, and complimentary above ₹10,000 after discounts.'],
    ['Returns', 'A real store would set its own return window. Replace this text with your policy before launch.'],
  ] },
  privacy: { title: 'Privacy', sections: [
    ['What is stored', 'Your cart, wishlist, saved designs and demo orders are kept in your browser’s local storage. Nothing is sent to a server.'],
    ['Newsletter and contact', 'The newsletter and contact forms are simulated and save a note in your browser only.'],
  ] },
  terms: { title: 'Terms', sections: [
    ['Use of this site', 'This is a design demonstration with sample products and prices.'],
    ['Before launch', 'Connect a real payment provider and backend, and replace these terms with your own.'],
  ] },
};
