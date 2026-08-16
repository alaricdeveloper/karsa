"use client";

import { useState } from "react";
import { TopBanner } from "@/components/landing/TopBanner";
import { MegaDropdownNav } from "@/components/landing/MegaDropdownNav";
import { HeroSection } from "@/components/landing/HeroSection";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { DeliverablesGrid } from "@/components/landing/DeliverablesGrid";
import { BonusStack } from "@/components/landing/BonusStack";
import { ValueStackTable } from "@/components/landing/ValueStackTable";
import { SamplePreview } from "@/components/landing/SamplePreview";
import { CaseStudies } from "@/components/landing/CaseStudies";
import { ComparisonCalculator } from "@/components/landing/ComparisonCalculator";
import { OrderForm } from "@/components/landing/OrderForm";
import { CheckoutModal } from "@/components/landing/CheckoutModal";
import { FAQSection } from "@/components/landing/FAQSection";
import { StickyMobileCTA } from "@/components/landing/StickyMobileCTA";
import { Footer } from "@/components/landing/Footer";

export default function LandingPage() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [order, setOrder] = useState<{
    orderId: string;
    brand: string;
    category: string;
    competitor: string;
    description: string;
    email: string;
    phone: string;
  } | null>(null);

  const handleOrderCreated = (newOrder: typeof order) => {
    setOrder(newOrder);
    setCheckoutOpen(true);
  };

  return (
    <>
      <TopBanner />
      <MegaDropdownNav />

      <HeroSection />
      <ProblemSection />
      <DeliverablesGrid />
      <BonusStack />
      <ValueStackTable />
      <SamplePreview />
      <CaseStudies />
      <ComparisonCalculator />

      {/* Order Form Section */}
      <section id="order" className="py-14 sm:py-20 bg-sand-100/60 border-b border-sand-200">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-stone-500">Mulai Pengerjaan</span>
            <h2 className="text-2xl sm:text-3xl font-serif text-sand-900 mt-1">Formulir Brief Bisnis</h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-1 sm:mt-2">Detail di bawah digunakan sebagai parameter penulisan seluruh kalender konten Anda.</p>
          </div>
          <OrderForm onOrderCreated={handleOrderCreated} />
        </div>
      </section>

      <FAQSection />
      <Footer />
      <StickyMobileCTA />

      <CheckoutModal
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        order={order}
      />
    </>
  );
}
