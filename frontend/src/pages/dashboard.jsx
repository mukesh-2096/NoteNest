import React from "react";
import Header from "../components/dashboardComponents/Header";
import Hero from "../components/dashboardComponents/Hero";
import Features from "../components/dashboardComponents/Features";
import CTA from "../components/dashboardComponents/CTA";

export default function Dashboard() {
  return (
    <>
      <div
        className="min-h-screen relative bg-[#0F172A] text-white overflow-hidden"
        style={{
          backgroundImage: `
    radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
    linear-gradient(135deg, rgba(59,130,246,0.12), rgba(14,165,233,0.08))
  `,
          backgroundSize: "20px 20px, 100% 100%",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Header />
          <Hero />
          <Features />
          <CTA />
        </div>
      </div>
    </>
  );
}
