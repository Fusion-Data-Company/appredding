"use client";
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
    <div onMouseEnter={() => setActive(item)} className="relative">
      <motion.p
        transition={{ duration: 0.3 }}
        className="cursor-pointer relative px-3 py-2 text-2xl font-bold tracking-wide uppercase after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:rounded-full after:origin-bottom after:scale-x-0 hover:after:scale-x-100 after:bg-gradient-to-r after:from-[#ff4500] after:via-[#ff6a00] after:to-[#ff8c00] after:transition-transform after:duration-300 font-heading gradient-text-blue hover:gradient-text-fire text-center"
      >
        {item}
      </motion.p>
      {active !== null && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={transition}
        >
          {active === item && (
            <div className="absolute top-[calc(100%_+_0.5rem)] left-1/2 transform -translate-x-1/2 pt-1 z-50">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-gradient-to-b from-gray-700/95 to-gray-800/95 backdrop-blur-3xl backdrop-filter before:absolute before:inset-0 before:bg-gray-600/50 before:z-[-1] relative rounded-xl overflow-hidden border border-[#ff6a00]/40 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] min-w-max"
              >
                <motion.div
                  layout // layout ensures smooth animation
                  className="h-full p-4"
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
      className="relative rounded-full border-2 border-[#ff6a00]/40 bg-gradient-to-r from-[#38b0de]/85 via-white/75 to-[#ff6a00]/85 backdrop-blur-xl shadow-[0_0_15px_rgba(255,106,0,0.3)] flex justify-center items-center space-x-6 px-6 py-2 w-max mx-auto"
    >
      {children}
    </nav>
  );
};

export const ProductItem = ({
  title,
  description,
  href,
  imgSrc,
}: {
  title: string;
  description: string;
  href: string;
  imgSrc: string;
}) => {
  return (
    <Link href={href} className="flex space-x-3 bg-gray-700/95 backdrop-blur-3xl backdrop-filter relative before:absolute before:inset-0 before:bg-gray-600/50 before:z-[-1] p-4 rounded-lg hover:bg-gray-600/95 transition-all border border-gray-600/50 hover:border-[#ff6a00]/40 shadow-md hover:shadow-lg">
      <img
        src={imgSrc}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-md border border-[#ff6a00]/20 hover:border-[#ff6a00]/40 transition-colors"
      />
      <div>
        <h4 className="text-lg font-extrabold mb-1 uppercase tracking-wide font-heading gradient-text-blue group-hover:gradient-text-fire transition-colors">
          {title}
        </h4>
        <p className="text-gray-300 text-sm max-w-[10rem]">
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
      className="text-gray-800 hover:text-gray-900 font-bold text-base uppercase tracking-wide transition-all px-2 py-1.5 block rounded-md relative after:absolute after:bottom-[-1px] after:left-2 after:right-2 after:h-[2px] after:rounded-full after:origin-bottom after:scale-x-0 hover:after:scale-x-100 after:bg-gradient-to-r after:from-[#ff4500] after:via-[#ff6a00] after:to-[#ff8c00] after:transition-transform after:duration-300 hover:bg-[#ff6a00]/20 font-heading text-center dark:text-shadow-[0_0_8px_rgba(255,255,255,0.5)] text-shadow-[0_0_1px_rgba(0,0,0,1),0_2px_3px_rgba(0,0,0,0.5)]"
    >
      {children}
    </Link>
  );
};