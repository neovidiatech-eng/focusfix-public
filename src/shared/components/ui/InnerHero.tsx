"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { SubtleGrid } from "@/src/shared/components/ui/hero-background";

interface InnerHeroProps {
  badge?: string;
  badgeIcon?: React.ReactNode;
  title: string;
  highlightedTitle?: string;
  description: string;
  breadcrumb?: { label: string; href?: string }[];
  children?: React.ReactNode;
}

export const InnerHero: React.FC<InnerHeroProps> = ({
  badge,
  badgeIcon,
  title,
  highlightedTitle,
  description,
  breadcrumb,
  children,
}) => {
  return (
    <section className="relative pt-36 sm:pt-40 pb-12 sm:pb-16 overflow-hidden bg-gradient-to-b from-slate-100/90 via-slate-50 to-slate-50 border-b border-slate-200/60">
      {/* Background Decorative patterns */}
      <SubtleGrid color="#00000006" className="opacity-100" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-100/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Breadcrumb if provided */}
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 mb-6">
            {breadcrumb.map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <ChevronLeft className="w-3.5 h-3.5 rtl:rotate-0" />}
                {item.href ? (
                  <Link href={item.href} className="hover:text-brand-600 transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-slate-800 font-bold">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 shadow-xs text-xs font-bold text-slate-800 mb-5">
            {badgeIcon}
            <span>{badge}</span>
          </div>
        )}

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight sm:leading-tight mb-4">
          {title} {highlightedTitle && <span className="gradient-text">{highlightedTitle}</span>}
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>

        {/* Optional Extra Elements (Buttons, search, tags) */}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
};
