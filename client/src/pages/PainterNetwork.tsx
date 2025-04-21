import React from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

const PainterNetwork = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 glow-text">Professional Painter Network</h1>
              <p className="text-xl text-gray-200 mb-8">
                Our nationwide network of certified application professionals ensures your project is completed to the highest standards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
              <div className="bg-primary-800 premium-border rounded-xl overflow-hidden shadow-premium-lg order-2 md:order-1">
                <div className="p-6 border-b border-primary-700">
                  <h3 className="text-xl font-semibold">Certified Painter Network</h3>
                  <p className="text-gray-300">Find approved application professionals in your area</p>
                </div>
                <div className="h-[400px] bg-primary-700 relative">
                  <img 
                    src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Painter network map" 
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center bg-primary-800/90 rounded-lg p-6 max-w-xs premium-border">
                      <i className="fas fa-map-marker-alt text-4xl mb-3 text-primary-400"></i>
                      <p className="mb-4">Interactive painter network map would be displayed here</p>
                      <Button className="bg-primary-500 hover:bg-primary-400">
                        Find Nearby Painters
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-bold mb-6">Network Benefits</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary-600/20 rounded-full p-2 mt-1">
                      <i className="fas fa-certificate text-primary-400"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Certified Professionals</h3>
                      <p>All network members complete our rigorous training and certification program</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary-600/20 rounded-full p-2 mt-1">
                      <i className="fas fa-shield-alt text-primary-400"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Workmanship Guarantee</h3>
                      <p>Applications completed by certified painters are backed by our quality guarantee</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary-600/20 rounded-full p-2 mt-1">
                      <i className="fas fa-star text-primary-400"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Verified Reviews</h3>
                      <p>Browse real customer feedback and ratings for each network member</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="bg-primary-600/20 rounded-full p-2 mt-1">
                      <i className="fas fa-tools text-primary-400"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Specialized Equipment</h3>
                      <p>Access to proprietary application methods and technologies</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button className="bg-primary-500 hover:bg-primary-400">
                    Join Our Network
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-primary-800 premium-border rounded-xl p-8 glass-effect">
              <h2 className="text-3xl font-bold mb-8 text-center">Become a Certified Painter</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-lg mb-6">
                    Join our exclusive network of certified painters and grow your business with access to our premium clients and specialized products.
                  </p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3">
                      <i className="fas fa-check-circle text-primary-400"></i>
                      <p>Exclusive access to Praetorian's specialized protective coatings</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-check-circle text-primary-400"></i>
                      <p>Training and certification in specialized application techniques</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-check-circle text-primary-400"></i>
                      <p>Marketing support and qualified customer referrals</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <i className="fas fa-check-circle text-primary-400"></i>
                      <p>Technical support and ongoing professional development</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-primary-700 rounded-lg p-6">
                  <h3 className="text-xl font-bold mb-4">Apply to Join Our Network</h3>
                  
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Company Name</label>
                      <input 
                        type="text" 
                        className="w-full p-2 rounded bg-primary-800 border border-primary-600"
                        placeholder="Your company name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Contact Name</label>
                      <input 
                        type="text" 
                        className="w-full p-2 rounded bg-primary-800 border border-primary-600"
                        placeholder="Your name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <input 
                        type="email" 
                        className="w-full p-2 rounded bg-primary-800 border border-primary-600"
                        placeholder="Your email address"
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
                      <label className="block text-sm font-medium mb-1">Years in Business</label>
                      <select className="w-full p-2 rounded bg-primary-800 border border-primary-600">
                        <option value="">Select experience</option>
                        <option value="1-2">1-2 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="6-10">6-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    </div>
                    
                    <Button className="w-full bg-primary-500 hover:bg-primary-400">
                      Submit Application
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary-800/50">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Benefits of Working With Certified Painters</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-primary-800 premium-border rounded-lg p-6 hover-lift">
                <i className="fas fa-medal text-primary-400 text-4xl mb-4"></i>
                <h3 className="text-xl font-bold mb-3">Expert Application</h3>
                <p>Our certified painters have undergone extensive training on proper application techniques for all our specialized protective coatings.</p>
              </div>
              
              <div className="bg-primary-800 premium-border rounded-lg p-6 hover-lift">
                <i className="fas fa-clock text-primary-400 text-4xl mb-4"></i>
                <h3 className="text-xl font-bold mb-3">Timely Project Completion</h3>
                <p>Experience efficient project management and timely completion with our network of professional painters.</p>
              </div>
              
              <div className="bg-primary-800 premium-border rounded-lg p-6 hover-lift">
                <i className="fas fa-check-double text-primary-400 text-4xl mb-4"></i>
                <h3 className="text-xl font-bold mb-3">Quality Assurance</h3>
                <p>Every project completed by our certified network undergoes a rigorous quality check to ensure perfect application.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-[url('https://images.unsplash.com/photo-1604014056132-90240dc029ea?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center">
          <div className="container mx-auto">
            <div className="max-w-3xl mx-auto bg-primary-800/90 premium-border rounded-xl p-8 glass-effect">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Success Stories</h2>
              
              <div className="space-y-6">
                <div className="bg-primary-700/50 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-user text-white"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">James Martinez - Premier Painting Services</h3>
                      <p className="italic mb-4">"Joining the Praetorian Painter Network was the best business decision I've made. My revenue has increased by 35% in the first year, and I now have access to clients I couldn't reach before."</p>
                      <div className="flex">
                        <i className="fas fa-star text-yellow-400"></i>
                        <i className="fas fa-star text-yellow-400"></i>
                        <i className="fas fa-star text-yellow-400"></i>
                        <i className="fas fa-star text-yellow-400"></i>
                        <i className="fas fa-star text-yellow-400"></i>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-primary-700/50 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary-600 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-user text-white"></i>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Sarah Johnson - Coastal Protection Specialists</h3>
                      <p className="italic mb-4">"The training and certification process was thorough, but the rewards have been tremendous. We've become the go-to company for marine applications in our region thanks to Praetorian's support."</p>
                      <div className="flex">
                        <i className="fas fa-star text-yellow-400"></i>
                        <i className="fas fa-star text-yellow-400"></i>
                        <i className="fas fa-star text-yellow-400"></i>
                        <i className="fas fa-star text-yellow-400"></i>
                        <i className="fas fa-star text-yellow-400"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PainterNetwork;