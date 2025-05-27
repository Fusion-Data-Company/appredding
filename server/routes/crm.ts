import express from "express";
import { db } from "../db";
import { 
  contacts, companies, opportunities, formSubmissions, activities, tasks,
  customers, customerDocuments, documentProcessingJobs,
  insertContactSchema, insertCompanySchema, insertOpportunitySchema,
  insertCustomerSchema, insertCustomerDocumentSchema
} from "@shared/schema";
import { eq, like, or, and, desc, asc, count, sql } from "drizzle-orm";
import { documentProcessor } from "../services/documentProcessor";
import { pdfWorkflowEngine } from "../services/pdfWorkflowEngine";
import { 
  getYearlyAnalytics, 
  getCustomersByDecade, 
  getGeographicAnalysis,
  getCustomersByYear,
  searchCustomersAcrossYears,
  getServiceAnalyticsByYear,
  getTechnologyTrends 
} from "../services/historicalAnalytics";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/documents/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx', '.xls', '.xlsx', '.csv'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, images, and documents are allowed.'), false);
    }
  }
});

// =====================
// CONTACTS MANAGEMENT
// =====================

// Get all contacts with advanced filtering and sorting
router.get("/contacts", async (req, res) => {
  try {
    const { 
      search, 
      status, 
      source, 
      assignedTo, 
      sortBy = 'updatedAt', 
      sortOrder = 'desc',
      page = 1,
      limit = 50
    } = req.query;

    let query = db
      .select({
        id: contacts.id,
        firstName: contacts.firstName,
        lastName: contacts.lastName,
        email: contacts.email,
        phone: contacts.phone,
        company: companies.name,
        jobTitle: contacts.jobTitle,
        status: contacts.status,
        source: contacts.source,
        lastContactedDate: contacts.lastContactedDate,
        createdAt: contacts.createdAt,
        updatedAt: contacts.updatedAt,
        assignedTo: contacts.assignedTo
      })
      .from(contacts)
      .leftJoin(companies, eq(contacts.companyId, companies.id));

    // Apply search filter
    if (search && typeof search === 'string') {
      const searchTerm = `%${search}%`;
      query = query.where(
        or(
          like(contacts.firstName, searchTerm),
          like(contacts.lastName, searchTerm),
          like(contacts.email, searchTerm),
          like(contacts.phone, searchTerm),
          like(companies.name, searchTerm)
        )
      );
    }

    // Apply status filter
    if (status && typeof status === 'string') {
      query = query.where(eq(contacts.status, status as any));
    }

    // Apply source filter
    if (source && typeof source === 'string') {
      query = query.where(eq(contacts.source, source as any));
    }

    // Apply assigned to filter
    if (assignedTo && typeof assignedTo === 'string') {
      query = query.where(eq(contacts.assignedTo, parseInt(assignedTo)));
    }

    // Apply sorting
    const validSortFields = ['firstName', 'lastName', 'email', 'createdAt', 'updatedAt', 'lastContactedDate'];
    const sortField = validSortFields.includes(sortBy as string) ? sortBy as string : 'updatedAt';
    const order = sortOrder === 'asc' ? asc : desc;
    
    if (sortField === 'firstName') query = query.orderBy(order(contacts.firstName));
    else if (sortField === 'lastName') query = query.orderBy(order(contacts.lastName));
    else if (sortField === 'email') query = query.orderBy(order(contacts.email));
    else if (sortField === 'createdAt') query = query.orderBy(order(contacts.createdAt));
    else if (sortField === 'lastContactedDate') query = query.orderBy(order(contacts.lastContactedDate));
    else query = query.orderBy(order(contacts.updatedAt));

    // Apply pagination
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    query = query.limit(parseInt(limit as string)).offset(offset);

    const result = await query;

    // Get total count for pagination
    const [totalCount] = await db
      .select({ count: count() })
      .from(contacts)
      .leftJoin(companies, eq(contacts.companyId, companies.id))
      .where(
        search && typeof search === 'string' ? 
        or(
          like(contacts.firstName, `%${search}%`),
          like(contacts.lastName, `%${search}%`),
          like(contacts.email, `%${search}%`),
          like(contacts.phone, `%${search}%`),
          like(companies.name, `%${search}%`)
        ) : sql`true`
      );

    res.json({
      contacts: result,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total: totalCount.count,
        totalPages: Math.ceil(totalCount.count / parseInt(limit as string))
      }
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

// Get single contact with full details
router.get("/contacts/:id", async (req, res) => {
  try {
    const contactId = parseInt(req.params.id);
    
    // Get contact with company details
    const [contact] = await db
      .select()
      .from(contacts)
      .leftJoin(companies, eq(contacts.companyId, companies.id))
      .where(eq(contacts.id, contactId));

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    // Get related opportunities
    const contactOpportunities = await db
      .select()
      .from(opportunities)
      .where(eq(opportunities.contactId, contactId))
      .orderBy(desc(opportunities.createdAt));

    // Get recent activities
    const recentActivities = await db
      .select()
      .from(activities)
      .where(eq(activities.contactId, contactId))
      .orderBy(desc(activities.createdAt))
      .limit(10);

    // Get tasks
    const contactTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.contactId, contactId))
      .orderBy(desc(tasks.createdAt));

    res.json({
      contact: contact.contacts,
      company: contact.companies,
      opportunities: contactOpportunities,
      activities: recentActivities,
      tasks: contactTasks
    });
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({ error: "Failed to fetch contact" });
  }
});

// Create new contact
router.post("/contacts", async (req, res) => {
  try {
    const validatedData = insertContactSchema.parse(req.body);
    
    const [newContact] = await db
      .insert(contacts)
      .values({
        ...validatedData,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning();

    // Log activity
    await db.insert(activities).values({
      type: 'contact_created',
      subject: `Contact created: ${newContact.firstName} ${newContact.lastName}`,
      contactId: newContact.id,
      createdBy: 1, // TODO: Use actual user ID from session
      createdAt: new Date()
    });

    res.status(201).json(newContact);
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ error: "Failed to create contact" });
  }
});

// Update contact
router.put("/contacts/:id", async (req, res) => {
  try {
    const contactId = parseInt(req.params.id);
    const validatedData = insertContactSchema.partial().parse(req.body);
    
    const [updatedContact] = await db
      .update(contacts)
      .set({
        ...validatedData,
        updatedAt: new Date()
      })
      .where(eq(contacts.id, contactId))
      .returning();

    if (!updatedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    // Log activity
    await db.insert(activities).values({
      type: 'contact_updated',
      subject: `Contact updated: ${updatedContact.firstName} ${updatedContact.lastName}`,
      contactId: updatedContact.id,
      createdBy: 1, // TODO: Use actual user ID from session
      createdAt: new Date()
    });

    res.json(updatedContact);
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ error: "Failed to update contact" });
  }
});

// Delete contact
router.delete("/contacts/:id", async (req, res) => {
  try {
    const contactId = parseInt(req.params.id);
    
    const [deletedContact] = await db
      .delete(contacts)
      .where(eq(contacts.id, contactId))
      .returning();

    if (!deletedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ error: "Failed to delete contact" });
  }
});

// =====================
// FORM SUBMISSIONS
// =====================

// Get all form submissions with filtering
router.get("/form-submissions", async (req, res) => {
  try {
    const { 
      formType, 
      processed, 
      sourcePage,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      page = 1,
      limit = 50
    } = req.query;

    let query = db.select().from(formSubmissions);

    // Apply filters
    if (formType && typeof formType === 'string') {
      query = query.where(eq(formSubmissions.formType, formType));
    }
    
    if (processed !== undefined) {
      query = query.where(eq(formSubmissions.processed, processed === 'true'));
    }

    if (sourcePage && typeof sourcePage === 'string') {
      query = query.where(like(formSubmissions.sourcePage, `%${sourcePage}%`));
    }

    // Apply sorting
    const order = sortOrder === 'asc' ? asc : desc;
    query = query.orderBy(order(formSubmissions.createdAt));

    // Apply pagination
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    const result = await query.limit(parseInt(limit as string)).offset(offset);

    // Get total count
    const [totalCount] = await db.select({ count: count() }).from(formSubmissions);

    res.json({
      submissions: result,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total: totalCount.count,
        totalPages: Math.ceil(totalCount.count / parseInt(limit as string))
      }
    });
  } catch (error) {
    console.error("Error fetching form submissions:", error);
    res.status(500).json({ error: "Failed to fetch form submissions" });
  }
});

// Process form submission - convert to contact and opportunity
router.post("/form-submissions/:id/process", async (req, res) => {
  try {
    const submissionId = parseInt(req.params.id);
    
    const [submission] = await db
      .select()
      .from(formSubmissions)
      .where(eq(formSubmissions.id, submissionId));

    if (!submission) {
      return res.status(404).json({ error: "Form submission not found" });
    }

    if (submission.processed) {
      return res.status(400).json({ error: "Form submission already processed" });
    }

    // Create contact
    const [newContact] = await db
      .insert(contacts)
      .values({
        firstName: submission.firstName,
        lastName: submission.lastName,
        email: submission.email,
        phone: submission.phone || null,
        address: submission.address || null,
        city: submission.city || null,
        state: submission.state || null,
        zipCode: submission.zipCode || null,
        source: 'website',
        status: 'lead',
        notes: submission.message || null,
        interestedInServices: submission.interestedServices,
        createdBy: 1, // TODO: Use actual user ID
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning();

    // Create opportunity if there's enough information
    let newOpportunity = null;
    if (submission.interestedServices || submission.budget) {
      [newOpportunity] = await db
        .insert(opportunities)
        .values({
          name: `${submission.formType} - ${submission.firstName} ${submission.lastName}`,
          contactId: newContact.id,
          solarServices: submission.interestedServices,
          status: 'pending',
          amount: submission.budget ? parseFloat(submission.budget) : null,
          description: submission.message || null,
          source: 'website',
          createdBy: 1, // TODO: Use actual user ID
          createdAt: new Date(),
          updatedAt: new Date()
        })
        .returning();
    }

    // Mark submission as processed
    await db
      .update(formSubmissions)
      .set({
        processed: true,
        contactId: newContact.id,
        updatedAt: new Date()
      })
      .where(eq(formSubmissions.id, submissionId));

    // Log activity
    await db.insert(activities).values({
      type: 'form_processed',
      subject: `Form submission processed: ${submission.formType}`,
      contactId: newContact.id,
      formSubmissionId: submissionId,
      createdBy: 1,
      createdAt: new Date()
    });

    res.json({
      contact: newContact,
      opportunity: newOpportunity,
      message: "Form submission processed successfully"
    });
  } catch (error) {
    console.error("Error processing form submission:", error);
    res.status(500).json({ error: "Failed to process form submission" });
  }
});

// =====================
// OPPORTUNITIES
// =====================

// Get all opportunities with filtering
router.get("/opportunities", async (req, res) => {
  try {
    const { 
      status, 
      assignedTo, 
      sortBy = 'updatedAt', 
      sortOrder = 'desc',
      page = 1,
      limit = 50
    } = req.query;

    let query = db
      .select({
        id: opportunities.id,
        name: opportunities.name,
        status: opportunities.status,
        amount: opportunities.amount,
        probability: opportunities.probability,
        expectedCloseDate: opportunities.expectedCloseDate,
        contactName: sql`${contacts.firstName} || ' ' || ${contacts.lastName}`,
        companyName: companies.name,
        createdAt: opportunities.createdAt,
        updatedAt: opportunities.updatedAt
      })
      .from(opportunities)
      .leftJoin(contacts, eq(opportunities.contactId, contacts.id))
      .leftJoin(companies, eq(opportunities.companyId, companies.id));

    // Apply filters
    if (status && typeof status === 'string') {
      query = query.where(eq(opportunities.status, status as any));
    }

    if (assignedTo && typeof assignedTo === 'string') {
      query = query.where(eq(opportunities.assignedTo, parseInt(assignedTo)));
    }

    // Apply sorting and pagination
    const order = sortOrder === 'asc' ? asc : desc;
    query = query.orderBy(order(opportunities.updatedAt));
    
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    const result = await query.limit(parseInt(limit as string)).offset(offset);

    // Get total count
    const [totalCount] = await db.select({ count: count() }).from(opportunities);

    res.json({
      opportunities: result,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total: totalCount.count,
        totalPages: Math.ceil(totalCount.count / parseInt(limit as string))
      }
    });
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    res.status(500).json({ error: "Failed to fetch opportunities" });
  }
});

// =====================
// CUSTOMER DATABASE
// =====================

// Get all customers with advanced filtering
router.get("/customers", async (req, res) => {
  try {
    const { 
      search, 
      installationYear, 
      status,
      sortBy = 'updatedAt',
      sortOrder = 'desc',
      page = 1,
      limit = 50
    } = req.query;

    let query = db.select().from(customers);

    // Apply search
    if (search && typeof search === 'string') {
      const searchTerm = `%${search}%`;
      query = query.where(
        or(
          like(customers.fullName, searchTerm),
          like(customers.firstName, searchTerm),
          like(customers.lastName, searchTerm),
          like(customers.address, searchTerm),
          like(customers.email, searchTerm),
          like(customers.phone, searchTerm)
        )
      );
    }

    // Apply filters
    if (installationYear && typeof installationYear === 'string') {
      query = query.where(eq(customers.installationYear, parseInt(installationYear)));
    }

    if (status && typeof status === 'string') {
      query = query.where(eq(customers.status, status as any));
    }

    // Apply sorting
    const order = sortOrder === 'asc' ? asc : desc;
    query = query.orderBy(order(customers.updatedAt));

    // Apply pagination
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);
    const result = await query.limit(parseInt(limit as string)).offset(offset);

    // Get total count
    const [totalCount] = await db.select({ count: count() }).from(customers);

    res.json({
      customers: result,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total: totalCount.count,
        totalPages: Math.ceil(totalCount.count / parseInt(limit as string))
      }
    });
  } catch (error) {
    console.error("Error fetching customers:", error);
    res.status(500).json({ error: "Failed to fetch customers" });
  }
});

