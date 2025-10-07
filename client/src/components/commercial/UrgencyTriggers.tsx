import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Clock, TrendingUp, Users, Award, Zap } from "lucide-react";

interface CountdownTimerProps {
  label: string;
  endDate: Date;
  urgencyLevel: "critical" | "warning" | "info";
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ label, endDate, urgencyLevel }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [endDate]);

  const getColorScheme = () => {
    switch (urgencyLevel) {
      case "critical": return "from-red-500 to-orange-500";
      case "warning": return "from-orange-500 to-yellow-500";
      default: return "from-blue-500 to-purple-500";
    }
  };

  return (
    <div className={`bg-gradient-to-r ${getColorScheme()} rounded-xl p-6 text-white`}>
      <div className="flex items-center gap-3 mb-4">
        <Clock className="h-6 w-6" />
        <p className="font-bold text-lg">{label}</p>
      </div>
      <div className="flex gap-4 justify-center">
        <div className="text-center">
          <div className="text-4xl font-black">{timeLeft.days}</div>
          <div className="text-sm opacity-90">Days</div>
        </div>
        <div className="text-4xl font-black self-center">:</div>
        <div className="text-center">
          <div className="text-4xl font-black">{timeLeft.hours}</div>
          <div className="text-sm opacity-90">Hours</div>
        </div>
        <div className="text-4xl font-black self-center">:</div>
        <div className="text-center">
          <div className="text-4xl font-black">{timeLeft.minutes}</div>
          <div className="text-sm opacity-90">Minutes</div>
        </div>
      </div>
    </div>
  );
};

