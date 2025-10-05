import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Sun, Zap, Battery, ShieldCheck, ArrowRight } from 'lucide-react';
import ProductsWaveHero from '@/components/ProductsWaveHero';

export default function Products() {
  return (
    <MainLayout fullWidth={true}>
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

      <div className="relative">

        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Our Solar Solutions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
                <Sun className="h-6 w-6 text-amber-600 dark:text-amber-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Solar Panels</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                High-efficiency photovoltaic panels designed for maximum energy production and durability.
              </p>
              <Link href="/contact">
                <Button variant="ghost" className="text-amber-600 hover:text-amber-700 dark:text-amber-500">
                  Learn More →
                </Button>
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                <Battery className="h-6 w-6 text-blue-600 dark:text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Energy Storage</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Advanced battery systems to store excess solar energy for use when you need it most.
              </p>
              <Link href="/contact">
                <Button variant="ghost" className="text-amber-600 hover:text-amber-700 dark:text-amber-500">
                  Learn More →
                </Button>
              </Link>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-green-600 dark:text-green-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Inverters</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                State-of-the-art inverters that convert solar DC power to usable AC electricity efficiently.
              </p>
              <Link href="/contact">
                <Button variant="ghost" className="text-amber-600 hover:text-amber-700 dark:text-amber-500">
                  Learn More →
                </Button>
              </Link>
            </div>
          </div>

          <div className="mt-16 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-800 rounded-2xl p-8 md:p-12 text-center">
            <ShieldCheck className="h-12 w-12 text-amber-600 dark:text-amber-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              Ready to Go Solar?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Contact us today for a free consultation and quote. Our team of experts will help you design the perfect solar system for your needs.
            </p>
            <Link href="/contact">
              <Button 
                size="lg"
                className="bg-amber-600 hover:bg-amber-700 text-white"
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
