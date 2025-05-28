import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight } from "lucide-react";

// Premium animation transition presets
const transition = {
  type: "spring",
  mass: 0.5,
  damping: 12,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

import { DropdownPortal } from './dropdown-portal';

// Default category images using relative paths
const categoryImages = {
  "pools": "/images/pools-bg.jpg", 
  "marinas": "/images/marine-bg.jpg",
  "fire": "/images/fire-prevention.jpg",
  "construction": "/images/construction-bg.jpg",
  "mobile": "/images/mobile-home-bg.jpg",
  "municipality": "/images/municipality-bg.jpg",
  "painters": "/images/painters-bg.jpg"
};

export const MenuItem = ({
  setActive,
  active,
  item,
  children,
}: {
  setActive: (item: string) => void;
  active: string | null;
  item: string;
  children?: React.ReactNode;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  
  // Update rect when active changes
  useEffect(() => {
    if (active === item && itemRef.current) {
      setRect(itemRef.current.getBoundingClientRect());
    }
  }, [active, item]);

  return (
    <div 
      ref={itemRef}
      onMouseEnter={() => setActive(item)} 
      className="relative"
    >
      {/* Premium menu item with hover indicator */}
      <div className="relative group">
        {/* Animated highlight line */}
        <motion.div 
          initial={{ width: 0, opacity: 0 }} 
          animate={{ 
            width: active === item ? "100%" : 0, 
            opacity: active === item ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
          className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-orange-500"
        />
        
        <motion.p
          transition={{ duration: 0.3 }}
          className={`cursor-pointer font-cinzel uppercase tracking-wide text-sm lg:text-base px-2 py-1
                     ${active === item 
                       ? 'bg-gradient-to-r from-blue-500 to-orange-500 bg-clip-text text-transparent font-bold' 
                       : 'text-slate-200 hover:text-white'}`}
        >
          {item}
        </motion.p>
      </div>
      
      {/* Portal-based dropdown that's rendered at the root level */}
      <DropdownPortal 
        isOpen={active === item}
        anchorRect={rect}
      >
        <div className="w-max h-full py-6 px-6">
          {children}
        </div>
      </DropdownPortal>
    </div>
  );
};

export const Menu = ({
  setActive,
  children,
}: {
  setActive: (item: string | null) => void;
  children: React.ReactNode;
}) => {
  return (
    <nav
      onMouseLeave={() => setActive(null)}
      className="relative flex justify-center space-x-8 px-4 py-2"
      style={{ zIndex: 2147483646, position: 'relative' }}
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  src,
}: {
  title: string;
  description: string;
  href: string;
  src: string;
}) => {
  return (
    <Link href={href} className="flex space-x-4 group p-2 rounded-lg hover:bg-blue-900/20 transition-all duration-300">
      <div className="relative flex-shrink-0 w-[120px] h-[80px] overflow-hidden rounded-lg">
        {/* Image glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-tr from-blue-500/40 to-orange-500/40 mix-blend-overlay rounded-lg"></div>
        
        {/* Premium border effect */}
        <div className="absolute inset-0 border border-blue-500/20 group-hover:border-blue-400/40 rounded-lg transition-colors duration-300"></div>
        
        <img
          src={src || categoryImages.pools} // Fallback to a default image
          alt={title}
          className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      <div className="flex-1">
        <h4 className="text-base font-bold mb-1 group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-orange-400 group-hover:bg-clip-text group-hover:text-transparent transition-colors duration-300 text-gray-900 dark:text-gray-100">
          {title}
        </h4>
        <p className="text-gray-600 dark:text-gray-300 text-xs max-w-[12rem] group-hover:text-gray-500 dark:group-hover:text-gray-200 transition-colors duration-300 line-clamp-3">
          {description}
        </p>
      </div>
      
      {/* Arrow indicator for navigation */}
      <div className="self-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
        <ChevronRight className="h-4 w-4 text-orange-400" />
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, className = "", ...rest }: any) => {
  return (
    <Link
      {...rest}
      className={`relative group overflow-hidden ${className}`}
    >
      <span className="inline-block w-full text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300 py-1.5 px-2">
        {children}
        
        {/* Hover indicator line with gradient */}
        <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-blue-500/70 via-blue-400 to-orange-500/70 
                        group-hover:w-full transition-all duration-300 ease-out"></span>
                        
        {/* Subtle background hover effect */}
        <span className="absolute inset-0 w-full h-full bg-white/0 group-hover:bg-white/5 transition-colors duration-300 rounded-md -z-10"></span>
      </span>
    </Link>
  );
};