import React from 'react';

const ProductShowcaseSection: React.FC = () => {
  return (
    <section className="bg-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
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