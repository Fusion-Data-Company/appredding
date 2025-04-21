import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/sections/HeroSection";
import FeaturesSection from "@/sections/FeaturesSection";
import ApplicationsSection from "@/sections/ApplicationsSection";
import ProductsSection from "@/sections/ProductsSection";
import TestimonialsSection from "@/sections/TestimonialsSection";
import ContactSection from "@/sections/ContactSection";
import ProductHistorySection from "@/sections/ProductHistorySection";
import ProductPerformanceSection from "@/sections/ProductPerformanceSection";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-primary-dark">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ApplicationsSection />
        <ProductHistorySection />
        <ProductsSection />
        <ProductPerformanceSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
