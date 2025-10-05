import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import SEOHead from "@/components/SEOHead";
import PageHeroSection from "@/components/sections/PageHeroSection";
import ContentSection from "@/components/sections/ContentSection";
import FeatureGrid from "@/components/sections/FeatureGrid";
import StatsSection from "@/components/sections/StatsSection";
import CTASection from "@/components/sections/CTASection";
import TestimonialCard from "@/components/cards/TestimonialCard";
import { LucideIcon } from "lucide-react";

interface ServicePageProps {
  pageTitle: string;
  pageDescription: string;
  structuredData: object;
  heroSection: {
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    primaryButton: {
      text: string;
      onClick: () => void;
    };
    secondaryButton: {
      text: string;
      link: string;
    };
  };
  featuresSection: {
    title: string;
    subtitle: string;
    description: string;
    features: {
      icon: LucideIcon;
      title: string;
      description: string;
    }[];
  };
  statsSection: {
    title: string;
    subtitle: string;
    description: string;
    stats: {
      value: string;
      suffix?: string;
      label: string;
      icon: LucideIcon;
    }[];
  };
  contentSections: {
    title: string;
    subtitle: string;
    description?: string;
    content: React.ReactNode;
  }[];
  testimonialsSection: {
    title: string;
    subtitle: string;
    testimonials: {
      quote: string;
      author: string;
      role: string;
      company: string;
      rating: number;
    }[];
  };
  ctaSection: {
    title: string;
    description: string;
    primaryButton: {
      text: string;
      onClick: () => void;
    };
    secondaryButton: {
      text: string;
      link: string;
    };
  };
  accentColor?: "orange" | "blue";
}

const ServicePage: React.FC<ServicePageProps> = ({
  pageTitle,
  pageDescription,
  structuredData,
  heroSection,
  featuresSection,
  statsSection,
  contentSections,
  testimonialsSection,
  ctaSection,
  accentColor = "orange",
}) => {
  return (
    <MainLayout>
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        structuredData={structuredData}
      />

      <PageHeroSection {...heroSection} />

      {contentSections.map((section, index) => (
        <ContentSection
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          description={section.description}
          backgroundColor={index % 2 === 0 ? "bg-gray-900" : "bg-black"}
        >
          {section.content}
        </ContentSection>
      ))}

      <FeatureGrid
        title={featuresSection.title}
        subtitle={featuresSection.subtitle}
        description={featuresSection.description}
        features={featuresSection.features}
        columns={3}
        accentColor={accentColor}
      />

      <StatsSection
        title={statsSection.title}
        subtitle={statsSection.subtitle}
        description={statsSection.description}
        stats={statsSection.stats}
        columns={4}
        variant="highlighted"
        accentColor={accentColor}
      />

      <ContentSection
        title={testimonialsSection.title}
        subtitle={testimonialsSection.subtitle}
        backgroundColor="bg-gradient-to-br from-gray-900 to-black"
      >
        <div className="grid md:grid-cols-3 gap-6">
          {testimonialsSection.testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              {...testimonial}
              highlight={index === 1}
            />
          ))}
        </div>
      </ContentSection>

      <CTASection
        title={ctaSection.title}
        description={ctaSection.description}
        primaryButton={ctaSection.primaryButton}
        secondaryButton={ctaSection.secondaryButton}
        showContactInfo={true}
        accentColor={accentColor}
      />
    </MainLayout>
  );
};

export default ServicePage;
