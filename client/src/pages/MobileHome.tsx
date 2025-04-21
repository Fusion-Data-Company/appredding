import React from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

const MobileHome = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 glow-text">Mobile Home Protection Systems</h1>
              <p className="text-xl text-gray-200 mb-8">
                Specialized coatings for manufactured housing that extend lifespan, improve energy efficiency, and enhance appearance.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="bg-primary-800 premium-border rounded-xl p-8 shadow-premium-lg">
                <h2 className="text-3xl font-bold mb-6">Complete Protection Solutions</h2>
                <p className="mb-6">Our specialized coating systems are designed specifically for the unique challenges faced by manufactured homes.</p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-home text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Roof Protection System</h3>
                      <p>Our advanced elastomeric roof coating creates a seamless, waterproof membrane that reflects heat and prevents leaks.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-tint-slash text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Exterior Wall Protection</h3>
                      <p>Weather-resistant coatings for metal, vinyl, or aluminum siding that prevent moisture damage and corrosion.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-snowflake text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Thermal Insulation Coating</h3>
                      <p>Energy-efficient ceramic coating that reduces heat transfer, lowering heating and cooling costs.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-wind text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Underbelly Sealing</h3>
                      <p>Protective coatings for the underside of manufactured homes to prevent moisture, pests, and improve insulation.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6">The Praetorian Advantage</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="bg-primary-800 premium-border rounded-lg p-4">
                    <h3 className="text-xl font-bold mb-2">Extend Service Life</h3>
                    <p>Our specialized coatings can extend the life of your manufactured home by 10-15 years by protecting against the elements.</p>
                  </div>
                  
                  <div className="bg-primary-800 premium-border rounded-lg p-4">
                    <h3 className="text-xl font-bold mb-2">Energy Savings</h3>
                    <p>Thermal reflective coatings can reduce cooling costs by up to 30% during summer months by reflecting solar radiation.</p>
                  </div>
                  
                  <div className="bg-primary-800 premium-border rounded-lg p-4">
                    <h3 className="text-xl font-bold mb-2">Increased Value</h3>
                    <p>Professionally applied protective coatings can significantly increase the resale value of your manufactured home.</p>
                  </div>
                  
                  <div className="bg-primary-800 premium-border rounded-lg p-4">
                    <h3 className="text-xl font-bold mb-2">Enhanced Appearance</h3>
                    <p>Transform your home's appearance with our beautiful, durable finish options available in a wide range of colors.</p>
                  </div>
                </div>
                
                <Button className="bg-primary-500 hover:bg-primary-400">
                  Request Free Assessment
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary-800/50">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Protection Process</h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="bg-primary-800 premium-border rounded-lg p-6 hover-lift">
                <div className="bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Assessment</h3>
                <p className="text-center">We thoroughly evaluate your home's condition and identify areas needing protection.</p>
              </div>
              
              <div className="bg-primary-800 premium-border rounded-lg p-6 hover-lift">
                <div className="bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Preparation</h3>
                <p className="text-center">Surfaces are properly cleaned, repaired, and primed to ensure optimal coating adhesion.</p>
              </div>
              
              <div className="bg-primary-800 premium-border rounded-lg p-6 hover-lift">
                <div className="bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Application</h3>
                <p className="text-center">Our certified technicians apply specialized coatings using professional-grade equipment.</p>
              </div>
              
              <div className="bg-primary-800 premium-border rounded-lg p-6 hover-lift">
                <div className="bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl font-bold">4</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Inspection</h3>
                <p className="text-center">Final quality check ensures all surfaces are properly coated and protected.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto bg-primary-800 premium-border rounded-xl p-8 glass-effect">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Common Challenges Solved</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <i className="fas fa-check-circle text-primary-400 mt-1"></i>
                      <div>
                        <h3 className="font-semibold">Roof Leaks</h3>
                        <p className="text-sm">Our seamless roof coating system seals existing leaks and prevents new ones from forming.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <i className="fas fa-check-circle text-primary-400 mt-1"></i>
                      <div>
                        <h3 className="font-semibold">High Energy Bills</h3>
                        <p className="text-sm">Thermal reflective coatings significantly reduce heat absorption and lower cooling costs.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <i className="fas fa-check-circle text-primary-400 mt-1"></i>
                      <div>
                        <h3 className="font-semibold">Exterior Deterioration</h3>
                        <p className="text-sm">Weather-resistant coatings stop corrosion, fading, and deterioration of siding and trim.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <i className="fas fa-check-circle text-primary-400 mt-1"></i>
                      <div>
                        <h3 className="font-semibold">Moisture and Mold</h3>
                        <p className="text-sm">Our protective systems create vapor barriers that prevent moisture infiltration and mold growth.</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <i className="fas fa-check-circle text-primary-400 mt-1"></i>
                      <div>
                        <h3 className="font-semibold">Outdated Appearance</h3>
                        <p className="text-sm">Transform your home with modern colors and textures that dramatically improve curb appeal.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-primary-700 rounded-lg p-6">
                  <h3 className="text-2xl font-bold mb-4 text-center">Get a Free Quote</h3>
                  <p className="text-center mb-6">Discover how affordable complete protection can be for your manufactured home.</p>
                  
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <input 
                        type="text" 
                        className="w-full p-2 rounded bg-primary-800 border border-primary-600"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Phone</label>
                      <input 
                        type="tel" 
                        className="w-full p-2 rounded bg-primary-800 border border-primary-600"
                        placeholder="Your phone number"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input 
                        type="email" 
                        className="w-full p-2 rounded bg-primary-800 border border-primary-600"
                        placeholder="Your email"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Home Size (sq ft)</label>
                      <input 
                        type="text" 
                        className="w-full p-2 rounded bg-primary-800 border border-primary-600"
                        placeholder="Approximate square footage"
                      />
                    </div>
                    
                    <Button className="w-full bg-primary-500 hover:bg-primary-400 py-3">
                      Request Free Quote
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MobileHome;