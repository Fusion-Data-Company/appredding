import MainLayout from "@/components/layout/MainLayout";
import { HeroSection } from "@/components/ui/hero-odyssey";
import { PerformanceMonitor } from "@/components/ui/performance-monitor";
import { LazySection } from "@/components/ui/lazy-section";
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
        
        <LazySection minHeight="400px">
          <ProductShowcaseSection />
        </LazySection>
        
        <LazySection minHeight="500px">
          <SolarSalesFunnelSection />
        </LazySection>
        
        <LazySection minHeight="600px">
          <InteractiveToolsSection />
        </LazySection>
        
        <LazySection minHeight="400px">
          <SolarServicesSection />
        </LazySection>
        
        <LazySection minHeight="500px">
          <EnergyStorageSection />
        </LazySection>
        
        <LazySection minHeight="400px">
          <SpecificationsSection />
        </LazySection>
        
        <LazySection minHeight="400px">
          <TroubleshootingSection />
        </LazySection>
        
        <LazySection minHeight="300px">
          <FAQSection />
        </LazySection>
        
        <LazySection minHeight="400px">
          <AboutAdvancePowerSection />
        </LazySection>
        
        <LazySection minHeight="300px">
          <SolarTestimonialsSection />
        </LazySection>
        
        <LazySection minHeight="400px">
          <ContactSection />
        </LazySection>
      </div>
      <PitchDeckTrigger />
      <PerformanceMonitor minimal />
    </MainLayout>
  );
};

export default Home;
