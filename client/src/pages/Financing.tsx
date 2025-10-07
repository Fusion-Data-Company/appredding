import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GradientHeading } from '@/components/ui/gradient-heading';
import { SOLAR_PANELS_HERO_IMAGE } from '@/assets_dir/imageExports';
import {
  Calculator,
  CheckCircle2,
  DollarSign,
  FileText,
  Home,
  Percent,
  Phone,
  Shield,
  TrendingUp,
  Clock
} from 'lucide-react';

const Financing = () => {
  const lenders = [
    {
      name: "California Coast Credit Union",
      location: "Anywhere in California",
      terms: "20 years",
      apr: "3.98% - 9.88%",
      loanSize: "$5,000 - $75,000",
      contact: "(858) 495-1637",
      contactName: "CCCU Energy Group: Ray, Zak, Toni & Katya",
      email: "energy@calcoastcu.org"
    },
    {
      name: "Matadors Community Credit Union",
      location: "Anywhere in California",
      terms: "20 years",
      apr: "4.49% - 10.74%",
      loanSize: "$2,500 - $75,000",
      contact: "(818) 993-6328, #3",
      contactName: "MCCU Consumer Lending",
      email: "energy@matadors.org"
    },
    {
      name: "Self-Help Federal Credit Union",
      location: "Anywhere in California",
      terms: "20 years",
      apr: "5.00% - 8.75%",
      loanSize: "$2,500 - $75,000",
      contact: "(877) 369-2828 x7031",
      contactName: "Green Lending Team",
      email: "SHFCU-GreenLending@self-help.org"
    },
    {
      name: "Travis Credit Union",
      location: "Alameda, Colusa, Contra Costa, Merced, Napa, Placer, Sacramento, San Joaquin, Solano, Sonoma, Stanislaus, and Yolo counties",
      terms: "20 years",
      apr: "5.49% - 8.99%",
      loanSize: "$1,000 - $75,000",
      contact: "(707) 469-1008",
      contactName: "GoGreen Lending Team",
      email: "greenteam@traviscu.org"
    }
  ];

  const financingOptions = [
    {
      title: "Cash Purchase",
      icon: <DollarSign className="w-6 h-6" />,
      pros: [
        "Maximum savings and ROI",
        "Immediate ownership",
        "Full federal tax credit (30%)",
        "No interest payments",
        "Increases home value"
      ],
      cons: [
        "High upfront cost",
        "Responsible for maintenance"
      ],
      best_for: "Homeowners with available capital seeking maximum returns"
    },
    {
      title: "Solar Loan",
      icon: <FileText className="w-6 h-6" />,
      pros: [
        "Little to no upfront costs",
        "Own the system immediately",
        "Receive full tax credits",
        "Build equity in system",
        "Fixed monthly payments"
      ],
      cons: [
        "Interest charges",
        "Credit requirements",
        "Responsible for maintenance"
      ],
      best_for: "Homeowners wanting ownership with manageable monthly payments"
    },
    {
      title: "Solar Lease",
      icon: <Home className="w-6 h-6" />,
      pros: [
        "No upfront costs",
        "Maintenance included",
        "Performance guaranteed",
        "Predictable monthly payment"
      ],
      cons: [
        "No tax credits",
        "No ownership",
        "May complicate home sale",
        "Long-term commitment"
      ],
      best_for: "Homeowners wanting solar with no upfront investment or maintenance"
    },
    {
      title: "Power Purchase Agreement (PPA)",
      icon: <TrendingUp className="w-6 h-6" />,
      pros: [
        "No upfront costs",
        "Pay only for power produced",
        "Maintenance included",
        "Performance guaranteed"
      ],
      cons: [
        "No tax credits",
        "No ownership",
        "Rate may increase over time",
        "May complicate home sale"
      ],
      best_for: "Homeowners wanting to pay only for solar energy produced"
    }
  ];

  const financingProcess = [
    {
      step: 1,
      title: "Choose Your Lender",
      description: "Select from our approved GoGreen Home Energy lenders based on your location and credit profile."
    },
    {
      step: 2,
      title: "Apply Directly",
      description: "Apply directly through the lender's website for pre-approval."
    },
    {
      step: 3,
      title: "Submit to GoGreen",
      description: "We'll submit your application to GoGreen for review and approval."
    },
    {
      step: 4,
      title: "Final Documents",
      description: "Once approved, the lender will provide final loan documents for signing."
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative pt-20 pb-10 md:pt-24 md:pb-16">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 20, 0.9), rgba(0, 0, 20, 0.7)), url(${SOLAR_PANELS_HERO_IMAGE})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundAttachment: 'fixed'
          }}
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <GradientHeading level={1} className="text-4xl sm:text-5xl md:text-6xl mb-6" variant="mixed">
                Solar Financing Options
              </GradientHeading>
              <p className="text-xl text-gray-300 mb-8">
                Make solar affordable with flexible financing solutions. 30% federal tax credit available through 2032.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">

        {/* GoGreen Home Energy Financing Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <GradientHeading level={2} className="text-3xl mb-4">
              GoGreen Home Energy Financing
            </GradientHeading>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Advance Power partners with GoGreen Home Energy to offer competitive solar financing through California credit unions.
            </p>
          </div>

          {/* Key Benefits */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700">
              <CardContent className="p-6 text-center">
                <Shield className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
                <h3 className="font-bold text-green-800 dark:text-green-300 mb-2">No Collateral</h3>
                <p className="text-sm text-green-700 dark:text-green-400">Required</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700">
              <CardContent className="p-6 text-center">
                <Percent className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
                <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">APR from 3.98%</h3>
                <p className="text-sm text-blue-700 dark:text-blue-400">Low rates</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700">
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
                <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-2">20 Year Terms</h3>
                <p className="text-sm text-purple-700 dark:text-purple-400">Flexible repayment</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-700">
              <CardContent className="p-6 text-center">
                <CheckCircle2 className="w-8 h-8 text-orange-600 dark:text-orange-400 mx-auto mb-3" />
                <h3 className="font-bold text-orange-800 dark:text-orange-300 mb-2">FICO from 580</h3>
                <p className="text-sm text-orange-700 dark:text-orange-400">Accessible</p>
              </CardContent>
            </Card>
          </div>

          {/* Lender Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {lenders.map((lender, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg">{lender.name}</CardTitle>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{lender.location}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Terms:</span>
                        <span className="text-sm font-semibold">{lender.terms}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">APR:</span>
                        <span className="text-sm font-semibold text-green-600 dark:text-green-400">{lender.apr}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Loan Size:</span>
                        <span className="text-sm font-semibold">{lender.loanSize}</span>
                      </div>
                      <div className="border-t pt-3 mt-3">
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{lender.contactName}</p>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-orange-500" />
                          <a href={`tel:${lender.contact.replace(/\D/g, '')}`} className="text-sm font-semibold text-orange-500 hover:text-orange-600">
                            {lender.contact}
                          </a>
                        </div>
                        <a href={`mailto:${lender.email}`} className="text-xs text-blue-500 hover:text-blue-600">
                          {lender.email}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Financing Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <GradientHeading level={2} className="text-3xl text-center mb-12">
            Simple Financing Process
          </GradientHeading>
          <div className="grid md:grid-cols-4 gap-6">
            {financingProcess.map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* All Financing Options Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <GradientHeading level={2} className="text-3xl text-center mb-12">
            Compare All Financing Options
          </GradientHeading>
          <div className="grid md:grid-cols-2 gap-8">
            {financingOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white">
                        {option.icon}
                      </div>
                      <CardTitle>{option.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">Advantages</h4>
                        <ul className="space-y-1">
                          {option.pros.map((pro, i) => (
                            <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex items-start">
                              <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2">Considerations</h4>
                        <ul className="space-y-1">
                          {option.cons.map((con, i) => (
                            <li key={i} className="text-sm text-gray-600 dark:text-gray-400">• {con}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="pt-3 border-t">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Best for:</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{option.best_for}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tax Credit Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-700">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
                Federal Solar Tax Credit
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-lg mb-3">30% Tax Credit Through 2032</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    The federal solar investment tax credit (ITC) allows you to deduct 30% of the cost of installing a solar energy system from your federal taxes.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Applies to both solar panels and battery storage</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Available for cash purchases and financed systems</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">Can be carried forward if tax liability is less than credit</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-3">Example Savings</h3>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">System Cost:</span>
                        <span className="font-semibold">$25,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Battery Storage:</span>
                        <span className="font-semibold">$15,000</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="text-gray-600 dark:text-gray-400">Total Investment:</span>
                        <span className="font-semibold">$40,000</span>
                      </div>
                      <div className="flex justify-between text-green-600 dark:text-green-400">
                        <span className="font-semibold">30% Tax Credit:</span>
                        <span className="font-bold text-xl">$12,000</span>
                      </div>
                      <div className="flex justify-between border-t pt-2">
                        <span className="font-semibold">Net Cost After Credit:</span>
                        <span className="font-bold text-xl">$28,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardContent className="py-8">
              <h2 className="text-3xl font-bold mb-4">Ready to Go Solar?</h2>
              <p className="text-lg mb-6 opacity-95">
                Let us help you find the perfect financing solution for your solar project
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-orange-600 hover:bg-gray-100"
                  onClick={() => window.location.href = '/roi-calculator'}
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Your Savings
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-orange-700 text-white hover:bg-orange-800"
                  onClick={() => window.location.href = 'tel:5302260701'}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call (530) 226-0701
                </Button>
              </div>
              <p className="text-sm mt-4 opacity-90">
                Think your power bill is high now? Imagine what it will be in 10 years!
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Financing;