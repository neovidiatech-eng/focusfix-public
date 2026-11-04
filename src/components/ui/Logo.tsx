import { cn } from "@/src/shared/utils/utils";

export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)} dir="ltr">
      <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-white shadow-[0_6px_16px_-6px_rgb(43_75_242/0.7)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M7 4h10M7 4v16M7 12h7" />
          <circle cx="17.5" cy="17.5" r="2" fill="currentColor" stroke="none" />
        </svg>
      </span>
      <span className={cn("font-display text-[19px] font-bold tracking-tight", light ? "text-white" : "text-ink")}>
        Focus<span className="text-brand-500">Fix</span>
      </span>
    </span>
  );
}