const UrgencyTriggers = () => {
  const [activeProjects, setActiveProjects] = useState(47);
  const [recentSavings, setRecentSavings] = useState(48000);
  const [showCompetitorAlert, setShowCompetitorAlert] = useState(false);

  useEffect(() => {
    // Simulate real-time project updates
    const interval = setInterval(() => {
      setActiveProjects(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(40, Math.min(55, prev + change));
      });
    }, 15000);

    // Show competitor alert after 10 seconds
    const alertTimer = setTimeout(() => {
      setShowCompetitorAlert(true);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(alertTimer);
    };
  }, []);

  // Calculate urgency dates
  const itcPhaseDown = new Date();
  itcPhaseDown.setMonth(itcPhaseDown.getMonth() + 13); // ~1 year from now

  const sgipDepletion = new Date();
  sgipDepletion.setMonth(sgipDepletion.getMonth() + 4); // 4 months

  const utilityRateIncrease = new Date();
  utilityRateIncrease.setDate(utilityRateIncrease.getDate() + 47); // 47 days

  return (
    <div className="space-y-6">
      {/* Demand Charge Bleeding Alert */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-6 text-white shadow-2xl"
      >
        <div className="flex items-start gap-4">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <AlertTriangle className="h-8 w-8 flex-shrink-0" />
          </motion.div>
          <div className="flex-1">
            <h3 className="text-2xl font-black mb-2">DEMAND CHARGE BLEEDING IN PROGRESS</h3>
            <p className="text-white/90 mb-4">
              Every month without solar + battery costs $8,000-$18,000 in avoidable demand charges.
              Your facility is losing money right now.
            </p>
            <div className="bg-white/20 rounded-lg p-4 backdrop-blur-sm">
              <p className="text-sm mb-1">Estimated Monthly Loss</p>
              <p className="text-4xl font-black">$12,500</p>
              <p className="text-sm mt-1">= $150,000 annually in pure waste</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Countdown Timers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <CountdownTimer
          label="ITC Steps Down to 26%"
          endDate={itcPhaseDown}
          urgencyLevel="warning"
        />
        <CountdownTimer
          label="SGIP Funds Depleting"
          endDate={sgipDepletion}
          urgencyLevel="critical"
        />
        <CountdownTimer
          label="Next PG&E Rate Increase"
          endDate={utilityRateIncrease}
          urgencyLevel="warning"
        />
      </div>

      {/* Real-Time Social Proof */}
      <motion.div
        className="card-elite glow-blue p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              className="p-3 bg-blue-500/20 rounded-xl"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="h-6 w-6 text-blue-400" />
            </motion.div>
            <div>
              <p className="text-white font-bold text-lg">Live Project Tracker</p>
              <p className="text-gray-400 text-sm">Real-time installation activity</p>
            </div>
          </div>
          <div className="text-right">
            <motion.p
              className="text-4xl font-black text-blue-400"
              key={activeProjects}
              initial={{ scale: 1.2, color: "#60a5fa" }}
              animate={{ scale: 1, color: "#3b82f6" }}
              transition={{ duration: 0.3 }}
            >
              {activeProjects}
            </motion.p>
            <p className="text-gray-400 text-sm">Active Projects</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-2xl font-bold text-white">23</p>
            <p className="text-xs text-gray-400">In Design</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-2xl font-bold text-orange-400">14</p>
            <p className="text-xs text-gray-400">In Installation</p>
          </div>
          <div className="bg-gray-800/50 rounded-lg p-3">
            <p className="text-2xl font-bold text-green-400">10</p>
            <p className="text-xs text-gray-400">Commissioned This Week</p>
          </div>
        </div>
      </motion.div>

      {/* Competitor Success Alert */}
      <AnimatePresence>
        {showCompetitorAlert && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: "auto", marginTop: 24 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            className="bg-gradient-to-br from-orange-900/40 to-orange-950/40 border-2 border-orange-500/50 rounded-xl p-6 overflow-hidden"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-orange-500/20 rounded-xl flex-shrink-0">
                <TrendingUp className="h-6 w-6 text-orange-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-2 w-2 bg-orange-400 rounded-full animate-pulse" />
                  <p className="text-orange-400 font-bold text-sm uppercase tracking-wide">Live Update - 2 minutes ago</p>
                </div>
                <h4 className="text-white font-bold text-xl mb-2">
                  3 Facilities in Your Area Just Reduced Demand Charges
                </h4>
                <p className="text-gray-300 mb-4">
                  Recent commercial solar installations within 15 miles of your location are saving an average of
                  <span className="text-orange-400 font-bold"> ${recentSavings.toLocaleString()}/month</span> in demand charges.
                </p>
                <div className="bg-orange-900/20 border border-orange-700/30 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-orange-400" />
                    <div>
                      <p className="text-white font-semibold">Cold Storage Facility - Anderson, CA</p>
                      <p className="text-gray-400 text-sm">450kW system | $42K demand charge reduction</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scarcity Trigger */}
      <motion.div
        className="bg-gradient-to-r from-purple-900/40 to-purple-950/40 border border-purple-500/30 rounded-xl p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-4 mb-4">
          <Award className="h-8 w-8 text-purple-400" />
          <div>
            <h4 className="text-white font-bold text-xl">Priority Engineering Capacity</h4>
            <p className="text-purple-300 text-sm">Limited slots for Q1 2025 installations</p>
          </div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400 text-sm">Available Design Slots</span>
            <span className="text-white font-bold">7 / 15</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              initial={{ width: "0%" }}
              animate={{ width: "47%" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <p className="text-gray-400 text-xs mt-2">
            ⚡ Reserve your slot now to guarantee Q1 2025 installation and maximize 2025 tax benefits
          </p>
        </div>
      </motion.div>

      {/* Loss Aversion Frame */}
      <div className="card-elite glow-red p-6">
        <h4 className="text-white font-bold text-2xl mb-4">The Cost of Waiting</h4>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-red-400 font-bold">1</span>
            </div>
            <div>
              <p className="text-white font-semibold">Every Month Delay = $12,500 Lost</p>
              <p className="text-gray-400 text-sm">Continued demand charge bleeding without mitigation</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-red-400 font-bold">2</span>
            </div>
            <div>
              <p className="text-white font-semibold">SGIP Funds Declining Weekly</p>
              <p className="text-gray-400 text-sm">Battery rebates reduced from $350/kWh → $200/kWh in just 6 months</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="h-8 w-8 bg-red-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-red-400 font-bold">3</span>
            </div>
            <div>
              <p className="text-white font-semibold">Utility Rates Increasing 6-8% Annually</p>
              <p className="text-gray-400 text-sm">CPUC approved rate increases compound your losses every year</p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-red-900/30 border border-red-700/50 rounded-lg p-4 text-center">
          <p className="text-red-300 font-bold text-lg mb-2">
            6-Month Delay Cost = $75,000 + Lost ITC Benefits
          </p>
          <p className="text-gray-400 text-sm">
            Don't let indecision cost your business six figures
          </p>
        </div>
      </div>
    </div>
  );
};

export default UrgencyTriggers;
