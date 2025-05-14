import { GradientHeading } from "@/components/ui/gradient-heading";
import { GradientButton } from "@/components/ui/gradient-button";
import { GradientText } from "@/components/ui/gradient-text";
import backgroundImg from "../assets_dir/images/praetorian-hero-final.png";

const ProductHistorySection = () => {
  return (
    <section 
      className="py-32 md:py-40 relative" 
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/60" style={{ zIndex: 1 }}></div>
      <div className="container mx-auto px-4 relative" style={{ zIndex: 2 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl mb-8 font-bold">
              <GradientText variant="fire" className="drop-shadow-[0_2px_4px_rgba(251,191,36,0.3)]">
                Space Technology Heritage
              </GradientText>
            </h2>
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
          
          <div className="bg-gradient-to-r from-gray-800/90 to-gray-700/90 rounded-lg overflow-hidden border-4 border-gray-600/40 shadow-[0_0_40px_rgba(255,255,255,0.3)] transform hover:scale-[1.02] transition-transform duration-300">
            <div className="p-8 border-b-2 border-gray-600/40">
              <h3 className="text-2xl md:text-3xl font-bold">
                <GradientText variant="blue" className="drop-shadow-[0_2px_4px_rgba(59,130,246,0.3)]">
                  Product Innovation Timeline
                </GradientText>
              </h3>
              <p className="text-gray-300 text-lg">Explore our history of protective coating innovations</p>
            </div>
            <div className="p-8 space-y-8">
              <div className="relative pl-10 border-l-3 border-gray-600/40 pb-10">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 shadow-[0_0_8px_rgba(255,255,255,0.25)]"></div>
                <div className="font-bold text-xl">
                  <GradientText variant="blue" className="drop-shadow-[0_1px_2px_rgba(59,130,246,0.3)]">
                    1989
                  </GradientText>
                </div>
                <div className="text-2xl font-semibold mb-1">
                  <GradientText variant="mixed" className="text-xl">NASA Technology Adaptation</GradientText>
                </div>
                <p className="text-gray-300 text-lg">First successful adaptation of NASA's 80-160 micron vacuum-filled ceramic microspheres (0.00543 W/cm²/K conductivity) for commercial fire protection applications</p>
              </div>
              
              <div className="relative pl-10 border-l-3 border-gray-600/40 pb-10">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 shadow-[0_0_8px_rgba(255,255,255,0.25)]"></div>
                <div className="font-bold text-xl">
                  <GradientText variant="blue" className="drop-shadow-[0_1px_2px_rgba(59,130,246,0.3)]">
                    1995
                  </GradientText>
                </div>
                <div className="text-2xl font-semibold mb-1">
                  <GradientText variant="mixed" className="text-xl">Class A Fire Rating</GradientText>
                </div>
                <p className="text-gray-300 text-lg">Achieved perfect 0/100 scores in ASTM E84 testing for both Flame Spread and Smoke Development with certified triple-component system</p>
              </div>
              
              <div className="relative pl-10 border-l-3 border-gray-600/40 pb-10">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 shadow-[0_0_8px_rgba(255,255,255,0.25)]"></div>
                <div className="font-bold text-xl">
                  <GradientText variant="blue" className="drop-shadow-[0_1px_2px_rgba(59,130,246,0.3)]">
                    2000s
                  </GradientText>
                </div>
                <div className="text-2xl font-semibold mb-1">
                  <GradientText variant="mixed" className="text-xl">Energy Efficiency Breakthrough</GradientText>
                </div>
                <p className="text-gray-300 text-lg">Independent facility documented 87% energy consumption reduction after Praetorian SmartCoat application, validating extreme efficiency claims</p>
              </div>
              
              <div className="relative pl-10 border-l-3 border-gray-600/40">
                <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 shadow-[0_0_8px_rgba(255,255,255,0.25)]"></div>
                <div className="font-bold text-xl">
                  <GradientText variant="blue" className="drop-shadow-[0_1px_2px_rgba(59,130,246,0.3)]">
                    2019
                  </GradientText>
                </div>
                <div className="text-2xl font-semibold mb-1">
                  <GradientText variant="mixed" className="text-xl">Long-Term Performance Validation</GradientText>
                </div>
                <p className="text-gray-300 text-lg">30-year inspection of original 1989 installations showed no deterioration and continued performance, confirming exceptional durability claims</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHistorySection;