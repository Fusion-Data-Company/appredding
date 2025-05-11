"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedGradientBackgroundProps {
    className?: string;
    children?: React.ReactNode;
    intensity?: "subtle" | "medium" | "strong";
}

interface Beam {
    x: number;
    y: number;
    width: number;
    length: number;
    angle: number;
    speed: number;
    opacity: number;
    hue: number;
    pulse: number;
    pulseSpeed: number;
}

function createBeam(width: number, height: number): Beam {
    // Create dramatic circus spotlight beams
    // Determine if this is a fire (orange/red) or water (blue/cyan) beam
    const isFireBeam = Math.random() > 0.5;
    
    // Fire colors: vibrant orange-red (15-40)
    // Water colors: vibrant cyan-blue (190-220)
    const hue = isFireBeam ? 
                15 + Math.random() * 25 : 
                190 + Math.random() * 30;
    
    // Setup for dramatic circus-style spotlights
    const angle = isFireBeam ? 
                -40 + Math.random() * 15 : // Fire beams coming from left-ish
                -30 + Math.random() * 15;  // Water beams coming from right-ish
    
    return {
        // More focused and intentional positioning
        x: (Math.random() * width * 0.8) + width * 0.1, // More constrained to center area
        y: height * 1.1, // Start from below the screen
        width: 80 + Math.random() * 150, // Much wider beams for spotlight effect
        length: height * 4, // Longer beams to ensure they cross the entire screen
        angle: angle,
        speed: 0.2 + Math.random() * 0.4, // Slower for more dramatic effect
        opacity: 0.35 + Math.random() * 0.3, // Higher opacity for more visibility
        hue: hue,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02, // Subtle pulsing
    };
}

