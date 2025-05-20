import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import SEOHead from "@/components/SEOHead";

const Construction = () => {
  return (
    <MainLayout fullWidth={true}>
      <SEOHead 
        title="Construction Solutions | Praetorian Smart-Coat"
        description="Advanced thermal protection solutions for construction projects. Increase energy efficiency and protect valuable assets with Praetorian Smart-Coat technology."
        keywords="construction coating, energy efficiency, thermal protection, building envelope, construction insulation"
      />
      <div className="relative">
        <section className="relative z-10 py-12 overflow-hidden">
          <div className="container mx-auto">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">Construction Solutions</h1>
              <p className="text-xl mb-8">Our page is being updated with enhanced content.</p>
              <p>Please check back shortly while we implement improvements to the Construction section.</p>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Construction;