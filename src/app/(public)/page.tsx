import type { Metadata } from "next";
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
import { FAQ_ITEMS } from "@/components/landing/landing-data";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://usekarsa.com/",
    title:
      "Jasa Konten Video UMKM 30 Hari — 30 Script + 4 Artikel SEO | Karsa Studio",
    description:
      "30 video scripts kata-per-kata untuk TikTok/Reels/Shorts, 30 caption AIDA, 4 artikel SEO, dan Notion OS dalam 24 jam kerja. Mulai Rp299.000.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Karsa Studio — Jasa Konten Video UMKM 30 Hari",
      },
    ],
  },
};

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Batch Konten 30 Hari Karsa Studio",
  description:
    "Inventaris konten 30 hari untuk UMKM: 30 video scripts kata-per-kata, 30 caption AIDA, 4 artikel SEO, audit kompetitor, Notion Content OS, dan panduan B-Roll — dikirim dalam 1x24 jam kerja.",
  brand: { "@type": "Brand", name: "Karsa Studio" },
  image: "https://usekarsa.com/og-image.png",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "40",
    bestRating: "5",
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "IDR",
    lowPrice: "299000",
    highPrice: "1490000",
    offerCount: "3",
    availability: "https://schema.org/InStock",
    offers: [
      {
        "@type": "Offer",
        name: "1 Batch — 30 hari konten",
        price: "299000",
        priceCurrency: "IDR",
      },
      {
        "@type": "Offer",
        name: "3 Batch — 90 hari konten",
        price: "799000",
        priceCurrency: "IDR",
      },
      {
        "@type": "Offer",
        name: "6 Batch — 180 hari konten",
        price: "1490000",
        priceCurrency: "IDR",
      },
    ],
  },
};

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Jasa Konten Video UMKM & Script Video",
  serviceType: "Content Marketing",
  description:
    "Jasa pembuatan kalender konten 30 hari untuk UMKM: 30 video scripts kata-per-kata untuk TikTok, Reels, dan Shorts, 30 caption AIDA, 4 artikel SEO, dan Notion Content OS.",
  provider: {
    "@type": "Organization",
    name: "Karsa Studio",
    url: "https://usekarsa.com",
  },
  areaServed: { "@type": "Country", name: "Indonesia" },
  availableLanguage: "id",
  providerMobility: "dynamic",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Paket Batch Konten",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Batch Konten 30 Hari",
        },
        price: "299000",
        priceCurrency: "IDR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Batch Konten 90 Hari (3 Batch)",
        },
        price: "799000",
        priceCurrency: "IDR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Batch Konten 180 Hari (6 Batch)",
        },
        price: "1490000",
        priceCurrency: "IDR",
      },
    ],
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: "+6281288009920",
    availableLanguage: "id",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function LandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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