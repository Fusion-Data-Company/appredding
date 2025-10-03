import React from 'react';
import { Lamp } from '@/components/ui/lamp';
import { Button } from '@/components/ui/button';
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
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-blue-400">
            ADVANCE POWER OF REDDING CRM
          </h1>
          <p className="text-white text-lg">
            Solar Installation & Repair Customer Management System
          </p>
        </div>
      </Lamp>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
        <Button 
          className="w-full"
          asChild
        >
          <a href="/inventory" className="flex items-center justify-center gap-2">
            <Package size={18} />
            Inventory Management
          </a>
        </Button>
        
        <Button 
          className="w-full"
          asChild
        >
          <a href="/crm" className="flex items-center justify-center gap-2">
            <Database size={18} />
            CRM Dashboard
          </a>
        </Button>
        
        <Button 
          className="w-full"
          asChild
        >
          <a href="/crm-login" className="flex items-center justify-center gap-2">
            <LogIn size={18} />
            Admin Login
          </a>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <Button 
          variant="outline"
          className="w-full"
        >
          <PlusCircle size={18} className="mr-2" />
          Add New Contact
        </Button>
        
        <Button 
          variant="outline"
          className="w-full"
        >
          <Users size={18} className="mr-2" />
          Team Directory
        </Button>
        
        <Button 
          variant="outline"
          className="w-full"
        >
          <Settings size={18} className="mr-2" />
          System Settings
        </Button>
      </div>
    </div>
  );
};