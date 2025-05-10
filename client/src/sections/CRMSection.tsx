import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Users, Building2, Briefcase, Calendar, Activity } from "lucide-react";
import ContactsTable from "@/components/crm/ContactsTable";
import AnalyticsDashboard from "@/components/crm/AnalyticsDashboard";

const CRMSection = () => {
  const [activeTab, setActiveTab] = useState("contacts");

  return (
    <section className="py-8 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-6">
          {/* Dashboard Stats */}
          <AnalyticsDashboard />
          
          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <TabsList className="bg-gradient-to-r from-black to-gray-900 border border-gray-800 shadow-lg px-1 py-1 rounded-md">
                <TabsTrigger 
                  value="contacts" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-700 data-[state=active]:to-blue-800 data-[state=active]:text-white data-[state=active]:shadow-cyan-700/20 text-gray-300 hover:text-white transition-all duration-300 rounded-sm"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Contacts
                </TabsTrigger>
                <TabsTrigger 
                  value="companies" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-700 data-[state=active]:to-indigo-800 data-[state=active]:text-white data-[state=active]:shadow-purple-700/20 text-gray-300 hover:text-white transition-all duration-300 rounded-sm"
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  Companies
                </TabsTrigger>
                <TabsTrigger 
                  value="opportunities" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-700 data-[state=active]:text-white data-[state=active]:shadow-orange-600/20 text-gray-300 hover:text-white transition-all duration-300 rounded-sm"
                >
                  <Briefcase className="h-4 w-4 mr-2" />
                  Opportunities
                </TabsTrigger>
                <TabsTrigger 
                  value="activities" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-green-700 data-[state=active]:text-white data-[state=active]:shadow-emerald-600/20 text-gray-300 hover:text-white transition-all duration-300 rounded-sm"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Activities
                </TabsTrigger>
              </TabsList>
              
              {activeTab === "contacts" && (
                <Button className="btn-accent-cyan self-end">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              )}
              
              {activeTab === "companies" && (
                <Button className="btn-secondary self-end">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Company
                </Button>
              )}
              
              {activeTab === "opportunities" && (
                <Button className="btn-accent-orange self-end">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Opportunity
                </Button>
              )}
              
              {activeTab === "activities" && (
                <Button className="btn-primary self-end">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Activity
                </Button>
              )}
            </div>
            
            <TabsContent value="contacts" className="m-0 animate-fadeIn">
              <ContactsTable />
            </TabsContent>
            
            <TabsContent value="companies" className="m-0 animate-fadeIn">
              <div className="card-premium p-8 text-center">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-xl animate-glow-pulse"></div>
                  <Building2 className="h-14 w-14 text-purple-400 relative z-10" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Companies Module</h3>
                <p className="text-gray-300 mb-6 max-w-md mx-auto">
                  List and manage all your business accounts in one place with seamless integration to your contacts.
                </p>
                <Button className="btn-secondary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Company
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="opportunities" className="m-0 animate-fadeIn">
              <div className="card-premium card-glow-orange p-8 text-center">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl animate-glow-pulse-orange"></div>
                  <Briefcase className="h-14 w-14 text-orange-400 relative z-10" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Opportunities Module</h3>
                <p className="text-gray-300 mb-6 max-w-md mx-auto">
                  Track all your deals from lead to close in a customizable pipeline with real-time status updates.
                </p>
                <Button className="btn-accent-orange">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Opportunity
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="activities" className="m-0 animate-fadeIn">
              <div className="card-premium p-8 text-center">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-glow-pulse"></div>
                  <Calendar className="h-14 w-14 text-blue-400 relative z-10" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Activities Module</h3>
                <p className="text-gray-300 mb-6 max-w-md mx-auto">
                  Schedule and track all your customer interactions in one place with automated reminders and follow-ups.
                </p>
                <Button className="btn-primary">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Activity
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default CRMSection;
