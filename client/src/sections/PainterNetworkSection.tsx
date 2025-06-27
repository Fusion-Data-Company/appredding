import { GradientHeading } from "@/components/ui/gradient-heading";

const PainterNetworkSection = () => {
  return (
    <section className="py-20 bg-[#121212]" id="painters">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-xl">
            <div className="p-6 border-b border-[#333333]">
              <GradientHeading level={3} className="text-xl" variant="mixed">Certified Painter Network</GradientHeading>
              <p className="text-[#a0a0a0]">Find approved application professionals in your area</p>
            </div>
            <div className="h-[400px] bg-gray-800 relative">
              <div className="w-full h-full bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 opacity-70 flex items-center justify-center">
                <div className="grid grid-cols-4 gap-4 p-8">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div 
                      key={i} 
                      className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center bg-black/60 rounded-lg p-6 max-w-xs">
                  <i className="fas fa-map-marker-alt text-4xl mb-3 text-[#ff9900]"></i>
                  <p className="mb-4">Interactive painter network map would be displayed here</p>
                  <button 
                    onClick={() => window.open('/contact', '_blank')}
                    className="bg-[#ff9900] hover:bg-orange-600 text-white font-medium py-2 px-4 rounded transition-colors"
                  >
                    Find Nearby Painters
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="mixed">Professional Painter Network</GradientHeading>
            <p className="text-[#a0a0a0] mb-6">
              Our nationwide network of certified application professionals ensures your project is completed to the highest standards.
            </p>
            <ul className="space-y-5 mb-8">
              <li className="flex items-start">
                <div className="bg-[#ff9900]/20 rounded-full p-2 mr-4 mt-1">
                  <i className="fas fa-certificate text-[#ff9900]"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Certified Professionals</h4>
                  <p className="text-[#a0a0a0] text-sm">All network members complete our rigorous training and certification program</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-[#ff9900]/20 rounded-full p-2 mr-4 mt-1">
                  <i className="fas fa-shield-alt text-[#ff9900]"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Workmanship Guarantee</h4>
                  <p className="text-[#a0a0a0] text-sm">Applications by certified painters are backed by our quality guarantee</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-[#ff9900]/20 rounded-full p-2 mr-4 mt-1">
                  <i className="fas fa-star text-[#ff9900]"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Verified Reviews</h4>
                  <p className="text-[#a0a0a0] text-sm">Browse real customer feedback and ratings for each network member</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-[#ff9900]/20 rounded-full p-2 mr-4 mt-1">
                  <i className="fas fa-tools text-[#ff9900]"></i>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Specialized Equipment</h4>
                  <p className="text-[#a0a0a0] text-sm">Access to proprietary application tools and technologies</p>
                </div>
              </li>
            </ul>
            <button 
              onClick={() => window.open('/contact', '_blank')}
              className="bg-[#ff9900] hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors inline-block"
            >
              Join Our Network
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PainterNetworkSection;
