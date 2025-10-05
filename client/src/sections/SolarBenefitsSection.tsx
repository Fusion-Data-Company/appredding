import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { GradientTracing } from '@/components/ui/gradient-tracing';
import { 
  DollarSign, 
  Shield, 
  Zap, 
  Sun, 
  Battery, 
  TrendingUp,
  Award,
  Clock,
  Leaf,
  Home,
  ArrowUp
} from 'lucide-react';

const SolarBenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <DollarSign className="w-5 h-5" />,
      title: "NEM 3.0 Load Shifting",
      description: "Recover 25-40% of lost export value with smart battery storage. Charge at midday, discharge 6-9 PM when rates spike under time-of-use plans.",
      tone: "success" as const,
      highlight: "25-40%",
      trend: "up" as const
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Export Credit Protection",
      description: "NEM 3.0 cut export credits from ~$0.30 to $0.05/kWh. Our battery retrofits and load shifting strategies are now essential to maximize ROI.",
      tone: "primary" as const,
      highlight: "75-80%",
      trend: "up" as const
    },
    {
      icon: <Zap className="w-5 h-5" />,
      title: "PSPS Wildfire Backup",
      description: "Avoid $250/night hotel costs during PG&E shutoffs. Wildfire-zone residents qualify for SGIP battery rebates up to $1,000/kWh.",
      tone: "warning" as const,
      highlight: "$1,000/kWh",
      trend: "up" as const
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: "Orphaned System Rescue",
      description: "Original installer gone? We rescue stranded solar in 7 days. Repair costs average <40% of full replacement in North State.",
      tone: "default" as const,
      highlight: "7 Days",
      trend: "up" as const
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      title: "AB 942 Home Sale Protection",
      description: "New law eliminates NEM grandfathering on property sale. We provide due diligence inspections and compliance wrap for smooth transfers.",
      tone: "success" as const,
      highlight: "Protected",
      trend: "up" as const
    },
    {
      icon: <Leaf className="w-5 h-5" />,
      title: "Local Permitting Expertise",
      description: "5-7 day Shasta County permits. Online submittal for <15kW systems. We handle PE stamps, Title 24 compliance, and REU interconnection.",
      tone: "primary" as const,
      highlight: "5-7 Days",
      trend: "up" as const
    }
  ];

  const incentives = [
    {
      program: "Federal ITC (Through 2032)",
      amount: "30%",
      description: "Full credit available through 2032, sunset begins 2033"
    },
    {
      program: "SGIP Wildfire Zone Rebate",
      amount: "$1,000/kWh",
      description: "Feb 2025 E-5373 integrates IRA tax benefits"
    },
    {
      program: "REU Battery Rebates",
      amount: "Quarterly",
      description: "Redding Electric Utility periodic battery incentives"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <GradientTracing
          gradientColors={["#3b82f6", "#06b6d4", "#8b5cf6"]}
          animationDuration={3}
          strokeWidth={3}
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <Badge className="px-6 py-3 text-base bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-yellow-500/20 text-amber-300 border-2 border-amber-500/40 shadow-lg shadow-amber-500/20">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="mr-2"
              >
                <Sun className="w-5 h-5 text-amber-400" />
              </motion.div>
              California Solar Benefits
            </Badge>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Northern California Homeowners Choose Solar
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Maximize your investment with California-specific incentives, wildfire protection, 
            and guaranteed savings under NEM 3.0 regulations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => {
            const toneStyles = {
              success: {
                card: "bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/90 dark:to-emerald-800/90 ring-2 ring-emerald-300/80 dark:ring-emerald-600/80 shadow-lg shadow-emerald-200/50 dark:shadow-emerald-900/50",
                text: "text-emerald-800 dark:text-emerald-100",
                highlight: "text-emerald-700 dark:text-emerald-300"
              },
              primary: {
                card: "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/90 dark:to-blue-800/90 ring-2 ring-blue-300/80 dark:ring-blue-600/80 shadow-lg shadow-blue-200/50 dark:shadow-blue-900/50",
                text: "text-blue-800 dark:text-blue-100",
                highlight: "text-blue-700 dark:text-blue-300"
              },
              warning: {
                card: "bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/90 dark:to-amber-800/90 ring-2 ring-amber-300/80 dark:ring-amber-600/80 shadow-lg shadow-amber-200/50 dark:shadow-amber-900/50",
                text: "text-amber-800 dark:text-amber-100",
                highlight: "text-amber-700 dark:text-amber-300"
              },
              default: {
                card: "bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800/90 dark:to-zinc-700/90 ring-2 ring-zinc-300/80 dark:ring-zinc-600/80 shadow-lg shadow-zinc-200/50 dark:shadow-zinc-800/50",
                text: "text-zinc-800 dark:text-zinc-100",
                highlight: "text-zinc-700 dark:text-zinc-300"
              }
            };
            
            const styles = toneStyles[benefit.tone];
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className={cn(
                  "relative overflow-hidden rounded-xl p-4 min-h-[200px] backdrop-blur-sm transform-gpu",
                  styles.card
                )}>
                  <span className="pointer-events-none absolute -right-6 -top-6 inline-flex h-16 w-16 rounded-full bg-white/30 dark:bg-white/10" />
                  <span className="pointer-events-none absolute -right-2 -top-2 inline-flex h-8 w-8 rounded-full bg-white/40 dark:bg-white/15" />
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent dark:from-white/5 pointer-events-none" />

                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="space-y-1 flex-1">
                      <div className="font-medium text-zinc-700 dark:text-zinc-300 text-sm">
                        {benefit.title}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "flex items-center gap-1 text-sm font-medium",
                        styles.highlight
                      )}>
                        <ArrowUp className="h-4 w-4" aria-hidden />
                        {benefit.highlight}
                      </div>
                      <div className="rounded-full bg-white/60 p-1.5 dark:bg-white/20 shadow-md">
                        {benefit.icon}
                      </div>
                    </div>
                  </div>

                  <p className={cn("text-sm leading-relaxed", styles.text)}>
                    {benefit.description}
                  </p>

                  <div className="bg-current/40 mt-3 h-0.5 w-16 rounded opacity-60" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Incentives Section */}
        <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-2xl p-8 border border-blue-500/20">
          <h3 className="text-3xl font-bold text-white text-center mb-8">
            California Solar Incentives
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {incentives.map((incentive, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
                className="text-center transform-gpu"
              >
                <div className="text-4xl font-bold text-blue-400 mb-2">{incentive.amount}</div>
                <div className="text-lg font-semibold text-white mb-2">{incentive.program}</div>
                <div className="text-slate-300">{incentive.description}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mt-16 transform-gpu"
        >
          <div className="bg-gradient-to-r from-blue-600/20 to-green-600/20 rounded-2xl p-8 border border-blue-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Start Saving?
            </h3>
            <p className="text-slate-300 mb-6">
              Get your personalized solar savings estimate in minutes. 
              No obligation, just accurate projections for your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-300">
                Get Free Quote
              </button>
              <button className="px-8 py-4 border border-blue-500 text-blue-400 font-semibold rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300">
                Schedule Consultation
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolarBenefitsSection;

