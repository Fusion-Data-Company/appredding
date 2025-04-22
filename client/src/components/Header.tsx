import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import MobileMenu from "./MobileMenu";
import { Menu, MenuItem, HoveredLink } from "@/components/ui/navbar-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
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
        <Link href="/" className="text-2xl font-heading font-bold flex items-center gap-2 group z-10">
          <i className="fas fa-shield-alt text-primary-600 group-hover:text-primary-700 transition-colors"></i>
          <span className="tracking-tight">
            Praetorian<span className="text-primary-600 group-hover:text-primary-700 transition-colors">Coatings</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <Menu setActive={setActiveItem}>
            <MenuItem setActive={setActiveItem} active={activeItem} item="Applications">
              <div className="grid grid-cols-2 gap-4 p-2 w-[400px]">
                <HoveredLink href="/pools">Pools</HoveredLink>
                <HoveredLink href="/marinas">Marinas</HoveredLink>
                <HoveredLink href="/fire-prevention">Fire Prevention</HoveredLink>
                <HoveredLink href="/construction">Construction</HoveredLink>
                <HoveredLink href="/mobile-home">Mobile Home</HoveredLink>
                <HoveredLink href="/municipality">Municipality</HoveredLink>
                <HoveredLink href="/painter-network">Painter Network</HoveredLink>
              </div>
            </MenuItem>
            
            <MenuItem setActive={setActiveItem} active={activeItem} item="Products">
              <div className="flex flex-col space-y-2 p-2 w-[200px]">
                {isHomePage ? (
                  <a 
                    href="#products" 
                    className="text-gray-700 hover:text-primary-700 font-medium py-1"
                  >
                    All Products
                  </a>
                ) : (
                  <Link
                    href="/#products"
                    className="text-gray-700 hover:text-primary-700 font-medium py-1"
                  >
                    All Products
                  </Link>
                )}
                <HoveredLink href="/product-details/coatings">Protective Coatings</HoveredLink>
                <HoveredLink href="/product-details/sealants">Sealants</HoveredLink>
                <HoveredLink href="/product-details/primers">Primers</HoveredLink>
              </div>
            </MenuItem>
            
            <MenuItem setActive={setActiveItem} active={activeItem} item="About">
              <div className="flex flex-col space-y-2 p-2 w-[200px]">
                <HoveredLink href="/about">Company</HoveredLink>
                <HoveredLink href="/team">Team</HoveredLink>
                {isHomePage ? (
                  <a 
                    href="#contact" 
                    className="text-gray-700 hover:text-primary-700 font-medium py-1"
                  >
                    Contact Us
                  </a>
                ) : (
                  <Link
                    href="/#contact"
                    className="text-gray-700 hover:text-primary-700 font-medium py-1"
                  >
                    Contact Us
                  </Link>
                )}
              </div>
            </MenuItem>
            
            <MenuItem setActive={setActiveItem} active={activeItem} item="Access">
              <div className="flex flex-col space-y-2 p-2 w-[200px]">
                <HoveredLink href="/client-dashboard">Client Dashboard</HoveredLink>
                <HoveredLink href="/admin-dashboard">Admin Dashboard</HoveredLink>
                <HoveredLink href="/crm">Team CRM</HoveredLink>
              </div>
            </MenuItem>
          </Menu>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-gray-800 p-1 rounded-md hover:bg-gray-100 transition-colors z-10"
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
