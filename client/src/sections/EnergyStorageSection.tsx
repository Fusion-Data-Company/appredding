import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Shield, Thermometer, Wrench, Clock, Zap } from "lucide-react";

const EnergyStorageSection = () => {
  const batteryFeatures = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "10-Year Warranty",
      description: "Comprehensive warranty coverage for peace of mind"
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: "No Maintenance",
      description: "Zero maintenance required throughout system life"
    },
    {
      icon: <Thermometer className="w-6 h-6" />,
      title: "All-Temperature Operation",
      description: "Operates efficiently in all weather conditions"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Higher Efficiency",
      description: "More efficient than traditional lead acid batteries"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Family Energy </span>
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Storage System
            </span>
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Our innovative and affordable Family Energy Storage System is designed to help you take control 
            of your energy usage. Embrace energy freedom today and build your future with advanced lithium technology.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold px-8">
            Learn About Energy Storage
          </Button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Battery Illustration */}
          <div className="relative">
            <div className="relative w-full max-w-md mx-auto">
              {/* Main Battery Unit */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl border border-gray-700">
                <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <Battery className="w-8 h-8 text-white" />
                    <span className="text-white font-semibold">APR Battery System</span>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="flex justify-between text-white text-sm mb-2">
                      <span>Charge Level</span>
                      <span>87%</span>
                    </div>
                    <div className="w-full bg-white/30 rounded-full h-3">
                      <div className="bg-gradient-to-r from-yellow-400 to-green-400 h-3 rounded-full" style={{width: '87%'}}></div>
                    </div>
                  </div>
                </div>
                
                {/* Technical Display */}
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-blue-500/20 rounded-lg p-3">
                    <Clock className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                    <div className="text-blue-400 text-xs">Runtime</div>
                    <div className="text-white font-semibold">12+ hrs</div>
                  </div>
                  <div className="bg-green-500/20 rounded-lg p-3">
                    <Zap className="w-5 h-5 text-green-400 mx-auto mb-1" />
                    <div className="text-green-400 text-xs">Power</div>
                    <div className="text-white font-semibold">5kW</div>
                  </div>
                </div>
              </div>

              {/* Energy Flow Animation */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center animate-pulse">
                <Zap className="w-6 h-6 text-yellow-800" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <h3 className="text-3xl font-bold mb-6">Advanced Lithium Battery Technology</h3>
            <div className="space-y-4 text-blue-100 leading-relaxed mb-8">
              <p>
                Our lithium battery systems use cutting-edge <strong>LiFePO₄ (Lithium Iron Phosphate)</strong> technology, 
                offering superior performance compared to traditional lead-acid batteries.
              </p>
              <p>
                Unlike lead-acid batteries that often face problems with corrosion and water levels requiring 
                constant maintenance, our lithium batteries are completely maintenance-free and come with a 
                comprehensive 10-year warranty.
              </p>
              <p>
                The APR Battery with advanced Battery Management System (BMS) ensures optimal performance, 
                safety, and longevity for your energy storage investment.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {batteryFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="text-yellow-400 mt-1">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{feature.title}</h4>
                    <p className="text-blue-200 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
          <h3 className="text-2xl font-bold text-center mb-8">Lithium vs Lead-Acid Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="pb-3 text-blue-200">Feature</th>
                  <th className="pb-3 text-green-400">APR Lithium (LiFePO₄)</th>
                  <th className="pb-3 text-red-400">Lead-Acid</th>
                </tr>
              </thead>
              <tbody className="space-y-3">
                <tr className="border-b border-white/10">
                  <td className="py-3 text-blue-200">Maintenance</td>
                  <td className="py-3 text-green-400">✓ Zero maintenance required</td>
                  <td className="py-3 text-red-400">✗ Regular water level checks</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 text-blue-200">Lifespan</td>
                  <td className="py-3 text-green-400">✓ 10+ years</td>
                  <td className="py-3 text-red-400">✗ 3-5 years</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 text-blue-200">Temperature Performance</td>
                  <td className="py-3 text-green-400">✓ Excellent in all temps</td>
                  <td className="py-3 text-red-400">✗ Reduced cold weather performance</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-3 text-blue-200">Efficiency</td>
                  <td className="py-3 text-green-400">✓ 95%+ round-trip</td>
                  <td className="py-3 text-red-400">✗ 80% round-trip</td>
                </tr>
                <tr>
                  <td className="py-3 text-blue-200">Safety</td>
                  <td className="py-3 text-green-400">✓ No corrosive gases</td>
                  <td className="py-3 text-red-400">✗ Corrosion and gas issues</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <h3 className="text-2xl font-bold mb-4">Ready to Take Control of Your Energy?</h3>
          <p className="text-blue-200 mb-6">Contact us today to learn more about our Family Energy Storage System</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8">
              Get Storage Quote
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8">
              Download Specifications
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnergyStorageSection;