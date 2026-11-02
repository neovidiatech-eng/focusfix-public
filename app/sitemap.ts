import { MetadataRoute } from "next";
import { API_BASE_URL, SITE_URL } from "@/src/shared/utils/site";

export const revalidate = 3600;

const STATIC_ROUTES: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }> = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/book", priority: 0.9, changeFrequency: "weekly" },
  { path: "/prices", priority: 0.9, changeFrequency: "daily" },
  { path: "/services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/areas", priority: 0.8, changeFrequency: "weekly" },
  { path: "/blog", priority: 0.7, changeFrequency: "daily" },
  { path: "/warranty", priority: 0.5, changeFrequency: "yearly" },
  { path: "/track", priority: 0.4, changeFrequency: "yearly" },
  { path: "/join", priority: 0.3, changeFrequency: "yearly" },
];

async function fetchJson(path: string): Promise<unknown> {
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, { next: { revalidate: 3600 } });
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const [areas, posts] = await Promise.all([fetchJson("/areas"), fetchJson("/blog/posts?limit=500")]);

  if (Array.isArray(areas)) {
    for (const a of areas as Array<{ slug?: string }>) {
      if (a.slug) {
        entries.push({ url: `${SITE_URL}/areas/${a.slug}`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
      }
    }
  }

  const postList = (posts as { data?: Array<{ slug?: string; updated_at?: string; published_at?: string }> } | null)?.data;
  if (Array.isArray(postList)) {
    for (const p of postList) {
      if (p.slug) {
        entries.push({
          url: `${SITE_URL}/blog/${p.slug}`,
          lastModified: new Date(p.updated_at || p.published_at || now),
          changeFrequency: "monthly",
          priority: 0.6,
        });
      }
    }
  }

  return entries;
}
