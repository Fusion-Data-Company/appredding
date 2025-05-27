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
  status: string;
  source: string;
  notes?: string;
  assignedTo?: number;
  companyName?: string;
  createdAt: string;
  updatedAt: string;
  lastContactedDate?: string;
}

interface Company {
  id: number;
  name: string;
  industry?: string;
  location?: string;
  website?: string;
  phone?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface FormSubmission {
  id: number;
  formType: string;
  submissionData: any;
  status: string;
  contactEmail?: string;
  submittedAt: string;
  updatedAt: string;
}

const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  status: z.string().min(1, "Status is required"),
  source: z.string().min(1, "Source is required"),
  notes: z.string().optional(),
  assignedTo: z.string().optional()
});

const companyFormSchema = z.object({
  name: z.string().min(1, "Company name is required"),
  industry: z.string().optional(),
  location: z.string().optional(),
  website: z.string().optional(),
  phone: z.string().optional(),
  notes: z.string().optional()
});

export default function CRMDashboard() {
  const [activeTab, setActiveTab] = useState("contacts");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sourceFilter, setSourceFilter] = useState("");
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isCompanyDialogOpen, setIsCompanyDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Build query parameters for contacts
  const contactsParams = new URLSearchParams();
  if (searchTerm) contactsParams.append('search', searchTerm);
  if (statusFilter) contactsParams.append('status', statusFilter);
  if (sourceFilter) contactsParams.append('source', sourceFilter);
  contactsParams.append('page', '1');
  contactsParams.append('limit', '50');

  // Fetch contacts with working API endpoint
  const { data: contactsResponse, isLoading: contactsLoading, refetch: refetchContacts } = useQuery({
    queryKey: ['/api/crm/contacts', contactsParams.toString()],
    queryFn: async () => {
      const response = await fetch(`/api/crm/contacts?${contactsParams.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch contacts');
      return response.json();
    }
  });

  const contacts = contactsResponse?.contacts || [];

  // Fetch companies with working API endpoint
  const { data: companiesResponse, isLoading: companiesLoading, refetch: refetchCompanies } = useQuery({
    queryKey: ['/api/crm/companies'],
    queryFn: async () => {
      const response = await fetch('/api/crm/companies');
      if (!response.ok) throw new Error('Failed to fetch companies');
      return response.json();
    }
  });

  const companies = companiesResponse?.companies || [];

  // Fetch form submissions with working API endpoint
  const { data: submissionsResponse, isLoading: submissionsLoading, refetch: refetchSubmissions } = useQuery({
    queryKey: ['/api/crm/form-submissions'],
    queryFn: async () => {
      const response = await fetch('/api/crm/form-submissions');
      if (!response.ok) throw new Error('Failed to fetch form submissions');
      return response.json();
    }
  });

  const submissions = submissionsResponse?.submissions || [];

  // Fetch analytics with working API endpoint
  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['/api/crm/analytics/dashboard'],
    queryFn: async () => {
      const response = await fetch('/api/crm/analytics/dashboard');
      if (!response.ok) throw new Error('Failed to fetch analytics');
      return response.json();
    }
  });

  // Contact form
  const contactForm = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      status: "new",
      source: "website",
      notes: "",
      assignedTo: ""
    }
  });

  // Company form
  const companyForm = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: "",
      industry: "",
      location: "",
      website: "",
      phone: "",
      notes: ""
    }
  });

  // Create contact mutation - WORKING
  const createContactMutation = useMutation({
    mutationFn: async (data: z.infer<typeof contactFormSchema>) => {
      const response = await fetch('/api/crm/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create contact');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Contact created successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/crm/contacts'] });
      setIsContactDialogOpen(false);
      contactForm.reset();
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: `Failed to create contact: ${error.message}`,
        variant: "destructive" 
      });
    }
  });

  // Update contact mutation - WORKING
  const updateContactMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: z.infer<typeof contactFormSchema> }) => {
      const response = await fetch(`/api/crm/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update contact');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Contact updated successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/crm/contacts'] });
      setIsContactDialogOpen(false);
      setEditingContact(null);
      contactForm.reset();
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: `Failed to update contact: ${error.message}`,
        variant: "destructive" 
      });
    }
  });

  // Delete contact mutation - WORKING
  const deleteContactMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/crm/contacts/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete contact');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Contact deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/crm/contacts'] });
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: `Failed to delete contact: ${error.message}`,
        variant: "destructive" 
      });
    }
  });

  // Create company mutation - WORKING
  const createCompanyMutation = useMutation({
    mutationFn: async (data: z.infer<typeof companyFormSchema>) => {
      const response = await fetch('/api/crm/companies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to create company');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Company created successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/crm/companies'] });
      setIsCompanyDialogOpen(false);
      companyForm.reset();
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: `Failed to create company: ${error.message}`,
        variant: "destructive" 
      });
    }
  });

  // Update company mutation - WORKING
  const updateCompanyMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: z.infer<typeof companyFormSchema> }) => {
      const response = await fetch(`/api/crm/companies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to update company');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Company updated successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/crm/companies'] });
      setIsCompanyDialogOpen(false);
      setEditingCompany(null);
      companyForm.reset();
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: `Failed to update company: ${error.message}`,
        variant: "destructive" 
      });
    }
  });

  // Delete company mutation - WORKING
  const deleteCompanyMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/crm/companies/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete company');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Company deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/crm/companies'] });
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: `Failed to delete company: ${error.message}`,
        variant: "destructive" 
      });
    }
  });

  // Update form submission status - WORKING
  const updateSubmissionMutation = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await fetch(`/api/crm/form-submissions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error('Failed to update submission');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Submission status updated" });
      queryClient.invalidateQueries({ queryKey: ['/api/crm/form-submissions'] });
    },
    onError: (error) => {
      toast({ 
        title: "Error", 
        description: `Failed to update submission: ${error.message}`,
        variant: "destructive" 
      });
    }
  });

  // Handle form submissions - ALL BUTTONS WORKING
  const handleContactSubmit = (data: z.infer<typeof contactFormSchema>) => {
    if (editingContact) {
      updateContactMutation.mutate({ id: editingContact.id, data });
    } else {
      createContactMutation.mutate(data);
    }
  };

  const handleCompanySubmit = (data: z.infer<typeof companyFormSchema>) => {
    if (editingCompany) {
      updateCompanyMutation.mutate({ id: editingCompany.id, data });
    } else {
      createCompanyMutation.mutate(data);
    }
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    contactForm.reset({
      firstName: contact.firstName,
      lastName: contact.lastName,
      email: contact.email,
      phone: contact.phone,
      status: contact.status,
      source: contact.source,
      notes: contact.notes || "",
      assignedTo: contact.assignedTo?.toString() || ""
    });
    setIsContactDialogOpen(true);
  };

  const handleEditCompany = (company: Company) => {
    setEditingCompany(company);
    companyForm.reset({
      name: company.name,
      industry: company.industry || "",
      location: company.location || "",
      website: company.website || "",
      phone: company.phone || "",
      notes: company.notes || ""
    });
    setIsCompanyDialogOpen(true);
  };

  const handleDeleteContact = (id: number) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      deleteContactMutation.mutate(id);
    }
  };

  const handleDeleteCompany = (id: number) => {
    if (confirm('Are you sure you want to delete this company?')) {
      deleteCompanyMutation.mutate(id);
    }
  };

  const handleUpdateSubmissionStatus = (id: number, status: string) => {
    updateSubmissionMutation.mutate({ id, status });
  };

  // Document upload handler - WORKING
  const handleDocumentUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('document', file);
    formData.append('uploadedBy', 'crm_user');

    try {
      const response = await fetch('/api/crm/process-any-document', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');

      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Success",
          description: `Document "${result.fileName}" uploaded and processed successfully`
        });
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Upload failed: ${error.message}`,
        variant: "destructive"
      });
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'qualified': return 'bg-green-100 text-green-800';
      case 'proposal_sent': return 'bg-purple-100 text-purple-800';
      case 'closed_won': return 'bg-emerald-100 text-emerald-800';
      case 'closed_lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-25 to-orange-50">
      <div className="container mx-auto p-6 space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Advance Power of Redding CRM
            </h1>
            <p className="text-slate-600 mt-2">Professional solar installation and service management system</p>
          </div>
          
          <div className="flex items-center gap-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleDocumentUpload}
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.txt"
              className="hidden"
            />
            <Button 
              onClick={() => fileInputRef.current?.click()}
              className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Document
            </Button>
          </div>
        </div>

        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-orange-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Contacts</CardTitle>
              <Users className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-700">
                {analytics?.stats?.totalContacts || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="border-amber-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Companies</CardTitle>
              <DollarSign className="h-4 w-4 text-amber-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-700">
                {analytics?.stats?.totalCompanies || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Form Submissions</CardTitle>
              <FileText className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-700">
                {analytics?.stats?.totalSubmissions || 0}
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Documents</CardTitle>
              <FormInput className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-700">
                {analytics?.stats?.totalDocuments || 0}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white border border-orange-200">
            <TabsTrigger value="contacts" className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-700">
              Contacts
            </TabsTrigger>
            <TabsTrigger value="companies" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-700">
              Companies
            </TabsTrigger>
            <TabsTrigger value="submissions" className="data-[state=active]:bg-yellow-100 data-[state=active]:text-yellow-700">
              Form Submissions
            </TabsTrigger>
          </TabsList>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <Card className="border-orange-200 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-orange-700">Contact Management</CardTitle>
                    <CardDescription>Manage your solar installation leads and customers</CardDescription>
                  </div>
                  <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                        onClick={() => {
                          setEditingContact(null);
                          contactForm.reset();
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Contact
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>
                          {editingContact ? 'Edit Contact' : 'Add New Contact'}
                        </DialogTitle>
                        <DialogDescription>
                          {editingContact ? 'Update contact information' : 'Add a new solar installation lead or customer'}
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...contactForm}>
                        <form onSubmit={contactForm.handleSubmit(handleContactSubmit)} className="space-y-4">
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
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={contactForm.control}
                              name="status"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Status</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="new">New</SelectItem>
                                      <SelectItem value="contacted">Contacted</SelectItem>
                                      <SelectItem value="qualified">Qualified</SelectItem>
                                      <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
                                      <SelectItem value="closed_won">Closed Won</SelectItem>
                                      <SelectItem value="closed_lost">Closed Lost</SelectItem>
                                    </SelectContent>
                                  </Select>
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
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select source" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="website">Website</SelectItem>
                                      <SelectItem value="referral">Referral</SelectItem>
                                      <SelectItem value="social_media">Social Media</SelectItem>
                                      <SelectItem value="direct">Direct</SelectItem>
                                      <SelectItem value="trade_show">Trade Show</SelectItem>
                                      <SelectItem value="google">Google</SelectItem>
                                    </SelectContent>
                                  </Select>
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
                                  <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex justify-end gap-3">
                            <Button type="button" variant="outline" onClick={() => setIsContactDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button 
                              type="submit" 
                              className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                              disabled={createContactMutation.isPending || updateContactMutation.isPending}
                            >
                              {editingContact ? 'Update' : 'Create'} Contact
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
                
                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search contacts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Statuses</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="contacted">Contacted</SelectItem>
                      <SelectItem value="qualified">Qualified</SelectItem>
                      <SelectItem value="proposal_sent">Proposal Sent</SelectItem>
                      <SelectItem value="closed_won">Closed Won</SelectItem>
                      <SelectItem value="closed_lost">Closed Lost</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={sourceFilter} onValueChange={setSourceFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="All Sources" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Sources</SelectItem>
                      <SelectItem value="website">Website</SelectItem>
                      <SelectItem value="referral">Referral</SelectItem>
                      <SelectItem value="social_media">Social Media</SelectItem>
                      <SelectItem value="direct">Direct</SelectItem>
                      <SelectItem value="trade_show">Trade Show</SelectItem>
                      <SelectItem value="google">Google</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm("");
                      setStatusFilter("");
                      setSourceFilter("");
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                {contactsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-gray-500">Loading contacts...</div>
                  </div>
                ) : contacts.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No contacts found. Add your first solar installation lead!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {contacts.map((contact: Contact) => (
                      <div
                        key={contact.id}
                        className="flex items-center justify-between p-4 border border-orange-100 rounded-lg bg-white hover:bg-orange-50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-red-100 rounded-full flex items-center justify-center">
                            <span className="text-orange-700 font-semibold">
                              {contact.firstName[0]}{contact.lastName[0]}
                            </span>
                          </div>
                          
                          <div>
                            <h3 className="font-semibold text-slate-900">
                              {contact.firstName} {contact.lastName}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-slate-500">
                              <span className="flex items-center">
                                <Mail className="h-3 w-3 mr-1" />
                                {contact.email}
                              </span>
                              <span className="flex items-center">
                                <Phone className="h-3 w-3 mr-1" />
                                {contact.phone}
                              </span>
                              {contact.companyName && (
                                <span className="flex items-center">
                                  <DollarSign className="h-3 w-3 mr-1" />
                                  {contact.companyName}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Badge className={getStatusBadgeColor(contact.status)}>
                            {contact.status.replace('_', ' ').toUpperCase()}
                          </Badge>
                          <Badge variant="outline">
                            {contact.source.replace('_', ' ')}
                          </Badge>
                          
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditContact(contact)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteContact(contact.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Companies Tab */}
          <TabsContent value="companies" className="space-y-6">
            <Card className="border-amber-200 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-amber-700">Company Management</CardTitle>
                    <CardDescription>Manage commercial solar installation clients</CardDescription>
                  </div>
                  <Dialog open={isCompanyDialogOpen} onOpenChange={setIsCompanyDialogOpen}>
                    <DialogTrigger asChild>
                      <Button 
                        className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700"
                        onClick={() => {
                          setEditingCompany(null);
                          companyForm.reset();
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Company
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>
                          {editingCompany ? 'Edit Company' : 'Add New Company'}
                        </DialogTitle>
                        <DialogDescription>
                          {editingCompany ? 'Update company information' : 'Add a new commercial solar client'}
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...companyForm}>
                        <form onSubmit={companyForm.handleSubmit(handleCompanySubmit)} className="space-y-4">
                          <FormField
                            control={companyForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={companyForm.control}
                              name="industry"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Industry</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={companyForm.control}
                              name="location"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Location</FormLabel>
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
                              control={companyForm.control}
                              name="website"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Website</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={companyForm.control}
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
                            control={companyForm.control}
                            name="notes"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Notes</FormLabel>
                                <FormControl>
                                  <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="flex justify-end gap-3">
                            <Button type="button" variant="outline" onClick={() => setIsCompanyDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button 
                              type="submit" 
                              className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700"
                              disabled={createCompanyMutation.isPending || updateCompanyMutation.isPending}
                            >
                              {editingCompany ? 'Update' : 'Create'} Company
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              
              <CardContent>
                {companiesLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-gray-500">Loading companies...</div>
                  </div>
                ) : companies.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No companies found. Add your first commercial solar client!
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {companies.map((company: Company) => (
                      <div
                        key={company.id}
                        className="p-4 border border-amber-100 rounded-lg bg-white hover:bg-amber-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-slate-900">{company.name}</h3>
                            <div className="flex items-center space-x-4 text-sm text-slate-500 mt-1">
                              {company.industry && (
                                <span>{company.industry}</span>
                              )}
                              {company.location && (
                                <span className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {company.location}
                                </span>
                              )}
                              {company.phone && (
                                <span className="flex items-center">
                                  <Phone className="h-3 w-3 mr-1" />
                                  {company.phone}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditCompany(company)}
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteCompany(company.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Form Submissions Tab */}
          <TabsContent value="submissions" className="space-y-6">
            <Card className="border-yellow-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-yellow-700">Form Submissions</CardTitle>
                <CardDescription>Manage website form submissions and lead inquiries</CardDescription>
              </CardHeader>
              
              <CardContent>
                {submissionsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="text-gray-500">Loading submissions...</div>
                  </div>
                ) : submissions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No form submissions yet. They will appear here when customers submit inquiries.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {submissions.map((submission: FormSubmission) => (
                      <div
                        key={submission.id}
                        className="p-4 border border-yellow-100 rounded-lg bg-white hover:bg-yellow-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-slate-900">
                              {submission.formType.replace('_', ' ').toUpperCase()} Submission
                            </h3>
                            <div className="text-sm text-slate-500 mt-1">
                              <div>Email: {submission.contactEmail || 'Not provided'}</div>
                              <div>Submitted: {format(new Date(submission.submittedAt), 'MMM dd, yyyy HH:mm')}</div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <Badge className={
                              submission.status === 'processed' ? 'bg-green-100 text-green-800' :
                              submission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }>
                              {submission.status.toUpperCase()}
                            </Badge>
                            
                            <Select
                              value={submission.status}
                              onValueChange={(status) => handleUpdateSubmissionStatus(submission.id, status)}
                            >
                              <SelectTrigger className="w-[120px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processed">Processed</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}