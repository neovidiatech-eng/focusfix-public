"use client";

import React from "react";
import { Navbar } from "@/src/features/landing/components/NavBar";
import { Footer } from "@/src/features/landing/components/Footer";
import { FloatingWhatsApp } from "@/src/features/landing/components/FloatingWhatsApp";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="font-sans antialiased bg-slate-50 text-slate-900 no-scrollbar relative">
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
