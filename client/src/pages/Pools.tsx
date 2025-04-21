import React from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

const Pools = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 glow-text">Premium Pool Protection Systems</h1>
              <p className="text-xl text-gray-200 mb-8">
                Our specialized pool coatings provide superior protection and beautiful finishes, enhancing both the durability and appearance of your pool surfaces.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="bg-primary-800 premium-border rounded-xl p-8 shadow-premium-lg">
                <h2 className="text-3xl font-bold mb-6">Pool Surface Solutions</h2>
                <p className="mb-8">Our advanced coating systems are designed to provide years of durable protection for all types of pool surfaces</p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-water text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Chemical-Resistant Technology</h3>
                      <p>Specially formulated to withstand constant exposure to chlorine, bromine, salt, and other pool chemicals without degradation.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-sun text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">UV-Resistant Formulation</h3>
                      <p>Maintains its color integrity and surface properties even with constant exposure to intense sunlight.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-tint-slash text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Algae-Resistant Properties</h3>
                      <p>Built-in protection against algae growth helps maintain a clean, beautiful pool surface with less maintenance.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-paint-brush text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Stunning Aesthetic Options</h3>
                      <p>Available in a wide range of colors and finishes, from natural stone appearances to vibrant solid colors.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <img 
                  src="https://images.unsplash.com/photo-1529290130-4ca3753253ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" 
                  alt="Beautiful pool with Praetorian coating" 
                  className="rounded-xl w-full h-64 object-cover mb-8"
                />
                
                <h2 className="text-3xl font-bold mb-6">Why Choose Praetorian Pool Coatings?</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-primary-400"></i>
                    <p>Extended durability - typically 2-3 times longer than conventional pool surfaces</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-primary-400"></i>
                    <p>Smoother surface that's gentler on feet and swimwear</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-primary-400"></i>
                    <p>Reduced chemical consumption due to non-porous surface</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-primary-400"></i>
                    <p>Lower maintenance costs over the life of your pool</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-primary-400"></i>
                    <p>Professional application by certified technicians</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-circle text-primary-400"></i>
                    <p>10-15 year warranty options available</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button className="bg-primary-500 hover:bg-primary-400">
                    Get a Free Consultation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary-800/50">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Pool Coating Systems</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-primary-800 premium-border rounded-lg p-6 hover-lift">
                <h3 className="text-xl font-bold mb-3">PraetorianPebble™</h3>
                <p className="mb-4">A luxurious aggregate finish that combines the durability of quartz with the beauty of natural pebbles.</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check text-primary-400"></i>
                    <span>Available in 12 natural color blends</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check text-primary-400"></i>
                    <span>Non-slip texture for safety</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check text-primary-400"></i>
                    <span>15-year expected lifespan</span>
                  </li>
                </ul>
                <Button className="w-full">Learn More</Button>
              </div>
              
              <div className="bg-primary-800 premium-border rounded-lg p-6 hover-lift">
                <h3 className="text-xl font-bold mb-3">PraetorianQuartz™</h3>
                <p className="mb-4">A premium quartz-based finish that delivers extraordinary durability and a silky-smooth texture.</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check text-primary-400"></i>
                    <span>Stain and chemical resistant</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check text-primary-400"></i>
                    <span>Smooth, comfortable finish</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check text-primary-400"></i>
                    <span>12-year expected lifespan</span>
                  </li>
                </ul>
                <Button className="w-full">Learn More</Button>
              </div>
              
              <div className="bg-primary-800 premium-border rounded-lg p-6 hover-lift">
                <h3 className="text-xl font-bold mb-3">PraetorianEpoxy™</h3>
                <p className="mb-4">A high-performance epoxy coating system ideal for commercial pools and demanding environments.</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check text-primary-400"></i>
                    <span>Ultra-durable commercial grade</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check text-primary-400"></i>
                    <span>Ideal for high-traffic pools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <i className="fas fa-check text-primary-400"></i>
                    <span>10-year expected lifespan</span>
                  </li>
                </ul>
                <Button className="w-full">Learn More</Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Pool Application Process</h2>
            
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-600"></div>
                
                {/* Timeline items */}
                <div className="relative z-10 space-y-16">
                  <div className="flex items-center flex-col md:flex-row gap-8">
                    <div className="md:w-1/2 md:text-right">
                      <h3 className="text-2xl font-bold mb-3">1. Surface Preparation</h3>
                      <p>Proper preparation is critical. We drain the pool, remove any existing coating, repair cracks or damage, and thoroughly clean the surface.</p>
                    </div>
                    <div className="bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center z-10">
                      <i className="fas fa-tools text-white"></i>
                    </div>
                    <div className="md:w-1/2"></div>
                  </div>
                  
                  <div className="flex items-center flex-col md:flex-row gap-8">
                    <div className="md:w-1/2"></div>
                    <div className="bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center z-10">
                      <i className="fas fa-brush text-white"></i>
                    </div>
                    <div className="md:w-1/2">
                      <h3 className="text-2xl font-bold mb-3">2. Priming</h3>
                      <p>We apply a specialized bonding agent to ensure proper adhesion between the pool surface and the coating system.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center flex-col md:flex-row gap-8">
                    <div className="md:w-1/2 md:text-right">
                      <h3 className="text-2xl font-bold mb-3">3. Base Coat Application</h3>
                      <p>Our technicians apply the primary coating material using specialized techniques to ensure even coverage and proper thickness.</p>
                    </div>
                    <div className="bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center z-10">
                      <i className="fas fa-layer-group text-white"></i>
                    </div>
                    <div className="md:w-1/2"></div>
                  </div>
                  
                  <div className="flex items-center flex-col md:flex-row gap-8">
                    <div className="md:w-1/2"></div>
                    <div className="bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center z-10">
                      <i className="fas fa-tint text-white"></i>
                    </div>
                    <div className="md:w-1/2">
                      <h3 className="text-2xl font-bold mb-3">4. Finishing & Curing</h3>
                      <p>After application, the coating needs to cure properly. We ensure optimal conditions and provide detailed care instructions for filling and using your newly coated pool.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-16">
              <Button className="bg-primary-500 hover:bg-primary-400 px-8 py-3 text-lg">
                Schedule Your Pool Coating
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Pools;