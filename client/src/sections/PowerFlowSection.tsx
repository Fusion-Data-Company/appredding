import React from 'react';
import { GridBackground } from '@/components/ui/glowing-card';

const PowerFlowSection: React.FC = () => {
  return (
    <section className="py-16 bg-black mb-24 relative z-50">
      <div className="container mx-auto px-4">
        <GridBackground
          title=""
          description=""
          showAvailability={false}
          className="max-w-4xl mx-auto"
        />
      </div>
    </section>
  );
};

export default PowerFlowSection;