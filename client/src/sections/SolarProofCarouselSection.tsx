'use client';

import * as React from 'react';
import { useState, useEffect, useRef, useContext, createContext, Children } from 'react';
import { motion, Transition, useMotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, TrendingUp, Zap, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

// Carousel context
interface CarouselContextValue {
  index: number;
  setIndex: (index: number) => void;
  itemsCount: number;
  setItemsCount: (count: number) => void;
  disableDrag: boolean;
}

const CarouselContext = createContext<CarouselContextValue | undefined>(undefined);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within CarouselProvider');
  }
  return context;
}

interface CarouselProviderProps {
  children: React.ReactNode;
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
  disableDrag?: boolean;
}

function CarouselProvider({
  children,
  initialIndex = 0,
  onIndexChange,
  disableDrag = false,
}: CarouselProviderProps) {
  const [index, setIndex] = useState(initialIndex);
  const [itemsCount, setItemsCount] = useState(0);

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  return (
    <CarouselContext.Provider
      value={{
        index,
        setIndex: (newIndex) => {
          setIndex(newIndex);
          onIndexChange?.(newIndex);
        },
        itemsCount,
        setItemsCount,
        disableDrag,
      }}
    >
      {children}
    </CarouselContext.Provider>
  );
}

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  initialIndex?: number;
  index?: number;
  onIndexChange?: (index: number) => void;
  disableDrag?: boolean;
}

function Carousel({
  children,
  className,
  initialIndex = 0,
  index,
  onIndexChange,
  disableDrag = false,
}: CarouselProps) {
  const [internalIndex, setInternalIndex] = useState(initialIndex);
  const controlled = index !== undefined;
  const currentIndex = controlled ? index : internalIndex;

  return (
    <CarouselProvider
      initialIndex={currentIndex}
      onIndexChange={(newIndex) => {
        if (!controlled) {
          setInternalIndex(newIndex);
        }
        onIndexChange?.(newIndex);
      }}
      disableDrag={disableDrag}
    >
      <div className={cn('group/carousel relative', className)}>
        <div className='overflow-hidden'>{children}</div>
      </div>
    </CarouselProvider>
  );
}

interface CarouselNavigationProps {
  className?: string;
  classNameButton?: string;
  alwaysShow?: boolean;
}

function CarouselNavigation({ className, classNameButton, alwaysShow }: CarouselNavigationProps) {
  const { index, setIndex, itemsCount } = useCarousel();

  return (
    <div
      className={cn(
        'pointer-events-none absolute left-[-12.5%] top-1/2 flex w-[125%] -translate-y-1/2 justify-between px-2',
        className,
      )}
    >
      <button
        type='button'
        aria-label='Previous slide'
        className={cn(
          'pointer-events-auto h-fit w-fit rounded-full border border-border bg-background p-2 shadow-lg transition-opacity duration-300',
          alwaysShow ? 'opacity-100' : 'opacity-0 group-hover/carousel:opacity-100',
          classNameButton,
        )}
        disabled={index === 0}
        onClick={() => index > 0 && setIndex(index - 1)}
      >
        <ChevronLeft className='h-5 w-5' />
      </button>
      <button
        type='button'
        aria-label='Next slide'
        className={cn(
          'pointer-events-auto h-fit w-fit rounded-full border border-border bg-background p-2 shadow-lg transition-opacity duration-300',
          alwaysShow ? 'opacity-100' : 'opacity-0 group-hover/carousel:opacity-100',
          classNameButton,
        )}
        disabled={index + 1 === itemsCount}
        onClick={() => index < itemsCount - 1 && setIndex(index + 1)}
      >
        <ChevronRight className='h-5 w-5' />
      </button>
    </div>
  );
}

interface CarouselContentProps {
  children: React.ReactNode;
  className?: string;
  transition?: Transition;
}

function CarouselContent({ children, className, transition }: CarouselContentProps) {
  const { index, setIndex, setItemsCount, disableDrag } = useCarousel();
  const dragX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsLength = Children.count(children);
  const [visibleItemsCount, setVisibleItemsCount] = useState(1);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).length;
      setVisibleItemsCount(visible || 1);
    }, { root: containerRef.current, threshold: 0.5 });

    const nodes = containerRef.current.children;
    Array.from(nodes).forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [children]);

  useEffect(() => {
    setItemsCount(itemsLength);
  }, [itemsLength, setItemsCount]);

  return (
    <motion.div
      drag={disableDrag ? false : 'x'}
      dragConstraints={disableDrag ? undefined : { left: 0, right: 0 }}
      dragMomentum={disableDrag ? undefined : false}
      style={{ x: disableDrag ? undefined : dragX }}
      animate={{ translateX: `-${index * (100 / visibleItemsCount)}%` }}
      onDragEnd={() => {
        const x = dragX.get();
        if (x <= -10 && index < itemsLength - 1) setIndex(index + 1);
        else if (x >= 10 && index > 0) setIndex(index - 1);
      }}
      transition={
        transition || {
          damping: 18,
          stiffness: 90,
          type: 'spring',
          duration: 0.2,
        }
      }
      className={cn('flex items-stretch', !disableDrag && 'cursor-grab active:cursor-grabbing', className)}
      ref={containerRef}
    >
      {children}
    </motion.div>
  );
}

