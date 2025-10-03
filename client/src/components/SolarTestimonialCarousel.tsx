"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, TrendingUp, Sun, Zap, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "@/components/ui/avatar";

type Tone = "default" | "primary" | "success" | "warning" | "danger";
type Size = "sm" | "md" | "lg";
type Trend = "up" | "down" | "flat";

export type KpiCardProps = {
  label: string;
  value: string | number;
  delta?: number | string;
  trend?: Trend;
  caption?: string;
  icon?: React.ReactNode;
  tone?: Tone;
  size?: Size;
  compact?: boolean;
  className?: string;
};

const toneMap: Record<
  Tone,
  { card: string; value: string; deltaUp: string; deltaDown: string }
> = {
  default: {
    card: "bg-zinc-100/70 dark:bg-zinc-900/50 ring-1 ring-zinc-200 dark:ring-zinc-800",
    value: "text-zinc-950 dark:text-zinc-50",
    deltaUp: "text-emerald-600 dark:text-emerald-400",
    deltaDown: "text-rose-600 dark:text-rose-400",
  },
  primary: {
    card: "bg-blue-100/70 dark:bg-blue-900/30 ring-1 ring-blue-200/60 dark:ring-blue-800/60",
    value: "text-blue-700 dark:text-blue-200",
    deltaUp: "text-emerald-600 dark:text-emerald-400",
    deltaDown: "text-rose-600 dark:text-rose-400",
  },
  success: {
    card: "bg-emerald-100/70 dark:bg-emerald-900/30 ring-1 ring-emerald-200/60 dark:ring-emerald-800/60",
    value: "text-emerald-700 dark:text-emerald-200",
    deltaUp: "text-emerald-700 dark:text-emerald-300",
    deltaDown: "text-rose-600 dark:text-rose-400",
  },
  warning: {
    card: "bg-amber-100/70 dark:bg-amber-900/30 ring-1 ring-amber-200/60 dark:ring-amber-800/60",
    value: "text-amber-700 dark:text-amber-200",
    deltaUp: "text-emerald-600 dark:text-emerald-400",
    deltaDown: "text-rose-600 dark:text-rose-400",
  },
  danger: {
    card: "bg-rose-100/70 dark:bg-rose-900/30 ring-1 ring-rose-200/60 dark:ring-rose-800/60",
    value: "text-rose-700 dark:text-rose-200",
    deltaUp: "text-emerald-600 dark:text-emerald-400",
    deltaDown: "text-rose-700 dark:text-rose-300",
  },
};

const sizeMap: Record<
  Size,
  { pad: string; label: string; value: string; caption: string; icon: string }
> = {
  sm: {
    pad: "p-3",
    label: "text-xs",
    value: "text-xl",
    caption: "text-[11px]",
    icon: "h-4 w-4",
  },
  md: {
    pad: "p-4",
    label: "text-sm",
    value: "text-2xl",
    caption: "text-xs",
    icon: "h-5 w-5",
  },
  lg: {
    pad: "p-6",
    label: "text-sm",
    value: "text-3xl",
    caption: "text-sm",
    icon: "h-6 w-6",
  },
};

