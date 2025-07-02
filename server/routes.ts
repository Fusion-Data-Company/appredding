import { Router } from "express";
import { storage } from "./storage";
import { z } from "zod";
import multer from "multer";
import { parse } from "csv-parse/sync";
import crmRoutes from "./routes/crm";
import monitoringRoutes from "./routes/monitoring";

// Configure multer for file uploads
const upload = multer({ 
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed'));
    }
  }
});

const router = Router();

// Add monitoring routes first
router.use(monitoringRoutes);

// Universal form submission schema - handles ALL website forms
const universalFormSchema = z.object({
  formType: z.string().min(1, "Form type is required"),
  sourcePage: z.string().min(1, "Source page is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  company: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  message: z.string().optional(),
  interestedServices: z.array(z.string()).optional(),
  propertyType: z.string().optional(),
  propertySize: z.string().optional(),
  energyUsage: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  additionalData: z.record(z.any()).optional()
});

// Legacy contact form schema for backward compatibility
const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  message: z.string().optional(),
  interestedServices: z.array(z.string()).optional()
});

// Quote form schema
const quoteFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  propertyType: z.string().min(1, "Property type is required"),
  estimatedBudget: z.string().optional(),
  projectDescription: z.string().optional(),
  interestedServices: z.array(z.string()).optional(),
  preferredContactTime: z.string().optional()
});

// Consultation form schema
const consultationFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  propertyType: z.string().optional(),
  currentEnergyBill: z.string().optional(),
  interestedServices: z.array(z.string()).optional(),
  additionalInfo: z.string().optional()
});

