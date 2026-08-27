import { TopBanner } from "@/components/landing/TopBanner";
import { NavHeader } from "@/components/landing/NavHeader";
import { HeroSection } from "@/components/landing/HeroSection";
import { MarqueeStrip } from "@/components/landing/MarqueeStrip";
import { StatsBand } from "@/components/landing/StatsBand";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { KenapaVideoSection } from "@/components/landing/KenapaVideoSection";
import { ScriptComparison } from "@/components/landing/ScriptComparison";
import { AnatomySection } from "@/components/landing/AnatomySection";
import { DeliverablesGrid } from "@/components/landing/DeliverablesGrid";
import { PillarSection } from "@/components/landing/PillarSection";
import { DailyMapSection } from "@/components/landing/DailyMapSection";
import { ProductionTemplate } from "@/components/landing/ProductionTemplate";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { ToolsSection } from "@/components/landing/ToolsSection";
import { QualityStandardSection } from "@/components/landing/QualityStandardSection";
import { ComparisonSection } from "@/components/landing/ComparisonSection";
import { CaseStudiesSection } from "@/components/landing/CaseStudiesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { BonusStackSection } from "@/components/landing/BonusStackSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { ValueStackSection } from "@/components/landing/ValueStackSection";
import { GuaranteesSection } from "@/components/landing/GuaranteesSection";
import { FitSection } from "@/components/landing/FitSection";
import { OutcomesSection } from "@/components/landing/OutcomesSection";
import { ScopeSection } from "@/components/landing/ScopeSection";
import { RegionalSection } from "@/components/landing/RegionalSection";
import { SavingsCalculator } from "@/components/landing/SavingsCalculator";
import { ContentSchool } from "@/components/landing/ContentSchool";
import { SamplePreview } from "@/components/landing/SamplePreview";
import { OrderFormSection } from "@/components/landing/OrderFormSection";
import { FaqSection } from "@/components/landing/FaqSection";
import { ContactStrip } from "@/components/landing/ContactStrip";
import { FinalCtaSection } from "@/components/landing/FinalCtaSection";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { StickyCta } from "@/components/landing/StickyCta";
import { SocialProofToast } from "@/components/landing/SocialProofToast";

export default function LandingPage() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-3 focus:bg-wasabi focus:text-ink focus:font-mono focus:text-xs focus:font-bold focus:rounded-xl focus:border-2 focus:border-ink"
      >
        Lewati ke konten utama
      </a>
      <TopBanner />
      <NavHeader />

      <main id="main-content">
        <HeroSection />
        <MarqueeStrip />
        <StatsBand />
        <ProblemSection />
        <KenapaVideoSection />
        <ScriptComparison />
        <AnatomySection />
        <DeliverablesGrid />
        <PillarSection />
        <DailyMapSection />
        <ProductionTemplate />
        <HowItWorksSection />
        <ToolsSection />
        <QualityStandardSection />
        <ComparisonSection />
        <CaseStudiesSection />
        <TestimonialsSection />
        <BonusStackSection />
        <PricingSection />
        <ValueStackSection />
        <GuaranteesSection />
        <FitSection />
        <OutcomesSection />
        <ScopeSection />
        <RegionalSection />
        <SavingsCalculator />
        <ContentSchool />
        <SamplePreview />
        <OrderFormSection />
        <FaqSection />
        <ContactStrip />
        <FinalCtaSection />
      </main>
      <LandingFooter />
      <StickyCta />
      <SocialProofToast />
    </>
  );
}