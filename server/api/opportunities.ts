import { Request, Response } from "express";
import { storage } from "../storage";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { insertOpportunitySchema } from "@shared/schema";

/**
 * Get all opportunities
 */
export async function getOpportunities(req: Request, res: Response) {
  try {
    // Filter by client ID if provided in query
    const clientId = req.query.clientId ? parseInt(req.query.clientId as string) : undefined;
    
    const opportunities = await storage.getOpportunities(clientId);
    res.json(opportunities);
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    res.status(500).json({ message: "Failed to fetch opportunities" });
  }
}

/**
 * Get opportunity by ID
 */
export async function getOpportunityById(req: Request, res: Response) {
  try {
    const opportunityId = parseInt(req.params.id);
    if (isNaN(opportunityId)) {
      return res.status(400).json({ message: "Invalid opportunity ID" });
    }

    const opportunity = await storage.getOpportunity(opportunityId);

    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    res.json(opportunity);
  } catch (error) {
    console.error("Error fetching opportunity:", error);
    res.status(500).json({ message: "Failed to fetch opportunity details" });
  }
}

/**
 * Create a new opportunity
 */
export async function createOpportunity(req: Request, res: Response) {
  try {
    // Validate request body
    const validatedData = insertOpportunitySchema.parse(req.body);

    // Add created by if authenticated
    if (req.user) {
      validatedData.createdBy = req.user.id;
      validatedData.assignedTo = req.user.id; // Default to self-assigned
    }

    // Store opportunity in database
    const opportunity = await storage.createOpportunity(validatedData);
    
    // Return success response
    res.status(201).json(opportunity);
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      const validationError = fromZodError(error);
      res.status(400).json({
        message: "Validation error",
        errors: validationError.details,
      });
    } else {
      console.error("Error creating opportunity:", error);
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
}

/**
 * Update an opportunity
 */
export async function updateOpportunity(req: Request, res: Response) {
  try {
    const opportunityId = parseInt(req.params.id);
    if (isNaN(opportunityId)) {
      return res.status(400).json({ message: "Invalid opportunity ID" });
    }

    const opportunity = await storage.getOpportunity(opportunityId);
    if (!opportunity) {
      return res.status(404).json({ message: "Opportunity not found" });
    }

    // Update opportunity in database
    const updatedOpportunity = await storage.updateOpportunity(opportunityId, req.body);

    if (!updatedOpportunity) {
      return res.status(500).json({ message: "Failed to update opportunity" });
    }

    res.json(updatedOpportunity);
  } catch (error) {
    console.error("Error updating opportunity:", error);
    res.status(500).json({ message: "Failed to update opportunity" });
  }
}

/**
 * Delete an opportunity
 */
export async function deleteOpportunity(req: Request, res: Response) {
  try {
    const opportunityId = parseInt(req.params.id);
    if (isNaN(opportunityId)) {
      return res.status(400).json({ message: "Invalid opportunity ID" });
    }

    const success = await storage.deleteOpportunity(opportunityId);

    if (!success) {
      return res.status(404).json({ message: "Opportunity not found or could not be deleted" });
    }

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting opportunity:", error);
    res.status(500).json({ message: "Failed to delete opportunity" });
  }
}