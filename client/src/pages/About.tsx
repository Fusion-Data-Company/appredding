import MainLayout from "@/components/layout/MainLayout";
import { GradientHeading } from "@/components/ui/gradient-heading";
import PageTransition from "@/components/ui/page-transition";
import { GradientButton } from "@/components/ui/gradient-button";
import AboutAdvancePowerSection from "@/sections/AboutAdvancePowerSection";

const About = () => {
  return (
    <PageTransition>
      <MainLayout>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-orange-500/10 pointer-events-none"></div>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <GradientHeading level={1} className="text-4xl md:text-5xl mb-4" variant="mixed">
                About Advance Power of Redding
              </GradientHeading>
              <p className="text-lg dark:text-gray-300 text-gray-700 max-w-3xl mx-auto">
                Excellence in solar energy solutions since 1999, delivering innovative renewable energy systems for Northern California
                with over 25 years of experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
              <div className="bg-gradient-to-b from-gray-100/70 to-gray-200/70 dark:from-gray-800/70 dark:to-gray-900/70 rounded-xl p-8 shadow-xl dark:shadow-orange-600/5 border border-gray-200 dark:border-gray-700/50">
                {/* Company Image */}
                <div className="flex justify-center mb-6">
                  <img 
                    src="/images/APR-Logo-White-New-300x222.png" 
                    alt="Advance Power Redding Company Logo" 
                    className="h-24 w-auto object-contain bg-white p-3 rounded-lg shadow-md"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
                <h2 className="text-white font-semibold text-2xl mb-4 font-heading">Our Mission</h2>
                <p className="text-gray-200 mb-4">
                  At Advance Power of Redding, our mission is to revolutionize Northern California's energy landscape through 
                  cutting-edge solar technology, exceptional service, and environmental stewardship. We are committed to providing 
                  reliable, cost-effective renewable energy solutions that reduce carbon footprints and energy costs.
                </p>
                <p className="text-gray-200">
                  We strive to be the leading solar installer in the region, empowering homeowners and businesses with 
                  sustainable energy independence while creating jobs and supporting our local Redding community through 
                  the clean energy transition.
                </p>
              </div>

              <div className="bg-gradient-to-b from-gray-100/70 to-gray-200/70 dark:from-gray-800/70 dark:to-gray-900/70 rounded-xl p-8 shadow-xl dark:shadow-orange-600/5 border border-gray-200 dark:border-gray-700/50">
                <h2 className="text-white font-semibold text-2xl mb-4 font-heading">25+ Years of Excellence</h2>
                <p className="text-gray-200 mb-4">
                  Since 1999, Advance Power has been at the forefront of renewable energy innovation in Northern California. 
                  Our team of certified professionals brings decades of combined experience in solar design, installation, 
                  and maintenance services.
                </p>
                <ul className="space-y-2 text-gray-200">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                    Licensed and bonded solar contractors
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                    NABCEP certified installation team
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                    Local Redding business serving North State
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                    Comprehensive warranty and support
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-b from-gray-100/70 to-gray-200/70 dark:from-gray-800/70 dark:to-gray-900/70 rounded-xl p-8 mb-16 shadow-xl dark:shadow-orange-600/5 border border-gray-200 dark:border-gray-700/50">
              <h2 className="text-white font-semibold text-3xl mb-6 font-heading text-center">Our Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM9 18v-6h2v6H9z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="text-white font-semibold text-xl mb-2">Residential Solar</h3>
                  <p className="text-gray-300 text-sm">
                    Custom home solar systems designed for maximum efficiency and savings
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 5a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="text-white font-semibold text-xl mb-2">Commercial Solar</h3>
                  <p className="text-gray-300 text-sm">
                    Large-scale solar installations for businesses and organizations
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                    </svg>
                  </div>
                  <h3 className="text-white font-semibold text-xl mb-2">Battery Storage</h3>
                  <p className="text-gray-300 text-sm">
                    Energy storage solutions for backup power and grid independence
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-white font-semibold text-3xl mb-6 font-heading">Ready to Get Started?</h2>
              <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
                Join hundreds of satisfied customers who have made the switch to clean, renewable energy. 
                Contact us today for a free consultation and custom quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GradientButton 
                  href="/contact" 
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                >
                  Get Free Quote
                </GradientButton>
                <GradientButton 
                  href="/roi-calculator" 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Calculate Savings
                </GradientButton>
              </div>
            </div>
          </div>
        </section>
        
        <AboutAdvancePowerSection />
      </MainLayout>
    </PageTransition>
  );
};

export default About;