// Get single customer with documents
router.get("/customers/:id", async (req, res) => {
  try {
    const customerId = parseInt(req.params.id);
    
    const [customer] = await db
      .select()
      .from(customers)
      .where(eq(customers.id, customerId));

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    // Get customer documents
    const documents = await db
      .select()
      .from(customerDocuments)
      .where(eq(customerDocuments.customerId, customerId))
      .orderBy(desc(customerDocuments.createdAt));

    res.json({
      customer,
      documents
    });
  } catch (error) {
    console.error("Error fetching customer:", error);
    res.status(500).json({ error: "Failed to fetch customer" });
  }
});

// Upload and process documents
router.post("/customers/:id/documents", upload.array('documents', 10), async (req, res) => {
  try {
    const customerId = parseInt(req.params.id);
    const files = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const uploadedDocuments = [];

    for (const file of files) {
      // Save document record
      const [document] = await db
        .insert(customerDocuments)
        .values({
          customerId: customerId,
          fileName: file.filename,
          originalFileName: file.originalname,
          filePath: file.path,
          fileType: path.extname(file.originalname).slice(1),
          fileSize: file.size,
          processingStatus: 'pending_processing',
          createdAt: new Date(),
          updatedAt: new Date()
        })
        .returning();

      uploadedDocuments.push(document);

      // Queue for AI processing
      try {
        await documentProcessor.processDocument(document.id);
      } catch (error) {
        console.error(`Failed to process document ${document.id}:`, error);
      }
    }

    res.json({
      message: `Successfully uploaded ${files.length} documents`,
      documents: uploadedDocuments
    });
  } catch (error) {
    console.error("Error uploading documents:", error);
    res.status(500).json({ error: "Failed to upload documents" });
  }
});

