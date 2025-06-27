import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import advancePowerLogo from "/advance-power-logo.jpg";
import { Button } from "@/components/ui/button";
import { 
  Moon, 
  Sun, 
  Menu as MenuIcon, 
  X
} from "lucide-react";
import { useTheme } from "next-themes";
import MobileMenu from "./MobileMenu";
import { PremiumNavbar } from "@/components/ui/premium-navbar";
import StoneTextureBackground from "@/components/ui/stone-texture-background";


const ProfessionalHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();
  const isHomePage = location === "/";

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    setMounted(true);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Solar services
  const solarServices = [
    { label: "Residential Solar", href: "/residential-solar", description: "Custom solar solutions for homes" },
    { label: "Commercial Solar", href: "/commercial-solar", description: "Business solar power systems" },
    { label: "Hybrid Systems", href: "/hybrid-systems", description: "Solar + battery storage solutions" },
    { label: "Lithium Batteries", href: "/lithium-batteries", description: "Advanced energy storage systems" },
    { label: "Energy Conservation", href: "/energy-conservation", description: "Energy efficiency services" },
    { label: "Maintenance & Repair", href: "/maintenance", description: "Solar system maintenance" },
  ];

  // Resources
  const resources = [
    { label: "About Us", href: "/about", description: "Learn about our company" },
    { label: "Team", href: "/team", description: "Meet our expert team" },
    { label: "Contact", href: isHomePage ? "#contact" : "/#contact", description: "Get in touch with us" },
    { label: "AI Chat Support", href: "/chat", description: "Get help from our AI assistant" },
    { label: "Style Showcase", href: "/style-showcase", description: "View our design language" },
  ];

  // Access levels
  const accessLevels = [
    { label: "Client Dashboard", href: "/client-dashboard", description: "Access your client portal" },
    { label: "Admin Dashboard", href: "/admin-dashboard", description: "Administrative controls" },
    { label: "Team CRM", href: "/crm", description: "Customer relationship management" },
    { label: "Inventory Management", href: "/inventory", description: "Manage product inventory and orders" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900/95 backdrop-blur-xl border-b border-orange-500/20 shadow-lg z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img 
            src={advancePowerLogo} 
            alt="Advance Power Redding" 
            className="h-12 w-auto"
          />
        </Link>
        
        {/* Navigation */}
        <nav className="hidden lg:flex space-x-6">
          <Link href="/" className="text-white hover:text-orange-300 font-medium transition-colors duration-200">Home</Link>
          
          {/* Services Dropdown */}
          <div className="group relative">
            <span className="text-white hover:text-orange-300 font-medium transition-colors duration-200 cursor-pointer">Services</span>
            <div className="absolute top-full left-0 mt-2 w-64 py-2 bg-gray-900/95 backdrop-blur-xl border border-orange-500/30 rounded-lg shadow-xl invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
              {solarServices.map((service, index) => (
                <Link
                  key={index}
                  href={service.href}
                  className="block px-4 py-2 text-sm text-white hover:text-orange-300 hover:bg-gray-800/50 transition-all duration-200"
                >
                  <div>
                    <div className="font-medium">{service.label}</div>
                    <div className="text-xs text-gray-400">{service.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          <Link href="/about" className="text-white hover:text-orange-300 font-medium transition-colors duration-200">About</Link>
          <Link href="#contact" className="text-white hover:text-orange-300 font-medium transition-colors duration-200">Contact</Link>
          
          {/* Get Free Quote Button */}
          <button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-400 hover:to-yellow-400 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Get Free Quote
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 z-10 rounded-sm bg-white/10 hover:bg-white/20 transition-all duration-300"
        >
          {mobileMenuOpen ? (
            <X className="h-5 w-5 text-gray-800" />
          ) : (
            <MenuIcon className="h-5 w-5 text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} isHomePage={isHomePage} />
    </header>
  );
};

export default ProfessionalHeader;