import { db } from "../db";
import { crmUsers, inventory } from "@shared/crm-schema";
import { hashPassword } from "./auth";
import { eq } from "drizzle-orm";

async function seedDatabase() {

  // Seed users
  const adminEmail = "admin@praetoriansmartcoat.com";
  const adminUser = await db.select().from(crmUsers).where(eq(crmUsers.email, adminEmail)).limit(1);
  
  if (adminUser.length === 0) {
    
    // Create admin user
    await db.insert(crmUsers).values({
      email: "admin@praetoriansmartcoat.com",
      passwordHash: await hashPassword("Praetorian1$"),
      role: "admin",
      notificationMode: "in-app"
    });
    
    // Create sales users
    await db.insert(crmUsers).values({
      email: "rob@praetoriansmartcoat.com",
      passwordHash: await hashPassword("Praetorian1$"),
      role: "sales",
      notificationMode: "in-app"
    });
    
    await db.insert(crmUsers).values({
      email: "joe@praetoriansmartcoat.com",
      passwordHash: await hashPassword("Praetorian1$"),
      role: "sales",
      notificationMode: "in-app"
    });
    
    await db.insert(crmUsers).values({
      email: "greg@praetoriansmartcoat.com",
      passwordHash: await hashPassword("Praetorian1$"),
      role: "sales",
      notificationMode: "in-app"
    });
    
  } else {
  }
  
  // Seed inventory
  const existingProducts = await db.select().from(inventory);
  
  if (existingProducts.length === 0) {
    
    const products = [
      "Smart-Coat 5-gallon",
      "Smart-Coat 1-gallon",
      "Stucco 5-gallon",
      "Stucco 1-gallon"
    ];
    
    for (const productName of products) {
      await db.insert(inventory).values({
        productName,
        quantity: 0 // Initial quantity set to 0
      });
    }
    
  } else {
  }
  
}

// The seedDatabase function will be called from registerRoutes
// No need for direct execution check in ES modules

export { seedDatabase };