interface CarouselItemProps {
  children: React.ReactNode;
  className?: string;
}

function CarouselItem({ children, className }: CarouselItemProps) {
  return <motion.div className={cn('w-full shrink-0 grow-0 px-2', className)}>{children}</motion.div>;
}

// Before/after comparison slider
interface ImageComparisonSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  leftImage: string;
  rightImage: string;
  altLeft?: string;
  altRight?: string;
  initialPosition?: number;
}

const ImageComparisonSlider = React.forwardRef<HTMLDivElement, ImageComparisonSliderProps>(
  (
    { className, leftImage, rightImage, altLeft = 'Before', altRight = 'After', initialPosition = 50, ...props },
    ref,
  ) => {
    const [position, setPosition] = useState(initialPosition);
    const [dragging, setDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const updatePosition = (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((clientX - rect.left) / rect.width) * 100;
      setPosition(Math.max(0, Math.min(100, x)));
    };

    useEffect(() => {
      if (!dragging) return;
      const handleMouseMove = (e: MouseEvent) => updatePosition(e.clientX);
      const handleTouchMove = (e: TouchEvent) => updatePosition(e.touches[0].clientX);
      const stop = () => setDragging(false);

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('mouseup', stop);
      document.addEventListener('touchend', stop);
      document.body.style.cursor = 'ew-resize';

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('mouseup', stop);
        document.removeEventListener('touchend', stop);
        document.body.style.cursor = '';
      };
    }, [dragging]);

    return (
      <div
        ref={containerRef}
        className={cn('group relative h-full w-full select-none overflow-hidden', className)}
        onMouseDown={() => setDragging(true)}
        onTouchStart={() => setDragging(true)}
        {...props}
      >
        <img src={rightImage} alt={altRight} className='absolute inset-0 h-full w-full object-cover' draggable={false} />
        <div
          className='absolute inset-0 h-full w-full overflow-hidden'
          style={{ clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)` }}
        >
          <img src={leftImage} alt={altLeft} className='h-full w-full object-cover' draggable={false} />
        </div>
        <div className='absolute top-0 h-full w-1' style={{ left: `calc(${position}% - 2px)` }}>
          <div className='absolute inset-y-0 w-1 bg-background/60 backdrop-blur-sm' />
          <div
            className={cn(
              'absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-border bg-background/90 p-3 shadow-xl backdrop-blur',
              'transition-transform duration-300 ease-out',
              dragging ? 'scale-105 shadow-2xl' : 'group-hover:scale-105',
            )}
          >
            <div className='flex items-center text-primary'>
              <ChevronLeft className='h-4 w-4' />
              <ChevronRight className='h-4 w-4' />
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ImageComparisonSlider.displayName = 'ImageComparisonSlider';

// KPI chip
interface KpiChipProps {
  label: string;
  value: string | number;
  delta?: string;
  trend?: 'up' | 'down' | 'flat';
  icon?: React.ReactNode;
  className?: string;
}

function KpiChip({ label, value, delta, trend = 'flat', icon, className }: KpiChipProps) {
  const trendClass =
    trend === 'up'
      ? 'text-emerald-500'
      : trend === 'down'
        ? 'text-rose-500'
        : 'text-muted-foreground';

  return (
    <div className={cn('inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-2 backdrop-blur', className)}>
      {icon && <div className='text-primary'>{icon}</div>}
      <div className='flex flex-col text-left'>
        <span className='text-xs text-muted-foreground'>{label}</span>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-semibold text-foreground'>{value}</span>
          {delta && <span className={cn('text-xs font-medium', trendClass)}>{delta}</span>}
        </div>
      </div>
    </div>
  );
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
  avatar: string;
  beforeImage: string;
  afterImage: string;
  kpis: Array<{
    label: string;
    value: string;
    delta?: string;
    trend?: 'up' | 'down' | 'flat';
    icon?: React.ReactNode;
  }>;
}

export function SolarTestimonialCarousel() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      role: 'Homeowner',
      company: 'Residential Solar',
      quote:
        'Switching to our rescue program was the best decision for our family. Bills dropped 85% in year one and our array performs better than it ever did.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      beforeImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=900&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=900&fit=crop',
      kpis: [
        { label: 'Energy Savings', value: '85%', delta: '+85%', trend: 'up', icon: <TrendingUp className='h-4 w-4' /> },
        { label: 'ROI Period', value: '4.2 yrs', icon: <Zap className='h-4 w-4' /> },
        { label: 'Grid Outages Covered', value: '12', delta: '+12', trend: 'up', icon: <Sun className='h-4 w-4' /> },
      ],
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Facilities Director',
      company: 'Redding Logistics',
      quote:
        'Our 250 kW system was failing after the original installer vanished. The rescue retrofit stabilized production and unlocked $48k annual savings.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      beforeImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=900&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1200&h=900&fit=crop',
      kpis: [
        { label: 'Energy Savings', value: '92%', delta: '+92%', trend: 'up', icon: <TrendingUp className='h-4 w-4' /> },
        { label: 'Annual Savings', value: '$48K', delta: '+$48K', trend: 'up', icon: <Zap className='h-4 w-4' /> },
        { label: 'System Size', value: '250 kW', icon: <Sun className='h-4 w-4' /> },
      ],
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Property Manager',
      company: 'North State Apartments',
      quote:
        'We rescued 48 units with stranded warranties. Property value rose 18% and tenants save an average of 67% on utilities.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      beforeImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=900&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&h=900&fit=crop',
      kpis: [
        { label: 'Property Value', value: '+18%', delta: '+18%', trend: 'up', icon: <TrendingUp className='h-4 w-4' /> },
        { label: 'Tenant Savings', value: '67%', delta: '+67%', trend: 'up', icon: <Zap className='h-4 w-4' /> },
        { label: 'Units Powered', value: '48', icon: <Sun className='h-4 w-4' /> },
      ],
    },
  ];

  return (
    <section className='relative w-full overflow-hidden bg-gradient-to-b from-background via-background/90 to-muted/20 py-24'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.18),_transparent)]' />
      <div className='relative z-10 container mx-auto px-4'>
        <div className='mb-14 text-center'>
          <Badge variant='outline' className='border-sky-400/40 bg-sky-400/10 text-sky-100'>
            Sandler • Purple Decision Stories
          </Badge>
          <h2 className='mt-6 text-4xl font-bold text-white md:text-5xl'>
            Proof Our Rescue Playbooks Work
          </h2>
          <p className='mx-auto mt-4 max-w-3xl text-base text-slate-200 sm:text-lg'>
            Before/after performance snapshots, homeowner ROI, and commercial uptime gains across Redding, Shasta, and the North State corridor.
          </p>
        </div>

        <Carousel className='mx-auto max-w-6xl'>
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id}>
                <div className='grid gap-10 rounded-[32px] border border-white/10 bg-slate-950/60 p-8 backdrop-blur xl:grid-cols-[1.15fr_0.85fr]'>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className='relative'
                  >
                    <div className='overflow-hidden rounded-[28px] border border-white/10 shadow-[0_35px_60px_rgba(15,23,42,0.45)]'>
                      <ImageComparisonSlider
                        leftImage={testimonial.beforeImage}
                        rightImage={testimonial.afterImage}
                        altLeft='Before Rescue'
                        altRight='After Rescue'
                        className='aspect-[4/3]'
                      />
                    </div>
                    <div className='absolute left-6 top-6 rounded-full border border-red-500/40 bg-red-500/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-red-100'>
                      Red Pain
                    </div>
                    <div className='absolute right-6 top-6 rounded-full border border-emerald-400/40 bg-emerald-400/20 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-emerald-100'>
                      Green ROI
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className='flex flex-col gap-6'
                  >
                    <div className='flex flex-wrap gap-3'>
                      {testimonial.kpis.map((kpi) => (
                        <KpiChip key={kpi.label} {...kpi} />
                      ))}
                    </div>

                    <div className='rounded-[24px] border border-white/10 bg-white/5 p-6 shadow-[0_25px_45px_rgba(7,11,21,0.35)]'>
                      <div className='mb-4 flex items-center gap-1'>
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={index}
                            className={cn('h-5 w-5', index < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/20')}
                          />
                        ))}
                      </div>
                      <blockquote className='text-lg leading-relaxed text-slate-100'>
                        “{testimonial.quote}”
                      </blockquote>
                      <div className='mt-6 flex items-center gap-4'>
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className='h-12 w-12 rounded-full border-2 border-white/10 object-cover'
                        />
                        <div>
                          <p className='text-base font-semibold text-white'>{testimonial.name}</p>
                          <p className='text-sm text-slate-300'>
                            {testimonial.role} • {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className='flex items-center justify-between text-xs text-slate-400 uppercase tracking-[0.35em]'>
                      <span className='text-red-200'>Yellow Intel → Green ROI → Purple CTA</span>
                      <span>Stage {testimonial.id} of {testimonials.length}</span>
                    </div>
                  </motion.div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNavigation alwaysShow className='hidden md:flex' classNameButton='border-white/10 bg-white/20 text-white hover:bg-white/30' />
        </Carousel>
      </div>
    </section>
  );
}

const SolarProofCarouselSection: React.FC = () => {
  return <SolarTestimonialCarousel />;
};

export default SolarProofCarouselSection;
