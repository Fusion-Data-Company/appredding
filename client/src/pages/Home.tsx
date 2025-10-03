import { lazy, Suspense } from "react";
import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/sections/HeroSection";
import SolarFunnelDynamicSection from "@/sections/SolarFunnelDynamicSection";
import SolarProofCarouselSection from "@/sections/SolarProofCarouselSection";

// Lazy load all non-critical sections
const LazySection = lazy(() => import("@/components/ui/lazy-section").then(m => ({ default: m.LazySection })));

const SolarTestimonialCarousel = lazy(() => import("@/sections/SolarTestimonialCarousel"));
const ProductShowcaseSection = lazy(() => import("@/sections/ProductShowcaseSection"));
const SolarBenefitsSection = lazy(() => import("@/sections/SolarBenefitsSection"));
const AboutAdvancePowerSection = lazy(() => import("@/sections/AboutAdvancePowerSection"));
const GoogleReviews = lazy(() => import("@/components/GoogleReviews"));
const ContactSection = lazy(() => import("@/sections/ContactSection"));

const Home = () => {
  return (
    <MainLayout fullWidth>
      <div className="flex-1 flex flex-col -mt-24 md:-mt-20">
        <HeroSection />
 
        <Suspense fallback={<div className="h-[600px] bg-slate-800/10 animate-pulse rounded-3xl" />}>
          <SolarFunnelDynamicSection />
        </Suspense>
 
        <Suspense fallback={<div className="h-[600px] bg-slate-800/10 animate-pulse rounded-3xl" />}>
          <SolarProofCarouselSection />
        </Suspense>

        <Suspense fallback={<div className="h-[600px] bg-slate-800/10 animate-pulse rounded-3xl" />}>
          <LazySection className="min-h-[600px]">
            <SolarTestimonialCarousel />
          </LazySection>
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
 
        <Suspense fallback={<div className="h-[500px] bg-slate-800 animate-pulse rounded-lg" />}>
          <LazySection className="min-h-[500px]">
            <section className="relative py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-6xl md:text-7xl font-black mb-6 leading-tight drop-shadow-lg">
                    <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 bg-clip-text text-transparent">What Our</span>{" "}
                    <span className="relative inline-block">
                      <span className="bg-gradient-to-r from-blue-300 via-blue-200 to-blue-300 bg-clip-text text-transparent drop-shadow-lg">
                        Customers Say
                      </span>
                    </span>
                  </h2>
                  <p className="text-2xl md:text-3xl text-slate-300 max-w-4xl mx-auto font-medium leading-relaxed">
                    Over 25 years of satisfied customers throughout Northern California
                  </p>
                </div>
                <GoogleReviews />
              </div>
            </section>
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
