import { Request, Response, NextFunction } from "express";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { db } from "../db";
import { users } from "@shared/crm-schema";
import { eq } from "drizzle-orm";

const scryptAsync = promisify(scrypt);

// Hash password using scrypt with salt
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

// Compare password with stored hash
export async function comparePasswords(supplied: string, stored: string): Promise<boolean> {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

// Authentication middleware
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.status(401).json({ message: "Not authenticated" });
}

// Check if user has admin role
export function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session && req.session.userRole === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Unauthorized: Admin role required" });
}

// Check if user has sales role
export function isSales(req: Request, res: Response, next: NextFunction) {
  if (req.session && (req.session.userRole === "admin" || req.session.userRole === "sales")) {
    return next();
  }
  return res.status(403).json({ message: "Unauthorized: Sales or Admin role required" });
}

// Get user by email
export async function getUserByEmail(email: string) {
  const [user] = await db.select().from(users).where(eq(users.email, email));
  return user;
}

// Get user by ID
export async function getUserById(id: number) {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user;
}