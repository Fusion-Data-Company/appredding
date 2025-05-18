import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import MobileMenu from "./MobileMenu";
import { Menu, MenuItem, HoveredLink } from "@/components/ui/navbar-menu";
import { LightPullThemeSwitcher } from "@/components/ui/light-pull-theme-switcher";
import { Sun, Moon, ChevronDown } from "lucide-react";
import praetorianShield from "@assets/Untitled design (6).png";

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
      className={`dark:bg-[#121212]/90 backdrop-blur-md border-b dark:border-[#ff6a00]/20 border-gray-300 sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "dark:shadow-[0_4px_20px_rgba(255,106,0,0.1)] shadow-[0_4px_20px_rgba(0,0,0,0.1)] py-3" : "py-5"
      } h-24 flex items-center`}
    >
      <div className="w-[95%] mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-4xl font-heading font-bold flex items-center gap-3 group z-10">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-blue-500/20 filter blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img 
              src={praetorianShield} 
              alt="Praetorian Shield" 
              className="h-11 w-auto relative z-10 transition-all duration-300 hover:scale-105 filter drop-shadow-lg"
            />
          </div>
          <div className="tracking-tight flex items-center">
            <div className="text-[1.2rem] sm:text-[1.35rem] md:text-[1.5rem] leading-none whitespace-nowrap">
              <span className="gradient-text-combined">Praetorian SmartCoat Solutions</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-end ml-auto pr-10">
          <div className="flex items-center mr-10">
            <div className="relative pl-3 mr-3">
              <Sun size={24} className="absolute -left-8 bottom-2 text-yellow-500 dark:text-yellow-400" />
              <div className="relative">
                <div className="bg-gray-100/80 dark:bg-gray-800/80 rounded-lg shadow-md backdrop-blur-sm px-1">
                  <LightPullThemeSwitcher />
                </div>
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <ChevronDown size={18} className="text-black dark:text-white animate-bounce" />
                </div>
              </div>
              <Moon size={24} className="absolute -right-8 bottom-2 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <Menu setActive={setActiveItem}>
            <MenuItem setActive={setActiveItem} active={activeItem} item="Applications">
              <div className="grid grid-cols-2 gap-4 p-2 w-[420px] text-center">
                <HoveredLink href="/pools">Pools</HoveredLink>
                <HoveredLink href="/marinas">Marinas</HoveredLink>
                <HoveredLink href="/fire-prevention">Fire Prevention</HoveredLink>
                <HoveredLink href="/construction">Construction</HoveredLink>
                <HoveredLink href="/mobile-home">Mobile Home</HoveredLink>
                <HoveredLink href="/municipality">Municipality</HoveredLink>
                <HoveredLink href="/painters">Painter Network</HoveredLink>
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
                <div className="pt-2 mt-2 border-t border-gray-700/50">
                  <Link
                    href="/style-showcase"
                    className="gradient-text-combined font-bold text-base tracking-wide transition-all px-2 py-1.5 block rounded-md relative font-heading text-center"
                  >
                    Style Showcase
                  </Link>
                </div>
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
          className="md:hidden p-2 rounded-md transition-all duration-300 z-10 relative bg-gradient-to-r from-orange-600/10 to-blue-600/10 hover:from-orange-600/20 hover:to-blue-600/20 border border-transparent hover:border-orange-500/30 shadow-md"
          aria-label="Toggle mobile menu"
        >
          <span className={`block ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''} h-0.5 w-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transform transition-all duration-300 mb-1.5`}></span>
          <span className={`block ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'} h-0.5 w-6 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full transform transition-all duration-300 mb-1.5`}></span>
          <span className={`block ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''} h-0.5 w-6 bg-gradient-to-r from-orange-500 to-blue-500 rounded-full transform transition-all duration-300`}></span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} isHomePage={isHomePage} />
    </header>
  );
};

export default Header;
