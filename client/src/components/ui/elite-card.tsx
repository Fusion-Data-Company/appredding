import React from "react";
import { motion } from "framer-motion";

interface EliteCardProps {
  children: React.ReactNode;
  variant?: "solar" | "premium" | "enterprise";
  size?: "sm" | "md" | "lg";
  className?: string;
  animate?: boolean;
  glowEffect?: boolean;
}

export const EliteCard: React.FC<EliteCardProps> = ({
  children,
  variant = "solar",
  size = "md",
  className = "",
  animate = true,
  glowEffect = true
}) => {
  const sizeClasses = {
    sm: "p-6 rounded-2xl",
    md: "p-8 rounded-3xl", 
    lg: "p-10 rounded-3xl"
  };

  const variantClasses = {
    solar: "bg-gradient-to-br from-white via-orange-50 to-amber-50 border-2 border-orange-200 hover:border-orange-400",
    premium: "bg-gradient-to-br from-white via-yellow-50 to-orange-50 border-2 border-yellow-200 hover:border-orange-400",
    enterprise: "bg-gradient-to-br from-white via-amber-50 to-red-50 border-2 border-amber-200 hover:border-red-400"
  };

  const glowClasses = {
    solar: "shadow-xl hover:shadow-2xl",
    premium: "shadow-xl hover:shadow-2xl",
    enterprise: "shadow-xl hover:shadow-2xl"
  };

  const baseClasses = `
    relative backdrop-blur-sm transition-all duration-500 overflow-hidden group
    ${sizeClasses[size]} ${variantClasses[variant]} ${glowClasses[variant]} ${className}
  `;

  const content = (
    <div className={baseClasses}>
      {/* Elite Glow Effect */}
      {glowEffect && (
        <div className="absolute -inset-1 bg-gradient-to-br from-orange-500/30 via-red-500/30 to-amber-500/30 opacity-20 group-hover:opacity-50 blur-xl transition-opacity duration-500 rounded-3xl" />
      )}
      
      {/* Premium Solar Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 gap-0.5 h-full w-full">
          {[...Array(64)].map((_, i) => (
            <motion.div 
              key={i} 
              className="bg-green-500 rounded-sm"
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, delay: i * 0.05 }}
            />
          ))}
        </div>
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Elite Border Enhancement */}
      <div className="absolute inset-0 rounded-3xl border border-white/20 group-hover:border-white/40 transition-all duration-300" />
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03, y: -8 }}
      className="group"
    >
      {content}
    </motion.div>
  );
};

interface EliteIconProps {
  children: React.ReactNode;
  variant?: "solar" | "premium" | "enterprise";
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

export const EliteIcon: React.FC<EliteIconProps> = ({
  children,
  variant = "solar",
  size = "md",
  animate = true
}) => {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20"
  };

  const content = (
    <div className={`inline-flex items-center justify-center ${sizeClasses[size]} bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mb-6 text-white shadow-2xl border-2 border-orange-300 group-hover:scale-110 transition-transform duration-300`}>
      {children}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      whileHover={{ rotate: [0, -10, 10, 0] }}
      transition={{ duration: 0.5 }}
    >
      {content}
    </motion.div>
  );
};