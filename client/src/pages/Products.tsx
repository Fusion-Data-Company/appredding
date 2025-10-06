import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Sun, Zap, Battery, ShieldCheck, Cpu } from 'lucide-react';
import ProductsWaveHero from '@/components/ProductsWaveHero';
import CardCarouselDemo from '@/components/ui/card-carousel-demo';
import SEOHead from '@/components/SEOHead';
import { motion } from 'framer-motion';

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
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center">
              <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.6 }}>
                <Cpu className="mr-3 h-8 w-8 text-orange-400" />
              </motion.div>
              Sol-Ark Hybrid Inverter Comparison Matrix
            </h2>
            <p className="text-gray-400 mb-8 max-w-3xl">
              Industry-leading hybrid inverters with seamless grid-tie to off-grid transition, UL 1741-SA certified for California Rule 21 compliance
            </p>
            <div className="overflow-x-auto">
              <div className="relative rounded-2xl overflow-hidden border border-blue-500/20"
                style={{
                  background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(249, 115, 22, 0.05) 50%, rgba(168, 85, 247, 0.1) 100%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                }}
              >
                {/* Animated shimmer overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.15) 50%, transparent 80%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer1 5s infinite',
                    mixBlendMode: 'overlay'
                  }}
                />

                <table className="w-full text-sm relative">
                  <thead>
                    <tr
                      className="border-b border-gray-700/50"
                      style={{
                        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%)',
                        backdropFilter: 'blur(10px)'
                      }}
                    >
                      <th className="text-left py-4 px-4 text-gray-200 font-bold">Specification</th>
                      <th className="text-center py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                          <span className="text-blue-300 font-bold">Sol-Ark 12K</span>
                        </div>
                      </th>
                      <th className="text-center py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }} />
                          <span className="text-orange-300 font-bold">Sol-Ark 15K</span>
                        </div>
                      </th>
                      <th className="text-center py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.6s' }} />
                          <span className="text-purple-300 font-bold">Sol-Ark 30K (3-phase)</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700/30">
                    {[
                      { spec: "Power Output", col1: "12kW continuous", col2: "15kW continuous", col3: "30kW continuous" },
                      { spec: "Peak Surge (5 sec)", col1: "20kW", col2: "23kW", col3: "46kW" },
                      { spec: "Max PV Input", col1: "19.5kW", col2: "19.5kW", col3: "39kW" },
                      { spec: "Battery Voltage Range", col1: "40-60VDC", col2: "40-60VDC", col3: "120-500VDC" },
                      { spec: "Max Charge Current", col1: "215A", col2: "275A", col3: "200A" },
                      { spec: "Grid-Tie Efficiency", col1: "97.6% CEC", col2: "97.5% CEC", col3: "97.2% CEC" },
                      { spec: "Transfer Time", col1: "<4ms UPS", col2: "<4ms UPS", col3: "<10ms" },
                      { spec: "Warranty", col1: "10 years std", col2: "10 years std", col3: "10 years std" },
                      { spec: "Typical Application", col1: "3-5BR homes", col2: "5BR+/Estate", col3: "Commercial", highlight: true }
                    ].map((row, idx) => (
                      <motion.tr
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                        className={`hover:bg-white/5 transition-all duration-300 group ${row.highlight ? 'bg-gray-900/40' : ''}`}
                      >
                        <td className={`py-3 px-4 ${row.highlight ? 'text-white font-bold' : 'text-gray-200 font-semibold'} group-hover:text-white transition-colors`}>
                          {row.spec}
                        </td>
                        <motion.td
                          className="text-center py-3 px-4 font-mono text-blue-300 group-hover:text-blue-200 transition-colors"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="relative inline-block px-3 py-1 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                            {row.col1}
                          </div>
                        </motion.td>
                        <motion.td
                          className="text-center py-3 px-4 font-mono text-orange-300 group-hover:text-orange-200 transition-colors"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="relative inline-block px-3 py-1 rounded-lg bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors">
                            {row.col2}
                          </div>
                        </motion.td>
                        <motion.td
                          className="text-center py-3 px-4 font-mono text-purple-300 group-hover:text-purple-200 transition-colors"
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className="relative inline-block px-3 py-1 rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors">
                            {row.col3}
                          </div>
                        </motion.td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          {/* LiFePO4 Battery Technology Section */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                <Battery className="mr-3 h-8 w-8 text-orange-400" />
              </motion.div>
              LiFePO4 Battery Selection Guide
            </h2>
            <p className="text-gray-400 mb-8 max-w-3xl">
              Advanced lithium iron phosphate battery systems with 10,000+ cycle life, 95%+ round-trip efficiency, and SGIP rebate eligibility up to $1,000/kWh
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "SimpliPhi PHI 3.8",
                  gradient: "from-blue-500 via-cyan-500 to-blue-600",
                  glowColor: "rgba(59, 130, 246, 0.4)",
                  textColor: "text-blue-300",
                  specs: [
                    { label: "Capacity:", value: "3.8kWh @ 100% DoD" },
                    { label: "Voltage:", value: "51.2V nominal" },
                    { label: "Max Discharge:", value: "150A continuous" },
                    { label: "Round-Trip:", value: "96% efficiency" },
                    { label: "Cycles:", value: "10,000 @ 80% DoD" },
                    { label: "Weight:", value: "82 lbs" },
                    { label: "Warranty:", value: "10 years" }
                  ],
                  ideal: "Modular expansion, critical loads backup"
                },
                {
                  title: "Fortress eVault Max",
                  gradient: "from-green-500 via-emerald-500 to-green-600",
                  glowColor: "rgba(34, 197, 94, 0.4)",
                  textColor: "text-orange-300",
                  specs: [
                    { label: "Capacity:", value: "18.5kWh @ 100% DoD" },
                    { label: "Voltage:", value: "51.2V nominal" },
                    { label: "Max Discharge:", value: "200A continuous" },
                    { label: "Round-Trip:", value: "95% efficiency" },
                    { label: "Cycles:", value: "6,000 @ 80% DoD" },
                    { label: "Weight:", value: "408 lbs" },
                    { label: "Warranty:", value: "10 years" }
                  ],
                  ideal: "Whole-home backup, TOU arbitrage"
                },
                {
                  title: "EG4 LifePower4",
                  gradient: "from-purple-500 via-violet-500 to-purple-600",
                  glowColor: "rgba(168, 85, 247, 0.4)",
                  textColor: "text-purple-300",
                  specs: [
                    { label: "Capacity:", value: "14.3kWh @ 95% DoD" },
                    { label: "Voltage:", value: "51.2V nominal" },
                    { label: "Max Discharge:", value: "200A continuous" },
                    { label: "Round-Trip:", value: "95% efficiency" },
                    { label: "Cycles:", value: "8,000 @ 80% DoD" },
                    { label: "Weight:", value: "330 lbs" },
                    { label: "Warranty:", value: "10 years" }
                  ],
                  ideal: "Budget-conscious, server rack mount"
                }
              ].map((battery, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="relative group"
                >
                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 rounded-2xl blur-lg opacity-50 group-hover:opacity-80 transition-all duration-500"
                    style={{
                      background: battery.glowColor,
                      animation: `pulse ${2.5 + idx * 0.3}s ease-in-out infinite`
                    }}
                  />

                  {/* Card */}
                  <div
                    className={`relative bg-gradient-to-br ${battery.gradient} rounded-2xl p-6 border border-white/20 overflow-hidden transition-all duration-300`}
                    style={{
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)'
                    }}
                  >
                    {/* Glass overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-60"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 60%)'
                      }}
                    />

                    {/* Shimmer */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.5) 50%, transparent 80%)',
                        backgroundSize: '200% 100%',
                        animation: `shimmer${idx + 1} ${4 + idx * 0.5}s infinite`,
                        mixBlendMode: 'overlay'
                      }}
                    />

                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-4 drop-shadow-md">{battery.title}</h3>
                      <div className="space-y-3 text-sm">
                        {battery.specs.map((spec, specIdx) => (
                          <motion.div
                            key={specIdx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 + specIdx * 0.05 }}
                            className="flex justify-between items-center hover:bg-white/10 px-2 py-1 rounded transition-colors"
                          >
                            <span className="text-gray-200">{spec.label}</span>
                            <span className={`${battery.textColor} font-mono font-bold`}>{spec.value}</span>
                          </motion.div>
                        ))}
                        <div className="pt-3 border-t border-white/30">
                          <p className="text-gray-100 text-sm"><strong>Ideal for:</strong> {battery.ideal}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Solar Panel Technology Section */}
          <motion.div
            className="card-elite glow-orange p-8 mb-16 relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Background shimmer */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(110deg, transparent 20%, rgba(249, 115, 22, 0.1) 50%, transparent 80%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer3 6s infinite'
              }}
            />

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 flex items-center relative z-10">
              <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                <Sun className="mr-3 h-8 w-8 text-orange-400" />
              </motion.div>
              Premium Solar Panel Technology Comparison
            </h2>
            <p className="text-gray-400 mb-8 max-w-3xl relative z-10">
              High-efficiency photovoltaic modules with industry-leading warranties and performance specifications optimized for Northern California climate
            </p>
            <div className="grid lg:grid-cols-2 gap-8 relative z-10">
              {[
                {
                  title: "REC Alpha Pure-RX 470W",
                  gradient: "from-amber-500 via-yellow-500 to-amber-600",
                  glowColor: "rgba(245, 158, 11, 0.4)",
                  specs: [
                    { label: "Technology:", value: "HJT N-Type" },
                    { label: "Efficiency:", value: "22.6%" },
                    { label: "Degradation:", value: "0.25%/year" },
                    { label: "Temp Coefficient:", value: "-0.24%/°C" },
                    { label: "Warranty:", value: "25yr product/92% power" }
                  ]
                },
                {
                  title: "QCells Q.TRON BLK M-G2+ 480W",
                  gradient: "from-orange-500 via-amber-500 to-orange-600",
                  glowColor: "rgba(249, 115, 22, 0.4)",
                  specs: [
                    { label: "Technology:", value: "Q.ANTUM NEO" },
                    { label: "Efficiency:", value: "21.4%" },
                    { label: "Degradation:", value: "0.45%/year" },
                    { label: "Temp Coefficient:", value: "-0.30%/°C" },
                    { label: "Warranty:", value: "25yr product/86% power" }
                  ]
                }
              ].map((panel, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="relative group"
                >
                  {/* Glow */}
                  <div
                    className="absolute inset-0 rounded-2xl blur-lg opacity-50 group-hover:opacity-80 transition-all duration-500"
                    style={{
                      background: panel.glowColor
                    }}
                  />

                  {/* Card */}
                  <div
                    className={`relative bg-gradient-to-br ${panel.gradient} rounded-2xl p-6 border border-white/20 overflow-hidden`}
                    style={{
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                    }}
                  >
                    {/* Glass overlay */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, transparent 60%)'
                      }}
                    />

                    {/* Shimmer */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: 'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.6) 50%, transparent 80%)',
                        backgroundSize: '200% 100%',
                        animation: `shimmer${idx + 1} ${4 + idx * 0.5}s infinite`,
                        mixBlendMode: 'overlay'
                      }}
                    />

                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white mb-4 drop-shadow-md">{panel.title}</h3>
                      <div className="space-y-3 text-sm">
                        {panel.specs.map((spec, specIdx) => (
                          <motion.div
                            key={specIdx}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 + specIdx * 0.05 }}
                            className="flex justify-between items-center hover:bg-white/10 px-3 py-2 rounded transition-colors"
                          >
                            <span className="text-gray-100">{spec.label}</span>
                            <span className="text-yellow-200 font-mono font-bold">{spec.value}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

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
