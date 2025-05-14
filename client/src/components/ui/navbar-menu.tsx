import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";

const transition = {
  type: "spring",
  mass: 0.5,
  damping: 11.5,
  stiffness: 100,
  restDelta: 0.001,
  restSpeed: 0.001,
};

import { DropdownPortal } from './dropdown-portal';

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
      <motion.p
        transition={{ duration: 0.3 }}
        className="shimmer-text cursor-pointer text-white/90 hover:text-white dark:text-white font-cinzel uppercase tracking-wide text-sm lg:text-base"
      >
        {item}
      </motion.p>
      
      {/* Portal-based dropdown that's rendered at the root level */}
      <DropdownPortal 
        isOpen={active === item}
        anchorRect={rect}
      >
        <div className="w-max h-full p-4">
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
      onMouseLeave={() => setActive(null)} // resets the state
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
    <Link href={href} className="flex space-x-3 group">
      <img
        src={src}
        width={160}
        height={90}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-lg object-cover border border-gray-700 group-hover:border-gray-400 transition-colors duration-300"
      />
      <div>
        <h4 className="text-lg font-bold mb-1 text-white group-hover:text-blue-300 transition-colors duration-300">
          {title}
        </h4>
        <p className="text-gray-300 text-sm max-w-[12rem] group-hover:text-gray-200 transition-colors duration-300">
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
      className="shimmer-element shimmer-element-subtle text-gray-300 hover:text-white transition-colors duration-300 py-1 block"
    >
      {children}
    </Link>
  );
};