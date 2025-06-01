import { motion } from 'framer-motion';

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'minimal';
  text?: string;
}

export const AdvancedLoader = ({ 
  size = 'md', 
  variant = 'primary',
  text = 'Loading...'
}: LoaderProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const dotVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 0, -10],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  if (variant === 'minimal') {
    return (
      <div className="flex items-center justify-center">
        <div className="spinner-advanced"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {variant === 'primary' ? (
        <div className={`relative ${sizeClasses[size]}`}>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-blue-500 animate-spin">
            <div className="absolute inset-2 rounded-full bg-gray-900"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-2 h-2 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      ) : (
        <motion.div
          className="flex space-x-2"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-3 h-3 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full"
              variants={dotVariants}
            />
          ))}
        </motion.div>
      )}
      
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-400 font-medium"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
};

export const SectionLoader = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-gray-700 rounded-full"></div>
        <div className="absolute top-0 left-0 w-20 h-20 border-4 border-t-orange-500 border-r-blue-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-gray-900/95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 border-4 border-gray-700 rounded-full"></div>
          <div className="absolute top-0 left-0 w-24 h-24 border-4 border-t-orange-500 border-r-blue-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <h3 className="text-xl font-semibold text-white">Loading Experience</h3>
          <p className="text-gray-400">Preparing advanced solar solutions...</p>
        </motion.div>
      </div>
    </div>
  );
};