import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useStore, Product } from '@/contexts/StoreContext';
import ProductCard from '@/components/store/ProductCard';
import Cart from '@/components/store/Cart';
import ScrollingReviews from '@/components/store/ScrollingReviews';
import TechnicalSpecsTable from '@/components/store/TechnicalSpecsTable';
import ProductComparison from '@/components/store/ProductComparison';
import IndustryApplications from '@/components/store/IndustryApplications';
import { Button } from '@/components/ui/button';
import { Filter, ArrowUp, ChevronDown, ShieldCheck, Thermometer, Droplets, Wind, Sun, Scale } from 'lucide-react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Products() {
  const { products } = useStore();
  const [showFilters, setShowFilters] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  const [filterSize, setFilterSize] = useState<'1-gallon' | '5-gallon' | null>(null);
  
  // Group products by their base relationship
  const productGroups: Product[][] = [];
  const baseProducts = products.filter(p => !p.baseProduct);
  
  baseProducts.forEach(baseProduct => {
    const variantProducts = products.filter(p => p.baseProduct === baseProduct.id);
    productGroups.push([baseProduct, ...variantProducts]);
  });
  
  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Handle scroll events to show/hide the scroll to top button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Filter products based on selected filters
  const filteredGroups = productGroups.filter(group => {
    if (!filterCategory && !filterSize) return true;
    
    return group.some(product => 
      (!filterCategory || product.category === filterCategory) && 
      (!filterSize || product.size === filterSize)
    );
  });

  return (
    <MainLayout>
      <div className="relative">
        {/* Hero Section - Premium Enterprise Styling */}
        <div className="relative py-20 mb-12 bg-gradient-to-br from-amber-50 via-white to-amber-50/40 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950/90 overflow-hidden">
          {/* Background pattern with animated glow effect */}
          <div className="absolute inset-0 opacity-5 bg-[url('/src/assets_dir/images/grid-pattern.svg')]"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-amber-700/5 dark:from-amber-500/10 dark:to-amber-700/10"></div>
          
          {/* Animated light beam effect */}
          <motion.div 
            className="absolute top-0 -right-40 w-80 h-full bg-gradient-to-b from-amber-100/30 via-amber-200/10 to-amber-100/20 dark:from-amber-500/10 dark:via-amber-400/5 dark:to-amber-500/10 blur-3xl"
            animate={{ 
              x: [0, -60, 0],
              opacity: [0.5, 0.8, 0.5]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          />

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center gap-12">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/70 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-sm font-medium mb-4 border border-amber-200 dark:border-amber-800/50 shadow-sm">
                  <ShieldCheck size={14} className="text-amber-600 dark:text-amber-500" />
                  <span>NASA-derived ceramic technology</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-amber-900 dark:text-amber-300 leading-tight">
                  <span className="block">Premium</span>
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-amber-500 dark:from-amber-400 dark:to-amber-300">
                    Protective Coatings
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-xl leading-relaxed">
                  Praetorian's revolutionary ceramic-based protective coatings offer unmatched 
                  thermal resistance, UV protection, and industry-leading durability for any surface.
                </p>
                
                {/* Key features indicators with icons */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shadow-sm">
                      <Thermometer className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Heat Resistant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shadow-sm">
                      <Sun className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">UV Protective</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shadow-sm">
                      <Droplets className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Water Resistant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shadow-sm">
                      <Wind className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">Weather Resistant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shadow-sm">
                      <Scale className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">156% Elasticity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shadow-sm">
                      <ShieldCheck className="h-5 w-5 text-amber-600 dark:text-amber-500" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">ABS Certified</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                  <Button 
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white shadow-md hover:shadow-lg transition-all duration-300 px-6 py-6 h-auto text-lg"
                    onClick={() => {
                      const productsSection = document.getElementById('products-section');
                      if (productsSection) {
                        productsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <span>Shop Premium Products</span>
                    <ChevronDown className="ml-2 h-5 w-5" />
                  </Button>
                  <a 
                    href="#technical-specs" 
                    className="text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 underline underline-offset-4 text-sm font-medium flex items-center"
                  >
                    View Technical Specifications
                  </a>
                  <div className="fixed bottom-8 right-8 z-40">
                    <Cart />
                  </div>
                </div>
              </div>
              
              <div className="flex-1 flex justify-center">
                <div className="relative">
                  {/* Premium decorative elements with animation */}
                  <motion.div 
                    className="absolute -top-10 -left-10 -right-10 -bottom-10 rounded-full bg-gradient-to-br from-amber-300/20 via-amber-200/10 to-amber-500/10 dark:from-amber-600/10 dark:via-amber-500/5 dark:to-amber-700/10 blur-3xl"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                  />
                  
                  {/* Product Image with Glow Effect */}
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                    className="relative z-10"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-300/40 to-white/0 dark:from-amber-500/20 dark:to-transparent blur-xl rounded-full scale-90 -translate-y-4"></div>
                    <img 
                      src="/src/assets_dir/icons/praetorian-bucket-new.png" 
                      alt="Praetorian SmartCoat Premium Protective Coating" 
                      className="relative w-72 h-72 object-contain drop-shadow-2xl"
                    />
                  </motion.div>
                  
                  {/* Highlight Badge */}
                  <div className="absolute -right-4 top-10 bg-gradient-to-br from-amber-500 to-amber-700 dark:from-amber-500 dark:to-amber-600 text-white p-3 rounded-full shadow-lg z-20 flex items-center justify-center w-24 h-24 border-4 border-white dark:border-gray-800">
                    <div className="text-center">
                      <div className="text-xs font-semibold">Patent</div>
                      <div className="text-sm font-bold">#10,738,214</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="sticky top-[110px] z-30 bg-white dark:bg-gray-900 border-b border-amber-100 dark:border-gray-800 shadow-sm">
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={16} />
                Filters
              </Button>
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {products.length} Products
              </div>
            </div>
            
            {showFilters && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="pt-3"
              >
                <div className="flex flex-wrap gap-4">
                  <div>
                    <p className="text-sm font-medium mb-2">Category</p>
                    <div className="flex gap-2">
                      <Button 
                        variant={!filterCategory ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setFilterCategory(null)}
                      >
                        All
                      </Button>
                      <Button 
                        variant={filterCategory === 'Coating' ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setFilterCategory('Coating')}
                      >
                        Smart-Coat
                      </Button>
                      <Button 
                        variant={filterCategory === 'Stucco' ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setFilterCategory('Stucco')}
                      >
                        Stucco
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Size</p>
                    <div className="flex gap-2">
                      <Button 
                        variant={!filterSize ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setFilterSize(null)}
                      >
                        All
                      </Button>
                      <Button 
                        variant={filterSize === '1-gallon' ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setFilterSize('1-gallon')}
                      >
                        1-Gallon
                      </Button>
                      <Button 
                        variant={filterSize === '5-gallon' ? "default" : "outline"} 
                        size="sm"
                        onClick={() => setFilterSize('5-gallon')}
                      >
                        5-Gallon
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Products Section */}
        <div id="products-section" className="container mx-auto px-4 py-12">
          {filteredGroups.length === 0 ? (
            <div className="text-center p-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <h3 className="text-xl font-medium mb-2">No products match your filters</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Try changing your filter selection</p>
              <Button 
                variant="default" 
                onClick={() => {
                  setFilterCategory(null);
                  setFilterSize(null);
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="space-y-16">
              {filteredGroups.map((group, groupIndex) => {
                const baseProduct = group[0];
                return (
                  <div key={baseProduct.id} className="space-y-8">
                    <div className="border-b border-amber-200/50 dark:border-amber-800/20 pb-2">
                      <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-300">
                        {baseProduct.category}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {baseProduct.category === 'Coating' 
                          ? 'Our flagship ceramic thermal barrier coating with NASA-derived technology'
                          : 'Specialized ceramic-infused stucco formula for textured surfaces'
                        }
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {group.map(product => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Premium Enterprise Content Sections */}
        <TechnicalSpecsTable />
        <ProductComparison />
        <IndustryApplications />

        {/* Reviews Section */}
        <ScrollingReviews />
        
        {/* Scroll to top button */}
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-24 right-8 z-40 bg-amber-600 text-white p-3 rounded-full shadow-lg"
            onClick={scrollToTop}
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </div>
    </MainLayout>
  );
}