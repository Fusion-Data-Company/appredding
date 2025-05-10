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
    const angle = -35 + Math.random() * 10;
    // Determine if this is a fire (orange/red) or water (blue/cyan) beam
    const isFireBeam = Math.random() > 0.5;
    
    // Fire colors: more orange-red (15-30)
    // Water colors: more cyan-blue (190-210)
    const hue = isFireBeam ? 
                15 + Math.random() * 15 : 
                190 + Math.random() * 20;
    
    // Make beams larger and more visible
    return {
        x: Math.random() * width * 1.5 - width * 0.25,
        y: Math.random() * height * 1.5 - height * 0.25,
        width: 50 + Math.random() * 80, // Wider beams
        length: height * 3, // Longer beams
        angle: angle,
        speed: 0.4 + Math.random() * 0.8, // Slightly slower for better visual
        opacity: 0.2 + Math.random() * 0.25, // Higher opacity
        hue: hue,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.025, // Slightly slower pulsing
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
    const MINIMUM_BEAMS = 20;

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
            
            const column = index % 3;
            const spacing = canvas.width / 3;
            
            // Alternate fire and water beams based on column for better distribution
            const isFireBeam = index % 2 === 0;
            const hue = isFireBeam ? 
                        // Fire colors: orange/red range (15-30)
                        15 + Math.random() * 15 : 
                        // Water colors: blue/cyan range (190-210)
                        190 + Math.random() * 20;

            beam.y = canvas.height + 100;
            beam.x =
                column * spacing +
                spacing / 2 +
                (Math.random() - 0.5) * spacing * 0.5;
            beam.width = 50 + Math.random() * 80; // Keep consistent with createBeam
            beam.speed = 0.4 + Math.random() * 0.8; // Keep consistent with createBeam
            beam.hue = hue;
            beam.opacity = 0.2 + Math.random() * 0.25; // Keep consistent with createBeam
            return beam;
        }

        function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
            ctx.save();
            ctx.translate(beam.x, beam.y);
            ctx.rotate((beam.angle * Math.PI) / 180);

            // Calculate pulsing opacity with safety checks to avoid NaN
            const basePulse = 0.8 + Math.sin(beam.pulse || 0) * 0.2;
            const intensityMultiplier = opacityMap[intensity] || 1;
            const pulsingOpacity = beam.opacity * basePulse * intensityMultiplier;

            const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);
            
            // Determine if this is a fire beam based on hue value
            const isFireBeam = beam.hue < 50;
            
            // Enhanced gradient with multiple color stops and higher saturation
            // Fire beams (orange/red) have higher saturation and brightness
            // Water beams (blue/cyan) have slightly lower saturation for contrast
            if (isFireBeam) {
                // Fire beam gradient (orange/red) - increased lightness and opacity
                gradient.addColorStop(0, `hsla(${beam.hue}, 100%, 75%, 0)`);
                gradient.addColorStop(
                    0.1,
                    `hsla(${beam.hue}, 100%, 75%, ${pulsingOpacity * 0.7})`
                );
                gradient.addColorStop(
                    0.4,
                    `hsla(${beam.hue}, 100%, 75%, ${pulsingOpacity * 1.3})`
                );
                gradient.addColorStop(
                    0.6,
                    `hsla(${beam.hue}, 100%, 75%, ${pulsingOpacity * 1.3})`
                );
                gradient.addColorStop(
                    0.9,
                    `hsla(${beam.hue}, 100%, 75%, ${pulsingOpacity * 0.7})`
                );
                gradient.addColorStop(1, `hsla(${beam.hue}, 100%, 75%, 0)`);
            } else {
                // Water beam gradient (blue/cyan) - increased lightness and opacity
                gradient.addColorStop(0, `hsla(${beam.hue}, 90%, 70%, 0)`);
                gradient.addColorStop(
                    0.1,
                    `hsla(${beam.hue}, 90%, 70%, ${pulsingOpacity * 0.6})`
                );
                gradient.addColorStop(
                    0.4,
                    `hsla(${beam.hue}, 90%, 70%, ${pulsingOpacity * 1.2})`
                );
                gradient.addColorStop(
                    0.6,
                    `hsla(${beam.hue}, 90%, 70%, ${pulsingOpacity * 1.2})`
                );
                gradient.addColorStop(
                    0.9,
                    `hsla(${beam.hue}, 90%, 70%, ${pulsingOpacity * 0.6})`
                );
                gradient.addColorStop(1, `hsla(${beam.hue}, 90%, 70%, 0)`);
            }

            ctx.fillStyle = gradient;
            ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
            ctx.restore();
        }

        function animate() {
            if (!canvas || !ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.filter = "blur(35px)";

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
                style={{ filter: "blur(15px)" }}
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
                <div className="relative w-full" style={{ zIndex: 5 }}>
                    {children}
                </div>
            )}
        </div>
    );
}