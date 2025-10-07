"use client";

import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { createNoise2D } from 'simplex-noise'
import { motion } from 'framer-motion'
import { Zap, Sun, Battery, Wrench, AlertTriangle, Shield } from 'lucide-react'
import { AwardBadge } from '@/components/ui/award-badge'

interface Point {
    x: number
    y: number
    wave: { x: number; y: number }
    cursor: {
        x: number
        y: number
        vx: number
        vy: number
    }
}

interface WavesProps {
    className?: string
    strokeColor?: string
    backgroundColor?: string
    pointerSize?: number
}

function Waves({
    className = "",
    strokeColor = "#FFD700",
    backgroundColor = "#000000",
    pointerSize = 0.5
}: WavesProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const svgRef = useRef<SVGSVGElement>(null)
    const mouseRef = useRef({
        x: -10,
        y: 0,
        lx: 0,
        ly: 0,
        sx: 0,
        sy: 0,
        v: 0,
        vs: 0,
        a: 0,
        set: false,
    })
    const pathsRef = useRef<SVGPathElement[]>([])
    const linesRef = useRef<Point[][]>([])
    const noiseRef = useRef<((x: number, y: number) => number) | null>(null)
    const rafRef = useRef<number | null>(null)
    const boundingRef = useRef<DOMRect | null>(null)

    useEffect(() => {
        if (!containerRef.current || !svgRef.current) return

        noiseRef.current = createNoise2D()
        setSize()
        setLines()

        window.addEventListener('resize', onResize, { passive: true })
        window.addEventListener('mousemove', onMouseMove, { passive: true })
        containerRef.current.addEventListener('touchmove', onTouchMove, { passive: true })

        rafRef.current = requestAnimationFrame(tick)

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            window.removeEventListener('resize', onResize)
            window.removeEventListener('mousemove', onMouseMove)
            containerRef.current?.removeEventListener('touchmove', onTouchMove)
        }
    }, [])

    const setSize = () => {
        if (!containerRef.current || !svgRef.current) return
        boundingRef.current = containerRef.current.getBoundingClientRect()
        const { width, height } = boundingRef.current
        svgRef.current.style.width = `${width}px`
        svgRef.current.style.height = `${height}px`
    }

    const setLines = () => {
        if (!svgRef.current || !boundingRef.current) return

        const { width, height } = boundingRef.current
        linesRef.current = []

        pathsRef.current.forEach(path => {
            path.remove()
        })
        pathsRef.current = []

        const xGap = 8
        const yGap = 8

        const oWidth = width + 200
        const oHeight = height + 30

        const totalLines = Math.ceil(oWidth / xGap)
        const totalPoints = Math.ceil(oHeight / yGap)

        const xStart = (width - xGap * totalLines) / 2
        const yStart = (height - yGap * totalPoints) / 2

        for (let i = 0; i < totalLines; i++) {
            const points: Point[] = []

            for (let j = 0; j < totalPoints; j++) {
                const point: Point = {
                    x: xStart + xGap * i,
                    y: yStart + yGap * j,
                    wave: { x: 0, y: 0 },
                    cursor: { x: 0, y: 0, vx: 0, vy: 0 },
                }
                points.push(point)
            }

            const path = document.createElementNS(
                'http://www.w3.org/2000/svg',
                'path'
            )
            path.setAttribute('fill', 'none')
            path.setAttribute('stroke', strokeColor)
            path.setAttribute('stroke-width', '1')

            svgRef.current.appendChild(path)
            pathsRef.current.push(path)
            linesRef.current.push(points)
        }
    }

    const onResize = () => {
        setSize()
        setLines()
    }

    const onMouseMove = (e: MouseEvent) => {
        updateMousePosition(e.pageX, e.pageY)
    }

    const onTouchMove = (e: TouchEvent) => {
        e.preventDefault()
        const touch = e.touches[0]
        updateMousePosition(touch.clientX, touch.clientY)
    }

    const updateMousePosition = (x: number, y: number) => {
        if (!boundingRef.current) return

        const mouse = mouseRef.current
        mouse.x = x - boundingRef.current.left
        mouse.y = y - boundingRef.current.top + window.scrollY

        if (!mouse.set) {
            mouse.sx = mouse.x
            mouse.sy = mouse.y
            mouse.lx = mouse.x
            mouse.ly = mouse.y
            mouse.set = true
        }

        if (containerRef.current) {
            containerRef.current.style.setProperty('--x', `${mouse.sx}px`)
            containerRef.current.style.setProperty('--y', `${mouse.sy}px`)
        }
    }

    const movePoints = (time: number) => {
        const { current: lines } = linesRef
        const { current: mouse } = mouseRef
        const { current: noise } = noiseRef

        if (!noise) return

        lines.forEach((points) => {
            points.forEach((p: Point) => {
                const move = noise(
                    (p.x + time * 0.008) * 0.003,
                    (p.y + time * 0.003) * 0.002
                ) * 8

                p.wave.x = Math.cos(move) * 12
                p.wave.y = Math.sin(move) * 6

                const dx = p.x - mouse.sx
                const dy = p.y - mouse.sy
                const d = Math.hypot(dx, dy)
                const l = Math.max(175, mouse.vs)

                if (d < l) {
                    const s = 1 - d / l
                    const f = Math.cos(d * 0.001) * s

                    p.cursor.vx += Math.cos(mouse.a) * f * l * mouse.vs * 0.00035
                    p.cursor.vy += Math.sin(mouse.a) * f * l * mouse.vs * 0.00035
                }

                p.cursor.vx += (0 - p.cursor.x) * 0.01
                p.cursor.vy += (0 - p.cursor.y) * 0.01

                p.cursor.vx *= 0.95
                p.cursor.vy *= 0.95

                p.cursor.x += p.cursor.vx
                p.cursor.y += p.cursor.vy

                p.cursor.x = Math.min(50, Math.max(-50, p.cursor.x))
                p.cursor.y = Math.min(50, Math.max(-50, p.cursor.y))
            })
        })
    }

    const moved = (point: Point, withCursorForce = true) => {
        const coords = {
            x: point.x + point.wave.x + (withCursorForce ? point.cursor.x : 0),
            y: point.y + point.wave.y + (withCursorForce ? point.cursor.y : 0),
        }
        return coords
    }

    const drawLines = () => {
        const { current: lines } = linesRef
        const { current: paths } = pathsRef

        lines.forEach((points, lIndex) => {
            if (points.length < 2 || !paths[lIndex]) return;

            const firstPoint = moved(points[0], false)
            let d = `M ${firstPoint.x} ${firstPoint.y}`

            for (let i = 1; i < points.length; i++) {
                const current = moved(points[i])
                d += `L ${current.x} ${current.y}`
            }

            paths[lIndex].setAttribute('d', d)
        })
    }

    const tick = (time: number) => {
        const { current: mouse } = mouseRef

        mouse.sx += (mouse.x - mouse.sx) * 0.1
        mouse.sy += (mouse.y - mouse.sy) * 0.1

        const dx = mouse.x - mouse.lx
        const dy = mouse.y - mouse.ly
        const d = Math.hypot(dx, dy)

        mouse.v = d
        mouse.vs += (d - mouse.vs) * 0.1
        mouse.vs = Math.min(100, mouse.vs)

        mouse.lx = mouse.x
        mouse.ly = mouse.y

        mouse.a = Math.atan2(dy, dx)

        if (containerRef.current) {
            containerRef.current.style.setProperty('--x', `${mouse.sx}px`)
            containerRef.current.style.setProperty('--y', `${mouse.sy}px`)
        }

        movePoints(time)
        drawLines()

        rafRef.current = requestAnimationFrame(tick)
    }

    return (
        <div
            ref={containerRef}
            className={`waves-component relative overflow-hidden ${className}`}
            style={{
                backgroundColor,
                position: 'absolute',
                top: 0,
                left: 0,
                margin: 0,
                padding: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                '--x': '-0.5rem',
                '--y': '50%',
            } as React.CSSProperties}
        >
            <svg
                ref={svgRef}
                className="block w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
            />
            <div
                className="pointer-dot"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: `${pointerSize}rem`,
                    height: `${pointerSize}rem`,
                    background: strokeColor,
                    borderRadius: '50%',
                    transform: 'translate3d(calc(var(--x) - 50%), calc(var(--y) - 50%), 0)',
                    willChange: 'transform',
                }}
            />
        </div>
    )
}

