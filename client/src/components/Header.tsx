import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const isHomePage = location === "/";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header 
      className={`bg-white border-b border-gray-200 sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-premium-md py-3" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-heading font-bold flex items-center gap-2 group">
          <i className="fas fa-shield-alt text-primary-600 group-hover:text-primary-700 transition-colors"></i>
          <span className="tracking-tight">
            Praetorian<span className="text-primary-600 group-hover:text-primary-700 transition-colors">Coatings</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/"
                className="text-gray-700 hover:text-primary-700 font-medium px-2 py-1 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary-600 after:transition-all"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/applications"
                className="text-gray-700 hover:text-primary-700 font-medium px-2 py-1 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary-600 after:transition-all"
              >
                Applications
              </Link>
            </li>

            <li>
              <Link
                href="/painter-network"
                className="text-gray-700 hover:text-primary-700 font-medium px-2 py-1 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary-600 after:transition-all"
              >
                Painter Network
              </Link>
            </li>
            {isHomePage && (
              <>
                <li>
                  <a
                    href="#products"
                    className="text-gray-700 hover:text-primary-700 font-medium px-2 py-1 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary-600 after:transition-all"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-700 hover:text-primary-700 font-medium px-2 py-1 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-primary-600 after:transition-all"
                  >
                    Contact
                  </a>
                </li>
              </>
            )}
            <li>
              <Link
                href="/client-dashboard"
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 py-2 rounded-md transition-colors shadow-sm hover:shadow mr-2"
              >
                Client Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin-dashboard"
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 py-2 rounded-md transition-colors shadow-sm hover:shadow mr-2"
              >
                Admin Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/crm"
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium px-4 py-2 rounded-md transition-colors shadow-sm hover:shadow"
              >
                Team CRM
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-gray-800 p-1 rounded-md hover:bg-gray-100 transition-colors"
          aria-label="Toggle mobile menu"
        >
          <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"} text-xl`}></i>
        </button>
      </div>

      {/* Mobile Navigation */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} isHomePage={isHomePage} />
    </header>
  );
};

export default Header;
