import { GradientHeading } from "@/components/ui/gradient-heading";

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-[#1e1e1e]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="mixed">What Our Clients Say</GradientHeading>
          <p className="text-[#a0a0a0] max-w-2xl mx-auto">
            Hear from satisfied customers who trust Praetorian coatings to protect their valuable assets.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-8">
            <div className="bg-[#121212] rounded-lg p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="text-[#0070f3]">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
              <p className="text-lg italic mb-6">
                "After applying Praetorian's FireGuard Pro to our mountain cabin, we had peace of mind during wildfire season. 
                When fires swept through our area last summer, our home was one of the few left standing. 
                The investment literally saved our family home."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="James Wilson" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <GradientHeading level={4} className="text-lg" variant="fire">James Wilson</GradientHeading>
                  <div className="text-[#a0a0a0] text-sm">Big Bear Lake, CA</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            <button className="w-3 h-3 rounded-full bg-[#0070f3]"></button>
            <button className="w-3 h-3 rounded-full bg-[#333333] hover:bg-[#0070f3]/50 transition-colors"></button>
            <button className="w-3 h-3 rounded-full bg-[#333333] hover:bg-[#0070f3]/50 transition-colors"></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
