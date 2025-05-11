import { Router, Request, Response } from "express";
import { InventoryModel } from "../models/inventoryModel";
import { isAuthenticated, isAdmin } from "../auth";
import { z } from "zod";
import { db } from "../../db";
import { inventory } from "@shared/crm-schema";

const router = Router();

// Schema for creating/updating inventory
const inventorySchema = z.object({
  productName: z.string().min(1),
  quantity: z.number().int().nonnegative()
});

// Get all inventory items
// Seed inventory data for development
async function seedInventoryIfEmpty() {
  const existingItems = await InventoryModel.getAll();
  if (existingItems.length === 0) {
    const seedData = [
      { productName: "Ultra Premium Fire Retardant", quantity: 150 },
      { productName: "Heavy Duty Concrete Sealer", quantity: 200 },
      { productName: "Marine-Grade Protective Coating", quantity: 120 },
      { productName: "Pool Coating - Crystal Blue", quantity: 85 },
      { productName: "Industrial Metal Shield", quantity: 170 },
      { productName: "Mobile Home Roof Coating", quantity: 95 },
      { productName: "Municipal Infrastructure Sealer", quantity: 110 },
      { productName: "Professional Painter Kit", quantity: 50 },
      { productName: "SmartCoat Primer", quantity: 300 },
      { productName: "Ultra-Violet Protection Layer", quantity: 175 }
    ];
    
    for (const item of seedData) {
      await InventoryModel.create(item);
    }
    console.log("Inventory seeded with initial products");
  }
}

// Run the seed function when the server starts
seedInventoryIfEmpty().catch(console.error);

router.get("/", async (_req: Request, res: Response) => {
  // Development bypass for auth - remove in production
  /*isAuthenticated,*/
  try {
    const items = await InventoryModel.getAll();
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get inventory item by ID
router.get("/:id", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    
    const item = await InventoryModel.getById(id);
    if (!item) {
      return res.status(404).json({ message: "Inventory item not found" });
    }
    
    res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching inventory item:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create new inventory item (admin only)
router.post("/", isAdmin, async (req: Request, res: Response) => {
  try {
    const validatedData = inventorySchema.parse(req.body);
    const item = await InventoryModel.create(validatedData);
    res.status(201).json(item);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    
    console.error("Error creating inventory item:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Update inventory item (admin only)
router.put("/:id", isAdmin, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    
    const validatedData = inventorySchema.partial().parse(req.body);
    
    const item = await InventoryModel.update(id, validatedData);
    if (!item) {
      return res.status(404).json({ message: "Inventory item not found" });
    }
    
    res.status(200).json(item);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    
    console.error("Error updating inventory item:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Restock inventory (admin only)
router.post("/:id/restock", isAdmin, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    
    const { amount } = req.body;
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Invalid amount" });
    }
    
    const newQuantity = await InventoryModel.incrementStock(id, parseInt(amount));
    
    res.status(200).json({ 
      id, 
      quantity: newQuantity, 
      message: `Successfully restocked ${amount} units` 
    });
  } catch (error) {
    console.error("Error restocking inventory:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;