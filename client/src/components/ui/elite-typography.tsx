import React from "react";
import { motion } from "framer-motion";

interface EliteHeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: "primary" | "gradient" | "solar";
  className?: string;
  animate?: boolean;
}

export const EliteHeading: React.FC<EliteHeadingProps> = ({
  children,
  level = 2,
  variant = "primary",
  className = "",
  animate = true
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const baseClasses = "font-black leading-tight tracking-tight";
  
  const sizeClasses = {
    1: "text-6xl md:text-7xl lg:text-8xl mb-12",
    2: "text-5xl md:text-6xl lg:text-7xl mb-10",
    3: "text-4xl md:text-5xl lg:text-6xl mb-8",
    4: "text-3xl md:text-4xl lg:text-5xl mb-6",
    5: "text-2xl md:text-3xl lg:text-4xl mb-4",
    6: "text-xl md:text-2xl lg:text-3xl mb-3"
  };

  const variantClasses = {
    primary: "text-gray-800 drop-shadow-lg",
    gradient: "bg-gradient-to-r from-orange-800 via-red-700 to-amber-800 bg-clip-text text-transparent drop-shadow-lg",
    solar: "bg-gradient-to-r from-orange-700 via-red-600 to-amber-700 bg-clip-text text-transparent drop-shadow-lg"
  };

  const textShadowStyle = {
    textShadow: "0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)"
  };

  const content = (
    <Tag 
      className={`${baseClasses} ${sizeClasses[level]} ${variantClasses[variant]} ${className}`}
      style={variant === "primary" ? textShadowStyle : {}}
    >
      {children}
    </Tag>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {content}
    </motion.div>
  );
};

interface EliteParagraphProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "secondary" | "muted";
  className?: string;
  animate?: boolean;
}

export const EliteParagraph: React.FC<EliteParagraphProps> = ({
  children,
  size = "lg",
  variant = "primary",
  className = "",
  animate = true
}) => {
  const sizeClasses = {
    sm: "text-lg md:text-xl",
    md: "text-xl md:text-2xl",
    lg: "text-2xl md:text-3xl",
    xl: "text-3xl md:text-4xl"
  };

  const variantClasses = {
    primary: "text-gray-800 font-medium",
    secondary: "text-gray-700 font-medium", 
    muted: "text-gray-600 font-normal"
  };

  const baseClasses = "leading-relaxed drop-shadow-sm max-w-5xl mx-auto";
  
  const textShadowStyle = {
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.05)"
  };

  const content = (
    <p 
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      style={textShadowStyle}
    >
      {children}
    </p>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
    >
      {content}
    </motion.div>
  );
};