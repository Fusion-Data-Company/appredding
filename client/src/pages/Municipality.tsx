import React from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

const Municipality = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 glow-text">Municipal Infrastructure Protection</h1>
              <p className="text-xl text-gray-200 mb-8">
                Specialized protective coating systems designed for public infrastructure, extending service life and reducing maintenance costs for municipalities.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-6">Infrastructure Protection Solutions</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-road text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Transportation Infrastructure</h3>
                      <p>Protective coatings for bridges, tunnels, culverts, and traffic structures that resist corrosion, weathering, and chemical exposure.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-water text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Water Management</h3>
                      <p>Specialized coatings for water and wastewater treatment facilities, storage tanks, and distribution systems.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-building text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Public Buildings</h3>
                      <p>Durable, easy-to-maintain coatings for government facilities, schools, recreation centers, and other municipal buildings.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-bolt text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Utility Protection</h3>
                      <p>Protective systems for electrical substations, utility poles, telecommunications equipment, and other critical infrastructure.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button className="bg-primary-500 hover:bg-primary-400">
                    Request Municipal Consultation
                  </Button>
                </div>
              </div>

              <div className="bg-primary-800 premium-border rounded-xl p-8 shadow-premium-lg">
                <h2 className="text-3xl font-bold mb-6">Benefits for Municipalities</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="bg-primary-700 rounded-lg p-4 flex items-start gap-4">
                    <i className="fas fa-dollar-sign text-primary-400 text-2xl mt-1"></i>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Cost Savings</h3>
                      <p>Reduce long-term maintenance costs and extend infrastructure service life by up to 30%</p>
                    </div>
                  </div>
                  
                  <div className="bg-primary-700 rounded-lg p-4 flex items-start gap-4">
                    <i className="fas fa-calendar-alt text-primary-400 text-2xl mt-1"></i>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Reduced Downtime</h3>
                      <p>Minimize service interruptions with durable, fast-curing coating systems</p>
                    </div>
                  </div>
                  
                  <div className="bg-primary-700 rounded-lg p-4 flex items-start gap-4">
                    <i className="fas fa-shield-alt text-primary-400 text-2xl mt-1"></i>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Asset Protection</h3>
                      <p>Shield critical infrastructure from corrosion, UV damage, and chemical exposure</p>
                    </div>
                  </div>
                  
                  <div className="bg-primary-700 rounded-lg p-4 flex items-start gap-4">
                    <i className="fas fa-leaf text-primary-400 text-2xl mt-1"></i>
                    <div>
                      <h3 className="text-xl font-semibold mb-1">Sustainability</h3>
                      <p>Environmentally compliant coating systems that promote municipal sustainability goals</p>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-primary-500 hover:bg-primary-400">
                  Calculate ROI
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary-800/50">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Infrastructure Applications</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-primary-800 premium-border rounded-lg p-6 hover-lift">
                <i className="fas fa-bridge text-primary-400 text-4xl mb-4"></i>
                <h3 className="text-xl font-bold mb-3">Bridges & Structures</h3>
                <p className="mb-4">Comprehensive protection systems for steel and concrete bridges, overpasses, and support structures.</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check text-primary-400"></i>
                    <span>Corrosion-resistant steel coatings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check text-primary-400"></i>
                    <span>Concrete sealing and preservation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check text-primary-400"></i>
                    <span>Anti-graffiti protection</span>
                  </li>
                </ul>
                <Button className="w-full">Learn More</Button>
              </div>
              
              <div className="bg-primary-800 premium-border rounded-lg p-6 hover-lift">
                <i className="fas fa-tint text-primary-400 text-4xl mb-4"></i>
                <h3 className="text-xl font-bold mb-3">Water Systems</h3>
                <p className="mb-4">NSF-approved coatings for potable water tanks, treatment facilities, and distribution infrastructure.</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check text-primary-400"></i>
                    <span>Potable water-safe linings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check text-primary-400"></i>
                    <span>Chemical-resistant coatings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check text-primary-400"></i>
                    <span>Wastewater protection systems</span>
                  </li>
                </ul>
                <Button className="w-full">Learn More</Button>
              </div>
              
              <div className="bg-primary-800 premium-border rounded-lg p-6 hover-lift">
                <i className="fas fa-parking text-primary-400 text-4xl mb-4"></i>
                <h3 className="text-xl font-bold mb-3">Parking Structures</h3>
                <p className="mb-4">Traffic-bearing coating systems that protect concrete parking structures from water, de-icing salts, and wear.</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check text-primary-400"></i>
                    <span>Waterproofing membranes</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check text-primary-400"></i>
                    <span>Traffic-bearing overlays</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check text-primary-400"></i>
                    <span>Concrete crack repair systems</span>
                  </li>
                </ul>
                <Button className="w-full">Learn More</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Case Studies</h2>
              
              <div className="space-y-8">
                <div className="bg-primary-800 premium-border rounded-xl p-6 glass-effect">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-primary-700 aspect-square rounded-lg flex items-center justify-center">
                      <span className="text-sm">Project Image</span>
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="text-2xl font-bold mb-3">Riverfront Bridge Restoration</h3>
                      <p className="mb-4">A comprehensive corrosion protection project for a 75-year-old steel bridge vital to downtown traffic flow.</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-300">Location</div>
                          <div>Cincinnati, OH</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-300">Project Size</div>
                          <div>45,000 sq ft</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-300">Completion</div>
                          <div>2023</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-300">Expected Service Life</div>
                          <div>25+ years</div>
                        </div>
                      </div>
                      
                      <Button className="bg-primary-600 hover:bg-primary-500">
                        View Full Case Study
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-primary-800 premium-border rounded-xl p-6 glass-effect">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-primary-700 aspect-square rounded-lg flex items-center justify-center">
                      <span className="text-sm">Project Image</span>
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="text-2xl font-bold mb-3">Municipal Water Tower Rehabilitation</h3>
                      <p className="mb-4">Complete interior and exterior protection system for a 2-million-gallon elevated water storage tank.</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-sm text-gray-300">Location</div>
                          <div>Austin, TX</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-300">Project Size</div>
                          <div>Interior/Exterior Restoration</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-300">Completion</div>
                          <div>2024</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-300">Expected Service Life</div>
                          <div>20+ years</div>
                        </div>
                      </div>
                      
                      <Button className="bg-primary-600 hover:bg-primary-500">
                        View Full Case Study
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-primary-800/50">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Public Works Partnership Program</h2>
              <p className="text-xl mb-8">
                Join our partnership program designed specifically for municipal agencies and public works departments to receive preferential pricing, extended warranties, and dedicated technical support.
              </p>
              
              <Button className="bg-primary-500 hover:bg-primary-400 px-8 py-3 text-lg">
                Request Program Information
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Municipality;