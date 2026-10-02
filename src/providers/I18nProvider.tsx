"use client";

import { useEffect } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "@/src/locales/en.json";
import arTranslations from "@/src/locales/ar.json";

// Initialize i18n WITHOUT browser language detector (safe for SSR)
// The detector accesses `document` which doesn't exist on the server
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: enTranslations },
      ar: { translation: arTranslations },
    },
    fallbackLng: "ar",
    lng: "ar", // default for SSR
    interpolation: { escapeValue: false },
  });
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Client-only: detect language from localStorage
    const savedLang =
      (typeof window !== "undefined" && localStorage.getItem("i18nextLng")) ||
      "ar";

    if (i18n.language !== savedLang) {
      i18n.changeLanguage(savedLang);
    }

    // Apply direction immediately
    const lang = i18n.language || "ar";
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;

    // Listen for language switches
    const handleLangChange = (lng: string) => {
      document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = lng;
      localStorage.setItem("i18nextLng", lng);
    };

    i18n.on("languageChanged", handleLangChange);
    return () => {
      i18n.off("languageChanged", handleLangChange);
    };
  }, []);

  return <>{children}</>;
}
