import { lazy, Suspense } from "react";
import MainLayout from "@/components/layout/MainLayout";
import PremiumSolarHero from "@/sections/PremiumSolarHero";
import SolarFunnelDynamicSection from "@/sections/SolarFunnelDynamicSection";
import SolarProofCarouselSection from "@/sections/SolarProofCarouselSection";

// Lazy load all non-critical sections
const LazySection = lazy(() => import("@/components/ui/lazy-section").then(m => ({ default: m.LazySection })));

const PremiumServicesSection = lazy(() => import("@/sections/PremiumServicesSection"));
const PremiumTestimonialsSection = lazy(() => import("@/sections/PremiumTestimonialsSection"));
const PremiumCTASection = lazy(() => import("@/sections/PremiumCTASection"));
const ProductShowcaseSection = lazy(() => import("@/sections/ProductShowcaseSection"));
const SolarBenefitsSection = lazy(() => import("@/sections/SolarBenefitsSection"));
const AboutAdvancePowerSection = lazy(() => import("@/sections/AboutAdvancePowerSection"));
const ContactSection = lazy(() => import("@/sections/ContactSection"));

const Home = () => {
  return (
    <MainLayout fullWidth>
      <div className="flex-1 flex flex-col">
        <PremiumSolarHero />
 
        <Suspense fallback={<div className="h-[600px] bg-slate-800/10 animate-pulse rounded-3xl" />}>
          <LazySection className="min-h-[600px]">
            <PremiumServicesSection />
          </LazySection>
        </Suspense>
 
        <Suspense fallback={<div className="h-[600px] bg-slate-800/10 animate-pulse rounded-3xl" />}>
          <SolarProofCarouselSection />
        </Suspense>

        <Suspense fallback={<div className="h-[400px] bg-slate-800 animate-pulse rounded-lg" />}>
          <LazySection className="min-h-[400px]">
            <ProductShowcaseSection />
          </LazySection>
        </Suspense>

        <Suspense fallback={<div className="h-[500px] bg-slate-800 animate-pulse rounded-lg" />}>
          <LazySection className="min-h-[500px]">
            <SolarBenefitsSection />
          </LazySection>
        </Suspense>

        <Suspense fallback={<div className="h-[400px] bg-slate-800 animate-pulse rounded-lg" />}>
          <LazySection className="min-h-[400px]">
            <AboutAdvancePowerSection />
          </LazySection>
        </Suspense>
 
        <Suspense fallback={<div className="h-[600px] bg-slate-800 animate-pulse rounded-lg" />}>
          <LazySection className="min-h-[600px]">
            <PremiumTestimonialsSection />
          </LazySection>
        </Suspense>
 
 
        <Suspense fallback={<div className="h-[400px] bg-slate-800 animate-pulse rounded-lg" />}>
          <LazySection className="min-h-[400px]">
            <PremiumCTASection />
          </LazySection>
        </Suspense>

        <Suspense fallback={<div className="h-[400px] bg-slate-800 animate-pulse rounded-lg" />}>
          <LazySection className="min-h-[400px]">
            <ContactSection />
          </LazySection>
        </Suspense>
      </div>
    </MainLayout>
  );
};

export default Home;
