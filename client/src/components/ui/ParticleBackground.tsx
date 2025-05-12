import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ParticleBackgroundProps {
  quantity?: number;
  minSize?: number;
  maxSize?: number;
  minSpeed?: number;
  maxSpeed?: number;
  color?: string;
  className?: string;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  quantity = 50,
  minSize = 1,
  maxSize = 3,
  minSpeed = 0.1,
  maxSpeed = 0.3,
  color = "#ffffff",
  className
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
    }> = [];
    
    const resizeCanvas = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      
      // Re-initialize particles when canvas size changes
      initParticles();
    };
    
    const initParticles = () => {
      particles = [];
      for (let i = 0; i < quantity; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: minSize + Math.random() * (maxSize - minSize),
          speedX: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed,
          speedY: (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed
        });
      }
    };
    
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = color;
      ctx.globalAlpha = 0.7;
      
      particles.forEach((particle) => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY;
        }
      });
      
      animationFrameId = requestAnimationFrame(drawParticles);
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    drawParticles();
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [quantity, minSize, maxSize, minSpeed, maxSpeed, color]);
  
  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 z-0", className)}
    />
  );
};

export default ParticleBackground;