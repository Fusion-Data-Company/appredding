import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/sections/HeroSection";
import RotatingTextSection from "@/sections/RotatingTextSection";
import IntroSection from "@/sections/IntroSection";
import FeaturesSection from "@/sections/FeaturesSection";
import ApplicationsSection from "@/sections/ApplicationsSection";
import BrandShowcaseSection from "@/sections/BrandShowcaseSection";

import TestimonialsSection from "@/sections/TestimonialsSection";
import ContactSection from "@/sections/ContactSection";
import ProductHistorySection from "@/sections/ProductHistorySection";
import ProductPerformanceSection from "@/sections/ProductPerformanceSection";

import FAQSection from "@/components/FAQSection";
import VideoSection from "@/components/VideoSection";
import { faqData, videoData } from "@/data/content";

const Home = () => {
  return (
    <MainLayout fullWidth>
      <div className="flex-1 flex flex-col">
        <HeroSection />
        <RotatingTextSection />
        <ApplicationsSection />
        <BrandShowcaseSection />
        <IntroSection />
        <FeaturesSection />
        <ProductHistorySection />
        <ProductPerformanceSection />

        <TestimonialsSection />
        <VideoSection videos={videoData} />
        <FAQSection faqs={faqData} />
        <ContactSection />
      </div>
    </MainLayout>
  );
};

export default Home;
