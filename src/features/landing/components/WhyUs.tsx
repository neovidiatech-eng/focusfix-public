"use client";

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { SubtleGrid } from "@/src/shared/components/ui/hero-background";
import {
  ShieldCheck,
  Clock,
  Home,
  Wrench
} from "lucide-react";

export const WhyUs = () => {
  const { t } = useTranslation();

  const features = [
    {
      title: t("whyUs.item1.title"),
      desc: t("whyUs.item1.desc"),
      icon: <Clock className="text-brand-100" size={32} />
    },
    {
      title: t("whyUs.item2.title"),
      desc: t("whyUs.item2.desc"),
      icon: <Home className="text-brand-100" size={32} />
    },
    {
      title: t("whyUs.item3.title"),
      desc: t("whyUs.item3.desc"),
      icon: <ShieldCheck className="text-brand-100" size={32} />
    },
    {
      title: t("whyUs.item4.title"),
      desc: t("whyUs.item4.desc"),
      icon: <Wrench className="text-brand-100" size={32} />
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-slate-50 text-slate-900 overflow-hidden relative">
      <SubtleGrid color="#00000008" className="opacity-100" />
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-brand-100 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand-400 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-brand-100 font-bold mb-4">{t("whyUs.badge")}</h2>
          <h3 className="text-2xl md:text-5xl font-black mb-6 tracking-tight text-slate-900">{t("whyUs.title")}</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-[2.5rem] bg-slate-100 border border-slate-200 shadow-sm hover:shadow-xl transition-all text-center group backdrop-blur-sm"
            >
              <div className="w-16 h-16 bg-brand-100/10 text-brand-100 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold mb-4 text-slate-900">{feature.title}</h4>
              <p className="text-slate-600 leading-relaxed font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8 border-t border-slate-200 pt-20">
          {[
            { label: t("whyUs.stats.screen"), value: "3794" },
            { label: t("whyUs.stats.motherboard"), value: "1845" },
            { label: t("whyUs.stats.battery"), value: "2971" },
            { label: t("whyUs.stats.back"), value: "2182" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-5xl font-black mb-2 text-brand-100">{stat.value}</div>
              <div className="text-slate-600 font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};