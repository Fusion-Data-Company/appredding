import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle2, Sun } from 'lucide-react';

const solarFormSchema = z.object({
  customerName: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  address: z.string().min(1, 'Address is required'),
  propertyType: z.enum(['Residential', 'Commercial', 'Industrial']),
  serviceNeeded: z.enum(['New Solar Installation', 'Solar Repair', 'System Maintenance', 'Consultation']),
  currentElectricBill: z.string().optional(),
  roofType: z.string().optional(),
  roofAge: z.string().optional(),
  shadingIssues: z.enum(['Yes', 'No']).optional(),
  systemSizePreference: z.string().optional(),
  timeline: z.enum(['ASAP', '1-3 months', '3-6 months', 'Just exploring']).optional(),
  additionalNotes: z.string().optional(),
});

type SolarFormValues = z.infer<typeof solarFormSchema>;

interface SolarConsultationFormProps {
  onSuccess?: () => void;
}

export default function SolarConsultationForm({ onSuccess }: SolarConsultationFormProps) {
  const { toast } = useToast();
  const [currentSection, setCurrentSection] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<SolarFormValues>({
    resolver: zodResolver(solarFormSchema),
    defaultValues: {
      propertyType: 'Residential',
      serviceNeeded: 'New Solar Installation',
      shadingIssues: 'No',
      timeline: 'Just exploring'
    }
  });

  const submitMutation = useMutation({
    mutationFn: async (data: SolarFormValues) => {
      return await apiRequest('/api/solar-form', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      });
    },
    onSuccess: () => {
      setIsSubmitted(true);
      toast({
        title: 'Success!',
        description: 'Your solar consultation request has been submitted. We\'ll contact you soon!',
      });
      onSuccess?.();
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message || 'Failed to submit form. Please try again.',
        variant: 'destructive',
      });
    },
  });

  const onSubmit = (data: SolarFormValues) => {
    submitMutation.mutate(data);
  };

  const sections = [
    {
      title: 'Contact Information',
      icon: '👤',
      fields: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="customerName">Full Name *</Label>
            <Input
              id="customerName"
              data-testid="input-customer-name"
              {...register('customerName')}
              className="mt-1"
            />
            {errors.customerName && (
              <p className="text-sm text-red-500 mt-1">{errors.customerName.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              data-testid="input-email"
              {...register('email')}
              className="mt-1"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="phone">Phone *</Label>
            <Input
              id="phone"
              data-testid="input-phone"
              {...register('phone')}
              className="mt-1"
              placeholder="(530) 226-0701"
            />
            {errors.phone && (
              <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="address">Property Address *</Label>
            <Input
              id="address"
              data-testid="input-address"
              {...register('address')}
              className="mt-1"
            />
            {errors.address && (
              <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>
            )}
          </div>
        </div>
      ),
    },
    {
      title: 'Property Details',
      icon: '🏠',
      fields: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="propertyType">Property Type *</Label>
            <Select
              onValueChange={(value) => setValue('propertyType', value as any)}
              defaultValue="Residential"
            >
              <SelectTrigger className="mt-1" data-testid="select-property-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Residential">Residential</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
                <SelectItem value="Industrial">Industrial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="currentElectricBill">Current Monthly Electric Bill</Label>
            <Input
              id="currentElectricBill"
              data-testid="input-electric-bill"
              {...register('currentElectricBill')}
              className="mt-1"
              placeholder="$200"
            />
          </div>
          <div>
            <Label htmlFor="roofType">Roof Type</Label>
            <Input
              id="roofType"
              data-testid="input-roof-type"
              {...register('roofType')}
              className="mt-1"
              placeholder="e.g., Asphalt shingle, Metal, Tile"
            />
          </div>
          <div>
            <Label htmlFor="roofAge">Roof Age (years)</Label>
            <Input
              id="roofAge"
              data-testid="input-roof-age"
              {...register('roofAge')}
              className="mt-1"
              placeholder="10"
            />
          </div>
          <div>
            <Label htmlFor="shadingIssues">Any Shading Issues?</Label>
            <Select
              onValueChange={(value) => setValue('shadingIssues', value as any)}
              defaultValue="No"
            >
              <SelectTrigger className="mt-1" data-testid="select-shading">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="No">No</SelectItem>
                <SelectItem value="Yes">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    },
    {
      title: 'Service Requirements',
      icon: '⚡',
      fields: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="serviceNeeded">Service Needed *</Label>
            <Select
              onValueChange={(value) => setValue('serviceNeeded', value as any)}
              defaultValue="New Solar Installation"
            >
              <SelectTrigger className="mt-1" data-testid="select-service">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="New Solar Installation">New Solar Installation</SelectItem>
                <SelectItem value="Solar Repair">Solar Repair</SelectItem>
                <SelectItem value="System Maintenance">System Maintenance</SelectItem>
                <SelectItem value="Consultation">Consultation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="systemSizePreference">System Size Preference</Label>
            <Input
              id="systemSizePreference"
              data-testid="input-system-size"
              {...register('systemSizePreference')}
              className="mt-1"
              placeholder="e.g., 5kW, 10kW, Don't know"
            />
          </div>
          <div>
            <Label htmlFor="timeline">Project Timeline</Label>
            <Select
              onValueChange={(value) => setValue('timeline', value as any)}
              defaultValue="Just exploring"
            >
              <SelectTrigger className="mt-1" data-testid="select-timeline">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ASAP">ASAP</SelectItem>
                <SelectItem value="1-3 months">1-3 months</SelectItem>
                <SelectItem value="3-6 months">3-6 months</SelectItem>
                <SelectItem value="Just exploring">Just exploring</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    },
    {
      title: 'Additional Information',
      icon: '📝',
      fields: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="additionalNotes">Additional Notes or Questions</Label>
            <Textarea
              id="additionalNotes"
              data-testid="textarea-notes"
              {...register('additionalNotes')}
              className="mt-1 min-h-32"
              placeholder="Tell us more about your solar energy needs..."
            />
          </div>
        </div>
      ),
    },
  ];

  if (isSubmitted) {
    return (
      <div className="text-center py-12">
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Thank You!</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
          Your solar consultation request has been submitted successfully. Our team will review your information and contact you within 24 hours.
        </p>
        <Button 
          onClick={() => {
            setIsSubmitted(false);
            setCurrentSection(0);
          }}
          className="bg-gradient-to-r from-blue-600 to-cyan-600"
          data-testid="button-submit-another"
        >
          Submit Another Request
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mb-4">
          <Sun className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Solar Consultation Request
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Get a free consultation from our solar experts
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`flex-1 text-center transition-all ${
                index === currentSection
                  ? 'text-blue-600 dark:text-blue-400'
                  : index < currentSection
                  ? 'text-green-600 dark:text-green-400'
                  : 'text-gray-400 dark:text-gray-600'
              }`}
            >
              <div className="text-2xl mb-1">{section.icon}</div>
              <div className="text-xs font-medium hidden sm:block">{section.title}</div>
            </div>
          ))}
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-cyan-600 transition-all duration-300"
            style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Current Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            {sections[currentSection].title}
          </h3>
          {sections[currentSection].fields}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            data-testid="button-previous"
          >
            Previous
          </Button>
          {currentSection < sections.length - 1 ? (
            <Button
              type="button"
              onClick={() => setCurrentSection(currentSection + 1)}
              className="bg-gradient-to-r from-blue-600 to-cyan-600"
              data-testid="button-next"
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={submitMutation.isPending}
              className="bg-gradient-to-r from-green-600 to-emerald-600"
              data-testid="button-submit"
            >
              {submitMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Request'
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
