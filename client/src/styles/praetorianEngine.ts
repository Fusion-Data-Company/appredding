export const PraetorianStyleEngine = {
  palette: {
    firePrimary: 'linear-gradient(to right, #ff0000, #ff8c00, #ffff00)',
    waterPrimary: 'linear-gradient(to right, #00d9ff, #ffffff)',
    background: 'radial-gradient(circle at 50% 50%, #0a0a0a, #000000)',
    metalDark: '#1e1e1e',
    accentOrange: '#ff5e00',
    accentBlue: '#00e6f6',
  },

  shadows: {
    fireGlow: '0 0 8px rgba(255, 120, 0, 0.4), 0 0 24px rgba(255, 0, 0, 0.2)',
    waterGlow: '0 0 10px rgba(0, 240, 255, 0.3), 0 0 30px rgba(0, 240, 255, 0.2)',
    softMetal: 'inset 1px 1px 3px rgba(255,255,255,0.05), inset -1px -1px 3px rgba(0,0,0,0.3)',
  },

  animations: {
    firePulse: 'firePulse 2.5s ease-in-out infinite',
    waterRipple: 'waterRipple 3s ease-in-out infinite',
    heatWave: 'heatWave 6s linear infinite',
    floatHover: 'float 5s ease-in-out infinite',
  },

  textures: {
    metal: 'url("/textures/brushed-steel-dark.jpg")',
    fireSurface: 'url("/textures/fire-gradient-blend.jpg")',
    waterSurface: 'url("/textures/water-blur-wave.jpg")',
  },

  buttons: {
    base: 'rounded-xl px-6 py-2 font-bold transition-all duration-300',
    fire: 'bg-[image:var(--fireSurface)] shadow-fireGlow hover:scale-105',
    water: 'bg-[image:var(--waterSurface)] shadow-waterGlow hover:scale-105',
  },

  modals: {
    base: 'bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-glow animate-holoRise',
  },
};

// Custom CSS class generator functions
export const generatePraetorianClasses = {
  // Fire-themed button with gradient and glow effect
  fireButton: (extraClasses = '') => 
    `relative overflow-hidden bg-gradient-to-r from-orange-700 via-orange-500 to-orange-600 text-white rounded-lg 
     px-6 py-2.5 font-medium shadow-lg shadow-orange-500/30 
     hover:shadow-orange-500/50 hover:scale-[1.02] transition-all duration-300 
     focus:ring-2 focus:ring-orange-500/50 focus:outline-none ${extraClasses}`,
     
  // Water-themed button with gradient and glow effect
  waterButton: (extraClasses = '') => 
    `relative overflow-hidden bg-gradient-to-r from-cyan-700 via-cyan-500 to-cyan-600 text-white rounded-lg 
     px-6 py-2.5 font-medium shadow-lg shadow-cyan-500/30 
     hover:shadow-cyan-500/50 hover:scale-[1.02] transition-all duration-300 
     focus:ring-2 focus:ring-cyan-500/50 focus:outline-none ${extraClasses}`,
     
  // Premium metal-style card with beveled edges and subtle lighting effects
  metalCard: (extraClasses = '') => 
    `relative bg-gradient-to-b from-gray-900 via-gray-900 to-black border border-gray-800 rounded-xl 
     shadow-xl overflow-hidden backdrop-blur-sm ${extraClasses}`,
     
  // Fire-themed premium card with orange glow effects
  fireCard: (extraClasses = '') => 
    `relative bg-gradient-to-b from-gray-900 via-gray-900 to-black border border-orange-900/50 rounded-xl 
     shadow-xl shadow-orange-500/10 overflow-hidden backdrop-blur-sm ${extraClasses}`,
     
  // Water-themed premium card with cyan glow effects
  waterCard: (extraClasses = '') => 
    `relative bg-gradient-to-b from-gray-900 via-gray-900 to-black border border-cyan-900/50 rounded-xl 
     shadow-xl shadow-cyan-500/10 overflow-hidden backdrop-blur-sm ${extraClasses}`,

  // Premium gradient text with fire effect (orange to red)
  fireGradientText: (extraClasses = '') =>
    `bg-clip-text text-transparent bg-gradient-to-r from-orange-300 via-orange-500 to-red-600 
     ${extraClasses}`,
     
  // Premium gradient text with water effect (cyan to blue)
  waterGradientText: (extraClasses = '') =>
    `bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-cyan-500 to-blue-600 
     ${extraClasses}`,
     
  // Combined fire-water gradient text effect
  dualGradientText: (extraClasses = '') =>
    `bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-white to-cyan-500 
     ${extraClasses}`,
     
  // Background with animated heat wave effect
  heatWaveBackground: (extraClasses = '') =>
    `relative bg-black ${extraClasses} before:content-[''] before:absolute before:inset-0 
     before:bg-gradient-to-r before:from-transparent before:via-orange-500/10 before:to-transparent 
     before:animate-heatWave before:bg-[length:200%_100%]`,
     
  // Animated glowing border
  glowingBorder: (color = 'orange', extraClasses = '') => {
    const colorMap = {
      orange: 'orange-500',
      cyan: 'cyan-500',
      blue: 'blue-500',
      purple: 'purple-500',
    };
    
    const mappedColor = colorMap[color as keyof typeof colorMap] || colorMap.orange;
    
    return `relative border border-${mappedColor}/30 ${extraClasses} 
      before:absolute before:inset-0 before:rounded-[inherit] before:p-[1px] 
      before:bg-gradient-to-r before:from-transparent before:via-${mappedColor}/50 before:to-transparent 
      before:animate-borderGlow before:bg-[length:200%_100%]`;
  }
};

// Animation keyframes for Tailwind config
export const praetorianAnimationKeyframes = {
  firePulse: {
    '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
    '50%': { opacity: 1, transform: 'scale(1.05)' },
  },
  waterRipple: {
    '0%': { transform: 'scale(0.95)', opacity: 0.7 },
    '50%': { transform: 'scale(1.05)', opacity: 0.9 },
    '100%': { transform: 'scale(0.95)', opacity: 0.7 },
  },
  heatWave: {
    '0%': { backgroundPosition: '0% 50%' },
    '100%': { backgroundPosition: '200% 50%' },
  },
  float: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-10px)' },
  },
  borderGlow: {
    '0%': { backgroundPosition: '0% 50%' },
    '100%': { backgroundPosition: '200% 50%' },
  },
  holoRise: {
    '0%': { transform: 'translateY(20px)', opacity: 0 },
    '100%': { transform: 'translateY(0)', opacity: 1 },
  },
};

// Extended color palette for Tailwind config
export const praetorianExtendedColors = {
  'fire': {
    50: '#fff5f0',
    100: '#ffede3',
    200: '#ffd6bc',
    300: '#ffb48a',
    400: '#ff8547',
    500: '#ff5e00',
    600: '#e54600',
    700: '#c13400',
    800: '#9f2d0a',
    900: '#7e250d',
  },
  'water': {
    50: '#f0f9ff',
    100: '#e0f3fe',
    200: '#bae8fd',
    300: '#7cd7fd',
    400: '#37c5f8',
    500: '#00e6f6',
    600: '#018ecc',
    700: '#0274a8',
    800: '#016189',
    900: '#065373',
  },
};