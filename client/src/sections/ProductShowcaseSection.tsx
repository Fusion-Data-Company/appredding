import React from 'react';
import backgroundImage from '@assets/Untitled design (3).png';

const ProductShowcaseSection: React.FC = () => {
  return (
    <section className="py-8 px-4 relative bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-white mb-8">Our Solar Solutions</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Providing clean, renewable energy solutions for homes and businesses in Northern California.
          </p>
        </div>
        <div className="flex justify-center">
          <img 
            src={backgroundImage}
            alt="Solar Equipment Solutions"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseSection;