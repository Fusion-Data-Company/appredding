import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/sections/HeroSection";
import SolarBenefitsSection from "@/sections/SolarBenefitsSection";
import SolarTestimonialCarousel from "@/components/SolarTestimonialCarousel";
import { LazySection } from "@/components/ui/lazy-section";

const Home = () => {
  return (
    <MainLayout fullWidth>
      <div className="flex-1 flex flex-col">
        <HeroSection />

        <LazySection className="min-h-[500px]">
          <SolarBenefitsSection />
        </LazySection>

        <LazySection className="min-h-[500px]">
          <SolarTestimonialCarousel />
        </LazySection>
      </div>
    </MainLayout>
  );
};

export default Home;
