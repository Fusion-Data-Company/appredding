import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { 
  Sun, 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin,
  ChevronDown,
  Home,
  Building2,
  Zap,
  Shield,
  Users,
  MessageSquare
} from "lucide-react";
import logoPath from "@assets/APR-Logo-New-300x113.png";

const SolarHeader = () => {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const serviceDropdownItems = [
    { 
      title: "Residential Solar", 
      href: "/residential-solar", 
      icon: <Home className="w-4 h-4" />,
      description: "Solar panels for your home"
    },
    { 
      title: "Commercial Solar", 
      href: "/commercial-solar", 
      icon: <Building2 className="w-4 h-4" />,
      description: "Solar solutions for businesses"
    },
    { 
      title: "Solar Maintenance", 
      href: "/solar-maintenance", 
      icon: <Zap className="w-4 h-4" />,
      description: "Keep your system running optimally"
    },
    { 
      title: "Solar Repair", 
      href: "/solar-repair", 
      icon: <Shield className="w-4 h-4" />,
      description: "Expert repair services"
    }
  ];

  const industryDropdownItems = [
    { 
      title: "Fire Prevention", 
      href: "/fire-prevention", 
      icon: <Shield className="w-4 h-4" />,
      description: "Solar fire safety solutions"
    },
    { 
      title: "Energy Storage", 
      href: "/energy-storage", 
      icon: <Zap className="w-4 h-4" />,
      description: "Battery backup systems"
    }
  ];

  const isActive = (path: string) => location === path;

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-orange-200/50" 
        : "bg-gradient-to-b from-white/90 to-white/70 backdrop-blur-md border-b border-orange-100/30"
    }`}>
      {/* Top Contact Bar */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span className="font-medium">(530) 241-5297</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>info@advancepowerredding.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Serving Shasta County, California</span>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
              Licensed & Insured
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold">
              25+ Years Experience
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3">
              <img 
                src={logoPath} 
                alt="Advance Power Redding" 
                className="h-12 w-auto"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link href="/">
              <span className={`font-medium transition-colors duration-200 ${
                isActive("/") 
                  ? "text-orange-600 border-b-2 border-orange-600 pb-1" 
                  : "text-gray-700 hover:text-orange-600"
              }`}>
                Home
              </span>
            </Link>

            {/* Services Dropdown - DISABLED HOVER BEHAVIOR */}
            <div className="relative">
              <Link href="/services">
                <span className="font-medium text-gray-700 hover:text-orange-600 transition-colors duration-200">
                  Services
                </span>
              </Link>
            </div>

            {/* Industries Dropdown - DISABLED HOVER BEHAVIOR */}
            <div className="relative">
              <Link href="/industries">
                <span className="font-medium text-gray-700 hover:text-orange-600 transition-colors duration-200">
                  Industries
                </span>
              </Link>
            </div>

            <Link href="/about">
              <span className={`font-medium transition-colors duration-200 ${
                isActive("/about") 
                  ? "text-orange-600 border-b-2 border-orange-600 pb-1" 
                  : "text-gray-700 hover:text-orange-600"
              }`}>
                About
              </span>
            </Link>

            <Link href="/contact">
              <span className={`font-medium transition-colors duration-200 ${
                isActive("/contact") 
                  ? "text-orange-600 border-b-2 border-orange-600 pb-1" 
                  : "text-gray-700 hover:text-orange-600"
              }`}>
                Contact
              </span>
            </Link>

            <Link href="/crm">
              <span className={`font-medium transition-colors duration-200 ${
                isActive("/crm") 
                  ? "text-orange-600 border-b-2 border-orange-600 pb-1" 
                  : "text-gray-700 hover:text-orange-600"
              }`}>
                CRM
              </span>
            </Link>
          </nav>

          {/* Call to Action Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Free Quote
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:text-orange-600 hover:bg-gray-100 transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden bg-white border-t border-gray-200"
        >
          <div className="px-4 py-6 space-y-4">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="block px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                Home
              </div>
            </Link>
            
            <div className="space-y-2">
              <div className="px-4 py-2 text-gray-800 font-semibold">Services</div>
              {serviceDropdownItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="flex items-center space-x-3 px-6 py-2 text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="space-y-2">
              <div className="px-4 py-2 text-gray-800 font-semibold">Industries</div>
              {industryDropdownItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                  <div className="flex items-center space-x-3 px-6 py-2 text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                </Link>
              ))}
            </div>

            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="block px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                About
              </div>
            </Link>

            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="block px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                Contact
              </div>
            </Link>

            <Link href="/crm" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="block px-4 py-2 text-gray-700 hover:text-orange-600 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                CRM
              </div>
            </Link>

            <div className="pt-4 border-t border-gray-200">
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                <button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg">
                  Get Free Quote
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default SolarHeader;