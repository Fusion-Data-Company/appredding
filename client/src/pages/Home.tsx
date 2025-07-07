import { lazy, Suspense } from "react";
import MainLayout from "@/components/layout/MainLayout";
import AdvancePowerHero from "@/components/ui/advance-power-hero";

// Lazy load all non-critical sections
const LazySection = lazy(() => import("@/components/ui/lazy-section").then(m => ({ default: m.LazySection })));

const ProductShowcaseSection = lazy(() => import("@/sections/ProductShowcaseSection"));
const SolarSalesFunnelSection = lazy(() => import("@/sections/SolarSalesFunnelSection"));
const SolarServicesSection = lazy(() => import("@/sections/SolarServicesSection"));
const AboutAdvancePowerSection = lazy(() => import("@/sections/AboutAdvancePowerSection"));
const FAQSection = lazy(() => import("@/sections/FAQSection"));
const SolarTestimonialsSection = lazy(() => import("@/sections/SolarTestimonialsSection"));
const ContactSection = lazy(() => import("@/sections/ContactSection"));
const PitchDeckTrigger = lazy(() => import("@/components/PitchDeck/PitchDeckTrigger"));

const Home = () => {
  return (
    <MainLayout fullWidth>
      <div className="flex-1 flex flex-col -mt-24 md:-mt-20">
        <AdvancePowerHero />
        
        <Suspense fallback={<div className="h-[400px] bg-gray-100 animate-pulse rounded-lg" />}>
          <LazySection className="min-h-[400px]">
            <ProductShowcaseSection />
          </LazySection>
        </Suspense>
        
        <Suspense fallback={<div className="h-[500px] bg-gray-100 animate-pulse rounded-lg" />}>
          <LazySection className="min-h-[500px]">
            <SolarSalesFunnelSection />
          </LazySection>
        </Suspense>
        
        <Suspense fallback={<div className="h-[400px] bg-gray-100 animate-pulse rounded-lg" />}>
          <LazySection className="min-h-[400px]">
            <SolarServicesSection />
          </LazySection>
        </Suspense>
        
        <Suspense fallback={<div className="h-[300px] bg-gray-100 animate-pulse rounded-lg" />}>
          <LazySection className="min-h-[300px]">
            <FAQSection />
          </LazySection>
        </Suspense>
        
        <Suspense fallback={<div className="h-[400px] bg-gray-100 animate-pulse rounded-lg" />}>
          <LazySection className="min-h-[400px]">
            <AboutAdvancePowerSection />
          </LazySection>
        </Suspense>
        
        <Suspense fallback={<div className="h-[300px] bg-gray-100 animate-pulse rounded-lg" />}>
          <LazySection className="min-h-[300px]">
            <SolarTestimonialsSection />
          </LazySection>
        </Suspense>
        
        <Suspense fallback={<div className="h-[400px] bg-gray-100 animate-pulse rounded-lg" />}>
          <LazySection className="min-h-[400px]">
            <ContactSection />
          </LazySection>
        </Suspense>
      </div>
      <Suspense fallback={null}>
        <PitchDeckTrigger />
      </Suspense>
    </MainLayout>
  );
};

export default Home;
