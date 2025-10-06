import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LucideIcon } from 'lucide-react';

export interface Feature {
  icon: React.ReactNode | LucideIcon;
  title: string;
  description: string;
  highlight?: boolean;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
  title?: string;
  subtitle?: string;
  description?: string;
  accentColor?: 'orange' | 'blue' | 'green' | 'purple';
}

const FeatureGrid: React.FC<FeatureGridProps> = ({
  features,
  columns = 3,
  title,
  subtitle,
  description,
  accentColor = 'orange'
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const accentStyles = {
    orange: {
      icon: 'text-orange-400',
      iconBg: 'bg-orange-500/10',
      border: 'border-orange-500/30',
      highlight: 'from-orange-500/20 to-orange-600/20',
      text: 'from-orange-400 to-orange-500'
    },
    blue: {
      icon: 'text-blue-400',
      iconBg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      highlight: 'from-blue-500/20 to-blue-600/20',
      text: 'from-blue-400 to-blue-500'
    },
    green: {
      icon: 'text-orange-400',
      iconBg: 'bg-orange-500/10',
      border: 'border-green-500/30',
      highlight: 'from-green-500/20 to-green-600/20',
      text: 'from-green-400 to-green-500'
    },
    purple: {
      icon: 'text-purple-400',
      iconBg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      highlight: 'from-purple-500/20 to-purple-600/20',
      text: 'from-purple-400 to-purple-500'
    }
  };

  const accent = accentStyles[accentColor];
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section ref={ref} className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || subtitle || description) && (
          <div className="text-center mb-12">
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="text-sm font-semibold tracking-wider uppercase mb-4"
              >
                <span className={`bg-gradient-to-r ${accent.text} bg-clip-text text-transparent`}>
                  {subtitle}
                </span>
              </motion.p>
            )}
            
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                {title}
              </motion.h2>
            )}
            
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-lg text-gray-300 max-w-3xl mx-auto"
              >
                {description}
              </motion.p>
            )}
          </div>
        )}
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={`grid ${gridCols[columns]} gap-6`}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative group ${feature.highlight ? 'md:col-span-2' : ''}`}
            >
              <div className={`
                h-full p-6 rounded-xl transition-all duration-300
                ${feature.highlight 
                  ? `bg-gradient-to-br ${accent.highlight} border ${accent.border}` 
                  : 'bg-gray-800/50 border border-gray-700 hover:bg-gray-800/70'
                }
                backdrop-blur-sm hover:scale-105 hover:shadow-xl
              `}>
                <div className={`
                  inline-flex p-3 rounded-lg ${accent.iconBg} mb-4
                `}>
                  <div className={accent.icon}>
                    {React.isValidElement(feature.icon) 
                      ? feature.icon 
                      : React.createElement(feature.icon as LucideIcon, { className: 'w-6 h-6' })
                    }
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureGrid;