"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { GradientTracing } from "@/components/ui/gradient-tracing"
import { CheckCircle2, ArrowRight, Sun, Zap, DollarSign } from "lucide-react"

interface FunnelStep {
  step: string
  title: string
  description: string
  icon: React.ReactNode
  benefit: string
}

interface SandlerSolarFunnelProps {
  steps?: FunnelStep[]
  className?: string
  title?: string
  subtitle?: string
  autoPlayInterval?: number
  ctaText?: string
  onCtaClick?: () => void
}

const defaultSteps: FunnelStep[] = [
  {
    step: "Step 1",
    title: "Free Solar Assessment",
    description: "Get a personalized solar analysis for your home with zero obligation. Our experts evaluate your roof, energy usage, and potential savings.",
    icon: <Sun className="w-6 h-6" />,
    benefit: "Know your solar potential in minutes"
  },
  {
    step: "Step 2",
    title: "Custom System Design",
    description: "Receive a tailored solar solution designed specifically for your home's energy needs and budget requirements.",
    icon: <Zap className="w-6 h-6" />,
    benefit: "Optimized for maximum efficiency"
  },
  {
    step: "Step 3",
    title: "Start Saving Money",
    description: "Begin generating clean energy and watch your electricity bills drop. Most homeowners save 20-50% on energy costs.",
    icon: <DollarSign className="w-6 h-6" />,
    benefit: "Immediate savings on day one"
  }
]

export function SandlerSolarFunnel({
  steps = defaultSteps,
  className,
  title = "Your Path to Solar Savings",
  subtitle = "Join thousands of homeowners who have made the switch to clean, affordable energy",
  autoPlayInterval = 4000,
  ctaText = "Get Your Free Assessment",
  onCtaClick = () => console.log("CTA clicked")
}: SandlerSolarFunnelProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
      } else {
        setCurrentStep((prev) => (prev + 1) % steps.length)
        setProgress(0)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [progress, steps.length, autoPlayInterval])

  const handleStepClick = (index: number) => {
    setCurrentStep(index)
    setProgress(0)
  }

  return (
    <section className={cn("relative py-16 md:py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden", className)}>
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <GradientTracing
          gradientColors={["#3b82f6", "#06b6d4", "#8b5cf6"]}
          animationDuration={3}
          strokeWidth={2}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />
      
      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {title}
          </motion.h2>
          <motion.p 
            className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Steps Section */}
          <div className="space-y-6">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={cn(
                  "relative p-6 rounded-2xl border-2 transition-all duration-500 cursor-pointer",
                  index === currentStep
                    ? "bg-blue-500/10 border-blue-500 shadow-lg scale-105"
                    : "bg-slate-800/50 border-slate-700 hover:border-blue-500/50"
                )}
                onClick={() => handleStepClick(index)}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Progress bar for active step */}
                {index === currentStep && (
                  <div className="absolute top-0 left-0 h-1 bg-blue-500 rounded-t-2xl transition-all duration-100" style={{ width: `${progress}%` }} />
                )}

                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                    index <= currentStep
                      ? "bg-blue-500 text-white"
                      : "bg-slate-700 text-slate-400"
                  )}>
                    {index < currentStep ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      step.icon
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-semibold text-blue-400">{step.step}</span>
                      {index < currentStep && (
                        <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                          Completed
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">
                      {step.title}
                    </h3>
                    <p className="text-sm text-slate-300 mb-3">
                      {step.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm font-medium text-blue-400">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{step.benefit}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Visual Section */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                className="relative"
                initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: 20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-blue-500/20 via-blue-500/10 to-transparent rounded-3xl p-8 md:p-12 border border-blue-500/20 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-3xl" />
                  
                  <div className="relative z-10 space-y-6">
                    {/* Icon Display */}
                    <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                      {steps[currentStep].icon}
                    </div>

                    {/* Step Info */}
                    <div>
                      <p className="text-sm font-semibold text-blue-400 mb-2">
                        {steps[currentStep].step}
                      </p>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        {steps[currentStep].title}
                      </h3>
                      <p className="text-slate-300">
                        {steps[currentStep].description}
                      </p>
                    </div>

                    {/* Stats/Benefits */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-700">
                      <div>
                        <p className="text-3xl font-bold text-blue-400">20-50%</p>
                        <p className="text-sm text-slate-400">Average Savings</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-blue-400">$0</p>
                        <p className="text-sm text-slate-400">Upfront Cost</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
              </motion.div>
            </AnimatePresence>

            {/* Step Indicators */}
            <div className="flex justify-center gap-2 mt-8">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleStepClick(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    index === currentStep
                      ? "w-8 bg-blue-500"
                      : "w-2 bg-slate-700 hover:bg-blue-500/50"
                  )}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
            onClick={onCtaClick}
          >
            {ctaText}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-sm text-slate-400 mt-4">
            No credit card required • Free consultation • Instant quote
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default function SandlerSolarFunnelDemo() {
  return (
    <SandlerSolarFunnel 
      onCtaClick={() => alert("Starting your solar journey!")}
    />
  )
}
