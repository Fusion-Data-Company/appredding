import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PremiumTabs, PremiumTabsList, PremiumTabsTrigger, PremiumTabsContent } from "@/components/ui/premium-tabs";

interface ProductFeature {
  name: string;
  description: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  features: ProductFeature[];
  specifications: Record<string, string | number>;
  applicationAreas: string[];
  price: {
    value: number;
    unit: string;
  };
  rating: number;
  imageUrl: string;
}

const productData: Product[] = [
  {
    id: "fire-shield-pro",
    name: "FireShield Pro",
    description: "Class-A fire retardant coating for exterior surfaces with exceptional durability and weather resistance.",
    category: "wildfire",
    features: [
      { name: "Intumescent Technology", description: "Expands when exposed to high heat, creating an insulating barrier" },
      { name: "Class-A Rated", description: "Highest fire resistance rating per ASTM E84 standards" },
      { name: "Weather Resistant", description: "Maintains performance through extreme weather conditions" },
      { name: "Low VOC Formula", description: "Environmentally responsible with minimal volatile organic compounds" },
      { name: "UV Stable", description: "Resistant to breaking down from ultraviolet light exposure" }
    ],
    specifications: {
      "Coverage Rate": "150-200 sq ft/gal",
      "Dry Time": "4 hours",
      "Recoat Time": "12 hours",
      "Full Cure": "7 days",
      "VOC Content": "< 50 g/L",
      "Solids by Volume": "68%",
      "Recommended Coats": 2,
      "Shelf Life": "5 years",
      "Available Sizes": "1 gal, 5 gal"
    },
    applicationAreas: [
      "Residential Exteriors",
      "Commercial Buildings",
      "Wooden Structures",
      "Wildfire-Prone Areas"
    ],
    price: {
      value: 89.99,
      unit: "gallon"
    },
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1520451644838-906a72aa7c86?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "marine-defend-ultra",
    name: "MarineDefend Ultra",
    description: "Premium marine-grade protective coating for boats and watercraft with superior salt water and UV resistance.",
    category: "marine",
    features: [
      { name: "Anti-Fouling Technology", description: "Prevents marine growth and organism adhesion" },
      { name: "Salt Corrosion Protection", description: "Advanced formula prevents damage from salt water exposure" },
      { name: "Abrasion Resistant", description: "Withstands physical wear from water, sand, and debris" },
      { name: "Flexible Finish", description: "Expands and contracts with substrate movements" },
      { name: "Self-Leveling", description: "Easy application with exceptional finish quality" }
    ],
    specifications: {
      "Coverage Rate": "100-125 sq ft/gal",
      "Dry Time": "6 hours",
      "Recoat Time": "24 hours",
      "Full Cure": "5 days",
      "VOC Content": "< 100 g/L",
      "Solids by Volume": "72%",
      "Recommended Coats": 3,
      "Shelf Life": "3 years",
      "Available Sizes": "1 qt, 1 gal, 5 gal"
    },
    applicationAreas: [
      "Boat Hulls",
      "Watercraft",
      "Marine Structures",
      "Docks and Piers"
    ],
    price: {
      value: 119.99,
      unit: "gallon"
    },
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1566843972142-a7fcb70de1a5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "pool-shield-epoxy",
    name: "PoolShield Epoxy",
    description: "Commercial-grade pool coating with exceptional chemical and UV resistance, designed for longevity and easy maintenance.",
    category: "pool",
    features: [
      { name: "Chemical Resistant", description: "Withstands chlorine, salt, and other pool chemicals" },
      { name: "Non-Slip Finish", description: "Textured surface provides safety in wet areas" },
      { name: "Algae Inhibiting", description: "Special additives prevent algae growth" },
      { name: "Color Stable", description: "Maintains vibrant color despite constant water exposure" },
      { name: "Easy Clean Surface", description: "Smooth finish prevents buildup and simplifies maintenance" }
    ],
    specifications: {
      "Coverage Rate": "125-150 sq ft/gal",
      "Dry Time": "8 hours",
      "Recoat Time": "24 hours",
      "Full Cure": "7 days",
      "VOC Content": "< 50 g/L",
      "Solids by Volume": "100%",
      "Recommended Coats": 2,
      "Shelf Life": "2 years",
      "Available Sizes": "2 gal kit, 5 gal kit"
    },
    applicationAreas: [
      "Swimming Pools",
      "Spas",
      "Water Features",
      "Pool Decks"
    ],
    price: {
      value: 185.99,
      unit: "gallon"
    },
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1560090995-01632a28895b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "construct-seal-premium",
    name: "ConstructSeal Premium",
    description: "Heavy-duty industrial coating for concrete and metal surfaces with superior abrasion and chemical resistance.",
    category: "construction",
    features: [
      { name: "Impact Resistant", description: "Withstands heavy traffic and industrial use" },
      { name: "Chemical Resistant", description: "Protects against oils, solvents, and industrial chemicals" },
      { name: "Thermal Stability", description: "Performs across wide temperature ranges" },
      { name: "Quick Curing", description: "Minimal downtime for industrial applications" },
      { name: "High-Build Formula", description: "Creates thick protective layer with fewer coats" }
    ],
    specifications: {
      "Coverage Rate": "200-250 sq ft/gal",
      "Dry Time": "2 hours",
      "Recoat Time": "6 hours",
      "Full Cure": "3 days",
      "VOC Content": "< 100 g/L",
      "Solids by Volume": "82%",
      "Recommended Coats": 2,
      "Shelf Life": "3 years",
      "Available Sizes": "5 gal, 55 gal"
    },
    applicationAreas: [
      "Industrial Floors",
      "Warehouses",
      "Parking Structures",
      "Manufacturing Plants"
    ],
    price: {
      value: 159.99,
      unit: "gallon"
    },
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1541992206801-3481e9c12e78?auto=format&fit=crop&w=600&q=80"
  }
];

