"use client";

import { TopBanner } from "@/components/landing/TopBanner";
import { MegaDropdownNav } from "@/components/landing/MegaDropdownNav";
import { HeroSection } from "@/components/landing/HeroSection";
import { ScriptComparison } from "@/components/landing/ScriptComparison";
import { DeliverablesGrid } from "@/components/landing/DeliverablesGrid";
import { BonusStack } from "@/components/landing/BonusStack";
import { ValueStackTable } from "@/components/landing/ValueStackTable";
import { CaseStudies } from "@/components/landing/CaseStudies";
import { ComparisonCalculator } from "@/components/landing/ComparisonCalculator";
import { SamplePreview } from "@/components/landing/SamplePreview";
import { OrderForm } from "@/components/landing/OrderForm";
import { FAQSection } from "@/components/landing/FAQSection";
import { StickyMobileCTA } from "@/components/landing/StickyMobileCTA";
import { LiveSocialProof } from "@/components/landing/LiveSocialProof";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <>
      <TopBanner />
      <MegaDropdownNav />

      <HeroSection />
      <ScriptComparison />
      <DeliverablesGrid />
      <BonusStack />
      <ValueStackTable />
      <CaseStudies />
      <ComparisonCalculator />
      <SamplePreview />

      {/* Order Form Section */}
      <section id="order">
        <OrderForm />
      </section>

      <FAQSection />
      <Footer />
      <StickyMobileCTA />
      <LiveSocialProof />
    </>
  );
}
