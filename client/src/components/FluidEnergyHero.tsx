import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Zap, Sun, Leaf } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function FluidGradientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      hue: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Create initial particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: Math.random() * 100,
        hue: Math.random() * 60 + 90, // Green-blue range
      });
    }

    const animate = () => {
      time += 0.01;
      
      // Fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw fluid gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2 + Math.sin(time) * 100,
        canvas.height / 2 + Math.cos(time) * 100,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height)
      );
      
      gradient.addColorStop(0, `hsla(${120 + Math.sin(time) * 30}, 70%, 40%, 0.1)`);
      gradient.addColorStop(0.5, `hsla(${150 + Math.cos(time * 0.7) * 30}, 60%, 30%, 0.05)`);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        // Mouse interaction
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 150) {
          const force = (150 - dist) / 150;
          p.vx += (dx / dist) * force * 0.5;
          p.vy += (dy / dist) * force * 0.5;
        }

        // Boundary check
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height || p.life > 200) {
          particles[index] = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 0,
            hue: Math.random() * 60 + 90,
          };
        }

        // Draw particle glow
        const alpha = 1 - (p.life / 200);
        ctx.beginPath();
        const particleGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 30);
        particleGradient.addColorStop(0, `hsla(${p.hue}, 80%, 60%, ${alpha * 0.6})`);
        particleGradient.addColorStop(1, `hsla(${p.hue}, 80%, 60%, 0)`);
        ctx.fillStyle = particleGradient;
        ctx.arc(p.x, p.y, 30, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0" />;
}

export default function FluidEnergyHero() {
  return (
    <section className="relative flex h-screen min-h-[700px] w-full items-center justify-center overflow-hidden bg-black">
      <FluidGradientCanvas />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

      <motion.div
        className="relative z-10 flex max-w-6xl flex-col items-center justify-center px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/20 backdrop-blur-md border border-green-500/30 mb-8"
          variants={itemVariants}
          data-testid="badge-powered-by"
        >
          <Leaf className="w-4 h-4 text-green-400" />
          <span className="text-sm font-medium text-green-100">Professional Energy Efficiency Solutions</span>
        </motion.div>

        <motion.h1
          className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl mb-6"
          variants={itemVariants}
          data-testid="hero-title"
        >
          Harness the Power of
          <br />
          <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-green-400 bg-clip-text text-transparent">
            Energy Conservation
          </span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-3xl text-lg leading-8 text-gray-200 md:text-xl lg:text-2xl"
          variants={itemVariants}
          data-testid="hero-subtitle"
        >
          Comprehensive energy conservation services to reduce your consumption by 30-50%. Our certified professionals provide energy audits, HVAC optimization, and smart home integration for maximum efficiency.
        </motion.p>

        <motion.div 
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
          variants={itemVariants}
        >
          <Button 
            size="lg"
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-2xl shadow-green-500/50 transition-all duration-300 hover:scale-105"
            data-testid="button-get-started"
          >
            <Sun className="w-5 h-5 mr-2" />
            Get Started
          </Button>
          <Button 
            size="lg"
            variant="outline"
            className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
            data-testid="button-learn-more"
          >
            <Zap className="w-5 h-5 mr-2" />
            Learn More
          </Button>
        </motion.div>

        <motion.div 
          className="mt-16 flex items-center gap-12 text-white"
          variants={itemVariants}
        >
          <div className="text-center" data-testid="stat-savings">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">30-50%</div>
            <div className="text-sm text-gray-300 mt-1">Energy Savings</div>
          </div>
          <div className="w-px h-12 bg-white/20"></div>
          <div className="text-center" data-testid="stat-certified">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">BPI</div>
            <div className="text-sm text-gray-300 mt-1">Certified</div>
          </div>
          <div className="w-px h-12 bg-white/20"></div>
          <div className="text-center" data-testid="stat-experience">
            <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">25+</div>
            <div className="text-sm text-gray-300 mt-1">Years Experience</div>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
