import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Sun, Menu, X, Phone, Mail } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const isHomePage = location === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-orange-500/50 shadow-xl" style={{ height: 'auto' }}>
      {/* Top contact bar */}
      <div className="bg-black py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <a href="tel:5302260701" className="flex items-center text-orange-300 hover:text-orange-200 font-medium">
              <Phone size={14} className="mr-1" />
              (530) 226-0701
            </a>
            <a href="mailto:info@apredding.net" className="flex items-center text-orange-300 hover:text-orange-200 font-medium">
              <Mail size={14} className="mr-1" />
              info@apredding.net
            </a>
          </div>
          <div className="hidden md:block text-orange-300 font-medium">
            Energy Freedom Begins Here!
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-black py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 rounded-lg opacity-30 blur-md"></div>
                <img 
                  src="/images/APR-Logo-White-New-300x222.png" 
                  alt="Advance Power Redding" 
                  className="relative h-16 w-auto object-contain bg-white p-2 rounded shadow"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIyMiIgdmlld0JveD0iMCAwIDMwMCAyMjIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMjIyIiBmaWxsPSIjZmZmZmZmIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTExIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjMzMzMzMzIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSJib2xkIj5BUFI8L3RleHQ+Cjx0ZXh0IHg9IjE1MCIgeT0iMTM1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNjY2NjY2IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPkFkdmFuY2UgUG93ZXIgUmVkZGluZzwvdGV4dD4KPHN2Zz4=';
                  }}
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                href="/" 
                className={`text-lg font-semibold transition-colors ${
                  location === '/' ? 'text-orange-200' : 'text-orange-300 hover:text-orange-200'
                }`}
              >
                Home
              </Link>
              
              {/* Services Dropdown */}
              <div className="relative group">
                <button className="text-lg font-semibold text-orange-300 hover:text-orange-200 transition-colors">
                  Services
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-black border-2 border-orange-500 rounded-lg shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link href="/residential-solar" className="block px-4 py-2 text-orange-200 font-medium hover:bg-orange-900 hover:text-white transition-colors">
                    Residential Solar
                  </Link>
                  <Link href="/commercial-solar" className="block px-4 py-2 text-orange-200 font-medium hover:bg-orange-900 hover:text-white transition-colors">
                    Commercial Solar
                  </Link>
                  <Link href="/hybrid-solar" className="block px-4 py-2 text-orange-200 font-medium hover:bg-orange-900 hover:text-white transition-colors">
                    Hybrid Solar Systems
                  </Link>
                  <Link href="/lithium-battery" className="block px-4 py-2 text-orange-200 font-medium hover:bg-orange-900 hover:text-white transition-colors">
                    Lithium Battery Services
                  </Link>
                  <Link href="/energy-conservation" className="block px-4 py-2 text-orange-200 font-medium hover:bg-orange-900 hover:text-white transition-colors">
                    Energy Conservation
                  </Link>
                  <div className="border-t border-orange-600 my-2"></div>
                  <Link href="/maintenance" className="block px-4 py-2 text-orange-200 font-medium hover:bg-orange-900 hover:text-white transition-colors">
                    Maintenance
                  </Link>
                  <Link href="/repairs" className="block px-4 py-2 text-orange-200 font-medium hover:bg-orange-900 hover:text-white transition-colors">
                    Repairs
                  </Link>
                  <Link href="/battery-storage" className="block px-4 py-2 text-orange-200 font-medium hover:bg-orange-900 hover:text-white transition-colors">
                    Battery Storage
                  </Link>
                </div>
              </div>

              <Link 
                href="/about" 
                className={`text-lg font-semibold transition-colors ${
                  location === '/about' ? 'text-orange-200' : 'text-orange-300 hover:text-orange-200'
                }`}
              >
                About
              </Link>

              <Link 
                href="/team" 
                className={`text-lg font-semibold transition-colors ${
                  location === '/team' ? 'text-orange-200' : 'text-orange-300 hover:text-orange-200'
                }`}
              >
                FAQ's
              </Link>

              {isHomePage ? (
                <a 
                  href="/contact" 
                  className="text-lg font-semibold text-orange-300 hover:text-orange-200 transition-colors"
                >
                  Contact Us
                </a>
              ) : (
                <Link 
                  href="/contact" 
                  className="text-lg font-semibold text-orange-300 hover:text-orange-200 transition-colors"
                >
                  Contact Us
                </Link>
              )}

              {/* Call Now Button */}
              <a 
                href="tel:5302260701"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-6 py-2 rounded-lg transition-all duration-300 shadow-lg"
              >
                CALL NOW!
              </a>
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-orange-400 transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4">
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <Link 
                  href="/" 
                  className="block px-4 py-3 text-white hover:bg-gray-800 transition-colors border-b border-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                
                <div className="px-4 py-2 text-orange-200 font-medium border-b border-gray-700">
                  Services
                </div>
                <Link 
                  href="/residential-solar" 
                  className="block px-6 py-2 text-gray-200 hover:text-white hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Residential Solar
                </Link>
                <Link 
                  href="/commercial-solar" 
                  className="block px-6 py-2 text-gray-200 hover:text-white hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Commercial Solar
                </Link>
                <Link 
                  href="/hybrid-solar" 
                  className="block px-6 py-2 text-gray-200 hover:text-white hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Hybrid Solar Systems
                </Link>
                <Link 
                  href="/lithium-battery" 
                  className="block px-6 py-2 text-gray-200 hover:text-white hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Lithium Battery Services
                </Link>
                <Link 
                  href="/energy-conservation" 
                  className="block px-6 py-2 text-gray-200 hover:text-white hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Energy Conservation
                </Link>
                <Link 
                  href="/maintenance" 
                  className="block px-6 py-2 text-gray-200 hover:text-white hover:bg-gray-800 transition-colors border-t border-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Maintenance
                </Link>
                <Link 
                  href="/repairs" 
                  className="block px-6 py-2 text-gray-200 hover:text-white hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Repairs
                </Link>
                <Link 
                  href="/battery-storage" 
                  className="block px-6 py-2 text-gray-200 hover:text-white hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Battery Storage
                </Link>
                
                <Link 
                  href="/about" 
                  className="block px-4 py-3 text-white hover:bg-gray-800 transition-colors border-t border-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  href="/team" 
                  className="block px-4 py-3 text-white hover:bg-gray-800 transition-colors border-t border-gray-700"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  FAQ's
                </Link>
                
                {isHomePage ? (
                  <a 
                    href="#contact" 
                    className="block px-4 py-3 text-white hover:bg-gray-800 transition-colors border-t border-gray-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact Us
                  </a>
                ) : (
                  <Link 
                    href="/contact" 
                    className="block px-4 py-3 text-white hover:bg-gray-800 transition-colors border-t border-gray-700"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact Us
                  </Link>
                )}

                <div className="p-4 border-t border-gray-700">
                  <a 
                    href="tel:5302260701"
                    className="block w-full text-center bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    CALL NOW! (530) 226-0701
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}