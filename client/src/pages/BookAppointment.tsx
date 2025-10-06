import MainLayout from "@/components/layout/MainLayout";
import BookingWidget from "@/components/BookingWidget";
import { Calendar, Shield, Clock, Award, Phone, Mail, MapPin } from "lucide-react";
import { Helmet } from "react-helmet";

export default function BookAppointment() {
  return (
    <MainLayout>
      <Helmet>
        <title>Book Appointment - Free Solar Consultation | Advance Power of Redding</title>
        <meta 
          name="description" 
          content="Schedule your free solar consultation with Advance Power of Redding. 25+ years of experience, licensed professionals, and comprehensive solar solutions for Northern California." 
        />
      </Helmet>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-amber-500/10 -z-10" />
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            Schedule Your Free Solar Consultation
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Meet with our expert solar consultants to discuss your energy needs and discover how solar can save you money
          </p>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-orange-200 dark:border-orange-500/20">
            <Award className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">25+ Years Experience</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Trusted solar experts serving Northern California since 1999
            </p>
          </div>
          
          <div className="flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-orange-200 dark:border-orange-500/20">
            <Shield className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Licensed & Insured</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              Fully licensed contractors with comprehensive insurance coverage
            </p>
          </div>
          
          <div className="flex flex-col items-center p-6 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-orange-200 dark:border-orange-500/20">
            <Calendar className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Free Consultation</h3>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              No-obligation assessment of your solar potential and savings
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Widget - Takes 2 columns on large screens */}
          <div className="lg:col-span-2">
            <BookingWidget />
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Card */}
            <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl border border-orange-500/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">Phone</p>
                    <a href="tel:+15305551234" className="text-white hover:text-green-400 transition-colors">
                      (530) 555-1234
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">Email</p>
                    <a href="mailto:info@advancepowerredding.com" className="text-white hover:text-green-400 transition-colors break-all">
                      info@advancepowerredding.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-400 text-sm">Location</p>
                    <p className="text-white">
                      Redding, CA 96001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl border border-orange-500/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Clock className="h-6 w-6 text-green-500" />
                Business Hours
              </h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Monday - Friday</span>
                  <span className="text-white">8:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Saturday</span>
                  <span className="text-white">9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Sunday</span>
                  <span className="text-white">Closed</span>
                </div>
              </div>
            </div>

            {/* What to Prepare Card */}
            <div className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-blue-900/40 via-blue-800/30 to-blue-900/40 backdrop-blur-xl border border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-4">What to Prepare</h3>
              <ul className="space-y-2 text-blue-100">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Recent electricity bills (last 3 months)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Information about your roof (age, material, condition)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>List of any questions about solar energy</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>Your energy goals and budget expectations</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 border border-orange-200 dark:border-orange-500/20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What Happens Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mb-3">1</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Consultation Call</h4>
              <p className="text-gray-600 dark:text-gray-400">
                We'll discuss your energy needs, roof specifications, and answer all your questions about solar.
              </p>
            </div>
            <div>
              <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mb-3">2</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Site Assessment</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Our team will evaluate your property and design a custom solar solution tailored to your needs.
              </p>
            </div>
            <div>
              <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mb-3">3</div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Custom Proposal</h4>
              <p className="text-gray-600 dark:text-gray-400">
                Receive a detailed proposal with system design, costs, savings projections, and financing options.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
