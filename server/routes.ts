import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSchema, 
  insertProjectSchema, 
  insertProjectUpdateSchema, 
  insertProjectFileSchema 
} from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { setupAuth } from "./auth";
import professionalsRoutes from "./api/professionals";
import googleReviewsRoutes from "./api/googleReviews";
import { setupCRM } from "./crm";
import { seedDatabase } from "./crm/seed";
import ragRoutes from "./routes/rag";
import chatRoutes from "./routes/chat";
import { 
  getContacts, 
  getContactById, 
  createCRMContact, 
  updateContact, 
  deleteContact 
} from "./api/contacts";
import { 
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany
} from "./api/companies";
import {
  getOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity
} from "./api/opportunities";
import {
  getActivities,
  getActivityById,
  createActivity,
  updateActivity,
  completeActivity,
  deleteActivity
} from "./api/activities";
import { getCRMAnalytics } from "./api/analytics";
import { importCSV } from "./api/import-csv";

// Authentication middleware
function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

// Check if user is client
function isClient(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated() && req.user && (req.user.userType === "client" || req.user.userType === "admin")) {
    return next();
  }
  res.status(403).json({ message: "Access forbidden" });
}

// Check if user is admin
function isAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated() && req.user && req.user.userType === "admin") {
    return next();
  }
  res.status(403).json({ message: "Admin access required" });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);
  
  // Run seed function to populate initial CRM data (if needed)
  try {
    await seedDatabase();
    console.log("CRM database initialization completed");
  } catch (error) {
    console.error("Error initializing CRM database:", error);
  }
  
  // Setup CRM routes and middleware
  setupCRM(app);
  
  // Register professionals API routes
  app.use("/api/professionals", professionalsRoutes);
  
  // Register Google Reviews API routes
  app.use("/api/google-reviews", googleReviewsRoutes);
  
  // Register RAG document management routes
  app.use("/api/rag", ragRoutes);
  
  // Register chatbot routes
  app.use("/api/chat", chatRoutes);
  
  // ========================
  // CRM Routes
  // ========================
  
  // Get CRM analytics for dashboard
  app.get("/api/analytics", getCRMAnalytics);
  
  // Get all contacts
  app.get("/api/contacts", getContacts);
  
  // Get contact by ID
  app.get("/api/contacts/:id", getContactById);
  
  // Create a new contact
  app.post("/api/contacts", createCRMContact);
  
  // Update a contact
  app.put("/api/contacts/:id", updateContact);
  
  // Delete a contact
  app.delete("/api/contacts/:id", deleteContact);
  
  // Companies routes
  app.get("/api/companies", getCompanies);
  app.get("/api/companies/:id", getCompanyById);
  app.post("/api/companies", createCompany);
  app.put("/api/companies/:id", updateCompany);
  app.delete("/api/companies/:id", deleteCompany);
  
  // Opportunities routes
  app.get("/api/opportunities", getOpportunities);
  app.get("/api/opportunities/:id", getOpportunityById);
  app.post("/api/opportunities", createOpportunity);
  app.put("/api/opportunities/:id", updateOpportunity);
  app.delete("/api/opportunities/:id", deleteOpportunity);
  
  // Activities routes
  app.get("/api/activities", getActivities);
  app.get("/api/activities/:id", getActivityById);
  app.post("/api/activities", createActivity);
  app.put("/api/activities/:id", updateActivity);
  app.post("/api/activities/:id/complete", completeActivity);
  app.delete("/api/activities/:id", deleteActivity);
  
  // CSV Import route
  app.post("/api/import-csv", importCSV);
  
  // Contact form submission endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const validatedData = insertContactSchema.parse({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone || "",
        interest: req.body.interest || "",
        message: req.body.message || "",
      });

      // Store contact in database
      const contact = await storage.createContact(validatedData);
      
      // Return success response
      res.status(201).json({
        message: "Contact form submitted successfully",
        contact,
      });
    } catch (error) {
      // Handle validation errors
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({
          message: "Validation error",
          errors: validationError.details,
        });
      } else {
        console.error("Error processing contact form:", error);
        res.status(500).json({ message: "An unexpected error occurred" });
      }
    }
  });

  // ========================
  // Project Management Routes
  // ========================
  
  // Get client's projects
  app.get("/api/projects", isClient, async (req: Request, res: Response) => {
    try {
      const clientId = req.user!.id;
      const userProjects = await storage.getProjectsByClient(clientId);
      res.json(userProjects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });
  
  // Get a specific project (with access control)
  app.get("/api/projects/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      // Access control: verify user is admin or the client who owns this project
      if (req.user!.userType !== "admin" && project.clientId !== req.user!.id) {
        return res.status(403).json({ message: "You don't have permission to access this project" });
      }
      
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Failed to fetch project details" });
    }
  });
  
  // Create a new project
  app.post("/api/projects", isAuthenticated, async (req: Request, res: Response) => {
    try {
      // Set client ID to the authenticated user (unless admin specifies different client)
      let clientId = req.user!.id;
      
      // If admin and explicitly specifying a different client
      if (req.user!.userType === "admin" && req.body.clientId && req.body.clientId !== clientId) {
        clientId = req.body.clientId;
      }
      
      const projectData = {
        ...req.body,
        clientId,
        status: req.body.status || "pending",
      };
      
      const validatedData = insertProjectSchema.parse(projectData);
      const newProject = await storage.createProject(validatedData);
      
      res.status(201).json(newProject);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: "Validation error",
          errors: validationError.details,
        });
      }
      
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Failed to create project" });
    }
  });
  
  // Update a project
  app.put("/api/projects/:id", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      // Access control: verify user is admin or the client who owns this project
      if (req.user!.userType !== "admin" && project.clientId !== req.user!.id) {
        return res.status(403).json({ message: "You don't have permission to update this project" });
      }
      
      // Update project
      const updatedProject = await storage.updateProject(projectId, req.body);
      
      if (!updatedProject) {
        return res.status(404).json({ message: "Project could not be updated" });
      }
      
      res.json(updatedProject);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ message: "Failed to update project" });
    }
  });
  
  // Delete a project (admin only)
  app.delete("/api/projects/:id", isAdmin, async (req: Request, res: Response) => {
    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      const success = await storage.deleteProject(projectId);
      
      if (!success) {
        return res.status(400).json({ message: "Failed to delete project" });
      }
      
      res.json({ message: "Project deleted successfully" });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: "Failed to delete project" });
    }
  });
  
  // ========================
  // Project Updates Routes
  // ========================
  
  // Get updates for a project
  app.get("/api/projects/:id/updates", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      // Access control: verify user is admin or the client who owns this project
      if (req.user!.userType !== "admin" && project.clientId !== req.user!.id) {
        return res.status(403).json({ message: "You don't have permission to access this project" });
      }
      
      const updates = await storage.getProjectUpdates(projectId);
      res.json(updates);
    } catch (error) {
      console.error("Error fetching project updates:", error);
      res.status(500).json({ message: "Failed to fetch project updates" });
    }
  });
  
  // Add update to a project
  app.post("/api/projects/:id/updates", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      // Access control: verify user is admin or the client who owns this project
      if (req.user!.userType !== "admin" && project.clientId !== req.user!.id) {
        return res.status(403).json({ message: "You don't have permission to update this project" });
      }
      
      const updateData = {
        projectId,
        message: req.body.message,
        createdBy: req.user!.id,
      };
      
      const validatedData = insertProjectUpdateSchema.parse(updateData);
      const newUpdate = await storage.createProjectUpdate(validatedData);
      
      res.status(201).json(newUpdate);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: "Validation error",
          errors: validationError.details,
        });
      }
      
      console.error("Error creating project update:", error);
      res.status(500).json({ message: "Failed to create project update" });
    }
  });
  
  // ========================
  // Project Files Routes
  // ========================
  
  // Get files for a project
  app.get("/api/projects/:id/files", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      // Access control: verify user is admin or the client who owns this project
      if (req.user!.userType !== "admin" && project.clientId !== req.user!.id) {
        return res.status(403).json({ message: "You don't have permission to access this project" });
      }
      
      const files = await storage.getProjectFiles(projectId);
      res.json(files);
    } catch (error) {
      console.error("Error fetching project files:", error);
      res.status(500).json({ message: "Failed to fetch project files" });
    }
  });
  
  // Add file reference to a project
  app.post("/api/projects/:id/files", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const projectId = parseInt(req.params.id);
      if (isNaN(projectId)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      // Access control: verify user is admin or the client who owns this project
      if (req.user!.userType !== "admin" && project.clientId !== req.user!.id) {
        return res.status(403).json({ message: "You don't have permission to update this project" });
      }
      
      const fileData = {
        projectId,
        fileName: req.body.fileName,
        fileType: req.body.fileType,
        fileUrl: req.body.fileUrl,
        uploadedBy: req.user!.id,
      };
      
      const validatedData = insertProjectFileSchema.parse(fileData);
      const newFile = await storage.createProjectFile(validatedData);
      
      res.status(201).json(newFile);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({
          message: "Validation error",
          errors: validationError.details,
        });
      }
      
      console.error("Error adding project file:", error);
      res.status(500).json({ message: "Failed to add project file" });
    }
  });
  
  // Delete file from a project
  app.delete("/api/projects/:projectId/files/:fileId", isAuthenticated, async (req: Request, res: Response) => {
    try {
      const projectId = parseInt(req.params.projectId);
      const fileId = parseInt(req.params.fileId);
      
      if (isNaN(projectId) || isNaN(fileId)) {
        return res.status(400).json({ message: "Invalid ID parameters" });
      }
      
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      // Access control: verify user is admin or the client who owns this project
      if (req.user!.userType !== "admin" && project.clientId !== req.user!.id) {
        return res.status(403).json({ message: "You don't have permission to modify this project" });
      }
      
      const file = await storage.getProjectFile(fileId);
      
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }
      
      if (file.projectId !== projectId) {
        return res.status(400).json({ message: "File does not belong to this project" });
      }
      
      const success = await storage.deleteProjectFile(fileId);
      
      if (!success) {
        return res.status(400).json({ message: "Failed to delete file" });
      }
      
      res.json({ message: "File deleted successfully" });
    } catch (error) {
      console.error("Error deleting project file:", error);
      res.status(500).json({ message: "Failed to delete project file" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
