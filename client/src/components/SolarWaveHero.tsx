import { useEffect, useRef, ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, animate } from "framer-motion";
import { Zap, Sun, Battery } from "lucide-react";

// ============================================================================
// SOLAR WAVE BACKGROUND COMPONENT
// ============================================================================

interface SolarWaveBackgroundProps {
  className?: string;
}

const SolarWaveBackground: React.FC<SolarWaveBackgroundProps> = ({ className = "" }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const waveData = Array.from({ length: 12 }).map(() => ({
      amplitude: Math.random() * 0.3 + 0.2,
      frequency: Math.random() * 3 + 2,
      speed: Math.random() * 0.02 + 0.01,
      offset: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      waveData.forEach((wave, index) => {
        ctx.beginPath();
        
        for (let x = 0; x < canvas.width; x += 2) {
          const normalizedX = x / canvas.width;
          const y =
            canvas.height / 2 +
            Math.sin(normalizedX * wave.frequency * Math.PI + time * wave.speed + wave.offset) *
              wave.amplitude *
              canvas.height *
              0.3;
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        const hue = 30 + index * 10;
        const saturation = 100;
        const lightness = 50 + index * 2;
        const alpha = 0.3 + (index / waveData.length) * 0.4;

        ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        ctx.lineWidth = 2 + index * 0.3;
        ctx.shadowColor = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`;
        ctx.shadowBlur = 15;
        ctx.stroke();
      });

      time += 0.5;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className={`fixed inset-0 ${className}`} />;
};

// ============================================================================
// SPARKLES COMPONENT
// ============================================================================

interface SparklesProps {
  className?: string;
  particleColor?: string;
  particleDensity?: number;
}

const Sparkles: React.FC<SparklesProps> = ({
  className = "",
  particleColor = "#FFA500",
  particleDensity = 50,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      fadeSpeed: number;
    }> = [];

    for (let i = 0; i < particleDensity; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random(),
        fadeSpeed: (Math.random() - 0.5) * 0.02,
      });
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        particle.opacity += particle.fadeSpeed;

        if (particle.opacity <= 0 || particle.opacity >= 1) {
          particle.fadeSpeed *= -1;
        }

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = Math.max(0, Math.min(1, particle.opacity));
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      animationFrameId = requestAnimationFrame(animateParticles);
    };

    animateParticles();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleColor, particleDensity]);

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} />;
};

// ============================================================================
// MAIN HERO COMPONENT
// ============================================================================

interface SolarWaveHeroProps {
  children?: ReactNode;
}

const SolarWaveHero: React.FC<SolarWaveHeroProps> = ({ children }) => {
  const color = useMotionValue("#FF6B00");

  useEffect(() => {
    animate(color, ["#FF6B00", "#FFD700", "#FF8C00", "#FFA500", "#FF6B00"], {
      ease: "easeInOut",
      duration: 8,
      repeat: Infinity,
      repeatType: "loop",
    });
  }, [color]);

  const backgroundGradient = useMotionTemplate`radial-gradient(circle at 50% 50%, ${color}15, transparent 70%)`;
  const borderGlow = useMotionTemplate`0 0 20px ${color}40`;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background Layers */}
      <SolarWaveBackground />
      <Sparkles particleColor="#FFA500" particleDensity={60} />
      
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: backgroundGradient,
        }}
      />

      {/* Badge slot - positioned absolutely with high z-index */}
      {children}

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen items-center">
        <div className="w-full px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center space-x-2 rounded-full bg-orange-500/10 backdrop-blur-sm border border-orange-500/20 px-4 py-2 mb-8">
                <Zap className="h-4 w-4 text-orange-400" />
                <span className="text-sm font-medium text-orange-300">Powering the Future</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-center mb-6 leading-tight"
            >
              <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Solar Energy
              </span>
              <br />
              <span className="text-white">
                Meets Innovation
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 text-center mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Harness the power of the sun with cutting-edge electric wave technology. 
              Transform your energy future with sustainable, intelligent solutions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ boxShadow: borderGlow }}
                className="group rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 px-8 py-4 text-lg font-semibold text-black transition-all flex items-center space-x-2"
                data-testid="button-explore-solutions"
              >
                <span>Explore Solutions</span>
                <Zap className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-full border border-white/20 bg-white/5 backdrop-blur-xl px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10 hover:border-white/30"
                data-testid="button-watch-demo"
              >
                Watch Demo
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              {[
                { icon: Sun, title: "100% Renewable", value: "Clean Energy" },
                { icon: Zap, title: "99.9% Uptime", value: "Reliable Power" },
                { icon: Battery, title: "50% Savings", value: "Cost Efficient" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6 text-center transition-all hover:bg-white/10 hover:border-orange-500/30"
                  data-testid={`stat-card-${index}`}
                >
                  <stat.icon className="h-8 w-8 text-orange-400 mx-auto mb-3" />
                  <div className="text-2xl font-bold text-white mb-1">{stat.title}</div>
                  <div className="text-sm text-white/60">{stat.value}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default SolarWaveHero;
