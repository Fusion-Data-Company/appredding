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
                About Praetorian SmartCoat
              </GradientHeading>
              <p className="text-lg dark:text-gray-300 text-gray-700 max-w-3xl mx-auto">
                Excellence in protective coatings since 2010, delivering innovative solutions for diverse applications
                across North America.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
              <div className="bg-gradient-to-b from-gray-100/70 to-gray-200/70 dark:from-gray-800/70 dark:to-gray-900/70 rounded-xl p-8 shadow-xl dark:shadow-orange-600/5 border border-gray-200 dark:border-gray-700/50">
                <h2 className="gradient-text-combined text-2xl md:text-3xl font-bold mb-4 font-heading">Our Mission</h2>
                <p className="dark:text-gray-300 text-gray-700 mb-4">
                  At Praetorian SmartCoat Solutions, our mission is to revolutionize the protective coatings industry through innovation,
                  quality, and environmental responsibility. We are committed to developing cutting-edge coating
                  technologies that offer superior protection while minimizing environmental impact.
                </p>
                <p className="dark:text-gray-300 text-gray-700">
                  We strive to be the industry leader in sustainable protective solutions, providing our customers with
                  products that extend the life of their assets, reduce maintenance costs, and contribute to a healthier
                  planet.
                </p>
              </div>

              <div className="bg-gradient-to-b from-gray-100/70 to-gray-200/70 dark:from-gray-800/70 dark:to-gray-900/70 rounded-xl p-8 shadow-xl dark:shadow-blue-600/5 border border-gray-200 dark:border-gray-700/50">
                <h2 className="gradient-text-combined text-2xl md:text-3xl font-bold mb-4 font-heading">Our Vision</h2>
                <p className="dark:text-gray-300 text-gray-700 mb-4">
                  We envision a world where protective coatings not only safeguard assets but actively contribute to
                  sustainability goals. Our vision is to create a future where advanced materials science meets
                  environmental stewardship.
                </p>
                <p className="dark:text-gray-300 text-gray-700">
                  Through continuous research and development, we aim to push the boundaries of what protective coatings
                  can achieve, developing solutions that address the evolving challenges of industries ranging from
                  marine environments to municipal infrastructure.
                </p>
              </div>
            </div>

            <div className="bg-[url('/images/optimized/diamond-plate-fire-water.jpg')] bg-cover bg-center rounded-2xl overflow-hidden mb-16">
              <div className="bg-gray-900/70 p-8 md:p-12">
                <div className="max-w-4xl mx-auto">
                  <GradientHeading level={2} className="text-3xl md:text-4xl mb-6 text-center" variant="mixed">
                    Our Commitment to Innovation
                  </GradientHeading>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
                      <h3 className="gradient-text-fire text-xl font-bold mb-3 font-heading">Research & Development</h3>
                      <p className="text-gray-200">
                        Our state-of-the-art R&D facility is dedicated to pushing the boundaries of coating technology.
                        With a team of materials scientists and chemical engineers, we continuously develop and test new
                        formulations that offer enhanced protection, longevity, and environmental benefits.
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
                      <h3 className="gradient-text-blue text-xl font-bold mb-3 font-heading">Sustainable Practices</h3>
                      <p className="text-gray-200">
                        Environmental responsibility is at the core of our business. We have invested in eco-friendly
                        manufacturing processes, use renewable energy where possible, and formulate our products to
                        minimize VOCs and other harmful substances without compromising performance.
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <GradientButton href="/applications" variant="default" size="lg">
                      Explore Our Applications
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
                  <h3 className="gradient-text-blue text-xl font-bold mb-2 font-heading">2010: Foundation</h3>
                  <p className="dark:text-gray-300 text-gray-700">
                    Praetorian Protective Coatings was founded with a vision to create advanced protection solutions for
                    industrial applications. Starting with a small team of experts, we focused on developing our first
                    generation of high-performance coatings.
                  </p>
                </div>
                
                <div className="mb-10 relative">
                  <div className="absolute -left-11 w-6 h-6 rounded-full bg-gradient-to-r from-blue-400 to-amber-500 border-4 border-gray-100 dark:border-gray-900"></div>
                  <h3 className="gradient-text-blue text-xl font-bold mb-2 font-heading">2015: Expansion</h3>
                  <p className="dark:text-gray-300 text-gray-700">
                    With growing demand for our innovative solutions, we expanded our operations across North America.
                    This period saw the development of specialized coatings for marine environments and fire prevention
                    applications.
                  </p>
                </div>
                
                <div className="mb-10 relative">
                  <div className="absolute -left-11 w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-orange-500 border-4 border-gray-100 dark:border-gray-900"></div>
                  <h3 className="gradient-text-fire text-xl font-bold mb-2 font-heading">2020: Innovation</h3>
                  <p className="dark:text-gray-300 text-gray-700">
                    We established our advanced R&D laboratory, accelerating our innovation capabilities. This resulted
                    in breakthrough formulations with enhanced durability and environmental performance, setting new
                    industry standards.
                  </p>
                </div>
                
                <div className="relative">
                  <div className="absolute -left-11 w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 border-4 border-gray-100 dark:border-gray-900"></div>
                  <h3 className="gradient-text-fire text-xl font-bold mb-2 font-heading">2023: Transformation</h3>
                  <p className="dark:text-gray-300 text-gray-700">
                    We rebranded as Praetorian SmartCoat Solutions to reflect our evolution into an integrated solutions
                    provider. With an expanded product line and services, we continue to lead the industry in protective
                    coating innovations.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center mb-16">
              <GradientHeading level={2} className="text-3xl md:text-4xl mb-6" variant="mixed">
                Why Choose Praetorian SmartCoat?
              </GradientHeading>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-b from-gray-100/70 to-gray-200/70 dark:from-gray-800/70 dark:to-gray-900/70 rounded-xl p-6 shadow-lg dark:shadow-orange-600/5 border border-gray-200 dark:border-gray-700/50">
                  <div className="text-blue-500 dark:text-blue-400 mb-4">
                    <i className="fas fa-flask text-4xl"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2 dark:text-white text-gray-800 font-heading">Advanced Technology</h3>
                  <p className="dark:text-gray-300 text-gray-700">
                    Cutting-edge formulations that outperform traditional coatings in durability, protection, and
                    environmental impact.
                  </p>
                </div>
                
                <div className="bg-gradient-to-b from-gray-100/70 to-gray-200/70 dark:from-gray-800/70 dark:to-gray-900/70 rounded-xl p-6 shadow-lg dark:shadow-orange-600/5 border border-gray-200 dark:border-gray-700/50">
                  <div className="text-orange-500 dark:text-orange-400 mb-4">
                    <i className="fas fa-certificate text-4xl"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2 dark:text-white text-gray-800 font-heading">Quality Assurance</h3>
                  <p className="dark:text-gray-300 text-gray-700">
                    Rigorous testing and quality control ensure consistent performance in even the most demanding
                    environments.
                  </p>
                </div>
                
                <div className="bg-gradient-to-b from-gray-100/70 to-gray-200/70 dark:from-gray-800/70 dark:to-gray-900/70 rounded-xl p-6 shadow-lg dark:shadow-orange-600/5 border border-gray-200 dark:border-gray-700/50">
                  <div className="text-blue-500 dark:text-blue-400 mb-4">
                    <i className="fas fa-users-cog text-4xl"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2 dark:text-white text-gray-800 font-heading">Expert Support</h3>
                  <p className="dark:text-gray-300 text-gray-700">
                    Technical assistance from specification to application, ensuring optimal results for your specific
                    needs.
                  </p>
                </div>
                
                <div className="bg-gradient-to-b from-gray-100/70 to-gray-200/70 dark:from-gray-800/70 dark:to-gray-900/70 rounded-xl p-6 shadow-lg dark:shadow-orange-600/5 border border-gray-200 dark:border-gray-700/50">
                  <div className="text-orange-500 dark:text-orange-400 mb-4">
                    <i className="fas fa-leaf text-4xl"></i>
                  </div>
                  <h3 className="text-xl font-bold mb-2 dark:text-white text-gray-800 font-heading">Sustainability</h3>
                  <p className="dark:text-gray-300 text-gray-700">
                    Eco-friendly formulations and manufacturing processes that minimize environmental impact without
                    compromising performance.
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