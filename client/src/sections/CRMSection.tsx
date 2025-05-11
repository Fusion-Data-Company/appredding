import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PraetorianButton } from '@/components/ui/praetorian-button';
import { 
  Users, 
  Building2, 
  BarChart3, 
  Calendar, 
  PlusCircle, 
  Mail,
  Phone,
  FileEdit,
  UserPlus,
  Package
} from 'lucide-react';

import AnalyticsDashboard from '@/components/crm/AnalyticsDashboard';
import { ContactForm } from '@/components/crm/ContactForm';
import { CompanyForm } from '@/components/crm/CompanyForm';
import { OpportunityForm } from '@/components/crm/OpportunityForm';
import { InventoryTable } from '@/components/crm/InventoryTable';
import { ActivityForm } from '@/components/crm/ActivityForm';
import { CSVImportForm } from '@/components/crm/CSVImportForm';
import RegistrationTabs from '@/components/crm/RegistrationTabs';

export default function CRMSection() {
  // Modal states
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [companyModalOpen, setCompanyModalOpen] = useState(false);
  const [opportunityModalOpen, setOpportunityModalOpen] = useState(false);
  const [activityModalOpen, setActivityModalOpen] = useState(false);
  
  // Define types for our data
  interface Contact {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    jobTitle?: string;
    companyId?: number;
    companyName?: string;
    status?: string;
    createdAt?: string;
  }
  
  interface Company {
    id: number;
    name: string;
    industry?: string;
    phone?: string;
    website?: string;
    address?: string;
    createdAt?: string;
  }
  
  interface Opportunity {
    id: number;
    name: string;
    companyId?: number;
    companyName?: string;
    contactId?: number;
    amount?: number;
    status?: string;
    probability?: number;
    expectedCloseDate?: string;
    createdAt?: string;
    updatedAt?: string;
  }

  // Fetch data for dropdowns in forms
  const { 
    data: contacts = [],
    refetch: refetchContacts 
  } = useQuery<Contact[]>({
    queryKey: ['/api/contacts'],
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  const { 
    data: companies = [],
    refetch: refetchCompanies 
  } = useQuery<Company[]>({
    queryKey: ['/api/companies'],
    staleTime: 5 * 60 * 1000,
  });
  
  const { 
    data: opportunities = [],
    refetch: refetchOpportunities 
  } = useQuery<Opportunity[]>({
    queryKey: ['/api/opportunities'],
    staleTime: 5 * 60 * 1000,
  });

  return (
    <div className="w-full px-4 py-10 md:px-8 lg:px-12 bg-gray-900 min-h-screen">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold gradient-text-cyan mb-1">CRM Dashboard</h1>
          <p className="text-gray-400">Manage contacts, companies, opportunities, and activities</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* Admin CRM Login Button */}
          <PraetorianButton
            variant="premium"
            size="md"
            leftIcon={<Users size={16} />}
            href="/crm-login"
          >
            CRM Admin Login
          </PraetorianButton>
          
          {/* CSV Import Button with data refresh */}
          <CSVImportForm 
            onSuccess={() => {
              // Refresh data after successful import
              refetchContacts();
              refetchCompanies();
              refetchOpportunities();
            }} 
          />
          
          <PraetorianButton
            variant="water"
            size="md"
            leftIcon={<PlusCircle size={16} />}
            onClick={() => setContactModalOpen(true)}
          >
            Add Contact
          </PraetorianButton>
          
          <PraetorianButton
            variant="fire"
            size="md"
            leftIcon={<PlusCircle size={16} />}
            onClick={() => setCompanyModalOpen(true)}
          >
            Add Company
          </PraetorianButton>
          
          <PraetorianButton
            variant="premium"
            size="md"
            leftIcon={<PlusCircle size={16} />}
            onClick={() => setOpportunityModalOpen(true)}
          >
            New Opportunity
          </PraetorianButton>
          
          <PraetorianButton
            variant="metal"
            size="md"
            leftIcon={<PlusCircle size={16} />}
            onClick={() => setActivityModalOpen(true)}
          >
            Schedule Activity
          </PraetorianButton>
        </div>
      </div>

      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-7 bg-gray-800/50 rounded-lg p-1">
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden md:inline">Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="contacts" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden md:inline">Contacts</span>
          </TabsTrigger>
          <TabsTrigger value="companies" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            <span className="hidden md:inline">Companies</span>
          </TabsTrigger>
          <TabsTrigger value="opportunities" className="flex items-center gap-2">
            <FileEdit className="h-4 w-4" />
            <span className="hidden md:inline">Opportunities</span>
          </TabsTrigger>
          <TabsTrigger value="inventory" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            <span className="hidden md:inline">Inventory</span>
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden md:inline">Calendar</span>
          </TabsTrigger>
          <TabsTrigger value="registrations" className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            <span className="hidden md:inline">Registrations</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="mt-6">
          <AnalyticsDashboard />
        </TabsContent>

        <TabsContent value="contacts" className="mt-6">
          {contacts.length === 0 ? (
            <div className="card-premium p-8 text-center">
              <h3 className="text-xl font-bold mb-4">No Contacts Yet</h3>
              <p className="text-gray-400 mb-6">Add your first contact to start building your network</p>
              <PraetorianButton
                variant="water"
                onClick={() => setContactModalOpen(true)}
                leftIcon={<PlusCircle size={16} />}
              >
                Add Contact
              </PraetorianButton>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contacts.map((contact) => (
                <div key={contact.id} className="card-base p-6 hover:card-glow-cyan transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{contact.firstName} {contact.lastName}</h3>
                      <p className="text-gray-400 text-sm">{contact.jobTitle || 'No title'}</p>
                    </div>
                    <div className="flex space-x-2">
                      {contact.email && (
                        <a href={`mailto:${contact.email}`} className="text-gray-400 hover:text-cyan-400">
                          <Mail size={16} />
                        </a>
                      )}
                      {contact.phone && (
                        <a href={`tel:${contact.phone}`} className="text-gray-400 hover:text-cyan-400">
                          <Phone size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {contact.companyName && (
                    <div className="mt-2">
                      <span className="text-sm text-gray-500">Company:</span>
                      <span className="text-sm text-gray-400 ml-2">{contact.companyName}</span>
                    </div>
                  )}
                  
                  <div className="mt-2 flex justify-between">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      contact.status === 'lead' ? 'bg-blue-900/50 text-blue-400' :
                      contact.status === 'prospect' ? 'bg-amber-900/50 text-amber-400' :
                      contact.status === 'customer' ? 'bg-green-900/50 text-green-400' :
                      'bg-gray-800 text-gray-400'
                    }`}>
                      {contact.status ? contact.status.charAt(0).toUpperCase() + contact.status.slice(1) : 'Lead'}
                    </span>
                    
                    <span className="text-xs text-gray-500">
                      {contact.createdAt ? new Date(contact.createdAt).toLocaleDateString() : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="companies" className="mt-6">
          {companies.length === 0 ? (
            <div className="card-premium p-8 text-center">
              <h3 className="text-xl font-bold mb-4">No Companies Yet</h3>
              <p className="text-gray-400 mb-6">Add your first company to start tracking business relationships</p>
              <PraetorianButton
                variant="fire"
                onClick={() => setCompanyModalOpen(true)}
                leftIcon={<PlusCircle size={16} />}
              >
                Add Company
              </PraetorianButton>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map((company) => (
                <div key={company.id} className="card-base p-6 hover:card-glow-orange transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{company.name}</h3>
                      <p className="text-gray-400 text-sm">{company.industry || 'No industry'}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {company.phone && (
                      <div>
                        <span className="text-xs text-gray-500">Phone:</span>
                        <p className="text-sm text-gray-300">{company.phone}</p>
                      </div>
                    )}
                    
                    {company.website && (
                      <div>
                        <span className="text-xs text-gray-500">Website:</span>
                        <p className="text-sm text-gray-300 truncate">{company.website}</p>
                      </div>
                    )}
                    
                    {company.address && (
                      <div className="col-span-2">
                        <span className="text-xs text-gray-500">Address:</span>
                        <p className="text-sm text-gray-300">{company.address}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="opportunities" className="mt-6">
          {opportunities.length === 0 ? (
            <div className="card-premium p-8 text-center">
              <h3 className="text-xl font-bold mb-4">No Opportunities Yet</h3>
              <p className="text-gray-400 mb-6">Create your first opportunity to track potential deals</p>
              <PraetorianButton
                variant="premium"
                onClick={() => setOpportunityModalOpen(true)}
                leftIcon={<PlusCircle size={16} />}
              >
                New Opportunity
              </PraetorianButton>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {opportunities.map((opportunity) => (
                <div key={opportunity.id} className="card-base p-6 hover:card-glow-amber transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{opportunity.name}</h3>
                      <p className="text-gray-400 text-sm">
                        {opportunity.companyName ? `${opportunity.companyName}` : 'No company'} 
                        {opportunity.amount ? ` • $${opportunity.amount.toLocaleString()}` : ''}
                      </p>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded-full ${
                      opportunity.status === 'pending' ? 'bg-yellow-900/50 text-yellow-300' :
                      opportunity.status === 'in_progress' ? 'bg-blue-900/50 text-blue-300' :
                      opportunity.status === 'completed' ? 'bg-green-900/50 text-green-300' :
                      opportunity.status === 'cancelled' ? 'bg-red-900/50 text-red-300' :
                      'bg-gray-800 text-gray-300'
                    }`}>
                      {opportunity.status ? opportunity.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Pending'}
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    <div className="w-full max-w-[200px]">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500">Probability:</span>
                        <span className="text-gray-300">{opportunity.probability || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="h-2 rounded-full bg-gradient-to-r from-yellow-500 to-amber-500" 
                          style={{ width: `${opportunity.probability || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {opportunity.expectedCloseDate && (
                      <div className="text-right">
                        <span className="text-xs text-gray-500">Expected Close:</span>
                        <p className="text-sm text-gray-300">{new Date(opportunity.expectedCloseDate).toLocaleDateString()}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="inventory" className="mt-6">
          <div className="card-premium p-6">
            <h2 className="text-xl font-bold mb-4">Product Inventory</h2>
            <InventoryTable isAdmin={true} />
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="mt-6">
          <div className="card-premium p-8 text-center">
            <h3 className="text-xl font-bold mb-4">Calendar View Coming Soon</h3>
            <p className="text-gray-400 mb-6">Schedule activities and meetings in the meantime</p>
            <PraetorianButton
              variant="metal"
              onClick={() => setActivityModalOpen(true)}
              leftIcon={<PlusCircle size={16} />}
            >
              Schedule Activity
            </PraetorianButton>
          </div>
        </TabsContent>
        
        <TabsContent value="registrations" className="mt-6">
          <RegistrationTabs />
        </TabsContent>
      </Tabs>

      {/* Form Modals */}
      <ContactForm 
        isOpen={contactModalOpen} 
        onClose={() => setContactModalOpen(false)} 
        companies={companies} 
      />
      
      <CompanyForm 
        isOpen={companyModalOpen} 
        onClose={() => setCompanyModalOpen(false)} 
      />
      
      <OpportunityForm 
        isOpen={opportunityModalOpen} 
        onClose={() => setOpportunityModalOpen(false)} 
        contacts={contacts}
        companies={companies}
      />
      
      <ActivityForm 
        isOpen={activityModalOpen} 
        onClose={() => setActivityModalOpen(false)} 
        contacts={contacts}
        companies={companies}
        opportunities={opportunities}
      />
    </div>
  );
}