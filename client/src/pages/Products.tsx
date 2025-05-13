import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useStore, Product } from '@/contexts/StoreContext';
import ProductCard from '@/components/store/ProductCard';
import Cart from '@/components/store/Cart';
import ScrollingReviews from '@/components/store/ScrollingReviews';
import { Button } from '@/components/ui/button';
import { Filter, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

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
        {/* Hero Section */}
        <div className="relative py-16 mb-8 bg-gradient-to-b from-amber-50 to-white dark:from-gray-950 dark:to-gray-900 overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5 bg-[url('/src/assets_dir/images/grid-pattern.svg')]"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-amber-900 dark:text-amber-300">
                  Premium Protective Coatings
                </h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  Praetorian's revolutionary ceramic-based protective coatings offer unmatched 
                  thermal resistance, UV protection, and durability for any surface.
                </p>
                <div className="flex items-center gap-4">
                  <Button 
                    className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600"
                    onClick={() => {
                      const productsSection = document.getElementById('products-section');
                      if (productsSection) {
                        productsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    View Products
                  </Button>
                  <div className="fixed bottom-8 right-8 z-40">
                    <Cart />
                  </div>
                </div>
              </div>
              <div className="flex-1 flex justify-center">
                <div className="relative">
                  {/* Decorative elements */}
                  <div className="absolute inset-0 rounded-full bg-amber-200/30 dark:bg-amber-700/10 blur-3xl transform -translate-x-1/4"></div>
                  <img 
                    src="/src/assets_dir/icons/praetorian-bucket-new.png" 
                    alt="Praetorian SmartCoat Bucket" 
                    className="relative w-64 h-64 object-contain"
                  />
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