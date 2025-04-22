const ProductsSection = () => {
  return (
    <section id="products" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Our Product Line</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Premium protective coatings engineered for specific applications and environments.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <div className="h-48 bg-gray-200 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="ProSeal X500" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold text-gray-900">ProSeal X500</h3>
                <span className="text-primary-600 text-sm font-semibold bg-primary-100 px-2 py-1 rounded">Premium</span>
              </div>
              <p className="text-gray-600 mb-4">
                Our flagship marine-grade protective coating with enhanced UV and saltwater resistance.
              </p>
              <div className="flex justify-between items-center">
                <a 
                  href="/product-details/proseal-x500" 
                  className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                >
                  Product Details <i className="fas fa-chevron-right ml-1 text-xs"></i>
                </a>
                <span className="text-gray-900 font-bold">$189.99/gal</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <div className="h-48 bg-gray-200 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1517502166878-35c93a0072f0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="FireGuard Pro" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold text-gray-900">FireGuard Pro</h3>
                <span className="text-orange-600 text-sm font-semibold bg-orange-100 px-2 py-1 rounded">Fire-Resistant</span>
              </div>
              <p className="text-gray-600 mb-4">
                Intumescent coating that provides up to 2 hours of fire protection for structural steel.
              </p>
              <div className="flex justify-between items-center">
                <a 
                  href="/product-details/fireguard-pro" 
                  className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                >
                  Product Details <i className="fas fa-chevron-right ml-1 text-xs"></i>
                </a>
                <span className="text-gray-900 font-bold">$219.99/gal</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 group">
            <div className="h-48 bg-gray-200 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1575824173366-6b2217c3b6f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                alt="EcoShield Advanced" 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-bold text-gray-900">EcoShield Advanced</h3>
                <span className="text-green-600 text-sm font-semibold bg-green-100 px-2 py-1 rounded">Eco-Friendly</span>
              </div>
              <p className="text-gray-600 mb-4">
                Zero-VOC coating with advanced environmental protection for sensitive applications.
              </p>
              <div className="flex justify-between items-center">
                <a 
                  href="/product-details/ecoshield-advanced" 
                  className="text-primary-600 hover:text-primary-700 font-medium flex items-center"
                >
                  Product Details <i className="fas fa-chevron-right ml-1 text-xs"></i>
                </a>
                <span className="text-gray-900 font-bold">$159.99/gal</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="/products" 
            className="inline-flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            View Full Product Catalog <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;