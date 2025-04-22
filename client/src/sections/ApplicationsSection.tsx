const ApplicationsSection = () => {
  return (
    <section id="applications" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Specialized Applications</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our protective coatings serve a wide range of industries and applications with specialized solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <a 
            href="/painter-network"
            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1585645893438-c05274f80217?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')",
                filter: "brightness(0.8)"
              }}
            ></div>
            <div className="relative p-8 text-white h-72 flex flex-col justify-end z-10">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-400 transition-colors">Painter Network</h3>
                <p className="text-sm text-gray-300 mb-4">Connect with certified professionals who specialize in our coatings.</p>
                <span className="inline-flex items-center text-primary-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                  Learn more <i className="fas fa-chevron-right ml-1 text-xs"></i>
                </span>
              </div>
            </div>
          </a>
          
          <a 
            href="/marinas"
            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')",
                filter: "brightness(0.8)"
              }}
            ></div>
            <div className="relative p-8 text-white h-72 flex flex-col justify-end z-10">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-400 transition-colors">Marinas</h3>
                <p className="text-sm text-gray-300 mb-4">Marine-grade protection for docks, piers, and waterfront structures.</p>
                <span className="inline-flex items-center text-primary-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                  Learn more <i className="fas fa-chevron-right ml-1 text-xs"></i>
                </span>
              </div>
            </div>
          </a>
          
          <a 
            href="/fire-prevention"
            className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center" 
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1507835661088-ac1e84fe645f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80')",
                filter: "brightness(0.8)"
              }}
            ></div>
            <div className="relative p-8 text-white h-72 flex flex-col justify-end z-10">
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary-400 transition-colors">Fire Prevention</h3>
                <p className="text-sm text-gray-300 mb-4">Intumescent coatings and fire-resistant solutions for critical infrastructure.</p>
                <span className="inline-flex items-center text-primary-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                  Learn more <i className="fas fa-chevron-right ml-1 text-xs"></i>
                </span>
              </div>
            </div>
          </a>
        </div>
        
        <div className="text-center mt-10">
          <a 
            href="/applications" 
            className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            View All Applications <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ApplicationsSection;