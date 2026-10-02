"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Battery,
  Camera,
  Cpu,
  ShieldCheck,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/src/shared/components/ui/neon-button";
import { SubtleGrid } from "@/src/shared/components/ui/hero-background";

import { useTranslation } from "react-i18next";

export const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t("services.screen.title"),
      desc: t("services.screen.desc"),
      icon: <Smartphone className="text-brand-100" size={32} />,
      color: "bg-brand-100/10",
      className: "md:col-span-2 md:row-span-1"
    },
    {
      title: t("services.battery.title"),
      desc: t("services.battery.desc"),
      icon: <Battery className="text-brand-100" size={32} />,
      color: "bg-brand-100/10",
      className: "md:col-span-1 md:row-span-1"
    },
    {
      title: t("services.back.title"),
      desc: t("services.back.desc"),
      icon: <ShieldCheck className="text-brand-100" size={32} />,
      color: "bg-brand-100/10",
      className: "md:col-span-1 md:row-span-1"
    },
    {
      title: t("services.camera.title"),
      desc: t("services.camera.desc"),
      icon: <Camera className="text-brand-100" size={32} />,
      color: "bg-brand-100/10",
      className: "md:col-span-1 md:row-span-1"
    },
    {
      title: t("services.motherboard.title"),
      desc: t("services.motherboard.desc"),
      icon: <Cpu className="text-brand-100" size={32} />,
      color: "bg-brand-100/10",
      className: "md:col-span-1 md:row-span-1"
    }
  ];

  return (
    <section id="services" className="py-24 bg-slate-50 relative overflow-hidden">
      <SubtleGrid color="#00000008" className="opacity-100" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-brand-100 font-bold mb-4">{t("services.badge")}</h2>
          <h3 className="text-2xl md:text-5xl font-black mb-6 text-slate-900 tracking-tight">{t("services.title")}</h3>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium">{t("services.description")}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`p-8 rounded-[2.5rem] border border-slate-200 shadow-sm hover:border-brand-100/30 hover:shadow-xl hover:shadow-brand-100/5 transition-all bg-slate-100 group text-start ${service.className}`}
            >
              <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h4 className="text-2xl font-bold mb-4 text-slate-900">{service.title}</h4>
              <p className="text-slate-600 mb-6 leading-relaxed font-medium">{service.desc}</p>
              <div className="flex justify-start">
                <a href="https://wa.me/201009911934">
                  <Button
                    variant="ghost"
                    className="text-brand-100 font-bold flex items-center gap-2 group-hover:gap-4 transition-all p-0 border-none hover:bg-transparent"
                  >
                    <span>{t("services.orderNow")}</span>
                    <ChevronLeft size={18} className="rtl:rotate-0 rotate-180" />
                  </Button>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};