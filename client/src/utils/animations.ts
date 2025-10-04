import { Variants } from 'framer-motion';

// Apple-inspired spring configuration
export const appleSpring = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

// Smooth easing curves
export const appleEase = [0.25, 0.1, 0.25, 1.0];
export const appleEaseOut = [0.16, 1, 0.3, 1];
export const appleEaseIn = [0.4, 0, 1, 1];

// Reusable animation variants
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40,
    transition: { duration: 0.3 }
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: appleEaseOut
    }
  }
};

export const fadeIn: Variants = {
  hidden: { 
    opacity: 0,
    transition: { duration: 0.2 }
  },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: appleEase
    }
  }
};

export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
    transition: { duration: 0.2 }
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: appleEaseOut
    }
  }
};

export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -40,
    transition: { duration: 0.3 }
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: appleEaseOut
    }
  }
};

export const slideInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 40,
    transition: { duration: 0.3 }
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      ease: appleEaseOut
    }
  }
};

// Stagger configurations
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

export const staggerFast = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    }
  }
};

// Viewport settings for scroll-triggered animations
export const defaultViewport = {
  once: true,
  margin: "-100px",
  amount: 0.3
};

export const repeatViewport = {
  once: false,
  margin: "-50px",
  amount: 0.2
};

// Utility for reducing motion
export const reduceMotion = (variants: Variants): Variants => {
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.01 } }
    };
  }
  return variants;
};

