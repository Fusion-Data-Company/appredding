import React from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

const Construction = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 glow-text">Construction Protection Systems</h1>
              <p className="text-xl text-gray-200 mb-8">
                Advanced protective coatings designed specifically for commercial and residential construction projects, providing superior durability and protection.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-6">Superior Construction Coatings</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-hard-hat text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Industrial-Grade Durability</h3>
                      <p>Our construction coatings are engineered to withstand extreme conditions, heavy traffic, and constant wear and tear.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-shield-alt text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Multi-Surface Protection</h3>
                      <p>Specialized formulations for concrete, metal, wood, and composite materials used in construction.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-wrench text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Easy Maintenance</h3>
                      <p>Resistant to stains, chemicals, and easy to clean, reducing long-term maintenance costs for building owners.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-certificate text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Code Compliant</h3>
                      <p>Meets or exceeds relevant building codes and industry standards for commercial and residential applications.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button className="bg-primary-500 hover:bg-primary-400">
                    Request Project Consultation
                  </Button>
                </div>
              </div>

              <div className="bg-primary-800 premium-border rounded-xl p-8 shadow-premium-lg">
                <h2 className="text-3xl font-bold mb-6">Applications</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="bg-primary-700 rounded-lg p-4 flex items-start gap-4">
                    <i className="fas fa-building text-primary-400 text-2xl mt-1"></i>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Commercial Buildings</h3>
                      <p>High-performance coatings for office buildings, retail spaces, and industrial facilities</p>
                    </div>
                  </div>
                  
                  <div className="bg-primary-700 rounded-lg p-4 flex items-start gap-4">
                    <i className="fas fa-home text-primary-400 text-2xl mt-1"></i>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Residential Projects</h3>
                      <p>Durable solutions for multi-family housing, condominiums, and single-family homes</p>
                    </div>
                  </div>
                  
                  <div className="bg-primary-700 rounded-lg p-4 flex items-start gap-4">
                    <i className="fas fa-road text-primary-400 text-2xl mt-1"></i>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Infrastructure</h3>
                      <p>Specialized coatings for bridges, tunnels, parking structures, and transportation facilities</p>
                    </div>
                  </div>
                  
                  <div className="bg-primary-700 rounded-lg p-4 flex items-start gap-4">
                    <i className="fas fa-industry text-primary-400 text-2xl mt-1"></i>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Industrial Facilities</h3>
                      <p>Chemical-resistant coatings for manufacturing plants, warehouses, and processing facilities</p>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-primary-500 hover:bg-primary-400">
                  View Project Gallery
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary-800/50">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Construction Coating Solutions</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-primary-800 premium-border rounded-lg p-6 hover-lift">
                <i className="fas fa-floor text-primary-400 text-4xl mb-4"></i>
                <h3 className="text-xl font-bold mb-3">Floor Coatings</h3>
                <p className="mb-4">High-performance epoxy and polyurethane systems for concrete floors that provide chemical resistance, durability, and aesthetic appeal.</p>
                <Button className="w-full">Learn More</Button>
              </div>
              
              <div className="bg-primary-800 premium-border rounded-lg p-6 hover-lift">
                <i className="fas fa-paint-roller text-primary-400 text-4xl mb-4"></i>
                <h3 className="text-xl font-bold mb-3">Wall Systems</h3>
                <p className="mb-4">Protective and decorative wall coatings that offer superior durability, cleanability, and resistance to mold and mildew.</p>
                <Button className="w-full">Learn More</Button>
              </div>
              
              <div className="bg-primary-800 premium-border rounded-lg p-6 hover-lift">
                <i className="fas fa-cloud-rain text-primary-400 text-4xl mb-4"></i>
                <h3 className="text-xl font-bold mb-3">Waterproofing</h3>
                <p className="mb-4">Advanced waterproofing solutions for roofs, foundations, and exterior walls to prevent water infiltration and structural damage.</p>
                <Button className="w-full">Learn More</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Working with Architects & Contractors</h2>
                <p className="text-xl mb-6">
                  We partner with architects, builders, and contractors to provide comprehensive protective coating solutions for construction projects of all sizes.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-primary-400"></i>
                    <p>Technical support from project specification through completion</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-primary-400"></i>
                    <p>Detailed specification documents and application guidelines</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-primary-400"></i>
                    <p>On-site inspection and quality control services</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-primary-400"></i>
                    <p>Certified applicator network for professional installation</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-primary-400"></i>
                    <p>Comprehensive warranty programs</p>
                  </div>
                </div>
                
                <Button className="bg-primary-500 hover:bg-primary-400">
                  Partner With Us
                </Button>
              </div>
              
              <div className="bg-primary-800 premium-border rounded-xl p-8 glass-effect">
                <h3 className="text-2xl font-bold mb-6 text-center">Featured Projects</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-primary-700 rounded-lg overflow-hidden">
                    <div className="h-32 bg-primary-600 flex items-center justify-center">
                      <span className="text-sm">Project Image</span>
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold">SkyTower Commercial Complex</h4>
                      <p className="text-sm">Los Angeles, CA</p>
                    </div>
                  </div>
                  
                  <div className="bg-primary-700 rounded-lg overflow-hidden">
                    <div className="h-32 bg-primary-600 flex items-center justify-center">
                      <span className="text-sm">Project Image</span>
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold">Harbor Bridge Renovation</h4>
                      <p className="text-sm">Portland, OR</p>
                    </div>
                  </div>
                  
                  <div className="bg-primary-700 rounded-lg overflow-hidden">
                    <div className="h-32 bg-primary-600 flex items-center justify-center">
                      <span className="text-sm">Project Image</span>
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold">Highland Residential Tower</h4>
                      <p className="text-sm">Denver, CO</p>
                    </div>
                  </div>
                  
                  <div className="bg-primary-700 rounded-lg overflow-hidden">
                    <div className="h-32 bg-primary-600 flex items-center justify-center">
                      <span className="text-sm">Project Image</span>
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold">Metropolitan Airport Terminal</h4>
                      <p className="text-sm">Chicago, IL</p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-6">
                  <Button className="bg-primary-600 hover:bg-primary-500">
                    View All Projects
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Construction;