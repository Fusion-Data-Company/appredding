import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Users, FileText, DollarSign, Phone, Mail, MapPin, Calendar, Search, Eye, Edit2, Trash2, Plus, Upload, Download, FormInput } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  status: string;
  source: string;
  interestedInServices?: string[];
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface Opportunity {
  id: number;
  name: string;
  contactId: number;
  solarServices?: string[];
  status: string;
  amount?: string;
  probability?: number;
  description?: string;
  source: string;
  location?: string;
  budget?: string;
  createdAt: string;
  updatedAt: string;
}

interface DashboardStats {
  totalContacts: number;
  totalOpportunities: number;
  recentContacts: Contact[];
  recentOpportunities: Opportunity[];
}

interface FormSubmission {
  id: number;
  contactId: number;
  formType: string;
  formData: any;
  submittedAt: string;
  contact?: Contact;
}

// Form validation schemas
const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  jobTitle: z.string().optional(),
  status: z.string().default("lead"),
  source: z.string().default("manual"),
  interestedInServices: z.array(z.string()).optional(),
  notes: z.string().optional()
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function CRMDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [isAddContactDialogOpen, setIsAddContactDialogOpen] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Contact form
  const contactForm = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "CA",
      zipCode: "",
      jobTitle: "",
      status: "lead",
      source: "manual",
      interestedInServices: [],
      notes: ""
    }
  });

  // Enhanced dashboard stats with comprehensive error handling
  const { data: dashboardData, isLoading: isDashboardLoading, error: dashboardError, refetch: refetchDashboard } = useQuery({
    queryKey: ["/api/crm/dashboard"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/crm/dashboard");
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${response.status}: Failed to fetch dashboard data`);
        }
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || "Dashboard data request failed");
        }
        return data.stats as DashboardStats;
      } catch (error) {
        console.error("Dashboard fetch error:", error);
        throw error;
      }
    },
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refresh every minute
  });

  // Enhanced contacts with comprehensive error handling
  const { data: contactsData, isLoading: isContactsLoading, error: contactsError, refetch: refetchContacts } = useQuery({
    queryKey: ["/api/crm/contacts"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/crm/contacts");
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${response.status}: Failed to fetch contacts`);
        }
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || "Contacts request failed");
        }
        return (data.contacts || []) as Contact[];
      } catch (error) {
        console.error("Contacts fetch error:", error);
        throw error;
      }
    },
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 30000,
  });

  // Enhanced opportunities with comprehensive error handling
  const { data: opportunitiesData, isLoading: isOpportunitiesLoading, error: opportunitiesError, refetch: refetchOpportunities } = useQuery({
    queryKey: ["/api/crm/opportunities"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/crm/opportunities");
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${response.status}: Failed to fetch opportunities`);
        }
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || "Opportunities request failed");
        }
        return (data.opportunities || []) as Opportunity[];
      } catch (error) {
        console.error("Opportunities fetch error:", error);
        throw error;
      }
    },
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 30000,
  });

  // Enhanced form submissions with comprehensive error handling
  const { data: formSubmissionsData, isLoading: isFormSubmissionsLoading, error: formSubmissionsError, refetch: refetchFormSubmissions } = useQuery({
    queryKey: ["/api/crm/form-submissions"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/crm/form-submissions");
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${response.status}: Failed to fetch form submissions`);
        }
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || "Form submissions request failed");
        }
        return (data.submissions || []) as FormSubmission[];
      } catch (error) {
        console.error("Form submissions fetch error:", error);
        throw error;
      }
    },
    retry: 3,
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    staleTime: 30000,
  });

  // Search contacts
  const { data: searchResults } = useQuery({
    queryKey: ["/api/crm/contacts/search", searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];
      const response = await fetch(`/api/crm/contacts/search/${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error("Failed to search contacts");
      const data = await response.json();
      return data.contacts as Contact[];
    },
    enabled: searchQuery.length > 2
  });

  // Enhanced add contact mutation with comprehensive error handling
  const addContactMutation = useMutation({
    mutationFn: async (contactData: ContactFormData) => {
      try {
        const response = await fetch("/api/crm/contacts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(contactData)
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${response.status}: Failed to add contact`);
        }
        
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || "Contact creation failed");
        }
        
        return data;
      } catch (error) {
        console.error("Add contact error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/crm/contacts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/crm/dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["/api/crm/form-submissions"] });
      toast({ 
        title: "Success", 
        description: `Contact "${data.contact?.firstName} ${data.contact?.lastName}" added successfully`,
        className: "bg-green-50 border-green-200"
      });
      setIsAddContactDialogOpen(false);
      contactForm.reset();
    },
    onError: (error: Error) => {
      console.error("Contact creation failed:", error);
      toast({ 
        title: "Error", 
        description: error.message || "Failed to add contact. Please try again.",
        variant: "destructive" 
      });
    }
  });

  // Enhanced CSV import mutation with comprehensive error handling
  const csvImportMutation = useMutation({
    mutationFn: async (file: File) => {
      try {
        const formData = new FormData();
        formData.append("csvFile", file);
        
        const response = await fetch("/api/crm/contacts/import", {
          method: "POST",
          body: formData
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `HTTP ${response.status}: Failed to import CSV`);
        }
        
        const data = await response.json();
        if (!data.success) {
          throw new Error(data.error || "CSV import failed");
        }
        
        return data;
      } catch (error) {
        console.error("CSV import error:", error);
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/crm/contacts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/crm/dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["/api/crm/form-submissions"] });
      toast({ 
        title: "Import Successful", 
        description: `Imported ${data.imported} contacts successfully${data.skipped > 0 ? `, skipped ${data.skipped} invalid records` : ''}`,
        className: "bg-green-50 border-green-200"
      });
      setCsvFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    },
    onError: (error: Error) => {
      console.error("CSV import failed:", error);
      toast({ 
        title: "Import Failed", 
        description: error.message || "Failed to import CSV file. Please check the file format and try again.",
        variant: "destructive" 
      });
    }
  });

  // Update contact mutation
  const updateContactMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Contact> }) => {
      const response = await fetch(`/api/crm/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error("Failed to update contact");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/crm/contacts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/crm/dashboard"] });
      toast({ title: "Success", description: "Contact updated successfully" });
      setEditingContact(null);
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update contact", variant: "destructive" });
    }
  });

  // Delete contact mutation
  const deleteContactMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/crm/contacts/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete contact");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/crm/contacts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/crm/dashboard"] });
      toast({ title: "Success", description: "Contact deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete contact", variant: "destructive" });
    }
  });



  // Handle CSV file selection
  const handleCsvFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      setCsvFile(file);
    } else {
      toast({ title: "Error", description: "Please select a valid CSV file", variant: "destructive" });
    }
  };

  // Handle CSV import
  const handleCsvImport = () => {
    if (csvFile) {
      csvImportMutation.mutate(csvFile);
    }
  };

  // Download CSV template
  const downloadCsvTemplate = () => {
    const csvContent = "firstName,lastName,email,phone,address,city,state,zipCode,jobTitle,status,source,interestedInServices,notes\nJohn,Doe,john.doe@example.com,(555) 123-4567,123 Main St,Redding,CA,96001,Homeowner,lead,website,\"Solar Installation, Battery Storage\",Interested in residential solar";
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "contacts_template.csv";
    link.click();
    window.URL.revokeObjectURL(url);
  };

  // Add contact form submission
  const onAddContact = (data: ContactFormData) => {
    addContactMutation.mutate(data);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "lead": return "bg-blue-100 text-blue-800";
      case "prospect": return "bg-yellow-100 text-yellow-800";
      case "customer": return "bg-green-100 text-green-800";
      case "closed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getOpportunityStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "qualified": return "bg-blue-100 text-blue-800";
      case "proposal": return "bg-purple-100 text-purple-800";
      case "negotiation": return "bg-orange-100 text-orange-800";
      case "closed-won": return "bg-green-100 text-green-800";
      case "closed-lost": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const displayedContacts = searchQuery.length > 2 ? (searchResults || []) : (contactsData || []);

  if (isDashboardLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 p-6">
        <div className="container mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your CRM dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Solar CRM Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage your solar leads and customer relationships</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Advance Power Redding</p>
              <p className="text-sm text-gray-500">25+ Years in Solar Excellence</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{dashboardData?.totalContacts || 0}</div>
              <p className="text-xs text-muted-foreground">Solar prospects & customers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Opportunities</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{dashboardData?.totalOpportunities || 0}</div>
              <p className="text-xs text-muted-foreground">Solar quotes & consultations</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Potential Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${((opportunitiesData || [])
                  .filter(opp => opp.amount)
                  .reduce((sum, opp) => sum + parseFloat(opp.amount!.replace(/[^0-9.]/g, '') || '0'), 0)
                  .toLocaleString())}
              </div>
              <p className="text-xs text-muted-foreground">From active opportunities</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {(dashboardData?.recentContacts || []).filter(contact => 
                  new Date(contact.createdAt).getMonth() === new Date().getMonth()
                ).length}
              </div>
              <p className="text-xs text-muted-foreground">New leads this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="contacts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="forms">Form Submissions</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          </TabsList>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Solar Contacts</CardTitle>
                    <CardDescription>All your solar prospects and customers</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search contacts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 w-64"
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={downloadCsvTemplate}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      CSV Template
                    </Button>
                    <div className="flex items-center gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv"
                        onChange={handleCsvFileChange}
                        className="hidden"
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Import CSV
                      </Button>
                      {csvFile && (
                        <Button 
                          size="sm"
                          onClick={handleCsvImport}
                          disabled={csvImportMutation.isPending}
                        >
                          {csvImportMutation.isPending ? "Importing..." : "Process CSV"}
                        </Button>
                      )}
                    </div>
                    <Dialog open={isAddContactDialogOpen} onOpenChange={setIsAddContactDialogOpen}>
                      <DialogTrigger asChild>
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Contact
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Add New Contact</DialogTitle>
                          <DialogDescription>
                            Enter the contact information below.
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...contactForm}>
                          <form onSubmit={contactForm.handleSubmit(onAddContact)} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={contactForm.control}
                                name="firstName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={contactForm.control}
                                name="lastName"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={contactForm.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                      <Input type="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={contactForm.control}
                                name="phone"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <FormField
                              control={contactForm.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Address</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="grid grid-cols-3 gap-4">
                              <FormField
                                control={contactForm.control}
                                name="city"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>City</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={contactForm.control}
                                name="state"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>State</FormLabel>
                                    <FormControl>
                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select state" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="CA">California</SelectItem>
                                          <SelectItem value="OR">Oregon</SelectItem>
                                          <SelectItem value="WA">Washington</SelectItem>
                                          <SelectItem value="NV">Nevada</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={contactForm.control}
                                name="zipCode"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>ZIP Code</FormLabel>
                                    <FormControl>
                                      <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <FormField
                                control={contactForm.control}
                                name="status"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="lead">Lead</SelectItem>
                                          <SelectItem value="prospect">Prospect</SelectItem>
                                          <SelectItem value="customer">Customer</SelectItem>
                                          <SelectItem value="inactive">Inactive</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={contactForm.control}
                                name="source"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Source</FormLabel>
                                    <FormControl>
                                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                          <SelectValue placeholder="Select source" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="website">Website</SelectItem>
                                          <SelectItem value="referral">Referral</SelectItem>
                                          <SelectItem value="social">Social Media</SelectItem>
                                          <SelectItem value="advertising">Advertising</SelectItem>
                                          <SelectItem value="manual">Manual Entry</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <FormField
                              control={contactForm.control}
                              name="notes"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Notes</FormLabel>
                                  <FormControl>
                                    <Textarea {...field} rows={3} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="flex justify-end space-x-2">
                              <Button 
                                type="button" 
                                variant="outline" 
                                onClick={() => setIsAddContactDialogOpen(false)}
                              >
                                Cancel
                              </Button>
                              <Button 
                                type="submit" 
                                disabled={addContactMutation.isPending}
                              >
                                {addContactMutation.isPending ? "Adding..." : "Add Contact"}
                              </Button>
                            </div>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                {csvFile && (
                  <p className="text-sm text-green-600 mt-2">
                    Selected file: {csvFile.name}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                {isContactsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading contacts...</p>
                  </div>
                ) : contactsError ? (
                  <div className="text-center py-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-600 font-medium">Error loading contacts</p>
                      <p className="text-red-500 text-sm mt-1">{contactsError.message}</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => refetchContacts()}
                        className="mt-3"
                      >
                        Try Again
                      </Button>
                    </div>
                  </div>
                ) : displayedContacts.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 font-medium">No contacts found</p>
                    <p className="text-gray-500 text-sm mt-1">
                      {searchQuery ? "Try adjusting your search" : "Add your first contact to get started"}
                    </p>
                    {!searchQuery && (
                      <Button 
                        onClick={() => setIsAddContactDialogOpen(true)}
                        className="mt-4"
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add First Contact
                      </Button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {displayedContacts.map((contact) => (
                      <div key={contact.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-4">
                              <div>
                                <h3 className="font-semibold text-gray-900">
                                  {contact.firstName} {contact.lastName}
                                </h3>
                                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                                  <span className="flex items-center">
                                    <Mail className="h-3 w-3 mr-1" />
                                    {contact.email}
                                  </span>
                                  <span className="flex items-center">
                                    <Phone className="h-3 w-3 mr-1" />
                                    {contact.phone}
                                  </span>
                                  {contact.city && (
                                    <span className="flex items-center">
                                      <MapPin className="h-3 w-3 mr-1" />
                                      {contact.city}, {contact.state}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge className={getStatusColor(contact.status)}>
                                {contact.status}
                              </Badge>
                              <Badge variant="outline">{contact.source}</Badge>
                              {contact.interestedInServices && contact.interestedInServices.length > 0 && (
                                <Badge variant="secondary">
                                  {contact.interestedInServices.length} Service{contact.interestedInServices.length > 1 ? 's' : ''}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedContact(contact);
                                setIsContactDialogOpen(true);
                              }}
                            >
                              <Eye className="h-3 w-3 mr-1" />
                              View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingContact(contact)}
                            >
                              <Edit2 className="h-3 w-3 mr-1" />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                if (confirm("Are you sure you want to delete this contact?")) {
                                  deleteContactMutation.mutate(contact.id);
                                }
                              }}
                            >
                              <Trash2 className="h-3 w-3 mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {displayedContacts.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        {searchQuery ? "No contacts found matching your search." : "No contacts found."}
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Form Submissions Tab */}
          <TabsContent value="forms" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FormInput className="h-5 w-5" />
                  Form Submissions
                </CardTitle>
                <CardDescription>
                  All form submissions from your website will appear here automatically.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isFormSubmissionsLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading form submissions...</p>
                  </div>
                ) : formSubmissionsError ? (
                  <div className="text-center py-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-600 font-medium">Error loading form submissions</p>
                      <p className="text-red-500 text-sm mt-1">{formSubmissionsError.message}</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => refetchFormSubmissions()}
                        className="mt-3"
                      >
                        Try Again
                      </Button>
                    </div>
                  </div>
                ) : formSubmissionsData && formSubmissionsData.length > 0 ? (
                  <div className="space-y-4">
                    {formSubmissionsData.map((submission) => (
                      <div key={submission.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="capitalize">
                              {submission.formType}
                            </Badge>
                            <span className="text-sm text-gray-500">
                              {format(new Date(submission.submittedAt), "MMM d, yyyy 'at' h:mm a")}
                            </span>
                          </div>
                          {submission.contact && (
                            <div className="text-sm font-medium">
                              {submission.contact.firstName} {submission.contact.lastName}
                            </div>
                          )}
                        </div>
                        <div className="bg-gray-50 rounded p-3 text-sm">
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(submission.formData).map(([key, value]) => (
                              <div key={key} className="break-words">
                                <span className="font-medium text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                                <span className="ml-2 text-gray-600">
                                  {Array.isArray(value) ? value.join(', ') : String(value)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FormInput className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No form submissions yet.</p>
                    <p className="text-sm mt-2">Form submissions from your website will automatically appear here.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Solar Opportunities</CardTitle>
                <CardDescription>Track your solar quotes and consultation requests</CardDescription>
              </CardHeader>
              <CardContent>
                {isOpportunitiesLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
                    <p className="mt-2 text-gray-600">Loading opportunities...</p>
                  </div>
                ) : opportunitiesError ? (
                  <div className="text-center py-8">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-600 font-medium">Error loading opportunities</p>
                      <p className="text-red-500 text-sm mt-1">{opportunitiesError.message}</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => refetchOpportunities()}
                        className="mt-3"
                      >
                        Try Again
                      </Button>
                    </div>
                  </div>
                ) : opportunitiesData && opportunitiesData.length > 0 ? (
                  <div className="space-y-4">
                    {opportunitiesData.map((opportunity) => (
                      <div key={opportunity.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{opportunity.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{opportunity.description}</p>
                            {opportunity.location && (
                              <p className="text-sm text-gray-500 mt-1 flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {opportunity.location}
                              </p>
                            )}
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge className={getOpportunityStatusColor(opportunity.status)}>
                                {opportunity.status}
                              </Badge>
                              <Badge variant="outline">{opportunity.source}</Badge>
                              {opportunity.amount && (
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  {opportunity.amount}
                                </Badge>
                              )}
                              {opportunity.probability && (
                                <Badge variant="outline">
                                  {opportunity.probability}% probability
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-500">
                              Created {format(new Date(opportunity.createdAt), "MMM d, yyyy")}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No solar opportunities yet.</p>
                    <p className="text-sm mt-2">New opportunities will appear here when forms are submitted.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Recent Activity Tab */}
          <TabsContent value="recent" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Contacts</CardTitle>
                  <CardDescription>Latest solar prospects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {(dashboardData?.recentContacts || []).map((contact) => (
                      <div key={contact.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{contact.firstName} {contact.lastName}</p>
                          <p className="text-sm text-gray-600">{contact.email}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(contact.status)} size="sm">
                            {contact.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            {format(new Date(contact.createdAt), "MMM d")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Opportunities</CardTitle>
                  <CardDescription>Latest solar opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {(dashboardData?.recentOpportunities || []).map((opportunity) => (
                      <div key={opportunity.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{opportunity.name}</p>
                          <p className="text-sm text-gray-600">{opportunity.source}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={getOpportunityStatusColor(opportunity.status)} size="sm">
                            {opportunity.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">
                            {format(new Date(opportunity.createdAt), "MMM d")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Contact Details Dialog */}
        <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Contact Details</DialogTitle>
              <DialogDescription>
                Complete information for {selectedContact?.firstName} {selectedContact?.lastName}
              </DialogDescription>
            </DialogHeader>
            {selectedContact && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Name</Label>
                    <p className="text-sm mt-1">{selectedContact.firstName} {selectedContact.lastName}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <div className="mt-1">
                      <Badge className={getStatusColor(selectedContact.status)}>
                        {selectedContact.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Email</Label>
                    <p className="text-sm mt-1">{selectedContact.email}</p>
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <p className="text-sm mt-1">{selectedContact.phone}</p>
                  </div>
                </div>
                {selectedContact.address && (
                  <div>
                    <Label>Address</Label>
                    <p className="text-sm mt-1">
                      {selectedContact.address}<br />
                      {selectedContact.city}, {selectedContact.state} {selectedContact.zipCode}
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Source</Label>
                    <p className="text-sm mt-1">{selectedContact.source}</p>
                  </div>
                  <div>
                    <Label>Created</Label>
                    <p className="text-sm mt-1">{format(new Date(selectedContact.createdAt), "MMM d, yyyy 'at' h:mm a")}</p>
                  </div>
                </div>
                {selectedContact.interestedInServices && selectedContact.interestedInServices.length > 0 && (
                  <div>
                    <Label>Interested Services</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedContact.interestedInServices.map((service, index) => (
                        <Badge key={index} variant="secondary">{service}</Badge>
                      ))}
                    </div>
                  </div>
                )}
                {selectedContact.notes && (
                  <div>
                    <Label>Notes</Label>
                    <p className="text-sm mt-1 p-2 bg-gray-50 rounded">{selectedContact.notes}</p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Contact Dialog */}
        <Dialog open={!!editingContact} onOpenChange={() => setEditingContact(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Contact</DialogTitle>
              <DialogDescription>
                Update contact information for {editingContact?.firstName} {editingContact?.lastName}
              </DialogDescription>
            </DialogHeader>
            {editingContact && (
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const updates = {
                  status: formData.get('status') as string,
                  notes: formData.get('notes') as string,
                };
                updateContactMutation.mutate({ id: editingContact.id, data: updates });
              }}>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select name="status" defaultValue={editingContact.status}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lead">Lead</SelectItem>
                        <SelectItem value="prospect">Prospect</SelectItem>
                        <SelectItem value="customer">Customer</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      name="notes"
                      defaultValue={editingContact.notes || ''}
                      placeholder="Add notes about this contact..."
                      rows={4}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setEditingContact(null)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={updateContactMutation.isPending}>
                      {updateContactMutation.isPending ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}