import { GradientHeading } from "@/components/ui/gradient-heading";
import { PremiumBadge } from "@/components/ui/premium-badge";
import backgroundImg from "../assets_dir/images/optimized/praetorian-background-new.png";

const TestimonialsSection = () => {
  return (
    <section 
      className="py-32 relative"
      style={{ 
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center center", // Standardized position
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundColor: "#111111",
        position: "relative",
        zIndex: 0
      }}
    >
      {/* Enhanced gradient overlay with better depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/70 to-black/80" style={{ zIndex: 1 }}></div>
      
      {/* Ambient glow effects */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-orange-500/5 filter blur-[120px] animate-pulse-slow" style={{ zIndex: 1 }}></div>
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-500/5 filter blur-[120px] animate-pulse-slow-delayed" style={{ zIndex: 1 }}></div>
      
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <div className="text-center mb-20">
          {/* Premium badge positioned completely outside the card */}
          <div className="relative w-full">
            <PremiumBadge>
              CLIENT TESTIMONIALS
            </PremiumBadge>
          </div>
          
          {/* Card with premium enterprise styling matching Video Section */}
          <div className="relative group mx-auto max-w-4xl mb-10 inline-block transform hover:scale-[1.02] transition-all duration-700 hover:-translate-y-1 hover:z-10">
            {/* Multiple layered background effects - matching Video Section */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-500"></div>
            
            {/* Main card container - enhanced to match Video Section */}
            <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl py-12 px-12 z-10 border border-orange-500/30 overflow-hidden group hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500">
              
              {/* Enhanced ambient glow */}
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-orange-500/20 rounded-full filter blur-[100px] opacity-70 animate-pulse-slow"></div>
              <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-500/25 rounded-full filter blur-[100px] opacity-70 animate-pulse-slow-delayed"></div>
              
              {/* Restored original corner accent squares as requested */}
              <div className="absolute top-4 left-4 w-12 h-12 z-10">
                <div className="absolute left-0 top-0 w-6 h-6 border-l-2 border-t-2 border-orange-500/40 rounded-tl-md"></div>
                <div className="absolute left-1 top-1 w-8 h-8 border-l border-t border-blue-500/30 rounded-tl-md"></div>
              </div>
              <div className="absolute top-4 right-4 w-12 h-12 z-10">
                <div className="absolute right-0 top-0 w-6 h-6 border-r-2 border-t-2 border-orange-500/40 rounded-tr-md"></div>
                <div className="absolute right-1 top-1 w-8 h-8 border-r border-t border-blue-500/30 rounded-tr-md"></div>
              </div>
              <div className="absolute bottom-4 right-4 w-12 h-12 z-10">
                <div className="absolute right-0 bottom-0 w-6 h-6 border-r-2 border-b-2 border-orange-500/40 rounded-br-md"></div>
                <div className="absolute right-1 bottom-1 w-8 h-8 border-r border-b border-amber-500/30 rounded-br-md"></div>
              </div>
              <div className="absolute bottom-4 left-4 w-12 h-12 z-10">
                <div className="absolute left-0 bottom-0 w-6 h-6 border-l-2 border-b-2 border-orange-500/40 rounded-bl-md"></div>
                <div className="absolute left-1 bottom-1 w-8 h-8 border-l border-b border-amber-500/30 rounded-bl-md"></div>
              </div>
              
              {/* Additional background gradient areas */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-20 z-5">
                <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/40 to-blue-500/40 rounded-tr-xl blur-[2px]"></div>
              </div>
              <div className="absolute bottom-0 left-0 w-32 h-32 opacity-20 z-5">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/40 to-orange-500/40 rounded-bl-xl blur-[2px]"></div>
              </div>
              
              {/* Background blur text */}
              <div className="absolute inset-0 flex justify-center items-center text-5xl font-bold tracking-tight text-orange-900/10 blur-[5px] scale-110 pointer-events-none">
                Client Testimonials
              </div>
              
              {/* Main title with premium gradient */}
              <h2 className="text-white
                drop-shadow-[0_0px_1px_rgba(251,113,36,0.2)] 
                [text-shadow:0_1px_1px_rgba(0,0,0,0.15),0_1px_5px_rgba(251,146,60,0.3)]
                text-4xl md:text-5xl font-bold relative z-30 mb-6">
                What Our Clients Say
              </h2>
              
              {/* Multiple text shadows for depth - reduced blur effects */}
              <div className="absolute inset-0 flex items-center justify-center text-5xl font-bold tracking-tight opacity-10 blur-[3px] text-orange-700/30 z-10 transform scale-105 pointer-events-none">
                What Our Clients Say
              </div>
              
              {/* Subtitle with enhanced styling */}
              <p className="text-gray-300 text-xl max-w-2xl mx-auto relative z-30">
                Hear from satisfied customers who trust Praetorian SmartCoat Solutions to protect their valuable assets.
              </p>
              
              {/* Decorative accent line */}
              <div className="absolute left-1/2 bottom-4 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-orange-500/70 to-transparent rounded-full"></div>
            </div>
            
            {/* Bottom reflection */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4/5 h-[1px] bg-gradient-to-r from-transparent via-orange-500/40 to-transparent rounded-full"></div>
          </div>
        </div>
        
        {/* Add keyframes for animations */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; transform: scale(0.9); }
            50% { opacity: 0.6; transform: scale(1.1); }
          }
          
          @keyframes pulse-slow-delayed {
            0%, 100% { opacity: 0.3; transform: scale(0.9); }
            50% { opacity: 0.6; transform: scale(1.1); }
            animation-delay: 1s;
          }
          
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}} />
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 gap-10">
            {/* Testimonial card with enterprise-grade styling - matching the new standard */}
            <div className="group relative transform hover:scale-[1.02] transition-all duration-700 hover:-translate-y-1 hover:z-10">
              {/* Multiple layered background effects - matching new standard */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600/40 via-blue-600/40 to-orange-600/40 rounded-xl blur-xl opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-1000 animate-pulse-slow"></div>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500/80 via-blue-500/80 to-orange-500/80 rounded-xl blur-md opacity-90 group-hover:opacity-100 transition-all duration-500"></div>
              
              {/* Main card container - enhanced to match new standard */}
              <div className="relative bg-gradient-to-br from-gray-900/95 via-gray-950/95 to-black backdrop-blur-xl rounded-xl p-10 md:p-12 lg:p-14 z-10 border border-orange-500/30 overflow-hidden hover:shadow-[0_0_25px_rgba(249,115,22,0.3)] transition-shadow duration-500">
                
                {/* Restored original corner accent squares as requested */}
                <div className="absolute top-4 left-4 w-12 h-12 z-10">
                  <div className="absolute left-0 top-0 w-6 h-6 border-l-2 border-t-2 border-orange-500/40 rounded-tl-md"></div>
                  <div className="absolute left-1 top-1 w-8 h-8 border-l border-t border-blue-500/30 rounded-tl-md"></div>
                </div>
                <div className="absolute top-4 right-4 w-12 h-12 z-10">
                  <div className="absolute right-0 top-0 w-6 h-6 border-r-2 border-t-2 border-orange-500/40 rounded-tr-md"></div>
                  <div className="absolute right-1 top-1 w-8 h-8 border-r border-t border-blue-500/30 rounded-tr-md"></div>
                </div>
                <div className="absolute bottom-4 left-4 w-12 h-12 z-10">
                  <div className="absolute left-0 bottom-0 w-6 h-6 border-l-2 border-b-2 border-orange-500/40 rounded-bl-md"></div>
                  <div className="absolute left-1 bottom-1 w-8 h-8 border-l border-b border-amber-500/30 rounded-bl-md"></div>
                </div>
                <div className="absolute bottom-4 right-4 w-12 h-12 z-10">
                  <div className="absolute right-0 bottom-0 w-6 h-6 border-r-2 border-b-2 border-orange-500/40 rounded-br-md"></div>
                  <div className="absolute right-1 bottom-1 w-8 h-8 border-r border-b border-amber-500/30 rounded-br-md"></div>
                </div>
                
                {/* Additional corner accent with gradient areas for emphasis */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-20 z-10">
                  <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/40 to-blue-500/40 rounded-tr-xl blur-[2px]"></div>
                </div>
                <div className="absolute bottom-0 left-0 w-32 h-32 opacity-20 z-10">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/40 to-orange-500/40 rounded-bl-xl blur-[2px]"></div>
                </div>
                
                {/* Rating stars with enhanced styling */}
                <div className="flex items-center mb-6">
                  <div className="text-yellow-400 text-2xl flex space-x-2">
                    <i className="fas fa-star drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"></i>
                    <i className="fas fa-star drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"></i>
                    <i className="fas fa-star drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"></i>
                    <i className="fas fa-star drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"></i>
                    <i className="fas fa-star drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]"></i>
                  </div>
                </div>
                
                {/* Testimonial text with enhanced styling */}
                <p className="text-lg sm:text-xl md:text-2xl italic mb-8 md:mb-10 text-gray-100 leading-relaxed relative">
                  {/* Quote symbol with gradient styling */}
                  <span className="absolute -top-2 -left-2 text-6xl text-white/20">"</span>
                  
                  After applying Praetorian SmartCoat's FireGuard Pro to our mountain cabin, we had peace of mind during wildfire season. 
                  When fires swept through our area last summer, our home was one of the few left standing. 
                  The investment literally saved our family home.
                  
                  {/* Quote end symbol with gradient styling */}
                  <span className="absolute -bottom-8 -right-2 text-6xl text-white/20">"</span>
                </p>
                
                {/* Author info with enhanced styling */}
                <div className="flex items-center">
                  {/* Profile image with enhanced border */}
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-orange-500/50 to-blue-500/50 blur-sm opacity-70"></div>
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" 
                      alt="James Wilson" 
                      className="w-16 h-16 rounded-full object-cover relative z-10 border-2 border-transparent"
                    />
                  </div>
                  
                  <div className="ml-6">
                    <GradientHeading level={4} className="text-xl mb-1" variant="mixed">James Wilson</GradientHeading>
                    <div className="text-gray-300 text-base">Big Bear Lake, CA</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation dots with enhanced styling */}
          <div className="flex justify-center mt-12 space-x-4">
            <button className="w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.7)]"></button>
            <button className="w-4 h-4 rounded-full bg-gray-700 hover:bg-gradient-to-r hover:from-orange-500/70 hover:to-amber-500/70 transition-all duration-300 hover:shadow-[0_0_10px_rgba(245,158,11,0.4)]"></button>
            <button className="w-4 h-4 rounded-full bg-gray-700 hover:bg-gradient-to-r hover:from-orange-500/70 hover:to-amber-500/70 transition-all duration-300 hover:shadow-[0_0_10px_rgba(245,158,11,0.4)]"></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
