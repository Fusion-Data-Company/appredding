import { Router } from "express";
import { z } from "zod";
import { getAvailableSlots, createAppointment, getAuthMode } from "../services/calendarService";

const router = Router();

// Validation schema for booking creation
const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Invalid time format"),
  serviceType: z.enum([
    "Residential Solar Consultation",
    "Commercial Solar Assessment",
    "System Maintenance",
    "Battery Storage Consultation"
  ]),
  notes: z.string().optional(),
});

// GET /api/bookings/available-slots?date=YYYY-MM-DD
router.get("/available-slots", async (req, res) => {
  try {
    const { date } = req.query;

    if (!date || typeof date !== 'string') {
      return res.status(400).json({ 
        success: false, 
        error: "Date parameter is required in YYYY-MM-DD format" 
      });
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return res.status(400).json({ 
        success: false, 
        error: "Invalid date format. Use YYYY-MM-DD" 
      });
    }

    // Check if date is in the future
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return res.status(400).json({ 
        success: false, 
        error: "Cannot book appointments in the past" 
      });
    }

    // Check if date is within next 30 days
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    
    if (selectedDate > maxDate) {
      return res.status(400).json({ 
        success: false, 
        error: "Can only book appointments within the next 30 days" 
      });
    }

    // Get available slots from calendar service
    const slots = await getAvailableSlots(date);

    res.json({ 
      success: true, 
      date,
      slots: slots.filter(slot => slot.available) // Only return available slots
    });
  } catch (error) {
    console.error('Error fetching available slots:', error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to fetch available time slots. Please try again." 
    });
  }
});

// POST /api/bookings/create
router.post("/create", async (req, res) => {
  try {
    // Validate request body
    const validationResult = bookingSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({ 
        success: false, 
        error: "Validation error", 
        details: validationResult.error.errors 
      });
    }

    const bookingData = validationResult.data;

    // Double-check slot availability before booking
    const availableSlots = await getAvailableSlots(bookingData.date);
    const requestedSlot = availableSlots.find(
      slot => slot.startTime === bookingData.time && slot.available
    );

    if (!requestedSlot) {
      return res.status(409).json({ 
        success: false, 
        error: "This time slot is no longer available. Please choose another time." 
      });
    }

    // Create the appointment
    const appointment = await createAppointment({
      name: bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      date: bookingData.date,
      time: bookingData.time,
      serviceType: bookingData.serviceType,
      notes: bookingData.notes,
    });

    res.json({ 
      success: true, 
      message: "Your appointment has been successfully scheduled!",
      appointment: {
        ...bookingData,
        eventId: appointment.eventId,
        calendarLink: appointment.htmlLink,
        meetingLink: appointment.hangoutLink,
        downloadIcs: appointment.icsLink,
      }
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    
    // Check for specific error types
    if (error instanceof Error && error.message.includes('not connected')) {
      return res.status(503).json({ 
        success: false, 
        error: "Calendar service is currently unavailable. Please try again later or call us directly." 
      });
    }

    res.status(500).json({ 
      success: false, 
      error: "Failed to create appointment. Please try again or contact us directly." 
    });
  }
});

router.get("/auth-status", async (req, res) => {
  const mode = getAuthMode();
  
  const statusInfo = {
    authMode: mode,
    production: process.env.NODE_ENV === 'production',
    environment: process.env.NODE_ENV || 'development',
    capabilities: {
      replit: !!process.env.REPLIT_CONNECTORS_HOSTNAME,
      oauth: !!(process.env.GOOGLE_CALENDAR_CLIENT_ID && process.env.GOOGLE_CALENDAR_CLIENT_SECRET),
      serviceAccount: !!process.env.GOOGLE_CALENDAR_SERVICE_ACCOUNT,
    },
    status: mode === 'mock' ? 'warning' : 'ok',
    message: mode === 'mock' 
      ? 'Running in MOCK mode - appointments will not be saved to real calendar'
      : `Calendar integration active using ${mode} authentication`,
  };

  res.json(statusInfo);
});

export default router;
