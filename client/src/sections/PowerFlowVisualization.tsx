'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Activity, Zap, Battery, TrendingUp, CheckCircle, Sun, ArrowRight, Award, Shield, FileCheck } from 'lucide-react';

// Grid Pattern Component
function GridPattern({
  width = 40,
  height = 40,
  x = -1,
  y = -1,
  strokeDasharray = '0',
  squares,
  className,
  ...props
}: {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  squares?: Array<[x: number, y: number]>;
  strokeDasharray?: string;
  className?: string;
  [key: string]: unknown;
}) {
  const id = React.useId();

  return (
    <svg
      aria-hidden='true'
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full fill-gray-400/30 stroke-gray-400/30',
        className,
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits='userSpaceOnUse'
          x={x}
          y={y}
        >
          <path
            d={`M.5 ${height}V.5H${width}`}
            fill='none'
            strokeDasharray={strokeDasharray}
          />
        </pattern>
      </defs>
      <rect width='100%' height='100%' strokeWidth={0} fill={`url(#${id})`} />
      {squares && (
        <svg x={x} y={y} className='overflow-visible'>
          {squares.map(([squareX, squareY]) => (
            <rect
              strokeWidth='0'
              key={`${squareX}-${squareY}`}
              width={width - 1}
              height={height - 1}
              x={squareX * width + 1}
              y={squareY * height + 1}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

interface PowerFlowMetric {
  label: string;
  value: string | number;
}

interface PowerFlowStage {
  id: string;
  title: string;
  description: string;
  primaryValue: number;
  metrics: PowerFlowMetric[];
  gradient: string;
  glowColor: string;
  icon: React.ReactNode;
  technicalSpec: string;
}

interface PowerFlowVisualizationProps {
  className?: string;
  stages?: PowerFlowStage[];
  autoProgress?: boolean;
  progressInterval?: number;
}

const defaultStages: PowerFlowStage[] = [
  {
    id: 'assessment',
    title: 'Technical Assessment & Site Analysis',
    description:
      'Comprehensive energy audit with SOLARK inverter sizing, roof structural load calculations, utility interconnection feasibility study, and 12-month baseline kWh profiling.',
    primaryValue: 10250,
    metrics: [
      { label: 'Annual Assessments', value: '10,250' },
      { label: 'CPUC Approvals', value: '98.4%' },
      { label: 'Avg Duration', value: '2.5 hrs' },
    ],
    gradient: 'from-blue-500/20 to-blue-600/5',
    glowColor: 'rgba(59, 130, 246, 0.6)',
    icon: <Activity className='h-7 w-7' />,
    technicalSpec: 'IEEE 1547-2018 & CPUC Rule 21 Compliance Review',
  },
  {
    id: 'engineering',
    title: 'System Engineering & Design Optimization',
    description:
      'Custom SOLARK 12K/15K hybrid inverter configuration, LiFePO4 battery bank sizing, NEM 3.0 export rate optimization, SGIP Equity Budget qualification, and PE-stamped structural calculations.',
    primaryValue: 8340,
    metrics: [
      { label: 'Systems Designed', value: '8,340' },
      { label: 'Avg System Size', value: '12.8 kW' },
      { label: 'Battery Pairing Rate', value: '76%' },
    ],
    gradient: 'from-cyan-500/20 to-cyan-600/5',
    glowColor: 'rgba(6, 182, 212, 0.6)',
    icon: <Zap className='h-7 w-7' />,
    technicalSpec: 'SOLARK 12K/15K • 97.5% Efficiency • UL 1741-SB Certified',
  },
  {
    id: 'installation',
    title: 'Professional Installation & Commissioning',
    description:
      'C-46 licensed installation crew, NFPA 70 (NEC Article 690) compliance, AC + DC system testing, utility Permission to Operate (PTO) coordination, and final SGIP documentation submission.',
    primaryValue: 6890,
    metrics: [
      { label: 'Installations Completed', value: '6,890' },
      { label: 'PTO Success Rate', value: '99.1%' },
      { label: 'Safety Incident Rate', value: '0.0%' },
    ],
    gradient: 'from-emerald-500/20 to-emerald-600/5',
    glowColor: 'rgba(16, 185, 129, 0.6)',
    icon: <Battery className='h-7 w-7' />,
    technicalSpec: 'C-46 Solar Contractor • NABCEP Certified Engineers',
  },
  {
    id: 'optimization',
    title: 'Performance Monitoring & ROI Optimization',
    description:
      '24/7 cloud-based monitoring via SOLARK portal, quarterly performance analytics, proactive maintenance scheduling, load-shifting algorithm tuning for California TOU rates, and ongoing SGIP rebate tracking.',
    primaryValue: 5420,
    metrics: [
      { label: 'Active Monitoring Systems', value: '5,420' },
      { label: 'System Uptime', value: '99.6%' },
      { label: 'Avg Annual Savings', value: '$2,840' },
    ],
    gradient: 'from-violet-500/20 to-violet-600/5',
    glowColor: 'rgba(139, 92, 246, 0.6)',
    icon: <TrendingUp className='h-7 w-7' />,
    technicalSpec: '2-Hour Response SLA • Remote Diagnostics • Real-Time Analytics',
  },
];

const stageGradients = {
  blue: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    text: 'text-blue-400',
    glow: 'shadow-blue-500/50',
    gradient: 'from-blue-500/20 to-blue-600/5',
    ring: 'ring-blue-500/30',
    ambient: 'bg-blue-500/20',
  },
  cyan: {
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/30',
    text: 'text-cyan-400',
    glow: 'shadow-cyan-500/50',
    gradient: 'from-cyan-500/20 to-cyan-600/5',
    ring: 'ring-cyan-500/30',
    ambient: 'bg-cyan-500/20',
  },
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-400',
    glow: 'shadow-emerald-500/50',
    gradient: 'from-emerald-500/20 to-emerald-600/5',
    ring: 'ring-emerald-500/30',
    ambient: 'bg-emerald-500/20',
  },
  violet: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/30',
    text: 'text-violet-400',
    glow: 'shadow-violet-500/50',
    gradient: 'from-violet-500/20 to-violet-600/5',
    ring: 'ring-violet-500/30',
    ambient: 'bg-violet-500/20',
  },
};

const colorKeys = ['blue', 'cyan', 'emerald', 'violet'] as const;

export function PowerFlowVisualization({
  className,
  stages = defaultStages,
  autoProgress = true,
  progressInterval = 5000,
}: PowerFlowVisualizationProps) {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  } as const;

  const stageVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 250,
        damping: 25,
      },
    },
  } as const;

  return (
    <section
      className={cn(
        'relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-24 px-4',
        className,
      )}
    >
      {/* Elite background effects */}
      <div className='absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.025)_1px,transparent_1px)] bg-[size:64px_64px]' />

      {/* Animated ambient orbs */}
      <div className='absolute top-20 left-10 h-96 w-96 animate-pulse rounded-full bg-blue-500/10 blur-[140px]' />
      <div className='absolute top-40 right-20 h-80 w-80 animate-pulse rounded-full bg-cyan-500/10 blur-[120px]' style={{ animationDelay: '1.5s' }} />
      <div className='absolute bottom-40 left-1/4 h-96 w-96 animate-pulse rounded-full bg-emerald-500/10 blur-[140px]' style={{ animationDelay: '3s' }} />
      <div className='absolute bottom-20 right-1/3 h-80 w-80 animate-pulse rounded-full bg-violet-500/10 blur-[120px]' style={{ animationDelay: '4.5s' }} />

      <div className='relative z-10 mx-auto max-w-7xl'>
        {/* Elite Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='mb-20 text-center'
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
            className='mb-6 inline-block'
          >
            <span className='rounded-full border border-slate-700/60 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-emerald-500/20 px-5 py-2.5 text-sm font-semibold text-slate-300 backdrop-blur-md'>
              Enterprise Power Solution Deployment
            </span>
          </motion.div>

          <h2 className='bg-gradient-to-r from-slate-100 via-blue-200 to-slate-100 bg-clip-text text-5xl font-bold text-transparent md:text-7xl mb-6'>
            Power Flow Engineering Pathway
          </h2>

          <p className='mx-auto max-w-3xl text-xl text-slate-400 leading-relaxed'>
            Advanced SOLARK hybrid inverter deployment with LiFePO4 storage integration, following California CPUC Rule 21 interconnection standards and SGIP incentive protocols.
          </p>

          {/* Elite credentials */}
          <div className='mt-8 flex flex-wrap items-center justify-center gap-4'>
            {[
              { label: 'SOLARK Certified', icon: <Zap className="w-4 h-4" /> },
              { label: 'UL 1741-SB', icon: <Shield className="w-4 h-4" /> },
              { label: 'NABCEP', icon: <Award className="w-4 h-4" /> },
              { label: 'C-46 Licensed', icon: <FileCheck className="w-4 h-4" /> }
            ].map((cred, idx) => (
              <motion.div
                key={idx}
                className='group px-4 py-2 bg-slate-900/60 border border-blue-500/20 rounded-full backdrop-blur-sm hover:border-cyan-400/40 transition-all duration-300'
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
              >
                <div className='flex items-center gap-2 text-sm text-slate-300 group-hover:text-cyan-300 transition-colors'>
                  <span className='text-blue-400 group-hover:text-cyan-400 transition-colors'>
                    {cred.icon}
                  </span>
                  {cred.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Power Flow Stages Grid */}
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          animate='visible'
          className='mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'
        >
          {stages.map((stage, index) => {
            const colorKey = colorKeys[index % colorKeys.length];
            const colors = stageGradients[colorKey];
            const isActive = index === activeStageIndex;
            const isCompleted = index < activeStageIndex;

            return (
              <motion.div
                key={stage.id}
                variants={stageVariants}
                whileHover={{ scale: 1.03, y: -8 }}
                onClick={() => setActiveStageIndex(index)}
                className={cn(
                  'group relative cursor-pointer rounded-2xl border-2 bg-slate-900/50 p-6 backdrop-blur-md transition-all duration-500 overflow-hidden',
                  'before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100',
                  isActive
                    ? `${colors.border} ${colors.glow} shadow-2xl`
                    : 'border-slate-800 hover:border-slate-700',
                )}
              >
                {/* Animated glow */}
                <motion.div
                  animate={isActive ? {
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  } : {}}
                  transition={{ duration: 3, repeat: Infinity }}
                  className={cn('absolute inset-0 -z-10 rounded-2xl blur-2xl', colors.ambient, isActive ? 'opacity-100' : 'opacity-0')}
                />

                <div className='mb-5 flex items-center justify-between'>
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className={cn(
                      'flex h-14 w-14 items-center justify-center rounded-xl border-2 shadow-lg',
                      colors.bg,
                      colors.text,
                      colors.border,
                    )}
                  >
                    {stage.icon}
                  </motion.div>
                  {isCompleted && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className='text-emerald-400'>
                      <CheckCircle className='h-6 w-6' />
                    </motion.div>
                  )}
                </div>

                <h3 className={cn('text-lg font-bold mb-3', isActive ? colors.text : 'text-slate-300')}>
                  {stage.title}
                </h3>

                <p className='text-sm text-slate-400 mb-4 line-clamp-3 leading-relaxed'>{stage.description}</p>

                {/* Technical spec badge */}
                <div className={cn('text-xs font-mono px-3 py-2 rounded-lg border mb-4', colors.border, colors.bg)}>
                  <p className={cn('font-semibold', colors.text)}>{stage.technicalSpec}</p>
                </div>

                {isActive && (
                  <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} className='h-1 overflow-hidden rounded-full bg-slate-800 mb-4'>
                    <motion.div
                      className={cn('h-full', `bg-gradient-to-r ${stage.gradient}`)}
                      style={{ width: `${progress}%` }}
                    />
                  </motion.div>
                )}

                {stage.metrics && (
                  <div className='grid grid-cols-1 gap-2'>
                    {stage.metrics.map((metric, idx) => (
                      <div key={idx} className='flex justify-between items-center text-xs'>
                        <span className='text-slate-500'>{metric.label}</span>
                        <span className={cn('font-bold', colors.text)}>{metric.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className='absolute top-4 right-4'>
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-1 text-xs font-semibold',
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : isActive
                        ? `${colors.bg} ${colors.text}`
                        : 'bg-slate-800 text-slate-500',
                    )}
                  >
                    {isCompleted ? 'Complete' : isActive ? 'Active' : 'Pending'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Active Stage Detail Showcase */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeStageIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
            className='rounded-3xl border-2 border-slate-800 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-10 backdrop-blur-xl shadow-2xl'
          >
            <div className='flex flex-col gap-8 md:flex-row md:items-center'>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className={cn(
                  'flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl border-2 shadow-2xl',
                  stageGradients[colorKeys[activeStageIndex % colorKeys.length]].bg,
                  stageGradients[colorKeys[activeStageIndex % colorKeys.length]].text,
                  stageGradients[colorKeys[activeStageIndex % colorKeys.length]].border,
                )}
              >
                <div className="scale-150">
                  {stages[activeStageIndex].icon}
                </div>
              </motion.div>

              <div className='flex-1'>
                <h3 className={cn('text-3xl font-bold mb-4', stageGradients[colorKeys[activeStageIndex % colorKeys.length]].text)}>
                  {stages[activeStageIndex].title}
                </h3>
                <p className='text-lg text-slate-300 mb-6 leading-relaxed'>
                  {stages[activeStageIndex].description}
                </p>

                {stages[activeStageIndex].metrics && (
                  <div className='grid grid-cols-3 gap-6'>
                    {stages[activeStageIndex].metrics.map((metric, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: idx * 0.1, type: 'spring' }}
                        className={cn(
                          'rounded-xl border-2 p-4 bg-gradient-to-br from-slate-900/60 to-slate-800/40 backdrop-blur-sm',
                          stageGradients[colorKeys[activeStageIndex % colorKeys.length]].border,
                        )}
                      >
                        <p className={cn('text-2xl font-bold', stageGradients[colorKeys[activeStageIndex % colorKeys.length]].text)}>
                          {metric.value}
                        </p>
                        <p className='text-sm text-slate-400 mt-1'>{metric.label}</p>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Stage Navigation Dots */}
        <div className='mt-10 flex justify-center gap-3'>
          {stages.map((stage, index) => {
            const colorKey = colorKeys[index % colorKeys.length];
            const colors = stageGradients[colorKey];
            return (
              <motion.button
                key={stage.id}
                onClick={() => setActiveStageIndex(index)}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                className={cn(
                  'h-3 w-3 rounded-full transition-all duration-300',
                  index === activeStageIndex
                    ? `${colors.ambient} ring-2 ${colors.ring} w-10`
                    : 'bg-slate-700 hover:bg-slate-600',
                )}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

const PowerFlowVisualizationSection: React.FC = () => {
  return <PowerFlowVisualization autoProgress progressInterval={5000} />;
};

export default PowerFlowVisualizationSection;
