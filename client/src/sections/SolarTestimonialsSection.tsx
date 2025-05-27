import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const SolarTestimonialsSection = () => {
  const testimonials = [
    {
      name: "Daniel Jewell",
      rating: 5,
      text: "Had them quote me on solar and, while I ended up not buying solar at all, the staff were extremely helpful. The quote was well organized, provided me with a lot of information, and the no-pressure sales was a welcome change. If I do ever decide to put solar on my house, I'm definitely going with Advance Power Redding.",
      avatar: "DJ"
    },
    {
      name: "Donald Zimmanck", 
      rating: 5,
      text: "Very clean install. Crew did nice work hiding the electrical routing.",
      avatar: "DZ"
    },
    {
      name: "Steve Symons",
      rating: 5,
      text: "Excellent service, ongoing friendly knowledgeable assistance. Job completed very quickly. Highly recommend hiring them for all your solar needs.",
      avatar: "SS"
    },
    {
      name: "Sara O'Brien",
      rating: 5,
      text: "Were extremely knowledgeable and helpful! Honest company doing great work!",
      avatar: "SO"
    },
    {
      name: "Tim Morelock",
      rating: 5,
      text: "I have had the extreme pleasure of working with Greg and his crew on a small project that started with 1 panel and it grew into a system that ran a house as well as a couple outbuildings with a washer, dryer, refrigerator, freezer, a submersible well pump and even a small milking machine. Greg not only kept everything affordable, but also provided an education that made adding on to the system a breeze.",
      avatar: "TM"
    },
    {
      name: "Jesse Neal",
      rating: 5,
      text: "These Guys rock! Professional people who do a quality job. I am now fully off grid and functioning with peace of mind that came to me at a great price. Very professional staff, great communication throughout every step of the process. They called each morning willing to do the job that day, because we had missed the appointment due to a fire that threatened my home.",
      avatar: "JN"
    },
    {
      name: "John Murray",
      rating: 5,
      text: "Had them install solar panels at our house in May, 2017. First Class service. Did what they promised, when promised, with no surprises. Workers were tidy and respectful. Anthony and Berek kept us informed and answered all our questions throughout design and installation. System performs as promised. Definitely recommend.",
      avatar: "JM"
    },
    {
      name: "Robert Wanat",
      rating: 5,
      text: "Outstanding professional service and quality installation. The team was knowledgeable, efficient, and delivered exactly what was promised.",
      avatar: "RW"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900">What Our </span>
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Clients Say
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Real reviews from real customers who chose Advance Power Redding for their solar energy needs
          </p>
          
          {/* Google Reviews Badge */}
          <div className="flex items-center justify-center mb-8">
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md">
              <div className="flex items-center space-x-2 mb-2">
                <img src="https://cdn.trustindex.io/assets/platform/Google/icon.svg" alt="Google" className="w-6 h-6" />
                <span className="font-semibold text-gray-800">Google Reviews</span>
              </div>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-gray-600">4.8/5 Rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="flex justify-between items-start mb-4">
                  <Quote className="w-8 h-8 text-yellow-500 opacity-60" />
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                {/* Review Text */}
                <p className="text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.text}"
                </p>

                {/* Customer Info */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">Verified Customer</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Key Benefits from Reviews */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">Why Customers Choose Us</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🛠️</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Professional Installation</h4>
              <p className="text-gray-600 text-sm">"Very clean install. Crew did nice work hiding the electrical routing."</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🤝</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">No-Pressure Sales</h4>
              <p className="text-gray-600 text-sm">"No-pressure sales was a welcome change."</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💡</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Expert Knowledge</h4>
              <p className="text-gray-600 text-sm">"Extremely knowledgeable and helpful! Honest company doing great work!"</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Complete Solutions</h4>
              <p className="text-gray-600 text-sm">"From small projects to complete off-grid systems - they do it all."</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Ready to Join Our Satisfied Customers?</h3>
          <p className="text-gray-600 mb-6">Experience the Advance Power Redding difference for yourself</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="tel:5302260701"
              className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all duration-200"
            >
              Call (530) 226-0701
            </a>
            <a 
              href="https://www.google.com/maps/place/Advance+Power+Redding/@40.5950261,-122.3883967,16z/data=!3m1!4b1!4m6!3m5!1s0x54d2ed24b707a1d3:0x8482e2bc5c64e930!8m2!3d40.5950261!4d-122.3883967!16s/g/1vr1wc9r?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 font-semibold rounded-lg transition-all duration-200"
            >
              Leave a Review
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolarTestimonialsSection;