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
    { label: "Contact", href: "/contact", description: "Get in touch with us" },
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
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }} className="hidden lg:flex">
          <a
            href="/"
            style={{ 
              color: '#ffffff !important', 
              fontSize: '16px', 
              fontWeight: '500', 
              textDecoration: 'none',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)',
              display: 'block'
            }}
            className="text-white">Home</a>
          
          {/* Services - Simple Link (Dropdown Completely Removed) */}
          <a href="/residential-solar" style={{ 
            color: '#ffffff !important', 
            fontSize: '16px', 
            fontWeight: '500', 
            textDecoration: 'none',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            display: 'block'
          }}>Services</a>
          
          <a href="/about" style={{ 
            color: '#ffffff !important', 
            fontSize: '16px', 
            fontWeight: '500', 
            textDecoration: 'none',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            display: 'block'
          }}>About</a>
          <a href="/contact" style={{ 
            color: '#ffffff !important', 
            fontSize: '16px', 
            fontWeight: '500', 
            textDecoration: 'none',
            textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            display: 'block'
          }}>Contact</a>
          
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
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden"
          style={{
            color: '#ffffff !important',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'block',
            padding: '8px'
          }}
        >
          {mobileMenuOpen ? (
            <X size={24} style={{ color: '#ffffff !important' }} />
          ) : (
            <MenuIcon size={24} style={{ color: '#ffffff !important' }} />
          )}
        </button>
      </div>
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: '#111827',
          borderTop: '1px solid rgba(249, 115, 22, 0.2)',
          padding: '16px',
          zIndex: 40
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a href="/" style={{ color: '#ffffff !important', fontSize: '16px', fontWeight: '500', textDecoration: 'none' }}>Home</a>
            <a href="/about" style={{ color: '#ffffff !important', fontSize: '16px', fontWeight: '500', textDecoration: 'none' }}>About</a>
            <a href="/contact" style={{ color: '#ffffff !important', fontSize: '16px', fontWeight: '500', textDecoration: 'none' }}>Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default ProfessionalHeader;