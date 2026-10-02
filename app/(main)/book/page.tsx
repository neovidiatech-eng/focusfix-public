import React from "react";
import { Contact } from "@/src/features/landing/components/Contact";

export const metadata = {
  title: "Book an iFixer | Focus Fix",
  description: "Book an expert technician to repair your iPhone or iPad.",
};

export default function BookPage() {
  return (
    <div className="pt-24 pb-12 min-h-screen bg-slate-50 flex flex-col justify-center">
      <div className="max-w-3xl mx-auto px-6 text-center mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-4">Book an iFixer</h1>
        <p className="text-slate-600 text-lg">
          Fill out the form below and our technician will be at your location in less than 30 minutes!
        </p>
      </div>
      <Contact />
    </div>
  );
}
