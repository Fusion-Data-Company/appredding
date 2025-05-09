import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Contact, Company } from "@shared/schema";
import { X, Mail, Phone, Building2, MapPin, Calendar, Edit, User, Briefcase, Hash, Activity, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

// Extended Contact type that includes populated company relation
type ContactWithCompany = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  mobilePhone: string | null;
  jobTitle: string | null;
  department: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  country: string | null;
  website: string | null;
  source: string | null;
  status: string | null;
  interestedInApplications?: string[] | null;
  notes: string | null;
  birthday: string | null;
  linkedinUrl: string | null;
  twitterUrl: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  lastContactedDate: string | null;
  createdAt: string;
  updatedAt: string;
  createdBy: number | null;
  assignedTo: number | null;
  company?: Company;
  companyId?: number;
}

interface ContactDrawerProps {
  contact: ContactWithCompany;
  isOpen: boolean;
  onClose: () => void;
}

const ContactDrawer = ({ contact, isOpen, onClose }: ContactDrawerProps) => {
  const [activeTab, setActiveTab] = useState("info");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const getContactStatus = (status: string | undefined | null) => {
    switch (status) {
      case "lead":
        return <Badge className="bg-blue-500 text-white">Lead</Badge>;
      case "prospect":
        return <Badge className="bg-orange-500 text-white">Prospect</Badge>;
      case "customer":
        return <Badge className="bg-green-500 text-white">Customer</Badge>;
      case "inactive":
        return <Badge className="bg-gray-500 text-white">Inactive</Badge>;
      default:
        return <Badge className="bg-gray-500 text-white">Unknown</Badge>;
    }
  };

  const getLeadSource = (source: string | undefined | null) => {
    switch (source) {
      case "website":
        return <Badge className="bg-blue-500 text-white">Website</Badge>;
      case "referral":
        return <Badge className="bg-green-500 text-white">Referral</Badge>;
      case "social_media":
        return <Badge className="bg-purple-500 text-white">Social Media</Badge>;
      case "direct":
        return <Badge className="bg-red-500 text-white">Direct</Badge>;
      case "trade_show":
        return <Badge className="bg-yellow-500 text-white">Trade Show</Badge>;
      case "other":
        return <Badge className="bg-gray-500 text-white">Other</Badge>;
      default:
        return <Badge className="bg-gray-500 text-white">Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string | undefined | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-xl overflow-y-auto p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white relative">
            <Button 
              onClick={onClose} 
              variant="ghost" 
              className="absolute right-4 top-4 text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-300 to-purple-400 flex items-center justify-center text-2xl font-bold mr-4">
                {contact.firstName?.[0]}{contact.lastName?.[0]}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{`${contact.firstName} ${contact.lastName}`}</h3>
                <p className="text-blue-100">{contact.jobTitle || "No title"}</p>
                <div className="flex gap-2 mt-1">
                  {getContactStatus(contact.status)}
                  {getLeadSource(contact.source)}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 opacity-70" />
                <span className="text-sm truncate">{contact.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 opacity-70" />
                <span className="text-sm">{contact.phone || "No phone"}</span>
              </div>
              <div className="flex items-center">
                <Building2 className="h-4 w-4 mr-2 opacity-70" />
                <span className="text-sm">{contact.company?.name || "No company"}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2 opacity-70" />
                <span className="text-sm">Added {formatDate(contact.createdAt)}</span>
              </div>
            </div>
          </div>
          
          {/* Tabs navigation */}
          <Tabs 
            defaultValue="info" 
            className="flex-grow"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            <div className="border-b px-6">
              <TabsList className="bg-transparent h-12">
                <TabsTrigger value="info" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none">Info</TabsTrigger>
                <TabsTrigger value="activities" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none">Activities</TabsTrigger>
                <TabsTrigger value="opportunities" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none">Opportunities</TabsTrigger>
                <TabsTrigger value="notes" className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none">Notes</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="info" className="mt-0 p-6 space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Contact Information</h3>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">First Name</p>
                  <p className="font-medium">{contact.firstName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Last Name</p>
                  <p className="font-medium">{contact.lastName}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{contact.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{contact.phone || "—"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Mobile Phone</p>
                  <p className="font-medium">{contact.mobilePhone || "—"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Job Title</p>
                  <p className="font-medium">{contact.jobTitle || "—"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="font-medium">{contact.department || "—"}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <div>{getContactStatus(contact.status)}</div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Source</p>
                  <div>{getLeadSource(contact.source)}</div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Created Date</p>
                  <p className="font-medium">{formatDate(contact.createdAt)}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-4">Address Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Street</p>
                    <p className="font-medium">{contact.address || "—"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">City</p>
                    <p className="font-medium">{contact.city || "—"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">State</p>
                    <p className="font-medium">{contact.state || "—"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Zip Code</p>
                    <p className="font-medium">{contact.zipCode || "—"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Country</p>
                    <p className="font-medium">{contact.country || "—"}</p>
                  </div>
                </div>
              </div>

              {contact.company && (
                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">Company Information</h3>
                  <div className="p-4 rounded-lg bg-muted/30 border">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-md bg-primary/20 flex items-center justify-center text-primary">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{contact.company.name}</h4>
                        <p className="text-sm text-muted-foreground">{contact.company.industry || "No industry"}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{contact.company.city || "Location unavailable"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{contact.company.employeeCount || "—"} employees</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-4">Applications of Interest</h3>
                <div className="flex flex-wrap gap-2">
                  {contact.interestedInApplications && Array.isArray(contact.interestedInApplications) && contact.interestedInApplications.length > 0 ? (
                    contact.interestedInApplications.map((app: string) => {
                      const applicationTypes = {
                        painter_network: { label: "Painter Network", color: "bg-blue-500" },
                        marina: { label: "Marina", color: "bg-cyan-500" },
                        fire_prevention: { label: "Fire Prevention", color: "bg-red-500" },
                        pool: { label: "Pool", color: "bg-green-500" },
                        construction: { label: "Construction", color: "bg-yellow-500" },
                        mobile_home: { label: "Mobile Home", color: "bg-purple-500" },
                        municipality: { label: "Municipality", color: "bg-orange-500" },
                      };
                      const appType = applicationTypes[app as keyof typeof applicationTypes] || { label: app, color: "bg-gray-500" };
                      
                      return (
                        <Badge key={app} className={`${appType.color} text-white`}>
                          {appType.label}
                        </Badge>
                      );
                    })
                  ) : (
                    <p className="text-muted-foreground">No applications of interest specified</p>
                  )}
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-4">Additional Information</h3>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Notes</p>
                  <p className="font-medium whitespace-pre-line">{contact.notes || "No notes"}</p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activities" className="mt-0 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Activities</h3>
                <Button variant="default" size="sm">
                  <Activity className="h-4 w-4 mr-2" />
                  New Activity
                </Button>
              </div>
              
              <div className="text-center py-8 text-muted-foreground">
                <Activity className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>No activities found for this contact.</p>
                <Button variant="outline" className="mt-4">
                  Log an activity
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="opportunities" className="mt-0 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Opportunities</h3>
                <Button variant="default" size="sm">
                  <Briefcase className="h-4 w-4 mr-2" />
                  New Opportunity
                </Button>
              </div>
              
              <div className="text-center py-8 text-muted-foreground">
                <Briefcase className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>No opportunities found for this contact.</p>
                <Button variant="outline" className="mt-4">
                  Create opportunity
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="mt-0 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium">Notes</h3>
                <Button variant="default" size="sm">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Add Note
                </Button>
              </div>
              
              <div className="text-center py-8 text-muted-foreground">
                <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>No notes found for this contact.</p>
                <Button variant="outline" className="mt-4">
                  Add a note
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
};

const applicationTypes = {
  painter_network: { label: "Painter Network", color: "bg-blue-500" },
  marina: { label: "Marina", color: "bg-cyan-500" },
  fire_prevention: { label: "Fire Prevention", color: "bg-red-500" },
  pool: { label: "Pool", color: "bg-green-500" },
  construction: { label: "Construction", color: "bg-yellow-500" },
  mobile_home: { label: "Mobile Home", color: "bg-purple-500" },
  municipality: { label: "Municipality", color: "bg-orange-500" },
};

export default ContactDrawer;