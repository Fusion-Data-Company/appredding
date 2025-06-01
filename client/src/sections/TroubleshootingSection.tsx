import { motion } from "framer-motion";
import { AlertTriangle, Search, Wrench, CheckCircle, XCircle, Info } from "lucide-react";
import { useState } from "react";

const TroubleshootingSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const faultCodes = [
    {
      code: "F1",
      name: "DC Inversed Failure",
      description: "PV polarity reversed / parallel unit mismatch",
      remedy: "Check DC wiring, verify all units are ON",
      category: "DC",
      severity: "high"
    },
    {
      code: "F8",
      name: "GFDI Relay Failure",
      description: "AC ground fault (neutral/ground bond error)",
      remedy: "Check wiring, verify N-G bond at main panel",
      category: "AC",
      severity: "high"
    },
    {
      code: "F15",
      name: "AC OverCurrent Failure",
      description: "AC output overload",
      remedy: "Reduce loads / check battery capacity",
      category: "AC",
      severity: "medium"
    },
    {
      code: "F16",
      name: "GFCI Failure",
      description: "PV ground fault detected",
      remedy: "Inspect PV wiring and grounding connections",
      category: "PV",
      severity: "high"
    },
    {
      code: "F18",
      name: "Tz AC OverCurrent Fault",
      description: "Generator/load surges or phasing issue",
      remedy: "Check generator, load balance, and phasing",
      category: "AC",
      severity: "medium"
    },
    {
      code: "F20",
      name: "Tz DC OverCurrent Fault",
      description: "Battery/PV DC current spike",
      remedy: "Limit PV strings, check battery amp settings",
      category: "DC",
      severity: "medium"
    },
    {
      code: "F24",
      name: "DC Insulation Fault",
      description: "PV insulation resistance low",
      remedy: "Test and repair PV insulation integrity",
      category: "PV",
      severity: "high"
    },
    {
      code: "F25",
      name: "AC Active Battery Fault",
      description: "Activate Battery ON but no battery connected",
      remedy: "Disable battery activation or connect battery",
      category: "Battery",
      severity: "low"
    },
    {
      code: "F26",
      name: "Bus Unbalance Fault",
      description: "Load imbalance (split/3-phase), ground fault",
      remedy: "Balance loads across phases, inspect wiring",
      category: "AC",
      severity: "medium"
    },
    {
      code: "F40",
      name: "Battery Over Current",
      description: "Battery exceeded current limit",
      remedy: "Adjust charge/discharge settings, check BMS",
      category: "Battery",
      severity: "medium"
    },
    {
      code: "F55",
      name: "DC Volt High Fault",
      description: "PV/battery voltage too high",
      remedy: "Reconfigure PV strings, check voltage settings",
      category: "DC",
      severity: "high"
    },
    {
      code: "F56",
      name: "DC Volt Low Fault",
      description: "Battery deeply discharged or BMS open",
      remedy: "Recharge battery, check BMS connections",
      category: "Battery",
      severity: "medium"
    },
    {
      code: "F58",
      name: "BMS Communication Fault",
      description: "CAN/RS485 comm lost with battery BMS",
      remedy: "Check wiring, verify communication protocol",
      category: "Battery",
      severity: "medium"
    },
    {
      code: "F63",
      name: "ARC Fault",
      description: "PV arc-fault detected",
      remedy: "Inspect PV connections, disable if nuisance",
      category: "PV",
      severity: "high"
    },
    {
      code: "F64",
      name: "Heatsink High Temp Fault",
      description: "Overheating, fans blocked or high ambient temp",
      remedy: "Check fans, improve ventilation, clean heatsinks",
      category: "Thermal",
      severity: "medium"
    }
  ];

  const troubleshootingGuide = [
    {
      issue: "Inverter LCD not powering on",
      solution: "Ensure at least one power source (PV, battery, grid) is present; check all disconnects"
    },
    {
      issue: "No PV power generation",
      solution: "PV voltage must be 150-170VDC minimum; check PV disconnect, polarity, and breakers"
    },
    {
      issue: "Low PV output",
      solution: "Battery may be full (PV throttled); check MPPT input wiring and sun conditions"
    },
    {
      issue: "Battery not charging",
      solution: "Confirm charge settings, battery voltage range, and BMS communication if closed-loop"
    },
    {
      issue: "Generator auto-start not working",
      solution: "Verify 2-wire start connection, correct wiring, generator type settings"
    },
    {
      issue: "CT readings reversed",
      solution: "Use Auto-Learn function or physically flip CT orientation on conductors"
    },
    {
      issue: "Frequent overload/bus unbalance",
      solution: "Check load distribution across phases/legs, balance electrical loads"
    },
    {
      issue: "Grid cycling on/off",
      solution: "Verify neutral connections, frequency settings, and phase wiring integrity"
    }
  ];

  const categories = ["all", "AC", "DC", "PV", "Battery", "Thermal"];

  const filteredCodes = faultCodes.filter(code => {
    const matchesSearch = code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         code.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         code.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || code.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "from-red-500 to-red-600";
      case "medium": return "from-yellow-500 to-orange-500";
      case "low": return "from-green-500 to-green-600";
      default: return "from-gray-500 to-gray-600";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high": return <XCircle className="w-5 h-5" />;
      case "medium": return <AlertTriangle className="w-5 h-5" />;
      case "low": return <Info className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  return (
    <section className="relative py-32 bg-gradient-to-br from-red-100 via-orange-100 to-amber-100 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-red-200/20 via-orange-200/15 to-amber-200/20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-red-300/15 to-orange-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-orange-300/15 to-amber-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-12 leading-tight drop-shadow-lg">
            <span className="bg-gradient-to-r from-orange-800 via-red-700 to-amber-800 bg-clip-text text-transparent">Sol-Ark</span>{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-orange-700 via-red-600 to-amber-700 bg-clip-text text-transparent drop-shadow-lg">
                Troubleshooting
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-300/40 to-amber-300/40 blur-2xl -z-10 animate-pulse"></div>
            </span>
          </h2>
          
          <p className="text-3xl md:text-4xl text-gray-800 max-w-5xl mx-auto font-medium leading-relaxed drop-shadow-sm">
            Comprehensive fault code database and troubleshooting guide for rapid problem resolution.
          </p>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-xl">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search fault codes, names, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                />
              </div>
              
              {/* Category Filter */}
              <div className="md:w-48">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-lg"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Fault Codes Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {filteredCodes.map((fault, index) => (
            <motion.div
              key={fault.code}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 group-hover:border-orange-300 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                {/* Fault Code Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-lg bg-gradient-to-r ${getSeverityColor(fault.severity)} text-white font-bold text-sm`}>
                    {getSeverityIcon(fault.severity)}
                    {fault.code}
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                    {fault.category}
                  </span>
                </div>

                {/* Fault Details */}
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {fault.name}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  <strong>Cause:</strong> {fault.description}
                </p>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Wrench className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <strong className="text-green-800 text-sm">Solution:</strong>
                      <p className="text-green-700 text-sm mt-1">{fault.remedy}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* General Troubleshooting Guide */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-12 border border-gray-700"
        >
          <h3 className="text-4xl font-black text-white mb-8 text-center">
            General Troubleshooting Guide
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {troubleshootingGuide.map((item, index) => (
              <div key={index} className="bg-gray-700/50 rounded-xl p-6 border border-gray-600">
                <h4 className="text-lg font-bold text-orange-400 mb-3">
                  {item.issue}
                </h4>
                <p className="text-gray-200 leading-relaxed">
                  {item.solution}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-400 text-white font-bold rounded-xl text-lg shadow-2xl transition-all duration-300"
            >
              Contact Technical Support
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TroubleshootingSection;