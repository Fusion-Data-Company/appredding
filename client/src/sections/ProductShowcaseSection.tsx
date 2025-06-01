import React from 'react';
import backgroundImage from '@assets/Untitled design (3).png';

const ProductShowcaseSection: React.FC = () => {
  return (
    <section className="pt-2 pb-8 relative bg-black">
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