function KpiCard({
  label,
  value,
  delta,
  trend = "flat",
  caption,
  icon,
  tone = "primary",
  size = "md",
  compact = false,
  className,
}: KpiCardProps) {
  const t = toneMap[tone];
  const s = sizeMap[size];

  const deltaValue =
    typeof delta === "number" ? `${delta > 0 ? "+" : ""}${delta}%` : delta;

  const isUp = trend === "up";
  const isDown = trend === "down";
  const DeltaIcon = isUp ? TrendingUp : isDown ? ChevronLeft : ChevronRight;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl shadow-sm",
        t.card,
        s.pad,
        !compact && "min-h-[92px]",
        className
      )}
    >
      <span className="pointer-events-none absolute -right-6 -top-6 inline-flex h-16 w-16 rounded-full bg-black/5 dark:bg-white/5" />
      <span className="pointer-events-none absolute -right-2 -top-2 inline-flex h-8 w-8 rounded-full bg-black/5 dark:bg-white/5" />

      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div
            className={cn(
              "font-medium text-zinc-700 dark:text-zinc-300",
              s.label
            )}
          >
            {label}
          </div>
          <div className={cn("font-semibold tracking-tight", t.value, s.value)}>
            {typeof value === "number" ? value.toLocaleString() : value}
          </div>
          {caption ? (
            <div className={cn("text-zinc-500 dark:text-zinc-400", s.caption)}>
              {caption}
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          {typeof deltaValue !== "undefined" && (
            <div
              className={cn(
                "flex items-center gap-1 text-sm font-medium",
                isUp
                  ? t.deltaUp
                  : isDown
                    ? t.deltaDown
                    : "text-zinc-500 dark:text-zinc-400"
              )}
            >
              <DeltaIcon className="h-4 w-4" aria-hidden />
              {deltaValue}
            </div>
          )}
          {icon ? (
            <div
              className={cn(
                "rounded-full bg-white/40 p-1 dark:bg-white/10",
                s.icon
              )}
            >
              {icon}
            </div>
          ) : null}
        </div>
      </div>

      <div className="bg-current/40 mt-3 h-0.5 w-16 rounded opacity-60" />
    </div>
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
      altLeft = "Before",
      altRight = "After",
      initialPosition = 50,
      ...props
    },
    ref
  ) => {
    const [sliderPosition, setSliderPosition] = React.useState(initialPosition);
    const [isDragging, setIsDragging] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

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

    React.useEffect(() => {
      if (isDragging) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("touchmove", handleTouchMove);
        document.addEventListener("mouseup", handleInteractionEnd);
        document.addEventListener("touchend", handleInteractionEnd);
        document.body.style.cursor = "ew-resize";
      } else {
        document.body.style.cursor = "";
      }

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("mouseup", handleInteractionEnd);
        document.removeEventListener("touchend", handleInteractionEnd);
        document.body.style.cursor = "";
      };
    }, [isDragging]);

    return (
      <div
        ref={containerRef}
        className={cn(
          "relative w-full h-full overflow-hidden select-none group",
          className
        )}
        onMouseDown={handleInteractionStart}
        onTouchStart={handleInteractionStart}
        {...props}
      >
        <img
          src={rightImage}
          alt={altRight}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          draggable={false}
        />

        <div
          className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
          style={{
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
          }}
        >
          <img
            src={leftImage}
            alt={altLeft}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        <div
          className="absolute top-0 h-full w-1 cursor-ew-resize"
          style={{ left: `calc(${sliderPosition}% - 2px)` }}
        >
          <div className="absolute inset-y-0 w-1 bg-background/50 backdrop-blur-sm"></div>

          <div
            className={cn(
              "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-12 w-12 flex items-center justify-center rounded-full bg-background/50 text-foreground shadow-xl backdrop-blur-md",
              "transition-all duration-300 ease-in-out",
              "group-hover:scale-105",
              isDragging && "scale-105 shadow-2xl shadow-primary/50"
            )}
          >
            <div className="flex items-center text-primary">
              <ChevronLeft className="h-5 w-5 drop-shadow-md" />
              <ChevronRight className="h-5 w-5 drop-shadow-md" />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ImageComparisonSlider.displayName = "ImageComparisonSlider";

interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar: string;
  location?: string;
}

interface Testimonial {
  author: TestimonialAuthor;
  text: string;
  beforeImage: string;
  afterImage: string;
  savingsAmount?: string;
  installationDate?: string;
}

interface SolarTestimonialCarouselProps {
  testimonials?: Testimonial[];
  kpis?: Array<{
    label: string;
    value: string | number;
    delta?: number;
    trend?: Trend;
    icon?: React.ReactNode;
    tone?: Tone;
  }>;
  autoplay?: boolean;
  className?: string;
}