// Submit contact form
router.post("/api/contact", async (req, res) => {
  try {
    const validatedData = contactFormSchema.parse(req.body);
    const contact = await storage.submitContactForm(validatedData);
    
    // Create activity record
    await storage.createActivity({
      type: "form_submission",
      subject: "Contact Form Submission",
      details: `New contact form submission from ${contact.firstName} ${contact.lastName}`,
      contactId: contact.id,
      createdBy: 1
    });

    res.json({ success: true, contact });
  } catch (error) {
    
    if (error instanceof z.ZodError) {
      res.status(400).json({ success: false, error: "Validation error", details: error.errors });
    } else {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
});

// Submit quote form
router.post("/api/quote", async (req, res) => {
  try {
    const validatedData = quoteFormSchema.parse(req.body);
    const { contact, opportunity } = await storage.submitQuoteForm(validatedData);
    
    // Create activity record
    await storage.createActivity({
      type: "quote_request",
      subject: "Solar Quote Request",
      details: `New solar quote request from ${contact.firstName} ${contact.lastName}`,
      contactId: contact.id,
      opportunityId: opportunity.id,
      createdBy: 1
    });

    res.json({ success: true, contact, opportunity });
  } catch (error) {
    
    if (error instanceof z.ZodError) {
      res.status(400).json({ success: false, error: "Validation error", details: error.errors });
    } else {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
});

// Submit consultation form
router.post("/api/consultation", async (req, res) => {
  try {
    const validatedData = consultationFormSchema.parse(req.body);
    const { contact, opportunity } = await storage.submitConsultationForm(validatedData);
    
    // Create activity record
    await storage.createActivity({
      type: "consultation_request",
      subject: "Free Consultation Request",
      details: `New free consultation request from ${contact.firstName} ${contact.lastName}`,
      contactId: contact.id,
      opportunityId: opportunity.id,
      createdBy: 1
    });

    res.json({ success: true, contact, opportunity });
  } catch (error) {
    
    if (error instanceof z.ZodError) {
      res.status(400).json({ success: false, error: "Validation error", details: error.errors });
    } else {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
});

// UNIVERSAL FORM SUBMISSION ENDPOINT - Handles ALL website forms
router.post("/api/forms/submit", async (req, res) => {
  try {
    
    // Validate the form data
    const validationResult = universalFormSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ 
        success: false, 
        error: "Validation error", 
        details: validationResult.error.errors 
      });
    }

    const formData = validationResult.data;
    
    // Create form submission record and automatically process it
    const submission = await storage.createFormSubmission(formData);

    res.json({ 
      success: true, 
      message: "Form submitted successfully! We'll contact you soon.",
      submissionId: submission.id 
    });
  } catch (error) {
    
    res.status(500).json({ 
      success: false, 
      error: "Failed to submit form. Please try again." 
    });
  }
});

// CRM API Routes
// Get all contacts
router.get("/api/crm/contacts", async (req, res) => {
  try {
    const contacts = await storage.getContacts();
    res.json({ success: true, contacts });
  } catch (error) {
    
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Get contact by ID
router.get("/api/crm/contacts/:id", async (req, res) => {
  try {
    const contactId = parseInt(req.params.id);
    const contact = await storage.getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ success: false, error: "Contact not found" });
    }
    
    const activities = await storage.getActivitiesByContact(contactId);
    res.json({ success: true, contact, activities });
  } catch (error) {
    
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Update contact
router.put("/api/crm/contacts/:id", async (req, res) => {
  try {
    const contactId = parseInt(req.params.id);
    const contact = await storage.updateContact(contactId, req.body);
    res.json({ success: true, contact });
  } catch (error) {
    
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Delete contact
router.delete("/api/crm/contacts/:id", async (req, res) => {
  try {
    const contactId = parseInt(req.params.id);
    await storage.deleteContact(contactId);
    res.json({ success: true });
  } catch (error) {
    
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Search contacts
router.get("/api/crm/contacts/search/:query", async (req, res) => {
  try {
    const query = req.params.query;
    const contacts = await storage.searchContacts(query);
    res.json({ success: true, contacts });
  } catch (error) {
    
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Get all opportunities
router.get("/api/crm/opportunities", async (req, res) => {
  try {
    const opportunities = await storage.getOpportunities();
    res.json({ success: true, opportunities });
  } catch (error) {
    
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Get opportunity by ID
router.get("/api/crm/opportunities/:id", async (req, res) => {
  try {
    const opportunityId = parseInt(req.params.id);
    const opportunity = await storage.getOpportunityById(opportunityId);
    if (!opportunity) {
      return res.status(404).json({ success: false, error: "Opportunity not found" });
    }
    res.json({ success: true, opportunity });
  } catch (error) {
    
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Update opportunity
router.put("/api/crm/opportunities/:id", async (req, res) => {
  try {
    const opportunityId = parseInt(req.params.id);
    const opportunity = await storage.updateOpportunity(opportunityId, req.body);
    res.json({ success: true, opportunity });
  } catch (error) {
    
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Get dashboard stats
router.get("/api/crm/dashboard", async (req, res) => {
  try {
    const stats = await storage.getDashboardStats();
    res.json({ success: true, stats });
  } catch (error) {
    
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// CSV contact import
router.post("/api/crm/contacts/import", upload.single('csvFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "No CSV file uploaded" });
    }

    const csvContent = req.file.buffer.toString('utf-8');
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    let imported = 0;
    let skipped = 0;

    for (const record of records) {
      try {
        // Map CSV columns to contact fields
        const contactData = {
          firstName: record.firstName || record['First Name'] || '',
          lastName: record.lastName || record['Last Name'] || '',
          email: record.email || record['Email'] || '',
          phone: record.phone || record['Phone'] || '',
          address: record.address || record['Address'] || '',
          city: record.city || record['City'] || '',
          state: record.state || record['State'] || 'CA',
          zipCode: record.zipCode || record['ZIP Code'] || record['Zip Code'] || '',
          jobTitle: record.jobTitle || record['Job Title'] || '',
          status: record.status || record['Status'] || 'lead',
          source: record.source || record['Source'] || 'csv_import',
          interestedInServices: record.interestedInServices 
            ? record.interestedInServices.split(',').map((s: string) => s.trim())
            : [],
          notes: record.notes || record['Notes'] || ''
        };

        // Validate required fields
        if (contactData.firstName && contactData.lastName && contactData.email && contactData.phone) {
          await storage.createContact(contactData);
          imported++;
        } else {
          skipped++;
        }
      } catch (error) {
        
        skipped++;
      }
    }

    res.json({ 
      success: true, 
      imported, 
      skipped,
      message: `Successfully imported ${imported} contacts, skipped ${skipped} invalid records` 
    });
  } catch (error) {
    
    res.status(500).json({ success: false, error: "Failed to import CSV file" });
  }
});

// Get form submissions
router.get("/api/crm/form-submissions", async (req, res) => {
  try {
    const submissions = await storage.getFormSubmissions();
    res.json({ success: true, submissions });
  } catch (error) {
    
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Create activity
router.post("/api/crm/activities", async (req, res) => {
  try {
    const activity = await storage.createActivity(req.body);
    res.json({ success: true, activity });
  } catch (error) {
    
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export function registerRoutes(app: any) {
  app.use(router);
  app.use("/api/crm", crmRoutes);
}

export default router;