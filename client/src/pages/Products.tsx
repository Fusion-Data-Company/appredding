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
import { PremiumButton } from '@/components/ui/premium-button';
import { Filter, ArrowUp, ChevronDown, ShieldCheck, Thermometer, Droplets, Wind, Sun, Scale, Shapes } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// Import components
import { PRAETORIAN_PRODUCTS_HERO_IMAGE } from '@/assets_dir/imageExports';
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
                  <PremiumButton 
                    variant="default"
                    size="xl"
                    className="transition-all duration-300"
                    onClick={() => {
                      const productsSection = document.getElementById('products-section');
                      if (productsSection) {
                        productsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    icon={<ChevronDown className="h-5 w-5" />}
                    iconPosition="right"
                    glowEffect={true}
                  >
                    Shop Premium Products
                  </PremiumButton>
                  <PremiumButton 
                    variant="ghost" 
                    size="sm"
                    className="text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300"
                    onClick={() => {
                      const techSpecsSection = document.getElementById('technical-specs');
                      if (techSpecsSection) {
                        techSpecsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    icon={<Thermometer className="h-4 w-4" />}
                    iconPosition="left"
                  >
                    View Technical Specifications
                  </PremiumButton>
                  <div className="fixed bottom-8 right-8 z-40">
                    <Cart />
                  </div>
                </div>
              </div>
              
              <div className="flex-1 flex justify-center">
                <div className="relative overflow-visible">
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
                      src="/src/assets_dir/images/optimized/praetorian-buckets-hero-corrected.webp"
                      alt="Praetorian SmartCoat Premium Protective Coating" 
                      className="relative w-[700px] h-[400px] object-contain drop-shadow-2xl scale-110 -translate-y-6 z-20"
                    />
                  </motion.div>
                  

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Filter Bar */}
        <div className="sticky top-[110px] z-30 bg-gradient-to-r from-white via-amber-50/30 to-white dark:from-gray-900 dark:via-amber-950/10 dark:to-gray-900 border-b border-amber-200/50 dark:border-amber-900/20 shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <PremiumButton 
                variant="outline" 
                size="md"
                className="flex items-center gap-2"
                onClick={() => setShowFilters(!showFilters)}
                icon={<Filter size={16} className="text-amber-600 dark:text-amber-500" />}
                iconPosition="left"
              >
                <span>Filter Products</span>
                <motion.div
                  animate={{ rotate: showFilters ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={14} />
                </motion.div>
              </PremiumButton>
              
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shadow-sm">
                  <ShieldCheck className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                </div>
                <div>
                  <div className="text-sm font-medium text-amber-800 dark:text-amber-300">
                    {products.length} Premium Products
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Enterprise-grade protection
                  </div>
                </div>
              </div>
            </div>
            
            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="pt-4 overflow-hidden"
                >
                  <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 border border-amber-100 dark:border-amber-900/20 shadow-inner">
                    <div className="flex flex-wrap gap-8">
                      <div className="flex-1 min-w-[200px]">
                        <p className="text-sm font-medium mb-3 text-amber-800 dark:text-amber-300 flex items-center gap-2">
                          <div className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                            <Shapes className="h-3 w-3 text-amber-600 dark:text-amber-500" />
                          </div>
                          Product Category
                        </p>
                        <div className="bg-gradient-to-r from-amber-100/80 to-amber-50/80 dark:from-amber-900/20 dark:to-gray-800/80 h-10 rounded-full p-1">
                          <div className="grid grid-cols-3 h-full">
                            <button
                              className={`rounded-full h-full text-xs font-medium transition-all duration-300 ${
                                !filterCategory
                                  ? "bg-white dark:bg-gray-700 shadow-md text-amber-900 dark:text-amber-300"
                                  : "text-amber-700 dark:text-amber-400 hover:bg-white/50 dark:hover:bg-gray-700/50"
                              }`}
                              onClick={() => setFilterCategory(null)}
                            >
                              All Products
                            </button>
                            <button
                              className={`rounded-full h-full text-xs font-medium transition-all duration-300 ${
                                filterCategory === 'Coating'
                                  ? "bg-white dark:bg-gray-700 shadow-md text-amber-900 dark:text-amber-300"
                                  : "text-amber-700 dark:text-amber-400 hover:bg-white/50 dark:hover:bg-gray-700/50"
                              }`}
                              onClick={() => setFilterCategory('Coating')}
                            >
                              Smart-Coat
                            </button>
                            <button
                              className={`rounded-full h-full text-xs font-medium transition-all duration-300 ${
                                filterCategory === 'Stucco'
                                  ? "bg-white dark:bg-gray-700 shadow-md text-amber-900 dark:text-amber-300"
                                  : "text-amber-700 dark:text-amber-400 hover:bg-white/50 dark:hover:bg-gray-700/50"
                              }`}
                              onClick={() => setFilterCategory('Stucco')}
                            >
                              Stucco
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-[200px]">
                        <p className="text-sm font-medium mb-3 text-amber-800 dark:text-amber-300 flex items-center gap-2">
                          <div className="h-5 w-5 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                            <Droplets className="h-3 w-3 text-amber-600 dark:text-amber-500" />
                          </div>
                          Container Size
                        </p>
                        <div className="bg-gradient-to-r from-amber-100/80 to-amber-50/80 dark:from-amber-900/20 dark:to-gray-800/80 h-10 rounded-full p-1">
                          <div className="grid grid-cols-3 h-full">
                            <button
                              className={`rounded-full h-full text-xs font-medium transition-all duration-300 ${
                                !filterSize
                                  ? "bg-white dark:bg-gray-700 shadow-md text-amber-900 dark:text-amber-300"
                                  : "text-amber-700 dark:text-amber-400 hover:bg-white/50 dark:hover:bg-gray-700/50"
                              }`}
                              onClick={() => setFilterSize(null)}
                            >
                              All Sizes
                            </button>
                            <button
                              className={`rounded-full h-full text-xs font-medium transition-all duration-300 ${
                                filterSize === '1-gallon'
                                  ? "bg-white dark:bg-gray-700 shadow-md text-amber-900 dark:text-amber-300"
                                  : "text-amber-700 dark:text-amber-400 hover:bg-white/50 dark:hover:bg-gray-700/50"
                              }`}
                              onClick={() => setFilterSize('1-gallon')}
                            >
                              1-Gallon
                            </button>
                            <button
                              className={`rounded-full h-full text-xs font-medium transition-all duration-300 ${
                                filterSize === '5-gallon'
                                  ? "bg-white dark:bg-gray-700 shadow-md text-amber-900 dark:text-amber-300"
                                  : "text-amber-700 dark:text-amber-400 hover:bg-white/50 dark:hover:bg-gray-700/50"
                              }`}
                              onClick={() => setFilterSize('5-gallon')}
                            >
                              5-Gallon
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Premium Products Section */}
        <div id="products-section" className="container mx-auto px-4 py-16">
          {filteredGroups.length === 0 ? (
            <div className="text-center p-12 bg-gradient-to-b from-amber-50/50 to-white dark:from-gray-800/50 dark:to-gray-900 rounded-xl shadow-lg border border-amber-100 dark:border-amber-900/20">
              <div className="w-16 h-16 mx-auto bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-4">
                <Filter size={24} className="text-amber-600 dark:text-amber-500" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-amber-900 dark:text-amber-300">No products match your filters</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">Please try adjusting your filter selection or view our complete product catalog.</p>
              <PremiumButton 
                variant="default" 
                size="lg"
                className="transition-all duration-300"
                onClick={() => {
                  setFilterCategory(null);
                  setFilterSize(null);
                }}
                icon={<Shapes className="h-4 w-4" />}
                iconPosition="right"
                glowEffect={true}
              >
                View All Products
              </PremiumButton>
            </div>
          ) : (
            <div className="space-y-24">
              {filteredGroups.map((group, groupIndex) => {
                const baseProduct = group[0];
                return (
                  <div key={baseProduct.id} className="space-y-10">
                    <div className="relative">
                      {/* Category header with decorative elements */}
                      <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-12 bg-gradient-to-b from-amber-400 to-amber-600 rounded-r-full hidden md:block"></div>
                      
                      <div className="border-b border-amber-200/50 dark:border-amber-800/20 pb-4 pl-2">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center shadow-sm">
                            {baseProduct.category === 'Coating' 
                              ? <Droplets className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                              : <Shapes className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                            }
                          </div>
                          <h2 className="text-2xl md:text-3xl font-bold text-amber-900 dark:text-amber-300">
                            {baseProduct.category === 'Coating' ? 'Smart-Coat' : 'Stucco Formula'}
                          </h2>
                        </div>
                        
                        <div className="ml-10">
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-3xl">
                            {baseProduct.category === 'Coating' 
                              ? 'Our flagship ceramic thermal barrier coating with NASA-derived technology providing superior heat reflection and energy efficiency. Class A fire-rated with 156% elastomeric flexibility.'
                              : 'Specialized ceramic-infused stucco formula for textured surfaces with enhanced adhesion and durability. Perfect for exterior walls requiring both protection and traditional stucco aesthetics.'
                            }
                          </p>
                          
                          <div className="flex flex-wrap gap-4 mt-3">
                            <div className="flex items-center gap-1 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-full">
                              <Thermometer className="h-3 w-3" />
                              <span>Thermal Barrier</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-full">
                              <Sun className="h-3 w-3" />
                              <span>UV Protection</span>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-full">
                              <ShieldCheck className="h-3 w-3" />
                              <span>Class A Fire Rating</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Product Cards with staggered animation */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
                        {group.map((product, index) => (
                          <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                          >
                            <ProductCard product={product} />
                          </motion.div>
                        ))}
                      </div>
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
        
        {/* Premium Scroll to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-24 right-8 z-40"
            >
              <div className="relative">
                {/* Animated glow effect */}
                <motion.div 
                  className="absolute inset-0 rounded-full bg-amber-400/30 dark:bg-amber-600/30 blur-md"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                
                <button 
                  onClick={scrollToTop}
                  className="relative z-10 bg-gradient-to-br from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-white p-3 rounded-full shadow-lg hover:shadow-amber-500/30 border border-amber-400/30 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <ArrowUp size={20} className="drop-shadow-sm" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
}