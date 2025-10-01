import { lazy, Suspense } from "react";
import MainLayout from "@/components/layout/MainLayout";
import AdvancePowerHero from "@/components/ui/advance-power-hero";

// Lazy load all non-critical sections
const LazySection = lazy(() => import("@/components/ui/lazy-section").then(m => ({ default: m.LazySection })));

const ProductShowcaseSection = lazy(() => import("@/sections/ProductShowcaseSection"));
const SolarSalesFunnelSection = lazy(() => import("@/sections/SolarSalesFunnelSection"));
const AboutAdvancePowerSection = lazy(() => import("@/sections/AboutAdvancePowerSection"));
const GoogleReviews = lazy(() => import("@/components/GoogleReviews"));
const ContactSection = lazy(() => import("@/sections/ContactSection"));

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
            <AboutAdvancePowerSection />
          </LazySection>
        </Suspense>
        
        <Suspense fallback={<div className="h-[500px] bg-gray-100 animate-pulse rounded-lg" />}>
          <LazySection className="min-h-[500px]">
            <section className="relative py-32 bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-100 overflow-hidden">
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h2 className="text-6xl md:text-7xl font-black mb-6 leading-tight drop-shadow-lg">
                    <span className="bg-gradient-to-r from-orange-800 via-red-700 to-amber-800 bg-clip-text text-transparent">What Our</span>{" "}
                    <span className="relative inline-block">
                      <span className="bg-gradient-to-r from-orange-700 via-red-600 to-amber-700 bg-clip-text text-transparent drop-shadow-lg">
                        Customers Say
                      </span>
                    </span>
                  </h2>
                  <p className="text-2xl md:text-3xl text-gray-800 max-w-4xl mx-auto font-medium leading-relaxed">
                    Over 25 years of satisfied customers throughout Northern California
                  </p>
                </div>
                <GoogleReviews />
              </div>
            </section>
          </LazySection>
        </Suspense>
        
        <Suspense fallback={<div className="h-[400px] bg-gray-100 animate-pulse rounded-lg" />}>
          <LazySection className="min-h-[400px]">
            <ContactSection />
          </LazySection>
        </Suspense>
      </div>
    </MainLayout>
  );
};

export default Home;
