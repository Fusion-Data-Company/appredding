import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PraetorianButton } from '@/components/ui/praetorian-button';
import { X } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

export const companyFormSchema = z.object({
  name: z.string()
    .min(2, 'Company name must be at least 2 characters')
    .max(100, 'Company name cannot exceed 100 characters')
    .trim()
    .refine(value => value.length > 0, {
      message: 'Company name is required'
    }),
  industry: z.string()
    .max(50, 'Industry cannot exceed 50 characters')
    .optional()
    .nullable()
    .transform(val => val === '' ? null : val),
  website: z.string()
    .max(200, 'Website URL cannot exceed 200 characters')
    .optional()
    .nullable()
    .transform(val => val === '' ? null : val)
    .refine(value => !value || /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(value), {
      message: 'Please enter a valid website URL'
    }),
  phone: z.string()
    .max(20, 'Phone number cannot exceed 20 characters')
    .optional()
    .nullable()
    .transform(val => val === '' ? null : val)
    .refine(value => !value || /^[\d\+\-\(\)\s\.]{7,20}$/.test(value), {
      message: 'Please enter a valid phone number'
    }),
  address: z.string()
    .max(200, 'Address cannot exceed 200 characters')
    .optional()
    .nullable()
    .transform(val => val === '' ? null : val),
  city: z.string()
    .max(100, 'City cannot exceed 100 characters')
    .optional()
    .nullable()
    .transform(val => val === '' ? null : val),
  state: z.string()
    .max(50, 'State cannot exceed 50 characters')
    .optional()
    .nullable()
    .transform(val => val === '' ? null : val),
  zipCode: z.string()
    .max(20, 'ZIP/Postal code cannot exceed 20 characters')
    .optional()
    .nullable()
    .transform(val => val === '' ? null : val)
    .refine(value => !value || /^[a-zA-Z0-9\s\-]{3,10}$/.test(value), {
      message: 'Please enter a valid ZIP/Postal code'
    }),
  country: z.string()
    .max(100, 'Country cannot exceed 100 characters')
    .optional()
    .nullable()
    .transform(val => val === '' ? null : val),
  description: z.string()
    .max(1000, 'Description cannot exceed 1000 characters')
    .optional()
    .nullable()
    .transform(val => val === '' ? null : val),
  employeeCount: z.coerce.number()
    .int('Employee count must be a whole number')
    .positive('Employee count must be positive')
    .optional()
    .nullable()
    .refine(val => !val || (val >= 0 && val <= 1000000), {
      message: 'Employee count must be between 0 and 1,000,000'
    }),
  notes: z.string()
    .max(1000, 'Notes cannot exceed 1000 characters')
    .optional()
    .nullable()
    .transform(val => val === '' ? null : val),
});

type CompanyFormValues = z.infer<typeof companyFormSchema>;

interface CompanyFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CompanyForm({ isOpen, onClose }: CompanyFormProps) {
  const { toast } = useToast();
  
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      name: '',
      industry: '',
      website: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      description: '',
      employeeCount: undefined,
      notes: '',
    },
  });

  // Helper function to sanitize form data before submission
  const sanitizeFormData = (data: CompanyFormValues): CompanyFormValues => {
    return {
      ...data,
      // Ensure empty strings are properly converted to null
      industry: data.industry || null,
      website: data.website || null,
      phone: data.phone || null,
      address: data.address || null,
      city: data.city || null,
      state: data.state || null,
      zipCode: data.zipCode || null,
      country: data.country || null,
      description: data.description || null,
      employeeCount: typeof data.employeeCount === 'number' ? data.employeeCount : null,
      notes: data.notes || null,
    };
  };

  const createCompanyMutation = useMutation({
    mutationFn: async (data: CompanyFormValues) => {
      const sanitizedData = sanitizeFormData(data);
      
      // Setup retry mechanism
      let attempts = 0;
      const maxAttempts = 3;
      let success = false;
      let lastError;

      while (attempts < maxAttempts && !success) {
        try {
          attempts++;
          const res = await apiRequest('POST', '/api/companies', sanitizedData);
          
          if (!res.ok) {
            const errorData = await res.json().catch(() => ({ message: 'Unknown error occurred' }));
            throw new Error(errorData.message || `Failed to create company (Attempt ${attempts}/${maxAttempts})`);
          }
          
          success = true;
          return res.json();
        } catch (err) {
          lastError = err;
          if (attempts >= maxAttempts) {
            throw err;
          }
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempts - 1)));
        }
      }
      
      throw lastError || new Error('Failed to create company after multiple attempts');
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['/api/companies'] });
      queryClient.invalidateQueries({ queryKey: ['/api/analytics'] });
      
      toast({
        title: "Company created",
        description: `${data.name} has been successfully added to your CRM.`,
        variant: "default",
      });
      
      onClose();
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create company",
        description: error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    }
  });

  function onSubmit(data: CompanyFormValues) {
    // Validate before submission
    const validationResult = companyFormSchema.safeParse(data);
    if (!validationResult.success) {
      const errors = validationResult.error.flatten().fieldErrors;
      const errorFields = Object.keys(errors);
      
      toast({
        title: "Validation Failed",
        description: `Please check the following fields: ${errorFields.join(', ')}`,
        variant: "destructive",
      });
      
      return;
    }
    
    createCompanyMutation.mutate(data);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="card-premium sm:max-w-[600px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="gradient-text-purple">Add New Company</DialogTitle>
            <Button 
              variant="ghost" 
              className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-white" 
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-gray-400">
            Add a new company to your CRM database
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Company Name*</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter company name" 
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
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Industry</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="e.g. Construction" 
                        className="bg-gray-900/50 border-gray-700" 
                        {...field} 
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Website</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com" 
                        className="bg-gray-900/50 border-gray-700" 
                        {...field} 
                        value={field.value ?? ''}
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Phone Number</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="(555) 123-4567" 
                        className="bg-gray-900/50 border-gray-700" 
                        {...field} 
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="employeeCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Number of Employees</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="e.g. 100" 
                        className="bg-gray-900/50 border-gray-700" 
                        {...field} 
                        value={field.value === null ? '' : field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Address</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Enter street address" 
                      className="bg-gray-900/50 border-gray-700" 
                      {...field} 
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">City</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="City" 
                        className="bg-gray-900/50 border-gray-700" 
                        {...field} 
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">State</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="State" 
                        className="bg-gray-900/50 border-gray-700" 
                        {...field} 
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Zip/Postal Code</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Zip code" 
                        className="bg-gray-900/50 border-gray-700" 
                        {...field} 
                        value={field.value ?? ''}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Country</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Country" 
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Brief description of the company" 
                      className="bg-gray-900/50 border-gray-700 min-h-[100px]" 
                      {...field} 
                      value={field.value ?? ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button 
                variant="outline" 
                onClick={onClose} 
                disabled={createCompanyMutation.isPending}
              >
                Cancel
              </Button>
              <PraetorianButton 
                variant="water" 
                type="submit" 
                isLoading={createCompanyMutation.isPending}
              >
                Add Company
              </PraetorianButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}