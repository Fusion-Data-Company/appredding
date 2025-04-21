import { useState } from "react";
import { Link, useLocation } from "wouter";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const isHomePage = location === "/";

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-[#1e1e1e] border-b border-[#333333] sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
          <i className="fas fa-shield-alt text-[#0070f3]"></i>
          <span>
            Praetorian<span className="text-[#0070f3]">Coatings</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <Link
                href="/"
                className="text-[#f5f5f5] hover:text-[#0070f3] transition-colors font-medium"
              >
                Home
              </Link>
            </li>
            {isHomePage ? (
              <>
                <li>
                  <a
                    href="#applications"
                    className="text-[#f5f5f5] hover:text-[#0070f3] transition-colors font-medium"
                  >
                    Applications
                  </a>
                </li>
                <li>
                  <a
                    href="#products"
                    className="text-[#f5f5f5] hover:text-[#0070f3] transition-colors font-medium"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#painters"
                    className="text-[#f5f5f5] hover:text-[#0070f3] transition-colors font-medium"
                  >
                    Painter Network
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-[#f5f5f5] hover:text-[#0070f3] transition-colors font-medium"
                  >
                    Contact
                  </a>
                </li>
              </>
            ) : null}
            <li>
              <Link
                href="/crm"
                className="text-[#f5f5f5] hover:text-[#0070f3] transition-colors font-medium"
              >
                Team CRM
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-[#f5f5f5]"
          aria-label="Toggle mobile menu"
        >
          <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"} text-2xl`}></i>
        </button>
      </div>

      {/* Mobile Navigation */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} isHomePage={isHomePage} />
    </header>
  );
};

export default Header;
