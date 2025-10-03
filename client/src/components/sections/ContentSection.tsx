import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ContentSectionProps {
  title?: string;
  subtitle?: string;
  content?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'dark' | 'light';
  alignment?: 'left' | 'center' | 'right';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '7xl';
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '7xl': 'max-w-7xl'
};

const variantClasses = {
  default: 'bg-gray-900 text-white',
  dark: 'bg-black text-white',
  light: 'bg-gray-50 text-gray-900'
};

const alignmentClasses = {
  left: 'text-left',
  center: 'text-center mx-auto',
  right: 'text-right'
};

const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  subtitle,
  content,
  children,
  className = '',
  variant = 'default',
  alignment = 'left',
  maxWidth = '7xl'
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className={`py-16 ${variantClasses[variant]} ${className}`} ref={ref}>
      <div className={`${maxWidthClasses[maxWidth]} mx-auto px-4 sm:px-6 lg:px-8`}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className={alignmentClasses[alignment]}
        >
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
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
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-8"
            >
              {title}
            </motion.h2>
          )}
          
          {content && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="prose prose-lg max-w-none"
            >
              {content}
            </motion.div>
          )}
          
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              {children}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContentSection;