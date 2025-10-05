import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ContentSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  children: React.ReactNode;
  backgroundColor?: string;
  fullWidth?: boolean;
  className?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  subtitle,
  description,
  children,
  backgroundColor = 'bg-gray-900',
  fullWidth = false,
  className = ''
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section ref={ref} className={`py-16 relative ${backgroundColor === 'bg-gray-900' || backgroundColor === 'bg-gradient-to-br from-gray-900 to-black' ? 'bg-gradient-mesh' : backgroundColor} ${className}`}>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7 }}
        className={`${fullWidth ? 'w-full' : 'max-w-7xl mx-auto'} px-4 sm:px-6 lg:px-8`}
      >
        {(title || subtitle || description) && (
          <div className="text-center mb-12">
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-sm font-semibold tracking-wider uppercase mb-4"
              >
                <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                  {subtitle}
                </span>
              </motion.p>
            )}
            
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold text-white mb-6"
              >
                {title}
              </motion.h2>
            )}
            
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-lg text-gray-300 max-w-3xl mx-auto"
              >
                {description}
              </motion.p>
            )}
          </div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {children}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContentSection;