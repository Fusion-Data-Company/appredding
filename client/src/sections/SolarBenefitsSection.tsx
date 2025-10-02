import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
  Home
} from 'lucide-react';

const SolarBenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Immediate Savings",
      description: "Reduce your electricity bills by 85% from day one. Most homeowners save $2,000+ annually.",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "NEM 3.0 Protection",
      description: "Our battery storage solutions maximize your solar investment under California's new net metering rules.",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Wildfire Resilience",
      description: "Stay powered during outages with our wildfire-ready solar + storage systems. Essential for Northern California.",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "25-Year Warranty",
      description: "Industry-leading warranty coverage. Your investment is protected for decades with our certified installations.",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Home Value Increase",
      description: "Solar installations increase home value by an average of $15,000. Premium ROI for resale.",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30"
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Environmental Impact",
      description: "Reduce your carbon footprint by 4 tons annually. Clean energy for a sustainable future.",
      color: "text-green-300",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/30"
    }
  ];

  const incentives = [
    {
      program: "Federal Tax Credit",
      amount: "30%",
      description: "Up to $9,000 back on your taxes"
    },
    {
      program: "SGIP Battery Rebate",
      amount: "$1,000/kWh",
      description: "California battery storage incentive"
    },
    {
      program: "Property Tax Exclusion",
      amount: "100%",
      description: "No property tax increase for 20 years"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/40">
            <Sun className="w-4 h-4 mr-2" />
            California Solar Benefits
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Why Northern California Homeowners Choose Solar
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Maximize your investment with California-specific incentives, wildfire protection, 
            and guaranteed savings under NEM 3.0 regulations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className={`h-full border ${benefit.borderColor} bg-slate-800/50 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300`}>
                <CardHeader>
                  <div className={`w-16 h-16 rounded-full ${benefit.bgColor} flex items-center justify-center mb-4 ${benefit.color}`}>
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-white text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
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
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
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

