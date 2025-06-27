import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { DropdownPortal } from './dropdown-portal';

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
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
  const [hovering, setHovering] = useState(false);
  
  // Update rect when active changes
  useEffect(() => {
    if (active === item && itemRef.current) {
      setRect(itemRef.current.getBoundingClientRect());
    }
  }, [active, item]);

  const handleMouseEnter = () => {
    setHovering(true);
    setActive(item);
  };

  const handleMouseLeave = () => {
    setHovering(false);
  };

  return (
    <div 
      ref={itemRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative py-2" // Added vertical padding for better touch target
    >
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-white/90 hover:text-white dark:text-white font-cinzel uppercase tracking-wide text-sm lg:text-base"
      >
        {item}
      </motion.p>
      
      {/* Portal-based dropdown that's rendered at the root level */}
      <DropdownPortal 
        isOpen={active === item}
        anchorRect={rect}
      >
        <div 
          className="w-max h-full p-4"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
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
  const [leaveTimer, setLeaveTimer] = useState<NodeJS.Timeout | null>(null);
  
  const handleMouseLeave = () => {
    // Clear any existing timer
    if (leaveTimer) clearTimeout(leaveTimer);
    
    // Set a new timer to close the menu after a delay
    const timer = setTimeout(() => {
      setActive(null);
    }, 500); // 500ms delay before closing
    
    setLeaveTimer(timer);
  };
  
  const handleMouseEnter = () => {
    // Clear the timer if the mouse re-enters the menu
    if (leaveTimer) {
      clearTimeout(leaveTimer);
      setLeaveTimer(null);
    }
  };
  
  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (leaveTimer) clearTimeout(leaveTimer);
    };
  }, [leaveTimer]);
  
  return (
    <nav
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="relative flex justify-center space-x-8 px-4 py-0.5" // Reduced vertical padding
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
    <Link href={href} className="flex flex-col group">
      <img
        src={src}
        width={130}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-lg object-cover border border-gray-700 group-hover:border-gray-400 transition-colors duration-300 mb-2"
      />
      <div>
        <h4 className="text-base font-bold mb-1 text-white group-hover:text-blue-300 transition-colors duration-300">
          {title}
        </h4>
        <p className="text-gray-200 text-xs group-hover:text-white transition-colors duration-300">
          {description}
        </p>
      </div>
    </Link>
  );
};

export const HoveredLink = ({ children, ...rest }: any) => {
  return (
    <Link
      {...rest}
      className="text-gray-200 hover:text-white transition-colors duration-300 py-1 block"
    >
      {children}
    </Link>
  );
};