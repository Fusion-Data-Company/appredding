import React from "react";
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
  return (
    <div onMouseEnter={() => setActive(item)} className="relative" style={{ zIndex: 9000 }}>
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer text-white/90 hover:text-white dark:text-white font-cinzel uppercase tracking-wide text-sm lg:text-base relative"
        style={{ zIndex: 9000 }}
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
          style={{ zIndex: 9500 }}
        >
          {active === item && (
            <div className="fixed top-[4.5rem] left-1/2 transform -translate-x-1/2 pt-4" style={{ position: 'fixed', zIndex: 99999 }}>
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-black/95 backdrop-blur-sm rounded-md overflow-hidden border border-white/[0.2] shadow-xl"
                style={{ zIndex: 99999 }}
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="w-max h-full p-4"
                >
                  {children}
                </motion.div>
              </motion.div>
            </div>
          )}
        </motion.div>
      )}
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
      style={{ zIndex: 9999, position: 'relative' }}
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
      className="text-gray-300 hover:text-white transition-colors duration-300 py-1 block"
    >
      {children}
    </Link>
  );
};