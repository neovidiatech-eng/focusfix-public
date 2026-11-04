import sanitizeHtml from "sanitize-html";
import { getPost, getPosts, type BlogPostSummary } from "./api";
import { STATIC_ARTICLES } from "@/src/content/articles";
import { PHOTOS } from "./images";

export interface PostCard {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  publishedAt: string | null;
  cover: string;
}

export interface PostFull extends PostCard {
  html: string;
  description: string;
  updatedAt: string | null;
}

// The built-in articles shipped with old AI-looking covers; use photography instead
const STATIC_COVERS: Record<string, string> = {
  "when-to-replace-iphone-battery": PHOTOS.partsFlatlay,
  "original-vs-copy-iphone-screen": PHOTOS.crackedOnMat,
  "what-to-do-when-iphone-drops-in-water": PHOTOS.handIphone,
  "doorstep-repair-privacy-and-data-safety": PHOTOS.heroRepair,
};

// Admin-authored HTML from the CMS — allowlist the tags the TipTap editor produces
export function sanitizeArticleHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "figure", "figcaption"]),
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      "*": ["dir", "lang"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: { a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }) },
  });
}

const plain = (html: string) => sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} }).replace(/\s+/g, " ").trim();

function fromApi(p: BlogPostSummary): PostCard {
  return {
    slug: p.slug,
    title: p.title_ar,
    excerpt: p.excerpt_ar || "",
    category: p.category?.name_ar || "مقالات",
    readMinutes: p.reading_minutes || 4,
    publishedAt: p.published_at,
    cover: p.featured_image || PHOTOS.openedPhone,
  };
}

function staticCards(): PostCard[] {
  return Object.values(STATIC_ARTICLES).map((a) => ({
    slug: a.slug,
    title: a.title,
    excerpt: a.content[0] || "",
    category: a.category,
    readMinutes: parseInt(a.readTime, 10) || 4,
    publishedAt: null,
    cover: STATIC_COVERS[a.slug] || PHOTOS.openedPhone,
  }));
}

/** CMS posts; the built-in articles fill in until the CMS has any */
export async function listPosts(): Promise<PostCard[]> {
  const live = (await getPosts(60)).map(fromApi);
  return live.length > 0 ? live : staticCards();
}

export async function loadPost(slug: string): Promise<PostFull | null> {
  const p = await getPost(slug);
  if (p?.title_ar) {
    const html = p.content_html ? sanitizeArticleHtml(p.content_html) : `<p>${p.excerpt_ar || ""}</p>`;
    return { ...fromApi(p), html, description: p.meta_desc_ar || p.excerpt_ar || plain(html).slice(0, 160), updatedAt: p.updated_at || null };
  }
  const a = STATIC_ARTICLES[slug];
  if (!a) return null;
  const card = staticCards().find((c) => c.slug === slug)!;
  const html = a.content.map((para) => `<p>${sanitizeHtml(para, { allowedTags: [] })}</p>`).join("");
  return { ...card, html, description: a.content[0]?.slice(0, 160) || "", updatedAt: null };
}
