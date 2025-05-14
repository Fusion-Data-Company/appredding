import React from 'react';
import { PremiumButton } from '@/components/ui/premium-button';
import { ShoppingCart, ArrowRight, Check, ExternalLink } from 'lucide-react';

/**
 * This utility file provides pre-configured premium buttons with the fire styling
 * to maintain consistent design across the site.
 */

// Shopping cart button for "Get Praetorian NOW" style buttons
export const PremiumCartButton = ({ children, onClick, className, ...props }: React.ComponentProps<typeof PremiumButton>) => (
  <PremiumButton 
    variant="fire" 
    size="xl" 
    icon={<ShoppingCart size={24} className="text-white" />} 
    className={className}
    onClick={onClick}
    {...props}
  >
    {children || "Get Praetorian Smart-Coat NOW!"}
  </PremiumButton>
);

// Arrow button for "Learn More" style buttons
export const PremiumArrowButton = ({ children, onClick, className, iconPosition = 'right', ...props }: React.ComponentProps<typeof PremiumButton> & { iconPosition?: 'left' | 'right' }) => (
  <PremiumButton 
    variant="fire" 
    size="lg" 
    icon={<ArrowRight size={20} className="text-white" />} 
    iconPosition={iconPosition}
    className={className}
    onClick={onClick}
    {...props}
  >
    {children || "Learn More"}
  </PremiumButton>
);

// External link button
export const PremiumExternalButton = ({ children, onClick, className, ...props }: React.ComponentProps<typeof PremiumButton>) => (
  <PremiumButton 
    variant="fire" 
    size="lg" 
    icon={<ExternalLink size={20} className="text-white" />} 
    iconPosition="right"
    className={className}
    onClick={onClick}
    {...props}
  >
    {children || "Visit Website"}
  </PremiumButton>
);

// Call-to-action button with checkmark
export const PremiumActionButton = ({ children, onClick, className, ...props }: React.ComponentProps<typeof PremiumButton>) => (
  <PremiumButton 
    variant="fire" 
    size="lg" 
    icon={<Check size={20} className="text-white" />} 
    className={className}
    onClick={onClick}
    {...props}
  >
    {children || "Get Started"}
  </PremiumButton>
);

// Generic premium fire button without icon
export const PremiumFireButton = ({ children, onClick, className, ...props }: React.ComponentProps<typeof PremiumButton>) => (
  <PremiumButton 
    variant="fire" 
    size="lg" 
    className={className}
    onClick={onClick}
    {...props}
  >
    {children}
  </PremiumButton>
);