import { GradientHeading } from "@/components/ui/gradient-heading";

const WildfireSection = () => {
  return (
    <section 
      className="py-20 relative" 
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1602444427614-3ce78ccfdfde?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="fire">Wildfire Defense Solutions</GradientHeading>
            <p className="mb-6">
              Protect your home and property from devastating wildfires with our Class-A fire retardant coatings. Proven effective in the most severe wildfire conditions.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-[#ff4d4d] mt-1 mr-3"></i>
                <span>Intumescent technology creates an insulating barrier when exposed to heat</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-[#ff4d4d] mt-1 mr-3"></i>
                <span>Exceeds California's stringent fire code requirements</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-[#ff4d4d] mt-1 mr-3"></i>
                <span>Available for all exterior surfaces including wood, metal, and concrete</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-[#ff4d4d] mt-1 mr-3"></i>
                <span>Insurance-approved for high-risk wildfire zones</span>
              </li>
            </ul>
            <a 
              href="#contact" 
              className="bg-[#ff4d4d] hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg transition-colors inline-block"
            >
              Request Wildfire Assessment
            </a>
          </div>
          
          <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-lg">
            <div className="p-6 border-b border-[#333333]">
              <GradientHeading level={3} className="text-xl" variant="fire">Wildfire Risk Map</GradientHeading>
              <p className="text-[#a0a0a0]">View wildfire risk zones in your area</p>
            </div>
            <div className="h-[350px] bg-gray-800 relative">
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="Wildfire risk map" 
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-6">
                  <i className="fas fa-map-marked-alt text-4xl mb-3 text-[#ff4d4d]"></i>
                  <p>Interactive wildfire risk map would be displayed here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WildfireSection;
