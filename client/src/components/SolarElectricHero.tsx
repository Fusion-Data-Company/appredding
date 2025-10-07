import { useRef, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Zap, Sun, Battery } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WaveProps {
  className?: string;
  animate?: boolean;
}

const AnimatedWave: React.FC<WaveProps> = ({ className = '', animate = true }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        fill="url(#gradient1)"
        fillOpacity="0.3"
        initial={{ d: "M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,128C960,96,1056,64,1152,69.3C1248,75,1344,117,1392,138.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" }}
        animate={animate ? {
          d: [
            "M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,128C960,96,1056,64,1152,69.3C1248,75,1344,117,1392,138.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            "M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,133.3C672,117,768,107,864,122.7C960,139,1056,181,1152,186.7C1248,192,1344,160,1392,144L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            "M0,160L48,144C96,128,192,96,288,106.7C384,117,480,171,576,181.3C672,192,768,160,864,128C960,96,1056,64,1152,69.3C1248,75,1344,117,1392,138.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ]
        } : {}}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 8,
          ease: "easeInOut"
        }}
      />
      <motion.path
        fill="url(#gradient2)"
        fillOpacity="0.2"
        initial={{ d: "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,197.3C672,192,768,160,864,154.7C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" }}
        animate={animate ? {
          d: [
            "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,197.3C672,192,768,160,864,154.7C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            "M0,192L48,197.3C96,203,192,213,288,202.7C384,192,480,160,576,154.7C672,149,768,171,864,181.3C960,192,1056,192,1152,181.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,197.3C672,192,768,160,864,154.7C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ]
        } : {}}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 10,
          ease: "easeInOut"
        }}
      />
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
    </svg>
  );
};

interface ParticleProps {
  index: number;
}

