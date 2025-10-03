import { lazy, Suspense } from "react";
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/sections/HeroSection";
import SolarBenefitsSection from "@/sections/SolarBenefitsSection";
import SolarTestimonialCarousel from "@/components/SolarTestimonialCarousel";

const LazySection = lazy(() => import("@/components/ui/lazy-section").then(m => ({ default: m.LazySection })));

const Home = () => {
  return (
    <MainLayout fullWidth>
      <div className="flex-1 flex flex-col">
        <HeroSection />

        <Suspense fallback={<div className="h-[500px] bg-slate-800 animate-pulse rounded-lg" />}>
          <LazySection className="min-h-[500px]">
            <SolarBenefitsSection />
          </LazySection>
        </Suspense>

        <Suspense fallback={<div className="h-[500px] bg-slate-800 animate-pulse rounded-lg" />}>
          <LazySection className="min-h-[500px]">
            <SolarTestimonialCarousel />
          </LazySection>
        </Suspense>
      </div>
    </MainLayout>
  );
};

export default Home;
