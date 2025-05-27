import MainLayout from "@/components/layout/MainLayout";
import SolarHeroSection from "@/sections/SolarHeroSection";
import SolarSalesFunnelSection from "@/sections/SolarSalesFunnelSection";
import SolarServicesSection from "@/sections/SolarServicesSection";
import AboutAdvancePowerSection from "@/sections/AboutAdvancePowerSection";
import EnergyStorageSection from "@/sections/EnergyStorageSection";
import SolarTestimonialsSection from "@/sections/SolarTestimonialsSection";
import ContactSection from "@/sections/ContactSection";

const Home = () => {
  return (
    <MainLayout fullWidth>
      <div className="flex-1 flex flex-col">
        <SolarHeroSection />
        <SolarSalesFunnelSection />
        <SolarServicesSection />
        <EnergyStorageSection />
        <AboutAdvancePowerSection />
        <SolarTestimonialsSection />
        <ContactSection />
      </div>
    </MainLayout>
  );
};

export default Home;
