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

            <div className="bg-primary-800 premium-border rounded-xl p-8 mb-16 shadow-premium-lg">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Certified Painter Network</h2>
                  <p className="mb-4">Find approved application professionals in your area</p>
                  
                  <div className="space-y-6 mt-8">
                    <div className="flex items-start gap-4">
                      <span className="bg-primary-600 rounded-full p-2 mt-1">
                        <i className="fas fa-certificate text-white"></i>
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Certified Professionals</h3>
                        <p>All network members complete our rigorous training and certification program</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="bg-primary-600 rounded-full p-2 mt-1">
                        <i className="fas fa-shield-alt text-white"></i>
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Workmanship Guarantee</h3>
                        <p>Applications completed by certified painters are backed by our quality guarantee</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="bg-primary-600 rounded-full p-2 mt-1">
                        <i className="fas fa-star text-white"></i>
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Verified Reviews</h3>
                        <p>Browse real customer feedback and ratings for each network member</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <span className="bg-primary-600 rounded-full p-2 mt-1">
                        <i className="fas fa-tools text-white"></i>
                      </span>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Specialized Equipment</h3>
                        <p>Access to proprietary application methods and technologies</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-primary-900 rounded-lg p-6 glass-effect">
                  <div className="aspect-square rounded-lg overflow-hidden relative flex items-center justify-center bg-primary-700">
                    <div className="text-center p-8">
                      <h3 className="text-2xl font-bold mb-4">Interactive painter network map</h3>
                      <p className="mb-6">Find certified painters in your area with our interactive map</p>
                      <Button className="bg-primary-500 hover:bg-primary-400">Find Nearby Painters</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button className="bg-primary-500 hover:bg-primary-400 text-white px-8 py-6 text-xl rounded-md">
                Join Our Network
              </Button>
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

        <section className="py-16">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Become a Certified Painter</h2>
            
            <div className="max-w-3xl mx-auto bg-primary-800 premium-border rounded-xl p-8">
              <p className="text-xl mb-6">
                Join our network of certified painters and grow your business with access to our premium clients and specialized products.
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
              
              <Button className="w-full bg-primary-500 hover:bg-primary-400 py-6 text-xl">
                Apply to Join Our Network
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PainterNetwork;