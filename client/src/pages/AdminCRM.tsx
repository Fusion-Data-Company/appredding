import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight,
  Sun,
  LogOut,
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Settings,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { useLocation } from 'wouter';
import { ErrorState } from '@/components/ui/error-state';

interface SolarSubmission {
  id: number;
  submissionTimestamp: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  propertyType: string;
  serviceNeeded: string;
  currentElectricBill?: string;
  roofType?: string;
  roofAge?: string;
  shadingIssues?: string;
  systemSizePreference?: string;
  timeline?: string;
  additionalNotes?: string;
  ipAddress?: string;
  userAgent?: string;
  landSizeAcres?: string;
  primaryCrop?: string;
  irrigationSystem?: string;
  numberOfBarns?: number;
  livestockOperations?: string;
  agriculturalEnergyUsage?: string;
  numberOfBoatSlips?: number;
  dockLength?: string;
  hasFuelStation?: boolean;
  storageType?: string;
  hasWaterPumping?: boolean;
  marinaEnergyUsage?: string;
}

interface NewsletterSubscriber {
  id: number;
  email: string;
  name?: string;
  source: string;
  subscribedAt: string;
}

export default function AdminCRM() {
  const [, setLocation] = useLocation();
  const [adminCode, setAdminCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('submissions');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'submissionTimestamp',
    direction: 'desc'
  });

  useEffect(() => {
    const storedCode = sessionStorage.getItem('solarAdminCode');
    if (storedCode === '0843') {
      setIsAuthenticated(true);
      setAdminCode('0843');
    }
  }, []);

  const handleLogin = () => {
    if (adminCode === '0843') {
      sessionStorage.setItem('solarAdminCode', adminCode);
      setIsAuthenticated(true);
    } else {
      alert('Invalid admin code');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('solarAdminCode');
    setIsAuthenticated(false);
    setAdminCode('');
    setLocation('/');
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['solar-submissions', adminCode, currentPage, searchTerm],
    queryFn: async () => {
      const params = new URLSearchParams({
        code: adminCode,
        page: currentPage.toString(),
        limit: '50',
        ...(searchTerm && { search: searchTerm })
      });
      const res = await fetch(`/api/admin/solar-submissions?${params}`);
      if (!res.ok) throw new Error('Failed to fetch submissions');
      return res.json();
    },
    enabled: isAuthenticated && adminCode === '0843',
  });

  const exportToCSV = () => {
    if (!data?.submissions) return;

    const headers = [
      'ID', 'Date', 'Customer Name', 'Email', 'Phone', 'Address', 
      'Property Type', 'Service Needed', 'Electric Bill', 'Roof Type', 
      'Roof Age', 'Shading Issues', 'System Size', 'Timeline', 'Notes',
      'Land Size (acres)', 'Primary Crop', 'Irrigation', 'Barns', 'Livestock', 'Ag Energy',
      'Boat Slips', 'Dock Length', 'Fuel Station', 'Storage Type', 'Water Pumping', 'Marina Energy'
    ];

    const rows = data.submissions.map((sub: SolarSubmission) => [
      sub.id,
      new Date(sub.submissionTimestamp).toLocaleDateString(),
      sub.customerName,
      sub.email,
      sub.phone,
      sub.address,
      sub.propertyType,
      sub.serviceNeeded,
      sub.currentElectricBill || '',
      sub.roofType || '',
      sub.roofAge || '',
      sub.shadingIssues || '',
      sub.systemSizePreference || '',
      sub.timeline || '',
      sub.additionalNotes || '',
      sub.landSizeAcres || '',
      sub.primaryCrop || '',
      sub.irrigationSystem || '',
      sub.numberOfBarns || '',
      sub.livestockOperations || '',
      sub.agriculturalEnergyUsage || '',
      sub.numberOfBoatSlips || '',
      sub.dockLength || '',
      sub.hasFuelStation ? 'Yes' : 'No',
      sub.storageType || '',
      sub.hasWaterPumping ? 'Yes' : 'No',
      sub.marinaEnergyUsage || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row: any[]) => row.map((cell: any) => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solar-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const { data: newsletterData, isLoading: isLoadingNewsletter } = useQuery({
    queryKey: ['newsletter-subscribers', adminCode],
    queryFn: async () => {
      const res = await fetch(`/api/admin/newsletter-subscribers?code=${adminCode}`);
      if (!res.ok) throw new Error('Failed to fetch newsletter subscribers');
      return res.json();
    },
    enabled: isAuthenticated && adminCode === '0843' && activeTab === 'newsletter',
  });

  const exportNewsletterToCSV = () => {
    if (!newsletterData?.subscribers) return;

    const headers = ['ID', 'Email', 'Name', 'Source', 'Subscribed Date'];

    const rows = newsletterData.subscribers.map((sub: NewsletterSubscriber) => [
      sub.id,
      sub.email,
      sub.name || 'N/A',
      sub.source,
      new Date(sub.subscribedAt).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row: any[]) => row.map((cell: any) => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter-subscribers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 bg-slate-900/50 backdrop-blur-xl border-slate-700">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mb-4">
              <Sun className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Admin Access Required</h2>
            <p className="text-slate-400">Enter your 4-digit admin code</p>
          </div>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter admin code"
              value={adminCode}
              onChange={(e) => setAdminCode(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="text-center text-2xl tracking-widest bg-slate-800 border-slate-600 text-white"
              maxLength={4}
              data-testid="input-admin-code"
            />
            <Button 
              onClick={handleLogin} 
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600"
              data-testid="button-login"
            >
              Access Dashboard
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const totalPages = Math.ceil((data?.total || 0) / 50);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Solar Consultation CRM</h1>
              <p className="text-slate-400">Manage and track solar consultation requests</p>
            </div>
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
              data-testid="button-logout"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full md:w-[400px] grid-cols-2 bg-slate-800/50">
              <TabsTrigger value="submissions" data-testid="tab-submissions">Form Submissions</TabsTrigger>
              <TabsTrigger value="newsletter" data-testid="tab-newsletter">Newsletter Subscribers</TabsTrigger>
            </TabsList>

            <TabsContent value="submissions" className="mt-6">
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="p-6 bg-slate-900/50 backdrop-blur border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Total Submissions</p>
                      <p className="text-2xl font-bold text-white">{data?.total || 0}</p>
                    </div>
                    <Settings className="h-8 w-8 text-blue-400" />
                  </div>
                </Card>
                <Card className="p-6 bg-slate-900/50 backdrop-blur border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Current Page</p>
                      <p className="text-2xl font-bold text-white">{currentPage} of {totalPages || 1}</p>
                    </div>
                    <Eye className="h-8 w-8 text-cyan-400" />
                  </div>
                </Card>
                <Card className="p-6 bg-slate-900/50 backdrop-blur border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Results</p>
                      <p className="text-2xl font-bold text-white">{data?.submissions?.length || 0}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-green-400" />
                  </div>
                </Card>
              </div>

              {/* Search and Export */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search by name, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-900/50 border-slate-700 text-white"
                    data-testid="input-search"
                  />
                </div>
                <Button 
                  onClick={exportToCSV} 
                  className="bg-gradient-to-r from-green-600 to-emerald-600"
                  data-testid="button-export"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="newsletter" className="mt-6">
              {/* Newsletter Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card className="p-6 bg-slate-900/50 backdrop-blur border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400 mb-1">Total Subscribers</p>
                      <p className="text-2xl font-bold text-white">{newsletterData?.subscribers?.length || 0}</p>
                    </div>
                    <Mail className="h-8 w-8 text-blue-400" />
                  </div>
                </Card>
                <Card className="p-6 bg-slate-900/50 backdrop-blur border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400 mb-1">From Newsletter Form</p>
                      <p className="text-2xl font-bold text-white">
                        {newsletterData?.subscribers?.filter((s: NewsletterSubscriber) => s.source === 'newsletter_form').length || 0}
                      </p>
                    </div>
                    <Sun className="h-8 w-8 text-cyan-400" />
                  </div>
                </Card>
                <Card className="p-6 bg-slate-900/50 backdrop-blur border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-400 mb-1">From Solar Form</p>
                      <p className="text-2xl font-bold text-white">
                        {newsletterData?.subscribers?.filter((s: NewsletterSubscriber) => s.source === 'solar_consultation_form').length || 0}
                      </p>
                    </div>
                    <Settings className="h-8 w-8 text-green-400" />
                  </div>
                </Card>
              </div>

              {/* Newsletter Export */}
              <div className="flex justify-end mb-6">
                <Button 
                  onClick={exportNewsletterToCSV} 
                  className="bg-gradient-to-r from-green-600 to-emerald-600"
                  data-testid="button-export-newsletter"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Export Newsletter CSV
                </Button>
              </div>

              {/* Solar Submissions Table */}
              <Card className="bg-slate-900/50 backdrop-blur border-slate-700 overflow-hidden">
                {isLoading ? (
                  <div className="p-12 flex items-center justify-center text-slate-400">
                    <Loader2 className="h-8 w-8 animate-spin mr-2" />
                    Loading submissions...
                  </div>
                ) : error ? (
                  <div className="p-12">
                    <ErrorState
                      title="Failed to Load Submissions"
                      message={error instanceof Error ? error.message : "There was an error loading solar consultation submissions. Please try again."}
                      onRetry={() => window.location.reload()}
                      variant="inline"
                    />
                  </div>
                ) : !data?.submissions?.length ? (
                  <div className="p-12 text-center">
                    <AlertCircle className="h-12 w-12 text-slate-500 mx-auto mb-4" />
                    <p className="text-slate-400">No submissions found</p>
                  </div>
                ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-800/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        <button onClick={() => handleSort('submissionTimestamp')} className="flex items-center gap-1 hover:text-white">
                          Date
                          {sortConfig.key === 'submissionTimestamp' && (
                            sortConfig.direction === 'asc' ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />
                          )}
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Service
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Timeline
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {data.submissions.map((submission: SolarSubmission) => (
                      <>
                        <tr key={submission.id} className="hover:bg-slate-800/50 transition-colors" data-testid={`row-submission-${submission.id}`}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                            {new Date(submission.submissionTimestamp).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-white">{submission.customerName}</div>
                            <div className="text-sm text-slate-400">{submission.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-white">{submission.serviceNeeded}</div>
                            <div className="text-sm text-slate-400">{submission.propertyType}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                              {submission.timeline || 'N/A'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setExpandedRow(expandedRow === submission.id ? null : submission.id)}
                              className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
                              data-testid={`button-expand-${submission.id}`}
                            >
                              {expandedRow === submission.id ? (
                                <>
                                  <ChevronUp className="mr-1 h-4 w-4" /> Hide
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="mr-1 h-4 w-4" /> Details
                                </>
                              )}
                            </Button>
                          </td>
                        </tr>
                        {expandedRow === submission.id && (
                          <tr className="bg-slate-800/30">
                            <td colSpan={5} className="px-6 py-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="text-sm font-semibold text-white mb-3">Contact Information</h4>
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                      <Mail className="h-4 w-4 text-slate-400" />
                                      <a href={`mailto:${submission.email}`} className="text-cyan-400 hover:underline">{submission.email}</a>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                      <Phone className="h-4 w-4 text-slate-400" />
                                      <a href={`tel:${submission.phone}`} className="text-cyan-400 hover:underline">{submission.phone}</a>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                      <MapPin className="h-4 w-4 text-slate-400" />
                                      <span className="text-slate-300">{submission.address}</span>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-sm font-semibold text-white mb-3">Property Details</h4>
                                  <div className="space-y-1 text-sm text-slate-300">
                                    {submission.currentElectricBill && <div><span className="text-slate-400">Electric Bill:</span> {submission.currentElectricBill}</div>}
                                    {submission.roofType && <div><span className="text-slate-400">Roof Type:</span> {submission.roofType}</div>}
                                    {submission.roofAge && <div><span className="text-slate-400">Roof Age:</span> {submission.roofAge} years</div>}
                                    {submission.shadingIssues && <div><span className="text-slate-400">Shading Issues:</span> {submission.shadingIssues}</div>}
                                    {submission.systemSizePreference && <div><span className="text-slate-400">System Size:</span> {submission.systemSizePreference}</div>}
                                  </div>
                                </div>
                                
                                {submission.propertyType === 'Agricultural' && (
                                  <div className="md:col-span-2">
                                    <h4 className="text-sm font-semibold text-white mb-3">Agricultural Property Details</h4>
                                    <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
                                      {submission.landSizeAcres && <div><span className="text-slate-400">Land Size:</span> {submission.landSizeAcres} acres</div>}
                                      {submission.primaryCrop && <div><span className="text-slate-400">Primary Crop/Use:</span> {submission.primaryCrop}</div>}
                                      {submission.irrigationSystem && <div><span className="text-slate-400">Irrigation System:</span> {submission.irrigationSystem}</div>}
                                      {submission.numberOfBarns !== undefined && <div><span className="text-slate-400">Number of Barns:</span> {submission.numberOfBarns}</div>}
                                      {submission.livestockOperations && <div><span className="text-slate-400">Livestock Operations:</span> {submission.livestockOperations}</div>}
                                      {submission.agriculturalEnergyUsage && <div><span className="text-slate-400">Ag Energy Usage:</span> {submission.agriculturalEnergyUsage} kWh/month</div>}
                                    </div>
                                  </div>
                                )}

                                {submission.propertyType === 'Marina' && (
                                  <div className="md:col-span-2">
                                    <h4 className="text-sm font-semibold text-white mb-3">Marina Property Details</h4>
                                    <div className="grid grid-cols-2 gap-4 text-sm text-slate-300">
                                      {submission.numberOfBoatSlips !== undefined && <div><span className="text-slate-400">Boat Slips:</span> {submission.numberOfBoatSlips}</div>}
                                      {submission.dockLength && <div><span className="text-slate-400">Dock/Pier Length:</span> {submission.dockLength} feet</div>}
                                      {submission.hasFuelStation !== undefined && <div><span className="text-slate-400">Fuel Station:</span> {submission.hasFuelStation ? 'Yes' : 'No'}</div>}
                                      {submission.storageType && <div><span className="text-slate-400">Storage Type:</span> {submission.storageType}</div>}
                                      {submission.hasWaterPumping !== undefined && <div><span className="text-slate-400">Water Pumping:</span> {submission.hasWaterPumping ? 'Yes' : 'No'}</div>}
                                      {submission.marinaEnergyUsage && <div><span className="text-slate-400">Marina Energy Usage:</span> {submission.marinaEnergyUsage} kWh/month</div>}
                                    </div>
                                  </div>
                                )}

                                {submission.additionalNotes && (
                                  <div className="md:col-span-2">
                                    <h4 className="text-sm font-semibold text-white mb-3">Additional Notes</h4>
                                    <p className="text-sm text-slate-300 whitespace-pre-wrap">{submission.additionalNotes}</p>
                                  </div>
                                )}
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 bg-slate-800/30 border-t border-slate-700 flex items-center justify-between">
                <div className="text-sm text-slate-400">
                  Showing page {currentPage} of {totalPages} ({data.total} total)
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="border-slate-600"
                    data-testid="button-prev-page"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="border-slate-600"
                    data-testid="button-next-page"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </TabsContent>

      <TabsContent value="newsletter" className="mt-6">
        {/* Newsletter Subscribers Table */}
        <Card className="bg-slate-900/50 backdrop-blur border-slate-700 overflow-hidden">
          {isLoadingNewsletter ? (
            <div className="p-12 text-center text-slate-400">Loading subscribers...</div>
          ) : !newsletterData?.subscribers?.length ? (
            <div className="p-12 text-center text-slate-400">No newsletter subscribers yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Subscribed Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {newsletterData.subscribers.map((subscriber: NewsletterSubscriber) => (
                    <tr key={subscriber.id} className="hover:bg-slate-800/50 transition-colors" data-testid={`row-newsletter-${subscriber.id}`}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        {subscriber.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-blue-400" />
                          {subscriber.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        {subscriber.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          subscriber.source === 'newsletter_form' ? 'bg-blue-500/20 text-blue-300' : 'bg-green-500/20 text-green-300'
                        }`}>
                          {subscriber.source === 'newsletter_form' ? 'Newsletter Form' : 'Solar Form'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                        {new Date(subscriber.subscribedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </TabsContent>
    </Tabs>
        </div>
      </div>
    </div>
  );
}
