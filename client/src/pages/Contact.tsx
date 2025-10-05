import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SandlerSolarFunnel from '@/sections/SandlerSolarFunnel';
import ContactSection from '@/sections/ContactSection';
import SEOHead from '@/components/SEOHead';

const Contact = () => {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Advance Power Redding",
    "description": "Get in touch with Advance Power Redding for solar installation, repair, and maintenance services. Free consultations available.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Advance Power Redding",
      "telephone": "+1-530-221-1234",
      "email": "info@apredding.net",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Redding",
        "addressRegion": "CA",
        "addressCountry": "US"
      }
    }
  };

  return (
    <MainLayout fullWidth>
      <SEOHead
        title="Contact Advance Power Redding | Free Solar Quote"
        description="Get expert solar installation, repair & maintenance quotes. Free consultations available. Serving Northern California with 25+ years experience. Call today!"
        keywords={['contact solar company', 'free solar consultation', 'solar quote Redding', 'solar installation quote', 'Northern California solar contact']}
        url="/contact"
        type="website"
        structuredData={contactSchema}
      />
      <div className="flex-1 flex flex-col">
        {/* Solar Journey Process */}
        <SandlerSolarFunnel 
          title="Your Solar Journey Starts Here"
          subtitle="Follow our proven 3-step process to transform your home with clean, affordable solar energy"
          ctaText="Start Your Solar Assessment"
          onCtaClick={() => {
            const contactSection = document.getElementById('contact-form');
            contactSection?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Contact Form Section */}
        <div id="contact-form">
          <ContactSection />
        </div>
      </div>
    </MainLayout>
  );
};

export default Contact;