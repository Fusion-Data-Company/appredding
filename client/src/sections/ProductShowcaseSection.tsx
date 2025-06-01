import React from 'react';
import backgroundImage from '@assets/Untitled design (3).png';

const ProductShowcaseSection: React.FC = () => {
  return (
    <section 
      className="py-20 px-4 relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Our Solar Solutions</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Providing clean, renewable energy solutions for homes and businesses in Northern California.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcaseSection;