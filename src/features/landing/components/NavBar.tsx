"use client";

import React, { useState, useEffect } from "react";
import { Phone, Globe } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/src/shared/components/ui/neon-button";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TopAnnouncementBar } from "./TopAnnouncementBar";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "ar" ? "en" : "ar";
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();

  const navLinks = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.services"), href: "/services" },
    { name: t("nav.prices", "Prices"), href: "/prices" },
    { name: t("nav.areas", "المناطق"), href: "/areas" },
    { name: t("nav.blog", "المدونة"), href: "/blog" },
    { name: t("nav.track", "تتبع حجزك"), href: "/track" },
    { name: t("nav.book", "احجز صيانة"), href: "/book" },
    { name: t("nav.warranty", "Warranty"), href: "/warranty" },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <TopAnnouncementBar />
      <nav className={`${isScrolled || isMenuOpen ? "glass py-3 shadow-sm" : "bg-transparent py-4 md:py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src="/logo1.jpeg" alt="Focus Repair Logo" className="w-30 h-12 object-cover  rounded-xl" />
        </div>
        <div className="hidden lg:flex items-center gap-8 font-medium text-slate-600">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-brand-100 transition-colors ${pathname === link.href ? "text-brand-100 font-bold" : ""}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 relative z-50">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            className="flex items-center gap-2 text-slate-600 hover:text-brand-100 font-bold"
          >
            <Globe size={18} />
            <span>{i18n.language === "ar" ? "English" : "عربي"}</span>
          </Button>
          <a href="tel:01009911934" className="hidden sm:block">
            <Button
              variant="solid"
              size="sm"
              className="bg-brand-100 text-white hover:bg-brand-400 flex items-center gap-2"
            >
              <Phone size={16} />
              <span>01009911934</span>
            </Button>
          </a>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden relative w-10 h-10 flex items-center justify-center text-slate-900 border-none hover:bg-black/5"
          >
            <div className="relative w-6 h-5">
              <span 
                className={`absolute left-0 block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "top-2 rotate-45" : "top-0"}`}
              ></span>
              <span 
                className={`absolute left-0 block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "opacity-0" : "top-2"}`}
              ></span>
              <span 
                className={`absolute left-0 block w-6 h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "top-2 -rotate-45" : "top-4"}`}
              ></span>
            </div>
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass border-t border-slate-200 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-lg font-medium hover:text-brand-100 transition-colors ${pathname === link.href ? "text-brand-100 font-bold" : ""}`}
                  >
                    {link.name}
                  </Link>
              ))}
              <a href="tel:01009911934" className="block sm:hidden">
                <Button
                  variant="solid"
                  className="w-full bg-brand-100 text-white flex items-center justify-center gap-2"
                >
                  <Phone size={16} />
                  <span>{t("nav.callNow")}</span>
                </Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  </div>
  );
};