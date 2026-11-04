"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ShieldCheck, Sparkles, Wallet, Star } from "lucide-react";
import { ButtonLink } from "@/src/components/ui/Button";
import { Container } from "@/src/components/ui/Section";
import { Photo } from "@/src/components/ui/Photo";
import { PHOTOS } from "@/src/lib/images";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ priceHint }: { priceHint?: { label: string; price: string } }) {
  const reduce = useReducedMotion();

  return (
    <section className="grain relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24">
      <div className="pointer-events-none absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full bg-brand-100/70 blur-3xl" />
      <div className="pointer-events-none absolute top-40 -right-40 h-[22rem] w-[22rem] rounded-full bg-accent-100/60 blur-3xl" />

      <Container className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div>
          <div style={{ animationDelay: "0s" }} className="rise inline-flex items-center gap-2 rounded-full border border-line bg-white/70 px-3 py-1.5 text-[13px] font-medium text-ink-2 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#12a150] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#12a150]" />
            </span>
            فنيين متاحين النهارده في القاهرة والجيزة
          </div>

          <h1 style={{ animationDelay: "0.08s" }} className="rise mt-6 text-[40px] font-bold leading-[1.15] text-ink sm:text-6xl sm:leading-[1.1]">
            آيفونك يتصلح
            <br />
            <span className="relative inline-block text-brand-500">
              قدام عينك
              <svg viewBox="0 0 300 20" className="absolute -bottom-2 right-0 h-3 w-full text-accent-500" preserveAspectRatio="none" aria-hidden>
                <motion.path
                  d="M3 14 C 80 4, 200 4, 297 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 0.6, ease }}
                />
              </svg>
            </span>
            ، وانت في بيتك.
          </h1>

          <p style={{ animationDelay: "0.16s" }} className="rise mt-6 max-w-xl text-lg leading-relaxed text-ink-2">
            فني FocusFix بيوصلك في الميعاد اللي تختاره، ويغيّر الشاشة أو البطارية في حوالي 30 دقيقة بقطع أصلية وضمان مكتوب.
            وبتدفع بعد ما تجرب جهازك.
          </p>

          <div style={{ animationDelay: "0.24s" }} className="rise mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/book" size="lg">
              احجز فني دلوقتي <ArrowLeft className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="#price-check" variant="outline" size="lg">
              اعرف السعر الأول
            </ButtonLink>
          </div>

          <ul style={{ animationDelay: "0.32s" }} className="rise mt-10 grid max-w-lg grid-cols-3 gap-4 text-sm text-ink-2">
            {[
              { icon: Sparkles, t: "قطع أصلية" },
              { icon: ShieldCheck, t: "ضمان مكتوب" },
              { icon: Wallet, t: "ادفع بعد التجربة" },
            ].map(({ icon: Icon, t }) => (
              <li key={t} className="flex items-center gap-2">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white text-brand-500 shadow-soft">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="font-medium leading-tight">{t}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div style={{ animationDelay: "0s" }} className="rise relative overflow-hidden rounded-[2rem] shadow-lift">
            <Photo src={PHOTOS.heroRepair} alt="فني بيصلح آيفون بقطع أصلية" priority aspect={4 / 5} className="aspect-[4/5] w-full" sizes="(max-width: 1024px) 90vw, 45vw" />
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/40 to-transparent" />
          </div>

          {/* Floating status card */}
          <div style={{ animationDelay: "0.5s" }} className="rise absolute right-2 top-6 sm:-right-8 sm:top-8">
            <div className="animate-float-slow flex items-center gap-3 rounded-2xl bg-white/95 p-3 pe-5 shadow-lift ring-1 ring-ink/5 backdrop-blur">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#e7f6ee]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#12a150] animate-pulse-ring" />
              </span>
              <div>
                <p className="text-[13px] font-semibold text-ink">الفني في الطريق</p>
                <p className="text-xs text-ink-3">هيوصلك خلال 25 دقيقة</p>
              </div>
            </div>
          </div>

          {priceHint && (
            <div style={{ animationDelay: "0.7s" }} className="rise absolute left-2 bottom-20 sm:-left-8 sm:bottom-24">
              <div className="animate-float-slow rounded-2xl bg-white/95 p-4 shadow-lift ring-1 ring-ink/5 backdrop-blur [animation-delay:1.2s]">
                <p className="text-xs text-ink-3">{priceHint.label}</p>
                <p className="num mt-1 font-display text-xl font-bold text-ink">{priceHint.price}</p>
              </div>
            </div>
          )}

          <div style={{ animationDelay: "0.9s" }} className="rise absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-ink/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
            <Star className="h-3.5 w-3.5 fill-accent-500 text-accent-500" />
            الإصلاح بيتم قدامك، من غير ما جهازك يغيب عنك
          </div>
        </div>
      </Container>
    </section>
  );
}
