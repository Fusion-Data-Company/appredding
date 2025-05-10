import React from 'react';
import { Lamp } from '@/components/ui/lamp';
import { PraetorianGradientText } from '@/components/ui/praetorian-gradient-text';
import { PraetorianButton } from '@/components/ui/praetorian-button';
import { PlusCircle, Database, Users, Settings } from 'lucide-react';

export const CRMHeader = () => {
  return (
    <div className="mb-10">
      <Lamp 
        variant="large" 
        blobs="complex" 
        shape="pill" 
        border="glow" 
        className="mb-8"
      >
        <div className="text-center space-y-4">
          <PraetorianGradientText 
            variant="dual" 
            size="4xl" 
            glow="md" 
            weight="extrabold"
          >
            PRAETORIAN CRM PORTAL
          </PraetorianGradientText>
          <p className="text-white text-lg">
            Premium Client Relationship Management System
          </p>
        </div>
      </Lamp>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <PraetorianButton 
          variant="fire" 
          leftIcon={<PlusCircle size={18} />}
          fullWidth
        >
          Add New Contact
        </PraetorianButton>
        
        <PraetorianButton 
          variant="water" 
          leftIcon={<Database size={18} />}
          fullWidth
        >
          Projects Database
        </PraetorianButton>
        
        <PraetorianButton 
          variant="metal" 
          leftIcon={<Users size={18} />}
          fullWidth
        >
          Team Directory
        </PraetorianButton>
        
        <PraetorianButton 
          variant="ghost" 
          leftIcon={<Settings size={18} />}
          fullWidth
        >
          System Settings
        </PraetorianButton>
      </div>
    </div>
  );
};