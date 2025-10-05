import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X, CalendarIcon } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  return date.toLocaleString('en-US', options);
};
import { cn } from "@/lib/utils";
import { useToast } from '@/hooks/use-toast';

export const opportunityFormSchema = z.object({
  name: z.string()
    .min(2, 'Opportunity name must be at least 2 characters')
    .max(100, 'Opportunity name cannot exceed 100 characters')
    .trim()
    .refine(value => value.length > 0, {
      message: 'Opportunity name is required'
    }),
  contactId: z.string()
    .optional()
    .nullable()
    .transform(val => val === '' ? null : val),
  companyId: z.string()
    .optional()
    .nullable()
    .transform(val => val === '' ? null : val),
  status: z.string().default('pending'),
  amount: z.preprocess(
    val => val === '' ? null : val,
    z.coerce.number()
      .min(0, 'Amount must be a positive number')
      .nullable()
      .optional()
  ),
  probability: z.preprocess(
    val => val === '' ? 50 : val,
    z.coerce.number()
      .min(0, 'Probability must be at least 0%')
      .max(100, 'Probability cannot exceed 100%')
      .default(50)
  ),
  expectedCloseDate: z.date().optional().nullable(),
  description: z.string()
    .max(1000, 'Description cannot exceed 1000 characters')
    .optional()
    .nullable()
    .transform(val => val === '' ? null : val),
  source: z.string().default('website'),
  location: z.string()
    .max(200, 'Location cannot exceed 200 characters')
    .optional()
    .nullable()
    .transform(val => val === '' ? null : val),
  notes: z.string()
    .max(1000, 'Notes cannot exceed 1000 characters')
    .optional()
    .nullable()
    .transform(val => val === '' ? null : val),
});

type OpportunityFormValues = z.infer<typeof opportunityFormSchema>;

interface OpportunityFormProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: Array<{ id: number; firstName: string; lastName: string }>;
  companies: Array<{ id: number; name: string }>;
}

export function OpportunityForm({ isOpen, onClose, contacts, companies }: OpportunityFormProps) {
  const form = useForm<OpportunityFormValues>({
    resolver: zodResolver(opportunityFormSchema),
    defaultValues: {
      name: '',
      status: 'pending',
      probability: 50,
      source: 'website',
      description: '',
      notes: '',
    },
  });

  const { toast } = useToast();
  
  const createOpportunityMutation = useMutation({
    mutationFn: async (data: OpportunityFormValues) => {
      // Implement retry mechanism
      const maxRetries = 3;
      let retryCount = 0;
      let lastError: Error | null = null;
      
      while (retryCount < maxRetries) {
        try {
          // Carefully sanitize and prepare the data
          const formattedData = {
            ...data,
            name: data.name.trim(),
            // Safely convert string IDs to numbers, handling null/undefined
            contactId: data.contactId && data.contactId !== 'none' 
              ? parseInt(data.contactId) 
              : undefined,
            companyId: data.companyId && data.companyId !== 'none' 
              ? parseInt(data.companyId) 
              : undefined,
            // Make sure numeric fields are properly formatted
            amount: data.amount !== undefined && data.amount !== null 
              ? Number(data.amount) 
              : undefined,
            probability: data.probability ?? 50,
            // Sanitize text fields
            description: data.description?.trim(),
            location: data.location?.trim(),
            notes: data.notes?.trim(),
          };
          
          const res = await apiRequest('POST', '/api/opportunities', formattedData);
          
          if (!res.ok) {
            const error = await res.json().catch(() => ({ message: 'Unknown server error' }));
            throw new Error(error.message || 'Failed to create opportunity');
          }
          
          return await res.json();
        } catch (error: any) {
          lastError = error;

          // Show retry toast on non-final attempts
          if (retryCount < maxRetries - 1) {
            toast({
              title: `Retry ${retryCount + 1}/${maxRetries}`,
              description: "Connection issue - retrying submission",
              variant: "default",
            });
            
            // Wait before retrying (exponential backoff)
            await new Promise(resolve => setTimeout(resolve, Math.min(1000 * Math.pow(2, retryCount), 5000)));
          }
          
          retryCount++;
        }
      }
      
      // If we've exhausted all retries, throw the last error
      if (lastError) {
        throw lastError;
      }
      
      throw new Error('Failed to create opportunity after multiple attempts');
    },
    onSuccess: () => {
      // Refresh all related data
      queryClient.invalidateQueries({ queryKey: ['/api/opportunities'] });
      queryClient.invalidateQueries({ queryKey: ['/api/analytics'] });
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/companies'] });
      
      toast({
        title: "Success!",
        description: "Opportunity created successfully",
      });
      
      onClose();
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create opportunity",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: OpportunityFormValues) {
    createOpportunityMutation.mutate(data);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Create New Opportunity</DialogTitle>
            <Button 
              variant="ghost" 
              className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-white" 
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-gray-400">
            Create a new sales opportunity or project
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col flex-1 overflow-hidden">
            <div className="space-y-4 overflow-y-auto flex-1 pr-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Opportunity Name*</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter opportunity name" 
                      className="bg-gray-900/50 border-gray-700" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="companyId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Company</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-900/50 border-gray-700">
                          <SelectValue placeholder="Select a company" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="none">None</SelectItem>
                        {companies.map(company => (
                          <SelectItem key={company.id} value={company.id.toString()}>
                            {company.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Contact</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-900/50 border-gray-700">
                          <SelectValue placeholder="Select a contact" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="none">None</SelectItem>
                        {contacts.map(contact => (
                          <SelectItem key={contact.id} value={contact.id.toString()}>
                            {contact.firstName} {contact.lastName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Amount ($)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        placeholder="e.g. 5000" 
                        className="bg-gray-900/50 border-gray-700" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="probability"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Win Probability (%)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number"
                        min={0}
                        max={100}
                        placeholder="e.g. 50" 
                        className="bg-gray-900/50 border-gray-700" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Status</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-900/50 border-gray-700">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="expectedCloseDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-gray-300">Expected Close Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full bg-gray-900/50 border-gray-700 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-700" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the opportunity or project" 
                      className="bg-gray-900/50 border-gray-700 min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

            <DialogFooter className="pt-4 flex-shrink-0">
              <Button 
                variant="outline" 
                onClick={onClose} 
                type="button"
                disabled={createOpportunityMutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createOpportunityMutation.isPending}
              >
                {createOpportunityMutation.isPending ? "Creating..." : "Create Opportunity"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}