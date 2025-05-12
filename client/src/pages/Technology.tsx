import React from "react";
import { Helmet } from "react-helmet";
import { ChevronRight, Microscope, Beaker, FlaskConical, Shield } from "lucide-react";
import CompetitiveMatrix from "../components/CompetitiveMatrix";
import TechnicalDataSheet from "../components/TechnicalDataSheet";
import TechnicalFAQ from "../components/TechnicalFAQ";
import ApplicationDiagram from "../components/ApplicationDiagram";
import DefenseCaseStudy from "../components/DefenseCaseStudy";
import ExecutiveSummary from "../components/ExecutiveSummary";
import PhysicalMechanics from "../components/PhysicalMechanics";
import GradientHeading from "../components/ui/GradientHeading";
import ParticleBackground from "../components/ui/ParticleBackground";

const Technology = () => {
  return (
    <>
      <Helmet>
        <title>NASA Ceramic Technology | Praetorian SmartCoat Solutions</title>
        <meta name="description" content="Explore the science behind Praetorian's NASA-derived ceramic coating technology with Class A fire rating (0/0 flame spread), 156% elastomeric flexibility, and 30+ year verified performance." />
      </Helmet>
      
      <div className="min-h-screen relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-950 via-primary-900 to-primary-950"></div>
          <ParticleBackground
            quantity={75}
            minSize={1}
            maxSize={4}
            minSpeed={0.05}
            maxSpeed={0.2}
            color="#ffffff"
            className="opacity-20"
          />
        </div>
        
        {/* Hero Section */}
        <section className="relative pt-28 pb-16 z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-blue-900/30 px-4 py-2 rounded-full border border-blue-500/30 text-blue-300 text-sm mb-4">
                <Microscope className="h-4 w-4" />
                <span>NASA-DERIVED CERAMIC TECHNOLOGY</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-300 via-white to-blue-300 bg-clip-text text-transparent mb-6 leading-tight max-w-4xl">
                Advanced Ceramic Coating Technology
              </h1>
              
              <p className="text-gray-300 md:text-lg max-w-3xl mb-8">
                Scientific analysis of Praetorian's patented NASA-derived ceramic microsphere technology, featuring Class A fire rating (0/0 flame spread), 156% elastomeric flexibility, and independently verified 30+ year performance.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <a href="#technical-data" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-5 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-blue-900/30">
                  <Beaker className="h-5 w-5" />
                  <span>Technical Specifications</span>
                  <ChevronRight className="h-4 w-4" />
                </a>
                
                <a href="#case-studies" className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white px-5 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-gray-900/30">
                  <FlaskConical className="h-5 w-5" />
                  <span>Scientific Case Studies</span>
                  <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Application Diagram Section */}
        <section className="relative py-16 z-10">
          <div className="container mx-auto px-4">
            <ApplicationDiagram />
          </div>
        </section>
        
        {/* Technical Data Sheet Section */}
        <section id="technical-data" className="relative py-16 z-10 bg-primary-950/60 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <TechnicalDataSheet />
          </div>
        </section>
        
        {/* Competitive Matrix Section */}
        <section className="relative py-16 z-10">
          <div className="container mx-auto px-4">
            <GradientHeading level={2} className="text-2xl md:text-3xl font-bold text-center mb-6" variant="blue">
              Scientific Performance Comparison
            </GradientHeading>
            <p className="text-gray-400 text-center mb-8 max-w-3xl mx-auto">
              Independent laboratory testing results comparing Praetorian's NASA-derived ceramic coating to competitive technologies
            </p>
            <CompetitiveMatrix />
          </div>
        </section>
        
        {/* Case Study Section */}
        <section id="case-studies" className="relative py-16 z-10 bg-primary-950/60 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <GradientHeading level={2} className="text-2xl md:text-3xl font-bold text-center mb-6" variant="blue">
              Verified Implementation Case Studies
            </GradientHeading>
            <p className="text-gray-400 text-center mb-8 max-w-3xl mx-auto">
              Documented field performance in challenging real-world environments
            </p>
            <DefenseCaseStudy />
          </div>
        </section>
        
        {/* Technical FAQ Section */}
        <section className="relative py-16 z-10">
          <div className="container mx-auto px-4">
            <TechnicalFAQ />
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="relative py-16 z-10">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-br from-blue-900/40 to-primary-900/40 backdrop-blur-sm rounded-xl border border-blue-500/30 p-8 md:p-10 text-center">
              <div className="inline-flex items-center gap-2 bg-blue-900/50 px-4 py-2 rounded-full border border-blue-500/30 text-blue-300 text-sm mb-6">
                <Shield className="h-4 w-4" />
                <span>PATENT #10,738,214</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-300 via-white to-blue-300 bg-clip-text text-transparent mb-4">
                Request Technical Documentation
              </h2>
              
              <p className="text-gray-300 max-w-3xl mx-auto mb-8">
                Access our comprehensive technical data package including independent laboratory test results, application specifications, and detailed performance metrics for your specific industry needs.
              </p>
              
              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-blue-900/30"
              >
                <Beaker className="h-5 w-5" />
                <span>Request Scientific Data Package</span>
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Technology;