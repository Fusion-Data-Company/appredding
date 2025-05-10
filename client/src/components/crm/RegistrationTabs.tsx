import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQuery } from '@tanstack/react-query';
import { getQueryFn } from '@/lib/queryClient';
import { 
  Paintbrush, 
  Waves, 
  Flame, 
  Droplets, 
  Building, 
  Home,
  Loader2
} from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GradientHeading } from '@/components/ui/gradient-heading';

type ProfessionalRegistration = {
  id: number;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  createdAt: string;
  status?: string;
  specialties?: string[];
};

export default function RegistrationTabs() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Fetch data for all professional registrations
  const { 
    data: paintersData, 
    isLoading: paintersLoading 
  } = useQuery<ProfessionalRegistration[]>({
    queryKey: ['/api/professionals/painters'],
    queryFn: getQueryFn({ on401: 'throw' }),
  });
  
  const {
    data: poolProfessionalsData,
    isLoading: poolProfessionalsLoading
  } = useQuery<ProfessionalRegistration[]>({
    queryKey: ['/api/professionals/pool-professionals'],
    queryFn: getQueryFn({ on401: 'throw' }),
  });
  
  const {
    data: marinaProfessionalsData,
    isLoading: marinaProfessionalsLoading
  } = useQuery<ProfessionalRegistration[]>({
    queryKey: ['/api/professionals/marina-professionals'],
    queryFn: getQueryFn({ on401: 'throw' }),
  });
  
  const {
    data: firePreventionHomeownersData,
    isLoading: firePreventionHomeownersLoading
  } = useQuery<ProfessionalRegistration[]>({
    queryKey: ['/api/professionals/fire-prevention-homeowners'],
    queryFn: getQueryFn({ on401: 'throw' }),
  });
  
  const {
    data: constructionDistributorsData,
    isLoading: constructionDistributorsLoading
  } = useQuery<ProfessionalRegistration[]>({
    queryKey: ['/api/professionals/construction-distributors'],
    queryFn: getQueryFn({ on401: 'throw' }),
  });
  
  const {
    data: mobileHomeProfessionalsData,
    isLoading: mobileHomeProfessionalsLoading
  } = useQuery<ProfessionalRegistration[]>({
    queryKey: ['/api/professionals/mobile-home-professionals'],
    queryFn: getQueryFn({ on401: 'throw' }),
  });
  
  // Filter function for searching
  const filterData = (data: ProfessionalRegistration[] | undefined) => {
    if (!data) return [];
    if (!searchTerm) return data;
    
    return data.filter(item => 
      item.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contactName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  // Render function for each table
  const renderTable = (data: ProfessionalRegistration[] | undefined, isLoading: boolean, title: string) => {
    const filteredData = filterData(data);
    
    return (
      <Card className="border-2 border-white/10 bg-black/30 backdrop-blur-sm shadow-[0_0_30px_rgba(255,255,255,0.1)]">
        <CardHeader className="border-b border-white/10 bg-gradient-to-r from-black/60 to-primary-900/40">
          <CardTitle className="text-white text-2xl flex justify-between items-center">
            <GradientHeading level={3} variant="mixed" className="text-2xl">
              {title} Registrations
            </GradientHeading>
            <Badge variant="outline" className="ml-2 text-white border-white/30">
              {data?.length || 0} Entries
            </Badge>
          </CardTitle>
          <CardDescription className="text-gray-300">
            View and manage {title.toLowerCase()} professional registrations
          </CardDescription>
          <div className="mt-4">
            <Input
              placeholder="Search registrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-black/50 border-white/20 text-white"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
            </div>
          ) : filteredData.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-64 text-center">
              <p className="text-gray-400 mb-4">No registrations found</p>
              {searchTerm && (
                <Button 
                  variant="outline" 
                  onClick={() => setSearchTerm('')}
                  className="text-primary-400 border-primary-600/50"
                >
                  Clear Search
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-primary-950/50">
                  <TableRow>
                    <TableHead className="text-white">Company</TableHead>
                    <TableHead className="text-white">Contact</TableHead>
                    <TableHead className="text-white">Email</TableHead>
                    <TableHead className="text-white">Phone</TableHead>
                    <TableHead className="text-white">Registered On</TableHead>
                    <TableHead className="text-white">Status</TableHead>
                    <TableHead className="text-white text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((registration) => (
                    <TableRow key={registration.id} className="border-t border-white/10 hover:bg-primary-950/40">
                      <TableCell className="font-medium text-white">{registration.companyName}</TableCell>
                      <TableCell className="text-gray-300">{registration.contactName}</TableCell>
                      <TableCell className="text-gray-300">{registration.email}</TableCell>
                      <TableCell className="text-gray-300">{registration.phone}</TableCell>
                      <TableCell className="text-gray-300">
                        {new Date(registration.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={registration.status === 'verified' ? 'default' : 
                                 registration.status === 'rejected' ? 'destructive' : 'outline'}
                          className={`text-white ${registration.status === 'verified' ? 'bg-green-600' : ''}`}
                        >
                          {registration.status || 'pending'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" className="text-primary-400 border-primary-600/50">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <GradientHeading level={2} variant="mixed" className="text-3xl mb-6">
        Professional Registrations
      </GradientHeading>
      
      <Tabs defaultValue="painters" className="w-full">
        <TabsList className="grid grid-cols-3 sm:grid-cols-6 mb-8 bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden h-auto p-1">
          <TabsTrigger 
            value="painters" 
            className="flex flex-col items-center py-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-600/80 data-[state=active]:to-blue-600/80 data-[state=active]:text-white"
          >
            <Paintbrush className="h-5 w-5 mb-1" />
            <span>Painters</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="pools" 
            className="flex flex-col items-center py-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-600/80 data-[state=active]:to-blue-600/80 data-[state=active]:text-white"
          >
            <Droplets className="h-5 w-5 mb-1" />
            <span>Pools</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="marinas" 
            className="flex flex-col items-center py-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-600/80 data-[state=active]:to-blue-600/80 data-[state=active]:text-white"
          >
            <Waves className="h-5 w-5 mb-1" />
            <span>Marinas</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="fire-prevention" 
            className="flex flex-col items-center py-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-600/80 data-[state=active]:to-blue-600/80 data-[state=active]:text-white"
          >
            <Flame className="h-5 w-5 mb-1" />
            <span>Fire Prevention</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="construction" 
            className="flex flex-col items-center py-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-600/80 data-[state=active]:to-blue-600/80 data-[state=active]:text-white"
          >
            <Building className="h-5 w-5 mb-1" />
            <span>Construction</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="mobile-home" 
            className="flex flex-col items-center py-3 data-[state=active]:bg-gradient-to-br data-[state=active]:from-orange-600/80 data-[state=active]:to-blue-600/80 data-[state=active]:text-white"
          >
            <Home className="h-5 w-5 mb-1" />
            <span>Mobile Homes</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="painters">
          {renderTable(paintersData, paintersLoading, 'Painter Network')}
        </TabsContent>
        
        <TabsContent value="pools">
          {renderTable(poolProfessionalsData, poolProfessionalsLoading, 'Pool Professional')}
        </TabsContent>
        
        <TabsContent value="marinas">
          {renderTable(marinaProfessionalsData, marinaProfessionalsLoading, 'Marina Professional')}
        </TabsContent>
        
        <TabsContent value="fire-prevention">
          {renderTable(firePreventionHomeownersData, firePreventionHomeownersLoading, 'Fire Prevention Homeowner')}
        </TabsContent>
        
        <TabsContent value="construction">
          {renderTable(constructionDistributorsData, constructionDistributorsLoading, 'Construction Distributor')}
        </TabsContent>
        
        <TabsContent value="mobile-home">
          {renderTable(mobileHomeProfessionalsData, mobileHomeProfessionalsLoading, 'Mobile Home Professional')}
        </TabsContent>
      </Tabs>
    </div>
  );
}