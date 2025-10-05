'use client';

import * as React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { GradientTracing } from '@/components/ui/gradient-tracing';
import { ArrowDown, AlertTriangle, Flame, ClipboardCheck, Wrench, Battery, TrendingUp, CheckCircle, Calendar } from 'lucide-react';

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

interface FunnelMetric {
  label: string;
  value: string | number;
}

interface FunnelStage {
  id: string;
  title: string;
  description: string;
  primaryValue: number;
  metrics: FunnelMetric[];
  color: string;
  glowColor: string;
  icon: React.ReactNode;
}

const SolarRescueFunnelSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const stages: FunnelStage[] = [
    {
      id: 'pain',
      title: 'Red • Problem Signals',
      description:
        'Emergency outage calls, orphaned installs, inverter faults, wildfire outage risk, NEM 3.0 bill shock.',
      primaryValue: 8420,
      metrics: [
        { label: 'Annual CA System Failures', value: '8,420' },
        { label: 'NEM 3.0 Bill Increases', value: '+$2.8M' },
        { label: 'Wildfire Outage Hours', value: '127,400' },
      ],
      color: '#ff1a1a',
      glowColor: 'rgba(255, 26, 26, 0.6)',
      icon: <AlertTriangle className='h-7 w-7' />,
    },
    {
      id: 'intel',
      title: 'Yellow • Technical Intel',
      description:
        'Site diagnostics, IV-curve tracing, CPUC compliance, SGIP eligibility checks, wildfire readiness planning.',
      primaryValue: 6180,
      metrics: [
        { label: 'CPUC Inspections Needed', value: '4,230' },
        { label: 'SGIP Applications', value: '2,890' },
        { label: 'System Diagnostics Completed', value: '6,180' },
      ],
      color: '#ffaa00',
      glowColor: 'rgba(255, 170, 0, 0.6)',
      icon: <ClipboardCheck className='h-7 w-7' />,
    },
    {
      id: 'roi',
      title: 'Green • ROI Modeling',
      description:
        'Storage pairing, load shifting playbooks, financing alignment, home resale prep, warranty salvage.',
      primaryValue: 3850,
      metrics: [
        { label: 'Battery Pairings', value: '3,850' },
        { label: 'Annual Savings Projected', value: '$18.7M' },
        { label: 'Load Shift Scenarios', value: '12,400' },
      ],
      color: '#00ff41',
      glowColor: 'rgba(0, 255, 65, 0.6)',
      icon: <Battery className='h-7 w-7' />,
    },
    {
      id: 'decision',
      title: 'Purple • Decision & CTA',
      description:
        'Permit-ready crews, CPUC documentation binder, maintenance membership, dispatch scheduling, onboarding.',
      primaryValue: 2140,
      metrics: [
        { label: 'Permits Issued', value: '2,140' },
        { label: 'Installations Scheduled', value: '1,890' },
        { label: 'Contracts Signed', value: '$12.3M' },
      ],
      color: '#c026ff',
      glowColor: 'rgba(192, 38, 255, 0.6)',
      icon: <CheckCircle className='h-7 w-7' />,
    },
  ];

  const maxValue = stages[0].primaryValue;

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
      <div className='absolute inset-0 opacity-25 pointer-events-none'>
        <GradientTracing
          gradientColors={["#ef4444", "#f59e0b", "#22c55e"]}
          animationDuration={3.5}
          strokeWidth={2}
        />
      </div>
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
            <ArrowDown className='h-4 w-4' /> Proven Intake Sequence
          </div>
          <h2 className='mt-6 text-4xl font-bold text-white sm:text-5xl md:text-6xl'>
            Solar Rescue Conversion Process
          </h2>
          <p className='mt-4 max-w-2xl text-base text-slate-300 sm:text-lg'>
            Orchestrate every rescue journey with red (problems), yellow (technical intel), green (ROI activation), and purple (decision) milestones engineered for California&apos;s orphaned solar systems.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? 'visible' : 'hidden'}
          animate='visible'
          className='relative mt-24 h-[880px]'
        >
          {stages.map((stage, index) => {
            const cumulativeHeights = [0, 35, 65, 87, 100];
            const stageHeights = [35, 30, 22, 13];
            const topPercentage = cumulativeHeights[index];
            const segmentHeight = stageHeights[index];
            
            const stageWidths = [
              { top: 90, bottom: 70 },
              { top: 70, bottom: 55 },
              { top: 55, bottom: 35 },
              { top: 35, bottom: 20 },
            ];
            
            const topWidth = stageWidths[index].top;
            const bottomWidth = stageWidths[index].bottom;

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
                    className='absolute inset-0 blur-[100px] opacity-70 transition-opacity duration-500 hover:opacity-85'
                    style={{
                      background: `radial-gradient(ellipse at center, ${stage.glowColor} 0%, transparent 70%)`,
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
                      className='h-full w-full border-[3px] transition-all duration-500 hover:border-[4px]'
                      style={{
                        backgroundColor: `${stage.color}35`,
                        borderColor: stage.color,
                        boxShadow: `inset 0 0 60px ${stage.glowColor}, 0 0 50px ${stage.glowColor}`,
                      }}
                    />
                  </div>

                  <div
                    className='relative z-10 flex w-full max-w-4xl flex-col gap-4 rounded-2xl border-[3px] bg-slate-950/90 px-10 py-7 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(0,0,0,0.8)]'
                    style={{
                      borderColor: stage.color,
                      boxShadow: `0 0 40px ${stage.glowColor}, 0 20px 60px rgba(0,0,0,0.6)`,
                    }}
                  >
                    <div className='flex items-center justify-center gap-6 mb-4'>
                      <div
                        className='rounded-2xl p-4 shadow-lg'
                        style={{
                          backgroundColor: `${stage.color}30`,
                          color: stage.color,
                          boxShadow: `0 0 20px ${stage.glowColor}`,
                        }}
                      >
                        {stage.icon}
                      </div>
                    </div>
                    
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                      {stage.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className='rounded-xl border bg-slate-900/60 px-4 py-3 backdrop-blur transition-all duration-300 hover:scale-105'
                          style={{
                            borderColor: `${stage.color}30`,
                          }}
                        >
                          <p className='text-xs font-medium uppercase tracking-wider text-slate-400'>
                            {metric.label}
                          </p>
                          <p
                            className='mt-1 text-xl font-bold'
                            style={{ color: stage.color }}
                          >
                            {metric.value}
                          </p>
                        </div>
                      ))}
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
          className='mt-32 grid gap-8 text-center sm:grid-cols-3'
        >
          {[
            {
              label: 'CA SGIP Remaining',
              value: '$142M',
              tone: 'text-emerald-400',
              icon: <Battery className='h-5 w-5' />,
            },
            {
              label: 'NEM 3.0 Adoption Rate',
              value: '68%',
              tone: 'text-amber-400',
              icon: <TrendingUp className='h-5 w-5' />,
            },
            {
              label: 'Average System ROI',
              value: '6.2 years',
              tone: 'text-purple-400',
              icon: <Calendar className='h-5 w-5' />,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className='group rounded-2xl border-2 border-slate-800/80 bg-slate-900/80 p-8 backdrop-blur-xl shadow-xl transition-all duration-500 hover:scale-105 hover:border-slate-700 hover:bg-slate-900/90 hover:shadow-2xl'
            >
              <div className='mb-3 flex items-center justify-center gap-2'>
                <div className={cn('transition-all duration-300 group-hover:scale-110', stat.tone)}>
                  {stat.icon}
                </div>
                <p className='text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 transition-colors duration-300 group-hover:text-slate-300'>
                  {stat.label}
                </p>
              </div>
              <p className={cn('text-4xl font-bold transition-all duration-300 group-hover:scale-110', stat.tone)}>{stat.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SolarRescueFunnelSection;
