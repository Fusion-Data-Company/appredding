import { motion } from "framer-motion";
import { Zap, Battery, Settings, Shield, Monitor, Wrench } from "lucide-react";
import { useState } from "react";

const SpecificationsSection = () => {
  const [activeTab, setActiveTab] = useState("inverters");

  const solArkModels = [
    {
      model: "12K-2P-N",
      outputPower: "9kW continuous",
      pvInput: "~12kW",
      batteryPorts: "1 (48V)",
      transferSwitch: "50A",
      mpptInputs: "2",
      useCase: "Partial backup",
      empHardened: "Optional",
      enclosure: "NEMA 3R",
      features: [
        "Split-phase 120/240V output",
        "Fast transfer <5ms",
        "Up to 185A battery charge",
        "PV voltage range: 150-500VDC",
        "AC coupling supported",
        "LCD touchscreen control"
      ]
    },
    {
      model: "15K-2P-N",
      outputPower: "12kW continuous",
      pvInput: "~15kW",
      batteryPorts: "2 (48V)",
      transferSwitch: "200A",
      mpptInputs: "3",
      useCase: "Whole home",
      empHardened: "Optional",
      enclosure: "NEMA 3R",
      features: [
        "Split-phase 120/240V output",
        "200A pass-through capacity",
        "Up to 275A battery charge",
        "Up to 8 units parallel",
        "Internal N-G relay bond",
        "208V generator support"
      ]
    },
    {
      model: "30K-3P-208",
      outputPower: "30kW 3-phase",
      pvInput: "~45kW",
      batteryPorts: "HV (CAN bus)",
      transferSwitch: "-",
      mpptInputs: "3",
      useCase: "Commercial",
      empHardened: "-",
      enclosure: "NEMA 3R",
      features: [
        "208Y/120V 3-phase output",
        "High voltage battery support",
        "CANbus BMS communication",
        "Up to 10 units parallel",
        "Commercial applications",
        "Microgrid capability"
      ]
    },
    {
      model: "60K-3P-480",
      outputPower: "60kW 3-phase",
      pvInput: "~90kW",
      batteryPorts: "HV (CAN bus)",
      transferSwitch: "-",
      mpptInputs: "3",
      useCase: "Large Commercial",
      empHardened: "-",
      enclosure: "NEMA 3R",
      features: [
        "480Y/277V 3-phase output",
        "High voltage battery support",
        "CANbus BMS communication",
        "Up to 10 units parallel (600kW)",
        "Industrial applications",
        "Grid-tie capabilities"
      ]
    }
  ];

  const apiBatterySpecs = [
    {
      model: "API 5kWh System",
      capacity: "5.12kWh per module",
      voltage: "48V nominal",
      current: "100Ah",
      maxParallel: "6 modules (30.7kWh)",
      inverter: "API 48-5000 Hybrid",
      communication: "CAN/RS485",
      features: [
        "Built-in BMS protection",
        "Active cell balancing",
        "LED SOC indicator bar",
        "UL 1973/9540 compliant",
        "Non-grid-tied operation",
        "Field-replaceable design"
      ]
    },
    {
      model: "API 14kWh Stack",
      capacity: "14.34kWh per module",
      voltage: "48V nominal",
      current: "280Ah",
      maxParallel: "4 stacks (229kWh max)",
      inverter: "Compatible with all 48V",
      communication: "CAN/RS485",
      features: [
        "Master BMS control",
        "Real-time cell monitoring",
        "Internet-independent display",
        "Active balancing technology",
        "Modular stacking design",
        "6000+ cycle life"
      ]
    }
  ];

  const installationSpecs = [
    {
      category: "Sol-Ark 12K Installation",
      requirements: [
        "Wall mount vertically near panels",
        "PV input: 150-500VDC range",
        "Battery: 48V nominal connection",
        "AC grid in and load out wiring",
        "Proper neutral/ground separation",
        "CT installation on L1/L2 mains"
      ]
    },
    {
      category: "Sol-Ark 15K Installation",
      requirements: [
        "200A service compatibility",
        "Whole-home backup wiring",
        "Three MPPT PV inputs",
        "Dual battery port connections",
        "Generator interface (optional)",
        "Arc fault detection setup"
      ]
    },
    {
      category: "API Battery Integration",
      requirements: [
        "48V DC bus connection",
        "CAN/RS485 communication cable",
        "BMS parameter configuration",
        "Charge/discharge limits setup",
        "Safety disconnect installation",
        "Ventilation requirements minimal"
      ]
    }
  ];

  const operatingModes = [
    {
      mode: "Grid Sell (Net Metering)",
      description: "Export excess solar to grid for credits",
      settings: "CT orientation, export limits"
    },
    {
      mode: "Limited (Zero-Export)",
      description: "No export to grid, self-consumption only",
      settings: "CT auto-learn, load balancing"
    },
    {
      mode: "Time-of-Use",
      description: "Scheduled charging/discharging",
      settings: "Time schedules, rate optimization"
    },
    {
      mode: "Backup/UPS",
      description: "Automatic backup during outages",
      settings: "Critical load prioritization"
    }
  ];

  return (
    <section className="relative py-32 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-200/20 via-indigo-200/15 to-purple-200/20"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-300/15 to-indigo-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-indigo-300/15 to-purple-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
            <span className="bg-gradient-to-r from-orange-800 via-red-700 to-amber-800 bg-clip-text text-transparent">Technical</span>{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-orange-700 via-red-600 to-amber-700 bg-clip-text text-transparent drop-shadow-lg">
                Specifications
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-300/40 to-amber-300/40 blur-2xl -z-10 animate-pulse"></div>
            </span>
          </h2>
          
          <p className="text-3xl md:text-4xl text-black max-w-5xl mx-auto font-bold leading-relaxed drop-shadow-sm">
            Comprehensive technical data, installation requirements, and operational specifications for Sol-Ark inverters and API LiFePO4 systems.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: "inverters", label: "Sol-Ark Inverters", icon: <Zap className="w-5 h-5" /> },
              { id: "batteries", label: "API Batteries", icon: <Battery className="w-5 h-5" /> },
              { id: "installation", label: "Installation", icon: <Wrench className="w-5 h-5" /> },
              { id: "operation", label: "Operating Modes", icon: <Settings className="w-5 h-5" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg"
                    : "bg-white/80 text-gray-700 hover:bg-white hover:shadow-md"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Sol-Ark Inverters Tab */}
        {activeTab === "inverters" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {solArkModels.map((model, index) => (
              <div key={model.model} className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Model Overview */}
                  <div>
                    <h3 className="text-3xl font-black text-gray-800 mb-6">
                      Sol-Ark {model.model}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="text-sm text-orange-600 font-semibold">Output Power</div>
                        <div className="text-xl font-bold text-orange-800">{model.outputPower}</div>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <div className="text-sm text-yellow-600 font-semibold">PV Input</div>
                        <div className="text-xl font-bold text-yellow-800">{model.pvInput}</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-sm text-purple-600 font-semibold">Battery Ports</div>
                        <div className="text-xl font-bold text-purple-800">{model.batteryPorts}</div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="text-sm text-orange-600 font-semibold">MPPT Inputs</div>
                        <div className="text-xl font-bold text-orange-800">{model.mpptInputs}</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
                        {model.useCase}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold">
                        {model.enclosure}
                      </span>
                      {model.empHardened !== "-" && (
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                          EMP: {model.empHardened}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Features List */}
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-4">Key Features</h4>
                    <ul className="space-y-3">
                      {model.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* API Batteries Tab */}
        {activeTab === "batteries" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {apiBatterySpecs.map((battery, index) => (
              <div key={battery.model} className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 shadow-xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-3xl font-black text-gray-800 mb-6">
                      {battery.model}
                    </h3>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="text-sm text-green-600 font-semibold">Capacity</div>
                        <div className="text-xl font-bold text-green-800">{battery.capacity}</div>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="text-sm text-blue-600 font-semibold">Voltage</div>
                        <div className="text-xl font-bold text-blue-800">{battery.voltage}</div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="text-sm text-purple-600 font-semibold">Current</div>
                        <div className="text-xl font-bold text-purple-800">{battery.current}</div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="text-sm text-orange-600 font-semibold">Max Parallel</div>
                        <div className="text-xl font-bold text-orange-800">{battery.maxParallel}</div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg mb-4">
                      <div className="text-sm text-gray-600 font-semibold">Communication</div>
                      <div className="text-lg font-bold text-gray-800">{battery.communication}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-gray-800 mb-4">Features & Safety</h4>
                    <ul className="space-y-3">
                      {battery.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Installation Tab */}
        {activeTab === "installation" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {installationSpecs.map((spec, index) => (
              <div key={spec.category} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Wrench className="w-6 h-6 text-blue-500" />
                  {spec.category}
                </h3>
                <ul className="space-y-3">
                  {spec.requirements.map((requirement, reqIndex) => (
                    <li key={reqIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}

        {/* Operating Modes Tab */}
        {activeTab === "operation" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {operatingModes.map((mode, index) => (
              <div key={mode.mode} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Settings className="w-6 h-6 text-indigo-500" />
                  {mode.mode}
                </h3>
                <p className="text-gray-700 mb-4">{mode.description}</p>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="text-sm text-indigo-600 font-semibold mb-2">Configuration Requirements:</div>
                  <div className="text-indigo-800">{mode.settings}</div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SpecificationsSection;