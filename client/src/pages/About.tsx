import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GradientHeading } from "@/components/ui/gradient-heading";
import PageTransition from "@/components/ui/page-transition";
import { GradientButton } from "@/components/ui/gradient-button";

const About = () => {
  return (
    <PageTransition>
      <Header />
      <main className="pt-24 pb-16">
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

              <div className="bg-gradient-to-b from-gray-100/70 to-gray-200/70 dark:from-gray-800/70 dark:to-gray-900/70 rounded-xl p-8 shadow-xl dark:shadow-blue-600/5 border border-gray-200 dark:border-gray-700/50">
                <h2 className="text-white font-semibold text-2xl mb-4 font-heading">Our Vision</h2>
                <p className="text-gray-200 mb-4">
                  We envision a future where every home and business in Northern California is powered by clean, 
                  renewable solar energy. Our vision is to create a sustainable energy ecosystem that benefits both 
                  our customers and the environment for generations to come.
                </p>
                <p className="text-gray-200">
                  Through continuous innovation and community partnership, we aim to make solar energy accessible and 
                  affordable for all, while maintaining our position as the most trusted solar company in the 
                  Redding area with unmatched expertise and customer service.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-orange-900/20 rounded-2xl overflow-hidden mb-16">
              <div className="bg-gray-900/70 p-8 md:p-12">
                <div className="max-w-4xl mx-auto">
                  <GradientHeading level={2} className="text-3xl md:text-4xl mb-6 text-center" variant="mixed">
                    Our Commitment to Excellence
                  </GradientHeading>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
                      <h3 className="gradient-text-fire text-xl font-bold mb-3 font-heading">Advanced Technology</h3>
                      <p className="text-gray-200">
                        We use the latest solar panel technology including high-efficiency monocrystalline panels, 
                        advanced micro-inverters, and smart monitoring systems. Our installations are designed for 
                        maximum energy production and long-term reliability in Northern California's climate.
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
                      <h3 className="gradient-text-blue text-xl font-bold mb-3 font-heading">Local Expertise</h3>
                      <p className="text-gray-200">
                        With over 25 years serving the Redding area, we understand local building codes, utility 
                        interconnection requirements, and weather patterns. Our team is licensed, bonded, and insured 
                        with deep knowledge of California solar incentives and net metering programs.
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <GradientButton href="/residential-solar" variant="default" size="lg">
                      Get Your Solar Quote
                    </GradientButton>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto mb-16">
              <GradientHeading level={2} className="text-3xl md:text-4xl mb-8 text-center" variant="mixed">
                Our History
              </GradientHeading>
              
              <div className="relative border-l-4 border-gradient-to-b from-blue-500 via-white to-orange-500 pl-8 ml-6">
                <div className="mb-10 relative">
                  <div className="absolute -left-11 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 border-4 border-gray-100 dark:border-gray-900"></div>
                  <h3 className="text-orange-300 font-semibold text-base md:text-lg mb-2 font-heading">1999: Foundation</h3>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                    Advance Power of Redding was founded by Greg Tomsik with a vision to bring reliable solar energy 
                    solutions to Northern California. Starting as a small local business, we focused on quality 
                    installations and exceptional customer service in the emerging solar market.
                  </p>
                </div>
                
                <div className="mb-10 relative">
                  <div className="absolute -left-11 w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-amber-500 border-4 border-gray-100 dark:border-gray-900"></div>
                  <h3 className="text-orange-300 font-semibold text-base md:text-lg mb-2 font-heading">2005: Growth & Expansion</h3>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                    As solar technology improved and California incentives expanded, we grew our team and service area. 
                    We became one of the first certified solar installers in Shasta County, establishing partnerships 
                    with leading manufacturers and earning our California Solar Contractor license.
                  </p>
                </div>
                
                <div className="mb-10 relative">
                  <div className="absolute -left-11 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-orange-500 border-4 border-gray-100 dark:border-gray-900"></div>
                  <h3 className="text-orange-300 font-semibold text-base md:text-lg mb-2 font-heading">2015: Technology Leadership</h3>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                    We embraced the latest solar innovations including micro-inverters, battery storage systems, and 
                    smart monitoring technology. This period marked our transition to offering complete energy solutions 
                    including maintenance, repairs, and system optimization services.
                  </p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-11 w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 border-4 border-gray-100 dark:border-gray-900"></div>
                  <h3 className="text-orange-300 font-semibold text-base md:text-lg mb-2 font-heading">Today</h3>
                  <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                    With over 25 years of experience, Advance Power continues to lead Northern California in residential 
                    and commercial solar installations. We've completed thousands of projects, helping families and 
                    businesses achieve energy independence while supporting our local Redding community.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mb-16">
              <GradientHeading level={2} className="text-3xl md:text-4xl mb-6" variant="mixed">
                Why Choose Advance Power of Redding?
              </GradientHeading>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-b from-red-100/70 to-yellow-200/70 dark:from-red-800/70 dark:to-yellow-900/70 rounded-xl p-6 shadow-lg dark:shadow-orange-600/5 border border-red-200 dark:border-red-700/50">
                  <div className="text-red-500 dark:text-red-400 mb-4">
                    <i className="fas fa-solar-panel text-4xl"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2 dark:text-white text-gray-800 font-heading">25+ Years Experience</h3>
                  <p className="dark:text-gray-300 text-gray-700">
                    Over two decades of solar installation expertise in Northern California, with thousands of successful 
                    residential and commercial projects completed.
                  </p>
                </div>
                
                <div className="bg-gradient-to-b from-yellow-100/70 to-green-200/70 dark:from-yellow-800/70 dark:to-green-900/70 rounded-xl p-6 shadow-lg dark:shadow-yellow-600/5 border border-yellow-200 dark:border-yellow-700/50">
                  <div className="text-yellow-500 dark:text-yellow-400 mb-4">
                    <i className="fas fa-certificate text-4xl"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2 dark:text-white text-gray-800 font-heading">Licensed & Insured</h3>
                  <p className="dark:text-gray-300 text-gray-700">
                    California licensed solar contractor with full bonding and insurance coverage. NABCEP certified 
                    technicians ensure code-compliant installations.
                  </p>
                </div>
                
                <div className="bg-gradient-to-b from-green-100/70 to-blue-200/70 dark:from-green-800/70 dark:to-blue-900/70 rounded-xl p-6 shadow-lg dark:shadow-green-600/5 border border-green-200 dark:border-green-700/50">
                  <div className="text-green-500 dark:text-green-400 mb-4">
                    <i className="fas fa-home text-4xl"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2 dark:text-white text-gray-800 font-heading">Local & Trusted</h3>
                  <p className="dark:text-gray-300 text-gray-700">
                    Family-owned Redding business with deep community roots. We understand local weather patterns, 
                    building codes, and utility requirements.
                  </p>
                </div>
                
                <div className="bg-gradient-to-b from-blue-100/70 to-purple-200/70 dark:from-blue-800/70 dark:to-purple-900/70 rounded-xl p-6 shadow-lg dark:shadow-blue-600/5 border border-blue-200 dark:border-blue-700/50">
                  <div className="text-blue-500 dark:text-blue-400 mb-4">
                    <i className="fas fa-tools text-4xl"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2 dark:text-white text-gray-800 font-heading">Complete Service</h3>
                  <p className="dark:text-gray-300 text-gray-700">
                    Full-service solar solutions including design, installation, maintenance, repairs, and system 
                    monitoring. Lifetime support for your investment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </PageTransition>
  );
};

export default About;