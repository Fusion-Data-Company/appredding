import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

interface CTAButton {
  text: string;
  link?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

interface PageHeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  ctaButtons?: CTAButton[];
  overlayColor?: 'orange' | 'blue';
  height?: 'full' | 'large' | 'medium';
}

const PageHeroSection: React.FC<PageHeroSectionProps> = ({
  title,
  subtitle,
  backgroundImage,
  ctaButtons = [],
  overlayColor = 'orange',
  height = 'large'
}) => {
  const heightClasses = {
    full: 'min-h-screen',
    large: 'min-h-[600px]',
    medium: 'min-h-[400px]'
  };

  const overlayGradients = {
    orange: 'from-orange-900/90 via-orange-800/80 to-orange-700/70',
    blue: 'from-blue-900/90 via-blue-800/80 to-blue-700/70'
  };

  const buttonColors = {
    orange: {
      primary: 'from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700',
      secondary: 'border-orange-500 text-orange-400 hover:bg-orange-500 hover:text-white'
    },
    blue: {
      primary: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      secondary: 'border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white'
    }
  };

  const colors = buttonColors[overlayColor];

  return (
    <section className={`relative ${heightClasses[height]} flex items-center overflow-hidden`}>
      {/* Background Image */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      )}

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 z-[1] bg-gradient-to-br ${overlayGradients[overlayColor]}`} />

      {/* Content */}
      <div className="relative z-10 w-full py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-lg font-semibold text-white/90 mb-4"
              >
                {subtitle}
              </motion.p>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8"
            >
              {title}
            </motion.h1>

            {ctaButtons.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="flex gap-4 justify-center flex-wrap"
              >
                {ctaButtons.map((button, index) => (
                  <React.Fragment key={index}>
                    {button.link ? (
                      <Link href={button.link}>
                        <Button 
                          size="lg"
                          className={
                            button.variant === 'secondary'
                              ? `border-2 ${colors.secondary} py-3 px-8 text-lg`
                              : `bg-gradient-to-r ${colors.primary} text-white font-bold py-3 px-8 text-lg shadow-lg transform transition hover:scale-105`
                          }
                        >
                          {button.text}
                          {button.variant !== 'secondary' && <ArrowRight className="ml-2 h-5 w-5" />}
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        size="lg"
                        onClick={button.onClick}
                        className={
                          button.variant === 'secondary'
                            ? `border-2 ${colors.secondary} py-3 px-8 text-lg`
                            : `bg-gradient-to-r ${colors.primary} text-white font-bold py-3 px-8 text-lg shadow-lg transform transition hover:scale-105`
                        }
                      >
                        {button.text}
                        {button.variant !== 'secondary' && <ArrowRight className="ml-2 h-5 w-5" />}
                      </Button>
                    )}
                  </React.Fragment>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PageHeroSection;