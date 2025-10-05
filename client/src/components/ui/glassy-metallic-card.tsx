import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface GlassyMetallicCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  accentColor?: 'blue' | 'green' | 'orange' | 'purple' | 'cyan' | 'yellow';
  iconBackgroundColor?: string;
  className?: string;
  children?: React.ReactNode;
}

const accentColorStyles = {
  blue: {
    iconGradient: 'from-blue-400 via-blue-500 to-blue-600',
    iconShadow: 'shadow-blue-500/50',
    borderHover: 'hover:border-blue-400',
    glowColor: '59, 130, 246', // RGB for blue-500
    textAccent: 'text-blue-600'
  },
  green: {
    iconGradient: 'from-green-400 via-green-500 to-green-600',
    iconShadow: 'shadow-green-500/50',
    borderHover: 'hover:border-green-400',
    glowColor: '34, 197, 94', // RGB for green-500
    textAccent: 'text-green-600'
  },
  orange: {
    iconGradient: 'from-orange-400 via-orange-500 to-orange-600',
    iconShadow: 'shadow-orange-500/50',
    borderHover: 'hover:border-orange-400',
    glowColor: '249, 115, 22', // RGB for orange-500
    textAccent: 'text-orange-600'
  },
  purple: {
    iconGradient: 'from-purple-400 via-purple-500 to-purple-600',
    iconShadow: 'shadow-purple-500/50',
    borderHover: 'hover:border-purple-400',
    glowColor: '168, 85, 247', // RGB for purple-500
    textAccent: 'text-purple-600'
  },
  cyan: {
    iconGradient: 'from-cyan-400 via-cyan-500 to-cyan-600',
    iconShadow: 'shadow-cyan-500/50',
    borderHover: 'hover:border-cyan-400',
    glowColor: '6, 182, 212', // RGB for cyan-500
    textAccent: 'text-cyan-600'
  },
  yellow: {
    iconGradient: 'from-yellow-400 via-yellow-500 to-yellow-600',
    iconShadow: 'shadow-yellow-500/50',
    borderHover: 'hover:border-yellow-400',
    glowColor: '234, 179, 8', // RGB for yellow-500
    textAccent: 'text-yellow-600'
  }
};

export const GlassyMetallicCard = ({
  icon: Icon,
  title,
  description,
  accentColor = 'blue',
  iconBackgroundColor,
  className,
  children
}: GlassyMetallicCardProps) => {
  const accent = accentColorStyles[accentColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        // Base styling
        'group relative rounded-2xl p-6',
        // Glass effect with bright, readable background
        'bg-gradient-to-br from-white/95 via-white/90 to-white/95',
        'backdrop-blur-md',
        // Border with metallic gradient
        'border-2 border-gray-200',
        accent.borderHover,
        // Shadows for depth
        'shadow-lg hover:shadow-2xl',
        // Smooth transitions
        'transition-all duration-300',
        // Accessibility
        'focus-within:ring-2 focus-within:ring-offset-2',
        `focus-within:ring-${accentColor}-400`,
        className
      )}
      style={{
        boxShadow: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
      }}
      onMouseEnter={(e) => {
        // Add glow effect on hover
        e.currentTarget.style.boxShadow = `
          0 20px 25px -5px rgba(0, 0, 0, 0.1),
          0 10px 10px -5px rgba(0, 0, 0, 0.04),
          0 0 30px rgba(${accent.glowColor}, 0.3)
        `;
      }}
      onMouseLeave={(e) => {
        // Remove glow effect
        e.currentTarget.style.boxShadow = `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`;
      }}
      data-testid={`glassy-metallic-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Subtle gradient overlay for metallic effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/50 via-transparent to-gray-100/30 pointer-events-none" />

      {/* Icon container with metallic gradient */}
      <motion.div
        whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
        transition={{ duration: 0.5 }}
        className={cn(
          'relative inline-flex p-4 rounded-xl mb-6',
          'bg-gradient-to-br',
          iconBackgroundColor || accent.iconGradient,
          'shadow-lg',
          accent.iconShadow,
          // Add metallic shine effect
          'before:absolute before:inset-0 before:rounded-xl',
          'before:bg-gradient-to-br before:from-white/40 before:via-transparent before:to-transparent',
          'before:pointer-events-none'
        )}
      >
        <Icon 
          className="w-8 h-8 text-white relative z-10" 
          strokeWidth={2}
          aria-hidden="true"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10">
        <h3 className={cn(
          'text-2xl font-bold mb-3',
          'text-gray-900 dark:text-gray-100',
          // Subtle gradient text on hover
          'group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700',
          'group-hover:bg-clip-text group-hover:text-transparent',
          'transition-all duration-300'
        )}>
          {title}
        </h3>

        <p className={cn(
          'text-gray-700 dark:text-gray-300 mb-4',
          'leading-relaxed',
          'transition-colors duration-300'
        )}>
          {description}
        </p>

        {/* Children content */}
        {children && (
          <div className="mt-4">
            {children}
          </div>
        )}
      </div>

      {/* Bottom accent line for extra metallic effect */}
      <div className={cn(
        'absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl',
        'bg-gradient-to-r',
        accent.iconGradient,
        'opacity-0 group-hover:opacity-100',
        'transition-opacity duration-300'
      )} />
    </motion.div>
  );
};

export default GlassyMetallicCard;
