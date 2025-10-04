/**
 * ULTRA ELITE ENTERPRISE THEME SYSTEM
 * Apple.com-inspired design tokens for world-class UI
 */

// Apple-inspired shadow system
export const shadows = {
  xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  sm: '0 2px 4px -1px rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  
  // Colored shadows for depth and brand
  brand: {
    blue: '0 20px 40px -10px rgba(59, 130, 246, 0.4)',
    cyan: '0 20px 40px -10px rgba(6, 182, 212, 0.4)',
    green: '0 20px 40px -10px rgba(16, 185, 129, 0.4)',
    purple: '0 20px 40px -10px rgba(139, 92, 246, 0.4)',
  },
  
  // Interactive shadows
  hover: '0 20px 35px -5px rgba(0, 0, 0, 0.15), 0 10px 15px -5px rgba(0, 0, 0, 0.1)',
  focus: '0 0 0 3px rgba(59, 130, 246, 0.5)',
};

// Perfect spacing scale (8px base)
export const spacing = {
  px: '1px',
  0: '0',
  0.5: '0.125rem',  // 2px
  1: '0.25rem',     // 4px
  1.5: '0.375rem',  // 6px
  2: '0.5rem',      // 8px
  2.5: '0.625rem',  // 10px
  3: '0.75rem',     // 12px
  3.5: '0.875rem',  // 14px
  4: '1rem',        // 16px
  5: '1.25rem',     // 20px
  6: '1.5rem',      // 24px
  7: '1.75rem',     // 28px
  8: '2rem',        // 32px
  9: '2.25rem',     // 36px
  10: '2.5rem',     // 40px
  12: '3rem',       // 48px
  14: '3.5rem',     // 56px
  16: '4rem',       // 64px
  20: '5rem',       // 80px
  24: '6rem',       // 96px
  32: '8rem',       // 128px
};

// Typography system
export const typography = {
  fontSizes: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
  },
  
  fontWeights: {
    thin: 100,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  
  lineHeights: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

// Border radius system
export const borderRadius = {
  none: '0',
  sm: '0.125rem',    // 2px
  base: '0.25rem',   // 4px
  md: '0.375rem',    // 6px
  lg: '0.5rem',      // 8px
  xl: '0.75rem',     // 12px
  '2xl': '1rem',     // 16px
  '3xl': '1.5rem',   // 24px
  full: '9999px',
};

// Animation timing functions (Apple-inspired)
export const easings = {
  // Apple's signature easing
  apple: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',
  appleOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  appleIn: 'cubic-bezier(0.4, 0, 1, 1)',
  appleInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  
  // Standard easings
  linear: 'linear',
  easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
  easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
  easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  
  // Bouncy
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  
  // Smooth
  smooth: 'cubic-bezier(0.45, 0, 0.55, 1)',
};

// Animation durations
export const durations = {
  instant: '0ms',
  fast: '150ms',
  base: '250ms',
  medium: '350ms',
  slow: '500ms',
  slower: '750ms',
  slowest: '1000ms',
};

// Z-index scale
export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

// Gradient presets
export const gradients = {
  brand: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 50%, #10b981 100%)',
  sunset: 'linear-gradient(135deg, #f59e0b 0%, #f97316 50%, #ef4444 100%)',
  ocean: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%)',
  forest: 'linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)',
  premium: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 50%, #f59e0b 100%)',
  
  // Subtle backgrounds
  softBlue: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)',
  softGreen: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)',
};

// Backdrop blur values
export const blur = {
  none: '0',
  sm: '4px',
  base: '8px',
  md: '12px',
  lg: '16px',
  xl: '24px',
  '2xl': '40px',
  '3xl': '64px',
};

export default {
  shadows,
  spacing,
  typography,
  borderRadius,
  easings,
  durations,
  zIndex,
  gradients,
  blur,
};

