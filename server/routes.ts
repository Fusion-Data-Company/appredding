import { Router } from "express";
import { storage } from "./storage";
import { z } from "zod";
import multer from "multer";
import { parse } from "csv-parse/sync";

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

// Contact form schema
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
    console.error("Contact form error:", error);
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
    console.error("Quote form error:", error);
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
    console.error("Consultation form error:", error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ success: false, error: "Validation error", details: error.errors });
    } else {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
});

// CRM API Routes
// Get all contacts
router.get("/api/crm/contacts", async (req, res) => {
  try {
    const contacts = await storage.getContacts();
    res.json({ success: true, contacts });
  } catch (error) {
    console.error("Get contacts error:", error);
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
    console.error("Get contact error:", error);
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
    console.error("Update contact error:", error);
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
    console.error("Delete contact error:", error);
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
    console.error("Search contacts error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Get all opportunities
router.get("/api/crm/opportunities", async (req, res) => {
  try {
    const opportunities = await storage.getOpportunities();
    res.json({ success: true, opportunities });
  } catch (error) {
    console.error("Get opportunities error:", error);
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
    console.error("Get opportunity error:", error);
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
    console.error("Update opportunity error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Get dashboard stats
router.get("/api/crm/dashboard", async (req, res) => {
  try {
    const stats = await storage.getDashboardStats();
    res.json({ success: true, stats });
  } catch (error) {
    console.error("Get dashboard stats error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// Create activity
router.post("/api/crm/activities", async (req, res) => {
  try {
    const activity = await storage.createActivity(req.body);
    res.json({ success: true, activity });
  } catch (error) {
    console.error("Create activity error:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export default router;