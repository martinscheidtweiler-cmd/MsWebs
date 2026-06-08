/**
 * Shared helpers for Hippique API routes.
 * Converts between camelCase TypeScript types and snake_case Supabase columns.
 */

export interface Property {
  id: string; title: string; subtitle: string; type: string;
  location: string; municipality: string; province: string; country: string;
  price: number | null; priceOnRequest: boolean;
  groundSurface: number; livingSurface: number;
  stalls: number; indoorArena: boolean; outdoorArena: boolean;
  paddocks: number; pastures: number; boxes: number; residence: boolean;
  permits: string[]; description: string; features: string[];
  tag: string; featured: boolean; year: number; gradient: string;
}

export interface BlogPost {
  id: string; title: string; excerpt: string; content: string;
  category: string; date: string; readTime: number; gradient: string;
}

export interface Partner {
  id: string; name: string; file: string; dark: boolean;
}

// ── Property conversions ──────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function propFromRow(r: any): Property {
  return {
    id: r.id, title: r.title, subtitle: r.subtitle ?? "",
    type: r.type, location: r.location, municipality: r.municipality,
    province: r.province, country: r.country,
    price: r.price ?? null, priceOnRequest: r.price_on_request ?? false,
    groundSurface: r.ground_surface ?? 0, livingSurface: r.living_surface ?? 0,
    stalls: r.stalls ?? 0, indoorArena: r.indoor_arena ?? false,
    outdoorArena: r.outdoor_arena ?? false, paddocks: r.paddocks ?? 0,
    pastures: r.pastures ?? 0, boxes: r.boxes ?? 0, residence: r.residence ?? false,
    permits: r.permits ?? [], description: r.description ?? "",
    features: r.features ?? [], tag: r.tag ?? "",
    featured: r.featured ?? false, year: r.year ?? new Date().getFullYear(),
    gradient: r.gradient ?? "",
  };
}

export function propToRow(p: Partial<Property>) {
  const row: Record<string, unknown> = {};
  if (p.id              !== undefined) row.id               = p.id;
  if (p.title           !== undefined) row.title            = p.title;
  if (p.subtitle        !== undefined) row.subtitle         = p.subtitle;
  if (p.type            !== undefined) row.type             = p.type;
  if (p.location        !== undefined) row.location         = p.location;
  if (p.municipality    !== undefined) row.municipality     = p.municipality;
  if (p.province        !== undefined) row.province         = p.province;
  if (p.country         !== undefined) row.country          = p.country;
  if (p.price           !== undefined) row.price            = p.price;
  if (p.priceOnRequest  !== undefined) row.price_on_request = p.priceOnRequest;
  if (p.groundSurface   !== undefined) row.ground_surface   = p.groundSurface;
  if (p.livingSurface   !== undefined) row.living_surface   = p.livingSurface;
  if (p.stalls          !== undefined) row.stalls           = p.stalls;
  if (p.indoorArena     !== undefined) row.indoor_arena     = p.indoorArena;
  if (p.outdoorArena    !== undefined) row.outdoor_arena    = p.outdoorArena;
  if (p.paddocks        !== undefined) row.paddocks         = p.paddocks;
  if (p.pastures        !== undefined) row.pastures         = p.pastures;
  if (p.boxes           !== undefined) row.boxes            = p.boxes;
  if (p.residence       !== undefined) row.residence        = p.residence;
  if (p.permits         !== undefined) row.permits          = p.permits;
  if (p.description     !== undefined) row.description      = p.description;
  if (p.features        !== undefined) row.features         = p.features;
  if (p.tag             !== undefined) row.tag              = p.tag;
  if (p.featured        !== undefined) row.featured         = p.featured;
  if (p.year            !== undefined) row.year             = p.year;
  if (p.gradient        !== undefined) row.gradient         = p.gradient;
  return row;
}

// ── Blog conversions ──────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function blogFromRow(r: any): BlogPost {
  return {
    id: r.id, title: r.title, excerpt: r.excerpt ?? "",
    content: r.content ?? "", category: r.category ?? "",
    date: r.date ?? "", readTime: r.read_time ?? 5, gradient: r.gradient ?? "",
  };
}

export function blogToRow(b: Partial<BlogPost>) {
  const row: Record<string, unknown> = {};
  if (b.id       !== undefined) row.id        = b.id;
  if (b.title    !== undefined) row.title     = b.title;
  if (b.excerpt  !== undefined) row.excerpt   = b.excerpt;
  if (b.content  !== undefined) row.content   = b.content;
  if (b.category !== undefined) row.category  = b.category;
  if (b.date     !== undefined) row.date      = b.date;
  if (b.readTime !== undefined) row.read_time = b.readTime;
  if (b.gradient !== undefined) row.gradient  = b.gradient;
  return row;
}

// ── Slug generator ────────────────────────────────────────────

export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
    .slice(0, 80);
}
