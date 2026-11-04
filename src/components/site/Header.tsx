"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, Phone, ArrowLeft } from "lucide-react";
import { Logo } from "@/src/components/ui/Logo";
import { ButtonLink } from "@/src/components/ui/Button";
import { useSiteSettings } from "@/src/providers/SiteSettingsProvider";
import { displayPhone, telHref } from "@/src/shared/utils/settings";
import { cn } from "@/src/shared/utils/utils";
import { NAV_LINKS } from "./nav";

export function Header({ hasBanner }: { hasBanner: boolean }) {
  const pathname = usePathname();
  const settings = useSiteSettings();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 z-50 transition-all duration-300",
          hasBanner && !scrolled ? "top-9" : "top-0",
        )}
      >
        <div className={cn("mx-auto max-w-6xl px-3 sm:px-6 transition-all duration-300", scrolled ? "pt-2" : "pt-3 sm:pt-4")}>
          <div
            className={cn(
              "flex h-14 items-center justify-between rounded-full ps-3 pe-2 transition-all duration-300 sm:h-16 sm:ps-5",
              scrolled || open ? "bg-white/85 shadow-soft backdrop-blur-xl ring-1 ring-ink/5" : "bg-transparent",
            )}
          >
            <Link href="/" aria-label="FocusFix — الرئيسية" className="shrink-0">
              <Logo />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="القائمة الرئيسية">
              {NAV_LINKS.filter((l) => l.href !== "/contact").map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "rounded-full px-3.5 py-2 text-[15px] font-medium transition-colors",
                    isActive(l.href) ? "bg-ink/[0.06] text-ink" : "text-ink-2 hover:text-ink",
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1.5">
              <a
                href={telHref(settings.phone)}
                className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink-2 hover:text-ink md:flex"
              >
                <Phone className="h-4 w-4" />
                <span className="num" dir="ltr">{displayPhone(settings.phone)}</span>
              </a>
              <ButtonLink href="/book" size="sm" className="hidden h-10 px-5 sm:inline-flex">
                احجز فني
                <ArrowLeft className="h-4 w-4" />
              </ButtonLink>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                className="grid h-11 w-11 place-items-center rounded-full text-ink hover:bg-ink/5 lg:hidden"
                aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
                aria-expanded={open}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 bg-paper lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex h-full flex-col px-6 pt-28 pb-8" aria-label="قائمة الموبايل">
              <ul className="space-y-1">
                {[{ href: "/", label: "الرئيسية" }, ...NAV_LINKS].map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.3 }}
                  >
                    <Link
                      href={l.href}
                      className={cn(
                        "flex items-center justify-between border-b border-line py-4 font-display text-2xl font-semibold",
                        isActive(l.href) && l.href !== "/" ? "text-brand-600" : "text-ink",
                      )}
                    >
                      {l.label}
                      <ArrowLeft className="h-5 w-5 text-ink-3" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto grid gap-3">
                <ButtonLink href="/book" size="lg">احجز فني دلوقتي</ButtonLink>
                <ButtonLink href={telHref(settings.phone)} variant="outline" size="lg">
                  <Phone className="h-4 w-4" />
                  <span className="num" dir="ltr">{displayPhone(settings.phone)}</span>
                </ButtonLink>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
