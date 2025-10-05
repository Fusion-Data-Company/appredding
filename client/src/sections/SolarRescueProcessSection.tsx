'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GradientTracing } from '@/components/ui/gradient-tracing';
import {
  Users,
  Phone,
  Calendar,
  FileText,
  CheckCircle2,
  TrendingUp,
  Zap,
  Sun,
  Home,
  DollarSign,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FunnelStage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  glowColor: string;
  icon: React.ReactNode;
  metrics: {
    label: string;
    value: string;
  }[];
  actions: string[];
}

const SolarRescueProcessSection: React.FC = () => {
  const stages: FunnelStage[] = [
    {
      id: 'awareness',
      title: 'Bonding & Rapport',
      subtitle: 'Initial Contact',
      description:
        'Build trust with homeowners facing high energy costs and position the rescue team as the authority for stranded solar systems.',
      color: 'bg-red-500',
      glowColor: 'shadow-red-500/50',
      icon: <Users className='h-8 w-8' />,
      metrics: [
        { label: 'Lead Capture', value: '2,450' },
        { label: 'Response Rate', value: '68%' },
      ],
      actions: ['Warm introduction', 'Problem discovery', 'Trust acceleration'],
    },
    {
      id: 'discovery',
      title: 'Up-Front Contract',
      subtitle: 'Qualification Phase',
      description:
        'Establish expectations, confirm authority, and map timelines while qualifying the homeowner’s utility, roof, and financing readiness.',
      color: 'bg-yellow-500',
      glowColor: 'shadow-yellow-500/50',
      icon: <FileText className='h-8 w-8' />,
      metrics: [
        { label: 'Qualified Leads', value: '1,680' },
        { label: 'Qualification Rate', value: '69%' },
      ],
      actions: ['Agenda setting', 'Decision path defined', 'Timeline alignment'],
    },
    {
      id: 'assessment',
      title: 'Problem Analysis',
      subtitle: 'Needs Analysis',
      description:
        'Dive into production loss, utility frustration, and resiliency concerns to surface the emotional drivers for rescue.',
      color: 'bg-green-500',
      glowColor: 'shadow-green-500/50',
      icon: <Zap className='h-8 w-8' />,
      metrics: [
        { label: 'Site Assessments', value: '1,260' },
        { label: 'Conversion Rate', value: '75%' },
      ],
      actions: ['Energy audit', 'Problem assessment', 'Impact modeling'],
    },
    {
      id: 'proposal',
      title: 'Budget Discussion',
      subtitle: 'Investment Phase',
      description:
        'Deliver precise proposals, layered financing, and ROI modeling that addresses problems with technical intelligence for financial gains.',
      color: 'bg-purple-500',
      glowColor: 'shadow-purple-500/50',
      icon: <DollarSign className='h-8 w-8' />,
      metrics: [
        { label: 'Proposals Sent', value: '945' },
        { label: 'Close Rate', value: '58%' },
      ],
      actions: ['Custom proposal', 'Financing pathways', 'ROI presentation'],
    },
  ];

  return (
    <section className='relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20 px-4 text-foreground sm:px-6 lg:px-8 overflow-hidden'>
      <div className='absolute inset-0 opacity-20 pointer-events-none'>
        <GradientTracing
          gradientColors={["#eab308", "#f59e0b", "#22c55e"]}
          animationDuration={4}
          strokeWidth={2}
        />
      </div>
      <div className='mx-auto max-w-7xl relative z-10'>
        <div className='mb-16 space-y-5 text-center'>
          <Badge className='flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-1.5 text-sm font-semibold text-white shadow-lg shadow-yellow-500/20'>
            <Sun className='h-4 w-4' /> Proven Sales Process
          </Badge>
          <h2 className='text-5xl font-bold text-transparent md:text-6xl'>
            <span className='bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text'>
              Solar Rescue Process
            </span>
          </h2>
          <p className='mx-auto max-w-3xl text-xl text-muted-foreground'>
            Move homeowners from energy crisis to stabilized solar performance with a four-stage process tailored to Northern California.
          </p>
          <div className='mt-8 flex items-center justify-center gap-8 text-left text-muted-foreground'>
            <div className='text-center'>
              <div className='text-3xl font-bold text-white'>2,450</div>
              <div className='text-sm'>Monthly Leads</div>
            </div>
            <div className='h-12 w-px bg-border' />
            <div className='text-center'>
              <div className='text-3xl font-bold text-emerald-400'>58%</div>
              <div className='text-sm'>Close Rate</div>
            </div>
            <div className='h-12 w-px bg-border' />
            <div className='text-center'>
              <div className='text-3xl font-bold text-yellow-400'>$2.4M</div>
              <div className='text-sm'>Monthly Revenue</div>
            </div>
          </div>
        </div>

        <div className='relative'>
          <div className='pointer-events-none hidden h-1 translate-y-[-50%] transform bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-purple-500 opacity-20 lg:block' />

          <div className='relative z-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4'>
            {stages.map((stage, index) => (
              <div key={stage.id} className='group relative'>
                <div className='absolute -top-4 left-1/2 z-20 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full text-white shadow-lg shadow-black/30'>
                  <span className={cn('font-bold', stage.color.replace('bg-', 'text-'))}>
                    {index + 1}
                  </span>
                </div>

                <Card className={cn(
                  'relative overflow-hidden border border-slate-800 bg-slate-900/60 pt-10 backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl',
                  stage.glowColor,
                )}>
                  <div className={cn('absolute inset-0 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-20', stage.color)} />
                  <div className={cn('absolute inset-x-0 top-0 h-1', stage.color)} />

                  <div className='relative z-10 p-6'>
                    <div className={cn('mb-5 flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg', stage.color, stage.glowColor)}>
                      {stage.icon}
                    </div>

                    <h3 className='text-2xl font-bold text-white'>{stage.title}</h3>
                    <p className={cn('mt-1 text-sm font-semibold uppercase tracking-wide', stage.color.replace('bg-', 'text-'))}>
                      {stage.subtitle}
                    </p>
                    <p className='mt-4 text-sm leading-relaxed text-muted-foreground'>
                      {stage.description}
                    </p>

                    <div className='mt-6 grid grid-cols-2 gap-3'>
                      {stage.metrics.map((metric) => (
                        <div key={metric.label} className='rounded-lg border border-slate-800 bg-slate-900/70 p-3 text-left'>
                          <div className='text-lg font-bold text-white'>{metric.value}</div>
                          <div className='text-xs text-muted-foreground'>{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className='mt-6 space-y-2'>
                      <p className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>Key Actions</p>
                      {stage.actions.map((action) => (
                        <div key={action} className='flex items-center gap-2 text-sm text-slate-200'>
                          <CheckCircle2 className={cn('h-4 w-4', stage.color.replace('bg-', 'text-'))} />
                          <span>{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>

                {index < stages.length - 1 && (
                  <div className='absolute top-1/2 -right-4 hidden -translate-y-1/2 text-slate-700 lg:block'>
                    <TrendingUp className='h-6 w-6' />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className='mt-20 text-center'>
          <Card className='bg-gradient-to-r from-red-500/10 via-yellow-500/10 via-green-500/10 to-purple-500/10 border border-slate-800 px-6 py-10 backdrop-blur-sm sm:px-10'>
            <div className='mx-auto flex max-w-3xl flex-col items-center gap-6 text-center'>
              <h3 className='text-3xl font-bold text-white'>Ready to Rescue More Homeowners?</h3>
              <p className='text-lg text-muted-foreground'>Deploy our proven rescue sequence and elevate conversions while stabilizing orphaned solar assets.</p>
              <div className='flex flex-col items-center gap-4 sm:flex-row'>
                <Button size='lg' className='bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg shadow-yellow-500/30 hover:from-yellow-600 hover:to-orange-600'>
                  <Phone className='mr-2 h-5 w-5' /> Schedule Demo
                </Button>
                <Button size='lg' variant='outline' className='border-slate-700 hover:bg-slate-800'>
                  <Calendar className='mr-2 h-5 w-5' /> View Case Studies
                </Button>
              </div>
            </div>
          </Card>
        </div>

        <div className='mt-12 grid grid-cols-2 gap-4 md:grid-cols-4'>
          {[
            { icon: <Home className='h-5 w-5' />, value: '5,420', label: 'Homes Powered', color: 'text-red-500' },
            { icon: <Sun className='h-5 w-5' />, value: '12.8MW', label: 'Solar Installed', color: 'text-yellow-500' },
            { icon: <Zap className='h-5 w-5' />, value: '89%', label: 'Satisfaction', color: 'text-green-500' },
            { icon: <TrendingUp className='h-5 w-5' />, value: '3.2x', label: 'ROI Average', color: 'text-purple-500' },
          ].map((stat) => (
            <div key={stat.label} className='rounded-lg border border-slate-800 bg-slate-900/60 p-4 text-center backdrop-blur-sm'>
              <div className={cn('mb-2 flex justify-center', stat.color)}>{stat.icon}</div>
              <div className='text-2xl font-bold text-white'>{stat.value}</div>
              <div className='text-xs text-muted-foreground'>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolarRescueProcessSection;
