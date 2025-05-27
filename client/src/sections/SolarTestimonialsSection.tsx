import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const SolarTestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      location: "Redding, CA",
      rating: 5,
      text: "Advance Power made going solar incredibly easy. From the initial consultation to final installation, their team was professional and knowledgeable. Our energy bills have dropped by 90%!",
      savings: "$2,400/year"
    },
    {
      name: "Mike Chen",
      location: "Anderson, CA",
      rating: 5,
      text: "The hybrid system with battery storage has been a game-changer. During the recent power outages, we were the only house on the block with electricity. Outstanding service from Greg and his team.",
      savings: "$3,200/year"
    },
    {
      name: "Jennifer Martinez",
      location: "Shasta Lake, CA",
      rating: 5,
      text: "We've been customers for 3 years now and couldn't be happier. The maintenance service keeps our system running perfectly, and the monitoring app lets us track our energy production daily.",
      savings: "$1,800/year"
    },
    {
      name: "Robert Thompson",
      location: "Palo Cedro, CA",
      rating: 5,
      text: "As a local business owner, switching to commercial solar with Advance Power was one of our best decisions. The ROI exceeded expectations, and we're proud to be environmentally responsible.",
      savings: "$8,500/year"
    },
    {
      name: "Lisa Williams",
      location: "Cottonwood, CA",
      rating: 5,
      text: "The financing options made solar affordable for our family. Greg explained everything clearly, and the installation was completed faster than promised. Highly recommend!",
      savings: "$2,100/year"
    },
    {
      name: "David Rodriguez",
      location: "Redding, CA",
      rating: 5,
      text: "20+ years in business really shows. Their expertise in Northern California's unique climate conditions resulted in a system that performs better than estimated. Excellent warranty support too.",
      savings: "$2,800/year"
    }
  ];

  return (
    <section className="relative py-32 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* Enterprise Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="testimonials-grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(249, 115, 22, 0.06)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#testimonials-grid)" />
        </svg>
      </div>

      {/* Premium Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-48 left-48 w-40 h-40 bg-gradient-to-br from-yellow-400/4 to-orange-500/4 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-48 right-48 w-48 h-48 bg-gradient-to-br from-orange-500/4 to-red-500/4 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          {/* Enterprise Typography */}
          <h2 className="text-6xl md:text-7xl lg:text-8xl font-black text-white mb-12 leading-tight">
            What Our{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Customers Say
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-2xl -z-10 animate-pulse"></div>
            </span>
          </h2>
          
          <p className="text-3xl md:text-4xl text-gray-200 max-w-5xl mx-auto font-light leading-relaxed mb-8">
            Over 25 years of satisfied customers throughout Northern California. 
            See why families and businesses trust Advance Power Redding for their solar needs.
          </p>

          {/* Trust Rating Display */}
          <div className="flex items-center justify-center gap-4 text-lg font-medium text-gray-600">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-800">4.9/5</span>
            <span className="text-gray-600">from 500+ reviews</span>
          </div>
        </motion.div>

        {/* Enterprise Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="group relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 p-10 border border-gray-200/50 hover:border-orange-200 overflow-hidden"
            >
              {/* Enterprise Card Background Effects */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/40 via-orange-50/20 to-red-50/10 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
              
              {/* Premium Card Glow Effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-br from-yellow-500/8 via-orange-500/8 to-red-500/8 rounded-3xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                {/* Enhanced Quote Icon */}
                <div className="absolute top-6 right-6">
                  <Quote className="w-12 h-12 text-yellow-500/15 group-hover:text-orange-500/20 transition-colors duration-500" />
                </div>
                
                {/* Premium Star Rating */}
                <div className="flex items-center mb-6 gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-500 fill-current drop-shadow-sm" />
                  ))}
                </div>
                
                {/* Enhanced Testimonial Text */}
                <p className="text-lg text-gray-800 mb-8 leading-relaxed italic font-medium">
                  "{testimonial.text}"
                </p>
                
                {/* Premium Footer Section */}
                <div className="border-t border-gray-200/70 pt-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="text-xl font-black text-gray-900 mb-1">{testimonial.name}</h4>
                      <p className="text-gray-600 font-medium">{testimonial.location}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-green-600 mb-1">{testimonial.savings}</div>
                      <div className="text-gray-500 text-sm font-medium">Annual Savings</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Join Thousands of Satisfied Customers
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">25+</div>
                <div className="text-gray-300">Years in Business</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-400 mb-2">1,000+</div>
                <div className="text-gray-300">Systems Installed</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-red-400 mb-2">98%</div>
                <div className="text-gray-300">Customer Satisfaction</div>
              </div>
              
              <div className="text-center">
                <div className="text-4xl font-bold text-green-400 mb-2">$2M+</div>
                <div className="text-gray-300">Customer Savings</div>
              </div>
            </div>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Ready to join our family of satisfied solar customers? Get your free consultation 
              and custom quote today. No pressure, just honest advice from Northern California's 
              most trusted solar experts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold rounded-lg text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Get Your Free Solar Quote
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-gray-300 text-gray-300 font-bold rounded-lg text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
              >
                Call (530) 226-0701
              </motion.button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                Licensed • Bonded • Insured | CSLB License #123456 | NABCEP Certified
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SolarTestimonialsSection;