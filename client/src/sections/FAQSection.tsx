import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle, Zap, Battery, Settings } from "lucide-react";
import { useState } from "react";

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqCategories = [
    {
      category: "Sol-Ark Inverters",
      icon: <Zap className="w-6 h-6" />,
      questions: [
        {
          question: "What's the difference between Sol-Ark 12K and 15K models?",
          answer: "The 12K provides 9kW continuous output with a 50A transfer switch for partial home backup, while the 15K delivers 12kW continuous with a 200A transfer switch for whole-home backup. The 15K has 3 MPPT inputs versus 2 on the 12K, and supports up to 8 units in parallel."
        },
        {
          question: "How do I configure CT orientation for proper grid monitoring?",
          answer: "Install CTs on L1/L2 service mains, then run Auto-Learn function from the LCD menu. This automatically detects and corrects CT orientation. If readings appear reversed, you can either flip the CT physically or use the Auto-Learn feature to correct electronically."
        },
        {
          question: "What does fault code F58 mean and how do I fix it?",
          answer: "F58 indicates BMS Communication Fault - CAN/RS485 communication lost with battery BMS. Check communication wiring connections, verify protocol settings match between inverter and BMS, and ensure proper termination resistors are installed on the communication bus."
        },
        {
          question: "Can Sol-Ark inverters work without batteries?",
          answer: "Yes, Sol-Ark inverters support battery-optional operation. However, if 'Activate Battery' is enabled in settings but no battery is connected, you'll get fault code F25. Simply disable the battery activation setting for grid-tie only operation."
        },
        {
          question: "What's the minimum PV voltage required for Sol-Ark operation?",
          answer: "PV voltage must be 150-170VDC minimum for the inverter to start generating power. Maximum input voltage is 500VDC. Check PV disconnect, string wiring polarity, and ensure adequate sun conditions if experiencing low PV output."
        }
      ]
    },
    {
      category: "API LiFePO4 Batteries",
      icon: <Battery className="w-6 h-6" />,
      questions: [
        {
          question: "What's the maximum capacity I can achieve with API battery systems?",
          answer: "API 5.12kWh modules can be paralleled up to 6 units for 30.7kWh total. API 14.34kWh modules can be configured in up to 4 stacks with 4 modules per stack, achieving 229kWh maximum capacity. All systems use 48V nominal voltage."
        },
        {
          question: "Are API LiFePO4 batteries safe for indoor installation?",
          answer: "Yes, API batteries use LiFePO4 (Lithium Iron Phosphate) chemistry which is non-flammable, non-explosive, and thermally stable. They're UL 1973 and UL 9540 compliant for indoor installation with minimal ventilation requirements."
        },
        {
          question: "How long do API LiFePO4 batteries last?",
          answer: "API batteries are rated for 6000+ cycles with active cell balancing technology. This translates to 15-20+ years of typical residential use. The built-in BMS monitors cell-level voltage, temperature, SOC, and SOH for optimal longevity."
        },
        {
          question: "Do API batteries require an internet connection for monitoring?",
          answer: "No, API 14.34kWh stack systems include an internet-independent display that provides real-time monitoring without requiring WiFi or internet connectivity. The master BMS displays all critical battery parameters locally."
        },
        {
          question: "Can I expand my API battery system later?",
          answer: "Yes, API batteries feature modular stacking design allowing field expansion without replacing existing equipment. The system is designed to be scalable and modules are field-replaceable for easy maintenance and upgrades."
        }
      ]
    },
    {
      category: "Installation & Setup",
      icon: <Settings className="w-6 h-6" />,
      questions: [
        {
          question: "What operating modes are available on Sol-Ark inverters?",
          answer: "Sol-Ark supports Grid Sell (net metering/export), Limited (Zero-Export), Time-of-Use scheduling, and Backup/UPS modes. Each mode requires specific CT orientation and configuration settings through the LCD touchscreen interface."
        },
        {
          question: "How do I set up closed-loop battery communication?",
          answer: "Connect CAN bus or RS485 communication cable between Sol-Ark inverter and API battery BMS. Configure communication protocol in inverter settings to match BMS specifications. This enables real-time battery data exchange for optimal charging/discharging control."
        },
        {
          question: "What's required for proper Sol-Ark grounding and neutral bonding?",
          answer: "Sol-Ark inverters require proper neutral/ground separation - neutral is NOT bonded inside the inverter. The N-G bond must be at the main electrical panel only. The 15K model includes an internal N-G relay for off-grid compliance when needed."
        },
        {
          question: "Can Sol-Ark inverters support generator auto-start?",
          answer: "Yes, Sol-Ark includes integrated generator auto-start controller with 2-wire start capability. Configure generator type, voltage/frequency parameters, and start/stop conditions through the LCD interface. Verify proper generator wiring and settings."
        },
        {
          question: "What maintenance is required for Sol-Ark and API systems?",
          answer: "Check fans and heat sinks regularly, verify phase balance on 3-phase systems, inspect all connections, and monitor system performance. API batteries require minimal maintenance due to sealed LiFePO4 chemistry - no watering or off-gassing concerns."
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex: number, questionIndex: number) => {
    const faqId = categoryIndex * 1000 + questionIndex;
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  return (
    <section className="relative py-32 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-200/20 via-purple-200/15 to-pink-200/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-indigo-300/15 to-purple-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-300/15 to-pink-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-12 leading-tight">
            <span className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent">Frequently</span>{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Asked Questions
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-300/30 to-pink-300/30 blur-2xl -z-10 animate-pulse"></div>
            </span>
          </h2>
          
          <p className="text-3xl md:text-4xl max-w-5xl mx-auto font-bold leading-relaxed"
             style={{ color: '#000000 !important' }}>
            Real-world answers to common questions about Sol-Ark inverters, API LiFePO4 batteries, 
            installation procedures, and system troubleshooting.
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-900/95 backdrop-blur-sm rounded-3xl p-8 border border-gray-600 shadow-xl"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl text-white">
                  {category.icon}
                </div>
                <h3 className="text-3xl font-black text-white">{category.category}</h3>
              </div>

              {/* Questions */}
              <div className="space-y-4">
                {category.questions.map((faq, questionIndex) => {
                  const faqId = categoryIndex * 1000 + questionIndex;
                  const isOpen = openFAQ === faqId;

                  return (
                    <div key={questionIndex} className="border border-gray-600 rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                        className="w-full px-6 py-4 text-left bg-gray-800 hover:bg-gray-700 transition-colors duration-200 flex items-center justify-between"
                      >
                        <span className="text-lg font-semibold text-white pr-4">
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-gray-300 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-300 flex-shrink-0" />
                        )}
                      </button>
                      
                      <motion.div
                        initial={false}
                        animate={{ height: isOpen ? "auto" : 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 py-4 bg-gray-800">
                          <p className="text-gray-300 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Support CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-white">
            <HelpCircle className="w-16 h-16 mx-auto mb-6 text-white/80" />
            <h3 className="text-4xl font-black mb-6">Still Have Questions?</h3>
            <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Our technical support team specializes in Sol-Ark inverters and API LiFePO4 systems. 
              Get expert assistance with installation, troubleshooting, and system optimization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Contact Technical Support
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white text-white font-bold rounded-xl text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300"
              >
                Schedule Consultation
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;