import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, Clock, User, Mail, Phone, MessageSquare, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { cn } from "@/lib/utils";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time slot"),
  serviceType: z.enum([
    "Residential Solar Consultation",
    "Commercial Solar Assessment",
    "System Maintenance",
    "Battery Storage Consultation"
  ]),
  notes: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

interface BookingWidgetProps {
  className?: string;
}

export default function BookingWidget({ className }: BookingWidgetProps) {
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [confirmationData, setConfirmationData] = useState<any>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceType: "Residential Solar Consultation",
    },
  });

  const watchedDate = watch("date");
  const watchedTime = watch("time");

  // Generate next 30 days (excluding Sundays)
  const getAvailableDates = () => {
    const dates: string[] = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + i);
      
      // Skip Sundays (0 = Sunday)
      if (date.getDay() !== 0) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    
    return dates;
  };

  const availableDates = getAvailableDates();

  // Fetch available slots when date changes
  useEffect(() => {
    if (watchedDate) {
      fetchAvailableSlots(watchedDate);
    } else {
      setAvailableSlots([]);
    }
  }, [watchedDate]);

  const fetchAvailableSlots = async (date: string) => {
    setLoadingSlots(true);
    try {
      const response = await fetch(`/api/bookings/available-slots?date=${date}`);
      const data = await response.json();
      
      if (data.success) {
        setAvailableSlots(data.slots || []);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.error || "Failed to load available time slots",
        });
        setAvailableSlots([]);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load available time slots. Please try again.",
      });
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const onSubmit = async (data: BookingFormData) => {
    try {
      const response = await apiRequest('POST', '/api/bookings/create', data);
      const result = await response.json();

      if (result.success) {
        setBookingSuccess(true);
        setConfirmationData(result.appointment);
        toast({
          title: "Appointment Scheduled!",
          description: "We've sent you a confirmation email with all the details.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Booking Failed",
          description: result.error || "Failed to schedule appointment. Please try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred while booking your appointment. Please try again or call us directly.",
      });
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  if (bookingSuccess && confirmationData) {
    return (
      <div className={cn(
        "relative overflow-hidden rounded-3xl p-8 md:p-12",
        "bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90",
        "backdrop-blur-xl border border-orange-500/20",
        "shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]",
        className
      )} data-testid="booking-confirmation">
        <div className="relative z-10 text-center">
          <div className="mb-6 flex justify-center">
            <CheckCircle2 className="h-20 w-20 text-green-500" data-testid="success-icon" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4" data-testid="confirmation-title">
            Appointment Confirmed!
          </h2>
          <div className="bg-gray-800/50 rounded-xl p-6 mb-6 text-left" data-testid="appointment-details">
            <p className="text-gray-300 mb-3">
              <strong className="text-white">Service:</strong> {confirmationData.serviceType}
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-white">Date:</strong> {formatDate(confirmationData.date)}
            </p>
            <p className="text-gray-300 mb-3">
              <strong className="text-white">Time:</strong> {formatTime(confirmationData.time)}
            </p>
            <p className="text-gray-300">
              <strong className="text-white">Name:</strong> {confirmationData.name}
            </p>
          </div>
          
          <div className="space-y-3">
            {confirmationData.calendarLink && (
              <a
                href={confirmationData.calendarLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                data-testid="link-calendar"
              >
                <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                  View in Google Calendar
                </Button>
              </a>
            )}
            {confirmationData.downloadIcs && (
              <a
                href={confirmationData.downloadIcs}
                className="block"
                data-testid="link-download-ics"
              >
                <Button variant="outline" className="w-full border-orange-500/30 text-white hover:bg-green-500/10">
                  Download Calendar Invite (.ics)
                </Button>
              </a>
            )}
          </div>

          <div className="mt-8 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20" data-testid="preparation-info">
            <p className="text-sm text-blue-300">
              <strong>What to prepare:</strong> Recent utility bills, roof information, and any questions about solar energy. 
              We'll call you at {confirmationData.phone} if we need any additional information.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "relative overflow-hidden rounded-3xl p-8 md:p-12",
      "bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90",
      "backdrop-blur-xl border border-orange-500/20",
      "shadow-[0_8px_32px_0_rgba(0,0,0,0.4)]",
      className
    )} data-testid="booking-widget">
      <div className="relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
          Book Your Consultation
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="text-white mb-2 flex items-center gap-2">
              <User className="h-4 w-4" />
              Full Name
            </Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="John Doe"
              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              data-testid="input-name"
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1 flex items-center gap-1" data-testid="error-name">
                <AlertCircle className="h-3 w-3" />
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-white mb-2 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="john@example.com"
              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              data-testid="input-email"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1 flex items-center gap-1" data-testid="error-email">
                <AlertCircle className="h-3 w-3" />
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="text-white mb-2 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder="(530) 123-4567"
              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              data-testid="input-phone"
            />
            {errors.phone && (
              <p className="text-red-400 text-sm mt-1 flex items-center gap-1" data-testid="error-phone">
                <AlertCircle className="h-3 w-3" />
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Service Type */}
          <div>
            <Label htmlFor="serviceType" className="text-white mb-2">
              Service Type
            </Label>
            <Select
              onValueChange={(value) => setValue("serviceType", value as any)}
              defaultValue="Residential Solar Consultation"
            >
              <SelectTrigger 
                className="bg-gray-800/50 border-gray-700 text-white"
                data-testid="select-service-type"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Residential Solar Consultation" data-testid="service-residential">
                  Residential Solar Consultation
                </SelectItem>
                <SelectItem value="Commercial Solar Assessment" data-testid="service-commercial">
                  Commercial Solar Assessment
                </SelectItem>
                <SelectItem value="System Maintenance" data-testid="service-maintenance">
                  System Maintenance
                </SelectItem>
                <SelectItem value="Battery Storage Consultation" data-testid="service-battery">
                  Battery Storage Consultation
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div>
            <Label htmlFor="date" className="text-white mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Select Date
            </Label>
            <Select onValueChange={(value) => { setValue("date", value); setValue("time", ""); }}>
              <SelectTrigger 
                className="bg-gray-800/50 border-gray-700 text-white"
                data-testid="select-date"
              >
                <SelectValue placeholder="Choose a date" />
              </SelectTrigger>
              <SelectContent>
                {availableDates.map((date) => (
                  <SelectItem key={date} value={date} data-testid={`date-${date}`}>
                    {formatDate(date)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.date && (
              <p className="text-red-400 text-sm mt-1 flex items-center gap-1" data-testid="error-date">
                <AlertCircle className="h-3 w-3" />
                {errors.date.message}
              </p>
            )}
          </div>

          {/* Time Slots */}
          {watchedDate && (
            <div>
              <Label className="text-white mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Available Time Slots
              </Label>
              {loadingSlots ? (
                <div className="flex items-center justify-center py-8" data-testid="loading-slots">
                  <Loader2 className="h-8 w-8 animate-spin text-green-500" />
                </div>
              ) : availableSlots.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot.startTime}
                      type="button"
                      onClick={() => setValue("time", slot.startTime)}
                      className={cn(
                        "p-3 rounded-lg border-2 transition-all",
                        "hover:scale-105 active:scale-95",
                        watchedTime === slot.startTime
                          ? "bg-green-500 border-orange-500 text-white"
                          : "bg-gray-800/50 border-gray-700 text-gray-300 hover:border-orange-500/50"
                      )}
                      data-testid={`time-slot-${slot.startTime}`}
                    >
                      {formatTime(slot.startTime)}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-center py-4" data-testid="no-slots">
                  No available time slots for this date
                </p>
              )}
              {errors.time && (
                <p className="text-red-400 text-sm mt-2 flex items-center gap-1" data-testid="error-time">
                  <AlertCircle className="h-3 w-3" />
                  {errors.time.message}
                </p>
              )}
            </div>
          )}

          {/* Notes */}
          <div>
            <Label htmlFor="notes" className="text-white mb-2 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Additional Notes (Optional)
            </Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder="Any specific questions or concerns?"
              className="bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500 min-h-[100px]"
              data-testid="textarea-notes"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-semibold py-6 text-lg"
            data-testid="button-submit"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Scheduling...
              </>
            ) : (
              "Schedule Appointment"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
