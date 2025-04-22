import React from "react";
import { 
  ImageComparison, 
  ImageComparisonImage, 
  ImageComparisonSlider 
} from "@/components/ui/image-comparison";

const ProductComparisonSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Product Comparison
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            See the visible difference our protective coatings make. Drag the slider to compare before and after applications of our premium products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="flex flex-col">
            <h3 className="text-2xl font-heading font-bold mb-4">Pool Protection</h3>
            <p className="text-gray-600 mb-6">
              Our specialized pool coatings provide superior protection against chemical damage, UV exposure, and daily wear. The difference is clear when you compare untreated vs. treated surfaces.
            </p>
            <div className="mt-auto">
              <ImageComparison 
                className="aspect-[16/10] w-full rounded-xl shadow-premium-lg overflow-hidden"
                enableHover
                springOptions={{
                  bounce: 0.2,
                }}
              >
                <ImageComparisonImage
                  src="/images/pool-before.jpg"
                  alt="Pool Before Treatment"
                  position="left"
                />
                <ImageComparisonImage
                  src="/images/pool-after.jpg"
                  alt="Pool After Treatment"
                  position="right"
                />
                <ImageComparisonSlider className="w-1 bg-white/60 backdrop-blur-sm">
                  <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-primary-600">
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </div>
                  </div>
                </ImageComparisonSlider>
              </ImageComparison>
              <div className="flex justify-between mt-2 text-sm font-medium">
                <span>Before</span>
                <span>After</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-2xl font-heading font-bold mb-4">Marine Application</h3>
            <p className="text-gray-600 mb-6">
              Our marine coatings protect surfaces from the harsh saltwater environment, preventing corrosion and extending the lifespan of your marine structures and equipment.
            </p>
            <div className="mt-auto">
              <ImageComparison 
                className="aspect-[16/10] w-full rounded-xl shadow-premium-lg overflow-hidden"
                enableHover
                springOptions={{
                  bounce: 0.2,
                }}
              >
                <ImageComparisonImage
                  src="/images/marine-before.jpg"
                  alt="Marine Surface Before Treatment"
                  position="left"
                />
                <ImageComparisonImage
                  src="/images/marine-after.jpg"
                  alt="Marine Surface After Treatment"
                  position="right"
                />
                <ImageComparisonSlider className="w-1 bg-white/60 backdrop-blur-sm">
                  <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-primary-600">
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </div>
                  </div>
                </ImageComparisonSlider>
              </ImageComparison>
              <div className="flex justify-between mt-2 text-sm font-medium">
                <span>Before</span>
                <span>After</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col">
            <h3 className="text-2xl font-heading font-bold mb-4">Fire Prevention</h3>
            <p className="text-gray-600 mb-6">
              Our fire-resistant coatings provide critical protection by creating a barrier that slows the spread of flames, potentially saving lives and property in the event of a fire.
            </p>
            <div className="mt-auto">
              <ImageComparison 
                className="aspect-[16/10] w-full rounded-xl shadow-premium-lg overflow-hidden"
                enableHover
                springOptions={{
                  bounce: 0.2,
                }}
              >
                <ImageComparisonImage
                  src="/images/fire-before.jpg"
                  alt="Surface Before Fire-Resistant Treatment"
                  position="left"
                />
                <ImageComparisonImage
                  src="/images/fire-after.jpg"
                  alt="Surface After Fire-Resistant Treatment"
                  position="right"
                />
                <ImageComparisonSlider className="w-1 bg-white/60 backdrop-blur-sm">
                  <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-primary-600">
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </div>
                  </div>
                </ImageComparisonSlider>
              </ImageComparison>
              <div className="flex justify-between mt-2 text-sm font-medium">
                <span>Before</span>
                <span>After</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <h3 className="text-2xl font-heading font-bold mb-4">Construction & Building</h3>
            <p className="text-gray-600 mb-6">
              Our construction coatings protect building materials from weather damage, moisture, and everyday wear, extending the life of the structure while maintaining its appearance.
            </p>
            <div className="mt-auto">
              <ImageComparison 
                className="aspect-[16/10] w-full rounded-xl shadow-premium-lg overflow-hidden"
                enableHover
                springOptions={{
                  bounce: 0.2,
                }}
              >
                <ImageComparisonImage
                  src="/images/construction-before.jpg"
                  alt="Building Surface Before Treatment"
                  position="left"
                />
                <ImageComparisonImage
                  src="/images/construction-after.jpg"
                  alt="Building Surface After Treatment"
                  position="right"
                />
                <ImageComparisonSlider className="w-1 bg-white/60 backdrop-blur-sm">
                  <div className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-md">
                    <div className="w-6 h-6 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-primary-600">
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </div>
                  </div>
                </ImageComparisonSlider>
              </ImageComparison>
              <div className="flex justify-between mt-2 text-sm font-medium">
                <span>Before</span>
                <span>After</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <a 
            href="#contact" 
            className="inline-block bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-md transition-colors shadow-premium"
          >
            Request a Consultation
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductComparisonSection;