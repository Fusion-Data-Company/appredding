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
  
  // Solutions mega menu content
  const solutionsContent = (
    <div className="p-4">
      <div className="border-b border-gray-700 pb-2 mb-3">
        <h3 className="text-base font-bold text-center text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
          Protection Across Every Industry
        </h3>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        <ImageCard
          title="Fire Prevention"
          description="Industry-leading fire retardant coatings"
          imageSrc={solutionImages.firePrevention}
          href="/fire-prevention"
        />
        
        <ImageCard
          title="Marinas"
          description="Advanced coating solutions for marine environments"
          imageSrc={solutionImages.marinas}
          href="/marinas"
        />
        
        <ImageCard
          title="Pools"
          description="Premium pool coating and protection systems"
          imageSrc={solutionImages.pools}
          href="/pools"
        />
      </div>
      
      <div className="grid grid-cols-3 gap-3 mt-3">
        <ImageCard
          title="Construction"
          description="Durable solutions for construction applications"
          imageSrc={solutionImages.construction}
          href="/construction"
        />
        
        <ImageCard
          title="Mobile Home & R.V."
          description="Specialized coatings for mobile structures"
          imageSrc={solutionImages.mobileHome}
          href="/mobile-home"
        />
        
        <ImageCard
          title="Municipality"
          description="Infrastructure protection for public services"
          imageSrc={solutionImages.municipality}
          href="/municipality"
        />
      </div>
    </div>
  );
  
  // Professionals mega menu content
  const professionalsContent = (
    <div className="p-4">
      <div className="border-b border-gray-700 pb-2 mb-3">
        <h3 className="text-base font-bold text-center text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
          Professional Network
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="grid grid-cols-1 gap-3">
            <ImageCard
              title="Painters"
              description="Premium painting profit solutions"
              imageSrc={professionalImages.painters}
              href="/painters"
            />
            
            <ImageCard
              title="Pool Professionals"
              description="Certified pool coating specialists"
              imageSrc={professionalImages.poolPros}
              href="/pools"
            />
          </div>
        </div>
        
        <div className="pl-3 border-l border-gray-700">
          <h4 className="font-bold text-white mb-2 text-sm">Program Benefits</h4>
          <ul className="space-y-1 text-xs">
            <li className="flex items-center text-gray-300">
              <div className="w-1 h-1 rounded-full bg-amber-500 mr-1"></div>
              <span>Exclusive training and certification</span>
            </li>
            <li className="flex items-center text-gray-300">
              <div className="w-1 h-1 rounded-full bg-amber-500 mr-1"></div>
              <span>Marketing and lead generation support</span>
            </li>
            <li className="flex items-center text-gray-300">
              <div className="w-1 h-1 rounded-full bg-amber-500 mr-1"></div>
              <span>Technical support and resources</span>
            </li>
            <li className="flex items-center text-gray-300">
              <div className="w-1 h-1 rounded-full bg-amber-500 mr-1"></div>
              <span>Preferred pricing on products</span>
            </li>
            <li className="mt-3">
              <Link href="/professional-registration" className="text-xs text-amber-400 hover:text-amber-300 font-medium">
                Register as a Professional →
              </Link>
            </li>
          </ul>
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
          About Praetorian
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-300 text-xs mb-3">
            Revolutionary protective coatings with ceramic technology derived from NASA research.
          </p>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
            <Link href="/about" className="text-xs text-gray-300 hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/team" className="text-xs text-gray-300 hover:text-white transition-colors">
              Our Team
            </Link>
            <Link href="/partners" className="text-xs text-gray-300 hover:text-white transition-colors">
              Partners
            </Link>
            <Link href="/careers" className="text-xs text-gray-300 hover:text-white transition-colors">
              Careers
            </Link>
          </div>
        </div>
        
        <div className="border-l border-gray-700 pl-4">
          <h4 className="font-bold text-white text-xs mb-1">Contact Information</h4>
          <p className="text-gray-300 text-xs mb-1">(916) 809-6619</p>
          <a href="mailto:info@praetoriansmartcoat.com" className="text-gray-300 text-xs hover:text-white block mb-3">
            info@praetoriansmartcoat.com
          </a>
          
          <Link 
            href="/contact" 
            className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-md text-white text-xs font-medium"
          >
            Contact Us
          </Link>
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
          label="Solutions"
          isOpen={activeMenu === 'solutions'}
          onClick={() => toggleMenu('solutions')}
          content={solutionsContent}
        />
        
        <NavItem
          label="Professionals"
          isOpen={activeMenu === 'professionals'}
          onClick={() => toggleMenu('professionals')}
          content={professionalsContent}
        />
        
        <NavItem
          label="Products"
          isOpen={activeMenu === 'products'}
          onClick={() => toggleMenu('products')}
          content={productsContent}
        />
        
        <NavItem
          label="About"
          isOpen={activeMenu === 'about'}
          onClick={() => toggleMenu('about')}
          content={aboutContent}
        />
        
        <NavItem
          label="CRM"
          isOpen={activeMenu === 'crm'}
          onClick={() => toggleMenu('crm')}
          content={crmContent}
        />
      </nav>
    </div>
  );
}