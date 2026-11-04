import { photo } from "@/src/lib/images";
import { cn } from "@/src/shared/utils/utils";

/** Responsive photo (Unsplash id or /public path) with a soft placeholder colour */
export function Photo({
  src,
  alt,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority,
  aspect,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  aspect?: number;
}) {
  const remote = !src.startsWith("/");
  const widths = [480, 800, 1200, 1600];
  const h = (w: number) => (aspect ? Math.round(w / aspect) : undefined);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={photo(src, 1200, h(1200))}
      srcSet={remote ? widths.map((w) => `${photo(src, w, h(w))} ${w}w`).join(", ") : undefined}
      sizes={remote ? sizes : undefined}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={cn("bg-paper-2 object-cover", className)}
    />
  );
}
