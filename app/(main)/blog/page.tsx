import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { PageHero, Container } from "@/src/components/ui/Section";
import { Reveal } from "@/src/components/ui/Reveal";
import { Photo } from "@/src/components/ui/Photo";
import { listPosts, type PostCard } from "@/src/lib/blog";
import { arabicDate } from "@/src/lib/format";
import { SITE_URL } from "@/src/shared/utils/site";

export const metadata: Metadata = {
  title: "مدونة FocusFix — نصايح صيانة وعناية بالآيفون",
  description: "مقالات عن صيانة الآيفون: إمتى تغير البطارية، الفرق بين الشاشة الأصلية والتقليد، وتعمل إيه لو الموبايل وقع في المية.",
  alternates: { canonical: `${SITE_URL}/blog` },
};

function Meta({ post }: { post: PostCard }) {
  return (
    <span className="flex items-center gap-3 text-[13px] text-ink-3">
      <span className="font-semibold text-brand-600">{post.category}</span>
      <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.readMinutes} دقايق</span>
      {post.publishedAt && <span className="num">{arabicDate(post.publishedAt, { day: "numeric", month: "short", year: "numeric" })}</span>}
    </span>
  );
}

export default async function BlogPage() {
  const posts = await listPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero crumbs={[{ label: "الرئيسية", href: "/" }, { label: "المدونة" }]} eyebrow="المدونة" title="نصايح تخلّي جهازك يعيش أطول" desc="من فنيين FocusFix: إزاي تحافظ على البطارية، تعرف الشاشة الأصلية، وتتصرف صح لو حصل عطل." />
      <Container className="py-14 sm:py-20">
        {!featured ? (
          <p className="rounded-2xl bg-white p-10 text-center text-ink-2">مفيش مقالات لسه. ارجعلنا قريب.</p>
        ) : (
          <>
            <Reveal>
              <Link href={`/blog/${featured.slug}`} className="group grid overflow-hidden rounded-[1.75rem] bg-white shadow-soft ring-1 ring-ink/5 lg:grid-cols-2">
                <div className="overflow-hidden">
                  <Photo src={featured.cover} alt={featured.title} aspect={16 / 10} priority className="aspect-[16/10] h-full w-full transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="flex flex-col justify-center p-6 sm:p-10">
                  <Meta post={featured} />
                  <h2 className="mt-3 text-2xl font-bold leading-snug sm:text-3xl">{featured.title}</h2>
                  <p className="mt-3 line-clamp-3 leading-relaxed text-ink-2">{featured.excerpt}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-600">اقرا المقال <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /></span>
                </div>
              </Link>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) * 0.06}>
                  <Link href={`/blog/${p.slug}`} className="group block h-full overflow-hidden rounded-[1.5rem] bg-white shadow-soft ring-1 ring-ink/5">
                    <div className="overflow-hidden">
                      <Photo src={p.cover} alt={p.title} aspect={16 / 10} className="aspect-[16/10] w-full transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, 33vw" />
                    </div>
                    <div className="p-5">
                      <Meta post={p} />
                      <h3 className="mt-2 text-lg font-semibold leading-snug">{p.title}</h3>
                      <p className="mt-2 line-clamp-2 text-[15px] text-ink-2">{p.excerpt}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </>
        )}
      </Container>
    </>
  );
}