function SolarTestimonialCarousel({
  testimonials = [],
  kpis = [],
  autoplay = true,
  className,
}: SolarTestimonialCarouselProps) {
  const [active, setActive] = React.useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  React.useEffect(() => {
    if (autoplay && testimonials.length > 0) {
      const interval = setInterval(handleNext, 7000);
      return () => clearInterval(interval);
    }
  }, [autoplay, testimonials.length]);

  if (testimonials.length === 0) return null;

  return (
    <section className={cn("bg-background py-12 sm:py-24 px-4", className)}>
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Real Results from Real Customers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how solar energy has transformed homes and saved thousands in energy costs
          </p>
        </div>

        {kpis.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {kpis.map((kpi, idx) => (
              <KpiCard
                key={idx}
                label={kpi.label}
                value={kpi.value}
                delta={kpi.delta}
                trend={kpi.trend}
                icon={kpi.icon}
                tone={kpi.tone}
                size="sm"
              />
            ))}
          </div>
        )}

        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              key={`image-${active}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-border">
                <ImageComparisonSlider
                  leftImage={testimonials[active].beforeImage}
                  rightImage={testimonials[active].afterImage}
                  altLeft="Before solar installation"
                  altRight="After solar installation"
                  initialPosition={50}
                />
              </div>
              
              <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium border border-border">
                Before
              </div>
              <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-primary-foreground">
                After
              </div>
            </motion.div>

            <div className="flex flex-col justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16 border-2 border-primary">
                      <AvatarImage
                        src={testimonials[active].author.avatar}
                        alt={testimonials[active].author.name}
                      />
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        {testimonials[active].author.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {testimonials[active].author.location || testimonials[active].author.handle}
                      </p>
                    </div>
                  </div>

                  <blockquote className="text-lg text-foreground leading-relaxed">
                    <motion.p>
                      {testimonials[active].text.split(" ").map((word, index) => (
                        <motion.span
                          key={index}
                          initial={{ filter: "blur(10px)", opacity: 0 }}
                          animate={{ filter: "blur(0px)", opacity: 1 }}
                          transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                            delay: 0.02 * index,
                          }}
                          className="inline-block"
                        >
                          {word}&nbsp;
                        </motion.span>
                      ))}
                    </motion.p>
                  </blockquote>

                  {(testimonials[active].savingsAmount || testimonials[active].installationDate) && (
                    <div className="flex flex-wrap gap-4 pt-4">
                      {testimonials[active].savingsAmount && (
                        <div className="flex items-center gap-2 bg-success/10 px-4 py-2 rounded-lg">
                          <DollarSign className="h-5 w-5 text-success" />
                          <div>
                            <div className="text-sm text-muted-foreground">Annual Savings</div>
                            <div className="font-bold text-success">
                              {testimonials[active].savingsAmount}
                            </div>
                          </div>
                        </div>
                      )}
                      {testimonials[active].installationDate && (
                        <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-lg">
                          <Sun className="h-5 w-5 text-primary" />
                          <div>
                            <div className="text-sm text-muted-foreground">Installed</div>
                            <div className="font-bold text-foreground">
                              {testimonials[active].installationDate}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={handlePrev}
                  className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center group/button hover:bg-primary transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-6 w-6 text-foreground group-hover/button:text-primary-foreground transition-colors" />
                </button>
                <button
                  onClick={handleNext}
                  className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center group/button hover:bg-primary transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-6 w-6 text-foreground group-hover/button:text-primary-foreground transition-colors" />
                </button>
                
                <div className="flex items-center gap-2 ml-4">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActive(idx)}
                      className={cn(
                        "h-2 rounded-full transition-all",
                        idx === active ? "w-8 bg-primary" : "w-2 bg-muted-foreground/30"
                      )}
                      aria-label={`Go to testimonial ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SolarTestimonialCarouselDemo() {
  const testimonials: Testimonial[] = [
    {
      author: {
        name: "Sarah Johnson",
        handle: "@sarahj",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
        location: "Redding, CA",
      },
      text: "Switching to solar with Advance Power was the best decision we made for our home. The installation was seamless, and we're already seeing massive savings on our energy bills. Our home looks better and we're helping the environment!",
      beforeImage: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&h=600&fit=crop",
      savingsAmount: "$2,400/year",
      installationDate: "March 2024",
    },
    {
      author: {
        name: "Michael Chen",
        handle: "@mchen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        location: "Shasta Lake, CA",
      },
      text: "The Advance Power team was professional and efficient. They completed the installation in just two days, and the solar panels look amazing on our roof. We've reduced our carbon footprint and our monthly bills by over 80%!",
      beforeImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?w=800&h=600&fit=crop",
      savingsAmount: "$3,200/year",
      installationDate: "January 2024",
    },
    {
      author: {
        name: "Emily Rodriguez",
        handle: "@emilyrod",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
        location: "Anderson, CA",
      },
      text: "Living in Northern California, we get plenty of sunshine, and now we're putting it to good use! The solar panels have transformed our energy consumption. We're even selling excess power back to the grid. Highly recommend Advance Power!",
      beforeImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop",
      afterImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
      savingsAmount: "$2,800/year",
      installationDate: "February 2024",
    },
  ];

  const kpis = [
    {
      label: "Energy Saved",
      value: "2.5M kWh",
      delta: 24,
      trend: "up" as Trend,
      icon: <Zap className="h-4 w-4" />,
      tone: "success" as Tone,
    },
    {
      label: "CO₂ Reduced",
      value: "1,200 tons",
      delta: 18,
      trend: "up" as Trend,
      icon: <Sun className="h-4 w-4" />,
      tone: "primary" as Tone,
    },
    {
      label: "Customer Savings",
      value: "$850K",
      delta: 32,
      trend: "up" as Trend,
      icon: <DollarSign className="h-4 w-4" />,
      tone: "success" as Tone,
    },
    {
      label: "Installations",
      value: "500+",
      delta: 15,
      trend: "up" as Trend,
      icon: <TrendingUp className="h-4 w-4" />,
      tone: "primary" as Tone,
    },
  ];

  return (
    <SolarTestimonialCarousel
      testimonials={testimonials}
      kpis={kpis}
      autoplay={true}
    />
  );
}
