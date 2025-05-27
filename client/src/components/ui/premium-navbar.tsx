import React, { useState, useRef, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

// Images for various solutions/applications
const solutionImages = {
  marinas: "/images/marinas-thumb.jpg",
  pools: "/images/pools-thumb.jpg",
  firePrevention: "/images/fire-prevention-thumb.jpg", 
  construction: "/images/construction-thumb.jpg",
  mobileHome: "/images/mobile-home-thumb.jpg",
  municipality: "/images/municipality-thumb.jpg"
};

// Images for professional services
const professionalImages = {
  painters: "/images/painter-thumb.jpg",
  poolPros: "/images/pools-thumb.jpg",
  firePros: "/images/fire-prevention-thumb.jpg",
  constructionPros: "/images/construction-thumb.jpg"
};

const DropdownSection = ({ title, items, gridCols = 2 }) => (
  <div className="px-4 py-3">
    <h3 className="text-sm font-bold text-amber-400 mb-3">{title}</h3>
    <div className={`grid grid-cols-${gridCols} gap-x-6 gap-y-4`}>
      {items.map((item, index) => (
        <Link 
          key={index} 
          href={item.href}
          className="text-sm text-gray-300 hover:text-white transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </div>
  </div>
);

// Enterprise-grade mega menu item with image tiles
const NavItem = ({ 
  label, 
  content, 
  isOpen, 
  onClick 
}) => {
  const navItemRef = useRef(null);
  
  return (
    <div className="relative" ref={navItemRef}>
      <button
        onClick={onClick}
        className={`flex items-center space-x-1 px-4 py-2 font-cinzel tracking-wide text-sm uppercase
          ${isOpen 
            ? "text-white" 
            : "text-white/90 hover:text-white"
          }
        `}
      >
        <span>{label}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed left-1/2 -translate-x-1/2 transform top-28 !z-[999999] w-[600px] px-4"
            style={{ maxWidth: "95vw" }}
          >
            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
              <div className="relative bg-gray-900/95 backdrop-blur-xl border border-gray-800">
                {content}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Solution or professional card with image
const ImageCard = ({ title, description, imageSrc, href }) => (
  <Link 
    href={href}
    className="flex flex-col group rounded-md overflow-hidden transition-all duration-300 transform hover:scale-105"
  >
    <div className="relative h-20 w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-blue-600/30 group-hover:opacity-70 transition-opacity duration-300 z-10" />
      <img 
        src={imageSrc} 
        alt={title} 
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
    <div className="p-2 bg-gray-800/90">
      <h4 className="font-bold text-white text-xs mb-0.5 group-hover:text-amber-400 transition-colors">{title}</h4>
      <p className="text-gray-300 text-[10px] leading-tight">{description}</p>
    </div>
  </Link>
);

export function PremiumNavbar() {
  const [activeMenu, setActiveMenu] = useState(null);
  const navRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };
  
  // Solar Services mega menu content
  const solarServicesContent = (
    <div className="p-4">
      <div className="border-b border-gray-700 pb-2 mb-3">
        <h3 className="text-base font-bold text-center text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
          Solar Energy Solutions
        </h3>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <ImageCard
          title="Residential Solar"
          description="Custom solar solutions for homes"
          imageSrc="/images/residential-solar.jpg"
          href="/residential-solar"
        />
        
        <ImageCard
          title="Commercial Solar"
          description="Business solar power systems"
          imageSrc="/images/commercial-solar.jpg"
          href="/commercial-solar"
        />
        
        <ImageCard
          title="Hybrid Systems"
          description="Solar + battery storage solutions"
          imageSrc="/images/hybrid-solar.jpg"
          href="/hybrid-systems"
        />
      </div>
      
      <div className="grid grid-cols-3 gap-3 mt-3">
        <ImageCard
          title="Lithium Batteries"
          description="Advanced energy storage systems"
          imageSrc="/images/lithium-batteries.jpg"
          href="/lithium-batteries"
        />
        
        <ImageCard
          title="Energy Conservation"
          description="Energy efficiency services"
          imageSrc="/images/energy-conservation.jpg"
          href="/energy-conservation"
        />
        
        <ImageCard
          title="Maintenance & Repair"
          description="Solar system maintenance"
          imageSrc="/images/solar-maintenance.jpg"
          href="/maintenance"
        />
      </div>
    </div>
  );
  
  // Services mega menu content
  const servicesContent = (
    <div className="p-4">
      <div className="border-b border-gray-700 pb-2 mb-3">
        <h3 className="text-base font-bold text-center text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
          Solar Services
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-bold text-amber-300 mb-3 text-sm border-b border-amber-700/30 pb-1">Solar Installations</h4>
          <div className="grid grid-cols-1 gap-2">
            <ImageCard
              title="Residential Solar"
              description="Complete home solar systems"
              imageSrc="/images/residential-solar.jpg"
              href="/residential-solar"
            />
            
            <ImageCard
              title="Commercial Solar"
              description="Business solar installations"
              imageSrc="/images/commercial-solar.jpg"
              href="/commercial-solar"
            />
            
            <ImageCard
              title="Battery Storage"
              description="Energy storage solutions"
              imageSrc="/images/battery-storage.jpg"
              href="/battery-storage"
            />
          </div>
        </div>
        
        <div className="pl-3 border-l border-gray-700">
          <h4 className="font-bold text-amber-300 mb-3 text-sm border-b border-amber-700/30 pb-1">Services & Maintenance</h4>
          <div className="grid grid-cols-1 gap-2">
            <ImageCard
              title="System Maintenance"
              description="Regular solar panel cleaning & inspection"
              imageSrc="/images/solar-maintenance.jpg"
              href="/maintenance"
            />
            
            <ImageCard
              title="Repair Services"
              description="Solar system repairs & upgrades"
              imageSrc="/images/solar-repair.jpg"
              href="/repairs"
            />
            
            <ImageCard
              title="Energy Audits"
              description="Efficiency assessments & optimization"
              imageSrc="/images/energy-audit.jpg"
              href="/energy-audit"
            />
          </div>
        </div>
      </div>
    </div>
  );
  
  // Products mega menu content
  const productsContent = (
    <div className="p-4">
      <div className="border-b border-gray-700 pb-2 mb-3">
        <h3 className="text-base font-bold text-center text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
          Product Resources
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-bold text-white mb-2 text-sm">Resources</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/products" className="text-sm text-gray-300 hover:text-white transition-colors">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/roi-calculator" className="text-sm text-gray-300 hover:text-white transition-colors">
                ROI Calculator
              </Link>
            </li>
            <li>
              <Link href="/technology" className="text-sm text-gray-300 hover:text-white transition-colors">
                Technical Data
              </Link>
            </li>
            <li>
              <Link href="/application-guide" className="text-sm text-gray-300 hover:text-white transition-colors">
                Application Guide
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="border-l border-gray-700 pl-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-lg border border-gray-700">
            <h4 className="font-bold text-amber-400 mb-1 text-sm">Featured Product</h4>
            <h5 className="text-white font-bold mb-1 text-xs">Praetorian Shield™</h5>
            <p className="text-xs text-gray-300 mb-2">Our flagship protective coating with revolutionary ceramic technology.</p>
            <Link 
              href="/products/praetorian-shield" 
              className="text-xs text-amber-400 hover:text-amber-300 font-medium"
            >
              Learn More →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
  
  // About mega menu content
  const aboutContent = (
    <div className="p-4">
      <div className="border-b border-gray-700 pb-2 mb-3">
        <h3 className="text-base font-bold text-center text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
          About Advance Power
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-300 text-xs mb-3">
            North State's leader in renewable energy design, installation, service & technical expertise for over 20 years.
          </p>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <Link href="/about" className="text-xs text-gray-300 hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/faq" className="text-xs text-gray-300 hover:text-white transition-colors">
              FAQ
            </Link>
            <Link href="/energy-storage" className="text-xs text-gray-300 hover:text-white transition-colors">
              Energy Storage
            </Link>
            <Link href="/testimonials" className="text-xs text-gray-300 hover:text-white transition-colors">
              Testimonials
            </Link>
          </div>
        </div>
        
        <div className="border-l border-gray-700 pl-4">
          <h4 className="font-bold text-white text-xs mb-1">Contact Information</h4>
          <p className="text-gray-300 text-xs mb-1">(530) 226-0701</p>
          <a href="mailto:info@apredding.net" className="text-gray-300 text-xs hover:text-white block mb-3">
            info@apredding.net
          </a>
          
          <Link 
            href="#contact" 
            className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-md text-white text-xs font-medium"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
  
  // Solar Solutions mega menu content  
  const solarSolutionsContent = (
    <div className="p-4">
      <div className="border-b border-gray-700 pb-2 mb-3">
        <h3 className="text-base font-bold text-center text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
          Solar Resources
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="font-bold text-white mb-2 text-sm">Resources</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/solar-calculator" className="text-sm text-gray-300 hover:text-white transition-colors">
                Solar Calculator
              </Link>
            </li>
            <li>
              <Link href="/financing" className="text-sm text-gray-300 hover:text-white transition-colors">
                Financing Options
              </Link>
            </li>
            <li>
              <Link href="/technology" className="text-sm text-gray-300 hover:text-white transition-colors">
                Solar Technology
              </Link>
            </li>
            <li>
              <Link href="/installation-guide" className="text-sm text-gray-300 hover:text-white transition-colors">
                Installation Process
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="border-l border-gray-700 pl-4">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-3 rounded-lg border border-gray-700">
            <h4 className="font-bold text-yellow-400 mb-1 text-sm">Featured Solution</h4>
            <h5 className="text-white font-bold mb-1 text-xs">Hybrid Solar Systems</h5>
            <p className="text-xs text-gray-300 mb-2">Solar panels with lithium battery storage for energy independence.</p>
            <Link 
              href="/hybrid-systems" 
              className="text-xs text-yellow-400 hover:text-yellow-300 font-medium"
            >
              Learn More →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
  
  // CRM mega menu content
  const crmContent = (
    <div className="p-4">
      <div className="border-b border-gray-700 pb-2 mb-3">
        <h3 className="text-base font-bold text-center text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
          Praetorian CRM
        </h3>
      </div>
      
      <div className="flex flex-col space-y-2 mb-3">
        <Link href="/crm" className="flex items-center justify-between p-2 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors">
          <span className="font-bold text-xs text-white">CRM Dashboard</span>
          <span className="text-xs text-amber-400">Access →</span>
        </Link>
        
        <Link href="/inventory" className="flex items-center justify-between p-2 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors">
          <span className="font-bold text-xs text-white">Inventory Management</span>
          <span className="text-xs text-amber-400">Access →</span>
        </Link>
        
        <Link href="/analytics" className="flex items-center justify-between p-2 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-gray-500 transition-colors">
          <span className="font-bold text-xs text-white">Analytics & Reports</span>
          <span className="text-xs text-amber-400">Access →</span>
        </Link>
      </div>
      
      <div className="border-t border-gray-700 pt-2 text-right">
        <Link href="/crm-login" className="text-xs text-gray-300 hover:text-white">
          Admin Login →
        </Link>
      </div>
    </div>
  );
  
  return (
    <div className="flex-grow flex justify-end" ref={navRef}>
      <nav className="flex space-x-1">
        <NavItem
          label="Services"
          isOpen={activeMenu === 'services'}
          onClick={() => toggleMenu('services')}
          content={servicesContent}
        />
        
        <NavItem
          label="Energy Storage"
          isOpen={activeMenu === 'storage'}
          onClick={() => toggleMenu('storage')}
          content={solarSolutionsContent}
        />
        
        <NavItem
          label="About"
          isOpen={activeMenu === 'about'}
          onClick={() => toggleMenu('about')}
          content={aboutContent}
        />
      </nav>
    </div>
  );
}