import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/sections/HeroSection";
import FeaturesSection from "@/sections/FeaturesSection";
import ApplicationsSection from "@/sections/ApplicationsSection";
import WildfireSection from "@/sections/WildfireSection";
import MarineSection from "@/sections/MarineSection";
import ProductsSection from "@/sections/ProductsSection";
import PainterNetworkSection from "@/sections/PainterNetworkSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import ContactSection from "@/sections/ContactSection";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-primary-dark">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ApplicationsSection />
        <WildfireSection />
        <MarineSection />
        <ProductsSection />
        <PainterNetworkSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
