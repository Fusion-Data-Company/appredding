const Footer = () => {
  return (
    <footer className="bg-[#1e1e1e] border-t border-[#333333] pt-12 pb-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-semibold mb-4">Praetorian Coatings</h3>
            <p className="text-[#a0a0a0] mb-6">
              Industry-leading protective coatings engineered to defend against the elements,
              preserve structures, and provide peace of mind.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Applications</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors">
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
            <h3 className="text-lg font-semibold mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors">
                  FireGuard Pro
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors">
                  MarineShield Ultra
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors">
                  AquaGuard
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors">
                  ConstructShield
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors">
                  WeatherGuard
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors">
                  Safety Data Sheets
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
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

        <div className="pt-6 border-t border-[#333333] text-center text-[#a0a0a0] text-sm">
          <p>&copy; {new Date().getFullYear()} Praetorian Protective Coatings. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors">
              Site Map
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
