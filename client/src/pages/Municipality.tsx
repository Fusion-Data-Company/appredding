import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GradientButton } from "@/components/ui/gradient-button";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { Building, Droplets, ShieldCheck, Leaf, Clock, ParkingCircle, BadgeAlert, Landmark, PenTool, Blocks, Activity } from "lucide-react";

const MunicipalityPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow relative">
        {/* Full-page municipality background - will be added when available */}
        <div 
          className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat" 
          style={{ 
            backgroundImage: "url('/images/fire-water-planet-hq.jpg')",
            backgroundAttachment: 'fixed',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            opacity: 0.95
          }}
        />
        
        {/* Semi-transparent dark overlay to make text readable */}
        <div className="fixed inset-0 z-0 bg-black/50"></div>
        
        {/* Main content section */}
        <section className="py-16 md:py-24 relative z-10">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16 backdrop-blur-sm bg-primary-900/60 p-8 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)]">
              <GradientHeading level={1} className="text-4xl md:text-5xl mb-6 glow-text" variant="mixed">Municipal Infrastructure Solutions</GradientHeading>
              <p className="text-xl text-white mb-8">
                Advanced protective coatings designed specifically for municipal infrastructure, providing superior durability and protection for public facilities and critical city systems.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-8">
                <GradientHeading level={2} className="text-3xl font-bold mb-6" variant="mixed">Municipal-Grade Protection</GradientHeading>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1">
                      <Building className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-orange-300">Infrastructure Preservation</h3>
                      <p className="text-white">Our municipal coatings are engineered to extend the lifespan of public facilities and infrastructure while reducing maintenance costs.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1">
                      <Droplets className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-blue-300">Water-Treatment Compatible</h3>
                      <p className="text-white">Specialized coatings for water treatment facilities that are safe for potable water and meet all NSF/ANSI 61 certification requirements.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1">
                      <ShieldCheck className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-orange-300">Anti-Corrosion Technology</h3>
                      <p className="text-white">Our coatings provide exceptional resistance to corrosion, protecting metal infrastructure from degradation in harsh environments.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1">
                      <Leaf className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-blue-300">Environmentally Compliant</h3>
                      <p className="text-white">Eco-friendly formulations that meet or exceed local and federal environmental regulations while delivering professional-grade performance.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-8 flex flex-col">
                <GradientHeading level={2} className="text-3xl font-bold mb-6" variant="mixed">City-Wide Applications</GradientHeading>
                <p className="mb-4 text-white">Our municipal coatings can be customized for a wide range of public infrastructure:</p>
                <div className="grid md:grid-cols-2 gap-4 mb-6 flex-grow">
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-blue-400">✓</span>
                    <span>Water storage tanks</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-orange-400">✓</span>
                    <span>Wastewater facilities</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-blue-400">✓</span>
                    <span>Bridge structures</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-orange-400">✓</span>
                    <span>Public buildings</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-blue-400">✓</span>
                    <span>Traffic infrastructure</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-orange-400">✓</span>
                    <span>Park facilities</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-blue-400">✓</span>
                    <span>Transportation terminals</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-orange-400">✓</span>
                    <span>Parking structures</span>
                  </div>
                </div>
                <div className="mt-6">
                  <GradientButton variant="variant" className="w-full">
                    Request a Consultation
                  </GradientButton>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-8 mb-16">
              <GradientHeading level={2} className="text-2xl font-bold mb-6 text-center" variant="mixed">Municipal Infrastructure Protection</GradientHeading>
              <p className="text-white mb-8 text-center max-w-3xl mx-auto">
                Our specialized municipal coatings are designed to provide long-lasting protection for public infrastructure, 
                enhancing durability while reducing maintenance costs and extending service life. Engineered with advanced polymer technology, 
                these coatings create a resilient barrier against environmental damage, corrosion, and wear.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl p-6 border border-orange-500/30 shadow-lg">
                  <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-orange-300">Extended Lifecycle</h3>
                  <p className="text-white">Significantly extends the service life of municipal infrastructure, reducing replacement frequency and costs.</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl p-6 border border-blue-500/30 shadow-lg">
                  <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <ParkingCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-blue-300">Traffic-Rated Systems</h3>
                  <p className="text-white">Durable coatings designed to withstand heavy vehicle traffic and constant use in public facilities.</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl p-6 border border-orange-500/30 shadow-lg">
                  <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <BadgeAlert className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-orange-300">Emergency Ready</h3>
                  <p className="text-white">Specialized coatings for critical infrastructure that must remain operational during emergencies.</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl p-6 border border-blue-500/30 shadow-lg">
                  <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Landmark className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-blue-300">Historic Preservation</h3>
                  <p className="text-white">Solutions for protecting and preserving historic municipal structures and monuments.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 backdrop-blur-sm bg-primary-900/40 relative z-10">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <div className="bg-primary-900/60 backdrop-blur-xl rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] py-8 px-6 md:px-10 mx-auto max-w-3xl mb-8 inline-block">
                <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="mixed">Municipal Coating Systems</GradientHeading>
                <p className="text-[#a0a0a0] max-w-2xl mx-auto">
                  Specialized protection for public infrastructure, from water treatment facilities to transportation systems
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-6 hover:translate-y-[-5px] transition-transform duration-300">
                <div className="bg-gradient-to-r from-orange-600 to-blue-500 p-4 rounded-full inline-block mb-4">
                  <PenTool className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-300">Water Infrastructure</h3>
                <p className="text-white">NSF/ANSI 61 certified coating systems for water storage tanks, treatment facilities, and distribution systems that ensure water safety and infrastructure longevity.</p>
                <div className="mt-6">
                  <GradientButton variant="default" className="w-full">Learn More</GradientButton>
                </div>
              </div>
              
              <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-6 hover:translate-y-[-5px] transition-transform duration-300">
                <div className="bg-gradient-to-r from-orange-600 to-blue-500 p-4 rounded-full inline-block mb-4">
                  <Blocks className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-orange-300">Transportation Systems</h3>
                <p className="text-white">Protective coatings for bridges, highways, tunnels, and transit facilities that withstand extreme weather, heavy traffic, and environmental challenges.</p>
                <div className="mt-6">
                  <GradientButton variant="variant" className="w-full">Learn More</GradientButton>
                </div>
              </div>
              
              <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-6 hover:translate-y-[-5px] transition-transform duration-300">
                <div className="bg-gradient-to-r from-orange-600 to-blue-500 p-4 rounded-full inline-block mb-4">
                  <Activity className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-300">Public Facilities</h3>
                <p className="text-white">High-performance coatings for government buildings, recreational facilities, and public spaces that balance durability with aesthetic appeal.</p>
                <div className="mt-6">
                  <GradientButton variant="default" className="w-full">Learn More</GradientButton>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-8">
              <GradientHeading level={2} className="text-2xl font-bold mb-6 text-center" variant="mixed">Request a Municipal Infrastructure Assessment</GradientHeading>
              <p className="text-white text-center mb-8">Our experts will evaluate your public infrastructure and recommend tailored protective coating systems that maximize longevity and minimize lifecycle costs.</p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">Why Municipalities Choose Our Coatings</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">✓</span>
                      <span className="text-white">Budget-friendly lifecycle cost reduction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span className="text-white">Compliant with government regulations and standards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">✓</span>
                      <span className="text-white">Minimized facility downtime during application</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span className="text-white">Expert support from specification to completion</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">✓</span>
                      <span className="text-white">Extended warranty options for additional protection</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <input type="text" placeholder="First Name" className="w-full p-3 rounded-md bg-gray-800/90 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
                      </div>
                      <div>
                        <input type="text" placeholder="Last Name" className="w-full p-3 rounded-md bg-gray-800/90 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
                      </div>
                    </div>
                    <div>
                      <input type="email" placeholder="Email Address" className="w-full p-3 rounded-md bg-gray-800/90 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
                    </div>
                    <div>
                      <input type="text" placeholder="Municipality/Department" className="w-full p-3 rounded-md bg-gray-800/90 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50" />
                    </div>
                    <div>
                      <select className="w-full p-3 rounded-md bg-gray-800/90 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50">
                        <option value="">Select Infrastructure Type</option>
                        <option value="water">Water Infrastructure</option>
                        <option value="transportation">Transportation Systems</option>
                        <option value="buildings">Municipal Buildings</option>
                        <option value="recreation">Recreational Facilities</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <textarea placeholder="Project Details" rows={4} className="w-full p-3 rounded-md bg-gray-800/90 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-orange-500/50"></textarea>
                    </div>
                    <div>
                      <GradientButton variant="default" className="w-full py-3">Submit Request</GradientButton>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MunicipalityPage;