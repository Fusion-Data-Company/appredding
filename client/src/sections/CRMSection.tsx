import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, Building2, Briefcase, Calendar, Activity } from "lucide-react";
import ContactsTable from "@/components/crm/ContactsTable";

const CRMSection = () => {
  const [activeTab, setActiveTab] = useState("contacts");

  return (
    <section className="py-8 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-6">
          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-[#121212] border-[#333333]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-500" />
                  Contacts
                </CardTitle>
                <CardDescription>Total contacts in system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">124</div>
                <p className="text-xs text-muted-foreground mt-1">+12 this month</p>
              </CardContent>
            </Card>
            
            <Card className="bg-[#121212] border-[#333333]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-purple-500" />
                  Companies
                </CardTitle>
                <CardDescription>Active companies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">36</div>
                <p className="text-xs text-muted-foreground mt-1">+3 this month</p>
              </CardContent>
            </Card>
            
            <Card className="bg-[#121212] border-[#333333]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-green-500" />
                  Opportunities
                </CardTitle>
                <CardDescription>Active deals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground mt-1">$1.2M pipeline</p>
              </CardContent>
            </Card>
            
            <Card className="bg-[#121212] border-[#333333]">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Activity className="h-5 w-5 text-red-500" />
                  Activities
                </CardTitle>
                <CardDescription>Pending activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground mt-1">5 overdue</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex items-center justify-between">
              <TabsList className="bg-[#121212]">
                <TabsTrigger value="contacts" className="data-[state=active]:bg-[#0070f3] data-[state=active]:text-white">
                  Contacts
                </TabsTrigger>
                <TabsTrigger value="companies" className="data-[state=active]:bg-[#0070f3] data-[state=active]:text-white">
                  Companies
                </TabsTrigger>
                <TabsTrigger value="opportunities" className="data-[state=active]:bg-[#0070f3] data-[state=active]:text-white">
                  Opportunities
                </TabsTrigger>
                <TabsTrigger value="activities" className="data-[state=active]:bg-[#0070f3] data-[state=active]:text-white">
                  Activities
                </TabsTrigger>
              </TabsList>
              
              <Button className="bg-[#0070f3] hover:bg-blue-600">
                <Plus className="h-4 w-4 mr-2" />
                Add {activeTab.slice(0, -1)}
              </Button>
            </div>
            
            <TabsContent value="contacts" className="m-0">
              <ContactsTable />
            </TabsContent>
            
            <TabsContent value="companies" className="m-0">
              <div className="bg-[#121212] border border-[#333333] rounded-lg p-8 text-center">
                <Building2 className="h-12 w-12 mx-auto mb-4 text-[#666666]" />
                <h3 className="text-xl font-semibold mb-2">Companies Module</h3>
                <p className="text-[#a0a0a0] mb-4 max-w-md mx-auto">
                  List and manage all your business accounts in one place.
                </p>
                <Button className="bg-[#0070f3] hover:bg-blue-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Company
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="opportunities" className="m-0">
              <div className="bg-[#121212] border border-[#333333] rounded-lg p-8 text-center">
                <Briefcase className="h-12 w-12 mx-auto mb-4 text-[#666666]" />
                <h3 className="text-xl font-semibold mb-2">Opportunities Module</h3>
                <p className="text-[#a0a0a0] mb-4 max-w-md mx-auto">
                  Track all your deals from lead to close in a customizable pipeline.
                </p>
                <Button className="bg-[#0070f3] hover:bg-blue-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Opportunity
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="activities" className="m-0">
              <div className="bg-[#121212] border border-[#333333] rounded-lg p-8 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-[#666666]" />
                <h3 className="text-xl font-semibold mb-2">Activities Module</h3>
                <p className="text-[#a0a0a0] mb-4 max-w-md mx-auto">
                  Schedule and track all your customer interactions in one place.
                </p>
                <Button className="bg-[#0070f3] hover:bg-blue-600">
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
