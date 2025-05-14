import { GradientHeading } from "@/components/ui/gradient-heading";
import backgroundImg from "../assets_dir/images/optimized/praetorian-background-new.png";

const TestimonialsSection = () => {
  return (
    <section 
      className="py-32 relative"
      style={{ 
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center top", 
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundColor: "#111111",
        position: "relative",
        zIndex: 0
      }}
    >
      {/* Semi-transparent overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/70" style={{ zIndex: 1 }}></div>
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <div className="text-center mb-20">
          <div className="bg-gray-800/60 backdrop-blur-xl rounded-xl border-0 premium-gradient-border-bright shadow-[0_0_40px_rgba(255,255,255,0.25)] py-12 px-12 mx-auto max-w-4xl mb-10 inline-block">
            <GradientHeading level={2} className="text-4xl md:text-5xl mb-6" variant="fire">What Our Clients Say</GradientHeading>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Hear from satisfied customers who trust Praetorian SmartCoat Solutions to protect their valuable assets.
            </p>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 gap-10">
            <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 backdrop-blur-xl rounded-lg p-10 md:p-12 lg:p-14 border-4 border-gray-600/40 shadow-[0_0_40px_rgba(255,255,255,0.25)]">
              <div className="flex items-center mb-6">
                <div className="text-amber-400 text-2xl flex space-x-2">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
              <p className="text-lg sm:text-xl md:text-2xl italic mb-8 md:mb-10 text-white leading-relaxed">
                "After applying Praetorian SmartCoat's FireGuard Pro to our mountain cabin, we had peace of mind during wildfire season. 
                When fires swept through our area last summer, our home was one of the few left standing. 
                The investment literally saved our family home."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="James Wilson" 
                  className="w-16 h-16 rounded-full object-cover mr-6 border-4 border-gray-600 shadow-lg"
                />
                <div>
                  <GradientHeading level={4} className="text-xl mb-1" variant="fire">James Wilson</GradientHeading>
                  <div className="text-gray-300 text-base">Big Bear Lake, CA</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-12 space-x-4">
            <button className="w-4 h-4 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></button>
            <button className="w-4 h-4 rounded-full bg-gray-600 hover:bg-amber-500/60 transition-colors shadow-md"></button>
            <button className="w-4 h-4 rounded-full bg-gray-600 hover:bg-amber-500/60 transition-colors shadow-md"></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
