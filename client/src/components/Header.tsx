import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import MobileMenu from "./MobileMenu";
import { Menu, MenuItem, HoveredLink } from "@/components/ui/navbar-menu";
import { ThemeToggle } from "@/components/ui/theme-toggle";

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
      className={`dark:bg-[#121212] bg-[#f0ece0] border-b dark:border-[#ff6a00]/20 border-gray-300 sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "dark:shadow-[0_4px_20px_rgba(255,106,0,0.1)] shadow-[0_4px_20px_rgba(0,0,0,0.1)] py-3" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-heading font-bold flex items-center gap-3 group z-10">
          <i className="fas fa-shield-alt fire-water-shield text-3xl transition-colors"></i>
          <div className="tracking-tight flex items-center gap-0.5">
            <span className="gradient-text-blue mr-0.5">Praetorian</span>
            <span className="gradient-text-fire">Coatings</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Menu setActive={setActiveItem}>
            <MenuItem setActive={setActiveItem} active={activeItem} item="Applications">
              <div className="grid grid-cols-2 gap-4 p-2 w-[420px] text-center">
                <HoveredLink href="/pools">Pools</HoveredLink>
                <HoveredLink href="/marinas">Marinas</HoveredLink>
                <HoveredLink href="/fire-prevention">Fire Prevention</HoveredLink>
                <HoveredLink href="/construction">Construction</HoveredLink>
                <HoveredLink href="/mobile-home">Mobile Home</HoveredLink>
                <HoveredLink href="/municipality">Municipality</HoveredLink>
                <HoveredLink href="/painter-network">Painter Network</HoveredLink>
              </div>
            </MenuItem>
            
            <MenuItem setActive={setActiveItem} active={activeItem} item="About">
              <div className="flex flex-col space-y-2 p-2 w-[200px] text-center">
                <HoveredLink href="/about">Company</HoveredLink>
                <HoveredLink href="/team">Team</HoveredLink>
                {isHomePage ? (
                  <a 
                    href="#contact" 
                    className="gradient-text-blue hover:gradient-text-fire font-bold text-base uppercase tracking-wide transition-all px-2 py-1.5 block rounded-md relative font-heading text-center"
                  >
                    Contact Us
                  </a>
                ) : (
                  <Link
                    href="/#contact"
                    className="gradient-text-blue hover:gradient-text-fire font-bold text-base uppercase tracking-wide transition-all px-2 py-1.5 block rounded-md relative font-heading text-center"
                  >
                    Contact Us
                  </Link>
                )}
              </div>
            </MenuItem>
            
            <MenuItem setActive={setActiveItem} active={activeItem} item="Access">
              <div className="flex flex-col space-y-2 p-2 w-[200px] text-center">
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
          className="md:hidden dark:text-white text-gray-800 p-1 rounded-md dark:hover:bg-[#ff6a00]/10 hover:bg-gray-300/50 transition-colors z-10"
          aria-label="Toggle mobile menu"
        >
          <i className={`fas ${mobileMenuOpen ? "fa-times" : "fa-bars"} text-xl dark:text-[#ff6a00] text-orange-500`}></i>
        </button>
      </div>

      {/* Mobile Navigation */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} isHomePage={isHomePage} />
    </header>
  );
};

export default Header;