const ProductComparison = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  
  const filteredProducts = activeCategory === "all" 
    ? productData 
    : productData.filter(product => product.category === activeCategory);
  
  const comparisonProducts = productData.filter(product => 
    selectedProducts.includes(product.id)
  );
  
  const handleProductToggle = (productId: string) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    } else {
      if (selectedProducts.length < 3) {
        setSelectedProducts([...selectedProducts, productId]);
      }
    }
  };
  
  const clearComparison = () => {
    setSelectedProducts([]);
  };
  
  // Get all unique specification keys from the selected products
  const allSpecifications = comparisonProducts.length > 0
    ? Array.from(new Set(comparisonProducts.flatMap(product => Object.keys(product.specifications))))
    : [];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container mx-auto">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 glow-text">Product Comparison Tool</h1>
              <p className="text-xl text-gray-200 mb-8">
                Compare our protective coating products side by side to find the perfect solution for your specific needs.
              </p>
            </div>
            
            <div className="bg-primary-800 premium-border rounded-xl p-8 mb-10">
              <h2 className="text-2xl font-bold mb-6">Select Products to Compare</h2>
              <p className="mb-6 text-gray-300">Choose up to 3 products to compare their features, specifications, and pricing.</p>
              
              <PremiumTabs defaultValue="all" onValueChange={setActiveCategory} className="w-full">
                <PremiumTabsList>
                  <PremiumTabsTrigger value="all">All Products</PremiumTabsTrigger>
                  <PremiumTabsTrigger value="wildfire">Wildfire Protection</PremiumTabsTrigger>
                  <PremiumTabsTrigger value="marine">Marine Coatings</PremiumTabsTrigger>
                  <PremiumTabsTrigger value="pool">Pool Coatings</PremiumTabsTrigger>
                  <PremiumTabsTrigger value="construction">Construction Coatings</PremiumTabsTrigger>
                </PremiumTabsList>
                
                <PremiumTabsContent value="all">
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredProducts.map(product => (
                      <div key={product.id} className="bg-primary-700 rounded-lg p-6 flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 bg-primary-600 rounded-lg overflow-hidden">
                            <img 
                              src={product.imageUrl} 
                              alt={product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold">{product.name}</h3>
                            <div className="flex items-center">
                              <Checkbox 
                                id={`select-${product.id}`} 
                                checked={selectedProducts.includes(product.id)}
                                onCheckedChange={() => handleProductToggle(product.id)}
                                disabled={!selectedProducts.includes(product.id) && selectedProducts.length >= 3}
                              />
                              <Label htmlFor={`select-${product.id}`} className="ml-2">
                                {selectedProducts.includes(product.id) ? 'Selected' : 'Compare'}
                              </Label>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm mb-2">{product.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex mr-2">
                                {[...Array(5)].map((_, index) => (
                                  <i 
                                    key={index} 
                                    className={`fas fa-star ${index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-500'}`}
                                  ></i>
                                ))}
                              </div>
                              <span className="text-sm">{product.rating.toFixed(1)}</span>
                            </div>
                            <div className="text-primary-400 font-semibold">
                              ${product.price.value.toFixed(2)}/{product.price.unit}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </PremiumTabsContent>
                
                <PremiumTabsContent value="wildfire">
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredProducts.map(product => (
                      <div key={product.id} className="bg-primary-700 rounded-lg p-6 flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 bg-primary-600 rounded-lg overflow-hidden">
                            <img 
                              src={product.imageUrl} 
                              alt={product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold">{product.name}</h3>
                            <div className="flex items-center">
                              <Checkbox 
                                id={`select-${product.id}`} 
                                checked={selectedProducts.includes(product.id)}
                                onCheckedChange={() => handleProductToggle(product.id)}
                                disabled={!selectedProducts.includes(product.id) && selectedProducts.length >= 3}
                              />
                              <Label htmlFor={`select-${product.id}`} className="ml-2">
                                {selectedProducts.includes(product.id) ? 'Selected' : 'Compare'}
                              </Label>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm mb-2">{product.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex mr-2">
                                {[...Array(5)].map((_, index) => (
                                  <i 
                                    key={index} 
                                    className={`fas fa-star ${index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-500'}`}
                                  ></i>
                                ))}
                              </div>
                              <span className="text-sm">{product.rating.toFixed(1)}</span>
                            </div>
                            <div className="text-primary-400 font-semibold">
                              ${product.price.value.toFixed(2)}/{product.price.unit}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </PremiumTabsContent>
                
                <PremiumTabsContent value="marine">
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredProducts.map(product => (
                      <div key={product.id} className="bg-primary-700 rounded-lg p-6 flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 bg-primary-600 rounded-lg overflow-hidden">
                            <img 
                              src={product.imageUrl} 
                              alt={product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold">{product.name}</h3>
                            <div className="flex items-center">
                              <Checkbox 
                                id={`select-${product.id}`} 
                                checked={selectedProducts.includes(product.id)}
                                onCheckedChange={() => handleProductToggle(product.id)}
                                disabled={!selectedProducts.includes(product.id) && selectedProducts.length >= 3}
                              />
                              <Label htmlFor={`select-${product.id}`} className="ml-2">
                                {selectedProducts.includes(product.id) ? 'Selected' : 'Compare'}
                              </Label>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm mb-2">{product.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex mr-2">
                                {[...Array(5)].map((_, index) => (
                                  <i 
                                    key={index} 
                                    className={`fas fa-star ${index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-500'}`}
                                  ></i>
                                ))}
                              </div>
                              <span className="text-sm">{product.rating.toFixed(1)}</span>
                            </div>
                            <div className="text-primary-400 font-semibold">
                              ${product.price.value.toFixed(2)}/{product.price.unit}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </PremiumTabsContent>
                
                <PremiumTabsContent value="pool">
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredProducts.map(product => (
                      <div key={product.id} className="bg-primary-700 rounded-lg p-6 flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 bg-primary-600 rounded-lg overflow-hidden">
                            <img 
                              src={product.imageUrl} 
                              alt={product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold">{product.name}</h3>
                            <div className="flex items-center">
                              <Checkbox 
                                id={`select-${product.id}`} 
                                checked={selectedProducts.includes(product.id)}
                                onCheckedChange={() => handleProductToggle(product.id)}
                                disabled={!selectedProducts.includes(product.id) && selectedProducts.length >= 3}
                              />
                              <Label htmlFor={`select-${product.id}`} className="ml-2">
                                {selectedProducts.includes(product.id) ? 'Selected' : 'Compare'}
                              </Label>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm mb-2">{product.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex mr-2">
                                {[...Array(5)].map((_, index) => (
                                  <i 
                                    key={index} 
                                    className={`fas fa-star ${index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-500'}`}
                                  ></i>
                                ))}
                              </div>
                              <span className="text-sm">{product.rating.toFixed(1)}</span>
                            </div>
                            <div className="text-primary-400 font-semibold">
                              ${product.price.value.toFixed(2)}/{product.price.unit}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </PremiumTabsContent>
                
                <PremiumTabsContent value="construction">
                  <div className="grid md:grid-cols-2 gap-6">
                    {filteredProducts.map(product => (
                      <div key={product.id} className="bg-primary-700 rounded-lg p-6 flex gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 bg-primary-600 rounded-lg overflow-hidden">
                            <img 
                              src={product.imageUrl} 
                              alt={product.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold">{product.name}</h3>
                            <div className="flex items-center">
                              <Checkbox 
                                id={`select-${product.id}`} 
                                checked={selectedProducts.includes(product.id)}
                                onCheckedChange={() => handleProductToggle(product.id)}
                                disabled={!selectedProducts.includes(product.id) && selectedProducts.length >= 3}
                              />
                              <Label htmlFor={`select-${product.id}`} className="ml-2">
                                {selectedProducts.includes(product.id) ? 'Selected' : 'Compare'}
                              </Label>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm mb-2">{product.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="flex mr-2">
                                {[...Array(5)].map((_, index) => (
                                  <i 
                                    key={index} 
                                    className={`fas fa-star ${index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-500'}`}
                                  ></i>
                                ))}
                              </div>
                              <span className="text-sm">{product.rating.toFixed(1)}</span>
                            </div>
                            <div className="text-primary-400 font-semibold">
                              ${product.price.value.toFixed(2)}/{product.price.unit}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </PremiumTabsContent>
              </PremiumTabs>
            </div>
            
            {/* Comparison Section */}
            {selectedProducts.length > 0 && (
              <div className="bg-primary-800 premium-border rounded-xl p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold">Product Comparison</h2>
                  <Button variant="outline" onClick={clearComparison}>Clear All</Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-primary-700">
                        <th className="text-left p-4 border-b border-gray-700 w-1/4">Product Details</th>
                        {comparisonProducts.map(product => (
                          <th key={product.id} className="text-center p-4 border-b border-gray-700">
                            {product.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-4 border-b border-gray-700 font-semibold bg-primary-700">Category</td>
                        {comparisonProducts.map(product => (
                          <td key={product.id} className="text-center p-4 border-b border-gray-700">
                            <span className="capitalize">{product.category}</span>
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-4 border-b border-gray-700 font-semibold bg-primary-700">Price</td>
                        {comparisonProducts.map(product => (
                          <td key={product.id} className="text-center p-4 border-b border-gray-700">
                            ${product.price.value.toFixed(2)}/{product.price.unit}
                          </td>
                        ))}
                      </tr>
                      <tr>
                        <td className="p-4 border-b border-gray-700 font-semibold bg-primary-700">Rating</td>
                        {comparisonProducts.map(product => (
                          <td key={product.id} className="text-center p-4 border-b border-gray-700">
                            <div className="flex items-center justify-center">
                              <div className="flex mr-2">
                                {[...Array(5)].map((_, index) => (
                                  <i 
                                    key={index} 
                                    className={`fas fa-star ${index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-500'}`}
                                  ></i>
                                ))}
                              </div>
                              <span>{product.rating.toFixed(1)}</span>
                            </div>
                          </td>
                        ))}
                      </tr>
                      
                      {/* Features */}
                      <tr>
                        <td colSpan={comparisonProducts.length + 1} className="p-4 bg-primary-700 font-bold text-lg">
                          Features
                        </td>
                      </tr>
                      {comparisonProducts.length > 0 && comparisonProducts[0].features.map((_, featureIndex) => (
                        <tr key={`feature-${featureIndex}`}>
                          <td className="p-4 border-b border-gray-700 font-semibold bg-primary-700">
                            {comparisonProducts[0].features[featureIndex].name}
                          </td>
                          {comparisonProducts.map(product => (
                            <td key={product.id} className="text-center p-4 border-b border-gray-700">
                              {featureIndex < product.features.length ? product.features[featureIndex].description : "-"}
                            </td>
                          ))}
                        </tr>
                      ))}
                      
                      {/* Specifications */}
                      <tr>
                        <td colSpan={comparisonProducts.length + 1} className="p-4 bg-primary-700 font-bold text-lg">
                          Specifications
                        </td>
                      </tr>
                      {allSpecifications.map(spec => (
                        <tr key={spec}>
                          <td className="p-4 border-b border-gray-700 font-semibold bg-primary-700">{spec}</td>
                          {comparisonProducts.map(product => (
                            <td key={product.id} className="text-center p-4 border-b border-gray-700">
                              {product.specifications[spec] || "-"}
                            </td>
                          ))}
                        </tr>
                      ))}
                      
                      {/* Application Areas */}
                      <tr>
                        <td colSpan={comparisonProducts.length + 1} className="p-4 bg-primary-700 font-bold text-lg">
                          Application Areas
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 border-b border-gray-700 font-semibold bg-primary-700">Recommended For</td>
                        {comparisonProducts.map(product => (
                          <td key={product.id} className="p-4 border-b border-gray-700">
                            <ul className="list-disc list-inside text-left">
                              {product.applicationAreas.map((area, index) => (
                                <li key={index} className="mb-1">{area}</li>
                              ))}
                            </ul>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-8 text-center">
                  <p className="text-gray-300 mb-4">Ready to purchase or need more information?</p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button>
                      Contact Sales Team
                    </Button>
                    <Button variant="outline">
                      Download Specifications
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductComparison;