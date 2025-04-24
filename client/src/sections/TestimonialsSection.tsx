import { GradientHeading } from "@/components/ui/gradient-heading";

const TestimonialsSection = () => {
  return (
    <section className="py-20 dark:bg-[#121212] bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="dark:bg-gray-800/60 bg-gray-100/90 backdrop-blur-xl rounded-xl dark:border dark:border-gray-600/40 border border-gray-300 dark:shadow-[0_0_20px_rgba(255,255,255,0.25)] shadow-[0_0_20px_rgba(0,0,0,0.25)] py-8 px-6 md:px-10 mx-auto max-w-3xl mb-8 inline-block">
            <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="mixed">What Our Clients Say</GradientHeading>
            <p className="dark:text-[#a0a0a0] text-gray-700 max-w-2xl mx-auto">
              Hear from satisfied customers who trust Praetorian coatings to protect their valuable assets.
            </p>
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-8">
            <div className="dark:bg-gradient-to-r dark:from-gray-800/95 dark:to-gray-700/95 bg-gray-100/90 backdrop-blur-xl rounded-lg p-8 dark:border dark:border-gray-600/40 border border-gray-300 dark:shadow-[0_0_15px_rgba(255,255,255,0.25)] shadow-[0_0_15px_rgba(0,0,0,0.25)]">
              <div className="flex items-center mb-4">
                <div className="text-[#0070f3]">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
              </div>
              <p className="text-lg italic mb-6 dark:text-white text-gray-800">
                "After applying Praetorian's FireGuard Pro to our mountain cabin, we had peace of mind during wildfire season. 
                When fires swept through our area last summer, our home was one of the few left standing. 
                The investment literally saved our family home."
              </p>
              <div className="flex items-center">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80" 
                  alt="James Wilson" 
                  className="w-12 h-12 rounded-full object-cover mr-4 border-2 dark:border-gray-600 border-gray-300"
                />
                <div>
                  <GradientHeading level={4} className="text-lg" variant="fire">James Wilson</GradientHeading>
                  <div className="dark:text-[#a0a0a0] text-gray-600 text-sm">Big Bear Lake, CA</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            <button className="w-3 h-3 rounded-full bg-[#0070f3]"></button>
            <button className="w-3 h-3 rounded-full dark:bg-[#333333] bg-gray-300 hover:bg-[#0070f3]/50 transition-colors"></button>
            <button className="w-3 h-3 rounded-full dark:bg-[#333333] bg-gray-300 hover:bg-[#0070f3]/50 transition-colors"></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
