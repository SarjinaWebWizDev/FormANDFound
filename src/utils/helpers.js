export const formatINR = (n) => '₹' + Math.round(n).toLocaleString('en-IN');
export const FREE_DELIVERY_ABOVE = 10000;
export const DELIVERY_FEE = 499;
export const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
export const uid = (p = 'id') => `${p}-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`;

// Versioned localStorage. Data is stored as { v, data }; anything with another version is passed to `migrate`.
export function load(key, version, fallback, migrate) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.v === version) return parsed.data;
    if (migrate) return migrate(parsed);
    return fallback;
  } catch { return fallback; }
}
export function save(key, version, data) {
  try { localStorage.setItem(key, JSON.stringify({ v: version, data })); } catch { /* storage unavailable */ }
}
