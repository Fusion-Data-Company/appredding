import { Request, Response, Router } from "express";
import { storage } from "../storage";
import { 
  insertPainterSchema, 
  insertPoolProfessionalSchema, 
  insertMunicipalityProfessionalSchema, 
  insertConstructionDistributorSchema,
  insertMarinaProfessionalSchema,
  insertMobileHomeProfessionalSchema,
  insertFirePreventionHomeownerSchema
} from "@shared/schema";
import { z } from "zod";

const router = Router();

// Painter registration
router.post("/painters", async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const result = insertPainterSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ 
        error: "Invalid painter data", 
        details: result.error.format() 
      });
    }
    
    // Check if painter with this email already exists
    const existingPainter = await storage.getPainterByEmail(result.data.email);
    if (existingPainter) {
      return res.status(409).json({ error: "A painter with this email already exists" });
    }
    
    // Create the painter
    const painter = await storage.createPainter(result.data);
    
    // Return the painter data
    return res.status(201).json(painter);
  } catch (error) {
    
    return res.status(500).json({ error: "Failed to register painter" });
  }
});

// Pool professional registration
router.post("/pool-professionals", async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const result = insertPoolProfessionalSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ 
        error: "Invalid pool professional data", 
        details: result.error.format() 
      });
    }
    
    // Check if pool professional with this email already exists
    const existingProfessional = await storage.getPoolProfessionalByEmail(result.data.email);
    if (existingProfessional) {
      return res.status(409).json({ error: "A pool professional with this email already exists" });
    }
    
    // Create the pool professional
    const professional = await storage.createPoolProfessional(result.data);
    
    // Return the professional data
    return res.status(201).json(professional);
  } catch (error) {
    
    return res.status(500).json({ error: "Failed to register pool professional" });
  }
});

// Municipality professional registration
router.post("/municipality-professionals", async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const result = insertMunicipalityProfessionalSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ 
        error: "Invalid municipality professional data", 
        details: result.error.format() 
      });
    }
    
    // Check if municipality professional with this email already exists
    const existingProfessional = await storage.getMunicipalityProfessionalByEmail(result.data.email);
    if (existingProfessional) {
      return res.status(409).json({ error: "A municipality professional with this email already exists" });
    }
    
    // Create the municipality professional
    const professional = await storage.createMunicipalityProfessional(result.data);
    
    // Return the professional data
    return res.status(201).json(professional);
  } catch (error) {
    
    return res.status(500).json({ error: "Failed to register municipality professional" });
  }
});

// Construction distributor registration
router.post("/construction-distributors", async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const result = insertConstructionDistributorSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ 
        error: "Invalid construction distributor data", 
        details: result.error.format() 
      });
    }
    
    // Check if construction distributor with this email already exists
    const existingDistributor = await storage.getConstructionDistributorByEmail(result.data.email);
    if (existingDistributor) {
      return res.status(409).json({ error: "A construction distributor with this email already exists" });
    }
    
    // Create the construction distributor
    const distributor = await storage.createConstructionDistributor(result.data);
    
    // Return the distributor data
    return res.status(201).json(distributor);
  } catch (error) {
    
    return res.status(500).json({ error: "Failed to register construction distributor" });
  }
});

// Marina professional registration
router.post("/marina-professionals", async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const result = insertMarinaProfessionalSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ 
        error: "Invalid marina professional data", 
        details: result.error.format() 
      });
    }
    
    // Check if marina professional with this email already exists
    const existingProfessional = await storage.getMarinaProfessionalByEmail(result.data.email);
    if (existingProfessional) {
      return res.status(409).json({ error: "A marina professional with this email already exists" });
    }
    
    // Create the marina professional
    const professional = await storage.createMarinaProfessional(result.data);
    
    // Return the professional data
    return res.status(201).json(professional);
  } catch (error) {
    
    return res.status(500).json({ error: "Failed to register marina professional" });
  }
});

// Mobile Home professional registration
router.post("/mobile-home-professionals", async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const result = insertMobileHomeProfessionalSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ 
        error: "Invalid mobile home professional data", 
        details: result.error.format() 
      });
    }
    
    // Check if mobile home professional with this email already exists
    const existingProfessional = await storage.getMobileHomeProfessionalByEmail(result.data.email);
    if (existingProfessional) {
      return res.status(409).json({ error: "A mobile home professional with this email already exists" });
    }
    
    // Create the mobile home professional
    const professional = await storage.createMobileHomeProfessional(result.data);
    
    // Return the professional data
    return res.status(201).json(professional);
  } catch (error) {
    
    return res.status(500).json({ error: "Failed to register mobile home professional" });
  }
});

// Fire prevention homeowner registration
router.post("/fire-prevention-homeowners", async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const result = insertFirePreventionHomeownerSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ 
        error: "Invalid fire prevention homeowner data", 
        details: result.error.format() 
      });
    }
    
    // Check if fire prevention homeowner with this email already exists
    const existingHomeowner = await storage.getFirePreventionHomeownerByEmail(result.data.email);
    if (existingHomeowner) {
      return res.status(409).json({ error: "A fire prevention homeowner with this email already exists" });
    }
    
    // Create the fire prevention homeowner
    const homeowner = await storage.createFirePreventionHomeowner(result.data);
    
    // Return the homeowner data
    return res.status(201).json(homeowner);
  } catch (error) {
    
    return res.status(500).json({ error: "Failed to register fire prevention homeowner" });
  }
});

export default router;