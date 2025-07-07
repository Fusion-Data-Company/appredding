'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { Sun, Zap, Phone, Mail, ArrowRight, Play, Pause, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
}

interface SolarPanelProps {
  className?: string
  isActive?: boolean
}

interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

const SolarPanel: React.FC<SolarPanelProps> = ({ className = '', isActive = false }) => {
  return (
    <motion.div
      className={`relative w-16 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-sm border border-blue-600 ${className}`}
      animate={{
        boxShadow: isActive 
          ? ['0 0 10px rgba(59, 130, 246, 0.5)', '0 0 20px rgba(59, 130, 246, 0.8)', '0 0 10px rgba(59, 130, 246, 0.5)']
          : '0 0 5px rgba(59, 130, 246, 0.3)'
      }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      <div className="absolute inset-1 grid grid-cols-4 gap-0.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="bg-blue-800 rounded-sm"
            animate={{
              backgroundColor: isActive 
                ? ['#1e40af', '#3b82f6', '#1e40af']
                : '#1e40af'
            }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
          />
        ))}
      </div>
    </motion.div>
  )
}

const SunRay: React.FC<{ delay: number; isActive: boolean }> = ({ delay, isActive }) => {
  return (
    <motion.div
      className="absolute w-1 h-20 bg-gradient-to-b from-yellow-400 to-transparent origin-bottom"
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{
        opacity: isActive ? [0, 1, 0] : 0,
        scaleY: isActive ? [0, 1, 0] : 0,
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay,
        ease: "easeInOut"
      }}
    />
  )
}

const ParticleSystem: React.FC<{ isActive: boolean }> = ({ isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const createParticle = (): Particle => ({
      id: Math.random(),
      x: Math.random() * canvas.width,
      y: canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: -Math.random() * 3 - 1,
      life: 0,
      maxLife: 60 + Math.random() * 60
    })

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (isActive && particlesRef.current.length < 50) {
        if (Math.random() < 0.3) {
          particlesRef.current.push(createParticle())
        }
      }

      particlesRef.current = particlesRef.current.filter(particle => {
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++

        const alpha = 1 - (particle.life / particle.maxLife)
        const size = 2 + Math.sin(particle.life * 0.1) * 1

        ctx.save()
        ctx.globalAlpha = alpha
        ctx.fillStyle = '#fbbf24'
        ctx.shadowBlur = 10
        ctx.shadowColor = '#fbbf24'
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        return particle.life < particle.maxLife && particle.y > -10
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isActive])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  )
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (isSubmitted) {
    return (
      <Card className="p-6 bg-green-50 border-green-200">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-green-800 mb-2">Thank You!</h3>
          <p className="text-green-600">We'll contact you within 24 hours to discuss your solar project.</p>
        </motion.div>
      </Card>
    )
  }

  return (
    <Card className="p-6 bg-background/95 backdrop-blur-sm border-border">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
            Full Name *
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full"
            placeholder="Enter your full name"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
            Email Address *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full"
            placeholder="Enter your email"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full"
            placeholder="Enter your phone number"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1">
            Project Details
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full min-h-[100px]"
            placeholder="Tell us about your solar project..."
          />
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
            />
          ) : (
            <>
              Get Free Quote
              <ArrowRight className="ml-2 w-4 h-4" />
            </>
          )}
        </Button>
      </form>
    </Card>
  )
}

