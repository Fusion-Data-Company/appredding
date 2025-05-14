import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black py-10 mt-10 border-t border-gray-800 relative z-20">
      <div className="container mx-auto px-4 relative z-30">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Department Contacts */}
          <div className="relative z-30">
            <h3 className="text-base font-bold mb-4 gradient-text-fire">Department Contacts</h3>
            <ul className="space-y-3">
              <li>
                <p className="text-gray-400 text-xs font-semibold">Orders:</p>
                <a href="mailto:orders@praetoriansmartcoat.com" className="text-white hover:text-amber-500 text-sm">
                  orders@praetoriansmartcoat.com
                </a>
              </li>
              <li>
                <p className="text-gray-400 text-xs font-semibold">Office:</p>
                <a href="mailto:office@praetoriansmartcoat.com" className="text-white hover:text-amber-500 text-sm">
                  office@praetoriansmartcoat.com
                </a>
              </li>
              <li>
                <p className="text-gray-400 text-xs font-semibold">Distributors:</p>
                <a href="mailto:distributors@praetoriansmartcoat.com" className="text-white hover:text-amber-500 text-sm">
                  distributors@praetoriansmartcoat.com
                </a>
              </li>
            </ul>
          </div>

          {/* Applications */}
          <div className="relative z-30">
            <h3 className="text-base font-bold mb-4 gradient-text-fire">Applications</h3>
            <ul className="space-y-3">
              <li>
                <a href="/fire-prevention" className="text-white hover:text-blue-400 text-sm">
                  Wildfire Protection
                </a>
              </li>
              <li>
                <a href="/marinas" className="text-white hover:text-blue-400 text-sm">
                  Marine
                </a>
              </li>
              <li>
                <a href="/pools" className="text-white hover:text-blue-400 text-sm">
                  Pool
                </a>
              </li>
              <li>
                <a href="/construction" className="text-white hover:text-blue-400 text-sm">
                  Construction
                </a>
              </li>
              <li>
                <a href="/mobile-home" className="text-white hover:text-blue-400 text-sm">
                  Mobile Home
                </a>
              </li>
              <li>
                <a href="/municipality" className="text-white hover:text-blue-400 text-sm">
                  Municipality
                </a>
              </li>
            </ul>
          </div>

          {/* Our Product */}
          <div className="relative z-30">
            <h3 className="text-base font-bold mb-4 gradient-text-mixed">Our Product</h3>
            <ul className="space-y-3">
              <li>
                <a href="/products" className="text-white hover:text-blue-400 text-sm">
                  Protective Coating
                </a>
              </li>
              <li>
                <a href="/products#benefits" className="text-white hover:text-blue-400 text-sm">
                  Product Benefits
                </a>
              </li>
              <li>
                <a href="/technology" className="text-white hover:text-blue-400 text-sm">
                  Performance Data
                </a>
              </li>
              <li>
                <a href="/technology#specs" className="text-white hover:text-blue-400 text-sm">
                  Technical Specifications
                </a>
              </li>
              <li>
                <a href="/documents/sds" className="text-white hover:text-blue-400 text-sm">
                  Safety Data Sheet
                </a>
              </li>
            </ul>
          </div>

          {/* Main Contact */}
          <div className="relative z-30">
            <h3 className="text-base font-bold mb-4 gradient-text-blue">Main Contact</h3>
            <ul className="space-y-3">
              <li>
                <p className="text-gray-400 text-xs font-semibold">General Information:</p>
                <a href="mailto:info@praetoriansmartcoat.com" className="text-white hover:text-amber-500 text-sm">
                  info@praetoriansmartcoat.com
                </a>
              </li>
              <li>
                <p className="text-gray-400 text-xs font-semibold">Management:</p>
                <a href="mailto:rob@praetoriansmartcoat.com" className="text-white hover:text-amber-500 text-sm">
                  rob@praetoriansmartcoat.com
                </a>
              </li>
              <li>
                <p className="text-gray-400 text-xs font-semibold">Phone:</p>
                <a href="tel:+19168096619" className="text-white hover:text-amber-500 text-sm">
                  (916) 809-6619
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white hover:text-blue-400 text-sm">
                  Contact Form
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center pt-4 border-t border-gray-800 relative z-30">
          <p className="text-gray-300 text-xs font-medium">
            &copy; {new Date().getFullYear()} Praetorian SmartCoat Solutions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
