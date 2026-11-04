import { cn } from "@/src/shared/utils/utils";

type Kind = "phone" | "tablet" | "watch";

export function kindOf(typeSlug?: string): Kind {
  if (typeSlug?.includes("watch")) return "watch";
  if (typeSlug?.includes("ipad") || typeSlug?.includes("tablet")) return "tablet";
  return "phone";
}

/** Clean line drawing used until the dashboard has a photo for this device */
function Silhouette({ kind }: { kind: Kind }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (kind === "watch")
    return (
      <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
        <path {...common} d="M24 6h16l2 10H22zM24 58h16l2-10H22z" opacity=".45" />
        <rect {...common} x="17" y="15" width="30" height="34" rx="9" />
        <rect x="21" y="19" width="22" height="26" rx="6" fill="currentColor" opacity=".08" />
        <path {...common} d="M47 26h3v6h-3" />
      </svg>
    );
  if (kind === "tablet")
    return (
      <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
        <rect {...common} x="12" y="6" width="40" height="52" rx="5" />
        <rect x="16" y="10" width="32" height="44" rx="2" fill="currentColor" opacity=".08" />
        <circle cx="32" cy="8" r=".9" fill="currentColor" />
      </svg>
    );
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
      <rect {...common} x="18" y="4" width="28" height="56" rx="7" />
      <rect x="21" y="7" width="22" height="50" rx="5" fill="currentColor" opacity=".08" />
      <rect x="27" y="9" width="10" height="3" rx="1.5" fill="currentColor" opacity=".7" />
    </svg>
  );
}

/** Device photo from the dashboard, or a silhouette fallback */
export function DeviceImage({ src, alt, kind = "phone", className }: { src?: string | null; alt: string; kind?: Kind; className?: string }) {
  return (
    <span className={cn("grid place-items-center overflow-hidden", className)}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      ) : (
        <span className="h-[78%] w-[78%] text-brand-500/70">
          <Silhouette kind={kind} />
        </span>
      )}
    </span>
  );
}
