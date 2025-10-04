import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Battery, Zap, Activity } from 'lucide-react';

// Sonic Waveform Canvas Component - optimized for performance
const SonicWaveformCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
        let time = 0;
        const dpr = Math.max(1, Math.min(1.5, window.devicePixelRatio || 1)); // Reduced DPR for performance
        let last = 0;
        const targetFps = 24; // Reduced from 30 to 24 for better performance
        const frameInterval = 1000 / targetFps;

        const resizeCanvas = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const draw = (now: number) => {
            if (now - last < frameInterval) {
                animationFrameId = requestAnimationFrame(draw);
                return;
            }
            last = now;
            
            // Use clearRect instead of full clear for better performance
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const lineCount = 32; // Reduced from 48 for performance
            const segmentCount = 48; // Reduced from 72 for performance
            const height = canvas.height / 2;

            for (let i = 0; i < lineCount; i++) {
                ctx.beginPath();
                const progress = i / lineCount;
                const colorIntensity = Math.sin(progress * Math.PI);

                // Simplified color with reduced opacity
                ctx.strokeStyle = `rgba(204, 85, 0, ${colorIntensity * 0.5})`;
                ctx.lineWidth = 1;

                for (let j = 0; j < segmentCount + 1; j++) {
                    const x = (j / segmentCount) * canvas.width;

                    // Reduced mouse influence calculations
                    const distToMouse = Math.hypot(x - mouse.x, height - mouse.y);
                    const mouseEffect = Math.max(0, 1 - distToMouse / 300);

                    // Simplified wave calculation
                    const noise = Math.sin(j * 0.08 + time + i * 0.15) * 15;
                    const spike = Math.cos(j * 0.15 + time) * 30;
                    const y = height + noise + spike * (1 + mouseEffect * 1.5);

                    if (j === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.stroke();
            }

            time += 0.015; // Slightly slower animation
            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);

        resizeCanvas();
        draw(0);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full pointer-events-none" style={{ background: 'transparent' }} />;
};

// The main hero component for Lithium Battery page
const SonicWaveformHero = () => {
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2 + 0.5,
                duration: 0.8,
                ease: "easeInOut",
            },
        }),
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="relative h-screen w-full flex flex-col overflow-hidden" style={{ background: 'transparent' }}>
            <SonicWaveformCanvas />

            {/* Subtle gradient to blend with content - mostly transparent */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent z-10 pointer-events-none"></div>

            {/* Overlay Content - Battery Theme */}
            <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="text-center p-6 max-w-6xl mx-auto">
                <motion.div
                    custom={0}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-cyan-500/20 mb-6 backdrop-blur-sm"
                >
                    <Battery className="h-4 w-4 text-cyan-500" />
                    <span className="text-sm font-medium text-gray-700">
                        Real-Time Energy Flow Visualization
                    </span>
                </motion.div>

                <motion.h1
                    custom={1}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white drop-shadow-[0_4px_24px_rgba(255,255,255,0.25)]"
                >
                    Next-Generation Energy Storage
                </motion.h1>

                <motion.p
                    custom={2}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-3xl mx-auto text-lg text-gray-200 mb-10"
                >
                    Experience the power of advanced lithium battery technology.
                    Watch as energy flows visualize our 12,000+ cycle life systems with 95% efficiency and unmatched safety.
                </motion.p>

                <motion.div
                    custom={3}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap gap-4 justify-center"
                >
                    <button
                        onClick={() => scrollToSection('chemistry')}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 hover:from-blue-700 hover:to-cyan-700"
                    >
                        <Zap className="h-5 w-5" />
                        Explore Battery Solutions
                        <ArrowRight className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => scrollToSection('bms')}
                        className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 font-semibold rounded-xl shadow-lg hover:shadow-xl border border-gray-200 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 hover:bg-white/90"
                    >
                        <Activity className="h-5 w-5 text-green-600" />
                        View Live Metrics
                    </button>
                </motion.div>

                {/* Energy Flow Indicators */}
                <motion.div
                    custom={4}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
                >
                    <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/20">
                        <div className="text-3xl font-bold text-white">12,000+</div>
                        <div className="text-sm text-blue-100">Cycle Life</div>
                    </div>
                    <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/20">
                        <div className="text-3xl font-bold text-white">95%</div>
                        <div className="text-sm text-blue-100">Efficiency</div>
                    </div>
                    <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 border border-white/20">
                        <div className="text-3xl font-bold text-white">10 Year</div>
                        <div className="text-sm text-blue-100">Warranty</div>
                    </div>
                </motion.div>
            </div>
            </div>
        </div>
    );
};

export default SonicWaveformHero;