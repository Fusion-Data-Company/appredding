import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sun, Zap, Phone, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { OptimizedImage } from '@/components/ui/optimized-image'

interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

const SolarPanel = ({ isActive = false }: { isActive?: boolean }) => {
  return (
    <motion.div
      className="relative w-16 h-10 bg-gradient-to-br from-blue-900 to-blue-700 rounded-sm border border-blue-600"
      data-active={isActive}
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

const ContactForm = () => {
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
      <Card className="glass-card p-6 rounded-2xl">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
          data-testid="success-message"
        >
          <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Thank You!</h3>
          <p className="text-blue-100">We'll contact you within 24 hours to discuss your solar project.</p>
        </motion.div>
      </Card>
    )
  }

  return (
    <Card className="glass-card p-6 rounded-2xl" data-testid="contact-form">
      <h3 className="text-xl font-semibold text-white mb-4">Get Free Quote</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-blue-100 mb-1">
            Full Name *
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full bg-white/10 border-white/20 text-white placeholder:text-blue-200"
            placeholder="Enter your full name"
            data-testid="input-name"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-blue-100 mb-1">
            Email Address *
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full bg-white/10 border-white/20 text-white placeholder:text-blue-200"
            placeholder="Enter your email"
            data-testid="input-email"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-blue-100 mb-1">
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-white/10 border-white/20 text-white placeholder:text-blue-200"
            placeholder="Enter your phone number"
            data-testid="input-phone"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-blue-100 mb-1">
            Project Details
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full min-h-[100px] bg-white/10 border-white/20 text-white placeholder:text-blue-200"
            placeholder="Tell us about your solar project..."
            data-testid="textarea-message"
          />
        </div>
        
        <Button
          type="submit"
          disabled={isSubmitting}
          className="btn-premium btn-3d w-full"
          data-testid="button-submit"
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
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

const AdvancePowerHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const heroRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(heroRef, { once: true })

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
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div 
      ref={heroRef}
      className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900"
      data-testid="hero-section"
    >
      {/* Background Gradient Mesh */}
      <div className="gradient-mesh" />
      
      {/* CSS Animated Rays */}
      <div className="css-rays" data-active={isInView} />
      
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 0.3 : 0 }}
            transition={{ duration: 1 }}
          >
            <OptimizedImage
              src={slide.image}
              alt={`Solar installation ${index + 1}`}
              width={1920}
              height={1080}
              priority={index === 0}
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/60" />
      </div>

      {/* Main Grid Layout */}
      <div className="relative z-10 container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] gap-8 items-start">
          
          {/* Left Column - Main Content */}
          <div className="grid grid-rows-[auto_1fr_auto] gap-6 lg:gap-8">
            
            {/* Company Header Card */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="glass-card-strong p-6 rounded-2xl"
              data-testid="company-header"
            >
              <div className="flex items-center gap-4">
                {/* Logo */}
                <motion.div
                  initial={{ rotate: -10, scale: 0.8 }}
                  animate={isInView ? { rotate: 0, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl border-2 border-white/20">
                    <div className="grid grid-cols-2 gap-1">
                      {[...Array(4)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-3 h-3 bg-white/90 rounded-sm"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
                
                {/* Company Name */}
                <div>
                  <motion.h1 
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-orange-200 to-white"
                    style={{ fontSize: 'var(--fs-2xl)' }}
                  >
                    ADVANCE POWER OF REDDING
                  </motion.h1>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "100%" } : {}}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-0.5 bg-gradient-to-r from-orange-400 to-yellow-400 mt-1"
                  />
                </div>
              </div>
            </motion.div>

            {/* Hero Content */}
            <div className="flex flex-col justify-center space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.h2 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
                  key={currentSlide}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ fontSize: 'var(--fs-3xl)' }}
                  data-testid="hero-title"
                >
                  {slides[currentSlide].title}
                </motion.h2>
                
                <motion.p 
                  className="text-xl md:text-2xl text-blue-100 mb-6"
                  key={`subtitle-${currentSlide}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{ fontSize: 'var(--fs-xl)' }}
                  data-testid="hero-subtitle"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>

                <p className="text-lg text-blue-200 max-w-2xl" style={{ fontSize: 'var(--fs-lg)' }}>
                  Transform your home with clean, renewable energy. Our expert team provides 
                  comprehensive solar solutions tailored to Redding's unique climate and energy needs.
                </p>
              </motion.div>

              {/* Solar Animation */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex items-center gap-8"
              >
                {/* Sun */}
                <motion.div
                  className="w-16 h-16 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(251, 191, 36, 0.5)',
                      '0 0 40px rgba(251, 191, 36, 0.8)',
                      '0 0 20px rgba(251, 191, 36, 0.5)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <Sun className="w-8 h-8 text-white" />
                </motion.div>

                {/* Arrow */}
                <div className="flex-1 h-1 bg-gradient-to-r from-yellow-400 to-blue-500 max-w-[100px]" />

                {/* Solar Panels */}
                <div className="flex gap-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
                    >
                      <SolarPanel isActive={isInView} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                className="btn-premium btn-3d"
                onClick={() => {
                  const phone = document.createElement('a')
                  phone.href = 'tel:+15302260701'
                  phone.click()
                }}
                data-testid="button-call"
              >
                <Phone className="mr-2 w-5 h-5" />
                Call (530) 226-0701
              </Button>
              
              <Button
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-900 transition-all duration-300"
                onClick={() => {
                  document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })
                }}
                data-testid="button-learn-more"
              >
                Learn More
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Contact Form (Desktop) / Bottom (Mobile) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="order-last lg:order-none lg:sticky lg:top-24"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AdvancePowerHero
