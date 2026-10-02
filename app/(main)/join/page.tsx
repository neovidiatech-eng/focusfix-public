import React from "react";
import { Button } from "@/src/shared/components/ui/neon-button";

export const metadata = {
  title: "Join iFix | Focus Fix",
  description: "Join our team of expert mobile technicians.",
};

export default function JoinPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">Join the Focus Fix Team</h1>
        <p className="text-xl text-slate-600 mb-12">
          Are you a skilled mobile technician? We are always looking for talented individuals to join our growing team.
        </p>
        
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-left mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Open Positions</h2>
          
          <div className="border-b border-slate-100 pb-6 mb-6">
            <h3 className="text-xl font-bold text-brand-500 mb-2">Senior iPhone Technician</h3>
            <p className="text-slate-600 mb-4">Cairo & Giza, Full-Time</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
              <li>Minimum 3 years experience repairing iPhones (Screens, Batteries, Back Glass)</li>
              <li>Experience with microsoldering is a plus</li>
              <li>Excellent customer service and communication skills</li>
              <li>Ability to travel to clients within Cairo and Giza</li>
            </ul>
            <a href="mailto:jobs@focus-fix.com" className="inline-block">
              <Button className="bg-brand-100 text-white hover:bg-brand-400">Apply Now via Email</Button>
            </a>
          </div>
        </div>

        <p className="text-slate-500">
          Can't find a position that fits? Send your resume to <a href="mailto:jobs@focus-fix.com" className="text-brand-400 hover:underline">jobs@focus-fix.com</a> and we'll keep you in mind for future openings.
        </p>
      </div>
    </div>
  );
}
