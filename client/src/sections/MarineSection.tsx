import { useState } from "react";

const MarineSection = () => {
  const [formData, setFormData] = useState({
    vesselType: "",
    waterType: "",
    surfaceMaterial: ""
  });

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleFindCoatings = () => {
    // This would handle the form submission logic in a real implementation
    console.log("Form data:", formData);
  };

  return (
    <section 
      className="py-20 relative" 
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1514565131-fce0801e5785?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 bg-[#1e1e1e] rounded-lg overflow-hidden shadow-lg">
            <div className="p-6 border-b border-[#333333]">
              <h3 className="text-xl font-semibold">Marine Application Configurator</h3>
              <p className="text-[#a0a0a0]">Find the right marine coating for your vessel</p>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <label htmlFor="vesselType" className="block text-sm font-medium mb-2">Vessel Type</label>
                <select 
                  id="vesselType" 
                  className="w-full bg-[#121212] border border-[#333333] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0070f3]"
                  value={formData.vesselType}
                  onChange={handleSelectChange}
                >
                  <option value="">Select vessel type</option>
                  <option value="recreational">Recreational Boat</option>
                  <option value="commercial">Commercial Ship</option>
                  <option value="yacht">Yacht</option>
                  <option value="dock">Dock/Marina</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="waterType" className="block text-sm font-medium mb-2">Water Type</label>
                <select 
                  id="waterType" 
                  className="w-full bg-[#121212] border border-[#333333] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0070f3]"
                  value={formData.waterType}
                  onChange={handleSelectChange}
                >
                  <option value="">Select water type</option>
                  <option value="salt">Salt Water</option>
                  <option value="fresh">Fresh Water</option>
                  <option value="brackish">Brackish</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="surfaceMaterial" className="block text-sm font-medium mb-2">Surface Material</label>
                <select 
                  id="surfaceMaterial" 
                  className="w-full bg-[#121212] border border-[#333333] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0070f3]"
                  value={formData.surfaceMaterial}
                  onChange={handleSelectChange}
                >
                  <option value="">Select material</option>
                  <option value="fiberglass">Fiberglass</option>
                  <option value="aluminum">Aluminum</option>
                  <option value="steel">Steel</option>
                  <option value="wood">Wood</option>
                </select>
              </div>
              
              <button 
                className="w-full bg-[#0070f3] hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                onClick={handleFindCoatings}
              >
                Find Recommended Coatings
              </button>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0070f3]">Marine Protection Systems</h2>
            <p className="mb-6">
              Our marine coatings provide superior protection against salt water, UV damage, and marine growth for all types of watercraft and marine structures.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-[#0070f3] mt-1 mr-3"></i>
                <span>Anti-fouling technology prevents marine growth buildup</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-[#0070f3] mt-1 mr-3"></i>
                <span>Corrosion resistant formulas for salt water environments</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-[#0070f3] mt-1 mr-3"></i>
                <span>UV-stable finishes maintain appearance in constant sun exposure</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-[#0070f3] mt-1 mr-3"></i>
                <span>Environmentally responsible formulations meet EPA requirements</span>
              </li>
            </ul>
            <a 
              href="#products" 
              className="bg-[#0070f3] hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors inline-block"
            >
              Explore Marine Products
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarineSection;