const AdvancePowerHero: React.FC = () => {
  const [isAnimationActive, setIsAnimationActive] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(heroRef, { once: true })
  const controls = useAnimation()

  const slides = [
    {
      title: "Power Your Future with Solar Energy",
      subtitle: "Redding's Premier Solar Installation Experts",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
    },
    {
      title: "Clean Energy Solutions for Northern California",
      subtitle: "Reduce Your Bills, Increase Your Home Value",
      image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
    },
    {
      title: "Professional Installation & Maintenance",
      subtitle: "25-Year Warranty on All Solar Systems",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
    }
  ]

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-form')
    contactSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div ref={heroRef} className="relative h-[calc(100vh-6rem)] md:h-[calc(100vh-5rem)] overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 0.3 : 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/60" />
      </div>

      {/* Particle System */}
      <ParticleSystem isActive={isAnimationActive} />

      {/* Solar Animation - Moved to Far Left */}
      <div className="absolute top-32 left-8 md:left-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, x: 0 }
          }}
          transition={{ duration: 1 }}
          className="relative"
        >
          {/* Sun */}
          <motion.div
            className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center mb-6"
            animate={{
              boxShadow: [
                '0 0 20px rgba(251, 191, 36, 0.5)',
                '0 0 40px rgba(251, 191, 36, 0.8)',
                '0 0 20px rgba(251, 191, 36, 0.5)'
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sun className="w-8 h-8 md:w-10 md:h-10 text-white" />
          </motion.div>

          {/* Sun Rays */}
          <div className="absolute top-16 md:top-20 left-1/2 transform -translate-x-1/2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${(i - 2) * 12}px`,
                  transform: 'translateX(-50%)'
                }}
              >
                <SunRay delay={i * 0.2} isActive={isAnimationActive} />
              </div>
            ))}
          </div>

          {/* Solar Panels */}
          <div className="flex space-x-2 md:space-x-4 mt-12 md:mt-16">
            {Array.from({ length: 3 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                variants={{
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
              >
                <SolarPanel isActive={isAnimationActive} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Company Header - Positioned Left */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0 }
        }}
        transition={{ duration: 1, delay: 0.2 }}
        className="absolute top-24 left-8 md:left-16 z-20 text-left"
      >
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 tracking-wider">
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            ADVANCE POWER
          </span>
        </h1>
        <h2 className="text-lg md:text-2xl lg:text-3xl font-light text-yellow-200 tracking-widest">
          OF REDDING
        </h2>
      </motion.div>

      {/* Main Content - Moved down slightly */}
      <div className="relative z-10 flex items-center h-full pt-16">
        <div className="container mx-auto px-4 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 1, delay: 0.3 }}
              className="text-white space-y-6"
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold leading-tight"
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {slides[currentSlide].title}
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-blue-100"
                key={`subtitle-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {slides[currentSlide].subtitle}
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                variants={{
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-lg text-blue-200 max-w-2xl"
              >
                Transform your home with clean, renewable energy. Our expert team provides 
                comprehensive solar solutions tailored to Redding's unique climate and energy needs.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                variants={{
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 1, delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  onClick={scrollToContact}
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg group"
                >
                  Get Free Quote
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg"
                  onClick={() => {
                    const phone = document.createElement('a')
                    phone.href = 'tel:+15305551234'
                    phone.click()
                  }}
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Call Now
                </Button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={controls}
                variants={{
                  visible: { opacity: 1, y: 0 }
                }}
                transition={{ duration: 1, delay: 1 }}
                className="grid grid-cols-3 gap-6 pt-8"
              >
                {[
                  { number: "500+", label: "Installations" },
                  { number: "25", label: "Year Warranty" },
                  { number: "30%", label: "Average Savings" }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-yellow-400">
                      {stat.number}
                    </div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 1, delay: 0.5 }}
              id="contact-form"
            >
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Animation Control */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={controls}
        variants={{
          visible: { opacity: 1 }
        }}
        transition={{ duration: 1, delay: 1.2 }}
        onClick={() => setIsAnimationActive(!isAnimationActive)}
        className="absolute top-4 right-4 z-20 p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
        aria-label={isAnimationActive ? "Pause animation" : "Play animation"}
      >
        {isAnimationActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
      </motion.button>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={controls}
        variants={{
          visible: { opacity: 1 }
        }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center space-y-2"
        >
          <span className="text-sm">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>

      {/* Slide Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-yellow-400' : 'bg-white/30'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default AdvancePowerHero