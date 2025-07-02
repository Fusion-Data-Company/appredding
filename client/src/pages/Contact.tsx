import MainLayout from "@/components/layout/MainLayout";
import { GradientHeading } from "@/components/ui/gradient-heading";
import PageTransition from "@/components/ui/page-transition";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  return (
    <PageTransition>
      <MainLayout>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-orange-500/10 pointer-events-none"></div>
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <GradientHeading level={1} className="text-4xl md:text-5xl mb-4" variant="mixed">
                Contact Advance Power Redding
              </GradientHeading>
              <p className="text-lg dark:text-gray-300 text-gray-700 max-w-3xl mx-auto">
                Ready to harness the power of solar energy? Contact our team of experts for a free consultation 
                and custom solar solution designed for your home or business.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              {/* Contact Information */}
              <div className="bg-gradient-to-b from-gray-100/70 to-gray-200/70 dark:from-gray-800/70 dark:to-gray-900/70 rounded-xl p-8 shadow-xl dark:shadow-orange-600/5 border border-gray-200 dark:border-gray-700/50">
                <h2 className="text-white font-semibold text-2xl mb-6 font-heading">Get In Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Phone</h3>
                      <a href="tel:5302260701" className="text-orange-300 hover:text-orange-200 transition-colors">
                        (530) 226-0701
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Email</h3>
                      <a href="mailto:info@apredding.net" className="text-orange-300 hover:text-orange-200 transition-colors">
                        info@apredding.net
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Service Area</h3>
                      <p className="text-gray-300">Redding, CA & Northern California</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Business Hours</h3>
                      <p className="text-gray-300">Monday - Friday: 8:00 AM - 6:00 PM</p>
                      <p className="text-gray-300">Saturday: 9:00 AM - 4:00 PM</p>
                      <p className="text-gray-300">Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-gradient-to-b from-gray-100/70 to-gray-200/70 dark:from-gray-800/70 dark:to-gray-900/70 rounded-xl p-8 shadow-xl dark:shadow-orange-600/5 border border-gray-200 dark:border-gray-700/50">
                <h2 className="text-white font-semibold text-2xl mb-6 font-heading">Request Free Quote</h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="(530) 000-0000"
                    />
                  </div>

                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-gray-300 mb-2">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="">Select project type</option>
                      <option value="residential">Residential Solar</option>
                      <option value="commercial">Commercial Solar</option>
                      <option value="hybrid">Hybrid Solar + Battery</option>
                      <option value="battery">Battery Storage Only</option>
                      <option value="maintenance">Maintenance/Repair</option>
                      <option value="consultation">Consultation</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Tell us about your solar energy needs..."
                    ></textarea>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300"
                  >
                    Send Message & Get Free Quote
                  </Button>
                </form>
              </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-gradient-to-b from-gray-100/70 to-gray-200/70 dark:from-gray-800/70 dark:to-gray-900/70 rounded-xl p-8 mb-16 shadow-xl dark:shadow-orange-600/5 border border-gray-200 dark:border-gray-700/50">
              <h2 className="text-white font-semibold text-3xl mb-6 font-heading text-center">Why Choose Advance Power?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">25+</span>
                  </div>
                  <h3 className="text-white font-semibold text-xl mb-2">Years Experience</h3>
                  <p className="text-gray-300 text-sm">
                    Over 25 years serving Northern California with solar excellence
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">✓</span>
                  </div>
                  <h3 className="text-white font-semibold text-xl mb-2">Licensed & Insured</h3>
                  <p className="text-gray-300 text-sm">
                    Fully licensed, bonded, and insured for your peace of mind
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-xl">$</span>
                  </div>
                  <h3 className="text-white font-semibold text-xl mb-2">Best Value</h3>
                  <p className="text-gray-300 text-sm">
                    Competitive pricing with superior quality and service
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <h2 className="text-white font-semibold text-3xl mb-6 font-heading">Ready to Start Saving?</h2>
              <p className="text-gray-200 mb-8 max-w-2xl mx-auto">
                Join hundreds of satisfied customers who have reduced their energy bills and carbon footprint 
                with our premium solar solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  asChild
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 px-8"
                >
                  <a href="tel:5302260701">Call Now: (530) 226-0701</a>
                </Button>
                <Button 
                  asChild
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-8"
                >
                  <a href="/roi-calculator">Calculate Your Savings</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </MainLayout>
    </PageTransition>
  );
};

export default Contact;