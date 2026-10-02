"use client";

import React from "react";
import { Navbar } from "@/src/features/landing/components/NavBar";
import { Services } from "@/src/features/landing/components/Services";
import { Hero } from "@/src/features/landing/components/Hero";
import { Process } from "@/src/features/landing/components/Process";
import { About } from "@/src/features/landing/components/About";
import { WhyUs } from "@/src/features/landing/components/WhyUs";
import { CommonProblems } from "@/src/features/landing/components/CommonProblems";
import { Slider } from "@/src/features/landing/components/Slider";
import { Contact } from "@/src/features/landing/components/Contact";
export default function ClientPage() {
  return (
    <>
      <Hero />
      <Services />
      <Process />
      <About />
      <WhyUs />
      <CommonProblems />
      <Slider />
      <Contact />
    </>
  );
}
