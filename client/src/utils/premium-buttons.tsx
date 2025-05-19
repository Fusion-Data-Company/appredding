import React from 'react';
import { PremiumButton } from '@/components/ui/premium-button';
import { ShoppingCart, ArrowRight, Check, ExternalLink } from 'lucide-react';

/**
 * This utility file provides pre-configured premium buttons with the fire styling
 * to maintain consistent design across the site.
 */

// Shopping cart button for "Get Praetorian NOW" style buttons with glow effect
export const PremiumCartButton = ({ children, onClick, className, ...props }: React.ComponentProps<typeof PremiumButton>) => (
  <PremiumButton 
    variant="fire" 
    size="xxxl" 
    icon={<ShoppingCart size={40} className="text-white" />} 
    className={`group ${className || ''}`}
    onClick={onClick}
    glowEffect={true}
    {...props}
  >
    {children || "Get Praetorian Smart-Coat NOW!"}
  </PremiumButton>
);

// Arrow button for "Learn More" style buttons with glow effect
export const PremiumArrowButton = ({ children, onClick, className, iconPosition = 'right', ...props }: React.ComponentProps<typeof PremiumButton> & { iconPosition?: 'left' | 'right' }) => (
  <PremiumButton 
    variant="fire" 
    size="lg" 
    icon={<ArrowRight size={20} className="text-white" />} 
    iconPosition={iconPosition}
    className={`group ${className || ''}`}
    onClick={onClick}
    glowEffect={true}
    {...props}
  >
    {children || "Learn More"}
  </PremiumButton>
);

// External link button with glow effect
export const PremiumExternalButton = ({ children, onClick, className, ...props }: React.ComponentProps<typeof PremiumButton>) => (
  <PremiumButton 
    variant="fire" 
    size="lg" 
    icon={<ExternalLink size={20} className="text-white" />} 
    iconPosition="right"
    className={`group ${className || ''}`}
    onClick={onClick}
    glowEffect={true}
    {...props}
  >
    {children || "Visit Website"}
  </PremiumButton>
);

// Call-to-action button with checkmark and glow effect
export const PremiumActionButton = ({ children, onClick, className, ...props }: React.ComponentProps<typeof PremiumButton>) => (
  <PremiumButton 
    variant="fire" 
    size="lg" 
    icon={<Check size={20} className="text-white" />} 
    className={`group ${className || ''}`}
    onClick={onClick}
    glowEffect={true}
    {...props}
  >
    {children || "Get Started"}
  </PremiumButton>
);

// Glass-effect premium button with multi-color gradient and ambient glow
export const PremiumFireButton = ({ children, onClick, className, ...props }: React.ComponentProps<typeof PremiumButton>) => (
  <div className="relative">
    {/* Enhanced multi-layer glow effect positioned behind the button */}
    <div className="absolute -inset-[25px] rounded-3xl opacity-70 transition-opacity duration-500 -z-10 group-hover:opacity-90"
      style={{ 
        background: 'radial-gradient(circle, rgba(138,43,226,0.25) 0%, rgba(59,130,246,0.15) 40%, rgba(0,0,0,0.05) 70%)',
        filter: 'blur(25px)'
      }}>
    </div>
    {/* Secondary inner glow for depth */}
    <div className="absolute -inset-[15px] rounded-2xl opacity-60 transition-opacity duration-500 -z-[5] group-hover:opacity-80"
      style={{ 
        background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, rgba(79,70,229,0.15) 60%, rgba(0,0,0,0) 80%)',
        filter: 'blur(15px)'
      }}>
    </div>
    {/* Glass-effect button with gradient border */}
    <div className="relative rounded-xl overflow-hidden">
      {/* Subtle edge highlight (thin purple border) */}
      <div className="absolute inset-0 rounded-xl z-[1] pointer-events-none" 
        style={{ 
          boxShadow: 'inset 0 0 0 1px rgba(139, 92, 246, 0.5)',
          background: 'linear-gradient(to right bottom, rgba(139, 92, 246, 0.05), rgba(67, 56, 202, 0.05))'
        }}>
      </div>
      <PremiumButton 
        variant="fire" 
        size="lg" 
        className={`group backdrop-blur-sm backdrop-filter ${className || ''}`}
        onClick={onClick}
        glowEffect={true}
        {...props}
      >
        {children}
      </PremiumButton>
    </div>
  </div>
);