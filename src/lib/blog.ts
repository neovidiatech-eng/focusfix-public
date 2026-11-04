import sanitizeHtml from "sanitize-html";
import { getPost, getPosts, type BlogPostSummary } from "./api";
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

/** Published posts from the dashboard CMS */
export async function listPosts(): Promise<PostCard[]> {
  return (await getPosts(60)).map(fromApi);
}

export async function loadPost(slug: string): Promise<PostFull | null> {
  const p = await getPost(slug);
  if (p?.title_ar) {
    const html = p.content_html ? sanitizeArticleHtml(p.content_html) : sanitizeArticleHtml(`<p>${p.excerpt_ar || ""}</p>`);
    return { ...fromApi(p), html, description: p.meta_desc_ar || p.excerpt_ar || plain(html).slice(0, 160), updatedAt: p.updated_at || null };
  }
  return null;
}
