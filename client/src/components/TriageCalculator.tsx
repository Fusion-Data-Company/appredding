"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface TriageResult {
  urgency: 'Low' | 'Medium' | 'High' | 'Critical';
  recommendations: string[];
  estimatedTimeframe: string;
}

const TriageCalculator: React.FC = () => {
  const [issueType, setIssueType] = useState('');
  const [systemAge, setSystemAge] = useState('');
  const [problemDate, setProblemDate] = useState('');
  const [systemSize, setSystemSize] = useState('');
  const [result, setResult] = useState<TriageResult | null>(null);

  const calculateUrgency = (): TriageResult => {
    let urgencyScore = 0;

    // Issue type scoring
    if (issueType === 'no-output') urgencyScore += 4;
    else if (issueType === 'inverter-failure') urgencyScore += 4;
    else if (issueType === 'physical-damage') urgencyScore += 3;
    else if (issueType === 'reduced-output') urgencyScore += 2;
    else if (issueType === 'monitoring-issue') urgencyScore += 1;
    else if (issueType === 'electrical-issue') urgencyScore += 3;

    // System age scoring
    const age = parseInt(systemAge);
    if (age > 15) urgencyScore += 1;
    else if (age > 10) urgencyScore += 0.5;

    // Time since problem scoring
    if (problemDate) {
      const daysSince = Math.floor((Date.now() - new Date(problemDate).getTime()) / (1000 * 60 * 60 * 24));
      if (daysSince > 30) urgencyScore += 1;
      else if (daysSince > 7) urgencyScore += 0.5;
    }

    // System size impact
    const size = parseFloat(systemSize);
    if (size > 10) urgencyScore += 0.5;

    // Determine urgency level
    let urgency: 'Low' | 'Medium' | 'High' | 'Critical';
    let recommendations: string[];
    let estimatedTimeframe: string;

    if (urgencyScore >= 4) {
      urgency = 'Critical';
      recommendations = [
        'Contact our emergency repair team immediately',
        'Your system may be losing significant energy production',
        'Potential safety hazard - requires immediate attention',
        'Same-day service available for critical repairs'
      ];
      estimatedTimeframe = 'Same Day Service';
    } else if (urgencyScore >= 3) {
      urgency = 'High';
      recommendations = [
        'Schedule a repair appointment within 24-48 hours',
        'Your system is likely operating at reduced capacity',
        'Delaying repair could lead to increased costs',
        'Next-day service available'
      ];
      estimatedTimeframe = '24-48 Hours';
    } else if (urgencyScore >= 1.5) {
      urgency = 'Medium';
      recommendations = [
        'Schedule an inspection within the next week',
        'Monitor your system\'s performance daily',
        'Document any changes in output or behavior',
        'Standard service appointment recommended'
      ];
      estimatedTimeframe = '3-7 Days';
    } else {
      urgency = 'Low';
      recommendations = [
        'Schedule a routine maintenance check',
        'Your issue is likely minor but should be addressed',
        'Continue monitoring system performance',
        'Regular maintenance can prevent future issues'
      ];
      estimatedTimeframe = '1-2 Weeks';
    }

    return { urgency, recommendations, estimatedTimeframe };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const triageResult = calculateUrgency();
    setResult(triageResult);
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Critical': return 'text-red-600 dark:text-red-400';
      case 'High': return 'text-orange-600 dark:text-orange-400';
      case 'Medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'Low': return 'text-green-600 dark:text-green-400';
      default: return 'text-muted-foreground';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'Critical':
      case 'High':
        return <AlertTriangle className="w-8 h-8" />;
      case 'Medium':
        return <Clock className="w-8 h-8" />;
      case 'Low':
        return <CheckCircle className="w-8 h-8" />;
      default:
        return null;
    }
  };

  return (
    <Card className="bg-background/80 backdrop-blur-md border-border/50 p-8 hover:bg-background/90 transition-all duration-300 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-2 text-foreground">Solar System Triage Calculator</h2>
        <p className="text-muted-foreground mb-6">
          Answer a few questions to assess your repair needs and get priority recommendations
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="issue-type" className="text-foreground">
              What type of issue are you experiencing?
            </Label>
            <Select value={issueType} onValueChange={setIssueType} required>
              <SelectTrigger id="issue-type" data-testid="select-issue-type">
                <SelectValue placeholder="Select issue type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no-output">No Power Output</SelectItem>
                <SelectItem value="reduced-output">Reduced Energy Output</SelectItem>
                <SelectItem value="physical-damage">Physical Damage (Weather/Debris)</SelectItem>
                <SelectItem value="inverter-failure">Inverter Problems/Failure</SelectItem>
                <SelectItem value="electrical-issue">Electrical/Wiring Issues</SelectItem>
                <SelectItem value="monitoring-issue">Monitoring System Errors</SelectItem>
                <SelectItem value="other">Other Issue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="system-age" className="text-foreground">
                How old is your solar system? (years)
              </Label>
              <Input
                id="system-age"
                type="number"
                min="0"
                max="50"
                value={systemAge}
                onChange={(e) => setSystemAge(e.target.value)}
                placeholder="e.g., 5"
                required
                data-testid="input-system-age"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="system-size" className="text-foreground">
                System size (kW)
              </Label>
              <Input
                id="system-size"
                type="number"
                step="0.1"
                min="0"
                value={systemSize}
                onChange={(e) => setSystemSize(e.target.value)}
                placeholder="e.g., 8.5"
                required
                data-testid="input-system-size"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="problem-date" className="text-foreground">
              When did you first notice the problem?
            </Label>
            <Input
              id="problem-date"
              type="date"
              value={problemDate}
              onChange={(e) => setProblemDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              required
              data-testid="input-problem-date"
            />
          </div>

          <Button
            type="submit"
            size="lg"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            data-testid="button-calculate-urgency"
          >
            Calculate Urgency Level
          </Button>
        </form>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-8 space-y-6"
            >
              <div className="border-t border-border pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className={getUrgencyColor(result.urgency)}>
                    {getUrgencyIcon(result.urgency)}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      Urgency Level: <span className={getUrgencyColor(result.urgency)}>{result.urgency}</span>
                    </h3>
                    <p className="text-muted-foreground">
                      Recommended timeframe: {result.estimatedTimeframe}
                    </p>
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Recommended Next Steps:
                  </h4>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-start gap-2 text-muted-foreground"
                      >
                        <span className="text-primary mt-1">•</span>
                        <span>{rec}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="flex-1 bg-primary hover:bg-primary/90 gap-2"
                    data-testid="button-schedule-repair"
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule Repair Now
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="flex-1"
                    onClick={() => window.location.href = 'tel:(530) 226-0701'}
                    data-testid="button-call-now"
                  >
                    Call (530) 226-0701
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Card>
  );
};

export default TriageCalculator;
