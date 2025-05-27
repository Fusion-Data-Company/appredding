import { useState, useRef, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  Users, FileText, DollarSign, Phone, Mail, MapPin, Calendar, Search, Eye, Edit2, 
  Trash2, Plus, Upload, Download, Database, Zap, FolderOpen, Bot, Filter,
  BarChart3, TrendingUp, Clock, CheckCircle, AlertCircle, Settings, Target,
  Activity, PieChart, Sun, FileCheck, FileX, Loader2, ChevronDown, ChevronUp
} from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company?: string;
  jobTitle?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  status: 'lead' | 'prospect' | 'customer' | 'inactive';
  source: string;
  assignedTo?: number;
  lastContactedDate?: string;
  createdAt: string;
  updatedAt: string;
}

interface Customer {
  id: number;
  firstName?: string;
  lastName?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  address: string;
  city?: string;
  state?: string;
  zipCode?: string;
  installationYear?: number;
  systemSize?: string;
  panelCount?: number;
  inverterType?: string;
  batterySystem?: boolean;
  totalDocuments: number;
  lastDocumentDate?: string;
  customerSince?: string;
  status: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

interface CustomerDocument {
  id: number;
  customerId: number;
  fileName: string;
  originalFileName: string;
  fileType: string;
  fileSize?: number;
  documentCategory?: string;
  documentYear?: number;
  processingStatus: 'pending_processing' | 'processing' | 'processed' | 'failed';
  confidence?: string;
  customerName?: string;
  customerAddress?: string;
  createdAt: string;
  processedAt?: string;
}

interface FormSubmission {
  id: number;
  formType: string;
  sourcePage: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  message?: string;
  interestedServices?: string[];
  processed: boolean;
  createdAt: string;
}

interface Opportunity {
  id: number;
  name: string;
  contactName?: string;
  companyName?: string;
  status: string;
  amount?: string;
  probability?: number;
  expectedCloseDate?: string;
  createdAt: string;
  updatedAt: string;
}

const EnterpriseCARM = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isProcessingDocuments, setIsProcessingDocuments] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    source: '',
    assignedTo: '',
    sortBy: 'updatedAt',
    sortOrder: 'desc'
  });
  const [customerFilters, setCustomerFilters] = useState({
    installationYear: '',
    status: '',
    sortBy: 'updatedAt',
    sortOrder: 'desc'
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch contacts with advanced filtering
  const { data: contactsData, isLoading: contactsLoading, error: contactsError } = useQuery({
    queryKey: ['/api/crm/contacts', { search: searchQuery, ...filters }],
    queryFn: async () => {
      const params = new URLSearchParams({
        ...(searchQuery && { search: searchQuery }),
        ...filters,
        page: '1',
        limit: '100'
      });
      const response = await fetch(`/api/crm/contacts?${params}`);
      if (!response.ok) throw new Error('Failed to fetch contacts');
      return response.json();
    }
  });

  // Fetch customers with filtering
  const { data: customersData, isLoading: customersLoading } = useQuery({
    queryKey: ['/api/crm/customers', { search: searchQuery, ...customerFilters }],
    queryFn: async () => {
      const params = new URLSearchParams({
        ...(searchQuery && { search: searchQuery }),
        ...customerFilters,
        page: '1',
        limit: '100'
      });
      const response = await fetch(`/api/crm/customers?${params}`);
      if (!response.ok) throw new Error('Failed to fetch customers');
      return response.json();
    }
  });

  // Fetch form submissions
  const { data: submissionsData, isLoading: submissionsLoading } = useQuery({
    queryKey: ['/api/crm/form-submissions'],
    queryFn: async () => {
      const response = await fetch('/api/crm/form-submissions?limit=100');
      if (!response.ok) throw new Error('Failed to fetch form submissions');
      return response.json();
    }
  });

  // Fetch opportunities
  const { data: opportunitiesData, isLoading: opportunitiesLoading } = useQuery({
    queryKey: ['/api/crm/opportunities'],
    queryFn: async () => {
      const response = await fetch('/api/crm/opportunities?limit=100');
      if (!response.ok) throw new Error('Failed to fetch opportunities');
      return response.json();
    }
  });

  // Fetch recent activities
  const { data: activitiesData } = useQuery({
    queryKey: ['/api/crm/activities'],
    queryFn: async () => {
      const response = await fetch('/api/crm/activities?limit=20');
      if (!response.ok) throw new Error('Failed to fetch activities');
      return response.json();
    }
  });

  // Search functionality
  const { data: searchResults } = useQuery({
    queryKey: ['/api/crm/search', searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return null;
      const response = await fetch(`/api/crm/search?query=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error('Search failed');
      return response.json();
    },
    enabled: !!searchQuery.trim()
  });

  // Process form submission mutation
  const processSubmissionMutation = useMutation({
    mutationFn: async (submissionId: number) => {
      const response = await fetch(`/api/crm/form-submissions/${submissionId}/process`, {
        method: 'POST'
      });
      if (!response.ok) throw new Error('Failed to process submission');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/crm/form-submissions'] });
      queryClient.invalidateQueries({ queryKey: ['/api/crm/contacts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/crm/opportunities'] });
      toast({
        title: "Success",
        description: "Form submission processed and contact created successfully!"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to process submission: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  // Delete contact mutation
  const deleteContactMutation = useMutation({
    mutationFn: async (contactId: number) => {
      const response = await fetch(`/api/crm/contacts/${contactId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('Failed to delete contact');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/crm/contacts'] });
      setSelectedContact(null);
      toast({
        title: "Success",
        description: "Contact deleted successfully!"
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete contact: ${error.message}`,
        variant: "destructive"
      });
    }
  });

  // Document upload handler
  const handleDocumentUpload = async (customerId: number, files: FileList) => {
    if (!files.length) return;

    setIsProcessingDocuments(true);
    const formData = new FormData();
    
    Array.from(files).forEach(file => {
      formData.append('documents', file);
    });

    try {
      const response = await fetch(`/api/crm/customers/${customerId}/documents`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');
      
      const result = await response.json();
      
      queryClient.invalidateQueries({ queryKey: ['/api/crm/customers'] });
      
      toast({
        title: "Success",
        description: `Successfully uploaded ${files.length} documents. AI processing initiated.`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: `Upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive"
      });
    } finally {
      setIsProcessingDocuments(false);
    }
  };

  // CSV Export
  const handleExportContacts = async () => {
    try {
      const response = await fetch('/api/crm/contacts/export');
      if (!response.ok) throw new Error('Export failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `contacts-${format(new Date(), 'yyyy-MM-dd')}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Success",
        description: "Contacts exported successfully!"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Export failed",
        variant: "destructive"
      });
    }
  };

  // Calculate dashboard stats
  const dashboardStats = {
    totalContacts: contactsData?.contacts?.length || 0,
    totalCustomers: customersData?.customers?.length || 0,
    unprocessedSubmissions: submissionsData?.submissions?.filter((s: FormSubmission) => !s.processed).length || 0,
    totalOpportunities: opportunitiesData?.opportunities?.length || 0,
    documentsProcessed: customersData?.customers?.reduce((sum: number, customer: Customer) => sum + customer.totalDocuments, 0) || 0,
    recentActivityCount: activitiesData?.length || 0
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                Enterprise CRM
              </h1>
              <p className="text-gray-600 mt-2">Advance Power of Redding - Customer Relationship Management</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 shadow-sm border border-orange-200">
                <Sun className="w-5 h-5 text-orange-500" />
                <span className="text-sm font-medium text-gray-700">Solar Business CRM</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search customers, contacts, documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 border-orange-200 focus:border-orange-400"
            />
          </div>
        </motion.div>

        {/* Dashboard Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8"
        >
          <Card className="border-orange-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Contacts</p>
                  <p className="text-2xl font-bold text-orange-600">{dashboardStats.totalContacts}</p>
                </div>
                <Users className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Customers</p>
                  <p className="text-2xl font-bold text-orange-600">{dashboardStats.totalCustomers}</p>
                </div>
                <Database className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">New Submissions</p>
                  <p className="text-2xl font-bold text-orange-600">{dashboardStats.unprocessedSubmissions}</p>
                </div>
                <FileText className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Opportunities</p>
                  <p className="text-2xl font-bold text-orange-600">{dashboardStats.totalOpportunities}</p>
                </div>
                <Target className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Documents</p>
                  <p className="text-2xl font-bold text-orange-600">{dashboardStats.documentsProcessed}</p>
                </div>
                <FolderOpen className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Activities</p>
                  <p className="text-2xl font-bold text-orange-600">{dashboardStats.recentActivityCount}</p>
                </div>
                <Activity className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white border border-orange-200">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-orange-100">Dashboard</TabsTrigger>
            <TabsTrigger value="contacts" className="data-[state=active]:bg-orange-100">Contacts</TabsTrigger>
            <TabsTrigger value="customers" className="data-[state=active]:bg-orange-100">Customers</TabsTrigger>
            <TabsTrigger value="submissions" className="data-[state=active]:bg-orange-100">Submissions</TabsTrigger>
            <TabsTrigger value="opportunities" className="data-[state=active]:bg-orange-100">Opportunities</TabsTrigger>
            <TabsTrigger value="activities" className="data-[state=active]:bg-orange-100">Activities</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-700">Recent Activities</CardTitle>
                </CardHeader>
                <CardContent>
                  {activitiesData && activitiesData.length > 0 ? (
                    <div className="space-y-3">
                      {activitiesData.slice(0, 5).map((activity: any) => (
                        <div key={activity.id} className="flex items-center space-x-3 p-2 rounded-lg bg-orange-50">
                          <Activity className="w-4 h-4 text-orange-500" />
                          <div className="flex-1">
                            <p className="text-sm font-medium">{activity.subject}</p>
                            <p className="text-xs text-gray-500">
                              {activity.contactName && `${activity.contactName} • `}
                              {format(new Date(activity.createdAt), 'MMM dd, yyyy')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center py-4">No recent activities</p>
                  )}
                </CardContent>
              </Card>

              <Card className="border-orange-200">
                <CardHeader>
                  <CardTitle className="text-orange-700">System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Database Connection</span>
                      <Badge variant="outline" className="border-green-500 text-green-700">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">AI Document Processing</span>
                      <Badge variant="outline" className="border-blue-500 text-blue-700">Ready</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Form Integrations</span>
                      <Badge variant="outline" className="border-green-500 text-green-700">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Document Storage</span>
                      <Badge variant="outline" className="border-green-500 text-green-700">Operational</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-orange-700">Contacts Management</h2>
              <div className="flex items-center space-x-2">
                <Button 
                  onClick={handleExportContacts}
                  variant="outline" 
                  size="sm"
                  className="border-orange-200 hover:bg-orange-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
                <Select value={filters.status} onValueChange={(value) => setFilters(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Status</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="prospect">Prospect</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {contactsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
                <span className="ml-2 text-gray-600">Loading contacts...</span>
              </div>
            ) : contactsError ? (
              <Card className="border-red-200">
                <CardContent className="p-6 text-center">
                  <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                  <p className="text-red-600">Failed to load contacts. Please try again.</p>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-orange-200">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-orange-50">
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contactsData?.contacts?.length > 0 ? (
                        contactsData.contacts.map((contact: Contact) => (
                          <TableRow key={contact.id} className="hover:bg-orange-50">
                            <TableCell className="font-medium">
                              {contact.firstName} {contact.lastName}
                            </TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell>{contact.phone}</TableCell>
                            <TableCell>
                              <Badge 
                                variant="outline" 
                                className={
                                  contact.status === 'customer' ? 'border-green-500 text-green-700' :
                                  contact.status === 'prospect' ? 'border-blue-500 text-blue-700' :
                                  contact.status === 'lead' ? 'border-yellow-500 text-yellow-700' :
                                  'border-gray-500 text-gray-700'
                                }
                              >
                                {contact.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{contact.source}</TableCell>
                            <TableCell>{format(new Date(contact.createdAt), 'MMM dd, yyyy')}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => setSelectedContact(contact)}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="ghost"
                                  onClick={() => deleteContactMutation.mutate(contact.id)}
                                  disabled={deleteContactMutation.isPending}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                            No contacts found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Customers Tab */}
          <TabsContent value="customers" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-orange-700">Customer Database</h2>
              <div className="flex items-center space-x-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.csv"
                  onChange={(e) => {
                    if (e.target.files && selectedCustomer) {
                      handleDocumentUpload(selectedCustomer.id, e.target.files);
                    }
                  }}
                  className="hidden"
                />
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline" 
                  size="sm"
                  disabled={!selectedCustomer || isProcessingDocuments}
                  className="border-orange-200 hover:bg-orange-50"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isProcessingDocuments ? 'Processing...' : 'Upload Documents'}
                </Button>
                <Select value={customerFilters.status} onValueChange={(value) => setCustomerFilters(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Status</SelectItem>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="lead">Lead</SelectItem>
                    <SelectItem value="prospect">Prospect</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {customersLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
                <span className="ml-2 text-gray-600">Loading customers...</span>
              </div>
            ) : (
              <Card className="border-orange-200">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-orange-50">
                        <TableHead>Customer</TableHead>
                        <TableHead>Address</TableHead>
                        <TableHead>System Size</TableHead>
                        <TableHead>Installation Year</TableHead>
                        <TableHead>Documents</TableHead>
                        <TableHead>Last Updated</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customersData?.customers?.length > 0 ? (
                        customersData.customers.map((customer: Customer) => (
                          <TableRow 
                            key={customer.id} 
                            className={`hover:bg-orange-50 cursor-pointer ${selectedCustomer?.id === customer.id ? 'bg-orange-100' : ''}`}
                            onClick={() => setSelectedCustomer(customer)}
                          >
                            <TableCell className="font-medium">
                              {customer.fullName || `${customer.firstName || ''} ${customer.lastName || ''}`.trim() || 'Unknown Customer'}
                            </TableCell>
                            <TableCell>{customer.address}</TableCell>
                            <TableCell>
                              {customer.systemSize ? `${customer.systemSize} kW` : '-'}
                            </TableCell>
                            <TableCell>{customer.installationYear || '-'}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <FolderOpen className="w-4 h-4 text-orange-500" />
                                <span>{customer.totalDocuments}</span>
                              </div>
                            </TableCell>
                            <TableCell>{format(new Date(customer.updatedAt), 'MMM dd, yyyy')}</TableCell>
                            <TableCell>
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedCustomer(customer);
                                }}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                            No customers found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Form Submissions Tab */}
          <TabsContent value="submissions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-orange-700">Form Submissions</h2>
              <Badge variant="outline" className="border-orange-500 text-orange-700">
                {dashboardStats.unprocessedSubmissions} Unprocessed
              </Badge>
            </div>

            {submissionsLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
                <span className="ml-2 text-gray-600">Loading submissions...</span>
              </div>
            ) : (
              <Card className="border-orange-200">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-orange-50">
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Form Type</TableHead>
                        <TableHead>Source Page</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Submitted</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {submissionsData?.submissions?.length > 0 ? (
                        submissionsData.submissions.map((submission: FormSubmission) => (
                          <TableRow key={submission.id} className="hover:bg-orange-50">
                            <TableCell className="font-medium">
                              {submission.firstName} {submission.lastName}
                            </TableCell>
                            <TableCell>{submission.email}</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="border-blue-500 text-blue-700">
                                {submission.formType}
                              </Badge>
                            </TableCell>
                            <TableCell className="max-w-xs truncate">{submission.sourcePage}</TableCell>
                            <TableCell>
                              <Badge 
                                variant="outline" 
                                className={submission.processed ? 'border-green-500 text-green-700' : 'border-yellow-500 text-yellow-700'}
                              >
                                {submission.processed ? 'Processed' : 'Pending'}
                              </Badge>
                            </TableCell>
                            <TableCell>{format(new Date(submission.createdAt), 'MMM dd, yyyy')}</TableCell>
                            <TableCell>
                              {!submission.processed && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => processSubmissionMutation.mutate(submission.id)}
                                  disabled={processSubmissionMutation.isPending}
                                  className="border-orange-200 hover:bg-orange-50"
                                >
                                  <Zap className="w-4 h-4 mr-1" />
                                  Process
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                            No form submissions found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-orange-700">Sales Opportunities</h2>
              <Button 
                variant="outline" 
                size="sm"
                className="border-orange-200 hover:bg-orange-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Opportunity
              </Button>
            </div>

            {opportunitiesLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-orange-500" />
                <span className="ml-2 text-gray-600">Loading opportunities...</span>
              </div>
            ) : (
              <Card className="border-orange-200">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-orange-50">
                        <TableHead>Opportunity</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Probability</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {opportunitiesData?.opportunities?.length > 0 ? (
                        opportunitiesData.opportunities.map((opportunity: Opportunity) => (
                          <TableRow key={opportunity.id} className="hover:bg-orange-50">
                            <TableCell className="font-medium">{opportunity.name}</TableCell>
                            <TableCell>{opportunity.contactName || '-'}</TableCell>
                            <TableCell>{opportunity.companyName || '-'}</TableCell>
                            <TableCell>
                              {opportunity.amount ? `$${opportunity.amount}` : '-'}
                            </TableCell>
                            <TableCell>
                              <Badge 
                                variant="outline" 
                                className={
                                  opportunity.status === 'completed' ? 'border-green-500 text-green-700' :
                                  opportunity.status === 'in_progress' ? 'border-blue-500 text-blue-700' :
                                  'border-yellow-500 text-yellow-700'
                                }
                              >
                                {opportunity.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {opportunity.probability ? `${opportunity.probability}%` : '-'}
                            </TableCell>
                            <TableCell>{format(new Date(opportunity.createdAt), 'MMM dd, yyyy')}</TableCell>
                            <TableCell>
                              <Button size="sm" variant="ghost">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                            No opportunities found
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-orange-700">Recent Activities</h2>
              <Button 
                variant="outline" 
                size="sm"
                className="border-orange-200 hover:bg-orange-50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Activity
              </Button>
            </div>

            <Card className="border-orange-200">
              <CardContent className="p-6">
                {activitiesData && activitiesData.length > 0 ? (
                  <div className="space-y-4">
                    {activitiesData.map((activity: any) => (
                      <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg bg-orange-50 border border-orange-100">
                        <div className="w-10 h-10 rounded-full bg-orange-200 flex items-center justify-center">
                          <Activity className="w-5 h-5 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{activity.subject}</h3>
                          {activity.details && (
                            <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                          )}
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                            {activity.contactName && (
                              <span className="flex items-center">
                                <Users className="w-3 h-3 mr-1" />
                                {activity.contactName}
                              </span>
                            )}
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {format(new Date(activity.createdAt), 'MMM dd, yyyy HH:mm')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No activities found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Contact Detail Modal */}
        {selectedContact && (
          <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Contact Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Name</Label>
                    <p className="text-sm text-gray-600">{selectedContact.firstName} {selectedContact.lastName}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <p className="text-sm text-gray-600">{selectedContact.email}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Phone</Label>
                    <p className="text-sm text-gray-600">{selectedContact.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Status</Label>
                    <Badge 
                      variant="outline" 
                      className={
                        selectedContact.status === 'customer' ? 'border-green-500 text-green-700' :
                        selectedContact.status === 'prospect' ? 'border-blue-500 text-blue-700' :
                        selectedContact.status === 'lead' ? 'border-yellow-500 text-yellow-700' :
                        'border-gray-500 text-gray-700'
                      }
                    >
                      {selectedContact.status}
                    </Badge>
                  </div>
                </div>
                {selectedContact.address && (
                  <div>
                    <Label className="text-sm font-medium">Address</Label>
                    <p className="text-sm text-gray-600">
                      {selectedContact.address}
                      {selectedContact.city && `, ${selectedContact.city}`}
                      {selectedContact.state && `, ${selectedContact.state}`}
                      {selectedContact.zipCode && ` ${selectedContact.zipCode}`}
                    </p>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Source</Label>
                    <p className="text-sm text-gray-600">{selectedContact.source}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Created</Label>
                    <p className="text-sm text-gray-600">{format(new Date(selectedContact.createdAt), 'MMM dd, yyyy')}</p>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default EnterpriseCARM;