import MainLayout from "@/components/layout/MainLayout";
import HeroSection from "@/sections/HeroSection";
import SolarBenefitsSection from "@/sections/SolarBenefitsSection";
import SolarTestimonialCarousel from "@/components/SolarTestimonialCarousel";
import { LazySection } from "@/components/ui/lazy-section";
import SEOHead from "@/components/SEOHead";

const Home = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Advance Power Redding",
    "alternateName": "APR Solar",
    "url": "https://apredding.net",
    "logo": "https://apredding.net/advance-power-logo.jpg",
    "description": "Northern California's premier solar installation company with 25+ years of experience",
    "foundingDate": "1999",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Redding",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Sales",
      "telephone": "+1-530-221-1234",
      "email": "info@apredding.net"
    },
    "sameAs": [
      "https://www.facebook.com/AdvancePowerRedding",
      "https://www.linkedin.com/company/advance-power-redding"
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Advance Power Redding",
    "image": "https://apredding.net/meta-images/hero-image-social-preview-may-2025.jpg",
    "@id": "https://apredding.net",
    "url": "https://apredding.net",
    "telephone": "+1-530-221-1234",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Redding",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.5865,
      "longitude": -122.3917
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "17:00"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127"
    }
  };

  return (
    <MainLayout fullWidth>
      <SEOHead
        title="Advance Power Redding | Solar Installation & Repair CA"
        description="Expert solar installation, repair & maintenance in Northern CA. 25+ years experience, NEM 3.0 certified. Battery storage solutions. Free consultation."
        keywords={['solar installation Redding', 'solar repair Northern California', 'residential solar panels', 'commercial solar systems', 'battery storage', 'NEM 3.0', 'solar maintenance', 'solar energy Redding CA']}
        url="/"
        type="website"
        structuredData={[organizationSchema, localBusinessSchema]}
      />
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
