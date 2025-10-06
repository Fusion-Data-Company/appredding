import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
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
  Settings
} from 'lucide-react';
import { useLocation } from 'wouter';

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
}

export default function AdminCRM() {
  const [, setLocation] = useLocation();
  const [adminCode, setAdminCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
      'Roof Age', 'Shading Issues', 'System Size', 'Timeline', 'Notes'
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
      sub.additionalNotes || ''
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `solar-submissions-${new Date().toISOString().split('T')[0]}.csv`;
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
          <div className="flex flex-col md:flex-row gap-4">
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
        </div>

        {/* Table */}
        <Card className="bg-slate-900/50 backdrop-blur border-slate-700 overflow-hidden">
          {isLoading ? (
            <div className="p-12 text-center text-slate-400">Loading submissions...</div>
          ) : error ? (
            <div className="p-12 text-center text-red-400">Error loading submissions</div>
          ) : !data?.submissions?.length ? (
            <div className="p-12 text-center text-slate-400">No submissions found</div>
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
      </div>
    </div>
  );
}
