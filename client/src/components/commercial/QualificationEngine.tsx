import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle, Clock, Zap, TrendingUp } from "lucide-react";

export interface LeadData {
  peakDemand?: number;
  monthlyUsage?: number;
  rateSchedule?: string;
  estimatedSavings?: number;
  companyName?: string;
  industry?: string;
  email?: string;
  phone?: string;
}

export type QualificationLevel = "emergency" | "strategic" | "education";

export interface QualificationResult {
  level: QualificationLevel;
  score: number;
  priority: "critical" | "high" | "medium" | "low";
  responseTime: string;
  closeRate: number;
  assignedTrack: string;
  nextActions: string[];
}

const QualificationEngine = ({
  leadData,
  onQualified
}: {
  leadData: LeadData;
  onQualified: (result: QualificationResult) => void
}) => {
  const [result, setResult] = useState<QualificationResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const calculateLeadScore = (data: LeadData): number => {
    let score = 0;

    // Demand-based scoring (40 points max)
    if (data.peakDemand) {
      if (data.peakDemand > 500) score += 40;
      else if (data.peakDemand > 300) score += 30;
      else if (data.peakDemand > 150) score += 20;
      else score += 10;
    }

    // Savings potential (30 points max)
    if (data.estimatedSavings) {
      if (data.estimatedSavings > 80000) score += 30;
      else if (data.estimatedSavings > 50000) score += 25;
      else if (data.estimatedSavings > 30000) score += 20;
      else score += 10;
    }

    // Rate schedule complexity (15 points max)
    const rateScores: Record<string, number> = {
      "B-20": 15,
      "E-19": 13,
      "B-19": 12,
      "B-10": 10
    };
    if (data.rateSchedule) {
      score += rateScores[data.rateSchedule] || 5;
    }

    // Industry targeting (15 points max)
    const industryScores: Record<string, number> = {
      "cold storage": 15,
      "manufacturing": 14,
      "medical": 13,
      "agriculture": 12,
      "data center": 15,
      "warehouse": 11
    };
    if (data.industry) {
      const industryLower = data.industry.toLowerCase();
      for (const [key, value] of Object.entries(industryScores)) {
        if (industryLower.includes(key)) {
          score += value;
          break;
        }
      }
    }

    return Math.min(score, 100);
  };

  const qualifyLead = (data: LeadData): QualificationResult => {
    const score = calculateLeadScore(data);
    let level: QualificationLevel = "education";
    let priority: "critical" | "high" | "medium" | "low" = "low";
    let responseTime = "3-5 business days";
    let closeRate = 23;
    let assignedTrack = "Education Track";
    let nextActions: string[] = [];

    // Emergency Response Path (Score 75+)
    if (score >= 75) {
      level = "emergency";
      priority = "critical";
      responseTime = "4 hours";
      closeRate = 67;
      assignedTrack = "Emergency Response - Priority Track";
      nextActions = [
        "Senior energy analyst immediate assignment",
        "Same-day facility assessment scheduling",
        "Expedited utility data request",
        "Custom financial modeling (ITC + Depreciation)",
        "Direct CEO/CFO outreach"
      ];
    }
    // Strategic Planning Path (Score 50-74)
    else if (score >= 50) {
      level = "strategic";
      priority = "high";
      responseTime = "Next business day";
      closeRate = 41;
      assignedTrack = "Strategic Planning - 7-Day Nurture";
      nextActions = [
        "Custom ROI report generation",
        "Facility assessment scheduling (7 days)",
        "Demand charge analysis",
        "SGIP incentive pre-qualification",
        "Engineering team assignment"
      ];
    }
    // Education Track (Score <50)
    else {
      level = "education";
      priority = score >= 30 ? "medium" : "low";
      responseTime = "3-5 business days";
      closeRate = 23;
      assignedTrack = "Education Track - 21-Day Sequence";
      nextActions = [
        "Drip email sequence activation",
        "Commercial solar guide delivery",
        "Webinar invitation (monthly)",
        "Case study library access",
        "Periodic check-in (bi-weekly)"
      ];
    }

    return {
      level,
      score,
      priority,
      responseTime,
      closeRate,
      assignedTrack,
      nextActions
    };
  };

  useEffect(() => {
    if (leadData && Object.keys(leadData).length > 0) {
      setIsAnalyzing(true);

      // Simulate AI analysis with delay
      setTimeout(() => {
        const qualificationResult = qualifyLead(leadData);
        setResult(qualificationResult);
        setIsAnalyzing(false);
        onQualified(qualificationResult);
      }, 1500);
    }
  }, [leadData]);

  if (!result && !isAnalyzing) return null;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical": return "from-red-500 to-orange-500";
      case "high": return "from-orange-500 to-yellow-500";
      case "medium": return "from-yellow-500 to-green-500";
      default: return "from-blue-500 to-gray-500";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "critical": return <AlertCircle className="h-6 w-6" />;
      case "high": return <Zap className="h-6 w-6" />;
      case "medium": return <TrendingUp className="h-6 w-6" />;
      default: return <Clock className="h-6 w-6" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-8"
    >
      {isAnalyzing ? (
        <div className="card-elite glow-blue p-8 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-4"
          >
            <Zap className="h-12 w-12 text-blue-400" />
          </motion.div>
          <h3 className="text-2xl font-bold text-white mb-2">Analyzing Your Opportunity...</h3>
          <p className="text-gray-400">AI-powered lead qualification in progress</p>
          <div className="mt-6 max-w-md mx-auto bg-gray-800/50 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5 }}
            />
          </div>
        </div>
      ) : result && (
        <div className={`card-elite glow-orange p-8 border-2 ${
          result.priority === "critical" ? "border-red-500/50" :
          result.priority === "high" ? "border-orange-500/50" : "border-blue-500/50"
        }`}>
          {/* Priority Badge */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <motion.div
                className={`p-3 rounded-xl bg-gradient-to-br ${getPriorityColor(result.priority)}`}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {getPriorityIcon(result.priority)}
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-white">{result.assignedTrack}</h3>
                <p className="text-gray-400">Lead Score: {result.score}/100 | Priority: {result.priority.toUpperCase()}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Expected Response</p>
              <p className="text-xl font-bold text-orange-400">{result.responseTime}</p>
            </div>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800/50 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm mb-1">Lead Score</p>
              <p className="text-3xl font-bold text-white">{result.score}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm mb-1">Close Rate</p>
              <p className="text-3xl font-bold text-green-400">{result.closeRate}%</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 text-center">
              <p className="text-gray-400 text-sm mb-1">Response Time</p>
              <p className="text-3xl font-bold text-orange-400">{result.responseTime.split(' ')[0]}</p>
            </div>
          </div>

          {/* Next Actions */}
          <div className="bg-gradient-to-br from-orange-900/20 to-orange-950/20 border border-orange-700/30 rounded-xl p-6">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-orange-400" />
              Your Personalized Action Plan
            </h4>
            <ul className="space-y-3">
              {result.nextActions.map((action, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 text-gray-300"
                >
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>{action}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Priority Callout */}
          {result.priority === "critical" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-6 text-center"
            >
              <p className="text-white font-bold text-xl mb-2">
                🚨 CRITICAL OPPORTUNITY DETECTED
              </p>
              <p className="text-white/90">
                Your facility qualifies for our Priority Emergency Response Track.
                A senior energy analyst will contact you within 4 hours to discuss
                immediate demand charge reduction strategies.
              </p>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default QualificationEngine;
