import React from 'react';
import backgroundImage from '@assets/Untitled design (3).png';

const ProductShowcaseSection: React.FC = () => {
  return (
    <section className="relative bg-black" style={{ marginTop: '0' }}>
      <img 
        src={backgroundImage}
        alt="Solar Equipment Solutions"
        className="w-full h-auto block"
      />
    </section>
  );
};

export default ProductShowcaseSection;