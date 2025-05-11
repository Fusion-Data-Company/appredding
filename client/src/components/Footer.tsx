import { GradientHeading } from "@/components/ui/gradient-heading";
import StoneTextureBackground from "@/components/ui/stone-texture-background";

const Footer = () => {
  return (
    <footer className="relative border-t dark:border-[#333333] border-gray-300 pt-12 pb-6 mt-auto overflow-hidden">
      {/* Stone texture background with frosted glass overlay */}
      <StoneTextureBackground 
        className="absolute inset-0" 
        frostGlassOpacity={0.25}
      />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-[url('/src/assets_dir/images/noise.svg')] opacity-[0.04] bg-repeat bg-[length:200px_200px] mix-blend-overlay pointer-events-none animate-subtle-pulse"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <GradientHeading level={3} className="text-xl mb-4" variant="mixed">Praetorian SmartCoat</GradientHeading>
            <p className="dark:text-[#a0a0a0] text-gray-700 mb-6">
              Industry-leading protective coatings engineered to defend against the elements,
              preserve structures, and provide peace of mind.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="dark:text-[#a0a0a0] text-gray-600 hover:text-[#0070f3] transition-colors"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="dark:text-[#a0a0a0] text-gray-600 hover:text-[#0070f3] transition-colors"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="dark:text-[#a0a0a0] text-gray-600 hover:text-[#0070f3] transition-colors"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="dark:text-[#a0a0a0] text-gray-600 hover:text-[#0070f3] transition-colors"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div>
            <GradientHeading level={3} className="text-lg mb-4" variant="fire">Applications</GradientHeading>
            <ul className="space-y-2">
              <li>
                <a href="#" className="dark:text-[#a0a0a0] text-gray-600 hover:text-[#0070f3] transition-colors">
                  Wildfire Protection
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors">
                  Marine
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors">
                  Pool
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors">
                  Construction
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors">
                  Mobile Home
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors">
                  Municipality
                </a>
              </li>
            </ul>
          </div>

          <div>
            <GradientHeading level={3} className="text-lg mb-4" variant="mixed">Our Product</GradientHeading>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors">
                  Protective Coating
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors">
                  Product Benefits
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors">
                  Performance Data
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors">
                  Technical Specifications
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors">
                  Safety Data Sheet
                </a>
              </li>
            </ul>
          </div>

          <div>
            <GradientHeading level={3} className="text-lg mb-4" variant="blue">Resources</GradientHeading>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors">
                  Painter Network
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors">
                  Application Guides
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors">
                  CRM Portal
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors">
                  Coverage Calculator
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t dark:border-[#333333] border-gray-300 text-center dark:text-[#a0a0a0] text-gray-700 text-sm relative">
          <p className="dark:text-gray-300 text-gray-700">&copy; {new Date().getFullYear()} Praetorian SmartCoat Solutions. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="dark:text-gray-300 text-gray-700 hover:text-[#0070f3] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="dark:text-gray-300 text-gray-700 hover:text-[#0070f3] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="dark:text-gray-300 text-gray-700 hover:text-[#0070f3] transition-colors">
              Site Map
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
