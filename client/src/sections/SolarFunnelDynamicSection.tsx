'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { GradientTracing } from '@/components/ui/gradient-tracing';
import { CheckCircle2, AlertCircle, Zap, TrendingUp } from 'lucide-react';

interface FunnelStage {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'active' | 'upcoming';
  color: 'red' | 'yellow' | 'green' | 'purple';
  icon: React.ReactNode;
  metrics?: {
    label: string;
    value: string;
  }[];
}

interface SolarFunnelProps {
  className?: string;
  stages?: FunnelStage[];
  autoProgress?: boolean;
  progressInterval?: number;
}

const defaultStages: FunnelStage[] = [
  {
    id: 'awareness',
    title: 'Solar Awareness',
    description:
      'Customer discovers energy rescue benefits, NEM 3.0 recovery plays, and wildfire readiness.',
    status: 'completed',
    color: 'red',
    icon: <Zap className='h-6 w-6' />,
    metrics: [
      { label: 'Reach', value: '10K+' },
      { label: 'Engagement', value: '85%' },
    ],
  },
  {
    id: 'interest',
    title: 'Interest & Education',
    description:
      'Prospect learns about storage pairings, financing upgrades, and CPUC compliance concierge.',
    status: 'completed',
    color: 'yellow',
    icon: <TrendingUp className='h-6 w-6' />,
    metrics: [
      { label: 'Qualified Leads', value: '2.5K' },
      { label: 'Conversion', value: '25%' },
    ],
  },
  {
    id: 'evaluation',
    title: 'System Evaluation',
    description:
      'Site assessment, IV curve audit, warranty salvage, and custom resilience proposal delivery.',
    status: 'active',
    color: 'green',
    icon: <CheckCircle2 className='h-6 w-6' />,
    metrics: [
      { label: 'Proposals', value: '625' },
      { label: 'Acceptance', value: '60%' },
    ],
  },
  {
    id: 'decision',
    title: 'Installation & Activation',
    description:
      'Contract execution, rescue crew dispatch, CPUC binder delivery, and performance monitoring onboarding.',
    status: 'upcoming',
    color: 'purple',
    icon: <AlertCircle className='h-6 w-6' />,
    metrics: [
      { label: 'Installs', value: '375' },
      { label: 'Satisfaction', value: '98%' },
    ],
  },
];

const colorConfig = {
  red: {
    bg: 'bg-red-500/10',
    border: 'border-red-500/30',
    text: 'text-red-400',
    glow: 'shadow-red-500/50',
    gradient: 'from-red-500/20 to-red-600/5',
    ring: 'ring-red-500/30',
    ambient: 'bg-red-500/20',
  },
  yellow: {
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    text: 'text-yellow-400',
    glow: 'shadow-yellow-500/50',
    gradient: 'from-yellow-500/20 to-yellow-600/5',
    ring: 'ring-yellow-500/30',
    ambient: 'bg-yellow-500/20',
  },
  green: {
    bg: 'bg-orange-500/10',
    border: 'border-green-500/30',
    text: 'text-orange-400',
    glow: 'shadow-green-500/50',
    gradient: 'from-green-500/20 to-green-600/5',
    ring: 'ring-green-500/30',
    ambient: 'bg-orange-500/20',
  },
  purple: {
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    text: 'text-purple-400',
    glow: 'shadow-purple-500/50',
    gradient: 'from-purple-500/20 to-purple-600/5',
    ring: 'ring-purple-500/30',
    ambient: 'bg-purple-500/20',
  },
};

/**
 * Enterprise-grade funnel visualization with animated stage transitions.
 */
