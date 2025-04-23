import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GradientButton } from "@/components/ui/gradient-button";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { HardHat, Droplets, ShieldCheck, Leaf, Building, PaintBucket, Umbrella, HardDrive, Hammer, Ruler, Wrench } from "lucide-react";

const ConstructionPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow relative">
        {/* Full-page construction background */}
        <div 
          className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat" 
          style={{ 
            backgroundImage: "url('/images/construction-bg.jpg')",
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
              <GradientHeading level={1} className="text-4xl md:text-5xl mb-6 glow-text" variant="mixed">Construction Protection Systems</GradientHeading>
              <p className="text-xl text-white mb-8">
                Advanced protective coatings designed specifically for commercial and residential construction projects, providing superior durability and protection in the most challenging environments.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-8">
                <GradientHeading level={2} className="text-3xl font-bold mb-6" variant="mixed">Superior Construction Coatings</GradientHeading>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1">
                      <HardHat className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-orange-300">Industrial-Grade Durability</h3>
                      <p className="text-white">Our construction coatings are engineered to withstand extreme conditions, heavy traffic, and constant wear and tear.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1">
                      <Droplets className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-blue-300">Weather Resistance</h3>
                      <p className="text-white">Protect construction materials from moisture, UV damage, and temperature fluctuations with our advanced weather-resistant formulations.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1">
                      <ShieldCheck className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-orange-300">Chemical Resistance</h3>
                      <p className="text-white">Our coatings provide exceptional resistance to chemicals, solvents, oils, and other harmful substances commonly found in construction environments.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1">
                      <Leaf className="h-5 w-5 text-white" />
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-blue-300">Low VOC Formulations</h3>
                      <p className="text-white">Environmentally responsible coatings that meet or exceed regulatory requirements while delivering professional-grade performance.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-8 flex flex-col">
                <GradientHeading level={2} className="text-3xl font-bold mb-6" variant="mixed">Specialized Applications</GradientHeading>
                <p className="mb-4 text-white">Our construction coatings can be customized for a wide range of specialized applications:</p>
                <div className="grid md:grid-cols-2 gap-4 mb-6 flex-grow">
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-blue-400">✓</span>
                    <span>Commercial building exteriors</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-orange-400">✓</span>
                    <span>Industrial flooring systems</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-blue-400">✓</span>
                    <span>Parking structures</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-orange-400">✓</span>
                    <span>Bridge infrastructure</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-blue-400">✓</span>
                    <span>Roofing systems</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-orange-400">✓</span>
                    <span>Waterproofing membranes</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-blue-400">✓</span>
                    <span>Concrete protection</span>
                  </div>
                  <div className="flex items-center gap-2 text-white">
                    <span className="text-orange-400">✓</span>
                    <span>Steel structural coatings</span>
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
              <GradientHeading level={2} className="text-2xl font-bold mb-6 text-center" variant="mixed">Complete Construction Protection</GradientHeading>
              <p className="text-white mb-8 text-center max-w-3xl mx-auto">
                Our specialized construction coatings are designed to provide long-lasting protection for all types of building materials, 
                including concrete, steel, wood, and composite materials. Developed with advanced polymer technology, 
                these coatings create a durable barrier against moisture, chemicals, abrasion, and UV damage.
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl p-6 border border-orange-500/30 shadow-lg">
                  <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Building className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-orange-300">Structural Protection</h3>
                  <p className="text-white">Preserves structural integrity by protecting against environmental damage and corrosion.</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl p-6 border border-blue-500/30 shadow-lg">
                  <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <PaintBucket className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-blue-300">Decorative Finishes</h3>
                  <p className="text-white">Beautiful, long-lasting aesthetic options with unlimited color choices and textures.</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl p-6 border border-orange-500/30 shadow-lg">
                  <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <Umbrella className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-orange-300">Waterproofing</h3>
                  <p className="text-white">Prevents water infiltration and damage with seamless waterproof membrane technology.</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-900/80 rounded-xl p-6 border border-blue-500/30 shadow-lg">
                  <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                    <HardDrive className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-blue-300">Safety Compliance</h3>
                  <p className="text-white">Meets or exceeds building codes and safety standards for commercial construction.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 backdrop-blur-sm bg-primary-900/40 relative z-10">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <div className="bg-primary-900/60 backdrop-blur-xl rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] py-8 px-6 md:px-10 mx-auto max-w-3xl mb-8 inline-block">
                <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="mixed">Construction Coating Solutions</GradientHeading>
                <p className="text-[#a0a0a0] max-w-2xl mx-auto">
                  Specialized coatings for every construction application, from industrial facilities to residential buildings
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-6 hover:translate-y-[-5px] transition-transform duration-300">
                <div className="bg-gradient-to-r from-orange-600 to-blue-500 p-4 rounded-full inline-block mb-4">
                  <Hammer className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-300">Floor Coatings</h3>
                <p className="text-white">High-performance epoxy and polyurethane systems for concrete floors that provide chemical resistance, durability, and aesthetic appeal.</p>
                <div className="mt-6">
                  <GradientButton variant="default" className="w-full">Learn More</GradientButton>
                </div>
              </div>
              
              <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-6 hover:translate-y-[-5px] transition-transform duration-300">
                <div className="bg-gradient-to-r from-orange-600 to-blue-500 p-4 rounded-full inline-block mb-4">
                  <Ruler className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-orange-300">Wall Systems</h3>
                <p className="text-white">Protective and decorative wall coatings that offer superior durability, cleanability, and resistance to mold and mildew for long-lasting protection.</p>
                <div className="mt-6">
                  <GradientButton variant="variant" className="w-full">Learn More</GradientButton>
                </div>
              </div>
              
              <div className="backdrop-blur-sm bg-primary-900/60 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] p-6 hover:translate-y-[-5px] transition-transform duration-300">
                <div className="bg-gradient-to-r from-orange-600 to-blue-500 p-4 rounded-full inline-block mb-4">
                  <Wrench className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-blue-300">Metal Protection</h3>
                <p className="text-white">Advanced systems that provide exceptional protection for metal structures against corrosion, extending service life and reducing maintenance costs.</p>
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
              <GradientHeading level={2} className="text-2xl font-bold mb-6 text-center" variant="mixed">Request a Construction Coating Consultation</GradientHeading>
              <p className="text-white text-center mb-8">Our experts will evaluate your project requirements and recommend the ideal coating system for your needs.</p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-orange-500 to-blue-500 bg-clip-text text-transparent">Why Choose Our Construction Coatings?</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">✓</span>
                      <span className="text-white">Superior adhesion to various construction materials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span className="text-white">Extended service life compared to conventional coatings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">✓</span>
                      <span className="text-white">Reduced maintenance requirements and lifecycle costs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">✓</span>
                      <span className="text-white">Expert application by certified contractors</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-400 mt-1">✓</span>
                      <span className="text-white">Comprehensive warranty programs</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1 text-blue-300">First Name</label>
                        <input type="text" className="w-full p-2 bg-primary-900/90 rounded border border-blue-500/50" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1 text-orange-300">Last Name</label>
                        <input type="text" className="w-full p-2 bg-primary-900/90 rounded border border-orange-500/50" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-blue-300">Email</label>
                      <input type="email" className="w-full p-2 bg-primary-900/90 rounded border border-blue-500/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-orange-300">Phone</label>
                      <input type="tel" className="w-full p-2 bg-primary-900/90 rounded border border-orange-500/50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-blue-300">Project Description</label>
                      <textarea className="w-full p-2 bg-primary-900/90 rounded border border-blue-500/50 h-32"></textarea>
                    </div>
                    <GradientButton variant="variant" className="w-full">Submit Request</GradientButton>
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

export default ConstructionPage;