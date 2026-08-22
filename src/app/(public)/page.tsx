"use client";

import { TopBanner } from "@/components/landing/TopBanner";
import { MegaDropdownNav } from "@/components/landing/MegaDropdownNav";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { ScriptComparison } from "@/components/landing/ScriptComparison";
import { DeliverablesGrid } from "@/components/landing/DeliverablesGrid";
import { ContentMap } from "@/components/landing/ContentMap";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { QualityStandardSection } from "@/components/landing/QualityStandardSection";
import { BonusStack } from "@/components/landing/BonusStack";
import { ValueStackTable } from "@/components/landing/ValueStackTable";
import { CaseStudies } from "@/components/landing/CaseStudies";
import { AudienceFitSection } from "@/components/landing/AudienceFitSection";
import { ScopeSection } from "@/components/landing/ScopeSection";
import { ComparisonCalculator } from "@/components/landing/ComparisonCalculator";
import { SamplePreview } from "@/components/landing/SamplePreview";
import { OrderForm } from "@/components/landing/OrderForm";
import { FAQSection } from "@/components/landing/FAQSection";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { StickyMobileCTA } from "@/components/landing/StickyMobileCTA";
import { LiveSocialProof } from "@/components/landing/LiveSocialProof";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-3 focus:bg-wasabi focus:text-ink focus:font-mono focus:text-xs focus:font-bold focus:rounded-xl focus:border-2 focus:border-ink"
      >
        Lewati ke konten utama
      </a>
      <TopBanner />
      <MegaDropdownNav />

      <main id="main-content">
        <HeroSection />
        <ProblemSection />
        <ScriptComparison />
        <DeliverablesGrid />
        <ContentMap />
        <HowItWorksSection />
        <QualityStandardSection />
        <CaseStudies />
        <BonusStack />
        <ValueStackTable />
        <AudienceFitSection />
        <ScopeSection />
        <ComparisonCalculator />
        <SamplePreview />
        <OrderForm />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
      <LiveSocialProof />
    </>
  );
}
