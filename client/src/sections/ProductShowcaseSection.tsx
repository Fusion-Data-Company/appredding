import React from 'react';
import backgroundImage from '@assets/Untitled design (3).png';

const ProductShowcaseSection: React.FC = () => {
  return (
    <section className="py-8 relative bg-black">
      <div className="text-center mb-0 px-4">
        <h2 className="text-4xl font-bold text-white mb-8">Our Solar Solutions</h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-0">
          Providing clean, renewable energy solutions for homes and businesses in Northern California.
        </p>
      </div>
      <div className="w-full">
        <img 
          src={backgroundImage}
          alt="Solar Equipment Solutions"
          className="w-full h-auto"
        />
      </div>
    </section>
  );
};

export default ProductShowcaseSection;