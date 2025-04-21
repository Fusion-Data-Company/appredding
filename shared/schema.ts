import { pgTable, text, serial, integer, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Enums
export const userTypeEnum = pgEnum('user_type', ['admin', 'client', 'painter']);
export const projectStatusEnum = pgEnum('project_status', ['pending', 'in_progress', 'completed', 'cancelled']);

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
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  interest: text("interest"),
  message: text("message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

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

export const projectFiles = pgTable("project_files", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  fileName: text("file_name").notNull(),
  fileType: text("file_type").notNull(),
  fileUrl: text("file_url").notNull(),
  uploadedBy: integer("uploaded_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const projectUpdates = pgTable("project_updates", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id").notNull().references(() => projects.id),
  message: text("message").notNull(),
  createdBy: integer("created_by").notNull().references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
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
});

export const insertContactSchema = createInsertSchema(contacts).pick({
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  interest: true,
  message: true,
});

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

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertProjectFile = z.infer<typeof insertProjectFileSchema>;
export type ProjectFile = typeof projectFiles.$inferSelect;

export type InsertProjectUpdate = z.infer<typeof insertProjectUpdateSchema>;
export type ProjectUpdate = typeof projectUpdates.$inferSelect;
