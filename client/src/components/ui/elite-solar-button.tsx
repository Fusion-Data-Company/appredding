import React from "react";
import { motion } from "framer-motion";
import { Sun } from "lucide-react";

interface EliteSolarButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "primary" | "secondary" | "accent";
  disabled?: boolean;
}

export const EliteSolarButton: React.FC<EliteSolarButtonProps> = ({
  children,
  onClick,
  className = "",
  icon,
  size = "md",
  variant = "primary",
  disabled = false
}) => {
  const sizeClasses = {
    sm: "py-2 px-4 text-sm rounded-lg",
    md: "py-3 px-6 text-base rounded-xl",
    lg: "py-4 px-8 text-lg rounded-xl",
    xl: "py-5 px-10 text-xl rounded-2xl"
  };

  const baseClasses = `
    relative overflow-hidden font-bold transform transition-all duration-300
    ${sizeClasses[size]}
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    ${className}
  `;

  return (
    <motion.button
      onClick={disabled ? undefined : onClick}
      className={baseClasses}
      whileHover={disabled ? {} : { scale: 1.05, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      style={{
        background: "linear-gradient(135deg, #fbbf24 0%, #f97316 30%, #ef4444 70%, #eab308 100%)",
        boxShadow: "0 0 30px rgba(251, 191, 36, 0.6), 0 8px 25px rgba(249, 115, 22, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 15px 35px rgba(239, 68, 68, 0.2)"
      }}
    >
      {/* Elite Solar Panel Grid Background Pattern */}
      <div className="absolute inset-0 opacity-15">
        <div className="grid grid-cols-4 gap-0.5 h-full w-full">
          {[...Array(16)].map((_, i) => (
            <motion.div 
              key={i} 
              className="bg-white/40 rounded-sm"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </div>
      </div>
      
      {/* Premium Animated Sun Rays */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-0.5 bg-white/30"
              style={{
                height: size === "xl" ? "20px" : size === "lg" ? "16px" : "12px",
                transformOrigin: "bottom center",
                transform: `rotate(${i * 30}deg) translateY(-${size === "xl" ? "24px" : size === "lg" ? "20px" : "16px"})`
              }}
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
            />
          ))}
        </motion.div>
      </div>
      
      {/* Elite Glow Effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/30 to-red-400/20 rounded-xl"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Premium Content Layer */}
      <div className="relative z-10 flex items-center justify-center gap-2 text-white">
        {icon || <Sun className={`${size === "xl" ? "h-6 w-6" : size === "lg" ? "h-5 w-5" : "h-4 w-4"} drop-shadow-lg`} />}
        <span className="font-bold tracking-wide drop-shadow-lg">{children}</span>
      </div>
      
      {/* Elite Shine Effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12"
        initial={{ x: "-100%" }}
        whileHover={{ x: "100%" }}
        transition={{ duration: 0.8 }}
      />
      
      {/* Premium Border Glow */}
      <div className="absolute inset-0 rounded-xl border-2 border-white/20 group-hover:border-white/40 transition-all duration-300" />
    </motion.button>
  );
};