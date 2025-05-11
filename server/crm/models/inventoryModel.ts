import { db } from "../../db";
import { inventory, Inventory, InsertInventory } from "@shared/crm-schema";
import { eq } from "drizzle-orm";
import { NotificationService } from "../utils/notifications";

export class InventoryModel {
  // Create a new inventory item
  static async create(data: InsertInventory): Promise<Inventory> {
    const [item] = await db.insert(inventory).values(data).returning();
    return item;
  }

  // Get inventory item by ID
  static async getById(id: number): Promise<Inventory | undefined> {
    const [item] = await db.select().from(inventory).where(eq(inventory.id, id));
    return item;
  }

  // Get inventory item by product name
  static async getByProductName(productName: string): Promise<Inventory | undefined> {
    const [item] = await db.select().from(inventory).where(eq(inventory.productName, productName));
    return item;
  }

  // Get all inventory items
  static async getAll(): Promise<Inventory[]> {
    return await db.select().from(inventory);
  }

  // Update inventory item
  static async update(id: number, data: Partial<InsertInventory>): Promise<Inventory | undefined> {
    const [updatedItem] = await db.update(inventory)
      .set(data)
      .where(eq(inventory.id, id))
      .returning();
    
    return updatedItem;
  }

  // Get current quantity
  static async getQuantity(id: number): Promise<number> {
    const item = await this.getById(id);
    return item ? item.quantity : 0;
  }

  // Increment stock (for restocking)
  static async incrementStock(id: number, amount: number): Promise<number> {
    const prevQty = await this.getQuantity(id);
    const [updatedItem] = await db.update(inventory)
      .set({ quantity: prevQty + amount })
      .where(eq(inventory.id, id))
      .returning();
    
    return updatedItem ? updatedItem.quantity : prevQty;
  }

  // Decrement stock (for orders)
  static async decrementStock(id: number, amount: number): Promise<number> {
    const prevQty = await this.getQuantity(id);
    
    // Prevent negative inventory
    if (prevQty < amount) {
      throw new Error(`Insufficient inventory. Available: ${prevQty}, Requested: ${amount}`);
    }
    
    const newQty = prevQty - amount;
    const [updatedItem] = await db.update(inventory)
      .set({ quantity: newQty })
      .where(eq(inventory.id, id))
      .returning();
    
    // Check thresholds and send notifications if required
    await NotificationService.checkThresholdAndAlert(id, newQty, prevQty);
    
    return updatedItem ? updatedItem.quantity : prevQty;
  }

  // Find or create inventory item
  static async findOrCreate(productName: string): Promise<Inventory> {
    let item = await this.getByProductName(productName);
    
    if (!item) {
      item = await this.create({ productName, quantity: 0 });
    }
    
    return item;
  }
}