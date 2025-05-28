import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Sun, Moon, ChevronDown, Menu, X } from "lucide-react";

export default function Header() {
  const [location] = useLocation();
  const isHomePage = location === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Sun className="w-6 h-6 text-white" />
            </div>
            <div className="text-white font-bold text-xl">
              Advance Power Redding
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-end ml-auto pr-10">
            
            {/* Simple Working Navigation */}
            <nav className="flex items-center space-x-8">
              {/* Solar Solutions Dropdown */}
              <div className="relative group">
                <button className="text-white hover:text-orange-400 font-medium transition-colors px-4 py-2 flex items-center gap-2">
                  Solar Solutions
                  <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link href="/residential-solar" className="block px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors">
                    <div className="font-medium">Residential Solar</div>
                    <div className="text-sm text-gray-600">Home solar installations</div>
                  </Link>
                  <Link href="/commercial-solar" className="block px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors">
                    <div className="font-medium">Commercial Solar</div>
                    <div className="text-sm text-gray-600">Business solar solutions</div>
                  </Link>
                  <Link href="/hybrid-solar" className="block px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors">
                    <div className="font-medium">Hybrid Solar Systems</div>
                    <div className="text-sm text-gray-600">Solar + battery integration</div>
                  </Link>
                  <Link href="/lithium-battery" className="block px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors">
                    <div className="font-medium">Lithium Battery Services</div>
                    <div className="text-sm text-gray-600">Energy storage solutions</div>
                  </Link>
                  <Link href="/energy-conservation" className="block px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors">
                    <div className="font-medium">Energy Conservation</div>
                    <div className="text-sm text-gray-600">Efficiency services</div>
                  </Link>
                </div>
              </div>

              {/* About Dropdown */}
              <div className="relative group">
                <button className="text-white hover:text-orange-400 font-medium transition-colors px-4 py-2 flex items-center gap-2">
                  About
                  <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link href="/about" className="block px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors">
                    <div className="font-medium">Company</div>
                  </Link>
                  <Link href="/team" className="block px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors">
                    <div className="font-medium">Team</div>
                  </Link>
                  {isHomePage ? (
                    <a href="#contact" className="block px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors">
                      <div className="font-medium">Contact Us</div>
                    </a>
                  ) : (
                    <Link href="/#contact" className="block px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors">
                      <div className="font-medium">Contact Us</div>
                    </Link>
                  )}
                </div>
              </div>

              {/* Services Dropdown */}
              <div className="relative group">
                <button className="text-white hover:text-orange-400 font-medium transition-colors px-4 py-2 flex items-center gap-2">
                  Services
                  <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <Link href="/maintenance" className="block px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors">
                    <div className="font-medium">Maintenance</div>
                  </Link>
                  <Link href="/repairs" className="block px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors">
                    <div className="font-medium">Repairs</div>
                  </Link>
                  <Link href="/battery-storage" className="block px-4 py-3 text-gray-800 hover:bg-gray-100 transition-colors">
                    <div className="font-medium">Battery Storage</div>
                  </Link>
                </div>
              </div>
            </nav>
          </div>

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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 rounded-lg mt-2">
              <div className="space-y-1">
                <div className="px-3 py-2 text-orange-400 font-medium">Solar Solutions</div>
                <Link href="/residential-solar" className="block px-6 py-2 text-gray-300 hover:text-white transition-colors">
                  Residential Solar
                </Link>
                <Link href="/commercial-solar" className="block px-6 py-2 text-gray-300 hover:text-white transition-colors">
                  Commercial Solar
                </Link>
                <Link href="/hybrid-solar" className="block px-6 py-2 text-gray-300 hover:text-white transition-colors">
                  Hybrid Solar Systems
                </Link>
                <Link href="/lithium-battery" className="block px-6 py-2 text-gray-300 hover:text-white transition-colors">
                  Lithium Battery Services
                </Link>
                <Link href="/energy-conservation" className="block px-6 py-2 text-gray-300 hover:text-white transition-colors">
                  Energy Conservation
                </Link>
              </div>
              
              <div className="space-y-1 pt-4">
                <div className="px-3 py-2 text-orange-400 font-medium">About</div>
                <Link href="/about" className="block px-6 py-2 text-gray-300 hover:text-white transition-colors">
                  Company
                </Link>
                <Link href="/team" className="block px-6 py-2 text-gray-300 hover:text-white transition-colors">
                  Team
                </Link>
                {isHomePage ? (
                  <a href="#contact" className="block px-6 py-2 text-gray-300 hover:text-white transition-colors">
                    Contact Us
                  </a>
                ) : (
                  <Link href="/#contact" className="block px-6 py-2 text-gray-300 hover:text-white transition-colors">
                    Contact Us
                  </Link>
                )}
              </div>

              <div className="space-y-1 pt-4">
                <div className="px-3 py-2 text-orange-400 font-medium">Services</div>
                <Link href="/maintenance" className="block px-6 py-2 text-gray-300 hover:text-white transition-colors">
                  Maintenance
                </Link>
                <Link href="/repairs" className="block px-6 py-2 text-gray-300 hover:text-white transition-colors">
                  Repairs
                </Link>
                <Link href="/battery-storage" className="block px-6 py-2 text-gray-300 hover:text-white transition-colors">
                  Battery Storage
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}