export function BeamsBackground({
    className,
    intensity = "strong",
    children
}: AnimatedGradientBackgroundProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const beamsRef = useRef<Beam[]>([]);
    const animationFrameRef = useRef<number>(0);
    // Increased number of beams for more intense spotlight effect
    const MINIMUM_BEAMS = 30;

    const opacityMap = {
        subtle: 0.7,
        medium: 0.85,
        strong: 1.25, // Increased brightness for "strong" intensity
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const updateCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);

            const totalBeams = MINIMUM_BEAMS * 1.5;
            beamsRef.current = Array.from({ length: totalBeams }, () =>
                createBeam(canvas.width, canvas.height)
            );
        };

        updateCanvasSize();
        window.addEventListener("resize", updateCanvasSize);

        function resetBeam(beam: Beam, index: number, totalBeams: number) {
            if (!canvas) return beam;
            
            // Create more focused spotlights by having defined positions
            // Use 5 possible spotlight positions across the screen
            const spotCount = 5;
            const spotPosition = index % spotCount;
            const spotWidth = canvas.width / spotCount;
            
            // Determine if this is a fire beam or water beam
            // Fire beams will come from left-ish, water beams from right-ish
            const isFireBeam = index % 2 === 0;
            
            // Enhanced, more vibrant colors
            const hue = isFireBeam ? 
                        // Fire colors: vibrant orange-red range (15-40)
                        15 + Math.random() * 25 : 
                        // Water colors: vibrant cyan-blue range (190-220)
                        190 + Math.random() * 30;
            
            // Set angle based on beam type - creates crossing pattern
            const angle = isFireBeam ? 
                        -40 + Math.random() * 15 : // Fire beams from left
                        -30 + Math.random() * 15;  // Water beams from right

            // Position the beam
            beam.y = canvas.height * 1.1; // Start from below screen
            beam.x = spotPosition * spotWidth + (spotWidth/2) + (Math.random() - 0.5) * spotWidth * 0.5;
            
            // Make the beams much wider and more dramatic (spotlight effect)
            beam.width = 80 + Math.random() * 150; 
            beam.angle = angle;
            beam.speed = 0.2 + Math.random() * 0.4; // Slower for more dramatic effect
            beam.hue = hue;
            beam.opacity = 0.35 + Math.random() * 0.3; // Higher opacity for more visibility
            
            return beam;
        }

        function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
            ctx.save();
            ctx.translate(beam.x, beam.y);
            ctx.rotate((beam.angle * Math.PI) / 180);

            // More dramatic pulsing effect - circus spotlights have more dramatic light changes
            const basePulse = 0.7 + Math.sin(beam.pulse || 0) * 0.3; // More dramatic pulsing
            const intensityMultiplier = opacityMap[intensity] || 1;
            const pulsingOpacity = beam.opacity * basePulse * intensityMultiplier * 1.2; // Increase overall brightness

            // Create a spotlight cone effect with gradient
            const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
            
            // Determine if this is a fire beam based on hue value
            const isFireBeam = beam.hue < 50;
            
            // Create more dramatic circus-style spotlights with higher brightnesses and more contrast
            if (isFireBeam) {
                // Fire beam gradient (dramatic orange/red spotlight)
                // Increased saturation and brightness for more "pop"
                gradient.addColorStop(0, `hsla(${beam.hue}, 100%, 80%, 0)`); // Invisible at start
                
                // Create a spotlight cone effect - narrower at top, wider at bottom
                gradient.addColorStop(0.05, `hsla(${beam.hue}, 100%, 80%, ${pulsingOpacity * 0.8})`); // Quick fade in
                gradient.addColorStop(0.2, `hsla(${beam.hue}, 100%, 80%, ${pulsingOpacity * 1.5})`); // Very bright center
                gradient.addColorStop(0.5, `hsla(${beam.hue}, 100%, 70%, ${pulsingOpacity * 1.2})`); // Still bright but fading
                gradient.addColorStop(0.8, `hsla(${beam.hue}, 100%, 65%, ${pulsingOpacity * 0.8})`); // Fading further
                gradient.addColorStop(0.95, `hsla(${beam.hue}, 100%, 60%, ${pulsingOpacity * 0.4})`); // Almost faded
                gradient.addColorStop(1, `hsla(${beam.hue}, 100%, 60%, 0)`); // Invisible at end
            } else {
                // Water beam gradient (dramatic blue/cyan spotlight)
                // Higher saturation for better contrast with fire
                gradient.addColorStop(0, `hsla(${beam.hue}, 100%, 75%, 0)`); // Invisible at start
                
                // Similar cone effect for water beams
                gradient.addColorStop(0.05, `hsla(${beam.hue}, 100%, 75%, ${pulsingOpacity * 0.8})`); // Quick fade in
                gradient.addColorStop(0.2, `hsla(${beam.hue}, 100%, 75%, ${pulsingOpacity * 1.5})`); // Very bright center
                gradient.addColorStop(0.5, `hsla(${beam.hue}, 100%, 70%, ${pulsingOpacity * 1.2})`); // Still bright but fading
                gradient.addColorStop(0.8, `hsla(${beam.hue}, 100%, 65%, ${pulsingOpacity * 0.8})`); // Fading further
                gradient.addColorStop(0.95, `hsla(${beam.hue}, 100%, 60%, ${pulsingOpacity * 0.4})`); // Almost faded
                gradient.addColorStop(1, `hsla(${beam.hue}, 100%, 60%, 0)`); // Invisible at end
            }

            // Draw the spotlight beam with a slightly wider base to create a cone effect
            const startWidth = beam.width * 0.6; // Narrower at top
            const endWidth = beam.width;         // Wider at bottom
            
            // Draw a trapezoid shape to better represent spotlight cone
            ctx.beginPath();
            ctx.moveTo(-startWidth / 2, 0);
            ctx.lineTo(startWidth / 2, 0);
            ctx.lineTo(endWidth / 2, beam.length);
            ctx.lineTo(-endWidth / 2, beam.length);
            ctx.closePath();
            
            ctx.fillStyle = gradient;
            ctx.fill();
            
            ctx.restore();
        }

        function animate() {
            if (!canvas || !ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Increased blur for more dramatic circus spotlight effect
            ctx.filter = "blur(60px)";

            const totalBeams = beamsRef.current.length;
            beamsRef.current.forEach((beam, index) => {
                beam.y -= beam.speed;
                beam.pulse += beam.pulseSpeed;

                // Reset beam when it goes off screen
                if (beam.y + beam.length < -100) {
                    resetBeam(beam, index, totalBeams);
                }

                drawBeam(ctx, beam);
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        }

        animate();

        return () => {
            window.removeEventListener("resize", updateCanvasSize);
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [intensity]);

    return (
        <div
            className={cn(
                "relative w-full overflow-hidden bg-black",
                className
            )}
        >
            {/* Dark background gradient with subtle fire-water color hints */}
            <div 
                className="absolute inset-0 bg-gradient-to-b from-black via-black to-black"
                style={{
                    background: "radial-gradient(circle at 75% 10%, rgba(255, 69, 0, 0.07) 0%, rgba(0, 0, 0, 0) 40%), radial-gradient(circle at 25% 90%, rgba(0, 153, 255, 0.07) 0%, rgba(0, 0, 0, 0) 40%), black"
                }}
            />
            
            <canvas
                ref={canvasRef}
                className="absolute inset-0"
                style={{ 
                  filter: "blur(35px) saturate(1.5)", 
                  mixBlendMode: "soft-light" 
                }}
            />

            <motion.div
                className="absolute inset-0 bg-black/20"
                animate={{
                    opacity: [0.2, 0.3, 0.2],
                }}
                transition={{
                    duration: 10,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                }}
                style={{
                    backdropFilter: "blur(15px)",
                }}
            />

            {children && (
                <div className="relative z-1 w-full">
                    {children}
                </div>
            )}
        </div>
    );
}