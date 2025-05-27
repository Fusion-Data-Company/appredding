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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">Customers Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Over 25 years of satisfied customers throughout Northern California. 
            See why families and businesses trust Advance Power Redding for their solar needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-8 relative"
            >
              <div className="absolute top-4 right-4">
                <Quote className="w-8 h-8 text-yellow-500/20" />
              </div>
              
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>
              
              <div className="border-t border-gray-200 pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">{testimonial.savings}</div>
                    <div className="text-gray-500 text-xs">Annual Savings</div>
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