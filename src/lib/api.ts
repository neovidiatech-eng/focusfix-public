import { API_BASE_URL } from "@/src/shared/utils/site";

/**
 * Server-side reads from the API. Every call carries the cache tags the API
 * revalidates when the dashboard saves (see focusfix-api/src/lib/revalidate.ts),
 * so dashboard edits show up on the site immediately.
 */
async function get<T>(path: string, tags: string[], fallback: T, revalidate = 300): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, { next: { revalidate, tags } });
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    // API unreachable (e.g. during build) — render with the fallback
    return fallback;
  }
}

export interface Area {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
  city_ar: string;
  transport_fee: string;
  intro_ar: string | null;
  seo_title: string | null;
  seo_desc: string | null;
}

export interface AreaSlot {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  max_bookings: number;
  is_active: boolean;
}

export interface AreaDetail extends Area {
  time_slots: AreaSlot[];
}

export interface DeviceType {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
  is_coming_soon: boolean;
  intro_ar: string | null;
  seo_h1_ar: string | null;
}

export interface Service {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
  estimated_minutes: number;
  default_warranty_days: number;
}

export interface PriceCell {
  id: string;
  status: "available" | "included" | "on_request" | "unavailable";
  price: string | null;
  discountPrice: string | null;
  warrantyDays: number;
  note_ar: string | null;
}

export interface PriceModel {
  id: string;
  name: string;
  slug: string;
  releaseYear: number;
  cells: Record<string, PriceCell>;
}

export interface PriceColumn {
  id: string;
  slug: string;
  name_ar: string;
  name_en: string;
  estimatedMinutes: number;
}

export interface PriceMatrix {
  deviceType: { id: string; slug: string; name_ar: string; name_en: string };
  columns: PriceColumn[];
  series: Array<{ title: string; models: PriceModel[] }>;
}

export interface BlogPostSummary {
  slug: string;
  title_ar: string;
  excerpt_ar: string | null;
  featured_image: string | null;
  published_at: string | null;
  reading_minutes: number | null;
  category: { name_ar: string; slug: string } | null;
}

export interface BlogPost extends BlogPostSummary {
  content_html: string | null;
  meta_title_ar?: string | null;
  meta_desc_ar: string | null;
  updated_at?: string;
}

export const getAreas = () => get<Area[]>("/areas", ["areas"], []);
export const getArea = (slug: string) => get<AreaDetail | null>(`/areas/${encodeURIComponent(slug)}`, ["areas"], null);
export const getDeviceTypes = () => get<DeviceType[]>("/catalog/device-types", ["catalog"], []);
export const getServices = () => get<Service[]>("/catalog/services", ["catalog", "services"], []);
export const getPriceMatrix = (type: string) => get<PriceMatrix | null>(`/pricing?type=${encodeURIComponent(type)}`, ["prices"], null);

export async function getAllPriceMatrices() {
  const types = (await getDeviceTypes()).filter((t) => !t.is_coming_soon);
  const matrices = await Promise.all(types.map((t) => getPriceMatrix(t.slug)));
  return types
    .map((type, i) => ({ type, matrix: matrices[i] }))
    .filter((x): x is { type: DeviceType; matrix: PriceMatrix } => !!x.matrix && x.matrix.series.some((s) => s.models.length > 0));
}

export const getPosts = (limit = 30) =>
  get<{ data: BlogPostSummary[] }>(`/blog/posts?limit=${limit}`, ["blog"], { data: [] }, 60).then((r) => r.data || []);
export const getPost = (slug: string) => get<BlogPost | null>(`/blog/posts/${encodeURIComponent(slug)}`, ["blog", `blog:${slug}`], null, 60);

/** Lowest bookable price of a cell (discount wins), or null when it isn't priced online */
export function cellPrice(cell?: PriceCell | null): number | null {
  if (!cell || cell.status !== "available" || !cell.price) return null;
  const price = Number(cell.price);
  const discount = cell.discountPrice ? Number(cell.discountPrice) : null;
  return discount !== null && discount < price ? discount : price;
}

/** "Starting from" price per service slug across every model of a matrix */
export function startingPrices(matrix: PriceMatrix | null): Record<string, number> {
  const out: Record<string, number> = {};
  if (!matrix) return out;
  for (const series of matrix.series) {
    for (const model of series.models) {
      for (const [slug, cell] of Object.entries(model.cells)) {
        const p = cellPrice(cell);
        if (p !== null && (out[slug] === undefined || p < out[slug])) out[slug] = p;
      }
    }
  }
  return out;
}
