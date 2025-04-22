import { pgTable, text, serial, integer, boolean, timestamp, pgEnum, date, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Enums
export const userTypeEnum = pgEnum('user_type', ['super_admin', 'admin', 'sales', 'client', 'painter']);
export const projectStatusEnum = pgEnum('project_status', ['pending', 'in_progress', 'completed', 'cancelled']);
export const taskPriorityEnum = pgEnum('task_priority', ['low', 'medium', 'high', 'urgent']);
export const taskStatusEnum = pgEnum('task_status', ['pending', 'in_progress', 'completed', 'cancelled', 'overdue']);
export const applicationTypeEnum = pgEnum('application_type', ['painter_network', 'marina', 'fire_prevention', 'pool', 'construction', 'mobile_home', 'municipality']);
export const leadSourceEnum = pgEnum('lead_source', ['website', 'referral', 'social_media', 'direct', 'trade_show', 'other']);
export const contactStatusEnum = pgEnum('contact_status', ['lead', 'prospect', 'customer', 'inactive']);
export const socialMediaTypeEnum = pgEnum('social_media_type', ['facebook', 'instagram', 'twitter', 'linkedin', 'youtube', 'tiktok', 'other']);

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
  interestedInApplications: jsonb("interested_in_applications"), // Array of application types
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
  applicationTypes: jsonb("application_types"), // Array of application types
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

// Products
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  cost: decimal("cost", { precision: 10, scale: 2 }),
  category: text("category"),
  unit: text("unit").default('gallon'),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").notNull().default(true),
  applicationTypes: jsonb("application_types"), // Array of application types
  coverage: integer("coverage"), // Coverage in sq ft per unit
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  createdBy: integer("created_by").references(() => users.id),
});

// Orders
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  opportunityId: integer("opportunity_id").references(() => opportunities.id),
  contactId: integer("contact_id").notNull().references(() => contacts.id),
  companyId: integer("company_id").references(() => companies.id),
  status: text("status").notNull().default('pending'),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  taxAmount: decimal("tax_amount", { precision: 10, scale: 2 }),
  shippingAmount: decimal("shipping_amount", { precision: 10, scale: 2 }),
  discountAmount: decimal("discount_amount", { precision: 10, scale: 2 }),
  currency: text("currency").default('USD'),
  paymentMethod: text("payment_method"),
  paymentStatus: text("payment_status").default('pending'),
  billingAddress: text("billing_address"),
  billingCity: text("billing_city"),
  billingState: text("billing_state"),
  billingZip: text("billing_zip"),
  billingCountry: text("billing_country"),
  shippingAddress: text("shipping_address"),
  shippingCity: text("shipping_city"),
  shippingState: text("shipping_state"),
  shippingZip: text("shipping_zip"),
  shippingCountry: text("shipping_country"),
  notes: text("notes"),
  termsAccepted: boolean("terms_accepted").default(false),
  orderDate: timestamp("order_date").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  createdBy: integer("created_by").references(() => users.id),
  assignedTo: integer("assigned_to").references(() => users.id),
});

// Order relations
export const ordersRelations = relations(orders, ({ one, many }) => ({
  contact: one(contacts, { fields: [orders.contactId], references: [contacts.id] }),
  company: one(companies, { fields: [orders.companyId], references: [companies.id] }),
  opportunity: one(opportunities, { fields: [orders.opportunityId], references: [opportunities.id] }),
  items: many(orderItems)
}));

// Order items
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull().references(() => orders.id),
  productId: integer("product_id").notNull().references(() => products.id),
  quantity: integer("quantity").notNull(),
  unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(),
  totalPrice: decimal("total_price", { precision: 10, scale: 2 }).notNull(),
  discount: decimal("discount", { precision: 10, scale: 2 }),
  tax: decimal("tax", { precision: 10, scale: 2 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
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

// Activities and interactions
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // email, call, meeting, note, etc.
  subject: text("subject").notNull(),
  details: text("details"),
  contactId: integer("contact_id").references(() => contacts.id),
  companyId: integer("company_id").references(() => companies.id),
  opportunityId: integer("opportunity_id").references(() => opportunities.id),
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
  interestedInApplications: true,
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
  applicationTypes: true,
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

export const insertProductSchema = createInsertSchema(products).pick({
  name: true,
  code: true,
  description: true,
  price: true,
  cost: true,
  category: true,
  unit: true,
  imageUrl: true,
  isActive: true,
  applicationTypes: true,
  coverage: true,
  createdBy: true
});

export const insertOrderSchema = createInsertSchema(orders).pick({
  orderNumber: true,
  opportunityId: true,
  contactId: true,
  companyId: true,
  status: true,
  totalAmount: true,
  taxAmount: true,
  shippingAmount: true,
  discountAmount: true,
  currency: true,
  paymentMethod: true,
  paymentStatus: true,
  billingAddress: true,
  billingCity: true,
  billingState: true,
  billingZip: true,
  billingCountry: true,
  shippingAddress: true,
  shippingCity: true,
  shippingState: true,
  shippingZip: true,
  shippingCountry: true,
  notes: true,
  termsAccepted: true,
  orderDate: true,
  createdBy: true,
  assignedTo: true
});

export const insertOrderItemSchema = createInsertSchema(orderItems).pick({
  orderId: true,
  productId: true,
  quantity: true,
  unitPrice: true,
  totalPrice: true,
  discount: true,
  tax: true,
  notes: true
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

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;
export type OrderItem = typeof orderItems.$inferSelect;

export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;

export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;

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
