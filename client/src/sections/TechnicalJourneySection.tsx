"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CheckCircle2, ArrowRight, Search, Wrench, Zap, TrendingUp, FileCheck, Battery, Sun, Monitor, Award, Sparkles, Shield } from "lucide-react"

interface JourneyStage {
  stage: string
  title: string
  description: string
  icon: React.ReactNode
  technicalDetail: string
  metrics: {
    label: string
    value: string
  }[]
}

interface TechnicalJourneySectionProps {
  stages?: JourneyStage[]
  className?: string
  title?: string
  subtitle?: string
  autoPlayInterval?: number
  ctaText?: string
  onCtaClick?: () => void
}

const defaultStages: JourneyStage[] = [
  {
    stage: "Stage 1",
    title: "Site Assessment & Load Analysis",
    description: "Comprehensive energy audit including roof structural analysis, shading assessment, utility interconnection review, and 12-month consumption profiling to establish baseline kWh usage patterns.",
    icon: <Search className="w-7 h-7" />,
    technicalDetail: "IEEE 1547-2018 compliant evaluation",
    metrics: [
      { label: "Avg Assessment Time", value: "2-3 hrs" },
      { label: "Data Points Collected", value: "150+" }
    ]
  },
  {
    stage: "Stage 2",
    title: "System Engineering & Design",
    description: "Custom solar + storage design using SOLARK 12K/15K hybrid inverters, LiFePO4 batteries, optimized for NEM 3.0 export compensation and SGIP incentive eligibility with PE-stamped calculations.",
    icon: <Wrench className="w-7 h-7" />,
    technicalDetail: "SOLARK 12K: 97.5% efficiency, UL 1741-SB certified",
    metrics: [
      { label: "Design Accuracy", value: "±3%" },
      { label: "CPUC Approval Rate", value: "98%" }
    ]
  },
  {
    stage: "Stage 3",
    title: "Installation & Commissioning",
    description: "Professional installation following NFPA 70 (NEC Article 690), CPUC Rule 21 interconnection protocols, complete system testing, and utility Permission to Operate (PTO) acquisition.",
    icon: <Zap className="w-7 h-7" />,
    technicalDetail: "C-46 Solar Contractor License verified",
    metrics: [
      { label: "Typical Install Time", value: "3-5 days" },
      { label: "Safety Incident Rate", value: "0.0%" }
    ]
  },
  {
    stage: "Stage 4",
    title: "Performance Monitoring & Optimization",
    description: "Real-time system monitoring via cloud-based SCADA, quarterly performance reports, proactive maintenance alerts, and ongoing optimization for peak efficiency under California TOU rate structures.",
    icon: <Monitor className="w-7 h-7" />,
    technicalDetail: "24/7 remote diagnostics with 2-hour response SLA",
    metrics: [
      { label: "System Uptime", value: "99.7%" },
      { label: "Avg ROI Period", value: "6-8 yrs" }
    ]
  }
]

