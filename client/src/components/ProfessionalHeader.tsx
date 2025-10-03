import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import advancePowerLogo from "/advance-power-logo.jpg";
import { Button } from "@/components/ui/button";
import { 
  Moon, 
  Sun, 
  Menu as MenuIcon, 
  X,
  Home,
  Building,
  Zap,
  Battery,
  Leaf,
  Wrench,
  Settings,
  Building2,
  HardHat,
  Server,
  Landmark,
  ShoppingBag,
  GitCompare,
  ShoppingCart,
  Grid3x3,
  MapPin,
  Banknote,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useTheme } from "next-themes";
import MobileMenu from "./MobileMenu";
import { PremiumNavbar } from "@/components/ui/premium-navbar";
import StoneTextureBackground from "@/components/ui/stone-texture-background";
import CartButton from "@/components/cart/CartButton";

const ProfessionalHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [location] = useLocation();
  const isHomePage = location === "/";
  
  // State for mobile menu accordion sections
  const [servicesExpanded, setServicesExpanded] = useState(false);
  const [solutionsExpanded, setSolutionsExpanded] = useState(false);
  const [shopExpanded, setShopExpanded] = useState(false);

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

  // Auto-close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // Close mobile menu when a link is clicked
  const handleLinkClick = () => {
    setMobileMenuOpen(false);
    setServicesExpanded(false);
    setSolutionsExpanded(false);
    setShopExpanded(false);
  };

  // Services dropdown menu items
  const servicesDropdown = [
    { label: "Residential Solar", href: "/services/residential-solar", description: "Custom solar solutions for homes", icon: Home },
    { label: "Commercial Solar", href: "/services/commercial-solar", description: "Business solar power systems", icon: Building },
    { label: "Hybrid Solar", href: "/services/hybrid-solar", description: "Solar + battery storage solutions", icon: Zap },
    { label: "Battery Storage", href: "/services/battery-storage", description: "Energy storage systems", icon: Battery },
    { label: "Lithium Battery", href: "/services/lithium-battery", description: "Advanced lithium battery solutions", icon: Battery },
    { label: "Energy Conservation", href: "/services/energy-conservation", description: "Energy efficiency services", icon: Leaf },
    { label: "Maintenance", href: "/services/maintenance", description: "Solar system maintenance", icon: Wrench },
    { label: "Repairs", href: "/services/repairs", description: "Expert repair services", icon: Settings },
  ];

  // Solutions dropdown menu items
  const solutionsDropdown = [
    { label: "All Solutions Overview", href: "/solutions", description: "View all our solutions", icon: Grid3x3 },
    { label: "Mobile Homes", href: "/solutions/mobile-homes", description: "Solar solutions for mobile homes", icon: Home },
    { label: "Municipalities", href: "/solutions/municipalities", description: "Municipal solar projects", icon: MapPin },
    { label: "Construction", href: "/solutions/construction", description: "Construction site power solutions", icon: HardHat },
    { label: "Data Centers", href: "/solutions/data-centers", description: "Data center energy solutions", icon: Server },
    { label: "Financial Centers", href: "/solutions/financial-centers", description: "Financial institution solutions", icon: Banknote },
  ];

  // Shop dropdown menu items
  const shopDropdown = [
    { label: "Browse Products", href: "/shop/products", description: "Explore our product catalog", icon: ShoppingBag },
    { label: "Product Comparison", href: "/shop/product-comparison", description: "Compare solar products", icon: GitCompare },
    { label: "View Cart", href: "/shop/cart", description: "Review your shopping cart", icon: ShoppingCart },
  ];

  return (
    <>
      {/* CSS for dropdown hover effects */}
      <style>{`
        .dropdown-parent {
          position: relative;
        }
        
        .dropdown-menu {
          display: none;
          opacity: 0;
          transform: translateY(-10px);
          transition: opacity 250ms ease-in-out, transform 250ms ease-in-out;
          pointer-events: none;
        }
        
        .dropdown-parent:hover .dropdown-menu {
          display: block;
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        
        .dropdown-item {
          transition: all 200ms ease-in-out;
        }
        
        .dropdown-item:hover {
          background-color: rgba(249, 115, 22, 0.1);
          border-left-color: #f97316;
        }
      `}</style>
      
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
          maxWidth: '100%', 
          margin: '0 auto', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          padding: '20px 48px' 
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
              data-testid="nav-home"
              style={{ 
                color: '#ffffff !important', 
                fontSize: '16px', 
                fontWeight: '500', 
                textDecoration: 'none',
                textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                display: 'block'
              }}
              className="text-white">Home</a>
            
            {/* Services Dropdown */}
            <div className="dropdown-parent" data-testid="dropdown-services">
              <span style={{ 
                color: '#ffffff !important', 
                fontSize: '16px', 
                fontWeight: '500', 
                textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                cursor: 'pointer',
                display: 'block'
              }}>Services</span>
              
              <div className="dropdown-menu" style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginTop: '12px',
                backgroundColor: '#1f2937',
                borderRadius: '8px',
                border: '1px solid rgba(249, 115, 22, 0.3)',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                minWidth: '280px',
                padding: '8px 0',
                zIndex: 100
              }}>
                {servicesDropdown.map((item) => {
                  const Icon = item.icon;
                  const testId = `nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      data-testid={testId}
                      className="dropdown-item"
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '12px 16px',
                        textDecoration: 'none',
                        borderLeft: '3px solid transparent'
                      }}
                    >
                      <Icon size={20} style={{ color: '#f97316', marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>
                          {item.label}
                        </div>
                        <div style={{ color: '#9ca3af', fontSize: '12px' }}>
                          {item.description}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Solutions Dropdown */}
            <div className="dropdown-parent" data-testid="dropdown-solutions">
              <span style={{ 
                color: '#ffffff !important', 
                fontSize: '16px', 
                fontWeight: '500', 
                textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                cursor: 'pointer',
                display: 'block'
              }}>Solutions</span>
              
              <div className="dropdown-menu" style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginTop: '12px',
                backgroundColor: '#1f2937',
                borderRadius: '8px',
                border: '1px solid rgba(249, 115, 22, 0.3)',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                minWidth: '280px',
                padding: '8px 0',
                zIndex: 100
              }}>
                {solutionsDropdown.map((item) => {
                  const Icon = item.icon;
                  const testId = `nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      data-testid={testId}
                      className="dropdown-item"
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '12px 16px',
                        textDecoration: 'none',
                        borderLeft: '3px solid transparent'
                      }}
                    >
                      <Icon size={20} style={{ color: '#f97316', marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>
                          {item.label}
                        </div>
                        <div style={{ color: '#9ca3af', fontSize: '12px' }}>
                          {item.description}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Shop Dropdown */}
            <div className="dropdown-parent" data-testid="dropdown-shop">
              <span style={{ 
                color: '#ffffff !important', 
                fontSize: '16px', 
                fontWeight: '500', 
                textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                cursor: 'pointer',
                display: 'block'
              }}>Shop</span>
              
              <div className="dropdown-menu" style={{
                position: 'absolute',
                top: '100%',
                left: '50%',
                transform: 'translateX(-50%)',
                marginTop: '12px',
                backgroundColor: '#1f2937',
                borderRadius: '8px',
                border: '1px solid rgba(249, 115, 22, 0.3)',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
                minWidth: '280px',
                padding: '8px 0',
                zIndex: 100
              }}>
                {shopDropdown.map((item) => {
                  const Icon = item.icon;
                  const testId = `nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      data-testid={testId}
                      className="dropdown-item"
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '12px 16px',
                        textDecoration: 'none',
                        borderLeft: '3px solid transparent'
                      }}
                    >
                      <Icon size={20} style={{ color: '#f97316', marginTop: '2px', flexShrink: 0 }} />
                      <div>
                        <div style={{ color: '#ffffff', fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>
                          {item.label}
                        </div>
                        <div style={{ color: '#9ca3af', fontSize: '12px' }}>
                          {item.description}
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
            
            <a href="/resources/technical-data" data-testid="nav-technical-data" style={{ 
              color: '#ffffff !important', 
              fontSize: '16px', 
              fontWeight: '500', 
              textDecoration: 'none',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)',
              display: 'block'
            }}>Technical Data</a>
            <a href="/about" data-testid="nav-about" style={{ 
              color: '#ffffff !important', 
              fontSize: '16px', 
              fontWeight: '500', 
              textDecoration: 'none',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)',
              display: 'block'
            }}>About</a>
            <a href="/contact" data-testid="nav-contact" style={{ 
              color: '#ffffff !important', 
              fontSize: '16px', 
              fontWeight: '500', 
              textDecoration: 'none',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)',
              display: 'block'
            }}>Contact</a>
            
            {/* Cart Button */}
            <CartButton />
            
            {/* Book Appointment Button */}
            <a href="/resources/book-appointment" style={{ textDecoration: 'none' }}>
              <button data-testid="nav-book-appointment" style={{
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
                Book Appointment
              </button>
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-toggle"
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
          <div className="lg:hidden" style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#111827',
            borderTop: '1px solid rgba(249, 115, 22, 0.2)',
            padding: '16px',
            zIndex: 40,
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <nav style={{ display: 'flex', flexDirection: 'column' }}>
              {/* Home Link */}
              <a 
                href="/" 
                onClick={handleLinkClick}
                data-testid="nav-home"
                style={{ 
                  color: '#ffffff', 
                  fontSize: '16px', 
                  fontWeight: '500', 
                  textDecoration: 'none',
                  padding: '12px 0',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(249, 115, 22, 0.1)'
                }}
              >
                Home
              </a>

              {/* Services Accordion */}
              <div style={{ borderBottom: '1px solid rgba(249, 115, 22, 0.1)' }}>
                <button
                  onClick={() => setServicesExpanded(!servicesExpanded)}
                  data-testid="mobile-accordion-services"
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    minHeight: '44px',
                    background: 'none',
                    border: 'none',
                    color: '#f97316',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  Services
                  {servicesExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <div style={{
                  maxHeight: servicesExpanded ? '600px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 300ms ease-in-out'
                }}>
                  {servicesDropdown.map((item) => {
                    const testId = `nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`;
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={handleLinkClick}
                        data-testid={testId}
                        style={{
                          display: 'block',
                          padding: '10px 0 10px 24px',
                          minHeight: '44px',
                          color: '#ffffff',
                          fontSize: '14px',
                          fontWeight: '400',
                          textDecoration: 'none',
                          backgroundColor: 'transparent',
                          transition: 'background-color 200ms ease-in-out'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(249, 115, 22, 0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Solutions Accordion */}
              <div style={{ borderBottom: '1px solid rgba(249, 115, 22, 0.1)' }}>
                <button
                  onClick={() => setSolutionsExpanded(!solutionsExpanded)}
                  data-testid="mobile-accordion-solutions"
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    minHeight: '44px',
                    background: 'none',
                    border: 'none',
                    color: '#f97316',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  Solutions
                  {solutionsExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <div style={{
                  maxHeight: solutionsExpanded ? '500px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 300ms ease-in-out'
                }}>
                  {solutionsDropdown.map((item) => {
                    const testId = `nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`;
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={handleLinkClick}
                        data-testid={testId}
                        style={{
                          display: 'block',
                          padding: '10px 0 10px 24px',
                          minHeight: '44px',
                          color: '#ffffff',
                          fontSize: '14px',
                          fontWeight: '400',
                          textDecoration: 'none',
                          backgroundColor: 'transparent',
                          transition: 'background-color 200ms ease-in-out'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(249, 115, 22, 0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Shop Accordion */}
              <div style={{ borderBottom: '1px solid rgba(249, 115, 22, 0.1)' }}>
                <button
                  onClick={() => setShopExpanded(!shopExpanded)}
                  data-testid="mobile-accordion-shop"
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    minHeight: '44px',
                    background: 'none',
                    border: 'none',
                    color: '#f97316',
                    fontSize: '16px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  Shop
                  {shopExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                <div style={{
                  maxHeight: shopExpanded ? '300px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 300ms ease-in-out'
                }}>
                  {shopDropdown.map((item) => {
                    const testId = `nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`;
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={handleLinkClick}
                        data-testid={testId}
                        style={{
                          display: 'block',
                          padding: '10px 0 10px 24px',
                          minHeight: '44px',
                          color: '#ffffff',
                          fontSize: '14px',
                          fontWeight: '400',
                          textDecoration: 'none',
                          backgroundColor: 'transparent',
                          transition: 'background-color 200ms ease-in-out'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(249, 115, 22, 0.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        {item.label}
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Technical Data Link */}
              <a 
                href="/resources/technical-data" 
                onClick={handleLinkClick}
                data-testid="nav-technical-data"
                style={{ 
                  color: '#ffffff', 
                  fontSize: '16px', 
                  fontWeight: '500', 
                  textDecoration: 'none',
                  padding: '12px 0',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(249, 115, 22, 0.1)'
                }}
              >
                Technical Data
              </a>

              {/* About Link */}
              <a 
                href="/about" 
                onClick={handleLinkClick}
                data-testid="nav-about"
                style={{ 
                  color: '#ffffff', 
                  fontSize: '16px', 
                  fontWeight: '500', 
                  textDecoration: 'none',
                  padding: '12px 0',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(249, 115, 22, 0.1)'
                }}
              >
                About
              </a>

              {/* Contact Link */}
              <a 
                href="/contact" 
                onClick={handleLinkClick}
                data-testid="nav-contact"
                style={{ 
                  color: '#ffffff', 
                  fontSize: '16px', 
                  fontWeight: '500', 
                  textDecoration: 'none',
                  padding: '12px 0',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  borderBottom: '1px solid rgba(249, 115, 22, 0.1)'
                }}
              >
                Contact
              </a>

              {/* Book Appointment Link */}
              <a 
                href="/resources/book-appointment" 
                onClick={handleLinkClick}
                data-testid="nav-book-appointment"
                style={{ 
                  color: '#ffffff', 
                  fontSize: '16px', 
                  fontWeight: '500', 
                  textDecoration: 'none',
                  padding: '12px 0',
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                Book Appointment
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default ProfessionalHeader;
