import { useEffect, useRef } from 'react';
import { useInView, useMotionValue, useSpring } from 'framer-motion';

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  className?: string;
}

/**
 * Animated Counter - Numbers count up smoothly when scrolled into view
 * Apple-inspired smooth number animations
 */
export function AnimatedCounter({
  value,
  duration = 2,
  decimals = 0,
  suffix = '',
  className = ''
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0,
  });
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = latest.toFixed(decimals) + suffix;
      }
    });

    return () => unsubscribe();
  }, [springValue, decimals, suffix]);

  return <span ref={ref} className={className}>0{suffix}</span>;
}

/**
 * Percentage Counter - Specialized for percentages
 */
export function PercentageCounter({
  value,
  className = ''
}: {
  value: number;
  className?: string;
}) {
  return (
    <AnimatedCounter
      value={value}
      decimals={0}
      suffix="%"
      duration={1.5}
      className={className}
    />
  );
}

/**
 * Large Number Counter - For big numbers with commas
 */
export function LargeNumberCounter({
  value,
  className = ''
}: {
  value: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: 2000,
    bounce: 0,
  });
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString();
      }
    });

    return () => unsubscribe();
  }, [springValue]);

  return <span ref={ref} className={className}>0</span>;
}