export function TechnicalJourneySection({
  stages = defaultStages,
  className,
  title = "Technical Implementation Pathway",
  subtitle = "Enterprise-grade solar + storage deployment following California engineering standards and utility interconnection protocols",
  autoPlayInterval = 5000,
  ctaText = "Request Technical Assessment",
  onCtaClick = () => console.log("CTA clicked")
}: TechnicalJourneySectionProps) {
  const [currentStage, setCurrentStage] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
      } else {
        setCurrentStage((prev) => (prev + 1) % stages.length)
        setProgress(0)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [progress, stages.length, autoPlayInterval, isPaused])

  const handleStageClick = (index: number) => {
    setCurrentStage(index)
    setProgress(0)
    setIsPaused(true)
    setTimeout(() => setIsPaused(false), 3000)
  }

  return (
    <section className={cn(
      "relative py-20 md:py-32 overflow-hidden",
      "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950",
      className
    )}>
      {/* Enhanced Ambient background effects with glassmorphism */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />

      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-40 right-20 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-40 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '3s' }} />

      <div className="container max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium backdrop-blur-sm">
              <FileCheck className="w-4 h-4" />
              Professional Engineering Standards
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {title}
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>

          {/* Premium Technical Credentials Banner */}
          <motion.div
            className="mt-10 flex flex-wrap items-center justify-center gap-4 md:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {[
              { label: "SOLARK Certified", icon: <Zap className="w-4 h-4" /> },
              { label: "UL 1741-SB", icon: <CheckCircle2 className="w-4 h-4" /> },
              { label: "NABCEP Engineers", icon: <Award className="w-4 h-4" /> },
              { label: "CPUC Rule 21", icon: <FileCheck className="w-4 h-4" /> }
            ].map((credential, idx) => (
              <motion.div
                key={idx}
                className="group relative px-5 py-2.5 bg-gradient-to-r from-slate-900/80 to-slate-800/80 border border-blue-500/20 rounded-full backdrop-blur-md hover:border-blue-400/40 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
              >
                {/* Animated glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-blue-500/20 group-hover:via-cyan-500/20 group-hover:to-blue-500/20 rounded-full transition-all duration-300 blur-sm -z-10" />

                <div className="flex items-center gap-2 text-sm font-medium text-slate-300 group-hover:text-blue-300 transition-colors">
                  <span className="text-blue-400 group-hover:text-cyan-400 transition-colors">
                    {credential.icon}
                  </span>
                  {credential.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 items-start">
          {/* Stages Section */}
          <div className="space-y-5">
            {stages.map((stage, index) => (
              <motion.div
                key={index}
                className={cn(
                  "relative p-6 md:p-7 rounded-2xl border-2 transition-all duration-500 cursor-pointer group overflow-hidden",
                  "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100",
                  "after:absolute after:inset-0 after:bg-gradient-to-tr after:from-blue-500/0 after:via-cyan-500/5 after:to-blue-500/0 after:opacity-0 after:transition-opacity after:duration-500 group-hover:after:opacity-100",
                  index === currentStage
                    ? "bg-gradient-to-br from-blue-950/60 to-blue-900/30 border-blue-500 shadow-2xl shadow-blue-500/20 scale-[1.02] backdrop-blur-md"
                    : "bg-slate-900/40 border-slate-700/50 hover:border-blue-500/40 hover:bg-slate-900/60 backdrop-blur-sm hover:scale-[1.01] hover:shadow-lg hover:shadow-blue-500/5"
                )}
                onClick={() => handleStageClick(index)}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Progress bar for active stage */}
                {index === currentStage && (
                  <div className="absolute top-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-tl-2xl transition-all duration-100" style={{ width: `${progress}%` }} />
                )}

                <div className="flex items-start gap-5">
                  {/* Enhanced Icon with glow and animation */}
                  <motion.div
                    className={cn(
                      "relative flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 shadow-xl group-hover:scale-110 group-hover:rotate-6",
                      index <= currentStage
                        ? "bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-500 text-white shadow-blue-500/60"
                        : "bg-gradient-to-br from-slate-800 to-slate-700 text-slate-400 shadow-slate-800/50 group-hover:from-slate-700 group-hover:to-slate-600"
                    )}
                    whileHover={{ scale: 1.15, rotate: 12 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {/* Glow effect for active/completed */}
                    {index <= currentStage && (
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 opacity-50 blur-md -z-10 animate-pulse" />
                    )}
                    {index < currentStage ? (
                      <CheckCircle2 className="w-7 h-7" />
                    ) : (
                      stage.icon
                    )}
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-bold text-blue-400 tracking-wider">{stage.stage}</span>
                      {index < currentStage && (
                        <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-medium">
                          Completed
                        </span>
                      )}
                      {index === currentStage && (
                        <span className="text-xs bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded-full font-medium animate-pulse">
                          In Progress
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-white group-hover:text-blue-300 transition-colors">
                      {stage.title}
                    </h3>

                    <p className="text-sm md:text-base text-slate-300 mb-4 leading-relaxed">
                      {stage.description}
                    </p>

                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 bg-slate-950/50 px-3 py-2 rounded-lg border border-cyan-500/20">
                      <FileCheck className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{stage.technicalDetail}</span>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-2 gap-3 mt-4">
                      {stage.metrics.map((metric, idx) => (
                        <div key={idx} className="bg-slate-950/30 px-3 py-2 rounded-lg border border-slate-700/50">
                          <p className="text-xs text-slate-400 mb-1">{metric.label}</p>
                          <p className="text-sm font-bold text-blue-400">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Visual Display Section */}
          <div className="relative lg:sticky lg:top-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStage}
                className="relative"
                initial={{ opacity: 0, scale: 0.95, rotateY: -15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotateY: 15 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Enhanced Main Showcase Card with premium glassmorphism */}
                <div className="relative bg-gradient-to-br from-blue-950/70 via-slate-900/70 to-slate-950/70 rounded-3xl p-8 md:p-12 border-2 border-blue-500/40 shadow-2xl shadow-blue-500/30 backdrop-blur-2xl overflow-hidden">
                  {/* Layered Glow effects */}
                  <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/30 via-cyan-500/20 to-indigo-500/30 rounded-3xl blur-3xl -z-10 animate-pulse" />
                  <div className="absolute -inset-2 bg-gradient-to-tr from-cyan-400/10 to-blue-600/10 rounded-3xl blur-2xl -z-20" />

                  {/* Shimmer effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-50 pointer-events-none" />
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

                  <div className="relative z-10 space-y-8">
                    {/* Enhanced Icon Display with physics animation */}
                    <motion.div
                      className="relative w-24 h-24 bg-gradient-to-br from-blue-500 via-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-blue-500/60"
                      initial={{ rotate: 3 }}
                      animate={{
                        rotate: [3, -3, 3],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      whileHover={{
                        rotate: 0,
                        scale: 1.1,
                        transition: { duration: 0.3 }
                      }}
                    >
                      {/* Orbital ring effect */}
                      <motion.div
                        className="absolute inset-0 border-2 border-cyan-400/30 rounded-2xl"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.1, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      {/* Inner glow pulse */}
                      <div className="absolute inset-2 bg-white/20 rounded-xl blur-sm animate-pulse" />
                      <div className="relative scale-150 z-10">
                        {stages[currentStage].icon}
                      </div>
                    </motion.div>

                    {/* Stage Info */}
                    <div>
                      <p className="text-sm font-bold text-blue-400 mb-3 tracking-widest uppercase">
                        {stages[currentStage].stage}
                      </p>
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
                        {stages[currentStage].title}
                      </h3>
                      <p className="text-lg text-slate-300 leading-relaxed">
                        {stages[currentStage].description}
                      </p>
                    </div>

                    {/* Technical Badge */}
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl">
                      <Sun className="w-6 h-6 text-cyan-400 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-slate-400 mb-1">Technical Specification</p>
                        <p className="text-sm font-mono font-bold text-cyan-300">{stages[currentStage].technicalDetail}</p>
                      </div>
                    </div>

                    {/* Enhanced Performance Metrics Grid with animated counters */}
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-700/50">
                      {stages[currentStage].metrics.map((metric, idx) => (
                        <motion.div
                          key={idx}
                          className="relative group text-center p-4 rounded-xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/30 hover:border-blue-500/50 transition-all duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ scale: 1.05, y: -5 }}
                        >
                          {/* Metric glow on hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:to-cyan-500/10 rounded-xl transition-all duration-300 -z-10" />

                          <motion.p
                            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2"
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 200,
                              damping: 15,
                              delay: idx * 0.15
                            }}
                          >
                            {metric.value}
                          </motion.p>
                          <p className="text-xs md:text-sm text-slate-400 uppercase tracking-wide font-medium">
                            {metric.label}
                          </p>

                          {/* Animated corner accents */}
                          <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-blue-400/0 group-hover:border-blue-400/60 transition-all duration-300 rounded-tl" />
                          <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-cyan-400/0 group-hover:border-cyan-400/60 transition-all duration-300 rounded-br" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating decorative elements */}
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              </motion.div>
            </AnimatePresence>

            {/* Stage Progress Indicators */}
            <div className="flex justify-center gap-3 mt-8">
              {stages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleStageClick(index)}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300",
                    index === currentStage
                      ? "w-12 bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/50"
                      : "w-2.5 bg-slate-700 hover:bg-blue-500/50"
                  )}
                  aria-label={`Go to stage ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Elite Premium CTA Section */}
        <motion.div
          className="text-center mt-16 md:mt-24 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* Radial gradient backdrop */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-64 bg-gradient-radial from-blue-500/10 via-transparent to-transparent blur-3xl -z-10" />

          <motion.div
            className="inline-block relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {/* Bokeh light effects */}
            <div className="absolute -inset-8 opacity-60">
              <div className="absolute top-0 left-1/4 w-20 h-20 bg-blue-400/30 rounded-full blur-2xl animate-pulse" />
              <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-cyan-400/30 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-0 left-1/2 w-24 h-24 bg-indigo-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
            </div>

            <Button
              size="lg"
              className="relative text-lg px-12 py-8 rounded-full shadow-2xl shadow-blue-500/40 hover:shadow-blue-500/60 transition-all duration-500 group bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:from-blue-700 hover:via-cyan-600 hover:to-blue-700 border-2 border-blue-400/30 hover:border-cyan-400/50 overflow-hidden"
              onClick={onCtaClick}
            >
              {/* Animated shimmer overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />

              {/* Button content */}
              <span className="relative z-10 flex items-center gap-3">
                <Sparkles className="w-5 h-5 animate-pulse" />
                <Battery className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-bold tracking-wide">{ctaText}</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </span>

              {/* Pulsing glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
            </Button>
          </motion.div>

          {/* Premium certification badges */}
          <motion.div
            className="mt-10 flex items-center justify-center gap-8 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { label: "C-46 Licensed Contractor", icon: <Shield className="w-4 h-4" /> },
              { label: "NABCEP Certified Engineers", icon: <Award className="w-4 h-4" /> },
              { label: "CPUC Rule 21 Compliant", icon: <FileCheck className="w-4 h-4" /> }
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-3 px-4 py-2 bg-slate-900/40 border border-emerald-500/20 rounded-lg backdrop-blur-sm group hover:border-emerald-400/40 transition-all duration-300"
                whileHover={{ y: -3 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + idx * 0.1 }}
              >
                <div className="flex items-center justify-center w-8 h-8 bg-emerald-500/10 rounded-full group-hover:bg-emerald-500/20 transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-300 group-hover:text-emerald-300 transition-colors">
                  <span className="text-emerald-400/70 group-hover:text-emerald-400 transition-colors">
                    {badge.icon}
                  </span>
                  {badge.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default function TechnicalJourneySectionDemo() {
  return (
    <TechnicalJourneySection
      onCtaClick={() => window.location.href = '/contact'}
    />
  )
}
