import React from 'react';
import { Link } from 'wouter';
import { Helmet } from 'react-helmet';
import { 
  Home as HomeIcon,
  Building2,
  HardHat,
  Server,
  DollarSign,
  Shield,
  Anchor,
  Droplets,
  Factory,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const applications = [
  {
    icon: <HomeIcon className="h-8 w-8" />,
    title: "Mobile Homes",
    description: "Affordable solar solutions designed specifically for mobile and manufactured homes",
    href: "/solutions/mobile-homes",
    benefits: ["Lower energy bills", "Specialized mounting systems", "Quick installation"],
    color: "from-green-500 to-emerald-600"
  },
  {
    icon: <Building2 className="h-8 w-8" />,
    title: "Municipalities",
    description: "Complete solar systems for government buildings and public facilities",
    href: "/solutions/municipalities",
    benefits: ["Budget-friendly", "Grant assistance", "Community impact"],
    color: "from-blue-500 to-indigo-600"
  },
  {
    icon: <HardHat className="h-8 w-8" />,
    title: "Construction",
    description: "Portable power solutions for construction sites and temporary installations",
    href: "/solutions/construction",
    benefits: ["Portable systems", "Reduced generator costs", "Silent operation"],
    color: "from-orange-500 to-red-600"
  },
  {
    icon: <Server className="h-8 w-8" />,
    title: "Data Centers",
    description: "Reliable backup power and energy efficiency for critical data infrastructure",
    href: "/solutions/data-centers",
    benefits: ["99.99% uptime", "Cooling efficiency", "Scalable solutions"],
    color: "from-purple-500 to-pink-600"
  },
  {
    icon: <DollarSign className="h-8 w-8" />,
    title: "Financial Centers",
    description: "Premium solar installations for banks and financial institutions",
    href: "/solutions/financial-centers",
    benefits: ["ROI optimization", "Professional appearance", "Security integration"],
    color: "from-yellow-500 to-amber-600"
  }
];

const Applications = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Helmet>
        <title>Solar Solutions by Industry | Advance Power Inc.</title>
        <meta name="description" content="Explore our specialized solar solutions for mobile homes, municipalities, construction sites, data centers, and more. Custom solar systems for every industry." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-500 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              Solar Solutions for Every Industry
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Discover our specialized solar solutions tailored to meet the unique energy needs 
              of various industries and applications.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-gray-100 font-semibold shadow-lg"
                >
                  Get Industry-Specific Quote
                </Button>
              </Link>
              <Link href="/resources/roi-calculator">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white/10"
                >
                  Calculate Your Savings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Industry-Specific Solar Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We understand that every industry has unique energy requirements. Our specialized solutions 
              are designed to maximize efficiency and ROI for your specific application.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applications.map((app) => (
              <div
                key={app.href}
                className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Gradient Header */}
                <div className={`bg-gradient-to-r ${app.color} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    {app.icon}
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{app.title}</h3>
                  <p className="text-white/90">{app.description}</p>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Benefits:</h4>
                  <ul className="space-y-2 mb-6">
                    {app.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <div className="h-2 w-2 bg-orange-500 rounded-full mr-3"></div>
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <Link href={app.href}>
                    <Button 
                      className="w-full bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-600 hover:to-blue-700"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Why Choose Advance Power for Your Industry
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Factory className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Industry Expertise</h3>
                <p className="text-gray-600">
                  Over 20 years of experience providing specialized solar solutions across various industries
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Certified & Insured</h3>
                <p className="text-gray-600">
                  Fully licensed, bonded, and insured with all necessary certifications for commercial projects
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-10 w-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Financing Available</h3>
                <p className="text-gray-600">
                  Flexible financing options and assistance with grants and incentives for your industry
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Power Your Industry with Solar?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Let's discuss how our specialized solar solutions can reduce your energy costs 
            and improve your operations.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-gray-100 font-semibold shadow-lg"
              >
                Schedule Consultation
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button
                size="lg"
                variant="outline"
                className="text-white border-white hover:bg-white/10"
              >
                View Our Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Applications;