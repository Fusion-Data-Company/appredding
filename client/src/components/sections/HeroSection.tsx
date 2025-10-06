import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  backgroundGradient?: string;
  primaryButton?: {
    text: string;
    link?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
  secondaryButton?: {
    text: string;
    link?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
  children?: React.ReactNode;
  variant?: 'default' | 'centered' | 'split';
  glowColor?: 'orange' | 'blue' | 'green' | 'purple';
}

const glowStyles = {
  orange: {
    outer: 'bg-green-500/20',
    middle: 'bg-green-600/10',
    inner: 'bg-green-700/5',
    border: 'border-orange-700/30',
    primary: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
    textGradient: 'from-orange-400 to-orange-500'
  },
  blue: {
    outer: 'bg-blue-500/20',
    middle: 'bg-blue-600/10',
    inner: 'bg-blue-700/5',
    border: 'border-blue-700/30',
    primary: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    textGradient: 'from-blue-400 to-blue-500'
  },
  green: {
    outer: 'bg-green-500/20',
    middle: 'bg-green-600/10',
    inner: 'bg-green-700/5',
    border: 'border-green-700/30',
    primary: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    textGradient: 'from-green-400 to-green-500'
  },
  purple: {
    outer: 'bg-purple-500/20',
    middle: 'bg-purple-600/10',
    inner: 'bg-purple-700/5',
    border: 'border-purple-700/30',
    primary: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    textGradient: 'from-purple-400 to-purple-500'
  }
};

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  backgroundImage,
  backgroundGradient = 'linear-gradient(145deg, #0c0c14 0%, #101830 30%, #152238 60%, #0e1a2a 100%)',
  primaryButton,
  secondaryButton,
  children,
  variant = 'default',
  glowColor = 'orange'
}) => {
  const glow = glowStyles[glowColor];
  
  const containerContent = (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className={`${variant === 'centered' ? 'text-center' : 'text-left'}`}
      >
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-sm font-semibold tracking-wider uppercase mb-4"
          >
            <span className={`bg-gradient-to-r ${glow.textGradient} bg-clip-text text-transparent`}>
              {subtitle}
            </span>
          </motion.p>
        )}
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
        >
          {title}
        </motion.h1>
        
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl"
          >
            {description}
          </motion.p>
        )}
        
        {(primaryButton || secondaryButton) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className={`flex gap-4 ${variant === 'centered' ? 'justify-center' : ''} flex-wrap`}
          >
            {primaryButton && (
              primaryButton.link ? (
                <Link href={primaryButton.link}>
                  <Button 
                    className={`bg-gradient-to-r ${glow.primary} text-white font-bold py-3 px-8 text-lg shadow-lg transform transition hover:scale-105`}
                  >
                    {primaryButton.icon}
                    {primaryButton.text}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Button 
                  onClick={primaryButton.onClick}
                  className={`bg-gradient-to-r ${glow.primary} text-white font-bold py-3 px-8 text-lg shadow-lg transform transition hover:scale-105`}
                >
                  {primaryButton.icon}
                  {primaryButton.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              )
            )}
            
            {secondaryButton && (
              secondaryButton.link ? (
                <Link href={secondaryButton.link}>
                  <Button 
                    variant="outline"
                    className="border-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white py-3 px-8 text-lg"
                  >
                    {secondaryButton.icon}
                    {secondaryButton.text}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Button 
                  onClick={secondaryButton.onClick}
                  variant="outline"
                  className="border-2 border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white py-3 px-8 text-lg"
                >
                  {secondaryButton.icon}
                  {secondaryButton.text}
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              )
            )}
          </motion.div>
        )}
      </motion.div>
      
      {children && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className={variant === 'split' ? 'lg:w-1/2' : ''}
        >
          {children}
        </motion.div>
      )}
    </>
  );

  return (
    <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
      {/* Background layers */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1
          }}
        />
      )}
      
      <div 
        className="absolute inset-0 z-[1]"
        style={{ background: backgroundGradient }}
      />
      
      {/* Content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="relative">
          {/* Multi-layer glow effect */}
          <div className={`absolute -inset-10 ${glow.outer} rounded-xl blur-xl opacity-70 animate-pulse-slow`}></div>
          <div className={`absolute -inset-20 ${glow.middle} rounded-xl blur-2xl opacity-50`}></div>
          <div className={`absolute -inset-30 ${glow.inner} rounded-xl blur-3xl opacity-30`}></div>
          
          {/* Glass morphism container */}
          <div className={`relative z-20 rounded-2xl overflow-hidden backdrop-blur-sm`}>
            <div className={`bg-gradient-to-br from-gray-900/95 via-black/98 to-gray-900/95 border ${glow.border} shadow-2xl p-12`}>
              {variant === 'split' ? (
                <div className="flex flex-col lg:flex-row gap-12 items-center">
                  {containerContent}
                </div>
              ) : (
                containerContent
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;