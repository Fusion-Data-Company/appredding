import { GradientHeading } from "@/components/ui/gradient-heading";
import { GradientButton } from "@/components/ui/gradient-button";

const ProductHistorySection = () => {
  return (
    <section 
      className="py-20 relative" 
      style={{
        backgroundImage: "url('/images/optimized/diamond-plate-fire-water-2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Semi-transparent overlay for better readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="fire">Our Heritage of Protection</GradientHeading>
            <p className="mb-6 text-white">
              For over 40 years, Praetorian SmartCoat Solutions has been at the forefront of developing advanced coating technologies that protect what matters most.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-primary-400 mt-1 mr-3"></i>
                <span className="dark:text-white text-white">Founded by chemical engineers with a passion for protection</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-primary-400 mt-1 mr-3"></i>
                <span className="dark:text-white text-white">Pioneered environmentally-friendly protective solutions</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-primary-400 mt-1 mr-3"></i>
                <span className="dark:text-white text-white">Over 10,000 successful installations across North America</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-primary-400 mt-1 mr-3"></i>
                <span className="dark:text-white text-white">Industry-leading R&D laboratory and testing facility</span>
              </li>
            </ul>
            <GradientButton 
              size="lg"
              onClick={() => window.location.href="#contact"}
            >
              Learn About Our Story
            </GradientButton>
          </div>
          
          <div className="dark:bg-gradient-to-r dark:from-gray-800/90 dark:to-gray-700/90 bg-gradient-to-r from-[#e6e1d2]/90 to-[#f0ece0]/90 rounded-lg overflow-hidden dark:border dark:border-gray-600/40 border border-gray-300 dark:shadow-[0_0_20px_rgba(255,255,255,0.2)] shadow-[0_0_20px_rgba(0,0,0,0.15)]">
            <div className="p-6 dark:border-b dark:border-gray-600/40 border-b border-gray-300">
              <GradientHeading level={3} className="text-xl" variant="blue">Product Innovation Timeline</GradientHeading>
              <p className="dark:text-gray-300 text-gray-700">Explore our history of protective coating innovations</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="relative pl-8 dark:border-l-2 dark:border-gray-600/40 border-l-2 border-gray-400/60 pb-6">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-orange-400 to-orange-500 dark:shadow-[0_0_5px_rgba(255,255,255,0.15)] shadow-[0_0_5px_rgba(0,0,0,0.15)]"></div>
                <div className="font-bold">1978</div>
                <div className="text-lg font-semibold">Company Founded</div>
                <p className="dark:text-gray-300 text-gray-700">Praetorian SmartCoat Solutions established in Portland, Oregon</p>
              </div>
              
              <div className="relative pl-8 dark:border-l-2 dark:border-gray-600/40 border-l-2 border-gray-400/60 pb-6">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-blue-400 to-blue-500 dark:shadow-[0_0_5px_rgba(255,255,255,0.15)] shadow-[0_0_5px_rgba(0,0,0,0.15)]"></div>
                <div className="font-bold">1985</div>
                <div className="text-lg font-semibold">First Marine Coating</div>
                <p className="dark:text-gray-300 text-gray-700">Launched revolutionary salt-resistant technology</p>
              </div>
              
              <div className="relative pl-8 dark:border-l-2 dark:border-gray-600/40 border-l-2 border-gray-400/60 pb-6">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-red-400 to-red-500 dark:shadow-[0_0_5px_rgba(255,255,255,0.15)] shadow-[0_0_5px_rgba(0,0,0,0.15)]"></div>
                <div className="font-bold">1998</div>
                <div className="text-lg font-semibold">Fire Retardant Breakthrough</div>
                <p className="dark:text-gray-300 text-gray-700">Developed Class-A intumescent coating technology</p>
              </div>
              
              <div className="relative pl-8 dark:border-l-2 dark:border-gray-600/40 border-l-2 border-gray-400/60">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-purple-400 to-purple-500 dark:shadow-[0_0_5px_rgba(255,255,255,0.15)] shadow-[0_0_5px_rgba(0,0,0,0.15)]"></div>
                <div className="font-bold">2010 - Present</div>
                <div className="text-lg font-semibold">Smart Coating Systems</div>
                <p className="dark:text-gray-300 text-gray-700">Introduction of self-healing and indicator coating technologies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHistorySection;