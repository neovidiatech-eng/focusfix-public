import { cn } from "@/src/shared/utils/utils";
import { Reveal } from "./Reveal";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-[13px] font-semibold text-brand-600", className)}>
      <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  desc,
  align = "start",
  className,
  action,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  desc?: React.ReactNode;
  align?: "start" | "center";
  className?: string;
  action?: React.ReactNode;
}) {
  return (
    <Reveal
      className={cn(
        "mb-10 flex flex-col gap-4 sm:mb-12",
        align === "center" ? "items-center text-center" : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="mt-3 text-[28px] font-bold leading-[1.3] text-ink sm:text-4xl">{title}</h2>
        {desc && <p className="mt-3 text-base leading-relaxed text-ink-2 sm:text-lg">{desc}</p>}
      </div>
      {action}
    </Reveal>
  );
}

/** Page header used on every inner page */
export function PageHero({
  eyebrow,
  title,
  desc,
  children,
  crumbs,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  desc?: React.ReactNode;
  children?: React.ReactNode;
  crumbs?: Array<{ label: string; href?: string }>;
}) {
  return (
    <section className="grain relative overflow-hidden border-b border-line bg-paper pt-28 pb-12 sm:pt-36 sm:pb-16">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-brand-100/60 blur-3xl" />
      <Container className="relative">
        {crumbs && (
          <nav aria-label="مسار الصفحة" className="mb-5 flex flex-wrap items-center gap-1.5 text-[13px] text-ink-3">
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden>/</span>}
                {c.href ? (
                  <a href={c.href} className="hover:text-ink">
                    {c.label}
                  </a>
                ) : (
                  <span className="text-ink-2">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <Reveal>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          <h1 className="mt-3 max-w-3xl text-[32px] font-bold leading-[1.25] sm:text-5xl sm:leading-[1.2]">{title}</h1>
          {desc && <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-2 sm:text-lg">{desc}</p>}
        </Reveal>
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  );
}
