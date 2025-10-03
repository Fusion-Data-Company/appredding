import React from "react";
import { Link } from "wouter";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Sun, Home, Building2, Battery, Zap, Settings } from "lucide-react";

const Applications = () => {
  const applications = [
    {
      id: "residential",
      title: "Residential Solar",
      description: "Complete solar solutions for homes throughout Northern California.",
      icon: <Home className="w-12 h-12" />,
      link: "/residential-solar",
      color: "from-orange-600 to-red-600"
    },
    {
      id: "commercial",
      title: "Commercial Solar",
      description: "Large-scale solar installations for businesses and organizations.",
      icon: <Building2 className="w-12 h-12" />,
      link: "/commercial-solar",
      color: "from-blue-600 to-cyan-500"
    },
    {
      id: "battery-storage",
      title: "Battery Storage",
      description: "Energy storage solutions for backup power and grid independence.",
      icon: <Battery className="w-12 h-12" />,
      link: "/battery-storage",
      color: "from-green-600 to-emerald-500"
    },
    {
      id: "hybrid-systems",
      title: "Hybrid Systems",
      description: "All-in-one solar and storage systems for maximum energy independence.",
      icon: <Zap className="w-12 h-12" />,
      link: "/hybrid-solar",
      color: "from-purple-600 to-pink-500"
    },
    {
      id: "maintenance",
      title: "Maintenance & Service",
      description: "Professional maintenance and repair services for existing solar systems.",
      icon: <Settings className="w-12 h-12" />,
      link: "/maintenance",
      color: "from-yellow-600 to-amber-500"
    },
    {
      id: "repairs",
      title: "Solar Repairs",
      description: "Expert repair services to restore your solar system to peak performance.",
      icon: <Sun className="w-12 h-12" />,
      link: "/repairs",
      color: "from-indigo-600 to-blue-500"
    }
  ];

  return (
    <MainLayout>
      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Solar Solutions for Every Need</h1>
              <p className="text-xl text-slate-300 mb-8">
                From residential installations to commercial projects, Advance Power of Redding provides 
                comprehensive solar energy solutions throughout Northern California.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {applications.map((app) => (
                <Link key={app.id} href={app.link}>
                  <a className="block h-full">
                    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden h-full hover:bg-slate-800/70 hover:border-slate-600 transition-all duration-300 hover:scale-105">
                      <div className={`h-32 bg-gradient-to-r ${app.color} flex items-center justify-center text-white`}>
                        {app.icon}
                      </div>
                      <div className="p-6">
                        <h2 className="text-2xl font-bold mb-3 text-white">{app.title}</h2>
                        <p className="mb-4 text-slate-300">{app.description}</p>
                        <div className="flex justify-between items-center">
                          <Button className="bg-primary/80 hover:bg-primary">
                            Learn More
                          </Button>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-800/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center text-white">Why Choose Advance Power of Redding?</h2>
              <p className="text-xl mb-8 text-center text-slate-300">
                With over 25 years of experience, we provide expert solar solutions tailored to your specific 
                energy needs and budget throughout Northern California.
              </p>
              
              <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-8 backdrop-blur-sm">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                    <div className="text-orange-400 text-3xl mb-3">25+</div>
                    <h3 className="text-lg font-bold mb-2 text-white">Years Experience</h3>
                    <p className="text-sm text-slate-300">Trusted solar experts since 1999 serving Northern California.</p>
                  </div>
                  
                  <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                    <div className="text-orange-400 text-3xl mb-3">500+</div>
                    <h3 className="text-lg font-bold mb-2 text-white">Installations</h3>
                    <p className="text-sm text-slate-300">Residential and commercial solar projects completed.</p>
                  </div>
                  
                  <div className="bg-slate-800/50 rounded-lg p-4 text-center">
                    <div className="text-orange-400 text-3xl mb-3">100%</div>
                    <h3 className="text-lg font-bold mb-2 text-white">Satisfaction</h3>
                    <p className="text-sm text-slate-300">Licensed, bonded, and insured for your peace of mind.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6 text-white">Ready to Get Started?</h2>
              <p className="text-xl mb-8 text-slate-300">
                Contact our solar experts today for a free consultation and discover how we can help you 
                reduce energy costs with clean, renewable solar power.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-primary hover:bg-primary/90 px-8 py-6 text-lg">
                  Get Free Quote
                </Button>
                <Button variant="outline" className="px-8 py-6 text-lg border-slate-600 text-white hover:bg-slate-800">
                  Call (530) 226-0701
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
};

export default Applications;
