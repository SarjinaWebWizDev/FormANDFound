# FORM & FOUND

Vite + React + Tailwind + React Router + Framer Motion storefront (demo). Prices in INR.

    npm install
    npm run dev      # development
    npm run build    # production build

## What's inside
- **3D hero** (`src/components/Hero3D.jsx`): CSS-3D rotating gallery ring. Drag to spin, pointer tilts the scene. Respects `prefers-reduced-motion` (static ring with arrow buttons).
- **Promotions** (`src/data/offers.js`): one config array (`PROMOTIONS`) with id, title, code, type, value, eligibility, minSpend, eligible ids, start/end dates, active and stackable flags, plus `validatePromotion`. `computeCart()` is the single pricing engine used by cart, drawer, checkout, planner and orders.
  - `FIRST10` – 10% off a first eligible order, min ₹5,000 (max ₹15,000). "First order" = no orders in this browser.
  - `ROOM12` – 12% off a complete curated room set (replaces the 5% set saving).
  - Complimentary delivery above ₹10,000 (after discounts); otherwise ₹499.
  - Not stackable: FIRST10 and set savings/ROOM12 never add up; the larger saving wins.
- **Announcement bar**: one message at a time, built from live promotions.
- **Unique features**: Style Finder quiz → planner; Shop-the-Room hotspots; Compare (up to 3); 3D tilt product cards; Recently viewed.
- **Planner**: Room → Style → Palette → Products → Budget (cheaper-alternative swaps) → Final Plan; saved designs in versioned localStorage (`ff.designs`, v2, with migration from v1).
- **Order tracking**: Placed → Confirmed → Shipped → Out for Delivery → Delivered, advanced manually (simulated).

## Not real
No payment, backend, courier or reviews exist. Checkout, orders and tracking are simulated in the browser. Connect a payment provider and backend before launch.

Colours: ivory #F8F6F1, beige #E9E1D5, walnut #624634, espresso #30251F, sage #A1AA91, champagne gold #B49A70.
