import React from "react";
import { Link } from "wouter";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

const Applications = () => {
  const applications = [
    {
      id: "wildfire",
      title: "Wildfire Protection",
      description: "Protect your home from wildfires with our Class-A fire retardant coatings.",
      icon: "fa-fire-alt",
      link: "/fire-prevention",
      image: "",
      color: "from-red-600 to-orange-600"
    },
    {
      id: "marine",
      title: "Marine",
      description: "Salt water resistant coating for boats and marine structures.",
      icon: "fa-water",
      link: "/marinas",
      image: "",
      color: "from-blue-600 to-cyan-500"
    },
    {
      id: "pool",
      title: "Pool",
      description: "Chemical resistant coatings for pool surfaces.",
      icon: "fa-swimming-pool",
      link: "/pools",
      image: "",
      color: "from-cyan-500 to-blue-400"
    },
    {
      id: "construction",
      title: "Construction",
      description: "Protective coatings for commercial and residential buildings.",
      icon: "fa-hard-hat",
      link: "/construction",
      image: "",
      color: "from-yellow-600 to-amber-500"
    },
    {
      id: "mobile-home",
      title: "Mobile Home",
      description: "Specialized coatings for manufactured housing.",
      icon: "fa-home",
      link: "/mobile-home",
      image: "",
      color: "from-green-600 to-emerald-500"
    },
    {
      id: "municipality",
      title: "Municipality",
      description: "Infrastructure protection for public spaces.",
      icon: "fa-city",
      link: "/municipality",
      image: "",
      color: "from-indigo-600 to-blue-500"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 glow-text">Specialized Applications</h1>
              <p className="text-xl text-gray-200 mb-8">
                Our protective coatings are engineered for specific environments and challenges across various industries.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {applications.map((app) => (
                <Link key={app.id} href={app.link}>
                  <a className="block h-full">
                    <div className="bg-primary-800 premium-border rounded-xl overflow-hidden h-full hover-lift hover:glow transition-all duration-300">
                      <div className={`h-32 bg-gradient-to-r ${app.color} flex items-center justify-center`}>
                        <i className={`fas ${app.icon} text-white text-6xl`}></i>
                      </div>
                      <div className="p-6">
                        <h2 className="text-2xl font-bold mb-3">{app.title}</h2>
                        <p className="mb-4">{app.description}</p>
                        <div className="flex justify-between items-center">
                          <Button className="bg-primary-600 hover:bg-primary-500">
                            Learn More
                          </Button>
                          <i className="fas fa-arrow-right text-primary-400"></i>
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary-800/50">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">Find The Right Solution For Your Needs</h2>
              <p className="text-xl mb-8 text-center">
                Whether you're protecting against natural elements, chemicals, wear and tear, or seeking to extend the life of your assets, we have specialized coating systems to meet your requirements.
              </p>
              
              <div className="bg-primary-700 premium-border rounded-xl p-8 glass-effect">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-primary-800 rounded-lg p-4 text-center">
                    <i className="fas fa-search text-primary-400 text-3xl mb-3"></i>
                    <h3 className="text-lg font-bold mb-2">Explore Solutions</h3>
                    <p className="text-sm">Browse our specialized application pages to find the perfect protection system for your needs.</p>
                  </div>
                  
                  <div className="bg-primary-800 rounded-lg p-4 text-center">
                    <i className="fas fa-clipboard-check text-primary-400 text-3xl mb-3"></i>
                    <h3 className="text-lg font-bold mb-2">Request Assessment</h3>
                    <p className="text-sm">Get a personalized assessment and recommendation from our coating specialists.</p>
                  </div>
                  
                  <div className="bg-primary-800 rounded-lg p-4 text-center">
                    <i className="fas fa-paint-roller text-primary-400 text-3xl mb-3"></i>
                    <h3 className="text-lg font-bold mb-2">Professional Application</h3>
                    <p className="text-sm">Connect with our certified applicator network for expert installation.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Need Help Choosing?</h2>
              <p className="text-xl mb-8">
                Not sure which protective coating solution is right for your situation? Our experts are ready to help you find the perfect match for your specific needs.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button className="bg-primary-500 hover:bg-primary-400 px-6 py-3">
                  <i className="fas fa-phone-alt mr-2"></i> Contact Sales
                </Button>
                <Button className="bg-primary-700 hover:bg-primary-600 px-6 py-3">
                  <i className="fas fa-envelope mr-2"></i> Email Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Applications;