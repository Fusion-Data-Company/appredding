import * as React from 'react';
import { useState, useRef, useEffect, Children, createContext, useContext } from 'react';
import { motion, Transition, useMotionValue } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, TrendingUp, Zap, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export type CarouselContextType = {
  index: number;
  setIndex: (newIndex: number) => void;
  itemsCount: number;
  setItemsCount: (newItemsCount: number) => void;
  disableDrag: boolean;
};

const CarouselContext = createContext<CarouselContextType | undefined>(undefined);

function useCarousel() {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error('useCarousel must be used within an CarouselProvider');
  }
  return context;
}

export type CarouselProviderProps = {
  children: React.ReactNode;
  initialIndex?: number;
  onIndexChange?: (newIndex: number) => void;
  disableDrag?: boolean;
};

function CarouselProvider({
  children,
  initialIndex = 0,
  onIndexChange,
  disableDrag = false,
}: CarouselProviderProps) {
  const [index, setIndex] = useState<number>(initialIndex);
  const [itemsCount, setItemsCount] = useState<number>(0);

  const handleSetIndex = (newIndex: number) => {
    setIndex(newIndex);
    onIndexChange?.(newIndex);
  };

  useEffect(() => {
    setIndex(initialIndex);
  }, [initialIndex]);

  return (
    <CarouselContext.Provider
      value={{
        index,
        setIndex: handleSetIndex,
        itemsCount,
        setItemsCount,
        disableDrag,
      }}
    >
      {children}
    </CarouselContext.Provider>
  );
}

export type CarouselProps = {
  children: React.ReactNode;
  className?: string;
  initialIndex?: number;
  index?: number;
  onIndexChange?: (newIndex: number) => void;
  disableDrag?: boolean;
};

function Carousel({
  children,
  className,
  initialIndex = 0,
  index: externalIndex,
  onIndexChange,
  disableDrag = false,
}: CarouselProps) {
  const [internalIndex, setInternalIndex] = useState<number>(initialIndex);
  const isControlled = externalIndex !== undefined;
  const currentIndex = isControlled ? externalIndex : internalIndex;

  const handleIndexChange = (newIndex: number) => {
    if (!isControlled) {
      setInternalIndex(newIndex);
    }
    onIndexChange?.(newIndex);
  };

  return (
    <CarouselProvider
      initialIndex={currentIndex}
      onIndexChange={handleIndexChange}
      disableDrag={disableDrag}
    >
      <div className={cn('group/hover relative', className)}>
        <div className='overflow-hidden'>{children}</div>
      </div>
    </CarouselProvider>
  );
}

export type CarouselNavigationProps = {
  className?: string;
  classNameButton?: string;
  alwaysShow?: boolean;
};

function CarouselNavigation({
  className,
  classNameButton,
  alwaysShow,
}: CarouselNavigationProps) {
  const { index, setIndex, itemsCount } = useCarousel();

  return (
    <div
      className={cn(
        'pointer-events-none absolute left-[-12.5%] top-1/2 flex w-[125%] -translate-y-1/2 justify-between px-2',
        className
      )}
    >
      <button
        type='button'
        aria-label='Previous slide'
        className={cn(
          'pointer-events-auto h-fit w-fit rounded-full bg-background border border-border p-2 transition-opacity duration-300 shadow-lg',
          alwaysShow
            ? 'opacity-100'
            : 'opacity-0 group-hover/hover:opacity-100',
          alwaysShow
            ? 'disabled:opacity-40'
            : 'group-hover/hover:disabled:opacity-40',
          classNameButton
        )}
        disabled={index === 0}
        onClick={() => {
          if (index > 0) {
            setIndex(index - 1);
          }
        }}
      >
        <ChevronLeft className='stroke-foreground' size={20} />
      </button>
      <button
        type='button'
        className={cn(
          'pointer-events-auto h-fit w-fit rounded-full bg-background border border-border p-2 transition-opacity duration-300 shadow-lg',
          alwaysShow
            ? 'opacity-100'
            : 'opacity-0 group-hover/hover:opacity-100',
          alwaysShow
            ? 'disabled:opacity-40'
            : 'group-hover/hover:disabled:opacity-40',
          classNameButton
        )}
        aria-label='Next slide'
        disabled={index + 1 === itemsCount}
        onClick={() => {
          if (index < itemsCount - 1) {
            setIndex(index + 1);
          }
        }}
      >
        <ChevronRight className='stroke-foreground' size={20} />
      </button>
    </div>
  );
}

export type CarouselContentProps = {
  children: React.ReactNode;
  className?: string;
  transition?: Transition;
};

function CarouselContent({
  children,
  className,
  transition,
}: CarouselContentProps) {
  const { index, setIndex, setItemsCount, disableDrag } = useCarousel();
  const [visibleItemsCount, setVisibleItemsCount] = useState(1);
  const dragX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsLength = Children.count(children);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const options = {
      root: containerRef.current,
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      const visibleCount = entries.filter(
        (entry) => entry.isIntersecting
      ).length;
      setVisibleItemsCount(visibleCount);
    }, options);

    const childNodes = containerRef.current.children;
    Array.from(childNodes).forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, [children, setItemsCount]);

  useEffect(() => {
    if (!itemsLength) {
      return;
    }

    setItemsCount(itemsLength);
  }, [itemsLength, setItemsCount]);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -10 && index < itemsLength - 1) {
      setIndex(index + 1);
    } else if (x >= 10 && index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <motion.div
      drag={disableDrag ? false : 'x'}
      dragConstraints={
        disableDrag
          ? undefined
          : {
              left: 0,
              right: 0,
            }
      }
      dragMomentum={disableDrag ? undefined : false}
      style={{
        x: disableDrag ? undefined : dragX,
      }}
      animate={{
        translateX: `-${index * (100 / visibleItemsCount)}%`,
      }}
      onDragEnd={disableDrag ? undefined : onDragEnd}
      transition={
        transition || {
          damping: 18,
          stiffness: 90,
          type: 'spring',
          duration: 0.2,
        }
      }
      className={cn(
        'flex items-center',
        !disableDrag && 'cursor-grab active:cursor-grabbing',
        className
      )}
      ref={containerRef}
    >
      {children}
    </motion.div>
  );
}

export type CarouselItemProps = {
  children: React.ReactNode;
  className?: string;
};

function CarouselItem({ children, className }: CarouselItemProps) {
  return (
    <motion.div
      className={cn(
        'w-full min-w-0 shrink-0 grow-0 overflow-hidden',
        className
      )}
    >
      {children}
    </motion.div>
  );
}

interface ImageComparisonSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  leftImage: string;
  rightImage: string;
  altLeft?: string;
  altRight?: string;
  initialPosition?: number;
}

const ImageComparisonSlider = React.forwardRef<
  HTMLDivElement,
  ImageComparisonSliderProps
>(
  (
    {
      className,
      leftImage,
      rightImage,
      altLeft = 'Before',
      altRight = 'After',
      initialPosition = 50,
      ...props
    },
    ref
  ) => {
    const [sliderPosition, setSliderPosition] = useState(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      let newPosition = (x / rect.width) * 100;

      newPosition = Math.max(0, Math.min(100, newPosition));

      setSliderPosition(newPosition);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    };

    const handleInteractionStart = () => {
      setIsDragging(true);
    };
    const handleInteractionEnd = () => {
      setIsDragging(false);
    };

    useEffect(() => {
      if (isDragging) {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('mouseup', handleInteractionEnd);
        document.addEventListener('touchend', handleInteractionEnd);
        document.body.style.cursor = 'ew-resize';
      } else {
        document.body.style.cursor = '';
      }

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('mouseup', handleInteractionEnd);
        document.removeEventListener('touchend', handleInteractionEnd);
        document.body.style.cursor = '';
      };
    }, [isDragging]);

    return (
      <div
        ref={containerRef}
        className={cn(
          'relative w-full h-full overflow-hidden select-none group',
          className
        )}
        onMouseDown={handleInteractionStart}
        onTouchStart={handleInteractionStart}
        {...props}
      >
        <img
          src={rightImage}
          alt={altRight}
          className='absolute inset-0 w-full h-full object-cover pointer-events-none'
          draggable={false}
        />

        <div
          className='absolute inset-0 w-full h-full overflow-hidden pointer-events-none'
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img
            src={leftImage}
            alt={altLeft}
            className='w-full h-full object-cover'
            draggable={false}
          />
        </div>

        <div
          className='absolute top-0 h-full w-1 cursor-ew-resize'
          style={{ left: `calc(${sliderPosition}% - 2px)` }}
        >
          <div className='absolute inset-y-0 w-1 bg-background/50 backdrop-blur-sm'></div>

          <div
            className={cn(
              'absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 flex items-center justify-center rounded-full bg-background/90 text-foreground shadow-xl backdrop-blur-md border border-border',
              'transition-all duration-300 ease-in-out',
              'group-hover:scale-105',
              isDragging && 'scale-105 shadow-2xl'
            )}
          >
            <div className='flex items-center text-primary'>
              <ChevronLeft className='h-5 w-5 drop-shadow-md' />
              <ChevronRight className='h-5 w-5 drop-shadow-md' />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ImageComparisonSlider.displayName = 'ImageComparisonSlider';

type KpiChipProps = {
  label: string;
  value: string | number;
  delta?: number | string;
  trend?: 'up' | 'down' | 'flat';
  icon?: React.ReactNode;
  className?: string;
};

function KpiChip({ label, value, delta, trend = 'flat', icon, className }: KpiChipProps) {
  const isUp = trend === 'up';
  const isDown = trend === 'down';

  const deltaValue = typeof delta === 'number' ? `${delta > 0 ? '+' : ''}${delta}%` : delta;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full bg-background/80 backdrop-blur-sm border border-border px-4 py-2 shadow-sm',
        className
      )}
    >
      {icon && <div className='text-primary'>{icon}</div>}
      <div className='flex flex-col'>
        <span className='text-xs text-muted-foreground'>{label}</span>
        <div className='flex items-center gap-2'>
          <span className='text-sm font-semibold text-foreground'>{value}</span>
          {deltaValue && (
            <span
              className={cn(
                'text-xs font-medium',
                isUp && 'text-emerald-600 dark:text-emerald-400',
                isDown && 'text-rose-600 dark:text-rose-400',
                !isUp && !isDown && 'text-muted-foreground'
              )}
            >
              {deltaValue}
            </span>
          )}
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
  kpis: {
    label: string;
    value: string;
    delta?: string;
    trend?: 'up' | 'down' | 'flat';
    icon?: React.ReactNode;
  }[];
}

export default function SolarTestimonialCarousel() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      role: 'Homeowner',
      company: 'Residential Solar',
      quote: 'Switching to solar was the best decision for our family. Our energy bills dropped by 85% in the first year, and the installation was seamless.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790178377-be9c29b29330?w=400&h=400&fit=crop',
      beforeImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop',
      kpis: [
        { label: 'Energy Savings', value: '85%', delta: '+85', trend: 'up', icon: <TrendingUp className='h-4 w-4' /> },
        { label: 'ROI Period', value: '4.2 yrs', icon: <Zap className='h-4 w-4' /> },
        { label: 'CO₂ Reduced', value: '12 tons', delta: '+12', trend: 'up', icon: <Sun className='h-4 w-4' /> },
      ],
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Business Owner',
      company: 'Commercial Solar',
      quote: 'Our commercial facility now runs on 100% renewable energy. The parallax monitoring system gives us real-time insights into our energy production.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      beforeImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop',
      kpis: [
        { label: 'Energy Savings', value: '92%', delta: '+92', trend: 'up', icon: <TrendingUp className='h-4 w-4' /> },
        { label: 'Annual Savings', value: '$48K', icon: <Zap className='h-4 w-4' /> },
        { label: 'System Size', value: '250 kW', icon: <Sun className='h-4 w-4' /> },
      ],
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Property Manager',
      company: 'Multi-Family Solar',
      quote: 'Installing solar across our apartment complex increased property value by 18% and reduced tenant utility costs significantly.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      beforeImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      afterImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
      kpis: [
        { label: 'Property Value', value: '+18%', delta: '+18', trend: 'up', icon: <TrendingUp className='h-4 w-4' /> },
        { label: 'Tenant Savings', value: '67%', delta: '+67', trend: 'up', icon: <Zap className='h-4 w-4' /> },
        { label: 'Units Powered', value: '48', icon: <Sun className='h-4 w-4' /> },
      ],
    },
  ];

  return (
    <section className='w-full bg-gradient-to-b from-background to-muted/20 py-20'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-12'>
          <Badge variant='outline' className='mb-4'>
            Customer Success Stories
          </Badge>
          <h2 className='text-4xl md:text-5xl font-bold tracking-tight mb-4'>
            Real Results from Real Customers
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            See how our premium solar solutions transformed energy consumption and delivered measurable ROI
          </p>
        </div>

        <Carousel className='max-w-7xl mx-auto'>
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className='px-4'>
                <div className='grid md:grid-cols-2 gap-8 items-center'>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className='relative'
                  >
                    <div className='aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-border'>
                      <ImageComparisonSlider
                        leftImage={testimonial.beforeImage}
                        rightImage={testimonial.afterImage}
                        altLeft='Before Solar Installation'
                        altRight='After Solar Installation'
                      />
                    </div>
                    <div className='absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-medium border border-border'>
                      Before
                    </div>
                    <div className='absolute top-4 right-4 bg-primary/90 backdrop-blur-sm rounded-lg px-3 py-1 text-sm font-medium text-primary-foreground'>
                      After
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className='space-y-6'
                  >
                    <div className='flex flex-wrap gap-3'>
                      {testimonial.kpis.map((kpi, idx) => (
                        <KpiChip
                          key={idx}
                          label={kpi.label}
                          value={kpi.value}
                          delta={kpi.delta}
                          trend={kpi.trend}
                          icon={kpi.icon}
                        />
                      ))}
                    </div>

                    <div className='bg-card border border-border rounded-2xl p-6 shadow-lg'>
                      <div className='flex items-center gap-1 mb-4'>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'h-5 w-5',
                              i < testimonial.rating
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-muted-foreground/30'
                            )}
                          />
                        ))}
                      </div>
                      <blockquote className='text-lg text-foreground mb-6'>
                        "{testimonial.quote}"
                      </blockquote>
                      <div className='flex items-center gap-4'>
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className='w-12 h-12 rounded-full object-cover border-2 border-border'
                        />
                        <div>
                          <div className='font-semibold text-foreground'>{testimonial.name}</div>
                          <div className='text-sm text-muted-foreground'>
                            {testimonial.role} • {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNavigation alwaysShow className='hidden md:flex' />
        </Carousel>
      </div>
    </section>
  );
}
