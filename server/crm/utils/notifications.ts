import { db } from "../../db";
import { inventory, crmUsers } from "@shared/crm-schema";
import { eq } from "drizzle-orm";
import nodemailer from "nodemailer";

// Define thresholds for inventory alerts
const THRESHOLDS = [200, 150, 100, 50, 20, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

// Interface for notifications
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "danger";
  timestamp: Date;
  read: boolean;
  userId: number;
}

// In-memory storage for in-app notifications
const inAppNotifications: Notification[] = [];

export class NotificationService {
  private static emailTransporter: nodemailer.Transporter | null = null;

  // Initialize the email transporter (called at server startup)
  static initEmailTransporter() {
    // Check if SMTP settings are available
    if (
      process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
    ) {
      this.emailTransporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT, 10),
        secure: parseInt(process.env.SMTP_PORT, 10) === 465,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });
    } else {
      console.warn('SMTP settings not configured. Email notifications will not be sent.');
    }
  }

  // Check if the new quantity crosses any threshold and send alerts if needed
  static async checkThresholdAndAlert(productId: number, newQty: number, prevQty: number): Promise<void> {
    // Get product information
    const [product] = await db.select().from(inventory).where(eq(inventory.id, productId));
    
    if (!product) {
      console.error(`Product with ID ${productId} not found for threshold check`);
      return;
    }
    
    // Check each threshold to see if it was crossed
    for (const threshold of THRESHOLDS) {
      // Only trigger if we crossed the threshold in a downward direction
      if (prevQty > threshold && newQty <= threshold) {
        await this.sendLowStockAlert(product, newQty, threshold);
      }
    }
  }

  // Send low stock alerts across all notification channels
  private static async sendLowStockAlert(product: any, currentQty: number, threshold: number): Promise<void> {
    const title = `Low Stock Alert: ${product.productName}`;
    const message = `Inventory for ${product.productName} is low. Current quantity: ${currentQty} (below threshold of ${threshold})`;
    
    // Get all users with their notification preferences
    const allUsers = await db.select().from(crmUsers);

    // Send notifications based on each user's preference
    for (const user of allUsers) {
      switch (user.notificationMode) {
        case "in-app":
          await this.sendInAppNotification(user.id, title, message);
          break;
          
        case "email":
          await this.sendEmailNotification(user.email, title, message);
          break;
          
        case "console":
          this.sendConsoleNotification(title, message);
          break;
          
        default:
          await this.sendInAppNotification(user.id, title, message);
      }
    }
  }

  // Send an in-app notification
  private static async sendInAppNotification(userId: number, title: string, message: string): Promise<void> {
    const notification: Notification = {
      id: Date.now().toString(),
      title,
      message,
      type: 'warning',
      timestamp: new Date(),
      read: false,
      userId
    };
    
    inAppNotifications.push(notification);
    
    // In a real implementation, this would be stored in a database
  }

  // Send an email notification
  private static async sendEmailNotification(email: string, title: string, message: string): Promise<void> {
    if (!this.emailTransporter) {
      console.warn('Email transporter not initialized. Email notification not sent.');
      return;
    }
    
    try {
      await this.emailTransporter.sendMail({
        from: process.env.SMTP_FROM || '"Praetorian CRM" <no-reply@praetoriansmartcoat.com>',
        to: email,
        subject: title,
        text: message,
        html: `<h2>${title}</h2><p>${message}</p>`
      });
      
    } catch (error) {
      console.error('Failed to send email notification:', error);
    }
  }

  // Send a console notification (for development)
  private static sendConsoleNotification(title: string, message: string): void {
    console.warn(`ALERT: ${title}`);
    console.warn(message);
  }

  // Get all in-app notifications for a user
  static getNotificationsForUser(userId: number): Notification[] {
    return inAppNotifications.filter(n => n.userId === userId);
  }

  // Mark a notification as read
  static markNotificationAsRead(notificationId: string, userId: number): boolean {
    const notification = inAppNotifications.find(n => n.id === notificationId && n.userId === userId);
    
    if (notification) {
      notification.read = true;
      return true;
    }
    
    return false;
  }
}