interface RepairsWaveHeroProps {
  tagline?: string;
  title?: string;
  subtitle?: string;
  stats?: Array<{
    value: string;
    label: string;
  }>;
}

const RepairsWaveHero: React.FC<RepairsWaveHeroProps> = ({
  tagline = "Emergency Solar & Electric Repair Services",
  title = "Solar System Repairs",
  subtitle = "Expert repair services for all solar and electrical systems. Our certified technicians provide fast, reliable solutions to get your system back online quickly.",
  stats = [
    { value: "24hr", label: "Response Time" },
    { value: "47", label: "Years Experience" },
    { value: "95%", label: "Success Rate" },
  ]
}) => {
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        let ticking = false
        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    setScrollY(window.scrollY)
                    ticking = false
                })
                ticking = true
            }
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className="hero-section relative min-h-screen w-full bg-black overflow-hidden" style={{ position: 'relative', zIndex: 1 }}>
            {/* Wave Background */}
            <div className="absolute inset-0 z-0">
                <Waves
                    strokeColor="#FFD700"
                    backgroundColor="#000000"
                    pointerSize={0.8}
                />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-black/20 to-black/80 pointer-events-none" />

            {/* Content */}
            <div className="relative z-[2] min-h-screen flex flex-col">
                {/* Hero Content */}
                <div className="flex-1 flex items-start justify-center px-4 pt-24 md:pt-32 pb-16">
                    <div className="container mx-auto max-w-6xl">
                        {/* Award Badge Centered Above Card */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex justify-center mb-6"
                        >
                            <AwardBadge type="customer-service-excellence" data-testid="award-badge-repairs" />
                        </motion.div>

                        {/* Premium Glassmorphism Card */}
                        <div className="hero-glass-card">
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
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-center relative z-10"
                                style={{
                                    opacity: Math.max(0, 1 - scrollY / 400)
                                }}
                            >
                                {/* Icon Badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="badge-elite-metallic badge-solar mx-auto"
                                >
                                    <motion.div
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Wrench className="h-5 w-5 text-yellow-400" />
                                    </motion.div>
                                    <span>{tagline}</span>
                                    <motion.div
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
                                    >
                                        <AlertTriangle className="h-5 w-5 text-orange-400" />
                                    </motion.div>
                                </motion.div>

                                {/* Icon Group */}
                                <motion.div
                                    className="flex items-center justify-center space-x-4 mb-8"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                >
                                    <Sun className="w-12 h-12 text-yellow-400 animate-pulse" />
                                    <Zap className="w-16 h-16 text-yellow-500" />
                                    <Battery className="w-12 h-12 text-orange-400 animate-pulse" />
                                </motion.div>

                                {/* Main Heading */}
                                <motion.h1
                                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.8 }}
                                >
                                    <span 
                                        className="font-extrabold bg-gradient-to-r from-white via-amber-300 to-orange-400 bg-clip-text text-transparent preserve-text-color"
                                        style={{
                                            filter: 'drop-shadow(0 0 40px rgba(255, 255, 255, 1)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.9)) drop-shadow(0 2px 6px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 60px rgba(251, 191, 36, 0.5))'
                                        }}
                                    >
                                        Solar System Repairs
                                    </span>
                                    <br />
                                    <span 
                                        className="font-extrabold tracking-wide text-white"
                                        style={{
                                            textShadow: '0 0 40px rgba(255, 255, 255, 1), 0 2px 6px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)',
                                            filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.8)) drop-shadow(0 2px 4px rgba(255, 255, 255, 0.6))'
                                        }}
                                    >
                                        Advance Power Redding
                                    </span>
                                </motion.h1>

                                {/* Subtitle */}
                                <motion.p 
                                    className="text-lg sm:text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto leading-relaxed"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    style={{
                                        textShadow: '0 0 40px rgba(255, 255, 255, 1), 0 2px 6px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.6)',
                                        filter: 'drop-shadow(0 0 15px rgba(255, 255, 255, 0.8)) drop-shadow(0 2px 4px rgba(255, 255, 255, 0.6))'
                                    }}
                                >
                                    {subtitle}
                                </motion.p>

                                {/* Stats Inside Card */}
                                <motion.div 
                                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.9, duration: 0.8 }}
                                >
                                    {stats.map((stat, index) => (
                                        <div key={index} className="text-center p-4 sm:p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-yellow-500/20">
                                            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 mb-2">{stat.value}</div>
                                            <div className="text-xs sm:text-sm md:text-base text-gray-400">{stat.label}</div>
                                        </div>
                                    ))}
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <motion.div 
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-[3]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="w-6 h-10 border-2 border-yellow-500 rounded-full flex items-start justify-center p-2"
                    >
                        <motion.div 
                            className="w-1.5 h-1.5 bg-yellow-500 rounded-full"
                            animate={{ y: [0, 16, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}

export default RepairsWaveHero;
