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
    <header style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100%', 
      backgroundColor: '#111827', 
      borderBottom: '1px solid rgba(249, 115, 22, 0.2)', 
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', 
      zIndex: 50 
    }}>
      <div style={{ 
        maxWidth: '80rem', 
        margin: '0 auto', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '12px 16px' 
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img 
            src={advancePowerLogo} 
            alt="Advance Power Redding" 
            style={{ height: '48px', width: 'auto' }}
          />
        </Link>
        
        {/* Navigation */}
        <nav style={{ display: 'flex', gap: '24px' }}>
          <Link href="/" style={{ 
            color: 'white', 
            fontSize: '16px', 
            fontWeight: '500', 
            textDecoration: 'none',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)'
          }}>Home</Link>
          
          {/* Services Dropdown */}
          <div className="group relative">
            <span style={{ 
              color: 'white', 
              fontSize: '16px', 
              fontWeight: '500', 
              cursor: 'pointer',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)'
            }}>Services</span>
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
          
          <Link href="/about" style={{ 
            color: 'white', 
            fontSize: '16px', 
            fontWeight: '500', 
            textDecoration: 'none',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)'
          }}>About</Link>
          <Link href="#contact" style={{ 
            color: 'white', 
            fontSize: '16px', 
            fontWeight: '500', 
            textDecoration: 'none',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)'
          }}>Contact</Link>
          
          {/* Get Free Quote Button */}
          <button style={{
            background: 'linear-gradient(to right, #f97316, #eab308)',
            color: 'white',
            fontWeight: 'bold',
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)'
          }}>
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