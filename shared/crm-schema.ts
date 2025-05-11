import { pgTable, serial, text, integer, boolean, timestamp, foreignKey, uniqueIndex, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Role enum
export const roleEnum = pgEnum("role", ["admin", "sales"]);

// Notification mode enum
export const notificationModeEnum = pgEnum("notification_mode", ["in-app", "email", "console"]);

// Users table
export const crmUsers = pgTable("crm_users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: roleEnum("role").notNull().default("sales"),
  notificationMode: notificationModeEnum("notification").notNull().default("in-app"),
});

// Inventory table
export const inventory = pgTable("inventory", {
  id: serial("id").primaryKey(),
  productName: text("product_name").notNull().unique(),
  quantity: integer("quantity").notNull().default(0),
});

// Orders table
export const crmOrders = pgTable("crm_orders", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => inventory.id),
  quantity: integer("quantity").notNull(),
  confirmed: boolean("confirmed").notNull().default(false),
  orderedBy: integer("ordered_by").references(() => crmUsers.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Type definitions
export type CrmUser = typeof crmUsers.$inferSelect;
export type InsertCrmUser = typeof crmUsers.$inferInsert;
export const insertCrmUserSchema = createInsertSchema(crmUsers)
  .omit({ id: true })
  .extend({
    password: z.string().min(8),
  });

export type Inventory = typeof inventory.$inferSelect;
export type InsertInventory = typeof inventory.$inferInsert;
export const insertInventorySchema = createInsertSchema(inventory).omit({ id: true });

export type CrmOrder = typeof crmOrders.$inferSelect;
export type InsertCrmOrder = typeof crmOrders.$inferInsert;
export const insertCrmOrderSchema = createInsertSchema(crmOrders).omit({ id: true, createdAt: true });