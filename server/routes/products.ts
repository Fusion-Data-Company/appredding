import { Router } from "express";
import { storage } from "../storage";
import { insertProductSchema, insertProductCategorySchema } from "@shared/schema";
import { z } from "zod";

const router = Router();

// GET /api/products - List products with filters
router.get("/api/products", async (req, res) => {
  try {
    const { category, featured, inStock, search, page, limit } = req.query;
    
    const filters: any = {};
    if (category) filters.category = category as string;
    if (featured !== undefined) filters.featured = featured === 'true';
    if (inStock !== undefined) filters.inStock = inStock === 'true';
    if (search) filters.search = search as string;
    if (page) filters.page = parseInt(page as string);
    if (limit) filters.limit = parseInt(limit as string);

    const result = await storage.getProducts(filters);
    res.json({ success: true, ...result });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// GET /api/products/categories - List all categories
router.get("/api/products/categories", async (req, res) => {
  try {
    const categories = await storage.getProductCategories();
    res.json({ success: true, categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// GET /api/products/category/:slug - Get products in category
router.get("/api/products/category/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await storage.getProductCategoryBySlug(slug);
    
    if (!category) {
      return res.status(404).json({ success: false, error: "Category not found" });
    }

    const result = await storage.getProducts({ category: slug });
    res.json({ success: true, category, ...result });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// GET /api/products/sku/:sku - Get product by SKU
router.get("/api/products/sku/:sku", async (req, res) => {
  try {
    const { sku } = req.params;
    const product = await storage.getProductBySku(sku);
    
    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product by SKU:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// GET /api/products/:id - Get single product
router.get("/api/products/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await storage.getProductById(productId);
    
    if (!product) {
      return res.status(404).json({ success: false, error: "Product not found" });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// POST /api/products - Create product (admin)
router.post("/api/products", async (req, res) => {
  try {
    const validatedData = insertProductSchema.parse(req.body);
    const product = await storage.createProduct(validatedData);
    res.json({ success: true, product });
  } catch (error) {
    console.error("Error creating product:", error);
    if (error instanceof z.ZodError) {
      res.status(400).json({ success: false, error: "Validation error", details: error.errors });
    } else {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  }
});

// PUT /api/products/:id - Update product (admin)
router.put("/api/products/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await storage.updateProduct(productId, req.body);
    res.json({ success: true, product });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

// DELETE /api/products/:id - Delete product (admin)
router.delete("/api/products/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    await storage.deleteProduct(productId);
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

export default router;