const FloatingParticle: React.FC<ParticleProps> = ({ index }) => {
  const randomX = Math.random() * 100;
  const randomY = Math.random() * 100;
  const randomDelay = Math.random() * 5;
  const randomDuration = 15 + Math.random() * 10;
  const randomSize = 2 + Math.random() * 4;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        left: `${randomX}%`,
        top: `${randomY}%`,
        width: `${randomSize}px`,
        height: `${randomSize}px`,
        background: 'linear-gradient(to right, #fbbf24, #f97316)',
        opacity: 0.2
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, -15, 0],
        opacity: [0.2, 0.5, 0.2],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: randomDelay,
        ease: "easeInOut",
      }}
    />
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div 
        className="absolute inset-0 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"
        style={{
          background: 'linear-gradient(to right, rgba(245, 158, 11, 0.2), rgba(59, 130, 246, 0.2))'
        }}
      />
      <div 
        className="relative rounded-2xl p-6 hover:border-amber-500/50 transition-all duration-300"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(229, 231, 235, 1)'
        }}
      >
        <div className="flex items-center gap-4">
          <div 
            className="p-3 rounded-xl"
            style={{
              background: 'linear-gradient(to bottom right, #f59e0b, #ea580c)',
              color: 'white'
            }}
          >
            {icon}
          </div>
          <div>
            <div 
              className="text-3xl font-bold"
              style={{
                background: 'linear-gradient(to right, #f59e0b, #ea580c)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              {value}
            </div>
            <div className="text-sm" style={{ color: '#6b7280' }}>{label}</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface Stat {
  icon: React.ReactNode;
  value: string;
  label: string;
}

interface SolarElectricHeroProps {
  children?: ReactNode;
  title1?: string;
  title2?: string;
  subtitle?: string;
  stats?: Stat[];
}

const SolarElectricHero: React.FC<SolarElectricHeroProps> = ({ 
  children,
  title1 = "Solar Energy",
  title2 = "Meets Innovation",
  subtitle = "Harness the power of the sun with cutting-edge electric wave technology. Experience sustainable energy like never before.",
  stats = [
    { icon: <Sun className="w-6 h-6" />, value: "500+", label: "Installations" },
    { icon: <Battery className="w-6 h-6" />, value: "25-Year", label: "Warranty" },
    { icon: <Zap className="w-6 h-6" />, value: "30%", label: "Avg. Savings" }
  ]
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen w-full overflow-hidden"
      style={{
        background: 'linear-gradient(to bottom, #020617, #0f172a, #020617)'
      }}
    >
      {/* Animated Background Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(217, 119, 6, 0.2), transparent)'
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at bottom right, rgba(30, 64, 175, 0.2), transparent)'
        }}
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <FloatingParticle key={i} index={i} />
        ))}
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(128, 128, 128, 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(128, 128, 128, 0.07) 1px, transparent 1px)',
          backgroundSize: '64px 64px'
        }}
      />

      {/* Animated Waves */}
      <div className="absolute bottom-0 left-0 right-0 h-64 opacity-30">
        <AnimatedWave className="absolute bottom-0 w-full h-full" />
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y: ySpring, opacity, scale }}
        className="relative z-50 flex flex-col items-center justify-center min-h-screen w-full"
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          {/* Badge Above Card */}
          <div className="flex justify-center mb-6">
            {children}
          </div>

          {/* Premium Glassmorphism Card */}
          <div className="hero-glass-card max-w-6xl mx-auto">
            {/* Shimmer Overlay */}
            <div className="hero-glass-shimmer" />
            
            {/* Textured Pattern */}
            <div className="hero-glass-texture" />
            
            {/* Corner Accents */}
            <div className="hero-glass-corners" />
            
            {/* Edge Highlights */}
            <div className="hero-glass-edge-top" />
            <div className="hero-glass-edge-bottom" />
            
            {/* Floating Particles */}
            <div className="hero-glass-particles">
              {[...Array(6)].map((_, i) => (
                <div 
                  key={i}
                  className="hero-glass-particle"
                  style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + (i % 2) * 40}%`,
                    animationDelay: `${i * 0.5}s`,
                    '--particle-x': `${Math.random() * 100 - 50}px`,
                    '--particle-y': `${-80 - Math.random() * 40}px`
                  } as React.CSSProperties}
                />
              ))}
            </div>

            {/* Card Content */}
            <div className="relative z-10">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex justify-center mb-8"
              >
                <div 
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{
                    background: 'linear-gradient(to right, rgba(245, 158, 11, 0.15), rgba(59, 130, 246, 0.15))',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    backdropFilter: 'blur(4px)'
                  }}
                >
                  <Zap className="w-4 h-4" style={{ color: '#f59e0b' }} />
                  <span className="text-sm font-medium" style={{ color: '#ffffff' }}>Powering the Future</span>
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-center mb-6 relative z-[9999]"
              >
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight relative z-[9999]">
                  <span 
                    className="block relative z-[9999]"
                    style={{
                      color: 'white',
                      background: 'linear-gradient(to right, #fbbf24, #f97316, #fbbf24)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      position: 'relative',
                      zIndex: 9999,
                      filter: 'drop-shadow(0 0 40px rgba(255, 255, 255, 1)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.9)) drop-shadow(0 2px 6px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 60px rgba(251, 191, 36, 0.5))'
                    }}
                  >
                    {title1}
                  </span>
                  <span 
                    className="block mt-2 relative z-[9999]"
                    style={{
                      color: 'white',
                      background: 'linear-gradient(to right, #60a5fa, #06b6d4, #60a5fa)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      position: 'relative',
                      zIndex: 9999,
                      filter: 'drop-shadow(0 0 40px rgba(255, 255, 255, 1)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.9)) drop-shadow(0 2px 6px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 60px rgba(96, 165, 250, 0.5))'
                    }}
                  >
                    {title2}
                  </span>
                </h1>
              </motion.div>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-center text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-12 relative z-[9999]"
                style={{ 
                  color: '#ffffff', 
                  position: 'relative', 
                  zIndex: 9999,
                  textShadow: '0 0 40px rgba(255, 255, 255, 1), 0 2px 6px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)',
                  filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.8)) drop-shadow(0 2px 4px rgba(255, 255, 255, 0.6))'
                }}
              >
                {subtitle}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-[9999]"
                style={{ position: 'relative', zIndex: 9999 }}
              >
            <Button 
              size="lg" 
              className="group relative overflow-hidden border-0 px-8 py-6 text-lg rounded-full"
              style={{
                background: 'linear-gradient(to right, #f59e0b, #ea580c)',
                color: 'white',
                boxShadow: '0 20px 25px -5px rgba(245, 158, 11, 0.5), 0 10px 10px -5px rgba(245, 158, 11, 0.04)'
              }}
              data-testid="button-get-started"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: 'linear-gradient(to right, #ea580c, #f59e0b)'
                }}
              />
            </Button>
            <Button 
              size="lg" 
              onClick={() => window.location.href = '/products'}
              className="px-8 py-6 text-lg rounded-full transition-all"
              style={{
                border: '2px solid #374151',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(4px)',
                color: '#f3f4f6'
              }}
              data-testid="button-learn-more"
            >
              Learn More
            </Button>
              </motion.div>

              {/* Stats Grid - Now Inside Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 relative z-10"
              >
                {stats.map((stat, idx) => (
                  <StatCard
                    key={idx}
                    icon={stat.icon}
                    value={stat.value}
                    label={stat.label}
                    delay={0.8 + idx * 0.2}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Glow */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 blur-3xl"
        style={{
          background: 'linear-gradient(to top, rgba(245, 158, 11, 0.2), rgba(249, 115, 22, 0.1), transparent)'
        }}
      />
    </div>
  );
};

export default SolarElectricHero;
