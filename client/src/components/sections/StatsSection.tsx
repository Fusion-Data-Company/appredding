import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { LucideIcon } from 'lucide-react';

export interface Stat {
  value: string | number;
  label: string;
  suffix?: string;
  prefix?: string;
  icon?: React.ReactNode | LucideIcon;
}

interface StatsSectionProps {
  stats: Stat[];
  title?: string;
  subtitle?: string;
  description?: string;
  columns?: 2 | 3 | 4;
  variant?: 'default' | 'bordered' | 'highlighted';
  accentColor?: 'orange' | 'blue' | 'green' | 'purple';
  backgroundColor?: string;
}

const StatsSection: React.FC<StatsSectionProps> = ({
  stats,
  title,
  subtitle,
  description,
  columns = 4,
  variant = 'default',
  accentColor = 'orange',
  backgroundColor = 'bg-gray-900'
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const accentStyles = {
    orange: {
      text: 'from-orange-400 to-orange-500',
      border: 'border-orange-500/30',
      highlight: 'from-orange-500/10 to-orange-600/10',
      icon: 'text-orange-400'
    },
    blue: {
      text: 'from-blue-400 to-blue-500',
      border: 'border-blue-500/30',
      highlight: 'from-blue-500/10 to-blue-600/10',
      icon: 'text-blue-400'
    },
    green: {
      text: 'from-green-400 to-green-500',
      border: 'border-green-500/30',
      highlight: 'from-green-500/10 to-green-600/10',
      icon: 'text-orange-400'
    },
    purple: {
      text: 'from-purple-400 to-purple-500',
      border: 'border-purple-500/30',
      highlight: 'from-purple-500/10 to-purple-600/10',
      icon: 'text-purple-400'
    }
  };

  const accent = accentStyles[accentColor];
  
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 lg:grid-cols-4'
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section ref={ref} className={`py-16 relative ${backgroundColor}`}>
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
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`
                text-center p-6 rounded-xl
                ${variant === 'bordered' 
                  ? `border ${accent.border} bg-gray-800/30` 
                  : variant === 'highlighted'
                  ? `bg-gradient-to-br ${accent.highlight} backdrop-blur-sm border ${accent.border}`
                  : ''
                }
              `}
            >
              {stat.icon && (
                <div className={`mb-4 ${accent.icon} flex justify-center`}>
                  {React.isValidElement(stat.icon) 
                    ? stat.icon 
                    : React.createElement(stat.icon as LucideIcon, { className: 'w-8 h-8' })
                  }
                </div>
              )}
              
              <motion.div 
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.2 + (index * 0.1) }}
              >
                <span className={`bg-gradient-to-r ${accent.text} bg-clip-text text-transparent`}>
                  {stat.prefix}{stat.value}{stat.suffix}
                </span>
              </motion.div>
              
              <p className="text-gray-400 text-sm md:text-base">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;