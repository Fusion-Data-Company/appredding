import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { 
  Database, 
  Search, 
  Upload, 
  Download, 
  AlertTriangle, 
  AlertCircle,
  CheckCircle, 
  Activity, 
  BarChart3, 
  FileText, 
  Filter,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Clock,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const batchImportSchema = z.object({
  dataType: z.string().min(1, "Data type is required"),
  file: z.any().optional()
});

const advancedSearchSchema = z.object({
  searchTerm: z.string().optional(),
  leadStatus: z.string().optional(),
  customerType: z.string().optional(),
  dateStart: z.string().optional(),
  dateEnd: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.string().optional()
});

export default function DataProcessingCenter() {
  const [activeTab, setActiveTab] = useState("analytics");
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);
  const [importProgress, setImportProgress] = useState(0);
  const [searchResults, setSearchResults] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get comprehensive analytics
  const { data: analyticsData, isLoading: analyticsLoading } = useQuery({
    queryKey: ['/api/data-processing/analytics/comprehensive'],
    queryFn: async () => {
      const response = await fetch('/api/data-processing/analytics/comprehensive');
      if (!response.ok) throw new Error('Failed to fetch analytics');
      return response.json();
    },
    refetchInterval: 30000 // Refresh every 30 seconds
  });

  // Get performance monitoring
  const { data: monitoringData, isLoading: monitoringLoading } = useQuery({
    queryKey: ['/api/data-processing/monitoring/performance'],
    queryFn: async () => {
      const response = await fetch('/api/data-processing/monitoring/performance');
      if (!response.ok) throw new Error('Failed to fetch monitoring data');
      return response.json();
    },
    refetchInterval: 10000 // Refresh every 10 seconds for real-time monitoring
  });

  // Get data validation results
  const { data: validationData, isLoading: validationLoading } = useQuery({
    queryKey: ['/api/data-processing/cleanup/validate'],
    queryFn: async () => {
      const response = await fetch('/api/data-processing/cleanup/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      });
      if (!response.ok) throw new Error('Failed to fetch validation data');
      return response.json();
    }
  });

  const importForm = useForm<z.infer<typeof batchImportSchema>>({
    resolver: zodResolver(batchImportSchema),
    defaultValues: {
      dataType: "contacts"
    }
  });

  const searchForm = useForm<z.infer<typeof advancedSearchSchema>>({
    resolver: zodResolver(advancedSearchSchema),
    defaultValues: {
      searchTerm: "",
      sortBy: "createdAt",
      sortOrder: "desc"
    }
  });

  // Batch import mutation
  const batchImportMutation = useMutation({
    mutationFn: async (data: { dataType: string; records: any[] }) => {
      const response = await fetch('/api/data-processing/process/batch-import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!response.ok) throw new Error('Failed to import data');
      return response.json();
    },
    onSuccess: (data) => {
      toast({ 
        title: "Import Complete", 
        description: `Successfully processed ${data.results.processedCount} of ${data.results.totalRecords} records`
      });
      setIsImportDialogOpen(false);
      setImportProgress(0);
      setSelectedFile(null);
      importForm.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/data-processing/analytics/comprehensive'] });
    },
    onError: (error) => {
      toast({ 
        title: "Import Failed", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  // Advanced search mutation
  const searchMutation = useMutation({
    mutationFn: async (searchParams: any) => {
      const response = await fetch('/api/data-processing/search/advanced', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(searchParams)
      });
      if (!response.ok) throw new Error('Failed to search data');
      return response.json();
    },
    onSuccess: (data) => {
      setSearchResults(data);
      toast({ title: "Search Complete", description: `Found ${data.results.length} results` });
    },
    onError: (error) => {
      toast({ 
        title: "Search Failed", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  // Export data mutation
  const exportMutation = useMutation({
    mutationFn: async (exportParams: { exportType: string; format: string }) => {
      const response = await fetch('/api/data-processing/export/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exportParams)
      });
      if (!response.ok) throw new Error('Failed to generate export');
      
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${exportParams.exportType}_export.${exportParams.format}`;
      a.click();
      URL.revokeObjectURL(url);
      
      return { success: true };
    },
    onSuccess: () => {
      toast({ title: "Export Complete", description: "Data exported successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Export Failed", 
        description: error.message,
        variant: "destructive" 
      });
    }
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const csvData = e.target?.result as string;
          const lines = csvData.split('\n');
          const headers = lines[0].split(',').map(h => h.trim());
          const records = lines.slice(1).filter(line => line.trim()).map(line => {
            const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
            const record: any = {};
            headers.forEach((header, index) => {
              record[header] = values[index] || '';
            });
            return record;
          });

          const dataType = importForm.getValues('dataType');
          setImportProgress(25);
          
          setTimeout(() => {
            setImportProgress(50);
            setTimeout(() => {
              setImportProgress(75);
              setTimeout(() => {
                batchImportMutation.mutate({ dataType, records });
                setImportProgress(100);
              }, 500);
            }, 500);
          }, 500);
          
        } catch (error) {
          toast({ 
            title: "File Error", 
            description: "Failed to parse CSV file",
            variant: "destructive" 
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const handleAdvancedSearch = (data: z.infer<typeof advancedSearchSchema>) => {
    const searchParams = {
      searchTerm: data.searchTerm,
      filters: {
        leadStatus: data.leadStatus,
        customerType: data.customerType
      },
      dateRange: {
        start: data.dateStart,
        end: data.dateEnd
      },
      sortBy: data.sortBy,
      sortOrder: data.sortOrder,
      limit: 50,
      offset: 0
    };
    
    searchMutation.mutate(searchParams);
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getHealthScoreBadge = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(99,102,241,0.08),transparent_50%)]" />
      
      <div className="container mx-auto p-6 space-y-8 relative z-10">
        
        {/* Header */}
        <div className="flex items-center justify-between backdrop-blur-sm bg-white/5 rounded-2xl p-8 border border-white/10 shadow-2xl">
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Data Processing Center
            </h1>
            <p className="text-slate-300 mt-3 text-lg">Advanced analytics, real-time monitoring, and comprehensive data operations</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${monitoringData?.monitoring.systemHealth.status === 'operational' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`} />
              <Badge className={`${monitoringData?.monitoring.systemHealth.status === 'operational' ? 'bg-green-500/20 text-green-300 border-green-500/30' : 'bg-red-500/20 text-red-300 border-red-500/30'} px-3 py-1 text-sm font-medium`}>
                {monitoringData?.monitoring.systemHealth.status === 'operational' ? 'System Online' : 'System Issues'}
              </Badge>
            </div>
          </div>
        </div>

        {/* Quick Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Business Health</CardTitle>
              <Shield className="h-5 w-5 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold ${analyticsData?.analytics.overview.businessHealthScore >= 80 ? 'text-green-400' : 
                analyticsData?.analytics.overview.businessHealthScore >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                {analyticsData?.analytics.overview.businessHealthScore || 0}
              </div>
              <Badge className={`${analyticsData?.analytics.overview.businessHealthScore >= 80 ? 'bg-green-500/20 text-green-300 border-green-500/30' : 
                analyticsData?.analytics.overview.businessHealthScore >= 60 ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' : 'bg-red-500/20 text-red-300 border-red-500/30'} mt-2`}>
                {analyticsData?.analytics.overview.businessHealthScore >= 80 ? 'Excellent' : 
                 analyticsData?.analytics.overview.businessHealthScore >= 60 ? 'Good' : 'Needs Attention'}
              </Badge>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Total Records</CardTitle>
              <Database className="h-5 w-5 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-400">
                {(analyticsData?.analytics.overview.totalContacts || 0) + (analyticsData?.analytics.overview.totalProjects || 0)}
              </div>
              <p className="text-xs text-slate-300">Contacts + Projects</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Conversion Rate</CardTitle>
              <Target className="h-5 w-5 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400">
                {analyticsData?.analytics.overview.conversionRate || 0}%
              </div>
              <p className="text-xs text-slate-300">Lead to customer</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Data Quality</CardTitle>
              <CheckCircle className="h-5 w-5 text-indigo-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-indigo-400">
                {monitoringData?.monitoring.dataQuality.score || 0}%
              </div>
              <p className="text-xs text-slate-300">Profile completeness</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Processing Speed</CardTitle>
              <Zap className="h-5 w-5 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-400">
                {monitoringData?.monitoring.processing.processingEfficiency || 0}%
              </div>
              <p className="text-xs text-slate-300">Efficiency rate</p>
            </CardContent>
          </Card>

          <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-200">Active Alerts</CardTitle>
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-400">
                {monitoringData?.monitoring.alerts.criticalIssues || 0}
              </div>
              <p className="text-xs text-slate-300">Critical issues</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 backdrop-blur-sm bg-white/10 border border-white/20 p-2 rounded-xl shadow-xl">
            <TabsTrigger value="analytics" className="flex items-center gap-2 text-slate-300 data-[state=active]:bg-blue-500/30 data-[state=active]:text-blue-200 data-[state=active]:shadow-lg transition-all duration-300 rounded-lg px-4 py-3">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center gap-2 text-slate-300 data-[state=active]:bg-green-500/30 data-[state=active]:text-green-200 data-[state=active]:shadow-lg transition-all duration-300 rounded-lg px-4 py-3">
              <Activity className="h-4 w-4" />
              Monitoring
            </TabsTrigger>
            <TabsTrigger value="processing" className="flex items-center gap-2 text-slate-300 data-[state=active]:bg-purple-500/30 data-[state=active]:text-purple-200 data-[state=active]:shadow-lg transition-all duration-300 rounded-lg px-4 py-3">
              <Upload className="h-4 w-4" />
              Processing
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-2 text-slate-300 data-[state=active]:bg-indigo-500/30 data-[state=active]:text-indigo-200 data-[state=active]:shadow-lg transition-all duration-300 rounded-lg px-4 py-3">
              <Search className="h-4 w-4" />
              Search
            </TabsTrigger>
            <TabsTrigger value="validation" className="flex items-center gap-2 text-slate-300 data-[state=active]:bg-orange-500/30 data-[state=active]:text-orange-200 data-[state=active]:shadow-lg transition-all duration-300 rounded-lg px-4 py-3">
              <AlertCircle className="h-4 w-4" />
              Validation
            </TabsTrigger>
          </TabsList>

          {/* Comprehensive Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-blue-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-600 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Revenue Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analyticsLoading ? (
                    <div className="text-center py-4">Loading analytics...</div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Revenue:</span>
                        <span className="font-bold text-green-600">
                          ${(analyticsData?.analytics.revenue.totalRevenue || 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Avg Project Size:</span>
                        <span className="font-medium">
                          ${(analyticsData?.analytics.revenue.averageProjectSize || 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Largest Project:</span>
                        <span className="font-medium">
                          ${(analyticsData?.analytics.revenue.largestProject || 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Monthly Recurring:</span>
                        <span className="font-medium text-blue-600">
                          ${(analyticsData?.analytics.revenue.monthlyRecurring || 0).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-green-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-green-600 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Customer Segmentation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analyticsLoading ? (
                    <div className="text-center py-4">Loading segmentation...</div>
                  ) : (
                    <div className="space-y-3">
                      {analyticsData?.analytics.customerSegmentation?.map((segment, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div>
                            <span className="text-slate-700 font-medium">{segment.segment || 'Unknown'}</span>
                            <div className="text-xs text-slate-500">{segment.count} customers</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-600">
                              ${(segment.totalValue || 0).toLocaleString()}
                            </div>
                            <div className="text-xs text-slate-500">
                              Avg: ${(segment.avgValue || 0).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-purple-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-600 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Performance Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analyticsLoading ? (
                    <div className="text-center py-4">Loading performance...</div>
                  ) : (
                    <div className="space-y-3">
                      {analyticsData?.analytics.performanceMetrics?.slice(0, 5).map((metric, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <div>
                            <span className="text-slate-700 font-medium">{metric.salesPerson || 'Unassigned'}</span>
                            <div className="text-xs text-slate-500">{metric.leadsCount} leads</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-purple-600">
                              {(metric.conversionRate || 0).toFixed(1)}%
                            </div>
                            <div className="text-xs text-slate-500">
                              ${(metric.totalValue || 0).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-indigo-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-indigo-600 flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Document Processing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analyticsLoading ? (
                    <div className="text-center py-4">Loading document metrics...</div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Documents:</span>
                        <span className="font-bold text-indigo-600">
                          {analyticsData?.analytics.documentMetrics.totalDocuments || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Contracts:</span>
                        <span className="font-medium">
                          {analyticsData?.analytics.documentMetrics.contracts || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Warranties:</span>
                        <span className="font-medium">
                          {analyticsData?.analytics.documentMetrics.warranties || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Permits:</span>
                        <span className="font-medium">
                          {analyticsData?.analytics.documentMetrics.permits || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Processing Efficiency:</span>
                        <span className="font-bold text-green-600">
                          {(analyticsData?.analytics.documentMetrics.processingEfficiency || 0).toFixed(1)}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Real-time Monitoring Tab */}
          <TabsContent value="monitoring" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-green-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-green-600 flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {monitoringLoading ? (
                    <div className="text-center py-4">Loading system health...</div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Status:</span>
                        <Badge className={monitoringData?.monitoring.systemHealth.status === 'operational' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {monitoringData?.monitoring.systemHealth.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Active Connections:</span>
                        <span className="font-medium">{monitoringData?.monitoring.systemHealth.activeConnections}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Database Size:</span>
                        <span className="font-medium">{monitoringData?.monitoring.systemHealth.databaseSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Performance Score:</span>
                        <span className="font-bold text-green-600">{monitoringData?.monitoring.systemHealth.performanceScore}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Uptime:</span>
                        <span className="font-medium">
                          {Math.floor((monitoringData?.monitoring.systemHealth.uptimeSeconds || 0) / 3600)}h
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-blue-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-600 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Data Quality
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {monitoringLoading ? (
                    <div className="text-center py-4">Loading data quality...</div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Overall Score:</span>
                        <span className={`font-bold ${getHealthScoreColor(monitoringData?.monitoring.dataQuality.score || 0)}`}>
                          {monitoringData?.monitoring.dataQuality.score}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Email Completion:</span>
                        <span className="font-medium">{monitoringData?.monitoring.dataQuality.emailCompletionRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Phone Completion:</span>
                        <span className="font-medium">{monitoringData?.monitoring.dataQuality.phoneCompletionRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Complete Profiles:</span>
                        <span className="font-medium">{monitoringData?.monitoring.dataQuality.completeProfiles}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Records:</span>
                        <span className="font-bold text-blue-600">{monitoringData?.monitoring.dataQuality.totalRecords}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-purple-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-600 flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Processing Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {monitoringLoading ? (
                    <div className="text-center py-4">Loading processing stats...</div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Today:</span>
                        <span className="font-bold text-purple-600">{monitoringData?.monitoring.processing.documentsToday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">This Week:</span>
                        <span className="font-medium">{monitoringData?.monitoring.processing.documentsThisWeek}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Documents:</span>
                        <span className="font-medium">{monitoringData?.monitoring.processing.totalDocuments}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Efficiency:</span>
                        <span className="font-bold text-green-600">{monitoringData?.monitoring.processing.processingEfficiency}%</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-red-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-red-600 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Active Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {monitoringLoading ? (
                    <div className="text-center py-4">Loading alerts...</div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Overdue Projects:</span>
                        <span className={`font-bold ${monitoringData?.monitoring.alerts.overdueProjects > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {monitoringData?.monitoring.alerts.overdueProjects}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Stale Leads:</span>
                        <span className={`font-medium ${monitoringData?.monitoring.alerts.staleLeads > 0 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {monitoringData?.monitoring.alerts.staleLeads}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Missing Documents:</span>
                        <span className={`font-medium ${monitoringData?.monitoring.alerts.missingDocuments > 0 ? 'text-orange-600' : 'text-green-600'}`}>
                          {monitoringData?.monitoring.alerts.missingDocuments}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Critical Issues:</span>
                        <span className={`font-bold ${monitoringData?.monitoring.alerts.criticalIssues > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {monitoringData?.monitoring.alerts.criticalIssues}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Data Processing Tab */}
          <TabsContent value="processing" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-purple-200 shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg text-purple-600">Batch Data Import</CardTitle>
                      <CardDescription>Upload and process large datasets</CardDescription>
                    </div>
                    <Dialog open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                          <Upload className="h-4 w-4 mr-2" />
                          Import Data
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Batch Data Import</DialogTitle>
                          <DialogDescription>
                            Upload CSV files to import contacts or projects in bulk
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...importForm}>
                          <form className="space-y-4">
                            <FormField
                              control={importForm.control}
                              name="dataType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Data Type</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select data type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="contacts">Contacts</SelectItem>
                                      <SelectItem value="projects">Projects</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <div className="space-y-2">
                              <Label>CSV File</Label>
                              <Input
                                type="file"
                                accept=".csv"
                                onChange={handleFileUpload}
                                disabled={batchImportMutation.isPending}
                              />
                              {selectedFile && (
                                <p className="text-sm text-slate-600">
                                  Selected: {selectedFile.name}
                                </p>
                              )}
                            </div>
                            
                            {importProgress > 0 && (
                              <div className="space-y-2">
                                <Label>Import Progress</Label>
                                <Progress value={importProgress} />
                                <p className="text-sm text-slate-600">
                                  {importProgress < 100 ? 'Processing...' : 'Complete!'}
                                </p>
                              </div>
                            )}
                            
                            <div className="flex justify-end gap-3">
                              <Button type="button" variant="outline" onClick={() => setIsImportDialogOpen(false)}>
                                Cancel
                              </Button>
                            </div>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-slate-600">
                      Import large datasets efficiently with real-time progress tracking and error handling.
                    </p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Supported Formats:</span>
                        <ul className="text-slate-600 mt-1">
                          <li>• CSV files</li>
                          <li>• Contact data</li>
                          <li>• Project data</li>
                        </ul>
                      </div>
                      <div>
                        <span className="font-medium">Features:</span>
                        <ul className="text-slate-600 mt-1">
                          <li>• Real-time progress</li>
                          <li>• Error validation</li>
                          <li>• Batch processing</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-indigo-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-indigo-600">Export & Reporting</CardTitle>
                  <CardDescription>Generate comprehensive data exports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        onClick={() => exportMutation.mutate({ exportType: 'contacts', format: 'csv' })}
                        variant="outline"
                        className="w-full"
                        disabled={exportMutation.isPending}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export Contacts
                      </Button>
                      <Button
                        onClick={() => exportMutation.mutate({ exportType: 'projects', format: 'csv' })}
                        variant="outline"
                        className="w-full"
                        disabled={exportMutation.isPending}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export Projects
                      </Button>
                      <Button
                        onClick={() => exportMutation.mutate({ exportType: 'analytics', format: 'json' })}
                        variant="outline"
                        className="w-full"
                        disabled={exportMutation.isPending}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export Analytics
                      </Button>
                      <Button
                        onClick={() => exportMutation.mutate({ exportType: 'contacts', format: 'json' })}
                        variant="outline"
                        className="w-full"
                        disabled={exportMutation.isPending}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Export JSON
                      </Button>
                    </div>
                    <p className="text-slate-600 text-sm">
                      Export your data in multiple formats for external analysis, backup, or integration with other systems.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Advanced Search Tab */}
          <TabsContent value="search" className="space-y-6">
            <Card className="border-indigo-200 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg text-indigo-600">Advanced Search Engine</CardTitle>
                    <CardDescription>Powerful search with filtering and sorting capabilities</CardDescription>
                  </div>
                  <Dialog open={isSearchDialogOpen} onOpenChange={setIsSearchDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                        <Search className="h-4 w-4 mr-2" />
                        Advanced Search
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Advanced Search</DialogTitle>
                        <DialogDescription>
                          Search and filter your customer data with advanced criteria
                        </DialogDescription>
                      </DialogHeader>
                      <Form {...searchForm}>
                        <form onSubmit={searchForm.handleSubmit(handleAdvancedSearch)} className="space-y-4">
                          <FormField
                            control={searchForm.control}
                            name="searchTerm"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Search Term</FormLabel>
                                <FormControl>
                                  <Input placeholder="Search by name, email, or phone..." {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={searchForm.control}
                              name="leadStatus"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Lead Status</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Any status" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="">Any Status</SelectItem>
                                      <SelectItem value="new">New</SelectItem>
                                      <SelectItem value="contacted">Contacted</SelectItem>
                                      <SelectItem value="qualified">Qualified</SelectItem>
                                      <SelectItem value="proposal">Proposal</SelectItem>
                                      <SelectItem value="negotiation">Negotiation</SelectItem>
                                      <SelectItem value="won">Won</SelectItem>
                                      <SelectItem value="lost">Lost</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={searchForm.control}
                              name="customerType"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Customer Type</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Any type" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="">Any Type</SelectItem>
                                      <SelectItem value="residential">Residential</SelectItem>
                                      <SelectItem value="commercial">Commercial</SelectItem>
                                      <SelectItem value="industrial">Industrial</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={searchForm.control}
                              name="dateStart"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Start Date</FormLabel>
                                  <FormControl>
                                    <Input type="date" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={searchForm.control}
                              name="dateEnd"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>End Date</FormLabel>
                                  <FormControl>
                                    <Input type="date" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <FormField
                              control={searchForm.control}
                              name="sortBy"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Sort By</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="createdAt">Date Created</SelectItem>
                                      <SelectItem value="name">Name</SelectItem>
                                      <SelectItem value="totalValue">Total Value</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={searchForm.control}
                              name="sortOrder"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Sort Order</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="desc">Newest First</SelectItem>
                                      <SelectItem value="asc">Oldest First</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <div className="flex justify-end gap-3">
                            <Button type="button" variant="outline" onClick={() => setIsSearchDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button 
                              type="submit" 
                              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
                              disabled={searchMutation.isPending}
                            >
                              Search
                            </Button>
                          </div>
                        </form>
                      </Form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              
              <CardContent>
                {searchResults ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Search Results ({searchResults.results.length})</h4>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSearchResults(null)}
                      >
                        Clear Results
                      </Button>
                    </div>
                    <div className="space-y-2 max-h-96 overflow-y-auto">
                      {searchResults.results.map((result, index) => (
                        <div key={index} className="border rounded-lg p-3 bg-slate-50">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">{result.name}</div>
                              <div className="text-sm text-slate-600">{result.email}</div>
                              <div className="text-sm text-slate-600">{result.phone}</div>
                            </div>
                            <div className="text-right">
                              <Badge className={
                                result.leadStatus === 'won' ? 'bg-green-100 text-green-800' :
                                result.leadStatus === 'qualified' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }>
                                {result.leadStatus}
                              </Badge>
                              <div className="text-sm text-slate-600 mt-1">
                                {result.projectCount} projects • ${result.totalValue.toLocaleString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    No search results. Use the Advanced Search button to find specific customers or projects.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Validation Tab */}
          <TabsContent value="validation" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-orange-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-orange-600 flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Data Quality Issues
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {validationLoading ? (
                    <div className="text-center py-4">Running validation...</div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Overall Score:</span>
                        <span className={`font-bold ${getHealthScoreColor(validationData?.validation.overallScore || 0)}`}>
                          {validationData?.validation.overallScore || 0}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Duplicate Emails:</span>
                        <span className={`font-medium ${validationData?.validation.dataQualityIssues.duplicateEmails > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {validationData?.validation.dataQualityIssues.duplicateEmails || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Invalid Emails:</span>
                        <span className={`font-medium ${validationData?.validation.dataQualityIssues.invalidEmails > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {validationData?.validation.dataQualityIssues.invalidEmails || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Missing Phones:</span>
                        <span className={`font-medium ${validationData?.validation.dataQualityIssues.missingPhones > 0 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {validationData?.validation.dataQualityIssues.missingPhones || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Incomplete Addresses:</span>
                        <span className={`font-medium ${validationData?.validation.dataQualityIssues.incompleteAddresses > 0 ? 'text-yellow-600' : 'text-green-600'}`}>
                          {validationData?.validation.dataQualityIssues.incompleteAddresses || 0}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Orphaned Projects:</span>
                        <span className={`font-medium ${validationData?.validation.dataQualityIssues.orphanedProjects > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {validationData?.validation.dataQualityIssues.orphanedProjects || 0}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-green-200 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-green-600 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {validationLoading ? (
                    <div className="text-center py-4">Generating recommendations...</div>
                  ) : (
                    <div className="space-y-3">
                      {validationData?.validation.recommendations?.length > 0 ? (
                        validationData.validation.recommendations.map((recommendation, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-slate-700">{recommendation}</span>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4 text-green-600">
                          <CheckCircle className="h-8 w-8 mx-auto mb-2" />
                          <div className="font-medium">Data Quality Excellent!</div>
                          <div className="text-sm text-slate-600">No critical issues found</div>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}