import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Award, Users, Zap } from "lucide-react";

const AboutAdvancePowerSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-yellow-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900">About </span>
            <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
              Advance Power Redding
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At Advance Power Redding, we empower you to take control of your energy needs. 
            With over 20 years of expertise, we are a leading licensed solar company specializing 
            in building both grid-tied and off-grid solar systems.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h3 className="text-3xl font-bold mb-6 text-gray-900">Where It All Started</h3>
            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                Founded in <strong>1999 by Greg Tomsik</strong>, Advance Power Redding began with a vision 
                of energy independence. Greg built the company's first custom off-grid solar home that same year, 
                establishing the foundation for what would become the North State's most trusted solar company.
              </p>
              <p>
                From that first installation, we've grown into a leading renewable energy company serving 
                families and businesses throughout Redding and the surrounding areas. Our commitment to 
                quality, reliability, and customer satisfaction has made us the go-to choice for solar solutions.
              </p>
              <p>
                Today, we continue Greg's original mission: providing expert solar solutions that not only 
                meet your energy needs but also fit your budget, helping you achieve true energy freedom.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Meet the Owner</h4>
                  <p className="text-gray-600">Greg Tomsik, Founder</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "I built my first off-grid solar home in 1999, and that experience taught me that 
                solar isn't just about technology – it's about giving people control over their energy future."
              </p>
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span>25+ years in renewable energy</span>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-200 rounded-full opacity-20"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-200 rounded-full opacity-30"></div>
          </div>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center p-6 border-0 shadow-lg bg-white">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">25+</div>
              <div className="text-sm text-gray-600">Years Experience</div>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-0 shadow-lg bg-white">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">1000+</div>
              <div className="text-sm text-gray-600">Solar Installations</div>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-0 shadow-lg bg-white">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">Licensed</div>
              <div className="text-sm text-gray-600">Professionals</div>
            </CardContent>
          </Card>

          <Card className="text-center p-6 border-0 shadow-lg bg-white">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">Local</div>
              <div className="text-sm text-gray-600">Redding Based</div>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-8 text-gray-900">Our Commitment to You</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Quality & Reliability</h4>
              <p className="text-gray-600">
                High-quality, reliable solar solutions backed by comprehensive warranties and ongoing support.
              </p>
            </div>

            <div className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Local Expertise</h4>
              <p className="text-gray-600">
                Deep understanding of local conditions, regulations, and utility requirements in the North State.
              </p>
            </div>

            <div className="p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-3 text-gray-900">Energy Freedom</h4>
              <p className="text-gray-600">
                Helping you take control of your energy costs and achieve independence from rising utility rates.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <Button size="lg" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-8 py-4">
              Start Your Solar Journey Today
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAdvancePowerSection;