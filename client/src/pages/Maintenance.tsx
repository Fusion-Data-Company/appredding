import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { motion } from "framer-motion";
import { 
  Settings, 
  Sparkles, 
  Shield, 
  CheckCircle, 
  Calendar,
  Phone,
  TrendingUp,
  Eye,
  Droplets,
  BarChart3,
  Activity,
  Zap,
  AlertTriangle,
  ClipboardCheck,
  FileText,
  TestTube,
  Gauge,
  ThermometerSun,
  Cable,
  Battery,
  Users,
  Mail,
  MapPin,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SEOHead from "@/components/SEOHead";
import { SolarFunnel } from "@/sections/SolarFunnelDynamicSection";

const Maintenance = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    systemSize: "",
    message: ""
  });

  const maintenanceFunnelStages = [
    {
      id: 'inspection',
      title: 'System Inspection',
      description: 'Comprehensive visual and diagnostic assessment including IV curve tracing, infrared scanning, and performance baseline measurement.',
      status: 'completed' as const,
      color: 'red' as const,
      icon: <Eye className='h-6 w-6' />,
      metrics: [
        { label: 'Inspections', value: '500+' },
        { label: 'Issues Found', value: '78%' },
      ],
    },
    {
      id: 'diagnostics',
      title: 'Advanced Diagnostics',
      description: 'String analysis, inverter error code review, soiling loss assessment with pyranometer readings, and module degradation testing.',
      status: 'active' as const,
      color: 'yellow' as const,
      icon: <Activity className='h-6 w-6' />,
      metrics: [
        { label: 'Tests Run', value: '2.5K' },
        { label: 'Accuracy', value: '99%' },
      ],
    },
    {
      id: 'compliance',
      title: 'Compliance & Safety',
      description: 'CPUC compliance audits, warranty documentation review, rapid shutdown testing, ground fault and arc fault verification.',
      status: 'upcoming' as const,
      color: 'green' as const,
      icon: <Shield className='h-6 w-6' />,
      metrics: [
        { label: 'Audits', value: '300+' },
        { label: 'Pass Rate', value: '95%' },
      ],
    },
    {
      id: 'optimization',
      title: 'Performance Optimization',
      description: 'Production vs expected analysis, monitoring system integration, preventive maintenance scheduling, and efficiency restoration.',
      status: 'upcoming' as const,
      color: 'purple' as const,
      icon: <TrendingUp className='h-6 w-6' />,
      metrics: [
        { label: 'Optimizations', value: '450+' },
        { label: 'Gain', value: '15-30%' },
      ],
    },
  ];

  const technicalServices = [
    {
      icon: <TestTube className="w-6 h-6" />,
      title: "IV Curve Tracing & String Analysis",
      description: "Current-voltage characteristic measurements identify underperforming strings, shading issues, and module-level degradation patterns.",
      details: ["String-level diagnostics", "Module mismatch detection", "Performance ratio analysis", "Baseline comparison"]
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Inverter Diagnostics",
      description: "Error code interpretation, efficiency monitoring, and fault analysis for all major inverter brands including Enphase, SolarEdge, and SMA.",
      details: ["Error code database", "Efficiency tracking", "Firmware updates", "Communication diagnostics"]
    },
    {
      icon: <ThermometerSun className="w-6 h-6" />,
      title: "Soiling Loss Assessment",
      description: "Irradiance sensor and pyranometer measurements quantify energy loss from dust, pollen, and environmental contamination.",
      details: ["Pyranometer readings", "Soiling ratio calculation", "Cleaning ROI analysis", "Seasonal tracking"]
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Preventive Maintenance Schedules",
      description: "Customized quarterly and annual inspection programs ensure optimal performance and prevent costly system failures.",
      details: ["Quarterly inspections", "Annual deep service", "Seasonal optimization", "Emergency response"]
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: "CPUC Compliance Audits",
      description: "Complete documentation and regulatory compliance for California Public Utilities Commission requirements and NEM 3.0.",
      details: ["CPUC documentation", "NEM compliance", "Utility coordination", "Permit verification"]
    },
    {
      icon: <ClipboardCheck className="w-6 h-6" />,
      title: "Warranty Compliance",
      description: "Ensure all manufacturer warranty requirements are met with documented maintenance and performance tracking.",
      details: ["Manufacturer protocols", "Documentation systems", "Warranty registration", "Claims support"]
    },
    {
      icon: <Gauge className="w-6 h-6" />,
      title: "Performance Monitoring Systems",
      description: "Integration with Sense, Solar Analytics, Home Assistant, and Enphase Enlighten for real-time production tracking.",
      details: ["Production vs expected", "Alert configuration", "Data analysis", "Trend reporting"]
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Module Degradation Analysis",
      description: "Long-term performance tracking identifies degradation rates and predicts remaining system life and output.",
      details: ["Degradation rate calc", "Lifetime projection", "Replacement planning", "ROI optimization"]
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Rapid Shutdown Testing",
      description: "NEC 690.12 compliance verification for module-level and system-level rapid shutdown functionality.",
      details: ["NEC 690.12 testing", "Module-level RSD", "Tigo/Optimizers", "Safety certification"]
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Ground Fault & Arc Fault Testing",
      description: "Critical safety testing detects potential fire hazards from ground faults, arc faults, and insulation degradation.",
      details: ["Ground resistance", "Arc fault detection", "Insulation testing", "Safety compliance"]
    }
  ];

  const maintenancePlans = [
    {
      name: "Essential Care",
      frequency: "Annual",
      features: [
        "Visual inspection",
        "Performance baseline check",
        "Basic cleaning",
        "Inverter diagnostics",
        "System report with photos"
      ],
      price: "Starting at $299",
      popular: false
    },
    {
      name: "Professional Care",
      frequency: "Bi-Annual", 
      features: [
        "IV curve tracing",
        "IR thermal scanning",
        "String analysis",
        "Soiling assessment",
        "Electrical testing",
        "Inverter optimization",
        "Priority support",
        "Warranty documentation"
      ],
      price: "Starting at $549",
      popular: true
    },
    {
      name: "Enterprise Care",
      frequency: "Quarterly",
      features: [
        "All Professional features",
        "CPUC compliance audit",
        "Rapid shutdown testing",
        "Ground/arc fault testing",
        "Module degradation analysis",
        "Performance monitoring setup",
        "Emergency response (24/7)",
        "Extended warranty coverage"
      ],
      price: "Starting at $999",
      popular: false
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <MainLayout>
      <SEOHead 
        title="Solar System Maintenance & Diagnostics | Advance Power Redding"
        description="Professional solar maintenance, IV curve tracing, inverter diagnostics, CPUC compliance audits, and performance optimization in Redding, CA. Keep your solar system at peak efficiency."
        keywords={["solar maintenance Redding", "IV curve tracing", "solar panel diagnostics", "inverter repair", "CPUC compliance", "solar system inspection", "performance monitoring"]}
        industry="Solar"
        slug="maintenance"
      />
      
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-indigo-900/20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center"
          >
            <div>
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <Settings className="w-12 h-12 text-purple-400 mr-4" />
                <h1 className="text-5xl md:text-6xl font-bold text-white">
                  Professional Solar 
                  <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent block">
                    Maintenance & Diagnostics
                  </span>
                </h1>
              </div>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0">
                Advanced diagnostic testing, CPUC compliance audits, and preventive maintenance 
                programs designed for solar professionals who demand peak system performance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  data-testid="button-schedule-service"
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-4 px-8 rounded-lg"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule Service
                </Button>
                <Button 
                  data-testid="button-call-now"
                  variant="outline" 
                  className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white py-4 px-8 rounded-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call (530) 226-0701
                </Button>
              </div>
            </div>
            
            <div className="mt-12 lg:mt-0">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-2xl blur-xl"></div>
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl border border-gray-700">
                  <h3 className="text-2xl font-bold text-white mb-6">Why Professional Maintenance?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>Maintain 95%+ system efficiency</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>Extend warranty coverage & lifespan</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>CPUC & NEM 3.0 compliance</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>Prevent costly system failures</span>
                    </div>
                    <div className="flex items-center text-gray-300">
                      <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                      <span>Document performance for ROI</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Solar Funnel Section */}
      <SolarFunnel 
        stages={maintenanceFunnelStages}
        autoProgress={true}
        progressInterval={5000}
      />

      {/* Technical Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Comprehensive <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">Technical Services</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Advanced diagnostic and maintenance services for solar professionals who demand excellence.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technicalServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
                data-testid={`card-service-${index}`}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg flex items-center justify-center text-white mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>
                <ul className="space-y-2">
                  {service.details.map((detail, i) => (
                    <li key={i} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Maintenance Plans Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Maintenance <span className="bg-gradient-to-r from-purple-400 to-indigo-500 bg-clip-text text-transparent">Service Plans</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the maintenance plan that matches your system complexity and performance requirements.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {maintenancePlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border ${
                  plan.popular 
                    ? 'border-purple-500 ring-2 ring-purple-500/50' 
                    : 'border-gray-700'
                } hover:border-purple-500/50 transition-colors relative`}
                data-testid={`card-plan-${index}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-purple-400 font-semibold">{plan.frequency}</p>
                  <p className="text-3xl font-bold text-white mt-4">{plan.price}</p>
                </div>
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  data-testid={`button-choose-plan-${index}`}
                  className={`w-full ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600'
                      : 'bg-gray-700 hover:bg-gray-600'
                  } text-white`}
                >
                  Choose Plan
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Schedule Your <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">Maintenance Consultation</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Get a comprehensive system assessment and customized maintenance plan.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Users className="w-4 h-4 inline mr-2" />
                    Full Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    data-testid="input-name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    data-testid="input-email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    data-testid="input-phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(530) 226-0701"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="systemSize" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Battery className="w-4 h-4 inline mr-2" />
                    System Size (kW)
                  </label>
                  <Input
                    id="systemSize"
                    name="systemSize"
                    type="text"
                    data-testid="input-system-size"
                    value={formData.systemSize}
                    onChange={handleInputChange}
                    placeholder="10 kW"
                    className="w-full"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Installation Address
                </label>
                <Input
                  id="address"
                  name="address"
                  type="text"
                  required
                  data-testid="input-address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main St, Redding, CA 96001"
                  className="w-full"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Additional Details / Concerns
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={4}
                  data-testid="input-message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your system age, any performance issues, or specific maintenance needs..."
                  className="w-full"
                />
              </div>

              <Button 
                type="submit"
                data-testid="button-submit-consultation"
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-4 px-8 rounded-lg"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Request Consultation
              </Button>

              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                We'll respond within 24 hours to schedule your maintenance assessment.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-500 to-indigo-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Protect Your Solar Investment
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Professional maintenance ensures peak performance, regulatory compliance, and maximum ROI from your solar system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                data-testid="button-cta-schedule"
                className="bg-white text-purple-500 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Maintenance
              </Button>
              <Button 
                data-testid="button-cta-quote"
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-purple-500 py-4 px-8 rounded-lg"
              >
                <Phone className="w-5 h-5 mr-2" />
                Get Quote
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Maintenance;
