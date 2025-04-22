import { GradientHeading } from "@/components/ui/gradient-heading";

const ProductHistorySection = () => {
  return (
    <section 
      className="py-20 relative" 
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <GradientHeading level={2} className="text-3xl md:text-4xl mb-4" variant="fire">Our Heritage of Protection</GradientHeading>
            <p className="mb-6">
              For over 40 years, Praetorian Protective Coatings has been at the forefront of developing advanced coating technologies that protect what matters most.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-primary-400 mt-1 mr-3"></i>
                <span>Founded by chemical engineers with a passion for protection</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-primary-400 mt-1 mr-3"></i>
                <span>Pioneered environmentally-friendly protective solutions</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-primary-400 mt-1 mr-3"></i>
                <span>Over 10,000 successful installations across North America</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-primary-400 mt-1 mr-3"></i>
                <span>Industry-leading R&D laboratory and testing facility</span>
              </li>
            </ul>
            <a 
              href="#contact" 
              className="bg-primary-600 hover:bg-primary-500 text-white font-medium py-3 px-6 rounded-lg transition-colors inline-block"
            >
              Learn About Our Story
            </a>
          </div>
          
          <div className="bg-primary-800 rounded-lg overflow-hidden shadow-lg">
            <div className="p-6 border-b border-primary-700">
              <GradientHeading level={3} className="text-xl" variant="blue">Product Innovation Timeline</GradientHeading>
              <p className="text-gray-300">Explore our history of protective coating innovations</p>
            </div>
            <div className="p-6 space-y-6">
              <div className="relative pl-8 border-l-2 border-primary-600 pb-6">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary-600"></div>
                <div className="font-bold">1978</div>
                <div className="text-lg font-semibold">Company Founded</div>
                <p className="text-gray-300">Praetorian Protective Coatings established in Portland, Oregon</p>
              </div>
              
              <div className="relative pl-8 border-l-2 border-primary-600 pb-6">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary-600"></div>
                <div className="font-bold">1985</div>
                <div className="text-lg font-semibold">First Marine Coating</div>
                <p className="text-gray-300">Launched revolutionary salt-resistant technology</p>
              </div>
              
              <div className="relative pl-8 border-l-2 border-primary-600 pb-6">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary-600"></div>
                <div className="font-bold">1998</div>
                <div className="text-lg font-semibold">Fire Retardant Breakthrough</div>
                <p className="text-gray-300">Developed Class-A intumescent coating technology</p>
              </div>
              
              <div className="relative pl-8">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary-600"></div>
                <div className="font-bold">2010 - Present</div>
                <div className="text-lg font-semibold">Smart Coating Systems</div>
                <p className="text-gray-300">Introduction of self-healing and indicator coating technologies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductHistorySection;