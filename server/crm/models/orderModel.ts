import { db } from "../../db";
import { orders, Order, InsertOrder } from "@shared/crm-schema";
import { eq } from "drizzle-orm";
import { InventoryModel } from "./inventoryModel";

export class OrderModel {
  // Create a new order
  static async create(data: InsertOrder): Promise<Order> {
    const [order] = await db.insert(orders).values(data).returning();
    return order;
  }

  // Get order by ID
  static async getById(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order;
  }

  // Get all orders
  static async getAll(): Promise<Order[]> {
    return await db.select().from(orders);
  }

  // Get orders by product ID
  static async getByProductId(productId: number): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.productId, productId));
  }

  // Get orders by user ID (ordered by)
  static async getByUserId(userId: number): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.orderedBy, userId));
  }

  // Get unconfirmed orders
  static async getUnconfirmed(): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.confirmed, false));
  }

  // Confirm an order and update inventory
  static async confirmOrder(id: number): Promise<Order | undefined> {
    // Get the order
    const order = await this.getById(id);
    if (!order) {
      throw new Error(`Order with ID ${id} not found`);
    }

    // Skip if order already confirmed
    if (order.confirmed) {
      return order;
    }

    // Decrement inventory
    if (order.productId) {
      await InventoryModel.decrementStock(order.productId, order.quantity);
    }

    // Update the order status
    const [updatedOrder] = await db.update(orders)
      .set({ confirmed: true })
      .where(eq(orders.id, id))
      .returning();
    
    return updatedOrder;
  }

  // Delete an order (only unconfirmed orders should be deleted)
  static async deleteOrder(id: number): Promise<boolean> {
    const order = await this.getById(id);
    if (!order) {
      return false;
    }

    // Only allow deletion of unconfirmed orders
    if (order.confirmed) {
      throw new Error("Cannot delete a confirmed order");
    }

    const result = await db.delete(orders).where(eq(orders.id, id));
    return result.rowCount !== null && result.rowCount > 0;
  }
}