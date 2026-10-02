"use client";

import { Smartphone, Battery, Camera, Cpu, ShieldCheck, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { SubtleGrid } from "@/src/shared/components/ui/hero-background";
import { useTranslation } from "react-i18next";

export const CommonProblems = () => {
  const { t } = useTranslation();

  const categories = [
    {
      title: t("problems.screen.title"),
      icon: <Smartphone size={24} />,
      items: Array.isArray(t("problems.screen.items", { returnObjects: true })) ? t("problems.screen.items", { returnObjects: true }) as string[] : []
    },
    {
      title: t("problems.battery.title"),
      icon: <Battery size={24} />,
      items: Array.isArray(t("problems.battery.items", { returnObjects: true })) ? t("problems.battery.items", { returnObjects: true }) as string[] : []
    },
    {
      title: t("problems.back.title"),
      icon: <ShieldCheck size={24} />,
      items: Array.isArray(t("problems.back.items", { returnObjects: true })) ? t("problems.back.items", { returnObjects: true }) as string[] : []
    },
    {
      title: t("problems.camera.title"),
      icon: <Camera size={24} />,
      items: Array.isArray(t("problems.camera.items", { returnObjects: true })) ? t("problems.camera.items", { returnObjects: true }) as string[] : []
    },
    {
      title: t("problems.motherboard.title"),
      icon: <Cpu size={24} />,
      items: Array.isArray(t("problems.motherboard.items", { returnObjects: true })) ? t("problems.motherboard.items", { returnObjects: true }) as string[] : [],
      className: "lg:col-span-2"
    }
  ];

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <SubtleGrid color="#00000008" className="opacity-100 mask-[linear-gradient(to_bottom,white,transparent)]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-brand-100 font-bold mb-4">{t("problems.badge")}</h2>
          <h3 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight whitespace-pre-wrap">{t("problems.title")}</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-8 rounded-[2.5rem] bg-slate-100 border border-slate-200 shadow-xl shadow-slate-200/20 hover:border-brand-100/30 transition-all group ${cat.className || ""}`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-brand-100/10 text-brand-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900">{cat.title}</h4>
              </div>
              <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                {cat.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600 font-medium">
                    <CheckCircle2 size={18} className="text-brand-100 mt-1 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
