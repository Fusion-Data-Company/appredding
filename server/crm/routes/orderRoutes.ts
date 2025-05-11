import { Router, Request, Response } from "express";
import { OrderModel } from "../models/orderModel";
import { InventoryModel } from "../models/inventoryModel";
import { isAuthenticated, isAdmin } from "../auth";
import { z } from "zod";

const router = Router();

// Schema for creating orders
const orderSchema = z.object({
  productId: z.number().int().positive(),
  quantity: z.number().int().positive(),
  confirmed: z.boolean().optional(),
  orderedBy: z.number().int().positive()
});

// Get all orders
router.get("/", isAuthenticated, async (_req: Request, res: Response) => {
  try {
    const orders = await OrderModel.getAll();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get order by ID
router.get("/:id", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    
    const order = await OrderModel.getById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    res.status(200).json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get orders by user ID
router.get("/user/:userId", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }
    
    // Check if user is requesting their own orders or is an admin
    if (req.session.userId !== userId && req.session.userRole !== "admin") {
      return res.status(403).json({ message: "Forbidden: You can only view your own orders" });
    }
    
    const orders = await OrderModel.getByUserId(userId);
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create new order
router.post("/", isAuthenticated, async (req: Request, res: Response) => {
  try {
    // Use the current user ID from the session if not specified
    if (!req.body.orderedBy) {
      req.body.orderedBy = req.session.userId;
    }
    
    const validatedData = orderSchema.parse(req.body);
    
    // Check if product exists
    const product = await InventoryModel.getById(validatedData.productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    
    // Check stock availability if confirm immediately
    if (validatedData.confirmed) {
      if (product.quantity < validatedData.quantity) {
        return res.status(400).json({ 
          message: `Insufficient inventory. Available: ${product.quantity}, Requested: ${validatedData.quantity}` 
        });
      }
    }
    
    // Create the order
    const order = await OrderModel.create(validatedData);
    
    // If confirming immediately, update inventory
    if (validatedData.confirmed) {
      await InventoryModel.decrementStock(validatedData.productId, validatedData.quantity);
    }
    
    res.status(201).json(order);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Confirm an order
router.post("/:id/confirm", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    
    // Check if order exists
    const order = await OrderModel.getById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    // Confirm the order (this will also update inventory)
    const confirmedOrder = await OrderModel.confirmOrder(id);
    
    res.status(200).json({
      ...confirmedOrder,
      message: "Order confirmed and inventory updated"
    });
  } catch (error) {
    console.error("Error confirming order:", error);
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error" });
  }
});

// Delete an unconfirmed order
router.delete("/:id", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    
    // Get the order to check permissions
    const order = await OrderModel.getById(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    // Only allow users to delete their own orders, unless they're an admin
    if (order.orderedBy !== req.session.userId && req.session.userRole !== "admin") {
      return res.status(403).json({ message: "Forbidden: You can only delete your own orders" });
    }
    
    // Delete the order
    const deleted = await OrderModel.deleteOrder(id);
    
    if (deleted) {
      res.status(200).json({ message: "Order deleted successfully" });
    } else {
      res.status(500).json({ message: "Error deleting order" });
    }
  } catch (error) {
    console.error("Error deleting order:", error);
    if (error instanceof Error) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Server error" });
  }
});

export default router;