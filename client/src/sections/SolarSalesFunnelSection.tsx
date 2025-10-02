'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ArrowDown, Users, Phone, FileCheck, Zap } from 'lucide-react';

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

interface FunnelStage {
  id: string;
  title: string;
  description: string;
  value: number;
  color: string;
  glowColor: string;
  icon: React.ReactNode;
}

const SolarRescueFunnelSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const stages: FunnelStage[] = [
    {
      id: 'pain',
      title: 'Red • Pain Signals',
      description:
        'Emergency outage calls, orphaned installs, inverter faults, wildfire outage risk, NEM 3.0 bill shock.',
      value: 1180,
      color: '#ef4444',
      glowColor: 'rgba(239, 68, 68, 0.45)',
      icon: <Users className='h-6 w-6' />,
    },
    {
      id: 'intel',
      title: 'Yellow • Technical Intel',
      description:
        'Site diagnostics, IV-curve tracing, CPUC compliance, SGIP eligibility checks, wildfire readiness planning.',
      value: 860,
      color: '#f59e0b',
      glowColor: 'rgba(245, 158, 11, 0.45)',
      icon: <Zap className='h-6 w-6' />,
    },
    {
      id: 'roi',
      title: 'Green • ROI Modeling',
      description:
        'Storage pairing, load shifting playbooks, financing alignment, home resale prep, warranty salvage.',
      value: 540,
      color: '#22c55e',
      glowColor: 'rgba(34, 197, 94, 0.45)',
      icon: <FileCheck className='h-6 w-6' />,
    },
    {
      id: 'decision',
      title: 'Purple • Decision & CTA',
      description:
        'Permit-ready crews, CPUC documentation binder, maintenance membership, dispatch scheduling, onboarding.',
      value: 290,
      color: '#a855f7',
      glowColor: 'rgba(168, 85, 247, 0.45)',
      icon: <Phone className='h-6 w-6' />,
    },
  ];

  const maxValue = stages[0].value;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.2,
      },
    },
  } as const;

  const stageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.85,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 24,
      },
    },
  } as const;

  return (
    <section className='relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950'>
      <div className='absolute inset-0 opacity-15'>
        <GridPattern width={42} height={42} className='fill-slate-600/40 stroke-slate-700/40' />
      </div>

      <div className='absolute top-0 left-1/4 h-96 w-96 animate-pulse rounded-full bg-red-500/25 blur-[120px]' />
      <div className='absolute top-1/4 right-1/4 h-96 w-96 animate-pulse delay-1000 rounded-full bg-amber-500/25 blur-[120px]' />
      <div className='absolute bottom-1/4 left-1/3 h-96 w-96 animate-pulse delay-2000 rounded-full bg-emerald-500/25 blur-[120px]' />
      <div className='absolute bottom-4 right-1/4 h-96 w-96 animate-pulse delay-3000 rounded-full bg-purple-500/25 blur-[120px]' />

      <div className='relative z-10 mx-auto flex max-w-7xl flex-col px-4 py-24 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className='flex flex-col items-center text-center'
        >
          <div className='inline-flex items-center gap-3 rounded-full border border-slate-700/60 bg-slate-900/70 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-300/90'>
            <ArrowDown className='h-4 w-4' /> Sandler Intake Sequence
          </div>
          <h2 className='mt-6 text-4xl font-bold text-white sm:text-5xl md:text-6xl'>
            Solar Rescue Conversion Spine
          </h2>
          <p className='mt-4 max-w-2xl text-base text-slate-300 sm:text-lg'>
            Orchestrate every rescue journey with red (pain), yellow (technical intel), green (ROI activation), and purple (decision) milestones engineered for California&apos;s orphaned solar systems.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          animate='visible'
          className='relative mt-20 h-[640px]'
        >
          {stages.map((stage, index) => {
            const topPercentage = (index / stages.length) * 100;
            const segmentHeight = 100 / stages.length;
            const topWidth =
              index === 0
                ? 92
                : ((stages[index - 1]?.value || maxValue) / maxValue) * 92;
            const bottomWidth = (stage.value / maxValue) * 92;

            return (
              <motion.div
                key={stage.id}
                variants={stageVariants}
                className='absolute left-1/2 flex -translate-x-1/2 items-center justify-center'
                style={{
                  top: `${topPercentage}%`,
                  height: `${segmentHeight}%`,
                  width: '100%',
                }}
              >
                <div className='relative flex h-full w-full items-center justify-center'>
                  <div
                    className='absolute inset-0 blur-3xl opacity-45 transition-opacity duration-300'
                    style={{
                      background: `radial-gradient(ellipse at center, ${stage.glowColor} 0%, transparent 72%)`,
                    }}
                  />

                  <div
                    className='absolute transition-all duration-700'
                    style={{
                      top: 0,
                      left: `${(100 - topWidth) / 2}%`,
                      right: `${(100 - topWidth) / 2}%`,
                      height: '100%',
                      clipPath: `polygon(
                        ${( (topWidth - bottomWidth) / 2 / topWidth) * 100}% 0%,
                        ${100 - ((topWidth - bottomWidth) / 2 / topWidth) * 100}% 0%,
                        100% 100%,
                        0% 100%
                      )`,
                    }}
                  >
                    <div
                      className='h-full w-full border-2 transition-all duration-300'
                      style={{
                        backgroundColor: `${stage.color}26`,
                        borderColor: stage.color,
                        boxShadow: `inset 0 0 48px ${stage.glowColor}, 0 0 38px ${stage.glowColor}`,
                      }}
                    />
                  </div>

                  <div
                    className='relative z-10 flex w-full max-w-3xl items-center gap-6 rounded-2xl border-2 bg-slate-950/85 px-8 py-6 backdrop-blur-md transition-transform duration-300 hover:scale-[1.02]'
                    style={{
                      borderColor: stage.color,
                      boxShadow: `0 0 30px ${stage.glowColor}`,
                    }}
                  >
                    <div
                      className='rounded-2xl p-3'
                      style={{
                        backgroundColor: `${stage.color}22`,
                        color: stage.color,
                      }}
                    >
                      {stage.icon}
                    </div>
                    <div className='flex-1 text-left'>
                      <h3 className='text-2xl font-semibold' style={{ color: stage.color }}>
                        {stage.title}
                      </h3>
                      <p className='mt-2 text-sm text-slate-300'>{stage.description}</p>
                    </div>
                    <div className='text-right text-white'>
                      <div className='text-3xl font-semibold'>
                        {stage.value.toLocaleString()}
                      </div>
                      <p className='text-xs uppercase tracking-[0.25em] text-slate-400/80'>
                        prospects
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className='mt-24 grid gap-6 text-center sm:grid-cols-3'
        >
          {[
            {
              label: 'Conversion Velocity',
              value: '26%',
              tone: 'text-emerald-400',
            },
            {
              label: 'Pipeline Health',
              value: '$3.1M',
              tone: 'text-purple-300',
            },
            {
              label: 'Response SLA',
              value: '2h 12m',
              tone: 'text-sky-300',
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className='rounded-2xl border border-slate-800/70 bg-slate-900/70 p-6 backdrop-blur'
            >
              <p className='text-sm uppercase tracking-[0.28em] text-slate-400'>
                {stat.label}
              </p>
              <p className={cn('mt-2 text-3xl font-semibold', stat.tone)}>{stat.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SolarRescueFunnelSection;
