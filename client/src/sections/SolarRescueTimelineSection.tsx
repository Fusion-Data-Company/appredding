'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle2, TrendingUp, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface FunnelStage {
  id: string;
  title: string;
  description: string;
  color: string;
  glowColor: string;
  icon: React.ReactNode;
  metrics?: React.ReactNode;
}

interface SalesFunnelProps {
  stages?: FunnelStage[];
  className?: string;
}

const defaultStages: FunnelStage[] = [
  {
    id: 'awareness',
    title: 'Awareness',
    description: 'Identify homeowners battling high bills, stranded warranties, or grid instability in PG&E and REU territories.',
    color: 'from-red-500 to-red-600',
    glowColor: 'rgba(239, 68, 68, 0.5)',
    icon: <Zap className='h-8 w-8' />,
    metrics: '10K+ Leads',
  },
  {
    id: 'interest',
    title: 'Interest',
    description: 'Deploy education kits covering NEM 3.0, SGIP, and wildfire resilience pathways tailored for Northern California homes.',
    color: 'from-yellow-500 to-yellow-600',
    glowColor: 'rgba(234, 179, 8, 0.5)',
    icon: <TrendingUp className='h-8 w-8' />,
    metrics: '5K+ Engaged',
  },
  {
    id: 'decision',
    title: 'Decision',
    description: 'Present triage reports with ROI modeling, financing, and storage pairings that neutralize red pain with green outcomes.',
    color: 'from-green-500 to-green-600',
    glowColor: 'rgba(34, 197, 94, 0.5)',
    icon: <CheckCircle2 className='h-8 w-8' />,
    metrics: '2K+ Proposals',
  },
  {
    id: 'action',
    title: 'Action',
    description: 'Secure commitment, lock in permits, and activate the rescue crew with maintenance enrollments and CPUC-ready binders.',
    color: 'from-purple-500 to-purple-600',
    glowColor: 'rgba(168, 85, 247, 0.5)',
    icon: <ArrowRight className='h-8 w-8' />,
    metrics: '1K+ Conversions',
  },
];

const SolarRescueTimelineSection: React.FC<SalesFunnelProps> = ({
  stages = defaultStages,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.82, 1, 1, 0.82]);

  useEffect(() => {
    stages.forEach((stage) => {
      document.body.style.setProperty(`--${stage.id}-glow`, stage.glowColor);
    });
  }, [stages]);

  return (
    <section
      ref={containerRef}
      className={cn(
        'relative min-h-screen w-full overflow-hidden bg-background py-20',
        className,
      )}
      style={{ position: 'relative' }}
    >
      <div className='absolute inset-0 bg-gradient-to-br from-background via-background/95 to-background' />

      <div className='absolute inset-0 opacity-30'>
        {stages.map((stage, index) => (
          <motion.div
            key={stage.id}
            className={cn('absolute h-96 w-96 rounded-full blur-3xl', `bg-gradient-to-br ${stage.color}`)}
            style={{
              top: `${18 + index * 22}%`,
              left: `${12 + (index % 2) * 58}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.25, 0.45, 0.25],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: index * 0.5,
            }}
          />
        ))}
      </div>

      <motion.div style={{ opacity, scale }} className='relative z-10 mx-auto max-w-6xl px-6'>
        <div className='mb-16 text-center'>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className='text-5xl font-bold tracking-tight text-foreground md:text-6xl'
          >
            Solar Rescue <span className='bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 bg-clip-text text-transparent'>Sales Funnel</span>
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='mx-auto mt-4 max-w-3xl text-xl text-muted-foreground'
          >
            Transform stranded arrays into resilient assets with a Sandler-guided journey engineered for Northern California homeowners.
          </motion.p>
        </div>

        <div className='relative'>
          <div className='absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 bg-gradient-to-b from-red-500 via-yellow-500 via-green-500 to-purple-500 md:block' />

          <div className='space-y-12'>
            {stages.map((stage, index) => (
              <motion.div
                key={stage.id}
                initial={{ x: index % 2 === 0 ? -120 : 120, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                viewport={{ once: true }}
                className={cn(
                  'relative flex flex-col items-center gap-8 md:flex-row',
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse',
                )}
              >
                <div className='flex-1'>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className='relative rounded-2xl border border-border/50 bg-gradient-to-br from-background/80 to-background/40 p-8 backdrop-blur'
                    style={{
                      boxShadow: `0 0 40px ${stage.glowColor}, 0 0 80px ${stage.glowColor}20`,
                    }}
                  >
                    <div className='mb-4 flex items-start gap-4'>
                      <div className={cn('rounded-xl bg-gradient-to-br p-3 text-white', stage.color)}>
                        {stage.icon}
                      </div>
                      <div className='flex-1'>
                        <h3 className='text-2xl font-bold text-foreground'>{stage.title}</h3>
                        {stage.metrics && (
                          <div className={cn('text-sm font-semibold', `bg-gradient-to-r ${stage.color} bg-clip-text text-transparent`)}>
                            {stage.metrics}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className='text-muted-foreground'>{stage.description}</p>

                    <motion.div
                      className='pointer-events-none absolute -inset-px rounded-2xl opacity-0'
                      whileHover={{ opacity: 1 }}
                      style={{
                        background: `linear-gradient(135deg, ${stage.glowColor}, transparent)`,
                      }}
                    />
                  </motion.div>
                </div>

                <div className='hidden h-16 w-16 items-center justify-center md:flex'>
                  <motion.div
                    className={cn('flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br text-white font-bold text-xl', stage.color)}
                    whileHover={{ scale: 1.18, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      boxShadow: `0 0 30px ${stage.glowColor}`,
                    }}
                  >
                    {index + 1}
                  </motion.div>
                </div>

                <div className='hidden flex-1 md:block' />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className='mt-20 text-center'
        >
          <Button size='lg' className='rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-purple-500 px-8 py-6 text-lg text-white hover:opacity-90'>
            Start Your Solar Rescue Journey
            <ArrowRight className='ml-2 h-5 w-5' />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SolarRescueTimelineSection;