export function SolarFunnel({
  className,
  stages = defaultStages,
  autoProgress = true,
  progressInterval = 4000,
}: SolarFunnelProps) {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!autoProgress) return;

    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (progressInterval / 100));
      } else {
        setActiveStageIndex((prev) => (prev + 1) % stages.length);
        setProgress(0);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [progress, stages.length, autoProgress, progressInterval]);

  useEffect(() => {
    // Reset progress if stages change externally
    setProgress(0);
  }, [stages]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  } as const;

  const stageVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
  } as const;

  const glowVariants = {
    idle: { scale: 1, opacity: 0.5 },
    active: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 0.8, 0.5],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  } as const;

  return (
    <section
      className={cn(
        'relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 px-4',
        className,
      )}
    >
      <div className='absolute inset-0 opacity-20 pointer-events-none'>
        <GradientTracing
          gradientColors={["#ef4444", "#f59e0b", "#22c55e"]}
          animationDuration={4}
          strokeWidth={2}
        />
      </div>
      <div className='absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.035)_1px,transparent_1px)] bg-[size:64px_64px]' />
      <div className='absolute top-20 left-10 h-96 w-96 animate-pulse rounded-full bg-red-500/10 blur-[120px]' />
      <div
        className='absolute top-40 right-20 h-80 w-80 animate-pulse rounded-full bg-yellow-500/10 blur-[100px]'
        style={{ animationDelay: '1s' }}
      />
      <div
        className='absolute bottom-40 left-1/4 h-96 w-96 animate-pulse rounded-full bg-orange-500/10 blur-[120px]'
        style={{ animationDelay: '2s' }}
      />
      <div
        className='absolute bottom-20 right-1/3 h-80 w-80 animate-pulse rounded-full bg-purple-500/10 blur-[100px]'
        style={{ animationDelay: '3s' }}
      />

      <div className='relative z-10 mx-auto max-w-7xl'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='mb-16 text-center'
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
            className='mb-4 inline-block'
          >
            <Badge variant="outline" className='border-purple-500/30 bg-purple-500/10 text-purple-400 px-3 py-1'>
              Proven Sales Process
            </Badge>
          </motion.div>
          <h2 className='bg-gradient-to-r from-slate-100 via-slate-300 to-slate-100 bg-clip-text text-5xl font-bold text-transparent md:text-7xl'>
            Solar Rescue Process
          </h2>
          <p className='mx-auto mt-6 max-w-3xl text-xl text-slate-400'>
            Transform distressed solar customers into high-retention homeowners with a four-stage rescue sequence.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'
        >
          {stages.map((stage, index) => {
            const colors = colorConfig[stage.color];
            const isActive = index === activeStageIndex;
            const isCompleted = index < activeStageIndex;

            return (
              <motion.div
                key={stage.id}
                variants={stageVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => setActiveStageIndex(index)}
                className={cn(
                  'group relative cursor-pointer rounded-2xl border-2 bg-slate-900/50 p-6 backdrop-blur transition-all duration-300',
                  isActive
                    ? `${colors.border} ${colors.glow}`
                    : 'border-slate-800 hover:border-slate-700',
                )}
              >
                <motion.div
                  variants={glowVariants}
                  animate={isActive ? 'active' : 'idle'}
                  className={cn('absolute inset-0 -z-10 rounded-2xl blur-xl', colors.ambient)}
                />
                <div className='mb-4 flex items-center justify-between'>
                  <motion.div
                    animate={isActive ? { rotate: [0, 360] } : {}}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-full border-2',
                      colors.bg,
                      colors.text,
                      colors.border,
                    )}
                  >
                    {stage.icon}
                  </motion.div>
                  {isCompleted && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className='text-emerald-400'>
                      <CheckCircle2 className='h-6 w-6' />
                    </motion.div>
                  )}
                </div>

                <h3 className={cn('text-xl font-bold', isActive ? colors.text : 'text-slate-300')}>{stage.title}</h3>
                <p className='mt-2 line-clamp-3 text-sm text-slate-400'>{stage.description}</p>

                {isActive && (
                  <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className='mt-4 h-1 overflow-hidden rounded-full bg-slate-800'>
                    <motion.div
                      className={cn('h-full', `bg-gradient-to-r ${colors.gradient}`)}
                      style={{ width: `${progress}%` }}
                    />
                  </motion.div>
                )}

                {stage.metrics && (
                  <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-slate-800 pt-4'>
                    {stage.metrics.map((metric) => (
                      <div key={metric.label} className='text-center'>
                        <p className={cn('text-lg font-bold', colors.text)}>{metric.value}</p>
                        <p className='text-xs text-slate-500'>{metric.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className='absolute top-4 right-4'>
                  <span
                    className={cn(
                      'rounded-full px-2 py-1 text-xs font-medium',
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : isActive
                        ? `${colors.bg} ${colors.text}`
                        : 'bg-slate-800 text-slate-500',
                    )}
                  >
                    {isCompleted ? 'Completed' : isActive ? 'Active' : 'Upcoming'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <AnimatePresence mode='wait'>
          <motion.div
            key={activeStageIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className='rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur'
          >
            <div className='flex flex-col gap-6 md:flex-row'>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className={cn(
                  'flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full border-2',
                  colorConfig[stages[activeStageIndex].color].bg,
                  colorConfig[stages[activeStageIndex].color].text,
                  colorConfig[stages[activeStageIndex].color].border,
                )}
              >
                {stages[activeStageIndex].icon}
              </motion.div>

              <div className='flex-1'>
                <h3
                  className={cn(
                    'text-3xl font-bold',
                    colorConfig[stages[activeStageIndex].color].text,
                  )}
                >
                  {stages[activeStageIndex].title}
                </h3>
                <p className='mt-3 text-lg text-slate-300'>
                  {stages[activeStageIndex].description}
                </p>

                {stages[activeStageIndex].metrics && (
                  <div className='mt-6 grid grid-cols-2 gap-4 md:grid-cols-4'>
                    {stages[activeStageIndex].metrics.map((metric, idx) => (
                      <motion.div
                        key={metric.label}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className={cn(
                          'rounded-xl border p-4',
                          colorConfig[stages[activeStageIndex].color].bg,
                          colorConfig[stages[activeStageIndex].color].border,
                        )}
                      >
                        <p
                          className={cn(
                            'text-2xl font-bold',
                            colorConfig[stages[activeStageIndex].color].text,
                          )}
                        >
                          {metric.value}
                        </p>
                        <p className='text-sm text-slate-400'>{metric.label}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className='mt-8 flex justify-center gap-3'>
          {stages.map((stage, index) => (
            <motion.button
              key={stage.id}
              onClick={() => setActiveStageIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={cn(
                'h-3 w-3 rounded-full transition-all duration-300',
                index === activeStageIndex
                  ? `${colorConfig[stage.color].ambient} ring-2 ${colorConfig[stage.color].ring}`
                  : 'bg-slate-700 hover:bg-slate-600',
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const SolarFunnelDynamicSection: React.FC = () => {
  return <SolarFunnel autoProgress progressInterval={4000} />;
};

export default SolarFunnelDynamicSection;
