import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/sections/HeroSection";
import IntroSection from "@/sections/IntroSection";
import FeaturesSection from "@/sections/FeaturesSection";
import ApplicationsSection from "@/sections/ApplicationsSection";

import TestimonialsSection from "@/sections/TestimonialsSection";
import ContactSection from "@/sections/ContactSection";
import ProductHistorySection from "@/sections/ProductHistorySection";
import ProductPerformanceSection from "@/sections/ProductPerformanceSection";

import FAQSection from "@/components/FAQSection";
import VideoSection from "@/components/VideoSection";
import { faqData, videoData } from "@/data/content";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-primary-dark">
      <Header />
      <main>
        <HeroSection />
        <IntroSection />
        <FeaturesSection />
        <ApplicationsSection />
        <ProductHistorySection />
        <ProductPerformanceSection />

        <TestimonialsSection />
        <VideoSection videos={videoData} />
        <FAQSection faqs={faqData} />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
