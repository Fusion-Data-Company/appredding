import MainLayout from "@/components/layout/MainLayout";
import { HeroSection } from "@/components/ui/hero-odyssey";
import { LazySection } from "@/components/ui/lazy-section";
import { OptimizedImage } from "@/components/ui/image-optimizer";
import { PerformanceMonitor } from "@/components/ui/performance-monitor";
import ProductShowcaseSection from "@/sections/ProductShowcaseSection";
import SolarSalesFunnelSection from "@/sections/SolarSalesFunnelSection";
import { InteractiveToolsSection } from "@/sections/InteractiveToolsSection";
import SolarServicesSection from "@/sections/SolarServicesSection";
import AboutAdvancePowerSection from "@/sections/AboutAdvancePowerSection";
import EnergyStorageSection from "@/sections/EnergyStorageSection";
import TroubleshootingSection from "@/sections/TroubleshootingSection";
import SpecificationsSection from "@/sections/SpecificationsSection";
import FAQSection from "@/sections/FAQSection";
import SolarTestimonialsSection from "@/sections/SolarTestimonialsSection";
import ContactSection from "@/sections/ContactSection";
import PitchDeckTrigger from "@/components/PitchDeck/PitchDeckTrigger";

const Home = () => {
  return (
    <MainLayout fullWidth>
      <div className="flex-1 flex flex-col">
        <HeroSection />
        
        <LazySection className="min-h-[400px]">
          <ProductShowcaseSection />
        </LazySection>
        
        <LazySection className="min-h-[500px]">
          <SolarSalesFunnelSection />
        </LazySection>
        
        <LazySection className="min-h-[600px]">
          <InteractiveToolsSection />
        </LazySection>
        
        <LazySection className="min-h-[400px]">
          <SolarServicesSection />
        </LazySection>
        
        <LazySection className="min-h-[500px]">
          <EnergyStorageSection />
        </LazySection>
        
        <LazySection className="min-h-[400px]">
          <SpecificationsSection />
        </LazySection>
        
        <LazySection className="min-h-[400px]">
          <TroubleshootingSection />
        </LazySection>
        
        <LazySection className="min-h-[300px]">
          <FAQSection />
        </LazySection>
        
        <LazySection className="min-h-[400px]">
          <AboutAdvancePowerSection />
        </LazySection>
        
        <LazySection className="min-h-[300px]">
          <SolarTestimonialsSection />
        </LazySection>
        
        <LazySection className="min-h-[400px]">
          <ContactSection />
        </LazySection>
      </div>
      <PitchDeckTrigger />
      <PerformanceMonitor minimal />
    </MainLayout>
  );
};

export default Home;
