import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Sun, Zap, Battery, ShieldCheck, Cpu } from 'lucide-react';
import ProductsWaveHero from '@/components/ProductsWaveHero';
import CardCarouselDemo from '@/components/ui/card-carousel-demo';
import SEOHead from '@/components/SEOHead';

export default function Products() {
  const productsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Solar Products & Energy Systems",
    "description": "Premium solar panels, battery storage systems, and hybrid inverters from Advance Power Redding",
    "itemListElement": [
      {
        "@type": "Product",
        "position": 1,
        "name": "Sol-Ark 12K Hybrid Inverter",
        "description": "12kW continuous power hybrid inverter with seamless grid-tie to off-grid transition",
        "brand": { "@type": "Brand", "name": "Sol-Ark" }
      },
      {
        "@type": "Product",
        "position": 2,
        "name": "Sol-Ark 15K Hybrid Inverter",
        "description": "15kW continuous power hybrid inverter ideal for larger residential and small commercial applications",
        "brand": { "@type": "Brand", "name": "Sol-Ark" }
      },
      {
        "@type": "Product",
        "position": 3,
        "name": "High-Efficiency Solar Panels",
        "description": "Premium solar panels with 25-year warranty and 99.9% efficiency rating",
        "brand": { "@type": "Brand", "name": "Advance Power Redding" }
      }
    ]
  };

  return (
    <MainLayout fullWidth={true}>
      <SEOHead
        title="Solar Products | Panels, Batteries & Inverters | APR"
        description="Premium solar panels, Sol-Ark hybrid inverters (12K/15K/30K), battery storage systems. 25-year warranties, 99.9% efficiency. Quality guaranteed in CA."
        keywords={['solar panels', 'Sol-Ark inverters', 'battery storage systems', 'hybrid inverters', 'solar products Redding', 'solar equipment Northern California', '12K inverter', '15K inverter']}
        url="/products"
        type="website"
        structuredData={productsSchema}
      />
      {/* Products Wave Hero Section */}
      <ProductsWaveHero 
        tagline="Premium Solar Solutions & Energy Systems"
        title="Solar Products"
        subtitle="Discover our comprehensive range of cutting-edge solar products and energy solutions. From high-efficiency panels to advanced battery storage systems, we deliver the technology that powers your sustainable future."
        stats={[
          { value: "99.9%", label: "Product Efficiency" },
          { value: "25yr", label: "Warranty Coverage" },
          { value: "100%", label: "Quality Guaranteed" }
        ]}
      />

      {/* Featured Solar Products Carousel */}
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <CardCarouselDemo />
        </div>
      </div>

      <div className="relative bg-gray-900">
        <div className="container mx-auto px-4 py-16">
          
          {/* Sol-Ark Inverter Comparison Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center">
              <Cpu className="mr-3 h-8 w-8 text-orange-400" />
              Sol-Ark Hybrid Inverter Comparison Matrix
            </h2>
            <p className="text-gray-400 mb-8 max-w-3xl">
              Industry-leading hybrid inverters with seamless grid-tie to off-grid transition, UL 1741-SA certified for California Rule 21 compliance
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm bg-gray-800/40 rounded-xl overflow-hidden">
                <thead className="bg-gray-900/60">
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400">Specification</th>
                    <th className="text-center py-3 px-4 text-blue-400">Sol-Ark 12K</th>
                    <th className="text-center py-3 px-4 text-green-400">Sol-Ark 15K</th>
                    <th className="text-center py-3 px-4 text-purple-400">Sol-Ark 30K (3-phase)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700/50">
                  <tr>
                    <td className="py-3 px-4 text-gray-300 font-semibold">Power Output</td>
                    <td className="text-center py-3 px-4 font-mono text-blue-300">12kW continuous</td>
                    <td className="text-center py-3 px-4 font-mono text-green-300">15kW continuous</td>
                    <td className="text-center py-3 px-4 font-mono text-purple-300">30kW continuous</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-300">Peak Surge (5 sec)</td>
                    <td className="text-center py-3 px-4 font-mono text-blue-300">20kW</td>
                    <td className="text-center py-3 px-4 font-mono text-green-300">23kW</td>
                    <td className="text-center py-3 px-4 font-mono text-purple-300">46kW</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-300">Max PV Input</td>
                    <td className="text-center py-3 px-4 font-mono text-blue-300">19.5kW</td>
                    <td className="text-center py-3 px-4 font-mono text-green-300">19.5kW</td>
                    <td className="text-center py-3 px-4 font-mono text-purple-300">39kW</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-300">Battery Voltage Range</td>
                    <td className="text-center py-3 px-4 font-mono text-blue-300">40-60VDC</td>
                    <td className="text-center py-3 px-4 font-mono text-green-300">40-60VDC</td>
                    <td className="text-center py-3 px-4 font-mono text-purple-300">120-500VDC</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-300">Max Charge Current</td>
                    <td className="text-center py-3 px-4 font-mono text-blue-300">215A</td>
                    <td className="text-center py-3 px-4 font-mono text-green-300">275A</td>
                    <td className="text-center py-3 px-4 font-mono text-purple-300">200A</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-300">Grid-Tie Efficiency</td>
                    <td className="text-center py-3 px-4 font-mono text-blue-300">97.6% CEC</td>
                    <td className="text-center py-3 px-4 font-mono text-green-300">97.5% CEC</td>
                    <td className="text-center py-3 px-4 font-mono text-purple-300">97.2% CEC</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-300">Transfer Time</td>
                    <td className="text-center py-3 px-4 font-mono text-blue-300">&lt;4ms UPS</td>
                    <td className="text-center py-3 px-4 font-mono text-green-300">&lt;4ms UPS</td>
                    <td className="text-center py-3 px-4 font-mono text-purple-300">&lt;10ms</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-300">Warranty</td>
                    <td className="text-center py-3 px-4 font-mono text-blue-300">10 years std</td>
                    <td className="text-center py-3 px-4 font-mono text-green-300">10 years std</td>
                    <td className="text-center py-3 px-4 font-mono text-purple-300">10 years std</td>
                  </tr>
                  <tr className="bg-gray-900/40">
                    <td className="py-3 px-4 text-white font-semibold">Typical Application</td>
                    <td className="text-center py-3 px-4 text-blue-300">3-5BR homes</td>
                    <td className="text-center py-3 px-4 text-green-300">5BR+/Estate</td>
                    <td className="text-center py-3 px-4 text-purple-300">Commercial</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* LiFePO4 Battery Technology Section */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center">
              <Battery className="mr-3 h-8 w-8 text-green-400" />
              LiFePO4 Battery Selection Guide
            </h2>
            <p className="text-gray-400 mb-8 max-w-3xl">
              Advanced lithium iron phosphate battery systems with 10,000+ cycle life, 95%+ round-trip efficiency, and SGIP rebate eligibility up to $1,000/kWh
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">SimpliPhi PHI 3.8</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Capacity:</span>
                    <span className="text-blue-300 font-mono">3.8kWh @ 100% DoD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Voltage:</span>
                    <span className="text-blue-300 font-mono">51.2V nominal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Discharge:</span>
                    <span className="text-blue-300 font-mono">150A continuous</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Round-Trip:</span>
                    <span className="text-blue-300 font-mono">96% efficiency</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cycles:</span>
                    <span className="text-blue-300 font-mono">10,000 @ 80% DoD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Weight:</span>
                    <span className="text-blue-300 font-mono">82 lbs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Warranty:</span>
                    <span className="text-blue-300 font-mono">10 years</span>
                  </div>
                  <div className="pt-3 border-t border-blue-500/30">
                    <p className="text-gray-300">Ideal for: Modular expansion, critical loads backup</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Fortress eVault Max</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Capacity:</span>
                    <span className="text-green-300 font-mono">18.5kWh @ 100% DoD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Voltage:</span>
                    <span className="text-green-300 font-mono">51.2V nominal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Discharge:</span>
                    <span className="text-green-300 font-mono">200A continuous</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Round-Trip:</span>
                    <span className="text-green-300 font-mono">95% efficiency</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cycles:</span>
                    <span className="text-green-300 font-mono">6,000 @ 80% DoD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Weight:</span>
                    <span className="text-green-300 font-mono">408 lbs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Warranty:</span>
                    <span className="text-green-300 font-mono">10 years</span>
                  </div>
                  <div className="pt-3 border-t border-green-500/30">
                    <p className="text-gray-300">Ideal for: Whole-home backup, TOU arbitrage</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/30 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">EG4 LifePower4</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Capacity:</span>
                    <span className="text-purple-300 font-mono">14.3kWh @ 95% DoD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Voltage:</span>
                    <span className="text-purple-300 font-mono">51.2V nominal</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Max Discharge:</span>
                    <span className="text-purple-300 font-mono">200A continuous</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Round-Trip:</span>
                    <span className="text-purple-300 font-mono">95% efficiency</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Cycles:</span>
                    <span className="text-purple-300 font-mono">8,000 @ 80% DoD</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Weight:</span>
                    <span className="text-purple-300 font-mono">330 lbs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Warranty:</span>
                    <span className="text-purple-300 font-mono">10 years</span>
                  </div>
                  <div className="pt-3 border-t border-purple-500/30">
                    <p className="text-gray-300">Ideal for: Budget-conscious, server rack mount</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Solar Panel Technology Section */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center">
              <Sun className="mr-3 h-8 w-8 text-yellow-400" />
              Premium Solar Panel Technology Comparison
            </h2>
            <p className="text-gray-400 mb-8 max-w-3xl">
              High-efficiency photovoltaic modules with industry-leading warranties and performance specifications optimized for Northern California climate
            </p>
            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">REC Alpha Pure-RX 470W</h3>
                <div className="bg-black/30 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Technology:</span>
                    <span className="text-yellow-300 font-mono">HJT N-Type</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Efficiency:</span>
                    <span className="text-yellow-300 font-mono">22.6%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Degradation:</span>
                    <span className="text-yellow-300 font-mono">0.25%/year</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Temp Coefficient:</span>
                    <span className="text-yellow-300 font-mono">-0.24%/°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Warranty:</span>
                    <span className="text-yellow-300 font-mono">25yr product/92% power</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">QCells Q.TRON BLK M-G2+ 480W</h3>
                <div className="bg-black/30 rounded-lg p-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Technology:</span>
                    <span className="text-yellow-300 font-mono">Q.ANTUM NEO</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Efficiency:</span>
                    <span className="text-yellow-300 font-mono">21.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Degradation:</span>
                    <span className="text-yellow-300 font-mono">0.45%/year</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Temp Coefficient:</span>
                    <span className="text-yellow-300 font-mono">-0.30%/°C</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Warranty:</span>
                    <span className="text-yellow-300 font-mono">25yr product/86% power</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-500/30 rounded-2xl p-8 md:p-12 text-center">
            <ShieldCheck className="h-12 w-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-white">
              Ready to Go Solar?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Contact us today for a free consultation and quote. Our team of experts will help you design the perfect solar system for your needs with the latest technology.
            </p>
            <Link href="/contact">
              <Button 
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white"
                data-testid="button-get-consultation"
              >
                Get Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
