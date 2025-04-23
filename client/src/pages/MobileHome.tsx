import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GradientButton } from "@/components/ui/gradient-button";
import { GradientHeading } from "@/components/ui/gradient-heading";
import mobileHomeBgImage from "@assets/mobile-homes-bg.jpg";

const MobileHome = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow relative">
        {/* Full-page mobile home background */}
        <div 
          className="fixed inset-0 z-0 bg-center bg-cover bg-no-repeat" 
          style={{ 
            backgroundImage: `url(${mobileHomeBgImage})`,
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
              <GradientHeading level={1} className="text-4xl md:text-5xl mb-6 glow-text" variant="mixed">Mobile Home Protection Solutions</GradientHeading>
              <p className="text-xl text-white mb-8">
                Extend the life and enhance the appearance of your mobile home with our specialized protective coatings. Shield your investment from the elements with our industry-leading solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="backdrop-blur-sm bg-primary-900/60 border-4 border-white rounded-xl p-8 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                <GradientHeading level={2} className="text-3xl mb-6" variant="mixed">Superior Protection Benefits</GradientHeading>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
                        <path d="M17 4a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2"></path>
                        <path d="M19 11h2m-1 -1v2"></path>
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Weather and UV Resistance</h3>
                      <p className="text-gray-100">Protects against harsh sun, rain, snow, and temperature fluctuations, preventing premature aging and deterioration.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Enhanced Energy Efficiency</h3>
                      <p className="text-gray-100">Our reflective coatings can reduce cooling costs by up to 30% by reflecting solar heat away from your home.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <path d="M3 17h1m16 0h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7m-9.7 5.7a4 4 0 1 1 8 0"></path>
                        <line x1="3" y1="21" x2="21" y2="21"></line>
                        <path d="M9.7 8.7a8 8 0 1 1 4.6 0"></path>
                        <path d="M12 3v5"></path>
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Leak Prevention & Waterproofing</h3>
                      <p className="text-gray-100">Seamless membrane creates an impenetrable barrier against water intrusion, protecting the structure from costly water damage.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-gradient-to-r from-orange-600 to-blue-500 rounded-full p-2 mt-1 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="12" r="5"></circle>
                        <circle cx="12" cy="12" r="9"></circle>
                      </svg>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-white">Extends Lifespan by 15+ Years</h3>
                      <p className="text-gray-100">Our protective coatings significantly extend the life of your mobile home's roof and exterior, providing long-term value.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <GradientButton variant="variant">
                    Schedule Free Assessment
                  </GradientButton>
                </div>
              </div>

              <div className="backdrop-blur-sm bg-primary-900/60 border-4 border-white rounded-xl p-8 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                <GradientHeading level={2} className="text-3xl mb-6" variant="mixed">Application Process</GradientHeading>
                <p className="mb-8 text-gray-100">Our comprehensive mobile home protection process delivers outstanding results</p>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-8 h-8 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                      <span className="text-lg font-bold text-white">1</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-white">Thorough Inspection & Assessment</h3>
                      <p className="text-gray-200">We evaluate your mobile home's current condition, identify problem areas, and create a customized protection plan.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-8 h-8 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                      <span className="text-lg font-bold text-white">2</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-white">Professional Surface Preparation</h3>
                      <p className="text-gray-200">Surfaces are thoroughly cleaned, repaired, and primed to ensure maximum adhesion and longevity of the protective coating.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-8 h-8 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                      <span className="text-lg font-bold text-white">3</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-white">Precision Application & Coverage</h3>
                      <p className="text-gray-200">Our certified technicians apply the specialized coating using advanced equipment for consistent, uniform coverage.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-r from-orange-600 to-blue-500 w-8 h-8 rounded-full flex items-center justify-center shadow-lg flex-shrink-0">
                      <span className="text-lg font-bold text-white">4</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1 text-white">Quality Inspection & Warranty</h3>
                      <p className="text-gray-200">Final inspection ensures every surface is properly protected, and we provide a comprehensive warranty on materials and workmanship.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="backdrop-blur-sm bg-primary-900/60 p-8 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)] mb-12">
              <GradientHeading level={2} className="text-3xl md:text-4xl text-center mb-12" variant="mixed">Mobile Home Protection Solutions</GradientHeading>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="backdrop-blur-sm bg-primary-800/80 border-4 border-white rounded-lg p-6 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-r from-orange-600 to-blue-500 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center text-white">Roof Protection</h3>
                  <p className="text-center text-gray-100">Seamless, waterproof membrane that reflects heat, prevents leaks, and extends your roof's lifespan by 15+ years. Available in multiple colors.</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-800/80 border-4 border-white rounded-lg p-6 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-r from-orange-600 to-blue-500 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <rect x="4" y="5" width="16" height="16" rx="2"></rect>
                      <line x1="16" y1="3" x2="16" y2="7"></line>
                      <line x1="8" y1="3" x2="8" y2="7"></line>
                      <line x1="4" y1="11" x2="20" y2="11"></line>
                      <line x1="10" y1="16" x2="14" y2="16"></line>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center text-white">Exterior Wall Coating</h3>
                  <p className="text-center text-gray-100">Durable, elastomeric coatings that flex with temperature changes while providing exceptional weather resistance and improved appearance.</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-800/80 border-4 border-white rounded-lg p-6 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-r from-orange-600 to-blue-500 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                      <path d="M5 4c-2.5 5 -2.5 10 0 16m14 -16c2.5 5 2.5 10 0 16m-10 -11h1c1.5 0 3 .5 3 2s-1.5 2 -3 2h-1"></path>
                      <path d="M9 16h2"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center text-white">Skirting & Foundation</h3>
                  <p className="text-center text-gray-100">Protective barriers that prevent moisture damage, pest intrusion, and heat loss while enhancing the structural integrity of your home.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto backdrop-blur-sm bg-primary-900/60 border-4 border-white rounded-xl p-8 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
              <GradientHeading level={2} className="text-3xl font-bold mb-8 text-center" variant="mixed">Why Choose Praetorian?</GradientHeading>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="backdrop-blur-sm bg-primary-800/60 border-4 border-white rounded-lg p-5 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                  <h3 className="text-xl font-bold mb-3 text-white">Specialized in Mobile Homes</h3>
                  <p className="text-gray-100">Our technicians are specifically trained in the unique requirements of mobile home protection, unlike general contractors who may lack this specialized expertise.</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-800/60 border-4 border-white rounded-lg p-5 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                  <h3 className="text-xl font-bold mb-3 text-white">Extended Warranty</h3>
                  <p className="text-gray-100">We stand behind our work with an industry-leading 15-year warranty on materials and workmanship, transferable to new owners if you sell your home.</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-800/60 border-4 border-white rounded-lg p-5 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                  <h3 className="text-xl font-bold mb-3 text-white">Eco-Friendly Solutions</h3>
                  <p className="text-gray-100">Our coatings are low-VOC and environmentally responsible, providing protection without harsh chemicals or harmful emissions.</p>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-800/60 border-4 border-white rounded-lg p-5 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                  <h3 className="text-xl font-bold mb-3 text-white">Financing Available</h3>
                  <p className="text-gray-100">Affordable monthly payment options make protecting your investment accessible, with no money down and interest-free periods available.</p>
                </div>
              </div>
              
              <div className="text-center">
                <GradientButton variant="variant">
                  Get Your Free Quote Today
                </GradientButton>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 relative z-10">
          <div className="container mx-auto">
            <div className="backdrop-blur-sm bg-primary-900/60 p-8 rounded-xl border-4 border-white shadow-[0_0_60px_rgba(255,255,255,0.4)]">
              <GradientHeading level={2} className="text-3xl md:text-4xl font-bold mb-12 text-center" variant="mixed">Customer Testimonials</GradientHeading>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="backdrop-blur-sm bg-primary-800/80 border-4 border-white rounded-lg p-6 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                  <div className="flex mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                  </div>
                  <p className="mb-4 italic text-white">"After applying Praetorian's roof coating, our energy bills dropped by almost 25%! The technicians were professional and finished the job in just two days. My mobile home looks better than it has in years."</p>
                  <div className="font-semibold text-orange-200">- David M., Phoenix, AZ</div>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-800/80 border-4 border-white rounded-lg p-6 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                  <div className="flex mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                  </div>
                  <p className="mb-4 italic text-white">"We had persistent leaks for years that other companies couldn't fix. Praetorian's specialized coating sealed everything perfectly. It's been through two monsoon seasons without a single leak. Worth every penny!"</p>
                  <div className="font-semibold text-orange-200">- Linda W., Tucson, AZ</div>
                </div>
                
                <div className="backdrop-blur-sm bg-primary-800/80 border-4 border-white rounded-lg p-6 hover:translate-y-[-5px] transition-transform duration-300 shadow-[0_0_60px_rgba(255,255,255,0.4)]">
                  <div className="flex mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path>
                    </svg>
                  </div>
                  <p className="mb-4 italic text-white">"The financing options made it possible for us to protect our home on a fixed income. The difference in interior temperature during summer is amazing, and the exterior looks like new. Their customer service was outstanding."</p>
                  <div className="font-semibold text-orange-200">- Robert & Susan K., Mesa, AZ</div>
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

export default MobileHome;