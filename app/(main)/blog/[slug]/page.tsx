import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { Container } from "@/src/components/ui/Section";
import { Photo } from "@/src/components/ui/Photo";
import { ButtonLink } from "@/src/components/ui/Button";
import { loadPost, listPosts } from "@/src/lib/blog";
import { photo } from "@/src/lib/images";
import { arabicDate } from "@/src/lib/format";
import { SITE_URL } from "@/src/shared/utils/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) return { title: "المقال غير موجود | FocusFix" };
  const image = photo(post.cover, 1200, 630);
  return {
    title: `${post.title} | مدونة FocusFix`,
    description: post.description,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.description, images: [image], type: "article" },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, all] = await Promise.all([loadPost(slug), listPosts()]);
  if (!post) notFound();
  const related = all.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: [photo(post.cover, 1200, 630).replace(/^\//, `${SITE_URL}/`)],
    ...(post.publishedAt ? { datePublished: post.publishedAt } : {}),
    ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
    author: { "@type": "Organization", name: "FocusFix", url: SITE_URL },
    publisher: { "@type": "Organization", name: "FocusFix", logo: { "@type": "ImageObject", url: `${SITE_URL}/logo1.jpeg` } },
    description: post.description,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
  };

  return (
    <article className="pt-28 pb-16 sm:pt-36">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Container className="max-w-3xl">
        <nav aria-label="مسار الصفحة" className="flex flex-wrap items-center gap-1.5 text-[13px] text-ink-3">
          <Link href="/" className="hover:text-ink">الرئيسية</Link>/<Link href="/blog" className="hover:text-ink">المدونة</Link>
        </nav>
        <p className="mt-6 flex items-center gap-3 text-sm text-ink-3">
          <span className="font-semibold text-brand-600">{post.category}</span>
          <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />{post.readMinutes} دقايق قراية</span>
          {post.publishedAt && <span className="num">{arabicDate(post.publishedAt, { day: "numeric", month: "long", year: "numeric" })}</span>}
        </p>
        <h1 className="mt-3 text-3xl font-bold leading-[1.3] sm:text-[44px]">{post.title}</h1>
      </Container>

      <Container className="mt-8 max-w-5xl">
        <Photo src={post.cover} alt={post.title} aspect={16 / 9} priority className="aspect-[16/9] w-full rounded-[1.75rem]" sizes="(max-width: 1024px) 100vw, 1000px" />
      </Container>

      <Container className="mt-10 max-w-3xl">
        <div className="prose-ff" dangerouslySetInnerHTML={{ __html: post.html }} />

        <aside className="mt-12 flex flex-col items-start gap-4 rounded-[1.75rem] bg-brand-500 p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div>
            <p className="font-display text-xl font-semibold">جهازك محتاج صيانة؟</p>
            <p className="mt-1 text-white/80">الفني يوصلك ويصلح قدامك في حوالي 30 دقيقة.</p>
          </div>
          <ButtonLink href="/book" variant="light">احجز فني <ArrowLeft className="h-4 w-4" /></ButtonLink>
        </aside>
      </Container>

      {related.length > 0 && (
        <Container className="mt-16">
          <h2 className="mb-6 font-display text-2xl font-semibold">اقرا كمان</h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group overflow-hidden rounded-[1.5rem] bg-white shadow-soft ring-1 ring-ink/5">
                <Photo src={p.cover} alt={p.title} aspect={16 / 10} className="aspect-[16/10] w-full transition-transform duration-700 group-hover:scale-105" sizes="33vw" />
                <h3 className="p-5 font-semibold leading-snug">{p.title}</h3>
              </Link>
            ))}
          </div>
        </Container>
      )}
    </article>
  );
}
