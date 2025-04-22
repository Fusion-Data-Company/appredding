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
        className="cursor-pointer text-gray-800 hover:text-primary-700 font-medium"
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
            <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4 z-50">
              <motion.div
                transition={transition}
                layoutId="active" // layoutId ensures smooth animation
                className="bg-white rounded-xl overflow-hidden border border-gray-200 shadow-xl"
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
      className="relative rounded-full border-2 border-[#ff6a00]/30 bg-[#1a1a1a] shadow-md flex justify-center space-x-8 px-8 py-4"
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
    <Link href={href} className="flex space-x-3 bg-[#222222] p-3 rounded-lg hover:bg-[#2a2a2a] transition-colors">
      <img
        src={imgSrc}
        width={140}
        height={70}
        alt={title}
        className="flex-shrink-0 rounded-md shadow-md border border-[#ff6a00]/20"
      />
      <div>
        <h4 className="text-base font-bold mb-1 text-white">
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
      className="text-gray-200 hover:text-[#ff6a00] font-medium transition-colors px-2 py-1.5 block"
    >
      {children}
    </Link>
  );
};