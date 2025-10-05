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
import { X, CalendarIcon, Clock } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const formatDate = (date: Date) => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  return date.toLocaleString('en-US', options);
};
import { cn } from "@/lib/utils";
import { useToast } from '@/hooks/use-toast';

export const activityFormSchema = z.object({
  type: z.string()
    .min(1, 'Activity type is required')
    .refine(value => ['call', 'meeting', 'email', 'note', 'task', 'follow_up'].includes(value), {
      message: 'Please select a valid activity type'
    }),
  subject: z.string()
    .min(2, 'Subject must be at least 2 characters')
    .max(100, 'Subject cannot exceed 100 characters')
    .trim()
    .refine(value => value.length > 0, {
      message: 'Subject is required'
    }),
  details: z.string()
    .max(1000, 'Details cannot exceed 1000 characters')
    .optional()
    .nullable()
    .transform(val => val === '' ? null : val),
  contactId: z.string()
    .optional()
    .nullable()
    .transform(val => val === '' ? null : val),
  companyId: z.string()
    .optional()
    .nullable()
    .transform(val => val === '' ? null : val),
  opportunityId: z.string()
    .optional()
    .nullable()
    .transform(val => val === '' ? null : val),
  scheduledAt: z.date()
    .optional()
    .nullable(),
  duration: z.preprocess(
    val => val === '' ? null : val,
    z.coerce.number()
      .min(1, 'Duration must be at least 1 minute')
      .max(1440, 'Duration cannot exceed 24 hours (1440 minutes)')
      .nullable()
      .optional()
  ),
});

type ActivityFormValues = z.infer<typeof activityFormSchema>;

interface ActivityFormProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: Array<{ id: number; firstName: string; lastName: string }>;
  companies: Array<{ id: number; name: string }>;
  opportunities: Array<{ id: number; name: string }>;
}

export function ActivityForm({ isOpen, onClose, contacts, companies, opportunities }: ActivityFormProps) {
  const form = useForm<ActivityFormValues>({
    resolver: zodResolver(activityFormSchema),
    defaultValues: {
      type: 'call',
      subject: '',
      details: '',
      duration: 30,
    },
  });

  const { toast } = useToast();
  
  const createActivityMutation = useMutation({
    mutationFn: async (data: ActivityFormValues) => {
      // Implement retry mechanism
      const maxRetries = 3;
      let retryCount = 0;
      let lastError: Error | null = null;
      
      while (retryCount < maxRetries) {
        try {
          // Carefully sanitize and prepare the data
          const formattedData = {
            ...data,
            subject: data.subject.trim(),
            // Safely convert string IDs to numbers, handling null/undefined
            contactId: data.contactId && data.contactId !== 'none' 
              ? parseInt(data.contactId) 
              : undefined,
            companyId: data.companyId && data.companyId !== 'none' 
              ? parseInt(data.companyId) 
              : undefined,
            opportunityId: data.opportunityId && data.opportunityId !== 'none' 
              ? parseInt(data.opportunityId) 
              : undefined,
            // Sanitize text fields
            details: data.details?.trim(),
          };
          
          const res = await apiRequest('POST', '/api/activities', formattedData);
          
          if (!res.ok) {
            const error = await res.json().catch(() => ({ message: 'Unknown server error' }));
            throw new Error(error.message || 'Failed to create activity');
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
      
      throw new Error('Failed to create activity after multiple attempts');
    },
    onSuccess: () => {
      // Refresh all related data
      queryClient.invalidateQueries({ queryKey: ['/api/activities'] });
      queryClient.invalidateQueries({ queryKey: ['/api/analytics'] });
      // Also refresh related entities that might be affected
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/companies'] });
      queryClient.invalidateQueries({ queryKey: ['/api/opportunities'] });
      
      toast({
        title: "Success!",
        description: "Activity created successfully",
      });
      
      onClose();
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create activity",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: ActivityFormValues) {
    createActivityMutation.mutate(data);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Schedule Activity</DialogTitle>
            <Button 
              variant="ghost" 
              className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-white" 
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-gray-400">
            Schedule a new activity or interaction
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col flex-1 overflow-hidden">
            <div className="space-y-4 overflow-y-auto flex-1 pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Activity Type*</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-900/50 border-gray-700">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="call">Call</SelectItem>
                        <SelectItem value="meeting">Meeting</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="note">Note</SelectItem>
                        <SelectItem value="task">Task</SelectItem>
                        <SelectItem value="follow_up">Follow Up</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="scheduledAt"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-gray-300">Date & Time</FormLabel>
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
                              formatDate(field.value)
                            ) : (
                              <span>Select date and time</span>
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
                          initialFocus
                        />
                        {/* Time picker would be added here in a real implementation */}
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Subject*</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter subject" 
                      className="bg-gray-900/50 border-gray-700" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                          <SelectValue placeholder="Select contact" />
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
                          <SelectValue placeholder="Select company" />
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
                name="opportunityId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Opportunity</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-900/50 border-gray-700">
                          <SelectValue placeholder="Select opportunity" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="none">None</SelectItem>
                        {opportunities.map(opportunity => (
                          <SelectItem key={opportunity.id} value={opportunity.id.toString()}>
                            {opportunity.name}
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
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Duration (minutes)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          type="number"
                          min={1}
                          placeholder="30" 
                          className="bg-gray-900/50 border-gray-700 pl-10" 
                          {...field} 
                        />
                        <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Details</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter activity details" 
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
                disabled={createActivityMutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createActivityMutation.isPending}
              >
                {createActivityMutation.isPending ? "Scheduling..." : "Schedule Activity"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}