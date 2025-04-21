import React, { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Marinas = () => {
  const [vesselType, setVesselType] = useState("");
  const [waterType, setWaterType] = useState("");
  const [material, setMaterial] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleFindCoatings = () => {
    setShowResults(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 glow-text">Marine Protection Systems</h1>
              <p className="text-xl text-gray-200 mb-8">
                Our marine coatings provide superior protection against salt water, UV damage, and marine growth for all types of watercraft and marine structures.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 mb-16">
              <div className="bg-primary-800 premium-border rounded-xl p-8 shadow-premium-lg">
                <h2 className="text-3xl font-bold mb-6">Marine Application Configurator</h2>
                <p className="mb-8">Find the right marine coating for your vessel</p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="vessel-type">
                      Vessel Type
                    </label>
                    <Select onValueChange={(value) => setVesselType(value)}>
                      <SelectTrigger id="vessel-type" className="w-full bg-primary-900">
                        <SelectValue placeholder="Select vessel type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pleasure-craft">Pleasure Craft</SelectItem>
                        <SelectItem value="commercial">Commercial Vessel</SelectItem>
                        <SelectItem value="sailboat">Sailboat</SelectItem>
                        <SelectItem value="dock">Dock/Marina Structure</SelectItem>
                        <SelectItem value="offshore">Offshore Platform</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="water-type">
                      Water Type
                    </label>
                    <Select onValueChange={(value) => setWaterType(value)}>
                      <SelectTrigger id="water-type" className="w-full bg-primary-900">
                        <SelectValue placeholder="Select water type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="saltwater">Saltwater</SelectItem>
                        <SelectItem value="freshwater">Freshwater</SelectItem>
                        <SelectItem value="brackish">Brackish</SelectItem>
                        <SelectItem value="tropical">Tropical Waters</SelectItem>
                        <SelectItem value="arctic">Arctic Waters</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2" htmlFor="surface-material">
                      Surface Material
                    </label>
                    <Select onValueChange={(value) => setMaterial(value)}>
                      <SelectTrigger id="surface-material" className="w-full bg-primary-900">
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fiberglass">Fiberglass</SelectItem>
                        <SelectItem value="aluminum">Aluminum</SelectItem>
                        <SelectItem value="steel">Steel</SelectItem>
                        <SelectItem value="wood">Wood</SelectItem>
                        <SelectItem value="concrete">Concrete</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    onClick={handleFindCoatings}
                    className="w-full bg-primary-500 hover:bg-primary-400"
                  >
                    Find Recommended Coatings
                  </Button>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6">Marine Protection Benefits</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-ban text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Anti-fouling technology prevents marine growth buildup</h3>
                      <p>Our advanced anti-fouling formulations prevent barnacles, algae, and other marine growth from adhering to hulls and underwater structures.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-shield-alt text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Corrosion-resistant formulas prevent salt water damage</h3>
                      <p>Specially designed to protect against the harsh corrosive effects of salt water on metals and other materials.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-sun text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">UV-stable finishes maintain appearance in constant sun exposure</h3>
                      <p>Our coatings resist fading, chalking, and degradation from intense sunlight, keeping your vessel looking great for years.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <span className="bg-primary-600 rounded-full p-2 mt-1">
                      <i className="fas fa-leaf text-white"></i>
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Environmentally responsible formulations meet EPA requirements</h3>
                      <p>Our marine coatings are designed to be effective while minimizing environmental impact and meeting strict regulatory standards.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Button className="bg-primary-500 hover:bg-primary-400">
                    Explore Marine Products
                  </Button>
                </div>
              </div>
            </div>

            {showResults && (
              <div className="bg-primary-700 rounded-xl p-8 premium-border glow animate-fade-in">
                <h2 className="text-2xl font-bold mb-6">Recommended Coating Systems</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-primary-800 rounded-lg p-4 premium-border">
                    <h3 className="text-xl font-bold mb-2">PraetorianMarine™ Anti-Fouling System</h3>
                    <p className="mb-4">A complete coating system designed specifically for {vesselType} in {waterType} conditions.</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-primary-400"></i>
                        <span>Premium anti-fouling base coat</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-primary-400"></i>
                        <span>Advanced barrier primer for {material} surfaces</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-primary-400"></i>
                        <span>UV-resistant topcoat in your choice of color</span>
                      </li>
                    </ul>
                    <Button className="w-full">View Details</Button>
                  </div>
                  
                  <div className="bg-primary-800 rounded-lg p-4 premium-border">
                    <h3 className="text-xl font-bold mb-2">PraetorianMarine™ Commercial Grade</h3>
                    <p className="mb-4">Heavy-duty protection designed for extreme conditions and extended service life.</p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-primary-400"></i>
                        <span>Ultra-durable anti-fouling compound</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-primary-400"></i>
                        <span>Advanced corrosion inhibitors</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <i className="fas fa-check text-primary-400"></i>
                        <span>Extended service life (up to 5 years)</span>
                      </li>
                    </ul>
                    <Button className="w-full">View Details</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-primary-800/50">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Marine Application Solutions</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-primary-800 premium-border rounded-lg p-6 hover-lift">
                <i className="fas fa-ship text-primary-400 text-4xl mb-4"></i>
                <h3 className="text-xl font-bold mb-3">Pleasure Craft</h3>
                <p>Specialized coatings for personal watercraft, sailboats, and motor yachts that provide excellent protection and beautiful finishes.</p>
              </div>
              
              <div className="bg-primary-800 premium-border rounded-lg p-6 hover-lift">
                <i className="fas fa-industry text-primary-400 text-4xl mb-4"></i>
                <h3 className="text-xl font-bold mb-3">Commercial Vessels</h3>
                <p>Heavy-duty solutions for commercial ships, fishing vessels, and working boats that enhance durability and reduce maintenance.</p>
              </div>
              
              <div className="bg-primary-800 premium-border rounded-lg p-6 hover-lift">
                <i className="fas fa-water text-primary-400 text-4xl mb-4"></i>
                <h3 className="text-xl font-bold mb-3">Marine Structures</h3>
                <p>Protective systems for docks, marinas, offshore platforms and other structures exposed to harsh marine environments.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Marinas;