// Search across customers and documents
router.get("/search", async (req, res) => {
  try {
    const { query, filters } = req.query;
    
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: "Search query is required" });
    }

    const parseFilters = filters ? JSON.parse(filters as string) : {};
    const results = await documentProcessor.searchCustomersAndDocuments(query, parseFilters);

    res.json(results);
  } catch (error) {
    console.error("Error performing search:", error);
    res.status(500).json({ error: "Failed to perform search" });
  }
});

// =====================
// RECENT ACTIVITY
// =====================

// Get recent activities
router.get("/activities", async (req, res) => {
  try {
    const { limit = 20 } = req.query;

    const recentActivities = await db
      .select({
        id: activities.id,
        type: activities.type,
        subject: activities.subject,
        details: activities.details,
        contactName: sql`${contacts.firstName} || ' ' || ${contacts.lastName}`,
        createdAt: activities.createdAt
      })
      .from(activities)
      .leftJoin(contacts, eq(activities.contactId, contacts.id))
      .orderBy(desc(activities.createdAt))
      .limit(parseInt(limit as string));

    res.json(recentActivities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ error: "Failed to fetch activities" });
  }
});

// =====================
// BULK OPERATIONS
// =====================

// Bulk process documents
router.post("/documents/bulk-process", async (req, res) => {
  try {
    const { documentIds } = req.body;

    if (!Array.isArray(documentIds)) {
      return res.status(400).json({ error: "documentIds must be an array" });
    }

    await documentProcessor.processBatch(documentIds);

    res.json({ message: `Queued ${documentIds.length} documents for processing` });
  } catch (error) {
    console.error("Error bulk processing documents:", error);
    res.status(500).json({ error: "Failed to bulk process documents" });
  }
});

// Export contacts to CSV
router.get("/contacts/export", async (req, res) => {
  try {
    const allContacts = await db
      .select({
        firstName: contacts.firstName,
        lastName: contacts.lastName,
        email: contacts.email,
        phone: contacts.phone,
        company: companies.name,
        jobTitle: contacts.jobTitle,
        status: contacts.status,
        source: contacts.source,
        createdAt: contacts.createdAt
      })
      .from(contacts)
      .leftJoin(companies, eq(contacts.companyId, companies.id))
      .orderBy(desc(contacts.createdAt));

    // Convert to CSV format
    const csvHeader = 'First Name,Last Name,Email,Phone,Company,Job Title,Status,Source,Created At\n';
    const csvData = allContacts.map(contact => 
      `"${contact.firstName}","${contact.lastName}","${contact.email}","${contact.phone || ''}","${contact.company || ''}","${contact.jobTitle || ''}","${contact.status}","${contact.source}","${contact.createdAt}"`
    ).join('\n');

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=contacts.csv');
    res.send(csvHeader + csvData);
  } catch (error) {
    console.error("Error exporting contacts:", error);
    res.status(500).json({ error: "Failed to export contacts" });
  }
});

// =====================
// HISTORICAL ANALYTICS - 25+ YEARS OF DATA
// =====================

// Get yearly analytics for business performance analysis
router.get("/analytics/yearly", async (req, res) => {
  try {
    const { startYear, endYear } = req.query;
    const start = startYear ? parseInt(startYear as string) : undefined;
    const end = endYear ? parseInt(endYear as string) : undefined;
    
    const analytics = await getYearlyAnalytics(start, end);
    res.json(analytics);
  } catch (error) {
    console.error("Error fetching yearly analytics:", error);
    res.status(500).json({ error: "Failed to fetch yearly analytics" });
  }
});

// Get customer distribution by decades
router.get("/analytics/decades", async (req, res) => {
  try {
    const decadeData = await getCustomersByDecade();
    res.json(decadeData);
  } catch (error) {
    console.error("Error fetching decade analysis:", error);
    res.status(500).json({ error: "Failed to fetch decade analysis" });
  }
});

