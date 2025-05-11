import React from 'react';
import { Lamp } from '@/components/ui/lamp';
import { PraetorianGradientText } from '@/components/ui/praetorian-gradient-text';
import { PraetorianButton } from '@/components/ui/praetorian-button';
import { PlusCircle, Database, Users, Settings, Package, LogIn, MessageSquare, FileText } from 'lucide-react';

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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <PraetorianButton 
          variant="fire" 
          leftIcon={<Package size={18} />}
          fullWidth
          href="/crm-dashboard?tab=inventory"
        >
          Inventory Management
        </PraetorianButton>
        
        <PraetorianButton 
          variant="water" 
          leftIcon={<Database size={18} />}
          fullWidth
          href="/crm"
        >
          CRM Dashboard
        </PraetorianButton>
        
        <PraetorianButton 
          variant="premium" 
          leftIcon={<LogIn size={18} />}
          fullWidth
          href="/crm-login"
        >
          Admin Login
        </PraetorianButton>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <PraetorianButton 
          variant="metal" 
          leftIcon={<PlusCircle size={18} />}
          fullWidth
        >
          Add New Contact
        </PraetorianButton>
        
        <PraetorianButton 
          variant="ghost" 
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