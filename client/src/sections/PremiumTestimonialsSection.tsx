"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowLeft, ArrowRight, Award, DollarSign, Zap, Home } from 'lucide-react';
import { PraetorianGradientText } from '@/components/ui/praetorian-gradient-text';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  savings: string;
  systemSize: string;
  installationDate: string;
  avatar?: string;
  projectType: string;
  verified: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah & Mike Johnson",
    location: "Redding, CA",
    rating: 5,
    text: "Advance Power transformed our home with their solar installation. The process was seamless, and we've seen incredible savings on our electricity bills. The team was professional, knowledgeable, and went above and beyond our expectations.",
    savings: "$2,400/year",
    systemSize: "8.5 kW",
    installationDate: "March 2024",
    projectType: "Residential",
    verified: true
  },
  {
    id: 2,
    name: "David Chen",
    location: "Anderson, CA",
    rating: 5,
    text: "As a small business owner, I was skeptical about solar ROI. Advance Power's detailed analysis and transparent pricing convinced me. Six months in, I'm saving over $300 monthly and my customers love our sustainable approach.",
    savings: "$3,600/year",
    systemSize: "15.2 kW",
    installationDate: "January 2024",
    projectType: "Commercial",
    verified: true
  },
  {
    id: 3,
    name: "Lisa Rodriguez",
    location: "Shasta Lake, CA",
    rating: 5,
    text: "The battery storage system they installed has been a game-changer. During the recent power outages, we stayed powered up while our neighbors were in the dark. The peace of mind is worth every penny.",
    savings: "$1,800/year",
    systemSize: "6.8 kW + Battery",
    installationDate: "November 2023",
    projectType: "Residential + Storage",
    verified: true
  },
  {
    id: 4,
    name: "Robert & Mary Thompson",
    location: "Cottonwood, CA",
    rating: 5,
    text: "We've been Advance Power customers for 15 years. They installed our original system and just upgraded us to the latest technology. Their maintenance service keeps everything running perfectly. Truly a company you can trust.",
    savings: "$2,100/year",
    systemSize: "7.2 kW",
    installationDate: "September 2023",
    projectType: "Upgrade",
    verified: true
  },
  {
    id: 5,
    name: "Jennifer Martinez",
    location: "Palo Cedro, CA",
    rating: 5,
    text: "The mobile home solar installation was challenging, but Advance Power's expertise made it look easy. They designed a custom solution that fits perfectly with our setup. Our electricity bill went from $180 to $12!",
    savings: "$2,016/year",
    systemSize: "5.4 kW",
    installationDate: "July 2023",
    projectType: "Mobile Home",
    verified: true
  },
  {
    id: 6,
    name: "Tom Wilson",
    location: "Burney, CA",
    rating: 5,
    text: "Living off-grid was always a dream. Advance Power's hybrid system made it reality. We have complete energy independence with backup power for peace of mind. The installation team was incredibly professional.",
    savings: "$2,700/year",
    systemSize: "12.0 kW Off-Grid",
    installationDate: "May 2023",
    projectType: "Off-Grid",
    verified: true
  }
];

const PremiumTestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-advance testimonials
  React.useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const stats = [
    { label: "Happy Customers", value: "1000+", icon: <Home className="w-6 h-6" /> },
    { label: "Average Savings", value: "$2,300/year", icon: <DollarSign className="w-6 h-6" /> },
    { label: "Systems Installed", value: "2500+", icon: <Zap className="w-6 h-6" /> },
    { label: "5-Star Rating", value: "4.9/5", icon: <Star className="w-6 h-6" /> }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-950/30 via-transparent to-transparent" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium backdrop-blur-sm">
              Customer Success Stories
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-6">
            <h2 className="text-4xl md:text-6xl font-black leading-tight">
              <PraetorianGradientText variant="dual" size="4xl" glow="md">
                What Our Customers Say
              </PraetorianGradientText>
            </h2>
          </motion.div>

          <motion.div variants={itemVariants}>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-medium">
              Real customers, real savings, real results. See why over 1,000 Northern California 
              families and businesses trust Advance Power for their solar needs.
            </p>
          </motion.div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="text-center"
            >
              <div className="flex justify-center mb-3">
                <div className="p-3 bg-gradient-to-br from-blue-600/20 to-blue-500/20 border border-blue-500/30 rounded-full">
                  <span className="text-blue-400">{stat.icon}</span>
                </div>
              </div>
              <div className="text-3xl md:text-4xl font-black text-white mb-1">
                {stat.value}
              </div>
              <div className="text-slate-400 text-sm font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700/50 rounded-3xl p-8 md:p-12 backdrop-blur-sm">
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 text-blue-400/30">
              <Quote className="w-12 h-12" />
            </div>

            {/* Testimonial Content */}
            <div className="relative z-10">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <div className="flex items-center mb-6">
                  <div className="flex items-center gap-1 mr-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  {testimonials[currentIndex].verified && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-green-600/20 border border-green-500/30 rounded-full">
                      <Award className="w-3 h-3 text-green-400" />
                      <span className="text-xs text-green-300 font-medium">Verified</span>
                    </div>
                  )}
                </div>

                <blockquote className="text-lg md:text-xl text-slate-200 leading-relaxed mb-6 italic">
                  "{testimonials[currentIndex].text}"
                </blockquote>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="text-xl font-bold text-white mb-1">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-slate-400">
                      {testimonials[currentIndex].location} • {testimonials[currentIndex].projectType}
                    </div>
                  </div>

                  <div className="flex gap-6 text-sm">
                    <div className="text-center">
                      <div className="text-blue-400 font-semibold">Annual Savings</div>
                      <div className="text-white font-bold">{testimonials[currentIndex].savings}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-400 font-semibold">System Size</div>
                      <div className="text-white font-bold">{testimonials[currentIndex].systemSize}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-400 font-semibold">Installed</div>
                      <div className="text-white font-bold">{testimonials[currentIndex].installationDate}</div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToTestimonial(index)}
                      onMouseEnter={() => setIsAutoPlaying(false)}
                      onMouseLeave={() => setIsAutoPlaying(true)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-blue-500 scale-125'
                          : 'bg-slate-600 hover:bg-slate-500'
                      }`}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={prevTestimonial}
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                    className="p-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:bg-slate-600/50 transition-all duration-200"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    onMouseEnter={() => setIsAutoPlaying(false)}
                    onMouseLeave={() => setIsAutoPlaying(true)}
                    className="p-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:bg-slate-600/50 transition-all duration-200"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PremiumTestimonialsSection;

