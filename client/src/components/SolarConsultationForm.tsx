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
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Loader2, CheckCircle2, Sun } from 'lucide-react';

const solarFormSchema = z.object({
  customerName: z.string().min(1, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address (e.g., john@example.com)'),
  phone: z.string()
    .min(10, 'Please enter a valid phone number with at least 10 digits')
    .regex(/^[\d\s\-\(\)\+]+$/, 'Phone number can only contain numbers, spaces, and symbols like () - +'),
  address: z.string().min(1, 'Please enter your complete address'),
  propertyType: z.enum(['Residential', 'Commercial', 'Industrial', 'Agricultural', 'Marina']),
  serviceNeeded: z.enum(['New Solar Installation', 'Solar Repair', 'System Maintenance', 'Consultation']),
  currentElectricBill: z.string().optional(),
  roofType: z.string().optional(),
  roofAge: z.string().optional(),
  shadingIssues: z.enum(['Yes', 'No']).optional(),
  systemSizePreference: z.string().optional(),
  timeline: z.enum(['ASAP', '1-3 months', '3-6 months', 'Just exploring']).optional(),
  additionalNotes: z.string().optional(),
  landSizeAcres: z.string().optional(),
  primaryCrop: z.string().optional(),
  irrigationSystem: z.string().optional(),
  numberOfBarns: z.string().optional(),
  livestockOperations: z.string().optional(),
  agriculturalEnergyUsage: z.string().optional(),
  numberOfBoatSlips: z.string().optional(),
  dockLength: z.string().optional(),
  hasFuelStation: z.string().optional(),
  storageType: z.string().optional(),
  hasWaterPumping: z.string().optional(),
  marinaEnergyUsage: z.string().optional(),
  subscribeToNewsletter: z.boolean().optional(),
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
      const solarResponse = await apiRequest<any>('/api/solar-form', 'POST', data);
      
      if (data.subscribeToNewsletter) {
        try {
          await apiRequest<any>('/api/newsletter/subscribe', 'POST', {
            email: data.email,
            name: data.customerName,
            source: 'solar_consultation_form'
          });
        } catch (error) {
          console.error('Newsletter subscription error:', error);
        }
      }
      
      return solarResponse;
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
            <Label htmlFor="customerName" className="text-slate-200 font-semibold text-base">Full Name *</Label>
            <Input
              id="customerName"
              data-testid="input-customer-name"
              {...register('customerName')}
              className="mt-2 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500/50 h-12 text-base"
            />
            {errors.customerName && (
              <p className="text-sm text-red-400 mt-2 font-medium">{errors.customerName.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email" className="text-slate-200 font-semibold text-base">Email *</Label>
            <Input
              id="email"
              type="email"
              data-testid="input-email"
              {...register('email')}
              className="mt-2 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500/50 h-12 text-base"
            />
            {errors.email && (
              <p className="text-sm text-red-400 mt-2 font-medium">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="phone" className="text-slate-200 font-semibold text-base">Phone *</Label>
            <Input
              id="phone"
              data-testid="input-phone"
              {...register('phone')}
              className="mt-2 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500/50 h-12 text-base"
              placeholder="(530) 226-0701"
            />
            {errors.phone && (
              <p className="text-sm text-red-400 mt-2 font-medium">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="address" className="text-slate-200 font-semibold text-base">Property Address *</Label>
            <Input
              id="address"
              data-testid="input-address"
              {...register('address')}
              className="mt-2 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500/50 h-12 text-base"
            />
            {errors.address && (
              <p className="text-sm text-red-400 mt-2 font-medium">{errors.address.message}</p>
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
            <Label htmlFor="propertyType" className="text-slate-200 font-semibold text-base">Property Type *</Label>
            <Select
              onValueChange={(value) => setValue('propertyType', value as any)}
              defaultValue="Residential"
            >
              <SelectTrigger className="mt-2 bg-slate-800/50 border-slate-600/50 text-white focus:border-cyan-500 focus:ring-cyan-500/50 h-12 text-base" data-testid="select-property-type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="Residential" className="text-white hover:bg-slate-700">Residential</SelectItem>
                <SelectItem value="Commercial" className="text-white hover:bg-slate-700">Commercial</SelectItem>
                <SelectItem value="Industrial" className="text-white hover:bg-slate-700">Industrial</SelectItem>
                <SelectItem value="Agricultural" className="text-white hover:bg-slate-700">Agricultural</SelectItem>
                <SelectItem value="Marina" className="text-white hover:bg-slate-700">Marina</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="currentElectricBill" className="text-slate-200 font-semibold text-base">Current Monthly Electric Bill</Label>
            <Input
              id="currentElectricBill"
              data-testid="input-electric-bill"
              {...register('currentElectricBill')}
              className="mt-2 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500/50 h-12 text-base"
              placeholder="$200"
            />
          </div>
          <div>
            <Label htmlFor="roofType" className="text-slate-200 font-semibold text-base">Roof Type</Label>
            <Input
              id="roofType"
              data-testid="input-roof-type"
              {...register('roofType')}
              className="mt-2 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500/50 h-12 text-base"
              placeholder="e.g., Asphalt shingle, Metal, Tile"
            />
          </div>
          <div>
            <Label htmlFor="roofAge" className="text-slate-200 font-semibold text-base">Roof Age (years)</Label>
            <Input
              id="roofAge"
              data-testid="input-roof-age"
              {...register('roofAge')}
              className="mt-2 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500/50 h-12 text-base"
              placeholder="10"
            />
          </div>
          <div>
            <Label htmlFor="shadingIssues" className="text-slate-200 font-semibold text-base">Any Shading Issues?</Label>
            <Select
              onValueChange={(value) => setValue('shadingIssues', value as any)}
              defaultValue="No"
            >
              <SelectTrigger className="mt-2 bg-slate-800/50 border-slate-600/50 text-white focus:border-cyan-500 focus:ring-cyan-500/50 h-12 text-base" data-testid="select-shading">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="No" className="text-white hover:bg-slate-700">No</SelectItem>
                <SelectItem value="Yes" className="text-white hover:bg-slate-700">Yes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {watch('propertyType') === 'Agricultural' && (
            <>
              <div className="pt-4 border-t border-slate-600/50">
                <h4 className="text-lg font-semibold mb-4 text-white">Agricultural Property Details</h4>
              </div>
              <div>
                <Label htmlFor="landSizeAcres" className="text-slate-200 font-semibold text-base">Land Size (acres)</Label>
                <Input
                  id="landSizeAcres"
                  type="number"
                  data-testid="input-land-size"
                  {...register('landSizeAcres')}
                  className="mt-2 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500/50 h-12 text-base"
                  placeholder="100"
                />
              </div>
              <div>
                <Label htmlFor="primaryCrop" className="text-slate-200 font-semibold text-base">Primary Crop/Use</Label>
                <Input
                  id="primaryCrop"
                  data-testid="input-primary-crop"
                  {...register('primaryCrop')}
                  className="mt-2 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500/50 h-12 text-base"
                  placeholder="e.g., Vineyards, Row crops, Dairy"
                />
              </div>
              <div>
                <Label htmlFor="irrigationSystem" className="text-slate-200 font-semibold text-base">Irrigation System</Label>
                <Select
                  onValueChange={(value) => setValue('irrigationSystem', value)}
                >
                  <SelectTrigger className="mt-2 bg-slate-800/50 border-slate-600/50 text-white focus:border-cyan-500 focus:ring-cyan-500/50 h-12 text-base" data-testid="select-irrigation">
                    <SelectValue placeholder="Select irrigation system" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="None" className="text-white hover:bg-slate-700">None</SelectItem>
                    <SelectItem value="Drip" className="text-white hover:bg-slate-700">Drip</SelectItem>
                    <SelectItem value="Sprinkler" className="text-white hover:bg-slate-700">Sprinkler</SelectItem>
                    <SelectItem value="Flood" className="text-white hover:bg-slate-700">Flood</SelectItem>
                    <SelectItem value="Other" className="text-white hover:bg-slate-700">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="numberOfBarns" className="text-slate-200 font-semibold text-base">Number of Barns/Outbuildings</Label>
                <Input
                  id="numberOfBarns"
                  type="number"
                  data-testid="input-barns"
                  {...register('numberOfBarns')}
                  className="mt-2 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500/50 h-12 text-base"
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="livestockOperations" className="text-slate-200 font-semibold text-base">Livestock Operations</Label>
                <Select
                  onValueChange={(value) => setValue('livestockOperations', value)}
                >
                  <SelectTrigger className="mt-2 bg-slate-800/50 border-slate-600/50 text-white focus:border-cyan-500 focus:ring-cyan-500/50 h-12 text-base" data-testid="select-livestock">
                    <SelectValue placeholder="Select livestock operations" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="None" className="text-white hover:bg-slate-700">None</SelectItem>
                    <SelectItem value="Cattle" className="text-white hover:bg-slate-700">Cattle</SelectItem>
                    <SelectItem value="Poultry" className="text-white hover:bg-slate-700">Poultry</SelectItem>
                    <SelectItem value="Dairy" className="text-white hover:bg-slate-700">Dairy</SelectItem>
                    <SelectItem value="Other" className="text-white hover:bg-slate-700">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="agriculturalEnergyUsage" className="text-slate-200 font-semibold text-base">Current Agricultural Energy Usage (kWh/month)</Label>
                <Input
                  id="agriculturalEnergyUsage"
                  type="number"
                  data-testid="input-ag-energy"
                  {...register('agriculturalEnergyUsage')}
                  className="mt-2 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500/50 h-12 text-base"
                  placeholder="5000"
                />
              </div>
            </>
          )}

          {watch('propertyType') === 'Marina' && (
            <>
              <div className="pt-4 border-t border-slate-600/50">
                <h4 className="text-lg font-semibold mb-4 text-white">Marina Property Details</h4>
              </div>
              <div>
                <Label htmlFor="numberOfBoatSlips" className="text-slate-200 font-semibold text-base">Number of Boat Slips</Label>
                <Input
                  id="numberOfBoatSlips"
                  type="number"
                  data-testid="input-boat-slips"
                  {...register('numberOfBoatSlips')}
                  className="mt-2 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500/50 h-12 text-base"
                  placeholder="50"
                />
              </div>
              <div>
                <Label htmlFor="dockLength" className="text-slate-200 font-semibold text-base">Dock/Pier Length (feet)</Label>
                <Input
                  id="dockLength"
                  type="number"
                  data-testid="input-dock-length"
                  {...register('dockLength')}
                  className="mt-2 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500/50 h-12 text-base"
                  placeholder="500"
                />
              </div>
              <div>
                <Label htmlFor="hasFuelStation" className="text-slate-200 font-semibold text-base">Fuel Station</Label>
                <Select
                  onValueChange={(value) => setValue('hasFuelStation', value)}
                >
                  <SelectTrigger className="mt-2 bg-slate-800/50 border-slate-600/50 text-white focus:border-cyan-500 focus:ring-cyan-500/50 h-12 text-base" data-testid="select-fuel-station">
                    <SelectValue placeholder="Select fuel station availability" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="Yes" className="text-white hover:bg-slate-700">Yes</SelectItem>
                    <SelectItem value="No" className="text-white hover:bg-slate-700">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="storageType" className="text-slate-200 font-semibold text-base">Storage Type</Label>
                <Select
                  onValueChange={(value) => setValue('storageType', value)}
                >
                  <SelectTrigger className="mt-2 bg-slate-800/50 border-slate-600/50 text-white focus:border-cyan-500 focus:ring-cyan-500/50 h-12 text-base" data-testid="select-storage-type">
                    <SelectValue placeholder="Select storage type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="Indoor" className="text-white hover:bg-slate-700">Indoor</SelectItem>
                    <SelectItem value="Outdoor" className="text-white hover:bg-slate-700">Outdoor</SelectItem>
                    <SelectItem value="Both" className="text-white hover:bg-slate-700">Both</SelectItem>
                    <SelectItem value="None" className="text-white hover:bg-slate-700">None</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="hasWaterPumping" className="text-slate-200 font-semibold text-base">Water Pumping Systems</Label>
                <Select
                  onValueChange={(value) => setValue('hasWaterPumping', value)}
                >
                  <SelectTrigger className="mt-2 bg-slate-800/50 border-slate-600/50 text-white focus:border-cyan-500 focus:ring-cyan-500/50 h-12 text-base" data-testid="select-water-pumping">
                    <SelectValue placeholder="Select water pumping availability" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600">
                    <SelectItem value="Yes" className="text-white hover:bg-slate-700">Yes</SelectItem>
                    <SelectItem value="No" className="text-white hover:bg-slate-700">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="marinaEnergyUsage" className="text-slate-200 font-semibold text-base">Current Marina Energy Usage (kWh/month)</Label>
                <Input
                  id="marinaEnergyUsage"
                  type="number"
                  data-testid="input-marina-energy"
                  {...register('marinaEnergyUsage')}
                  className="mt-2 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500/50 h-12 text-base"
                  placeholder="10000"
                />
              </div>
            </>
          )}
        </div>
      ),
    },
    {
      title: 'Service Requirements',
      icon: '⚡',
      fields: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="serviceNeeded" className="text-slate-200 font-semibold text-base">Service Needed *</Label>
            <Select
              onValueChange={(value) => setValue('serviceNeeded', value as any)}
              defaultValue="New Solar Installation"
            >
              <SelectTrigger className="mt-2 bg-slate-800/50 border-slate-600/50 text-white focus:border-cyan-500 focus:ring-cyan-500/50 h-12 text-base" data-testid="select-service">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="New Solar Installation" className="text-white hover:bg-slate-700">New Solar Installation</SelectItem>
                <SelectItem value="Solar Repair" className="text-white hover:bg-slate-700">Solar Repair</SelectItem>
                <SelectItem value="System Maintenance" className="text-white hover:bg-slate-700">System Maintenance</SelectItem>
                <SelectItem value="Consultation" className="text-white hover:bg-slate-700">Consultation</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="systemSizePreference" className="text-slate-200 font-semibold text-base">System Size Preference</Label>
            <Input
              id="systemSizePreference"
              data-testid="input-system-size"
              {...register('systemSizePreference')}
              className="mt-2 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500/50 h-12 text-base"
              placeholder="e.g., 5kW, 10kW, Don't know"
            />
          </div>
          <div>
            <Label htmlFor="timeline" className="text-slate-200 font-semibold text-base">Project Timeline</Label>
            <Select
              onValueChange={(value) => setValue('timeline', value as any)}
              defaultValue="Just exploring"
            >
              <SelectTrigger className="mt-2 bg-slate-800/50 border-slate-600/50 text-white focus:border-cyan-500 focus:ring-cyan-500/50 h-12 text-base" data-testid="select-timeline">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                <SelectItem value="ASAP" className="text-white hover:bg-slate-700">ASAP</SelectItem>
                <SelectItem value="1-3 months" className="text-white hover:bg-slate-700">1-3 months</SelectItem>
                <SelectItem value="3-6 months" className="text-white hover:bg-slate-700">3-6 months</SelectItem>
                <SelectItem value="Just exploring" className="text-white hover:bg-slate-700">Just exploring</SelectItem>
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
            <Label htmlFor="additionalNotes" className="text-slate-200 font-semibold text-base">Additional Notes or Questions</Label>
            <Textarea
              id="additionalNotes"
              data-testid="textarea-notes"
              {...register('additionalNotes')}
              className="mt-2 bg-slate-800/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500/50 text-base min-h-32"
              placeholder="Tell us more about your solar energy needs..."
            />
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Checkbox
              id="subscribeToNewsletter"
              data-testid="checkbox-newsletter"
              onCheckedChange={(checked) => setValue('subscribeToNewsletter', checked as boolean)}
            />
            <Label
              htmlFor="subscribeToNewsletter"
              className="text-slate-200 text-sm font-normal cursor-pointer"
            >
              Subscribe to our newsletter for solar tips and updates
            </Label>
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
    <div className="max-w-3xl mx-auto">
      {/* Ultra-Premium Header */}
      <div className="mb-10 text-center">
        <div 
          className="inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 relative"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2))',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            boxShadow: '0 0 40px rgba(59, 130, 246, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)'
          }}
        >
          <Sun className="w-10 h-10 text-cyan-400" />
        </div>
        <h2 className="text-4xl font-bold mb-3 text-white">
          Solar Consultation Request
        </h2>
        <p className="text-slate-300 text-lg">
          Get a free consultation from our solar experts
        </p>
      </div>

      {/* Premium Progress Indicator */}
      <div className="mb-10">
        <div className="flex justify-between mb-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`flex-1 text-center transition-all duration-300 ${
                index === currentSection
                  ? 'text-cyan-400 scale-110'
                  : index < currentSection
                  ? 'text-green-400'
                  : 'text-slate-500'
              }`}
            >
              <div className="text-3xl mb-2 transform transition-transform">{section.icon}</div>
              <div className="text-xs font-semibold hidden sm:block uppercase tracking-wider">{section.title}</div>
            </div>
          ))}
        </div>
        <div 
          className="h-3 rounded-full overflow-hidden relative"
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(148, 163, 184, 0.2)'
          }}
        >
          <div
            className="h-full transition-all duration-500 ease-out relative"
            style={{ 
              width: `${((currentSection + 1) / sections.length) * 100}%`,
              background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
              boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)'
            }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Ultra-Premium Current Section */}
        <div 
          className="rounded-2xl p-8 relative overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.6))',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(148, 163, 184, 0.2)',
            boxShadow: `
              0 0 0 1px rgba(255, 255, 255, 0.1) inset,
              0 20px 40px -12px rgba(0, 0, 0, 0.3)
            `
          }}
        >
          <h3 className="text-2xl font-bold mb-8 text-white flex items-center gap-3">
            <span className="text-3xl">{sections[currentSection].icon}</span>
            {sections[currentSection].title}
          </h3>
          {sections[currentSection].fields}
        </div>

        {/* Premium Navigation Buttons */}
        <div className="flex justify-between gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            data-testid="button-previous"
            className="px-8 py-6 text-lg font-semibold transition-all duration-300"
            style={{
              background: 'rgba(30, 41, 59, 0.6)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(148, 163, 184, 0.3)',
              color: 'white'
            }}
          >
            Previous
          </Button>
          {currentSection < sections.length - 1 ? (
            <Button
              type="button"
              onClick={() => setCurrentSection(currentSection + 1)}
              className="px-8 py-6 text-lg font-bold text-white transition-all duration-300 hover:scale-105"
              data-testid="button-next"
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              Next →
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={submitMutation.isPending}
              className="px-8 py-6 text-lg font-bold text-white transition-all duration-300 hover:scale-105"
              data-testid="button-submit"
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                boxShadow: '0 0 30px rgba(16, 185, 129, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              {submitMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Request ✓'
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
