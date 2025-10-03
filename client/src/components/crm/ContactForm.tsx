import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export const contactFormSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters')
    .trim()
    .refine(value => /^[a-zA-Z\s\-'.]+$/.test(value), {
      message: 'First name should only contain letters, spaces, hyphens, apostrophes, and periods'
    }),
  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters')
    .trim()
    .refine(value => /^[a-zA-Z\s\-'.]+$/.test(value), {
      message: 'Last name should only contain letters, spaces, hyphens, apostrophes, and periods'
    }),
  email: z.string()
    .email('Please enter a valid email address')
    .trim()
    .toLowerCase(),
  phone: z.string()
    .optional()
    .refine(value => !value || /^[\d\+\-\(\)\s\.]{7,20}$/.test(value), {
      message: 'Please enter a valid phone number'
    }),
  jobTitle: z.string()
    .max(100, 'Job title cannot exceed 100 characters')
    .optional(),
  companyId: z.string().optional(),
  source: z.string().default('website'),
  status: z.string().default('lead'),
  notes: z.string()
    .max(500, 'Notes cannot exceed 500 characters')
    .optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  companies: Array<{ id: number; name: string }>;
}

export function ContactForm({ isOpen, onClose, companies }: ContactFormProps) {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      jobTitle: '',
      source: 'website',
      status: 'lead',
      notes: '',
    },
  });

  const { toast } = useToast();
  
  const createContactMutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      // Implement retry mechanism
      const maxRetries = 3;
      let retryCount = 0;
      let lastError: Error | null = null;
      
      while (retryCount < maxRetries) {
        try {
          const sanitizedData = {
            ...data,
            // Ensure proper data conversion
            firstName: data.firstName.trim(),
            lastName: data.lastName.trim(),
            email: data.email.trim().toLowerCase(),
            companyId: data.companyId && data.companyId !== 'none' 
              ? parseInt(data.companyId) 
              : undefined,
            // Strip any potential dangerous characters
            phone: data.phone?.replace(/[^\d\+\-\(\)\s\.]/g, ''),
            jobTitle: data.jobTitle?.trim(),
            notes: data.notes?.trim(),
          };
          
          const res = await apiRequest('POST', '/api/contacts', sanitizedData);
          
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Failed to create contact');
          }
          
          return await res.json();
        } catch (error: any) {
          lastError = error;
          retryCount++;
          
          // Only wait between retries, not after the last one
          if (retryCount < maxRetries) {
            // Exponential backoff
            await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retryCount - 1)));
          }
        }
      }
      
      // If we've exhausted all retries, throw the last error
      throw lastError || new Error('Failed to create contact after multiple attempts');
    },
    onSuccess: (data) => {
      // Invalidate queries to update data
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/analytics'] });
      
      // Show success message
      toast({
        title: "Contact Created",
        description: `Successfully created contact: ${data.firstName} ${data.lastName}`,
        variant: "default",
      });
      
      // Close modal and reset form
      onClose();
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to Create Contact",
        description: error.message || "An error occurred while creating the contact",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: ContactFormValues) {
    createContactMutation.mutate(data);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Add New Contact</DialogTitle>
            <Button 
              variant="ghost" 
              className="h-8 w-8 p-0 rounded-full" 
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription>
            Add a new contact to your CRM database
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col flex-1 overflow-hidden">
            <div className="space-y-4 overflow-y-auto flex-1 pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">First Name*</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter first name" 
                        className="bg-gray-900/50 border-gray-700" 
                        {...field} 
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Last Name*</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter last name" 
                        className="bg-gray-900/50 border-gray-700" 
                        {...field} 
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Email Address*</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="email@example.com" 
                      className="bg-gray-900/50 border-gray-700" 
                      {...field} 
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="(555) 123-4567" 
                        className="bg-gray-900/50 border-gray-700" 
                        {...field} 
                        value={field.value || ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Job Title</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. Project Manager" 
                        className="bg-gray-900/50 border-gray-700" 
                        {...field} 
                        value={field.value || ''}
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
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Lead Source</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-900/50 border-gray-700">
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-gray-900 border-gray-700">
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="social_media">Social Media</SelectItem>
                        <SelectItem value="direct">Direct</SelectItem>
                        <SelectItem value="trade_show">Trade Show</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Notes</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Add any relevant notes about this contact" 
                      className="bg-gray-900/50 border-gray-700 min-h-[100px]" 
                      {...field} 
                      value={field.value || ''}
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
                disabled={createContactMutation.isPending}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={createContactMutation.isPending}
              >
                {createContactMutation.isPending ? "Adding..." : "Add Contact"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}