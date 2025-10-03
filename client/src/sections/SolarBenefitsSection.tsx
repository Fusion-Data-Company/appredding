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
      title: "NEM 3.0 Load Shifting",
      description: "Recover 25-40% of lost export value with smart battery storage. Charge at midday, discharge 6-9 PM when rates spike under time-of-use plans.",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "75-80% Export Credit Loss Protection",
      description: "NEM 3.0 cut export credits from ~$0.30 to $0.05/kWh. Our battery retrofits and load shifting strategies are now essential to maximize ROI.",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "PSPS Wildfire Backup Power",
      description: "Avoid $250/night hotel costs during PG&E shutoffs. Wildfire-zone residents qualify for SGIP battery rebates up to $1,000/kWh.",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/30"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Orphaned System Rescue",
      description: "Original installer gone? We rescue stranded solar in 7 days. Repair costs average <40% of full replacement in North State.",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "AB 942 Home Sale Protection",
      description: "New law eliminates NEM grandfathering on property sale. We provide due diligence inspections and compliance wrap for smooth transfers.",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/30"
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: "Local Permitting Expertise",
      description: "5-7 day Shasta County permits. Online submittal for <15kW systems. We handle PE stamps, Title 24 compliance, and REU interconnection.",
      color: "text-green-300",
      bgColor: "bg-green-400/10",
      borderColor: "border-green-400/30"
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

