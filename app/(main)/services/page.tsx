import React from "react";
import { Services } from "@/src/features/landing/components/Services";
import { CommonProblems } from "@/src/features/landing/components/CommonProblems";
import { Process } from "@/src/features/landing/components/Process";

export const metadata = {
  title: "Services | Focus Fix",
  description: "Comprehensive iPhone and iPad repair services by Focus Fix.",
};

export default function ServicesPage() {
  return (
    <div className="pt-24 pb-12">
      <Services />
      <CommonProblems />
      <Process />
    </div>
  );
}
