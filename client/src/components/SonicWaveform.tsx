import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Battery, Zap, Activity } from 'lucide-react';

// Sonic Waveform Canvas Component - customized for battery energy visualization
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

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const draw = () => {
            // Dark background with fade trail effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const lineCount = 60; // More lines for denser effect
            const segmentCount = 80; // More segments for smoother waves
            const height = canvas.height / 2;

            for (let i = 0; i < lineCount; i++) {
                ctx.beginPath();
                const progress = i / lineCount;
                const colorIntensity = Math.sin(progress * Math.PI);

                // Burnt orange gradient
                ctx.strokeStyle = `rgba(204, 85, 0, ${colorIntensity * 0.7})`;
                ctx.lineWidth = 1.5;

                for (let j = 0; j < segmentCount + 1; j++) {
                    const x = (j / segmentCount) * canvas.width;

                    // Mouse influence
                    const distToMouse = Math.hypot(x - mouse.x, height - mouse.y);
                    const mouseEffect = Math.max(0, 1 - distToMouse / 400);

                    // More complex wave calculation for dramatic effect
                    const noise = Math.sin(j * 0.1 + time + i * 0.2) * 20;
                    const spike = Math.cos(j * 0.2 + time + i * 0.1) * Math.sin(j * 0.05 + time) * 50;
                    const y = height + noise + spike * (1 + mouseEffect * 2);

                    if (j === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.stroke();
            }

            time += 0.02; // Standard animation speed
            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = event.clientX;
            mouse.y = event.clientY;
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);

        resizeCanvas();
        draw();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full bg-gradient-to-b from-white via-gray-50 to-gray-100" />;
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

    return (
        <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            <SonicWaveformCanvas />

            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10"></div>

            {/* Overlay Content - Battery Theme */}
            <div className="relative z-20 text-center p-6 max-w-6xl mx-auto">
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
                    className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-green-500"
                >
                    Next-Generation Energy Storage
                </motion.h1>

                <motion.p
                    custom={2}
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-3xl mx-auto text-lg text-gray-600 mb-10"
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
                    <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        Explore Battery Solutions
                        <ArrowRight className="h-5 w-5" />
                    </button>
                    <button className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 font-semibold rounded-xl shadow-lg hover:shadow-xl border border-gray-200 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2">
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
                    className="mt-12 grid grid-cols-3 gap-6 max-w-2xl mx-auto"
                >
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
                        <div className="text-3xl font-bold text-blue-600">12,000+</div>
                        <div className="text-sm text-gray-600">Cycle Life</div>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
                        <div className="text-3xl font-bold text-green-600">95%</div>
                        <div className="text-sm text-gray-600">Efficiency</div>
                    </div>
                    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-gray-200">
                        <div className="text-3xl font-bold text-cyan-600">10 Year</div>
                        <div className="text-sm text-gray-600">Warranty</div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SonicWaveformHero;