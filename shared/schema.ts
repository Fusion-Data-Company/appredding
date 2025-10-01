import { pgTable, text, serial, integer, boolean, timestamp, pgEnum, date, jsonb, decimal, index, uniqueIndex } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Enums
export const userTypeEnum = pgEnum('user_type', ['super_admin', 'admin', 'sales', 'client', 'installer', 'technician', 'customer_service']);
export const projectStatusEnum = pgEnum('project_status', ['pending', 'site_survey', 'design', 'permits', 'installation', 'inspection', 'completed', 'cancelled']);
export const taskPriorityEnum = pgEnum('task_priority', ['low', 'medium', 'high', 'urgent']);
export const taskStatusEnum = pgEnum('task_status', ['pending', 'in_progress', 'completed', 'cancelled', 'overdue']);
export const solarServiceTypeEnum = pgEnum('solar_service_type', ['residential_solar', 'commercial_solar', 'hybrid_systems', 'lithium_battery', 'energy_conservation', 'maintenance', 'repair']);
export const leadSourceEnum = pgEnum('lead_source', ['website', 'referral', 'social_media', 'direct', 'trade_show', 'google', 'facebook', 'other']);
export const contactStatusEnum = pgEnum('contact_status', ['lead', 'prospect', 'customer', 'inactive']);
export const socialMediaTypeEnum = pgEnum('social_media_type', ['facebook', 'instagram', 'twitter', 'linkedin', 'youtube', 'tiktok', 'other']);
export const reviewStatusEnum = pgEnum('review_status', ['pending', 'approved', 'rejected']);
export const verificationStatusEnum = pgEnum('verification_status', ['pending', 'verified', 'rejected']);
export const systemTypeEnum = pgEnum('system_type', ['grid_tied', 'off_grid', 'hybrid']);
export const installationStatusEnum = pgEnum('installation_status', ['quoted', 'approved', 'scheduled', 'in_progress', 'completed', 'warranty']);
export const batteryTypeEnum = pgEnum('battery_type', ['lithium_iron_phosphate', 'lead_acid', 'lithium_ion']);
export const orderStatusEnum = pgEnum('order_status', ['pending', 'processing', 'completed', 'cancelled', 'refunded']);
export const paymentStatusEnum = pgEnum('payment_status', ['pending', 'authorized', 'captured', 'failed', 'refunded']);

// Tables
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  companyName: text("company_name"),
  phone: text("phone"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  userType: userTypeEnum("user_type").notNull().default('client'),
  isActive: boolean("is_active").notNull().default(true),
  lastLogin: timestamp("last_login"),
  avatarUrl: text("avatar_url"),
  jobTitle: text("job_title"),
  department: text("department"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Companies table
export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  industry: text("industry"),
  website: text("website"),
  phone: text("phone"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  country: text("country"),
  description: text("description"),
  logoUrl: text("logo_url"),
  linkedinUrl: text("linkedin_url"),
  facebookUrl: text("facebook_url"),
  twitterUrl: text("twitter_url"),
  instagramUrl: text("instagram_url"),
  annualRevenue: text("annual_revenue"),
  employeeCount: integer("employee_count"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  createdBy: integer("created_by").references(() => users.id),
});

// Company relations
export const companiesRelations = relations(companies, ({ many }) => ({
  contacts: many(contacts),
  opportunities: many(opportunities)
}));

// Enhanced contacts for CRM
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").references(() => companies.id),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  mobilePhone: text("mobile_phone"),
  jobTitle: text("job_title"),
  department: text("department"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  country: text("country"),
  website: text("website"),
  source: leadSourceEnum("source").default('website'),
  status: contactStatusEnum("status").default('lead'),
  interestedInServices: jsonb("interested_in_services"), // Array of solar service types
  notes: text("notes"),
  birthday: date("birthday"),
  linkedinUrl: text("linkedin_url"),
  twitterUrl: text("twitter_url"),
  facebookUrl: text("facebook_url"),
  instagramUrl: text("instagram_url"),
  lastContactedDate: timestamp("last_contacted_date"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  createdBy: integer("created_by").references(() => users.id),
  assignedTo: integer("assigned_to").references(() => users.id),
});

// Contact relations
export const contactsRelations = relations(contacts, ({ one, many }) => ({
  company: one(companies, { fields: [contacts.companyId], references: [companies.id] }),
  activities: many(activities),
  opportunities: many(opportunities)
}));

// Tags for contacts, companies, and opportunities
export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  color: text("color").default('#3b82f6'),
  category: text("category"), // For grouping tags (e.g., industry, interest, etc.)
  createdAt: timestamp("created_at").notNull().defaultNow(),
  createdBy: integer("created_by").references(() => users.id),
});

// Tag relations for contacts
export const contactTags = pgTable("contact_tags", {
  id: serial("id").primaryKey(),
  contactId: integer("contact_id").notNull().references(() => contacts.id),
  tagId: integer("tag_id").notNull().references(() => tags.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Tag relations for companies
export const companyTags = pgTable("company_tags", {
  id: serial("id").primaryKey(),
  companyId: integer("company_id").notNull().references(() => companies.id),
  tagId: integer("tag_id").notNull().references(() => tags.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Projects (Orders/Opportunities)
export const opportunities = pgTable("opportunities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  contactId: integer("contact_id").references(() => contacts.id),
  companyId: integer("company_id").references(() => companies.id),
  solarServices: jsonb("solar_services"), // Array of solar service types
  status: projectStatusEnum("status").notNull().default('pending'),
  amount: decimal("amount", { precision: 10, scale: 2 }),
  probability: integer("probability").default(50), // Percentage chance of closing
  expectedCloseDate: date("expected_close_date"),
  actualCloseDate: date("actual_close_date"),
  description: text("description"),
  source: leadSourceEnum("source").default('website'),
  location: text("location"),
  startDate: timestamp("start_date"),
  completionDate: timestamp("completion_date"),
  budget: text("budget"),
  notes: text("notes"),
  products: jsonb("products"), // JSON array of product IDs and quantities
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  createdBy: integer("created_by").references(() => users.id),
  assignedTo: integer("assigned_to").references(() => users.id),
});

// Opportunity relations
export const opportunitiesRelations = relations(opportunities, ({ one, many }) => ({
  contact: one(contacts, { fields: [opportunities.contactId], references: [contacts.id] }),
  company: one(companies, { fields: [opportunities.companyId], references: [companies.id] }),
  activities: many(activities),
  files: many(opportunityFiles)
}));

// Opportunity tags
export const opportunityTags = pgTable("opportunity_tags", {
  id: serial("id").primaryKey(),
  opportunityId: integer("opportunity_id").notNull().references(() => opportunities.id),
  tagId: integer("tag_id").notNull().references(() => tags.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Files related to opportunities
export const opportunityFiles = pgTable("opportunity_files", {
  id: serial("id").primaryKey(),
  opportunityId: integer("opportunity_id").notNull().references(() => opportunities.id),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(),
  fileUrl: text("file_url").notNull(),
  fileSize: integer("file_size"), // In bytes
  description: text("description"),
  uploadedBy: integer("uploaded_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Orders
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  customerId: integer("customer_id").references(() => contacts.id),
  email: text("email").notNull(),
  status: orderStatusEnum("status").notNull().default('pending'),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
  tax: decimal("tax", { precision: 10, scale: 2 }).notNull(),
  shipping: decimal("shipping", { precision: 10, scale: 2 }).notNull(),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  shippingAddress: jsonb("shipping_address").notNull(),
  billingAddress: jsonb("billing_address"),
  paymentMethod: text("payment_method").notNull(),
  paymentStatus: paymentStatusEnum("payment_status").notNull().default('pending'),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Order relations
export const ordersRelations = relations(orders, ({ one, many }) => ({
  customer: one(contacts, { fields: [orders.customerId], references: [contacts.id] }),
  items: many(orderItems)
}));

// Order items
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id),
  productId: integer("product_id").references(() => products.id),
  sku: text("sku").notNull(),
  name: text("name").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  quantity: integer("quantity").notNull(),
  subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
});

// Order item relations
export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, { fields: [orderItems.orderId], references: [orders.id] }),
  product: one(products, { fields: [orderItems.productId], references: [products.id] })
}));

// Tasks for CRM
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  priority: taskPriorityEnum("priority").default('medium'),
  status: taskStatusEnum("status").default('pending'),
  dueDate: timestamp("due_date"),
  completedDate: timestamp("completed_date"),
  reminderDate: timestamp("reminder_date"),
  contactId: integer("contact_id").references(() => contacts.id),
  companyId: integer("company_id").references(() => companies.id),
  opportunityId: integer("opportunity_id").references(() => opportunities.id),
  assignedBy: integer("assigned_by").notNull().references(() => users.id),
  assignedTo: integer("assigned_to").notNull().references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Task relations
export const tasksRelations = relations(tasks, ({ one }) => ({
  contact: one(contacts, { fields: [tasks.contactId], references: [contacts.id] }),
  company: one(companies, { fields: [tasks.companyId], references: [companies.id] }),
  opportunity: one(opportunities, { fields: [tasks.opportunityId], references: [opportunities.id] }),
  assignedBy: one(users, { fields: [tasks.assignedBy], references: [users.id] }),
  assignedTo: one(users, { fields: [tasks.assignedTo], references: [users.id] })
}));

// Customer document categories for solar business
export const documentCategoryEnum = pgEnum('document_category', [
  'contract', 'permit', 'inspection', 'invoice', 'quote', 'site_survey', 
  'electrical_diagram', 'roof_plan', 'warranty', 'maintenance_log', 
  'correspondence', 'permit_application', 'utility_agreement', 'financing',
  'insurance', 'other'
]);

export const documentStatusEnum = pgEnum('document_status', [
  'pending_processing', 'processing', 'processed', 'failed', 'archived'
]);

// Master customer database - optimized for 25+ years of solar business data
export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  // Customer identification
  firstName: text("first_name"),
  lastName: text("last_name"),
  fullName: text("full_name"), // Combined for search - indexed
  email: text("email"),
  phone: text("phone"),
  address: text("address").notNull(), // Primary unique identifier - indexed
  city: text("city"),
  state: text("state").default('CA'), // California default for Shasta County
  zipCode: text("zip_code"),
  county: text("county").default('Shasta'),
  
  // Solar installation details - core business data
  installationYear: integer("installation_year"), // Indexed for year-based queries
  installationMonth: integer("installation_month"), // For seasonal analysis
  installationDate: date("installation_date"), // Exact installation date
  systemSize: decimal("system_size", { precision: 8, scale: 2 }), // kW capacity
  panelCount: integer("panel_count"),
  panelBrand: text("panel_brand"),
  inverterType: text("inverter_type"),
  inverterBrand: text("inverter_brand"),
  batterySystem: boolean("battery_system").default(false),
  batteryCapacity: decimal("battery_capacity", { precision: 8, scale: 2 }), // kWh
  roofType: text("roof_type"), // tile, shingle, metal, etc.
  systemType: systemTypeEnum("system_type").default('grid_tied'),
  
  // Financial data
  systemCost: decimal("system_cost", { precision: 10, scale: 2 }),
  incentivesReceived: decimal("incentives_received", { precision: 10, scale: 2 }),
  financingType: text("financing_type"), // cash, loan, lease, PPA
  warrantyExpiration: date("warranty_expiration"),
  
  // Service history tracking
  lastServiceDate: date("last_service_date"),
  nextMaintenanceDue: date("next_maintenance_due"),
  serviceCallsCount: integer("service_calls_count").default(0),
  
  // Data organization for 25+ years
  customerSince: date("customer_since"), // Indexed for historical queries
  accountStatus: text("account_status").default('active'), // active, inactive, moved
  lifetimeValue: decimal("lifetime_value", { precision: 10, scale: 2 }), // Total revenue
  
  // Document and communication tracking
  totalDocuments: integer("total_documents").default(0),
  lastDocumentDate: timestamp("last_document_date"),
  lastContactDate: timestamp("last_contact_date"),
  communicationPreference: text("communication_preference").default('email'), // email, phone, mail
  
  // Search optimization
  searchVector: text("search_vector"), // Full-text search optimization
  tags: text("tags").array(), // Flexible tagging for categorization
  
  // Metadata
  dataSource: text("data_source").default('website'), // website, referral, import, etc.
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  
  // Legacy system integration
  legacyCustomerId: text("legacy_customer_id"), // For migrating old systems
  importedAt: timestamp("imported_at"),
}, (table) => ({
  // High-performance indexes for 25+ years of data
  installationYearIdx: index("customers_installation_year_idx").on(table.installationYear),
  customerSinceIdx: index("customers_customer_since_idx").on(table.customerSince),
  addressIdx: uniqueIndex("customers_address_unique_idx").on(table.address),
  fullNameIdx: index("customers_full_name_idx").on(table.fullName),
  zipCodeIdx: index("customers_zip_code_idx").on(table.zipCode),
  accountStatusIdx: index("customers_account_status_idx").on(table.accountStatus),
  systemSizeIdx: index("customers_system_size_idx").on(table.systemSize),
  lastServiceDateIdx: index("customers_last_service_date_idx").on(table.lastServiceDate),
  // Composite indexes for complex queries
  yearStatusIdx: index("customers_year_status_idx").on(table.installationYear, table.accountStatus),
  locationServiceIdx: index("customers_location_service_idx").on(table.zipCode, table.lastServiceDate),
}));

// Customer documents - all files associated with each customer
export const customerDocuments = pgTable("customer_documents", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id").notNull().references(() => customers.id),
  fileName: text("file_name").notNull(),
  originalFileName: text("original_file_name").notNull(),
  filePath: text("file_path").notNull(),
  fileType: text("file_type").notNull(), // pdf, jpg, png, doc, xls, etc.
  fileSize: integer("file_size"), // bytes
  documentCategory: documentCategoryEnum("document_category"),
  documentYear: integer("document_year"),
  extractedText: text("extracted_text"), // AI extracted text content
  extractedData: jsonb("extracted_data"), // Structured data extracted by AI
  processingStatus: documentStatusEnum("processing_status").default('pending_processing'),
  processingError: text("processing_error"),
  confidence: decimal("confidence", { precision: 3, scale: 2 }), // AI confidence score 0-1
  // Metadata for matching and organization
  customerNameFound: text("customer_name_found"),
  customerAddressFound: text("customer_address_found"),
  documentDate: date("document_date"),
  documentValue: decimal("document_value", { precision: 10, scale: 2 }), // For contracts, invoices
  tags: jsonb("tags"), // Array of tags for categorization
  searchableContent: text("searchable_content"), // Combined text for full-text search
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  processedAt: timestamp("processed_at"),
  processedBy: text("processed_by"), // AI agent identifier
});

// Document processing jobs queue
export const documentProcessingJobs = pgTable("document_processing_jobs", {
  id: serial("id").primaryKey(),
  batchId: text("batch_id"), // For grouping related uploads
  documentId: integer("document_id").references(() => customerDocuments.id),
  status: documentStatusEnum("status").default('pending_processing'),
  priority: integer("priority").default(5), // 1-10, higher is more important
  attempts: integer("attempts").default(0),
  maxAttempts: integer("max_attempts").default(3),
  lastError: text("last_error"),
  processingStartedAt: timestamp("processing_started_at"),
  processingCompletedAt: timestamp("processing_completed_at"),
  aiModel: text("ai_model"), // Which AI model was used
  processingTime: integer("processing_time"), // milliseconds
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Customer relations
export const customersRelations = relations(customers, ({ many }) => ({
  documents: many(customerDocuments),
  relatedContacts: many(contacts) // Link to CRM contacts
}));

// Customer document relations
export const customerDocumentsRelations = relations(customerDocuments, ({ one }) => ({
  customer: one(customers, { fields: [customerDocuments.customerId], references: [customers.id] })
}));

// Form submissions from all website pages
export const formSubmissions = pgTable("form_submissions", {
  id: serial("id").primaryKey(),
  formType: text("form_type").notNull(), // contact, solar_quote, fire_prevention, etc.
  sourcePage: text("source_page").notNull(), // URL where form was submitted
  contactId: integer("contact_id").references(() => contacts.id), // Links to contact if created
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  company: text("company"),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  message: text("message"),
  interestedServices: jsonb("interested_services"), // Array of services
  propertyType: text("property_type"),
  propertySize: text("property_size"),
  energyUsage: text("energy_usage"),
  budget: text("budget"),
  timeline: text("timeline"),
  additionalData: jsonb("additional_data"), // Any extra form fields
  processed: boolean("processed").default(false), // Whether this has been converted to contact/opportunity
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Activities and interactions
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // email, call, meeting, note, etc.
  subject: text("subject").notNull(),
  details: text("details"),
  contactId: integer("contact_id").references(() => contacts.id),
  companyId: integer("company_id").references(() => companies.id),
  opportunityId: integer("opportunity_id").references(() => opportunities.id),
  formSubmissionId: integer("form_submission_id").references(() => formSubmissions.id),
  scheduledAt: timestamp("scheduled_at"),
  completedAt: timestamp("completed_at"),
  duration: integer("duration"), // In minutes
  outcome: text("outcome"),
  createdBy: integer("created_by").notNull().references(() => users.id),
  assignedTo: integer("assigned_to").references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Activity relations
export const activitiesRelations = relations(activities, ({ one }) => ({
  contact: one(contacts, { fields: [activities.contactId], references: [contacts.id] }),
  company: one(companies, { fields: [activities.companyId], references: [companies.id] }),
  opportunity: one(opportunities, { fields: [activities.opportunityId], references: [opportunities.id] }),
  createdBy: one(users, { fields: [activities.createdBy], references: [users.id] }),
  assignedTo: one(users, { fields: [activities.assignedTo], references: [users.id] })
}));

// Social media calendar
export const socialMediaPosts = pgTable("social_media_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  videoUrl: text("video_url"),
  platform: socialMediaTypeEnum("platform").notNull(),
  scheduledDate: timestamp("scheduled_date").notNull(),
  publishedDate: timestamp("published_date"),
  status: text("status").default('draft'), // draft, scheduled, published, cancelled
  campaignId: integer("campaign_id").references(() => marketingCampaigns.id),
  analyticsData: jsonb("analytics_data"), // Likes, shares, comments, etc.
  createdBy: integer("created_by").notNull().references(() => users.id),
  assignedTo: integer("assigned_to").references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Marketing campaigns
export const marketingCampaigns = pgTable("marketing_campaigns", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  type: text("type").notNull(), // email, social, event, etc.
  status: text("status").default('draft'), // draft, active, completed, cancelled
  budget: decimal("budget", { precision: 10, scale: 2 }),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  targetAudience: jsonb("target_audience"),
  goals: jsonb("goals"),
  results: jsonb("results"),
  createdBy: integer("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Project files (legacy support, use opportunityFiles for new implementations)
export const projectFiles = pgTable("project_files", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(),
  fileUrl: text("file_url").notNull(),
  uploadedBy: integer("uploaded_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Project updates (legacy support)
export const projectUpdates = pgTable("project_updates", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  message: text("message").notNull(),
  createdBy: integer("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Legacy projects (for backward compatibility)
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  clientId: integer("client_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  description: text("description"),
  location: text("location"),
  status: projectStatusEnum("status").notNull().default('pending'),
  startDate: timestamp("start_date"),
  completionDate: timestamp("completion_date"),
  budget: text("budget"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Analytics dashboards
export const dashboards = pgTable("dashboards", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  config: jsonb("config").notNull(), // Dashboard configuration
  isDefault: boolean("is_default").default(false),
  createdBy: integer("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  firstName: true,
  lastName: true,
  companyName: true,
  phone: true,
  address: true,
  city: true,
  state: true,
  zipCode: true,
  userType: true,
  jobTitle: true,
  department: true,
  avatarUrl: true,
  isActive: true
});

export const insertCompanySchema = createInsertSchema(companies).pick({
  name: true,
  industry: true,
  website: true,
  phone: true,
  address: true,
  city: true,
  state: true,
  zipCode: true,
  country: true,
  description: true,
  logoUrl: true,
  linkedinUrl: true,
  facebookUrl: true,
  twitterUrl: true,
  instagramUrl: true,
  annualRevenue: true,
  employeeCount: true,
  notes: true,
  createdBy: true
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  companyId: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  mobilePhone: true,
  jobTitle: true,
  department: true,
  address: true,
  city: true,
  state: true,
  zipCode: true,
  country: true,
  website: true,
  source: true,
  status: true,
  interestedInServices: true,
  notes: true,
  birthday: true,
  linkedinUrl: true,
  twitterUrl: true,
  facebookUrl: true,
  instagramUrl: true,
  lastContactedDate: true,
  createdBy: true,
  assignedTo: true
});

export const insertTagSchema = createInsertSchema(tags).pick({
  name: true,
  color: true,
  category: true,
  createdBy: true
});

export const insertOpportunitySchema = createInsertSchema(opportunities).pick({
  name: true,
  contactId: true,
  companyId: true,
  solarServices: true,
  status: true,
  amount: true,
  probability: true,
  expectedCloseDate: true,
  actualCloseDate: true,
  description: true,
  source: true,
  location: true,
  startDate: true,
  completionDate: true,
  budget: true,
  notes: true,
  products: true,
  createdBy: true,
  assignedTo: true
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
  updatedAt: true
}).extend({
  shippingAddress: z.object({
    name: z.string().min(1, "Name is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(2, "State is required"),
    zip: z.string().regex(/^\d{5}$/, "ZIP code must be 5 digits"),
    phone: z.string().min(10, "Phone number is required")
  }),
  billingAddress: z.object({
    name: z.string().min(1, "Name is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(2, "State is required"),
    zip: z.string().regex(/^\d{5}$/, "ZIP code must be 5 digits"),
    phone: z.string().min(10, "Phone number is required")
  }).optional()
});

export const insertOrderItemSchema = createInsertSchema(orderItems).omit({
  id: true
});

export const insertTaskSchema = createInsertSchema(tasks).pick({
  title: true,
  description: true,
  priority: true,
  status: true,
  dueDate: true,
  reminderDate: true,
  contactId: true,
  companyId: true,
  opportunityId: true,
  assignedBy: true,
  assignedTo: true
});

// Form submission schema
export const insertFormSubmissionSchema = createInsertSchema(formSubmissions).pick({
  formType: true,
  sourcePage: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  company: true,
  address: true,
  city: true,
  state: true,
  zipCode: true,
  message: true,
  interestedServices: true,
  propertyType: true,
  propertySize: true,
  energyUsage: true,
  budget: true,
  timeline: true,
  additionalData: true
});

export const insertActivitySchema = createInsertSchema(activities).pick({
  type: true,
  subject: true,
  details: true,
  contactId: true,
  companyId: true,
  opportunityId: true,
  scheduledAt: true,
  completedAt: true,
  duration: true,
  outcome: true,
  createdBy: true,
  assignedTo: true
});

export const insertSocialMediaPostSchema = createInsertSchema(socialMediaPosts).pick({
  title: true,
  content: true,
  imageUrl: true,
  videoUrl: true,
  platform: true,
  scheduledDate: true,
  publishedDate: true,
  status: true,
  campaignId: true,
  analyticsData: true,
  createdBy: true,
  assignedTo: true
});

export const insertMarketingCampaignSchema = createInsertSchema(marketingCampaigns).pick({
  name: true,
  description: true,
  type: true,
  status: true,
  budget: true,
  startDate: true,
  endDate: true,
  targetAudience: true,
  goals: true,
  results: true,
  createdBy: true
});

export const insertDashboardSchema = createInsertSchema(dashboards).pick({
  name: true,
  description: true,
  config: true,
  isDefault: true,
  createdBy: true
});

// Legacy schemas for backward compatibility
export const insertProjectSchema = createInsertSchema(projects).pick({
  clientId: true,
  name: true,
  description: true,
  location: true,
  status: true,
  startDate: true,
  completionDate: true,
  budget: true,
  notes: true,
});

export const insertProjectFileSchema = createInsertSchema(projectFiles).pick({
  projectId: true,
  fileName: true,
  fileType: true,
  fileUrl: true,
  uploadedBy: true,
});

export const insertProjectUpdateSchema = createInsertSchema(projectUpdates).pick({
  projectId: true,
  message: true,
  createdBy: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCompany = z.infer<typeof insertCompanySchema>;
export type Company = typeof companies.$inferSelect;

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export type InsertTag = z.infer<typeof insertTagSchema>;
export type Tag = typeof tags.$inferSelect;

export type InsertOpportunity = z.infer<typeof insertOpportunitySchema>;
export type Opportunity = typeof opportunities.$inferSelect;

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems.$inferSelect;

export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;

export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;

export type InsertFormSubmission = z.infer<typeof insertFormSubmissionSchema>;
export type FormSubmission = typeof formSubmissions.$inferSelect;

export type InsertSocialMediaPost = z.infer<typeof insertSocialMediaPostSchema>;
export type SocialMediaPost = typeof socialMediaPosts.$inferSelect;

export type InsertMarketingCampaign = z.infer<typeof insertMarketingCampaignSchema>;
export type MarketingCampaign = typeof marketingCampaigns.$inferSelect;

export type InsertDashboard = z.infer<typeof insertDashboardSchema>;
export type Dashboard = typeof dashboards.$inferSelect;

// Legacy types for backward compatibility
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertProjectFile = z.infer<typeof insertProjectFileSchema>;
export type ProjectFile = typeof projectFiles.$inferSelect;

export type InsertProjectUpdate = z.infer<typeof insertProjectUpdateSchema>;
export type ProjectUpdate = typeof projectUpdates.$inferSelect;

// Customer and Document Management schemas
export const insertCustomerSchema = createInsertSchema(customers).pick({
  firstName: true,
  lastName: true,
  fullName: true,
  email: true,
  phone: true,
  address: true,
  city: true,
  state: true,
  zipCode: true,
  installationYear: true,
  systemSize: true,
  panelCount: true,
  inverterType: true,
  batterySystem: true,
  customerSince: true,
  notes: true,
});

export const insertCustomerDocumentSchema = createInsertSchema(customerDocuments).pick({
  customerId: true,
  fileName: true,
  originalFileName: true,
  filePath: true,
  fileType: true,
  fileSize: true,
  documentCategory: true,
  documentYear: true,
  extractedText: true,
  extractedData: true,
  customerNameFound: true,
  customerAddressFound: true,
  documentDate: true,
  documentValue: true,
  tags: true,
  searchableContent: true,
});

export const insertDocumentProcessingJobSchema = createInsertSchema(documentProcessingJobs).pick({
  batchId: true,
  documentId: true,
  priority: true,
  aiModel: true,
});

export type InsertCustomer = z.infer<typeof insertCustomerSchema>;
export type Customer = typeof customers.$inferSelect;

export type InsertCustomerDocument = z.infer<typeof insertCustomerDocumentSchema>;
export type CustomerDocument = typeof customerDocuments.$inferSelect;

export type InsertDocumentProcessingJob = z.infer<typeof insertDocumentProcessingJobSchema>;
export type DocumentProcessingJob = typeof documentProcessingJobs.$inferSelect;

// Specialized Professionals Tables

// Painters Network professionals
export const painters = pgTable("painters", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  website: text("website"),
  licenseNumber: text("license_number"),
  licenseExpiryDate: date("license_expiry_date"),
  insuranceInfo: text("insurance_info"),
  yearsInBusiness: integer("years_in_business"),
  specialties: jsonb("specialties"), // Array of specialties (residential, commercial, industrial, etc.)
  serviceAreas: jsonb("service_areas"), // Array of service area zip codes
  teamSize: integer("team_size"),
  hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 }),
  minProjectSize: decimal("min_project_size", { precision: 10, scale: 2 }),
  portfolio: jsonb("portfolio"), // Array of URLs to portfolio images
  certifications: jsonb("certifications"), // Array of certification names/details
  verificationStatus: verificationStatusEnum("verification_status").default('pending'),
  notes: text("notes"),
  rating: integer("rating"), // 1-5 star rating
  reviewCount: integer("review_count").default(0),
  completedProjects: integer("completed_projects").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Pool professional workers
export const poolProfessionals = pgTable("pool_professionals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  website: text("website"),
  licenseNumber: text("license_number"),
  licenseExpiryDate: date("license_expiry_date"),
  insuranceInfo: text("insurance_info"),
  yearsInBusiness: integer("years_in_business"),
  specialties: jsonb("specialties"), // Array of specialties (residential, commercial, etc.)
  serviceAreas: jsonb("service_areas"), // Array of service area zip codes
  poolTypes: jsonb("pool_types"), // Types of pools they service
  materialsExperience: jsonb("materials_experience"), // Array of materials they're experienced with
  hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 }),
  certifications: jsonb("certifications"), // Array of certification names/details
  verificationStatus: verificationStatusEnum("verification_status").default('pending'),
  notes: text("notes"),
  rating: integer("rating"), // 1-5 star rating
  reviewCount: integer("review_count").default(0),
  completedProjects: integer("completed_projects").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Municipal consultants and lobbyists
export const municipalityProfessionals = pgTable("municipality_professionals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  website: text("website"),
  professionalType: text("professional_type").notNull(), // consultant or lobbyist
  specialties: jsonb("specialties"), // Array of specialties (water infrastructure, etc.)
  jurisdictions: jsonb("jurisdictions"), // Array of jurisdictions they operate in
  clientTypes: jsonb("client_types"), // Types of clients they represent
  credentials: text("credentials"),
  experienceYears: integer("experience_years"),
  registrationNumber: text("registration_number"), // Lobbyist registration number if applicable
  verificationStatus: verificationStatusEnum("verification_status").default('pending'),
  projectExperience: jsonb("project_experience"), // Past projects or experiences
  notes: text("notes"),
  rating: integer("rating"), // 1-5 star rating
  reviewCount: integer("review_count").default(0),
  successfulProjects: integer("successful_projects").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Construction distributors
export const constructionDistributors = pgTable("construction_distributors", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  website: text("website"),
  businessType: text("business_type").notNull(), // retailer, wholesaler, etc.
  foundedYear: integer("founded_year"),
  employeeCount: integer("employee_count"),
  annualRevenue: text("annual_revenue"),
  coverageAreas: jsonb("coverage_areas"), // Geographic areas they serve
  productCategories: jsonb("product_categories"), // Types of products they distribute
  certifications: jsonb("certifications"), // Business certifications
  verificationStatus: verificationStatusEnum("verification_status").default('pending'),
  notes: text("notes"),
  warehouseLocations: jsonb("warehouse_locations"), // Array of locations
  deliveryOptions: jsonb("delivery_options"), // Delivery service details
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Professional reviews
export const professionalReviews = pgTable("professional_reviews", {
  id: serial("id").primaryKey(),
  professionalType: text("professional_type").notNull(), // painter, pool_professional, municipality_professional, construction_distributor
  professionalId: integer("professional_id").notNull(),
  userId: integer("user_id").references(() => users.id), // Person leaving the review
  rating: integer("rating").notNull(), // 1-5 stars
  title: text("title"),
  comment: text("comment"),
  projectId: integer("project_id").references(() => projects.id),
  reviewDate: timestamp("review_date").notNull().defaultNow(),
  status: reviewStatusEnum("status").default('pending'),
  response: text("response"), // Professional's response to the review
  responseDate: timestamp("response_date"),
  helpful: integer("helpful").default(0), // Number of users who found this review helpful
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Relations
export const paintersRelations = relations(painters, ({ one }) => ({
  user: one(users, { fields: [painters.userId], references: [users.id] }),
}));

export const poolProfessionalsRelations = relations(poolProfessionals, ({ one }) => ({
  user: one(users, { fields: [poolProfessionals.userId], references: [users.id] }),
}));

export const municipalityProfessionalsRelations = relations(municipalityProfessionals, ({ one }) => ({
  user: one(users, { fields: [municipalityProfessionals.userId], references: [users.id] }),
}));

export const constructionDistributorsRelations = relations(constructionDistributors, ({ one }) => ({
  user: one(users, { fields: [constructionDistributors.userId], references: [users.id] }),
}));

// Create insert schemas for the professional tables
export const insertPainterSchema = createInsertSchema(painters).pick({
  companyName: true,
  contactName: true,
  email: true,
  phone: true,
  address: true,
  city: true,
  state: true,
  zipCode: true,
  website: true,
  licenseNumber: true,
  licenseExpiryDate: true,
  insuranceInfo: true,
  yearsInBusiness: true,
  specialties: true,
  serviceAreas: true,
  teamSize: true,
  hourlyRate: true,
  minProjectSize: true,
  portfolio: true,
  certifications: true,
  notes: true,
});

export const insertPoolProfessionalSchema = createInsertSchema(poolProfessionals).pick({
  companyName: true,
  contactName: true,
  email: true,
  phone: true,
  address: true,
  city: true,
  state: true,
  zipCode: true,
  website: true,
  licenseNumber: true,
  licenseExpiryDate: true,
  insuranceInfo: true,
  yearsInBusiness: true,
  specialties: true,
  serviceAreas: true,
  poolTypes: true,
  materialsExperience: true,
  hourlyRate: true,
  certifications: true,
  notes: true,
});

export const insertMunicipalityProfessionalSchema = createInsertSchema(municipalityProfessionals).pick({
  companyName: true,
  contactName: true,
  email: true,
  phone: true,
  address: true,
  city: true,
  state: true,
  zipCode: true,
  website: true,
  professionalType: true,
  specialties: true,
  jurisdictions: true,
  clientTypes: true,
  credentials: true,
  experienceYears: true,
  registrationNumber: true,
  projectExperience: true,
  notes: true,
});

export const insertConstructionDistributorSchema = createInsertSchema(constructionDistributors).pick({
  companyName: true,
  contactName: true,
  email: true,
  phone: true,
  address: true,
  city: true,
  state: true,
  zipCode: true,
  website: true,
  businessType: true,
  foundedYear: true,
  employeeCount: true,
  annualRevenue: true,
  coverageAreas: true,
  productCategories: true,
  certifications: true,
  notes: true,
  warehouseLocations: true,
  deliveryOptions: true,
});

export const insertProfessionalReviewSchema = createInsertSchema(professionalReviews).pick({
  professionalType: true,
  professionalId: true,
  rating: true,
  title: true,
  comment: true,
  projectId: true,
});

// Export types for the professional tables
export type InsertPainter = z.infer<typeof insertPainterSchema>;
export type Painter = typeof painters.$inferSelect;

export type InsertPoolProfessional = z.infer<typeof insertPoolProfessionalSchema>;
export type PoolProfessional = typeof poolProfessionals.$inferSelect;

export type InsertMunicipalityProfessional = z.infer<typeof insertMunicipalityProfessionalSchema>;
export type MunicipalityProfessional = typeof municipalityProfessionals.$inferSelect;

export type InsertConstructionDistributor = z.infer<typeof insertConstructionDistributorSchema>;
export type ConstructionDistributor = typeof constructionDistributors.$inferSelect;

// Marina professionals
export const marinaProfessionals = pgTable("marina_professionals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  website: text("website"),
  serviceTypes: jsonb("service_types"), // Array of marina service types (dock maintenance, boat repair, etc.)
  certifications: jsonb("certifications"), // Array of certifications
  experienceYears: integer("experience_years"),
  specializations: jsonb("specializations"), // Array of specializations
  workingHours: text("working_hours"),
  emergencyAvailable: boolean("emergency_available").default(false),
  insuranceInfo: text("insurance_info"),
  equipmentOwned: jsonb("equipment_owned"), // Array of equipment
  preferredBoatTypes: jsonb("preferred_boat_types"), // Types of boats they typically work with
  marinaTypes: jsonb("marina_types"), // Types of marinas they service
  serviceAreas: jsonb("service_areas"), // Geographic areas they serve
  licenseNumber: text("license_number"),
  verificationStatus: verificationStatusEnum("verification_status").default('pending'),
  notes: text("notes"),
  rating: integer("rating"), // 1-5 star rating
  reviewCount: integer("review_count").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Mobile home professionals
export const mobileHomeProfessionals = pgTable("mobile_home_professionals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  address: text("address"),
  city: text("city"),
  state: text("state"),
  zipCode: text("zip_code"),
  website: text("website"),
  licenseNumber: text("license_number"),
  licenseExpiryDate: date("license_expiry_date"),
  insuranceInfo: text("insurance_info"),
  yearsInBusiness: integer("years_in_business"),
  specialties: jsonb("specialties"), // Array of specialties (residential, commercial, etc.)
  serviceAreas: jsonb("service_areas"), // Geographic areas they serve
  materialTypes: jsonb("material_types"), // Types of materials they work with
  installationTypes: jsonb("installation_types"), // Types of installations they perform
  repairServices: jsonb("repair_services"), // Types of repair services offered
  emergencyService: boolean("emergency_service").default(false),
  hourlyRate: decimal("hourly_rate", { precision: 10, scale: 2 }),
  mobileHomeTypes: jsonb("mobile_home_types"), // Types of mobile homes they service
  rvTypes: jsonb("rv_types"), // Types of RVs they service
  certifications: jsonb("certifications"), // Array of certifications
  manufacturerAuthorizations: jsonb("manufacturer_authorizations"), // Mobile home manufacturers they're authorized for
  verificationStatus: verificationStatusEnum("verification_status").default('pending'),
  notes: text("notes"),
  rating: integer("rating"), // 1-5 star rating
  reviewCount: integer("review_count").default(0),
  completedProjects: integer("completed_projects").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Fire prevention homeowners
export const firePreventionHomeowners = pgTable("fire_prevention_homeowners", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  zipCode: text("zip_code").notNull(),
  propertyType: text("property_type").notNull(), // Single family, multi-family, etc.
  propertySize: text("property_size"), // In acres or square feet
  constructionMaterial: text("construction_material"), // Wood, brick, etc.
  roofMaterial: text("roof_material"), 
  yearBuilt: integer("year_built"),
  fireSeverityZone: text("fire_severity_zone"), // Very High, High, Moderate, etc.
  vegetationTypes: jsonb("vegetation_types"), // Types of vegetation surrounding property
  distanceToForest: text("distance_to_forest"),
  previousFireDamage: boolean("previous_fire_damage").default(false),
  fireInsurance: boolean("fire_insurance").default(false),
  homeownersAssociation: boolean("homeowners_association").default(false),
  evacuationPlan: boolean("evacuation_plan").default(false),
  existingFireProtection: jsonb("existing_fire_protection"), // Sprinklers, fire-resistant materials, etc.
  desiredServices: jsonb("desired_services"), // Assessment, application, consultation
  projectTimeline: text("project_timeline"),
  budgetRange: text("budget_range"),
  additionalComments: text("additional_comments"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Relations for marina professionals
export const marinaProfessionalsRelations = relations(marinaProfessionals, ({ one }) => ({
  user: one(users, { fields: [marinaProfessionals.userId], references: [users.id] }),
}));

// Relations for mobile home professionals
export const mobileHomeProfessionalsRelations = relations(mobileHomeProfessionals, ({ one }) => ({
  user: one(users, { fields: [mobileHomeProfessionals.userId], references: [users.id] }),
}));

// Relations for fire prevention homeowners
export const firePreventionHomeownersRelations = relations(firePreventionHomeowners, ({ one }) => ({
  user: one(users, { fields: [firePreventionHomeowners.userId], references: [users.id] }),
}));

// Insert schemas for the new tables
export const insertMarinaProfessionalSchema = createInsertSchema(marinaProfessionals).pick({
  companyName: true,
  contactName: true,
  email: true,
  phone: true,
  address: true,
  city: true,
  state: true,
  zipCode: true,
  website: true,
  serviceTypes: true,
  certifications: true,
  experienceYears: true,
  specializations: true,
  workingHours: true,
  emergencyAvailable: true,
  insuranceInfo: true,
  equipmentOwned: true,
  preferredBoatTypes: true,
  marinaTypes: true,
  serviceAreas: true,
  licenseNumber: true,
  notes: true,
});

export const insertMobileHomeProfessionalSchema = createInsertSchema(mobileHomeProfessionals).pick({
  companyName: true,
  contactName: true,
  email: true,
  phone: true,
  address: true,
  city: true,
  state: true,
  zipCode: true,
  website: true,
  licenseNumber: true,
  licenseExpiryDate: true,
  insuranceInfo: true,
  yearsInBusiness: true,
  specialties: true,
  serviceAreas: true,
  materialTypes: true,
  installationTypes: true,
  repairServices: true,
  emergencyService: true,
  hourlyRate: true,
  mobileHomeTypes: true,
  rvTypes: true,
  certifications: true,
  manufacturerAuthorizations: true,
  notes: true,
});

export const insertFirePreventionHomeownerSchema = createInsertSchema(firePreventionHomeowners).pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  address: true,
  city: true,
  state: true,
  zipCode: true,
  propertyType: true,
  propertySize: true,
  constructionMaterial: true,
  roofMaterial: true,
  yearBuilt: true,
  fireSeverityZone: true,
  vegetationTypes: true,
  distanceToForest: true,
  previousFireDamage: true,
  fireInsurance: true,
  homeownersAssociation: true,
  evacuationPlan: true,
  existingFireProtection: true,
  desiredServices: true,
  projectTimeline: true,
  budgetRange: true,
  additionalComments: true,
});

// Type exports for the new tables
export type InsertMarinaProfessional = z.infer<typeof insertMarinaProfessionalSchema>;
export type MarinaProfessional = typeof marinaProfessionals.$inferSelect;

export type InsertMobileHomeProfessional = z.infer<typeof insertMobileHomeProfessionalSchema>;
export type MobileHomeProfessional = typeof mobileHomeProfessionals.$inferSelect;

export type InsertFirePreventionHomeowner = z.infer<typeof insertFirePreventionHomeownerSchema>;
export type FirePreventionHomeowner = typeof firePreventionHomeowners.$inferSelect;

export type InsertProfessionalReview = z.infer<typeof insertProfessionalReviewSchema>;
export type ProfessionalReview = typeof professionalReviews.$inferSelect;

// Solar Installation Systems for Advance Power Redding
export const solarInstallations = pgTable("solar_installations", {
  id: serial("id").primaryKey(),
  contactId: integer("contact_id").notNull().references(() => contacts.id),
  opportunityId: integer("opportunity_id").references(() => opportunities.id),
  systemType: systemTypeEnum("system_type").notNull(),
  systemSize: decimal("system_size", { precision: 8, scale: 2 }), // kW
  panelCount: integer("panel_count"),
  panelWattage: integer("panel_wattage"),
  inverterType: text("inverter_type"),
  batteryType: batteryTypeEnum("battery_type"),
  batteryCapacity: decimal("battery_capacity", { precision: 8, scale: 2 }), // kWh
  installationStatus: installationStatusEnum("installation_status").default('quoted'),
  installationDate: date("installation_date"),
  completionDate: date("completion_date"),
  warrantyYears: integer("warranty_years").default(25),
  estimatedAnnualProduction: decimal("estimated_annual_production", { precision: 10, scale: 2 }), // kWh
  estimatedMonthlySavings: decimal("estimated_monthly_savings", { precision: 8, scale: 2 }),
  totalSystemCost: decimal("total_system_cost", { precision: 10, scale: 2 }),
  incentivesApplied: jsonb("incentives_applied"), // Array of incentive types
  permitsRequired: jsonb("permits_required"), // Array of permit types
  permitStatus: text("permit_status").default('pending'),
  inspectionDate: date("inspection_date"),
  inspectionStatus: text("inspection_status"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  createdBy: integer("created_by").references(() => users.id),
  assignedTechnician: integer("assigned_technician").references(() => users.id),
});

// Customer Energy Data
export const energyReadings = pgTable("energy_readings", {
  id: serial("id").primaryKey(),
  installationId: integer("installation_id").notNull().references(() => solarInstallations.id),
  readingDate: date("reading_date").notNull(),
  energyProduced: decimal("energy_produced", { precision: 10, scale: 2 }), // kWh
  energyConsumed: decimal("energy_consumed", { precision: 10, scale: 2 }), // kWh
  gridImport: decimal("grid_import", { precision: 10, scale: 2 }), // kWh
  gridExport: decimal("grid_export", { precision: 10, scale: 2 }), // kWh
  batteryCharge: decimal("battery_charge", { precision: 8, scale: 2 }), // kWh
  batteryDischarge: decimal("battery_discharge", { precision: 8, scale: 2 }), // kWh
  costSavings: decimal("cost_savings", { precision: 8, scale: 2 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Solar Installation Relations
export const solarInstallationsRelations = relations(solarInstallations, ({ one, many }) => ({
  contact: one(contacts, { fields: [solarInstallations.contactId], references: [contacts.id] }),
  opportunity: one(opportunities, { fields: [solarInstallations.opportunityId], references: [opportunities.id] }),
  energyReadings: many(energyReadings)
}));

export const energyReadingsRelations = relations(energyReadings, ({ one }) => ({
  installation: one(solarInstallations, { fields: [energyReadings.installationId], references: [solarInstallations.id] })
}));

// Insert schemas for solar tables
export const insertSolarInstallationSchema = createInsertSchema(solarInstallations).pick({
  contactId: true,
  opportunityId: true,
  systemType: true,
  systemSize: true,
  panelCount: true,
  panelWattage: true,
  inverterType: true,
  batteryType: true,
  batteryCapacity: true,
  installationStatus: true,
  installationDate: true,
  completionDate: true,
  warrantyYears: true,
  estimatedAnnualProduction: true,
  estimatedMonthlySavings: true,
  totalSystemCost: true,
  incentivesApplied: true,
  permitsRequired: true,
  permitStatus: true,
  inspectionDate: true,
  inspectionStatus: true,
  notes: true,
  createdBy: true,
  assignedTechnician: true
});

export const insertEnergyReadingSchema = createInsertSchema(energyReadings).pick({
  installationId: true,
  readingDate: true,
  energyProduced: true,
  energyConsumed: true,
  gridImport: true,
  gridExport: true,
  batteryCharge: true,
  batteryDischarge: true,
  costSavings: true
});

// Solar-specific types
export type InsertSolarInstallation = z.infer<typeof insertSolarInstallationSchema>;
export type SolarInstallation = typeof solarInstallations.$inferSelect;

export type InsertEnergyReading = z.infer<typeof insertEnergyReadingSchema>;
export type EnergyReading = typeof energyReadings.$inferSelect;

// RAG System Tables for Claude Chatbot
export const ragDocuments = pgTable("rag_documents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  source: text("source"), // Where the document came from
  category: text("category"), // Document category for filtering
  metadata: jsonb("metadata"), // Additional information about the document
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  createdBy: integer("created_by").references(() => users.id),
});

export const ragChunks = pgTable("rag_chunks", {
  id: serial("id").primaryKey(),
  documentId: integer("document_id").notNull().references(() => ragDocuments.id, { onDelete: 'cascade' }),
  content: text("content").notNull(),
  chunkIndex: integer("chunk_index").notNull(), // Position in the original document
  embedding: text("embedding"), // Text representation of vector embedding
  metadata: jsonb("metadata"), // Additional chunk-specific information
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const ragChunkRelations = relations(ragChunks, ({ one }) => ({
  document: one(ragDocuments, { fields: [ragChunks.documentId], references: [ragDocuments.id] }),
}));

export const chatSessions = pgTable("chat_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  sessionId: text("session_id").notNull().unique(), // Client-side generated UUID
  title: text("title"), // Can be updated by the user or generated from the first message
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const chatMessages = pgTable("chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull().references(() => chatSessions.sessionId, { onDelete: 'cascade' }),
  role: text("role").notNull(), // 'user' or 'assistant'
  content: text("content").notNull(),
  citedDocuments: jsonb("cited_documents"), // Array of document IDs that were referenced
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const chatSessionRelations = relations(chatSessions, ({ many }) => ({
  messages: many(chatMessages),
}));

export const chatMessageRelations = relations(chatMessages, ({ one }) => ({
  session: one(chatSessions, { fields: [chatMessages.sessionId], references: [chatSessions.sessionId] }),
}));

// Insert schemas for RAG
export const insertRagDocumentSchema = createInsertSchema(ragDocuments).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertRagDocument = z.infer<typeof insertRagDocumentSchema>;
export type RagDocument = typeof ragDocuments.$inferSelect;

export const insertRagChunkSchema = createInsertSchema(ragChunks).omit({ id: true, createdAt: true });
export type InsertRagChunk = z.infer<typeof insertRagChunkSchema>;
export type RagChunk = typeof ragChunks.$inferSelect;

export const insertChatSessionSchema = createInsertSchema(chatSessions).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertChatSession = z.infer<typeof insertChatSessionSchema>;
export type ChatSession = typeof chatSessions.$inferSelect;

export const insertChatMessageSchema = createInsertSchema(chatMessages).omit({ id: true, createdAt: true });
export type InsertChatMessage = z.infer<typeof insertChatMessageSchema>;
export type ChatMessage = typeof chatMessages.$inferSelect;

// Product Category Enum
export const productCategoryEnum = pgEnum('product_category', [
  'solar-panels',
  'inverters',
  'batteries',
  'mounting',
  'monitoring',
  'installation-services',
  'maintenance-packages'
]);

// Products Table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  sku: text("sku").notNull().unique(),
  name: text("name").notNull(),
  category: productCategoryEnum("category").notNull(),
  brand: text("brand"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  compareAtPrice: decimal("compare_at_price", { precision: 10, scale: 2 }),
  description: text("description"),
  specifications: jsonb("specifications"),
  images: text("images").array().notNull().default([]),
  inStock: boolean("in_stock").notNull().default(true),
  stockQuantity: integer("stock_quantity"),
  featured: boolean("featured").notNull().default(false),
  rating: decimal("rating", { precision: 3, scale: 2 }).notNull().default('0'),
  reviewCount: integer("review_count").notNull().default(0),
  tags: text("tags").array().notNull().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Product Categories Table
export const productCategories = pgTable("product_categories", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  image: text("image"),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Insert schemas for Products
export const insertProductSchema = createInsertSchema(products).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export const insertProductCategorySchema = createInsertSchema(productCategories).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertProductCategory = z.infer<typeof insertProductCategorySchema>;
export type ProductCategory = typeof productCategories.$inferSelect;

// Portfolio Projects Enum
export const portfolioCategoryEnum = pgEnum('portfolio_category', ['residential', 'commercial', 'maintenance']);

// Portfolio Projects Table
export const portfolioProjects = pgTable("portfolio_projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: portfolioCategoryEnum("category").notNull(),
  location: text("location").notNull(),
  date: timestamp("date").notNull(),
  systemSize: text("system_size").notNull(),
  panelCount: integer("panel_count").notNull(),
  annualSavings: text("annual_savings").notNull(),
  description: text("description").notNull(),
  beforeImage: text("before_image").notNull(),
  afterImage: text("after_image").notNull(),
  galleryImages: text("gallery_images").array().notNull().default([]),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Insert schemas for Portfolio Projects
export const insertPortfolioProjectSchema = createInsertSchema(portfolioProjects).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertPortfolioProject = z.infer<typeof insertPortfolioProjectSchema>;
export type PortfolioProject = typeof portfolioProjects.$inferSelect;
