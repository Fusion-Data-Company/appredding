/**
 * PraetorianStyleEngine.ts
 * 
 * A comprehensive styling engine for the Praetorian SmartCoat Solutions application
 * Defines core color palette, animations, and style constants for consistent tactical-industrial theming
 */

// COLORS: Fire & Water Dual-Tone Color System
export const praetorianExtendedColors = {
  // Fire palette (orange/amber spectrum)
  fire: {
    50: '#fff7ed',  // Lightest
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316', // Base orange
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
    950: '#431407'   // Darkest
  },
  
  // Water palette (cyan/blue spectrum)
  water: {
    50: '#ecfeff',  // Lightest
    100: '#cffafe',
    200: '#a5f3fc',
    300: '#67e8f9',
    400: '#22d3ee',
    500: '#06b6d4', // Base cyan
    600: '#0891b2',
    700: '#0e7490',
    800: '#155e75',
    900: '#164e63',
    950: '#083344'   // Darkest
  },
  
  // Metal palette (steel grays)
  metal: {
    50: '#fafafa',   // Lightest
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',  // Base gray
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b'   // Darkest
  },
  
  // Accent colors
  accent: {
    purple: {
      light: '#9333ea',
      DEFAULT: '#7e22ce',
      dark: '#6b21a8'
    },
    amber: {
      light: '#fbbf24',
      DEFAULT: '#f59e0b',
      dark: '#d97706'
    },
    emerald: {
      light: '#10b981',
      DEFAULT: '#059669',
      dark: '#047857'
    }
  }
};

// ANIMATIONS: Premium Tactile Effects
export const praetorianAnimationKeyframes = {
  // Fire-themed animations
  "firePulse": {
    "0%, 100%": { opacity: "0.8", boxShadow: "0 0 15px rgba(255,106,0,0.4), 0 0 40px rgba(255,106,0,0.2)" },
    "50%": { opacity: "1", boxShadow: "0 0 25px rgba(255,106,0,0.5), 0 0 60px rgba(255,106,0,0.3)" }
  },
  
  // Water-themed animations
  "waterRipple": {
    "0%": { boxShadow: "0 0 0 0 rgba(6,182,212,0.7)" },
    "70%": { boxShadow: "0 0 0 10px rgba(6,182,212,0)" },
    "100%": { boxShadow: "0 0 0 0 rgba(6,182,212,0)" }
  },
  
  // Heat shimmer/distortion effect
  "heatWave": {
    "0%": { transform: "translateY(0) scaleX(1.0)", opacity: "0.8" },
    "25%": { transform: "translateY(-2px) scaleX(1.01)", opacity: "0.9" },
    "50%": { transform: "translateY(0) scaleX(1.0)", opacity: "1" },
    "75%": { transform: "translateY(2px) scaleX(0.99)", opacity: "0.9" },
    "100%": { transform: "translateY(0) scaleX(1.0)", opacity: "0.8" }
  },
  
  // Border glow effect (fire/water alternating)
  "borderGlow": {
    "0%, 100%": { borderColor: "rgba(255,106,0,0.7)" },
    "50%": { borderColor: "rgba(6,182,212,0.7)" },
  },
  
  // Holographic rise effect
  "holoRise": {
    "0%": { transform: "translateY(20px)", opacity: "0" },
    "100%": { transform: "translateY(0)", opacity: "1" },
  },
  
  // Metal shimmer effect
  "metalShimmer": {
    "0%": { transform: "translateX(-100%) rotate(45deg)" },
    "50%": { transform: "translateX(100%) rotate(45deg)" },
    "100%": { transform: "translateX(100%) rotate(45deg)" }
  },
  
  // Shimmer text animation
  "shimmer-text": {
    "0%": { backgroundPosition: "200% 0" },
    "100%": { backgroundPosition: "-200% 0" }
  },
  
  // Fade in animation
  "fade-in": {
    "0%": { opacity: "0" },
    "100%": { opacity: "1" }
  }
};

// SHADOWS: Premium 3D Effects
export const praetorianShadowStyles = {
  cardShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
  innerShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)",
  textShadow: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.1)",
    md: "0 2px 4px rgba(0, 0, 0, 0.2)",
    lg: "0 4px 8px rgba(0, 0, 0, 0.4)"
  },
  glowShadow: {
    fire: "0 0 15px rgba(255, 106, 0, 0.5), 0 0 30px rgba(255, 106, 0, 0.3)",
    water: "0 0 15px rgba(6, 182, 212, 0.5), 0 0 30px rgba(6, 182, 212, 0.3)",
    white: "0 0 15px rgba(255, 255, 255, 0.5), 0 0 30px rgba(255, 255, 255, 0.3)",
    purple: "0 0 15px rgba(147, 51, 234, 0.5), 0 0 30px rgba(147, 51, 234, 0.3)"
  }
};

// GRADIENTS: Premium Color Combinations
export const praetorianGradients = {
  fireGradient: "linear-gradient(to right, #f97316, #c2410c)",
  waterGradient: "linear-gradient(to right, #06b6d4, #0e7490)",
  dualGradient: "linear-gradient(to right, #f97316, #ffffff, #06b6d4)",
  metalGradient: "linear-gradient(to bottom, #d4d4d8, #a1a1aa, #71717a)",
  glassGradient: "linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
  premiumGradient: "linear-gradient(to right, #f97316, #fef3c7, #06b6d4)"
};

// BORDERS: Premium Edge Treatments
export const praetorianBorders = {
  thin: "1px solid",
  medium: "2px solid",
  thick: "4px solid",
  dashed: "2px dashed",
  fireColor: "rgba(255, 106, 0, 0.7)",
  waterColor: "rgba(6, 182, 212, 0.7)",
  metalColor: "rgba(113, 113, 122, 0.5)",
  glassColor: "rgba(255, 255, 255, 0.1)"
};

// TEXTURES: Industrial Patterns
export const praetorianTextures = {
  metalPlate: "url('/textures/metal-plate.png')",
  carbonFiber: "url('/textures/carbon-fiber.png')",
  diagonal: "url('/textures/diagonal-lines.png')",
  noise: "url('/textures/noise.png')"
};

// Z-INDEX: Layer Management
export const praetorianZIndex = {
  background: -10,
  base: 0,
  content: 10,
  overlay: 20,
  modal: 30,
  toast: 40,
  tooltip: 50
};

// SPACING: Consistent Layout
export const praetorianSpacing = {
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '2.5rem', // 40px
  '3xl': '3rem'    // 48px
};

// TRANSITIONS: Smooth Motion
export const praetorianTransitions = {
  fast: "150ms ease",
  medium: "300ms ease",
  slow: "500ms ease",
  bounce: "300ms cubic-bezier(0.68, -0.55, 0.27, 1.55)"
};