// Get geographic analysis for Shasta County service areas
router.get("/analytics/geographic", async (req, res) => {
  try {
    const geoData = await getGeographicAnalysis();
    res.json(geoData);
  } catch (error) {
    console.error("Error fetching geographic analysis:", error);
    res.status(500).json({ error: "Failed to fetch geographic analysis" });
  }
});

// Get customers by specific year with pagination
router.get("/analytics/customers-by-year/:year", async (req, res) => {
  try {
    const year = parseInt(req.params.year);
    const { limit = 50, offset = 0 } = req.query;
    
    const data = await getCustomersByYear(
      year, 
      parseInt(limit as string), 
      parseInt(offset as string)
    );
    
    res.json(data);
  } catch (error) {
    console.error("Error fetching customers by year:", error);
    res.status(500).json({ error: "Failed to fetch customers by year" });
  }
});

// Advanced search across all years of customer data
router.get("/analytics/search-historical", async (req, res) => {
  try {
    const { query, yearFrom, yearTo, limit = 50, offset = 0 } = req.query;
    
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: "Search query is required" });
    }
    
    const fromYear = yearFrom ? parseInt(yearFrom as string) : undefined;
    const toYear = yearTo ? parseInt(yearTo as string) : undefined;
    
    const results = await searchCustomersAcrossYears(
      query,
      fromYear,
      toYear,
      parseInt(limit as string),
      parseInt(offset as string)
    );
    
    res.json(results);
  } catch (error) {
    console.error("Error searching historical data:", error);
    res.status(500).json({ error: "Failed to search historical data" });
  }
});

// Get service and maintenance analytics by year
router.get("/analytics/service-trends", async (req, res) => {
  try {
    const serviceData = await getServiceAnalyticsByYear();
    res.json(serviceData);
  } catch (error) {
    console.error("Error fetching service analytics:", error);
    res.status(500).json({ error: "Failed to fetch service analytics" });
  }
});

// Get technology trends over the years (inverter types, battery adoption, etc.)
router.get("/analytics/technology-trends", async (req, res) => {
  try {
    const techData = await getTechnologyTrends();
    res.json(techData);
  } catch (error) {
    console.error("Error fetching technology trends:", error);
    res.status(500).json({ error: "Failed to fetch technology trends" });
  }
});

// ==========================================
// ADVANCED PDF PROCESSING ENDPOINT
// ==========================================

// Process PDF documents with comprehensive AI analysis
router.post("/process-pdf", upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No document file provided" });
    }

    const { customerId, uploadedBy } = req.body;
    
    console.log(`Starting advanced PDF processing for: ${req.file.originalname}`);
    
    // Read the uploaded file
    const fs = require('fs');
    const fileBuffer = fs.readFileSync(req.file.path);
    
    // Process with the complete PDF workflow engine
    const processingResult = await pdfWorkflowEngine.processDocument(
      fileBuffer, 
      req.file.originalname, 
      uploadedBy || 'unknown'
    );
    
    // Clean up the temporary file
    fs.unlinkSync(req.file.path);
    
    res.json({
      success: true,
      message: "Document processed successfully with advanced AI analysis",
      data: processingResult
    });
    
  } catch (error) {
    console.error("Advanced PDF processing failed:", error);
    
    // Clean up file if it exists
    if (req.file?.path) {
      try {
        const fs = require('fs');
        fs.unlinkSync(req.file.path);
      } catch (cleanupError) {
        console.error("File cleanup failed:", cleanupError);
      }
    }
    
    res.status(500).json({ 
      error: "Failed to process PDF document", 
      details: error.message 
    });
  }
});

