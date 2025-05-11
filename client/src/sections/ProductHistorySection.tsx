import { GradientHeading } from "@/components/ui/gradient-heading";
import { GradientButton } from "@/components/ui/gradient-button";

const ProductHistorySection = () => {
  return (
    <section 
      className="py-32 md:py-40 relative" 
      style={{
        backgroundImage: "url('/images/optimized/diamond-plate-fire-water-2.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh"
      }}
    >
      {/* Semi-transparent overlay for better readability */}
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <GradientHeading level={2} className="text-4xl md:text-5xl lg:text-6xl mb-8" variant="fire">Our Heritage of Protection</GradientHeading>
            <p className="mb-8 text-white text-xl leading-relaxed">
              For over 40 years, Praetorian SmartCoat Solutions has been at the forefront of developing advanced coating technologies that protect what matters most.
            </p>
            <ul className="space-y-5 mb-10">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-primary-400 mt-1 mr-4 text-2xl"></i>
                <span className="dark:text-white text-white text-lg">Founded by chemical engineers with a passion for protection</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-primary-400 mt-1 mr-4 text-2xl"></i>
                <span className="dark:text-white text-white text-lg">Pioneered environmentally-friendly protective solutions</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-primary-400 mt-1 mr-4 text-2xl"></i>
                <span className="dark:text-white text-white text-lg">Over 10,000 successful installations across North America</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-primary-400 mt-1 mr-4 text-2xl"></i>
                <span className="dark:text-white text-white text-lg">Industry-leading R&D laboratory and testing facility</span>
              </li>
            </ul>
            <GradientButton 
              size="lg"
              className="text-xl px-8 py-4"
              onClick={() => window.location.href="#contact"}
            >
              Learn About Our Story
            </GradientButton>
          </div>
          
          <div className="dark:bg-gradient-to-r dark:from-gray-800/90 dark:to-gray-700/90 bg-gradient-to-r from-[#e6e1d2]/90 to-[#f0ece0]/90 rounded-lg overflow-hidden dark:border-4 dark:border-white/40 border-4 border-gray-300 dark:shadow-[0_0_40px_rgba(255,255,255,0.3)] shadow-[0_0_30px_rgba(0,0,0,0.2)] transform hover:scale-[1.02] transition-transform duration-300">
            <div className="p-8 dark:border-b-2 dark:border-gray-600/40 border-b-2 border-gray-300">
              <GradientHeading level={3} className="text-2xl md:text-3xl" variant="blue">Product Innovation Timeline</GradientHeading>
              <p className="dark:text-gray-300 text-gray-700 text-lg">Explore our history of protective coating innovations</p>
            </div>
            <div className="p-8 space-y-8">
              <div className="relative pl-10 dark:border-l-3 dark:border-gray-600/40 border-l-3 border-gray-400/60 pb-10">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-orange-400 to-orange-500 dark:shadow-[0_0_8px_rgba(255,255,255,0.25)] shadow-[0_0_8px_rgba(0,0,0,0.25)]"></div>
                <div className="font-bold text-xl">1978</div>
                <div className="text-2xl font-semibold mb-1">Company Founded</div>
                <p className="dark:text-gray-300 text-gray-700 text-lg">Praetorian SmartCoat Solutions established in Portland, Oregon</p>
              </div>
              
              <div className="relative pl-10 dark:border-l-3 dark:border-gray-600/40 border-l-3 border-gray-400/60 pb-10">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-blue-400 to-blue-500 dark:shadow-[0_0_8px_rgba(255,255,255,0.25)] shadow-[0_0_8px_rgba(0,0,0,0.25)]"></div>
                <div className="font-bold text-xl">1985</div>
                <div className="text-2xl font-semibold mb-1">First Marine Coating</div>
                <p className="dark:text-gray-300 text-gray-700 text-lg">Launched revolutionary salt-resistant technology</p>
              </div>
              
              <div className="relative pl-10 dark:border-l-3 dark:border-gray-600/40 border-l-3 border-gray-400/60 pb-10">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-red-400 to-red-500 dark:shadow-[0_0_8px_rgba(255,255,255,0.25)] shadow-[0_0_8px_rgba(0,0,0,0.25)]"></div>
                <div className="font-bold text-xl">1998</div>
                <div className="text-2xl font-semibold mb-1">Fire Retardant Breakthrough</div>
                <p className="dark:text-gray-300 text-gray-700 text-lg">Developed Class-A intumescent coating technology</p>
              </div>
              
              <div className="relative pl-10 dark:border-l-3 dark:border-gray-600/40 border-l-3 border-gray-400/60">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-purple-400 to-purple-500 dark:shadow-[0_0_8px_rgba(255,255,255,0.25)] shadow-[0_0_8px_rgba(0,0,0,0.25)]"></div>
                <div className="font-bold text-xl">2010 - Present</div>
                <div className="text-2xl font-semibold mb-1">Smart Coating Systems</div>
                <p className="dark:text-gray-300 text-gray-700 text-lg">Introduction of self-healing and indicator coating technologies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHistorySection;