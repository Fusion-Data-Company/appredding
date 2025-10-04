import { motion } from 'framer-motion';
import { useState } from 'react';

/**
 * Icon Bounce - Icons bounce on hover
 * Playful micro-interaction
 */
export function BounceIcon({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale: [1, 1.2, 0.9, 1.1, 1],
        rotate: [0, -10, 10, -5, 0],
      }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Success Checkmark - Animated checkmark
 */
export function SuccessCheckmark({ size = 24 }: { size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      <motion.path
        d="M5 13l4 4L19 7"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
        }}
      />
    </motion.svg>
  );
}

/**
 * Shimmer Effect - Subtle shine across elements
 */
export function Shimmer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {children}
      <motion.div
        className="absolute inset-0 -translate-x-full"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
        }}
        animate={{
          translateX: ['100%', '100%', '-100%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          repeatDelay: 2,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}

/**
 * Ripple Effect - Click ripple animation
 */
export function Ripple({ x, y, onComplete }: { x: number; y: number; onComplete: () => void }) {
  return (
    <motion.span
      className="absolute rounded-full bg-white"
      style={{
        left: x,
        top: y,
      }}
      initial={{ width: 0, height: 0, opacity: 0.5 }}
      animate={{
        width: 500,
        height: 500,
        opacity: 0,
      }}
      transition={{ duration: 0.6 }}
      onAnimationComplete={onComplete}
    />
  );
}

/**
 * Button with Ripple - Button that shows ripple on click
 */
export function RippleButton({
  children,
  onClick,
  className = '',
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setRipples([...ripples, { x, y, id: Date.now() }]);
    onClick?.();
  };

  const removeRipple = (id: number) => {
    setRipples(ripples.filter((r) => r.id !== id));
  };

  return (
    <button
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {children}
      {ripples.map((ripple) => (
        <Ripple
          key={ripple.id}
          x={ripple.x}
          y={ripple.y}
          onComplete={() => removeRipple(ripple.id)}
        />
      ))}
    </button>
  );
}
