"use client";

import { motion } from "framer-motion";
import { Button } from "@/src/shared/components/ui/neon-button";
import { SubtleGrid } from "@/src/shared/components/ui/hero-background";

import { useTranslation } from "react-i18next";

export const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 overflow-hidden bg-slate-50 relative">
      <SubtleGrid color="#00000008" className="opacity-100" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-xl border border-slate-200 aspect-square">
              <img
                src="https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?q=80&w=1000&auto=format&fit=crop"
                alt="Expert Technician"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-10 -right-10 w-60 h-60 bg-brand-100 rounded-full -z-10 blur-[100px] opacity-10"></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-brand-400 rounded-full -z-10 blur-[100px] opacity-10"></div>

            <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 md:translate-x-[-25%] md:left-0 bg-brand-100 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-2xl border border-white/20 z-20 whitespace-nowrap">              <div className="text-4xl md:text-5xl font-black text-white mb-1 leading-none text-center md:text-start">{t("about.experience")}</div>
              <div className="font-bold text-white text-base md:text-lg text-center md:text-start">{t("about.years")}</div>
              <div className="text-[10px] md:text-sm text-white/80 text-center md:text-start">{t("about.specialty")}</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-amber-600 font-bold mb-4">{t("about.badge")}</h2>
            <h3 className="text-3xl md:text-4xl font-black mb-8 leading-tight text-slate-900 tracking-tight">
              {t("about.title")} <br className="hidden sm:block" />
            </h3>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed font-medium">
              {t("about.description1")}
            </p>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed font-medium">
              {t("about.description2")}
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                variant="solid"
                size="lg"
                className="bg-brand-100 text-white rounded-2xl shadow-lg shadow-brand-100/20"
              >
                {t("about.contactBtn")}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};