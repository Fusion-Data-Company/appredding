import { db } from "../../db";
import { crmUsers, CrmUser, InsertCrmUser } from "@shared/crm-schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "../auth";

export class UserModel {
  // Create a new user
  static async create(userData: Omit<InsertCrmUser, "passwordHash"> & { password: string }): Promise<CrmUser> {
    const { password, ...rest } = userData;
    const passwordHash = await hashPassword(password);
    
    const [user] = await db.insert(crmUsers).values({
      ...rest,
      passwordHash
    }).returning();
    
    return user;
  }

  // Get user by ID
  static async getById(id: number): Promise<CrmUser | undefined> {
    const [user] = await db.select().from(crmUsers).where(eq(crmUsers.id, id));
    return user;
  }

  // Get user by email
  static async getByEmail(email: string): Promise<CrmUser | undefined> {
    const [user] = await db.select().from(crmUsers).where(eq(crmUsers.email, email));
    return user;
  }

  // Update user
  static async update(id: number, userData: Partial<Omit<InsertCrmUser, "passwordHash">>): Promise<CrmUser | undefined> {
    const [updatedUser] = await db.update(crmUsers)
      .set(userData)
      .where(eq(crmUsers.id, id))
      .returning();
    
    return updatedUser;
  }

  // Get all users
  static async getAll(): Promise<CrmUser[]> {
    return await db.select().from(crmUsers);
  }

  // Update user password
  static async updatePassword(id: number, newPassword: string): Promise<boolean> {
    const passwordHash = await hashPassword(newPassword);
    const result = await db.update(crmUsers)
      .set({ passwordHash })
      .where(eq(crmUsers.id, id));
    
    return result.rowCount !== null && result.rowCount > 0;
  }

  // Update notification mode
  static async updateNotificationMode(id: number, notificationMode: "in-app" | "email" | "console"): Promise<boolean> {
    const result = await db.update(crmUsers)
      .set({ notificationMode })
      .where(eq(crmUsers.id, id));
    
    return result.rowCount !== null && result.rowCount > 0;
  }
}