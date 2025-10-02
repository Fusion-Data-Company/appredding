import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import SandlerSolarFunnel from '@/sections/SandlerSolarFunnel';
import ContactSection from '@/sections/ContactSection';

const Contact = () => {
  return (
    <MainLayout fullWidth>
      <div className="flex-1 flex flex-col">
        {/* Sandler Solar Funnel Process */}
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