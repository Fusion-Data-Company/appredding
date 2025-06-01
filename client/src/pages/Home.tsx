import MainLayout from "@/components/layout/MainLayout";
import { HeroSection } from "@/components/ui/hero-odyssey";
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
        <ProductShowcaseSection />
        <SolarSalesFunnelSection />
        <InteractiveToolsSection />
        <SolarServicesSection />
        <EnergyStorageSection />
        <SpecificationsSection />
        <TroubleshootingSection />
        <FAQSection />
        <AboutAdvancePowerSection />
        <SolarTestimonialsSection />
        <ContactSection />
      </div>
      <PitchDeckTrigger />
    </MainLayout>
  );
};

export default Home;
