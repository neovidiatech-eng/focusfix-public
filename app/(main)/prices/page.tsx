import React from "react";
import { Button } from "@/src/shared/components/ui/neon-button";
import Link from "next/link";

export const metadata = {
  title: "Prices | Focus Fix",
  description: "Transparent pricing for all iPhone repair services.",
};

export default function PricesPage() {
  const models = [
    { name: "iPhone 15 Pro Max", screen: "EGP 12,500", battery: "EGP 3,000", back: "EGP 4,500" },
    { name: "iPhone 15 Pro", screen: "EGP 11,000", battery: "EGP 2,800", back: "EGP 4,000" },
    { name: "iPhone 14 Pro Max", screen: "EGP 10,500", battery: "EGP 2,500", back: "EGP 3,500" },
    { name: "iPhone 14 Pro", screen: "EGP 9,500", battery: "EGP 2,300", back: "EGP 3,000" },
    { name: "iPhone 13 Pro Max", screen: "EGP 8,000", battery: "EGP 1,800", back: "EGP 2,500" },
    { name: "iPhone 13 Pro", screen: "EGP 7,500", battery: "EGP 1,700", back: "EGP 2,200" },
    { name: "iPhone 12 Pro Max", screen: "EGP 6,500", battery: "EGP 1,500", back: "EGP 2,000" },
    { name: "iPhone 11", screen: "EGP 3,500", battery: "EGP 1,200", back: "EGP 1,500" },
  ];

  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Transparent Pricing</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            High quality repairs at competitive prices. All repairs include installation at your location and a real warranty.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700">
                  <th className="p-4 font-bold border-b border-slate-200">Device Model</th>
                  <th className="p-4 font-bold border-b border-slate-200">Screen Repair</th>
                  <th className="p-4 font-bold border-b border-slate-200">Battery Replacement</th>
                  <th className="p-4 font-bold border-b border-slate-200">Back Glass</th>
                </tr>
              </thead>
              <tbody>
                {models.map((model, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-medium text-slate-900">{model.name}</td>
                    <td className="p-4 text-slate-600">{model.screen}</td>
                    <td className="p-4 text-slate-600">{model.battery}</td>
                    <td className="p-4 text-slate-600">{model.back}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="text-center bg-brand-50 rounded-3xl p-8 border border-brand-100/20">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Don't see your device?</h3>
          <p className="text-slate-600 mb-8">
            Contact us for a custom quote for iPads, older iPhone models, or motherboard repairs.
          </p>
          <Link href="/book">
            <Button size="lg" className="bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-200">
              Request a Quote
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
