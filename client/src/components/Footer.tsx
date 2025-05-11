import { GradientHeading } from "@/components/ui/gradient-heading";
import StoneTextureBackground from "@/components/ui/stone-texture-background";

const Footer = () => {
  return (
    <footer className="relative border-t dark:border-[#333333] border-gray-300 pt-6 pb-3 mt-16 overflow-hidden">
      {/* Stone texture background with frosted glass overlay */}
      <StoneTextureBackground 
        className="absolute inset-0" 
        frostGlassOpacity={0.25}
      />
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-[url('/src/assets_dir/images/noise.svg')] opacity-[0.04] bg-repeat bg-[length:200px_200px] mix-blend-overlay pointer-events-none animate-subtle-pulse"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <GradientHeading level={3} className="text-base mb-2" variant="fire">Department Contacts</GradientHeading>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-amber-500 mr-1 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                <div>
                  <p className="text-gray-400 font-semibold mb-0 text-xs">Orders:</p>
                  <a href="mailto:orders@praetoriansmartcoat.com" className="text-[#a0a0a0] hover:text-amber-500 transition-colors break-all text-sm">
                    orders@praetoriansmartcoat.com
                  </a>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="text-amber-500 mr-1 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                <div>
                  <p className="text-gray-400 font-semibold mb-0 text-xs">Office:</p>
                  <a href="mailto:office@praetoriansmartcoat.com" className="text-[#a0a0a0] hover:text-amber-500 transition-colors break-all text-sm">
                    office@praetoriansmartcoat.com
                  </a>
                </div>
              </li>
              
              <li className="flex items-start">
                <span className="text-amber-500 mr-1 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                <div>
                  <p className="text-gray-400 font-semibold mb-0 text-xs">Distributors:</p>
                  <a href="mailto:distributors@praetoriansmartcoat.com" className="text-[#a0a0a0] hover:text-amber-500 transition-colors break-all text-sm">
                    distributors@praetoriansmartcoat.com
                  </a>
                </div>
              </li>
            </ul>
            <div className="flex space-x-2 mt-3">
              <a href="https://facebook.com/praetoriansmartcoat" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="dark:text-[#a0a0a0] text-gray-600 hover:text-blue-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="https://twitter.com/praetoriancoat" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="dark:text-[#a0a0a0] text-gray-600 hover:text-blue-400 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a href="https://linkedin.com/company/praetorian-smartcoat" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="dark:text-[#a0a0a0] text-gray-600 hover:text-blue-700 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                </svg>
              </a>
              <a href="https://instagram.com/praetoriansmartcoat" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="dark:text-[#a0a0a0] text-gray-600 hover:text-pink-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <GradientHeading level={3} className="text-base mb-2" variant="fire">Applications</GradientHeading>
            <ul className="space-y-1">
              <li>
                <a href="#" className="dark:text-[#a0a0a0] text-gray-600 hover:text-[#0070f3] transition-colors text-sm">
                  Wildfire Protection
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors text-sm">
                  Marine
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors text-sm">
                  Pool
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors text-sm">
                  Construction
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors text-sm">
                  Mobile Home
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors text-sm">
                  Municipality
                </a>
              </li>
            </ul>
          </div>

          <div>
            <GradientHeading level={3} className="text-base mb-2" variant="mixed">Our Product</GradientHeading>
            <ul className="space-y-1">
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors text-sm">
                  Protective Coating
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors text-sm">
                  Product Benefits
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors text-sm">
                  Performance Data
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors text-sm">
                  Technical Specifications
                </a>
              </li>
              <li>
                <a href="#" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors text-sm">
                  Safety Data Sheet
                </a>
              </li>
            </ul>
          </div>

          <div>
            <GradientHeading level={3} className="text-base mb-2" variant="blue">Main Contact</GradientHeading>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-amber-500 mr-1 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                <div>
                  <p className="text-gray-400 font-semibold mb-0 text-xs">General Information:</p>
                  <a href="mailto:info@praetoriansmartcoat.com" className="text-[#a0a0a0] hover:text-amber-500 transition-colors break-all text-sm">
                    info@praetoriansmartcoat.com
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-1 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </span>
                <div>
                  <p className="text-gray-400 font-semibold mb-0 text-xs">Management:</p>
                  <a href="mailto:rob@praetoriansmartcoat.com" className="text-[#a0a0a0] hover:text-amber-500 transition-colors break-all text-sm">
                    rob@praetoriansmartcoat.com
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-1 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </span>
                <div>
                  <p className="text-gray-400 font-semibold mb-0 text-xs">Phone:</p>
                  <a href="tel:+19168096619" className="text-[#a0a0a0] hover:text-amber-500 transition-colors text-sm">
                    (916) 809-6619
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-1 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </span>
                <div>
                  <a href="/contact" className="text-[#a0a0a0] hover:text-[#0070f3] transition-colors text-sm">
                    Contact Form
                  </a>
                </div>
              </li>
            </ul>
          </div>
          

        </div>

        <div className="pt-2 border-t dark:border-[#333333] border-gray-300 text-center dark:text-[#a0a0a0] text-gray-700 text-xs relative">
          <p className="dark:text-gray-300 text-gray-700 text-[11px]">
            &copy; {new Date().getFullYear()} Praetorian SmartCoat Solutions. All rights reserved.
          </p>
          <div className="mt-0.5 space-x-3">
            <a href="/privacy-policy" className="dark:text-gray-300 text-gray-700 hover:text-amber-500 transition-colors text-[11px]">
              Privacy Policy
            </a>
            <a href="/terms" className="dark:text-gray-300 text-gray-700 hover:text-amber-500 transition-colors text-[11px]">
              Terms of Service
            </a>
            <a href="/contact" className="dark:text-gray-300 text-gray-700 hover:text-amber-500 transition-colors text-[11px]">
              Contact Us
            </a>
          </div>
          <div className="mt-1 text-[10px] text-gray-500 dark:text-gray-500">
            Praetorian SmartCoat Solutions™ | Innovative Protective Coating Technologies
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
