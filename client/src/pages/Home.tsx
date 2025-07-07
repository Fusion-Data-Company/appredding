import { lazy, Suspense } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { HeroOdyssey } from "@/components/ui/hero-odyssey-original";

// Lazy load all non-critical sections
const LazySection = lazy(() => import("@/components/ui/lazy-section").then(m => ({ default: m.LazySection })));
const PowerFlowSection = lazy(() => import("@/sections/PowerFlowSection"));
const ProductShowcaseSection = lazy(() => import("@/sections/ProductShowcaseSection"));
const SolarSalesFunnelSection = lazy(() => import("@/sections/SolarSalesFunnelSection"));
const InteractiveToolsSection = lazy(() => import("@/sections/InteractiveToolsSection").then(m => ({ default: m.InteractiveToolsSection })));
const SolarServicesSection = lazy(() => import("@/sections/SolarServicesSection"));
const AboutAdvancePowerSection = lazy(() => import("@/sections/AboutAdvancePowerSection"));
const EnergyStorageSection = lazy(() => import("@/sections/EnergyStorageSection"));
const TroubleshootingSection = lazy(() => import("@/sections/TroubleshootingSection"));
const SpecificationsSection = lazy(() => import("@/sections/SpecificationsSection"));
const FAQSection = lazy(() => import("@/sections/FAQSection"));
const SolarTestimonialsSection = lazy(() => import("@/sections/SolarTestimonialsSection"));
const ContactSection = lazy(() => import("@/sections/ContactSection"));
const PitchDeckTrigger = lazy(() => import("@/components/PitchDeck/PitchDeckTrigger"));

const Home = () => {
  return (
    <MainLayout fullWidth>
      <div className="flex-1 flex flex-col">
        <HeroOdyssey />
        
        <Suspense fallback={<div className="h-[400px] bg-gray-100 animate-pulse rounded-lg" />}>
          <LazySection className="min-h-[400px]">
            <PowerFlowSection />
          </LazySection>
        </Suspense>
        
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
        
        <Suspense fallback={<div className="h-[600px] bg-gray-100 animate-pulse rounded-lg" />}>
          <LazySection className="min-h-[600px]">
            <InteractiveToolsSection />
          </LazySection>
        </Suspense>
        
        <Suspense fallback={<div className="h-[400px] bg-gray-100 animate-pulse rounded-lg" />}>
          <LazySection className="min-h-[400px]">
            <SolarServicesSection />
          </LazySection>
        </Suspense>
        
        <Suspense fallback={<div className="h-[500px] bg-gray-100 animate-pulse rounded-lg" />}>
          <LazySection className="min-h-[500px]">
            <EnergyStorageSection />
          </LazySection>
        </Suspense>
        
        <Suspense fallback={<div className="h-[400px] bg-gray-100 animate-pulse rounded-lg" />}>
          <LazySection className="min-h-[400px]">
            <SpecificationsSection />
          </LazySection>
        </Suspense>
        
        <Suspense fallback={<div className="h-[400px] bg-gray-100 animate-pulse rounded-lg" />}>
          <LazySection className="min-h-[400px]">
            <TroubleshootingSection />
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
