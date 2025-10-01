import { Router } from "express";
import { storage } from "../storage";
import { insertPortfolioProjectSchema } from "@shared/schema";
import { z } from "zod";

const router = Router();

// GET /api/portfolio/projects - List all projects with optional filtering
router.get("/projects", async (req, res) => {
  try {
    const { category, featured } = req.query;
    
    const filters: { category?: string; featured?: boolean } = {};
    if (category && typeof category === 'string') {
      filters.category = category;
    }
    if (featured !== undefined) {
      filters.featured = featured === 'true';
    }
    
    const projects = await storage.getPortfolioProjects(filters);
    res.json({ success: true, projects });
  } catch (error) {
    console.error('Error fetching portfolio projects:', error);
    res.status(500).json({ success: false, error: "Failed to fetch portfolio projects" });
  }
});

// GET /api/portfolio/projects/:id - Get single project details
router.get("/projects/:id", async (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    if (isNaN(projectId)) {
      return res.status(400).json({ success: false, error: "Invalid project ID" });
    }
    
    const project = await storage.getPortfolioProjectById(projectId);
    if (!project) {
      return res.status(404).json({ success: false, error: "Project not found" });
    }
    
    res.json({ success: true, project });
  } catch (error) {
    console.error('Error fetching portfolio project:', error);
    res.status(500).json({ success: false, error: "Failed to fetch portfolio project" });
  }
});

// POST /api/portfolio/projects - Create new project
router.post("/projects", async (req, res) => {
  try {
    const validationResult = insertPortfolioProjectSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ 
        success: false, 
        error: "Validation error", 
        details: validationResult.error.errors 
      });
    }
    
    const project = await storage.createPortfolioProject(validationResult.data);
    res.json({ success: true, project });
  } catch (error) {
    console.error('Error creating portfolio project:', error);
    res.status(500).json({ success: false, error: "Failed to create portfolio project" });
  }
});

// PUT /api/portfolio/projects/:id - Update project
router.put("/projects/:id", async (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    if (isNaN(projectId)) {
      return res.status(400).json({ success: false, error: "Invalid project ID" });
    }
    
    const validationResult = insertPortfolioProjectSchema.partial().safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ 
        success: false, 
        error: "Validation error", 
        details: validationResult.error.errors 
      });
    }
    
    const project = await storage.updatePortfolioProject(projectId, validationResult.data);
    res.json({ success: true, project });
  } catch (error) {
    console.error('Error updating portfolio project:', error);
    res.status(500).json({ success: false, error: "Failed to update portfolio project" });
  }
});

// DELETE /api/portfolio/projects/:id - Delete project
router.delete("/projects/:id", async (req, res) => {
  try {
    const projectId = parseInt(req.params.id);
    if (isNaN(projectId)) {
      return res.status(400).json({ success: false, error: "Invalid project ID" });
    }
    
    await storage.deletePortfolioProject(projectId);
    res.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    console.error('Error deleting portfolio project:', error);
    res.status(500).json({ success: false, error: "Failed to delete portfolio project" });
  }
});

export default router;
