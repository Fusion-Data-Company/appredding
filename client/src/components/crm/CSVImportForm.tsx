import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Loader2, UploadCloud, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { apiRequest, queryClient } from '@/lib/queryClient';

interface CSVImportFormProps {
  onSuccess?: (data: any) => void;
}

type ImportType = 'contacts' | 'companies' | 'opportunities';

export function CSVImportForm({ onSuccess }: CSVImportFormProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [importType, setImportType] = useState<ImportType>('contacts');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [importResult, setImportResult] = useState<null | {
    success: boolean;
    imported: number;
    message?: string;
  }>(null);

  // Handle file selection from the file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== 'text/csv' && !selectedFile.name.endsWith('.csv')) {
        toast({
          title: 'Invalid file type',
          description: 'Please upload a CSV file',
          variant: 'destructive',
        });
        return;
      }
      setFile(selectedFile);
      setImportResult(null);
    }
  };

  // Handle drag and drop events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type !== 'text/csv' && !droppedFile.name.endsWith('.csv')) {
        toast({
          title: 'Invalid file type',
          description: 'Please upload a CSV file',
          variant: 'destructive',
        });
        return;
      }
      setFile(droppedFile);
      setImportResult(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      toast({
        title: 'No file selected',
        description: 'Please select a CSV file to import',
        variant: 'destructive',
      });
      return;
    }
    
    // Check file size to prevent large file uploads that might cause timeouts
    const maxSizeInMB = 5;
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxSizeInMB) {
      toast({
        title: 'File too large',
        description: `Please select a file smaller than ${maxSizeInMB}MB (current file: ${fileSizeInMB.toFixed(2)}MB)`,
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    setImportResult(null);

    // Set up retry mechanism
    const maxRetries = 3;
    let retryCount = 0;
    let success = false;

    while (retryCount < maxRetries && !success) {
      try {
        // Read the file content
        const fileContent = await file.text();
        
        // Quick validation of CSV format
        const firstLine = fileContent.split('\n')[0];
        if (!firstLine || !firstLine.includes(',')) {
          toast({
            title: 'Invalid CSV format',
            description: 'The file does not appear to be a valid CSV file with comma-separated values',
            variant: 'destructive',
          });
          setIsSubmitting(false);
          return;
        }
        
        // Send the file content to the API with timeout handling
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
        
        const res = await apiRequest('POST', '/api/import-csv', {
          type: importType,
          csv: fileContent
        });
        
        clearTimeout(timeoutId);
        
        const data = await res.json();
        
        if (res.ok) {
          success = true;
          setImportResult({
            success: true,
            imported: data.imported,
            message: `Successfully imported ${data.imported} ${importType}`
          });
          
          // Invalidate queries to refresh data
          queryClient.invalidateQueries({ queryKey: [`/api/${importType}`] });
          queryClient.invalidateQueries({ queryKey: ['/api/analytics'] });
          
          // Ensure all related data is refreshed
          queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
          queryClient.invalidateQueries({ queryKey: ['/api/companies'] });
          queryClient.invalidateQueries({ queryKey: ['/api/opportunities'] });
          
          // Reset file
          setFile(null);
          
          // Call success callback if provided
          if (onSuccess) {
            onSuccess(data);
          }
          
          toast({
            title: 'Import Successful',
            description: `Successfully imported ${data.imported} ${importType}`,
            variant: 'default',
          });
        } else {
          // If we're on the last retry, show the error
          if (retryCount === maxRetries - 1) {
            setImportResult({
              success: false,
              imported: 0,
              message: data.error || 'Failed to import data'
            });
            
            toast({
              title: 'Import Failed',
              description: data.error || 'Failed to import data. Please check your CSV file format.',
              variant: 'destructive',
            });
          }
          retryCount++;
        }
      } catch (error: any) {
        console.error('Error importing CSV:', error);
        
        // If we're on the last retry, show the error
        if (retryCount === maxRetries - 1) {
          setImportResult({
            success: false,
            imported: 0,
            message: error.message || 'An error occurred while importing the CSV file'
          });
          
          toast({
            title: 'Import Failed',
            description: error.message || 'An error occurred while importing the CSV file',
            variant: 'destructive',
          });
        }
        retryCount++;
      }
    }
    
    setIsSubmitting(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    // Reset form state when closing
    setFile(null);
    setImportResult(null);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="mr-2 hidden lg:flex">
          <UploadCloud className="mr-2 h-4 w-4" />
          Import CSV
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md md:max-w-lg lg:max-w-xl" side="right">
        <SheetHeader>
          <SheetTitle>Import Data from CSV</SheetTitle>
          <SheetDescription>
            Upload a CSV file to import contacts, companies, or opportunities into the CRM.
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6">
          <Tabs defaultValue="contacts" onValueChange={(value) => setImportType(value as ImportType)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="companies">Companies</TabsTrigger>
              <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            </TabsList>
            
            <TabsContent value="contacts" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Import Contacts</CardTitle>
                  <CardDescription>
                    Upload a CSV file with contact information. Required columns: firstName, lastName
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Supported Fields:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>• firstName*</div>
                      <div>• lastName*</div>
                      <div>• email</div>
                      <div>• phone</div>
                      <div>• title</div>
                      <div>• status</div>
                      <div>• source</div>
                      <div>• notes</div>
                      <div>• companyId</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="companies" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Import Companies</CardTitle>
                  <CardDescription>
                    Upload a CSV file with company information. Required columns: name
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Supported Fields:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>• name*</div>
                      <div>• industry</div>
                      <div>• website</div>
                      <div>• phone</div>
                      <div>• address</div>
                      <div>• city</div>
                      <div>• state</div>
                      <div>• zip</div>
                      <div>• country</div>
                      <div>• annualRevenue</div>
                      <div>• employeeCount</div>
                      <div>• description</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="opportunities" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Import Opportunities</CardTitle>
                  <CardDescription>
                    Upload a CSV file with opportunity information. Required columns: name
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Supported Fields:</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>• name*</div>
                      <div>• contactId</div>
                      <div>• companyId</div>
                      <div>• status</div>
                      <div>• amount</div>
                      <div>• probability</div>
                      <div>• expectedCloseDate</div>
                      <div>• description</div>
                      <div>• source</div>
                      <div>• location</div>
                      <div>• notes</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div 
              className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                dragActive ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
              }`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="csv-file"
                accept=".csv"
                className="hidden"
                onChange={handleFileChange}
              />
              
              {file ? (
                <div className="flex flex-col items-center space-y-2">
                  <FileText className="h-10 w-10 text-primary" />
                  <Label htmlFor="csv-file" className="font-medium cursor-pointer text-center">
                    {file.name}
                    <p className="text-sm text-muted-foreground mt-1">
                      Click to change file
                    </p>
                  </Label>
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-2">
                  <UploadCloud className="h-10 w-10 text-muted-foreground" />
                  <Label htmlFor="csv-file" className="font-medium cursor-pointer text-center">
                    Click to upload or drag and drop
                    <p className="text-sm text-muted-foreground mt-1">
                      CSV files only
                    </p>
                  </Label>
                </div>
              )}
            </div>
            
            {importResult && (
              <div className={`p-4 rounded-lg ${
                importResult.success ? 'bg-green-950/30 text-green-400' : 'bg-red-950/30 text-red-400'
              }`}>
                <div className="flex items-start space-x-2">
                  {importResult.success ? (
                    <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <h4 className="font-medium">
                      {importResult.success ? 'Import Successful' : 'Import Failed'}
                    </h4>
                    <p className="text-sm">
                      {importResult.message}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex justify-end space-x-2">
              <Button variant="outline" type="button" onClick={handleClose}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={!file || isSubmitting}
                className="min-w-[100px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Importing...
                  </>
                ) : 'Import'}
              </Button>
            </div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
}