import React from "react";

export const metadata = {
  title: "Repair Warranty | Focus Fix",
  description: "360-day warranty terms and conditions for Focus Fix repairs.",
};

export default function WarrantyPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-black text-slate-900 mb-8">Repair Warranty Terms</h1>
        
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200 text-slate-700 space-y-6 leading-relaxed">
          <p className="text-lg font-medium text-slate-900">
            At Focus Fix, we believe in the quality of our spare parts and the expertise of our technicians. That's why we offer a comprehensive warranty to guarantee your peace of mind.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. 360-Day Screen Warranty</h2>
          <p>
            All iPhone screen replacements come with a 360-day warranty covering touch issues and dead pixels. This warranty is voided if the screen is cracked, has deep scratches, or shows signs of liquid damage.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Battery Warranty</h2>
          <p>
            Battery replacements include a 6-month warranty against rapid draining and unexpected shutdowns. Please note that normal battery degradation over time is not covered.
          </p>

          <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. What is NOT Covered?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Physical damage after the repair (drops, cracks).</li>
            <li>Liquid damage of any kind.</li>
            <li>Repairs or modifications performed by third parties.</li>
            <li>Software issues unrelated to the hardware repair.</li>
          </ul>

          <div className="mt-12 p-6 bg-brand-50 rounded-2xl border border-brand-100/20">
            <h3 className="text-lg font-bold text-brand-500 mb-2">Need to claim your warranty?</h3>
            <p className="text-brand-900/80">
              Contact our support team via WhatsApp at <span className="font-bold">01009911934</span> with your repair receipt and a description of the issue. We'll send a technician to inspect and fix the covered issue at no extra cost.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
