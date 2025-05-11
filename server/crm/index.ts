import express, { Express } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "../db";
import { NotificationService } from "./utils/notifications";

// Import routes
import authRoutes from "./routes/authRoutes";
import inventoryRoutes from "./routes/inventoryRoutes";
import orderRoutes from "./routes/orderRoutes";

// Session store setup
const PgSessionStore = connectPgSimple(session);

// Setup CRM routes and middleware
export function setupCRM(app: Express): void {
  // Initialize nodemailer for email notifications
  NotificationService.initEmailTransporter();
  
  // Session middleware
  const sessionSecret = process.env.SESSION_SECRET || "praetorian-crm-default-secret";
  app.use(session({
    store: new PgSessionStore({
      pool,
      tableName: "session", // Name of the session table
      createTableIfMissing: true
    }),
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    }
  }));
  
  // Register routes
  app.use("/api/crm/auth", authRoutes);
  app.use("/api/crm/inventory", inventoryRoutes);
  app.use("/api/crm/orders", orderRoutes);
  
  // Notification API endpoint to get in-app notifications
  app.get("/api/crm/notifications", (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const notifications = NotificationService.getNotificationsForUser(req.session.userId);
    res.status(200).json(notifications);
  });
  
  // Mark notification as read
  app.post("/api/crm/notifications/:id/read", (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const success = NotificationService.markNotificationAsRead(req.params.id, req.session.userId);
    
    if (success) {
      res.status(200).json({ message: "Notification marked as read" });
    } else {
      res.status(404).json({ message: "Notification not found" });
    }
  });
}