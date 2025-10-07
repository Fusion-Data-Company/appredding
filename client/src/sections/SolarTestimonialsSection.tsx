import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useFormModal } from "@/contexts/FormModalContext";

const SolarTestimonialsSection = () => {
  const { openSolarForm } = useFormModal();
  const testimonials = [
    {
      name: "D Gruber",
      location: "Redding, CA",
      rating: 5,
      text: "After 20 plus years PG&E has cancelled my yearly Tru-Up and placed me on monthly billing. My current last year Tru-up was $2800. Only to receive our first $920 monthly bill. We added Batteries to our solar panels and have greatly reduced the new increased electricity bills.",
      initials: "DG"
    },
    {
      name: "Robert & Meredith",
      location: "Whitmore, CA",
      rating: 5,
      text: "As we were building our home, we made the decision to go 'off grid'. We were lucky enough to find Greg, with Advanced Power. From the beginning, of planning the solar array, to choosing the equipment, battery, inverter, generator etc., they were so knowledgeable, helpful and skilled. They helped us to design and build the system that our household has run on for the past 8 years. They are swift and accurate anytime we have needed assistance with any part of our system. We highly recommend them for any solar power need! They stay current and even advanced in regard to the technology required to run a household smoothly and efficiently and even better than being tied in, in my opinion!",
      initials: "R&M"
    },
    {
      name: "H Vasquez",
      location: "Igo, CA",
      rating: 5,
      text: "I'm a senior citizen who lives off the grid in the mountains of Igo, CA. Due to a rain storm I was stranded without any electricity. I called Greg Tomsik, who owns advance power redding, and he had his crew at my place to install a solar system the next day. The crew members performed in an excellent manner installing the solar panels and batteries. The battery was consistent in providing the power to operate my motor home throughout the 9 days of rain.",
      initials: "HV"
    }
  ];

  return (
    <section className="relative py-32 bg-gradient-to-br from-yellow-100 via-amber-100 to-orange-100 overflow-hidden">
      {/* Solar Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="testimonials-grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(249, 115, 22, 0.4)" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#testimonials-grid)" />
        </svg>
      </div>

      {/* Solar Light Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-48 left-48 w-40 h-40 bg-gradient-to-br from-yellow-300/15 to-orange-300/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-48 right-48 w-48 h-48 bg-gradient-to-br from-orange-300/15 to-amber-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-12 leading-tight drop-shadow-lg">
            <span className="bg-gradient-to-r from-orange-800 via-red-700 to-amber-800 bg-clip-text text-transparent">What Our</span>{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-orange-700 via-red-600 to-amber-700 bg-clip-text text-transparent drop-shadow-lg">
                Customers Say
              </span>
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-300/40 to-amber-300/40 blur-2xl -z-10 animate-pulse"></div>
            </span>
          </h2>
          
          <p className="text-3xl md:text-4xl text-gray-800 max-w-5xl mx-auto font-medium leading-relaxed mb-8 drop-shadow-sm">
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
            <span className="text-2xl font-bold text-gray-800">5.0/5</span>
            <span className="text-gray-600">from our satisfied customers</span>
          </div>
        </motion.div>

        {/* Enterprise Testimonial Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20">
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
                  <div className="flex items-center gap-4">
                    {/* Avatar with initials */}
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-black text-lg shadow-lg">
                      {testimonial.initials}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-gray-900 mb-1">{testimonial.name}</h4>
                      <p className="text-gray-600 font-medium">{testimonial.location}</p>
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
                <div className="text-4xl font-bold text-orange-400 mb-2">$2M+</div>
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
                onClick={openSolarForm}
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