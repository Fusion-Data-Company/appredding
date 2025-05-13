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
            <GradientHeading level={2} className="text-4xl md:text-5xl lg:text-6xl mb-8" variant="fire">Space Technology Heritage</GradientHeading>
            <p className="mb-8 text-white text-xl leading-relaxed">
              Praetorian SmartCoat's foundation is built upon NASA space shuttle thermal protection technology, utilizing 80-160 micron vacuum-filled ceramic microspheres in a specialized elastomeric matrix with 156% flexibility. Each microsphere contains a vacuum void that creates a physical heat traversal impossibility (0.00543 W/cm²/K conductivity) in our triple-component system, addressing radiation, conduction, and convection simultaneously while providing Class A fire protection.
            </p>
            <ul className="space-y-5 mb-10">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-primary-400 mt-1 mr-4 text-2xl"></i>
                <span className="dark:text-white text-white text-lg">Developed from NASA space shuttle ceramic technology utilizing millions of vacuum-filled ceramic microspheres with thermal conductivity of just 0.00543 W/cm²/K</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-primary-400 mt-1 mr-4 text-2xl"></i>
                <span className="dark:text-white text-white text-lg">Original applications from 1989 still performing perfectly with only 1% reflectivity degradation when inspected in 2019, outperforming competing products that lose 10-20% reflectivity in just 3 years</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-primary-400 mt-1 mr-4 text-2xl"></i>
                <span className="dark:text-white text-white text-lg">US Air Force tests in Arizona demonstrated metal buildings maintaining 85°F interior temperature while ambient temperatures reached 111-113°F, with coatings demonstrating solar reflectivity of 89% and thermal emissivity of 89%, effectively blocking 95% of solar radiation</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-primary-400 mt-1 mr-4 text-2xl"></i>
                <span className="dark:text-white text-white text-lg">Multi-certified with Class A fire ratings (0/100 flame spread, 0/100 smoke development), Cool Roof Rating Council verification (89% reflection, 89% emittance), and American Bureau of Shipping (ABS) approval</span>
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
                <div className="font-bold text-xl">1989</div>
                <div className="text-2xl font-semibold mb-1">NASA Technology Adaptation</div>
                <p className="dark:text-gray-300 text-gray-700 text-lg">First successful adaptation of NASA's 80-160 micron vacuum-filled ceramic microspheres (0.00543 W/cm²/K conductivity) for commercial fire protection applications</p>
              </div>
              
              <div className="relative pl-10 dark:border-l-3 dark:border-gray-600/40 border-l-3 border-gray-400/60 pb-10">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-blue-400 to-blue-500 dark:shadow-[0_0_8px_rgba(255,255,255,0.25)] shadow-[0_0_8px_rgba(0,0,0,0.25)]"></div>
                <div className="font-bold text-xl">1995</div>
                <div className="text-2xl font-semibold mb-1">Class A Fire Rating</div>
                <p className="dark:text-gray-300 text-gray-700 text-lg">Achieved perfect 0/100 scores in ASTM E84 testing for both Flame Spread and Smoke Development with certified triple-component system</p>
              </div>
              
              <div className="relative pl-10 dark:border-l-3 dark:border-gray-600/40 border-l-3 border-gray-400/60 pb-10">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-red-400 to-red-500 dark:shadow-[0_0_8px_rgba(255,255,255,0.25)] shadow-[0_0_8px_rgba(0,0,0,0.25)]"></div>
                <div className="font-bold text-xl">2000s</div>
                <div className="text-2xl font-semibold mb-1">Energy Efficiency Breakthrough</div>
                <p className="dark:text-gray-300 text-gray-700 text-lg">Independent facility documented 87% energy consumption reduction after Praetorian SmartCoat application, validating extreme efficiency claims</p>
              </div>
              
              <div className="relative pl-10 dark:border-l-3 dark:border-gray-600/40 border-l-3 border-gray-400/60">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full dark:bg-gradient-to-r dark:from-gray-700 dark:to-gray-600 bg-gradient-to-r from-purple-400 to-purple-500 dark:shadow-[0_0_8px_rgba(255,255,255,0.25)] shadow-[0_0_8px_rgba(0,0,0,0.25)]"></div>
                <div className="font-bold text-xl">2019</div>
                <div className="text-2xl font-semibold mb-1">Long-Term Performance Validation</div>
                <p className="dark:text-gray-300 text-gray-700 text-lg">30-year inspection of original 1989 installations showed no deterioration and continued performance, confirming exceptional durability claims</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHistorySection;