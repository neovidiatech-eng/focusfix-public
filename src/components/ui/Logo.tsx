import { cn } from "@/src/shared/utils/utils";

/** The FOCUS wordmark (extracted from logo1.jpeg): navy on light surfaces, white on dark */
export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={light ? "/logo-white.png" : "/logo-navy.png"}
      alt="FocusFix"
      width={628}
      height={150}
      className={cn("h-7 w-auto sm:h-8", className)}
    />
  );
}
