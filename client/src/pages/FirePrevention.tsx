import React from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

const FirePrevention = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 glow-text">Wildfire Defense Solutions</h1>
              <p className="text-xl text-gray-200 mb-8">
                Protect your home and property from devastating wildfires with our Class-A fire retardant coatings. Proven effective in the most severe wildfire conditions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div>
                <h2 className="text-3xl font-bold mb-6">Advanced Protection Technology</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-fire-alt text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Intumescent technology creates an insulating barrier when exposed to high heat</h3>
                      <p>Our proprietary formulations create an expanding carbonaceous foam layer that protects underlying surfaces during fire exposure.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-certificate text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Exceeds California's stringent fire code requirements</h3>
                      <p>Rigorously tested and certified to meet or exceed the most demanding fire protection standards in California and other high-risk regions.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-house-damage text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Available for all exterior surfaces including wood, metal, and concrete</h3>
                      <p>Versatile protection systems designed for virtually any building material, providing comprehensive wildfire defense for your entire property.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-shield-alt text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Insurance-approved for high-risk wildfire zones</h3>
                      <p>Many insurance providers offer premium discounts for homes protected with our certified wildfire defense coatings.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button className="bg-primary-500 hover:bg-primary-400">
                    Request Wildfire Assessment
                  </Button>
                </div>
              </div>

              <div className="bg-primary-800 premium-border rounded-xl p-8 shadow-premium-lg">
                <h2 className="text-3xl font-bold mb-6">Wildfire Risk Map</h2>
                <p className="mb-8">View wildfire risk zones in your area</p>
                
                <div className="aspect-square rounded-lg overflow-hidden relative flex items-center justify-center bg-primary-700">
                  <div className="text-center p-8">
                    <h3 className="text-2xl font-bold mb-4">Interactive wildfire risk map</h3>
                    <p className="mb-6">Evaluate your property's risk level and explore protection options tailored to your specific needs</p>
                    <Button className="bg-primary-500 hover:bg-primary-400">Check Your Risk Level</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary-800/50">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Our Wildfire Protection Process</h2>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="bg-primary-800 premium-border rounded-lg p-6 hover-lift">
                <div className="bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Property Assessment</h3>
                <p className="text-center">We evaluate your property's specific risks, vulnerabilities, and protection requirements.</p>
              </div>
              
              <div className="bg-primary-800 premium-border rounded-lg p-6 hover-lift">
                <div className="bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Customized Plan</h3>
                <p className="text-center">We develop a comprehensive protection strategy tailored to your property's unique needs.</p>
              </div>
              
              <div className="bg-primary-800 premium-border rounded-lg p-6 hover-lift">
                <div className="bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Professional Application</h3>
                <p className="text-center">Our certified applicators ensure proper coverage and adherence to all safety standards.</p>
              </div>
              
              <div className="bg-primary-800 premium-border rounded-lg p-6 hover-lift">
                <div className="bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center mb-6 mx-auto">
                  <span className="text-2xl font-bold">4</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Ongoing Protection</h3>
                <p className="text-center">We provide maintenance recommendations and renewal schedules to ensure continued protection.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto bg-primary-800 premium-border rounded-xl p-8 glass-effect">
              <h2 className="text-3xl font-bold mb-6 text-center">Did You Know?</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="text-5xl font-bold text-primary-400 mb-2">90%</div>
                  <p className="text-xl">of homes destroyed in wildfires ignite due to embers landing on flammable surfaces, not direct flames</p>
                </div>
                
                <div>
                  <div className="text-5xl font-bold text-primary-400 mb-2">30%</div>
                  <p className="text-xl">reduction in fire insurance premiums may be available for homes with certified fire-resistant coatings</p>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button className="bg-primary-500 hover:bg-primary-400 px-8">
                  Get Protected Today
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 bg-primary-800/50">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Testimonials</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-primary-900/80 premium-border rounded-lg p-6">
                <div className="flex mb-4">
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                </div>
                <p className="mb-4 italic">"Our home survived the Canyon Fire when many others didn't. The Praetorian coating literally saved our house when embers landed on our roof. Worth every penny."</p>
                <div className="font-semibold">- Michael R., Santa Barbara, CA</div>
              </div>
              
              <div className="bg-primary-900/80 premium-border rounded-lg p-6">
                <div className="flex mb-4">
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                </div>
                <p className="mb-4 italic">"Not only did we get excellent fire protection, but our insurance company gave us a significant discount on our premium. The protection has already paid for itself."</p>
                <div className="font-semibold">- Jennifer L., Paradise, CA</div>
              </div>
              
              <div className="bg-primary-900/80 premium-border rounded-lg p-6">
                <div className="flex mb-4">
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                  <i className="fas fa-star text-yellow-400"></i>
                </div>
                <p className="mb-4 italic">"The peace of mind is priceless. Living in a high-risk area, we now sleep better knowing our home has the best protection available against wildfires."</p>
                <div className="font-semibold">- Robert T., Boulder, CO</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FirePrevention;