// Batch process multiple PDF documents
router.post("/batch-process-pdfs", upload.array('documents', 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No document files provided" });
    }

    const { uploadedBy } = req.body;
    const results = [];
    const fs = require('fs');
    
    console.log(`Starting batch processing of ${req.files.length} documents`);
    
    // Process each file
    for (const file of req.files) {
      try {
        const fileBuffer = fs.readFileSync(file.path);
        
        const processingResult = await pdfWorkflowEngine.processDocument(
          fileBuffer, 
          file.originalname, 
          uploadedBy || 'batch_upload'
        );
        
        results.push({
          filename: file.originalname,
          status: 'success',
          data: processingResult
        });
        
        // Clean up
        fs.unlinkSync(file.path);
        
      } catch (error) {
        console.error(`Failed to process ${file.originalname}:`, error);
        results.push({
          filename: file.originalname,
          status: 'failed',
          error: error.message
        });
        
        // Clean up failed file
        try {
          fs.unlinkSync(file.path);
        } catch (cleanupError) {
          console.error("File cleanup failed:", cleanupError);
        }
      }
    }
    
    const successful = results.filter(r => r.status === 'success').length;
    const failed = results.filter(r => r.status === 'failed').length;
    
    res.json({
      success: true,
      message: `Batch processing completed: ${successful} successful, ${failed} failed`,
      results: results,
      summary: {
        total: req.files.length,
        successful,
        failed
      }
    });
    
  } catch (error) {
    console.error("Batch PDF processing failed:", error);
    
    // Clean up all files
    if (req.files) {
      const fs = require('fs');
      req.files.forEach(file => {
        try {
          fs.unlinkSync(file.path);
        } catch (cleanupError) {
          console.error("File cleanup failed:", cleanupError);
        }
      });
    }
    
    res.status(500).json({ 
      error: "Failed to batch process PDF documents", 
      details: error.message 
    });
  }
});

// Get document processing status and results
router.get("/document-analysis/:documentId", async (req, res) => {
  try {
    const { documentId } = req.params;
    
    const document = await db.select().from(customerDocuments)
      .where(eq(customerDocuments.id, parseInt(documentId)))
      .limit(1);
    
    if (document.length === 0) {
      return res.status(404).json({ error: "Document not found" });
    }
    
    const docData = document[0];
    
    res.json({
      id: docData.id,
      filename: docData.filename,
      category: docData.documentCategory,
      summary: docData.summary,
      extractedData: docData.extractedData,
      tags: docData.tags?.split(',') || [],
      confidence: docData.confidence,
      isProcessed: docData.isProcessed,
      processedAt: docData.processedAt,
      uploadedAt: docData.uploadedAt
    });
    
  } catch (error) {
    console.error("Error fetching document analysis:", error);
    res.status(500).json({ error: "Failed to fetch document analysis" });
  }
});

// Search documents by content, category, or extracted data
router.get("/search-documents", async (req, res) => {
  try {
    const { query, category, customerId, dateFrom, dateTo } = req.query;
    
    let searchQuery = db.select().from(customerDocuments);
    
    const conditions = [];
    
    if (query) {
      conditions.push(
        or(
          like(customerDocuments.summary, `%${query}%`),
          like(customerDocuments.tags, `%${query}%`),
          like(customerDocuments.filename, `%${query}%`)
        )
      );
    }
    
    if (category) {
      conditions.push(eq(customerDocuments.documentCategory, category));
    }
    
    if (customerId) {
      conditions.push(eq(customerDocuments.customerId, parseInt(customerId)));
    }
    
    if (dateFrom) {
      conditions.push(sql`${customerDocuments.uploadedAt} >= ${new Date(dateFrom)}`);
    }
    
    if (dateTo) {
      conditions.push(sql`${customerDocuments.uploadedAt} <= ${new Date(dateTo)}`);
    }
    
    if (conditions.length > 0) {
      searchQuery = searchQuery.where(and(...conditions));
    }
    
    const documents = await searchQuery
      .orderBy(desc(customerDocuments.uploadedAt))
      .limit(100);
    
    res.json(documents);
    
  } catch (error) {
    console.error("Error searching documents:", error);
    res.status(500).json({ error: "Failed to search documents" });
  }
});

export default router;