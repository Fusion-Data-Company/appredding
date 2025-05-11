import { db } from "../../db";
import { users, User, InsertUser } from "@shared/crm-schema";
import { eq } from "drizzle-orm";
import { hashPassword } from "../auth";

export class UserModel {
  // Create a new user
  static async create(userData: Omit<InsertUser, "passwordHash"> & { password: string }): Promise<User> {
    const { password, ...rest } = userData;
    const passwordHash = await hashPassword(password);
    
    const [user] = await db.insert(users).values({
      ...rest,
      passwordHash
    }).returning();
    
    return user;
  }

  // Get user by ID
  static async getById(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  // Get user by email
  static async getByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  // Update user
  static async update(id: number, userData: Partial<Omit<InsertUser, "passwordHash">>): Promise<User | undefined> {
    const [updatedUser] = await db.update(users)
      .set(userData)
      .where(eq(users.id, id))
      .returning();
    
    return updatedUser;
  }

  // Get all users
  static async getAll(): Promise<User[]> {
    return await db.select().from(users);
  }

  // Update user password
  static async updatePassword(id: number, newPassword: string): Promise<boolean> {
    const passwordHash = await hashPassword(newPassword);
    const result = await db.update(users)
      .set({ passwordHash })
      .where(eq(users.id, id));
    
    return result.rowCount !== null && result.rowCount > 0;
  }

  // Update notification mode
  static async updateNotificationMode(id: number, notificationMode: "in-app" | "email" | "console"): Promise<boolean> {
    const result = await db.update(users)
      .set({ notificationMode })
      .where(eq(users.id, id));
    
    return result.rowCount !== null && result.rowCount > 0;
  }
}