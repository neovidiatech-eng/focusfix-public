import Link from "next/link";
import { cn } from "@/src/shared/utils/utils";

type Variant = "primary" | "dark" | "outline" | "ghost" | "whatsapp" | "light";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-brand-500 text-white hover:bg-brand-600 shadow-[0_8px_20px_-8px_rgb(43_75_242/0.6)]",
  dark: "bg-ink text-white hover:bg-ink/90",
  outline: "border border-ink/15 bg-white text-ink hover:border-ink/30 hover:bg-white",
  ghost: "text-ink hover:bg-ink/5",
  whatsapp: "bg-[#1fa855] text-white hover:bg-[#178a45]",
  light: "bg-white text-ink hover:bg-white/90",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-14 px-7 text-base",
};

export function buttonClass(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

export function ButtonLink({ href, variant, size, className, children, external, ...rest }: CommonProps & { href: string; external?: boolean } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  if (external || href.startsWith("http") || href.startsWith("tel:")) {
    return (
      <a href={href} className={buttonClass(variant, size, className)} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </Link>
  );
}

export function Button({ variant, size, className, children, ...rest }: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClass(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
