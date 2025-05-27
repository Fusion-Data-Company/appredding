import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Building2, Battery, Zap, Lightbulb, Wrench } from "lucide-react";

const SolarServicesSection = () => {
  const services = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "Residential Solar Solutions",
      description: "Custom solar photovoltaic installations for homes. Over 20 years of expertise serving local families. High-quality, reliable solar solutions that meet your energy needs and fit your budget.",
      features: ["Grid-tied systems", "Net metering setup", "25-year warranty", "Budget-friendly options"],
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Commercial Solar Solutions", 
      description: "Solar power systems for businesses. We specialize in designing, building, and installing top-tier solar power systems tailored to the unique energy needs of your business.",
      features: ["Custom design", "ROI optimization", "Tax incentives", "Large-scale capability"],
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Battery className="w-8 h-8" />,
      title: "Hybrid Solar Systems",
      description: "Crafting tailor-made hybrid solar solutions that seamlessly integrate with your lifestyle and energy needs. Combines on-grid solar with off-grid capability via batteries.",
      features: ["Backup power", "Grid independence", "Seamless integration", "Uninterrupted power"],
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lithium Battery Services",
      description: "Advanced energy storage installations using lithium-ion battery technology. Efficient and long-lasting energy storage with 10-year warranty and no maintenance required.",
      features: ["LiFePO₄ technology", "10-year warranty", "No maintenance", "All-temperature operation"],
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Energy Conservation Services",
      description: "Help reduce energy costs and boost efficiency with customized solar solutions and system upgrades. Energy audits, LED lighting, and HVAC optimizations.",
      features: ["Energy audits", "LED upgrades", "HVAC optimization", "Usage reduction"],
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: "Maintenance & Repair",
      description: "Professional maintenance and repair services for all solar systems. Keeping your investment performing at peak efficiency with expert care and support.",
      features: ["System monitoring", "Performance optimization", "Repair services", "Warranty support"],
      color: "from-red-500 to-red-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900">Our Solar </span>
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Services
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The North State's leader in renewable energy design, installation, service & technical expertise. 
            Over 20 years of experience serving Redding and surrounding areas.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center justify-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full hover:bg-yellow-50 border-yellow-400 text-yellow-700 hover:text-yellow-800"
                >
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-8 rounded-2xl shadow-xl max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Solar Journey?</h3>
            <p className="text-xl mb-6 text-yellow-100">
              Get a free consultation and quote from Redding's most trusted solar professionals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-yellow-600 hover:bg-yellow-50 px-8">
                <span className="mr-2">📞</span>
                Call (530) 226-0701
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
                Get Free Quote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarServicesSection;