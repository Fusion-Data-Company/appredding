import { Request, Response } from "express";
import { storage } from "../storage";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { insertActivitySchema } from "@shared/schema";

/**
 * Get all activities
 */
export async function getActivities(req: Request, res: Response) {
  try {
    // Filter by different parent IDs if provided in query
    const contactId = req.query.contactId ? parseInt(req.query.contactId as string) : undefined;
    const companyId = req.query.companyId ? parseInt(req.query.companyId as string) : undefined;
    const opportunityId = req.query.opportunityId ? parseInt(req.query.opportunityId as string) : undefined;
    
    const activities = await storage.getActivities(contactId, companyId, opportunityId);
    res.json(activities);
  } catch (error) {
    console.error("Error fetching activities:", error);
    res.status(500).json({ message: "Failed to fetch activities" });
  }
}

/**
 * Get activity by ID
 */
export async function getActivityById(req: Request, res: Response) {
  try {
    const activityId = parseInt(req.params.id);
    if (isNaN(activityId)) {
      return res.status(400).json({ message: "Invalid activity ID" });
    }

    const activity = await storage.getActivity(activityId);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json(activity);
  } catch (error) {
    console.error("Error fetching activity:", error);
    res.status(500).json({ message: "Failed to fetch activity details" });
  }
}

/**
 * Create a new activity
 */
export async function createActivity(req: Request, res: Response) {
  try {
    // Validate request body
    const validatedData = insertActivitySchema.parse(req.body);

    // Add created by if authenticated
    if (req.user) {
      validatedData.createdBy = req.user.id;
      validatedData.assignedTo = req.user.id; // Default to self-assigned
    }

    // Store activity in database
    const activity = await storage.createActivity(validatedData);
    
    // Return success response
    res.status(201).json(activity);
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      const validationError = fromZodError(error);
      res.status(400).json({
        message: "Validation error",
        errors: validationError.details,
      });
    } else {
      console.error("Error creating activity:", error);
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
}

/**
 * Update an activity
 */
export async function updateActivity(req: Request, res: Response) {
  try {
    const activityId = parseInt(req.params.id);
    if (isNaN(activityId)) {
      return res.status(400).json({ message: "Invalid activity ID" });
    }

    const activity = await storage.getActivity(activityId);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    // Update activity in database
    const updatedActivity = await storage.updateActivity(activityId, req.body);

    if (!updatedActivity) {
      return res.status(500).json({ message: "Failed to update activity" });
    }

    res.json(updatedActivity);
  } catch (error) {
    console.error("Error updating activity:", error);
    res.status(500).json({ message: "Failed to update activity" });
  }
}

/**
 * Complete an activity
 */
export async function completeActivity(req: Request, res: Response) {
  try {
    const activityId = parseInt(req.params.id);
    if (isNaN(activityId)) {
      return res.status(400).json({ message: "Invalid activity ID" });
    }

    const activity = await storage.getActivity(activityId);
    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    // Update with completion data
    const completionData = {
      completedAt: new Date(),
      outcome: req.body.outcome || "Completed",
    };

    // Update activity in database
    const updatedActivity = await storage.updateActivity(activityId, completionData);

    if (!updatedActivity) {
      return res.status(500).json({ message: "Failed to complete activity" });
    }

    res.json(updatedActivity);
  } catch (error) {
    console.error("Error completing activity:", error);
    res.status(500).json({ message: "Failed to complete activity" });
  }
}

/**
 * Delete an activity
 */
export async function deleteActivity(req: Request, res: Response) {
  try {
    const activityId = parseInt(req.params.id);
    if (isNaN(activityId)) {
      return res.status(400).json({ message: "Invalid activity ID" });
    }

    const success = await storage.deleteActivity(activityId);

    if (!success) {
      return res.status(404).json({ message: "Activity not found or could not be deleted" });
    }

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting activity:", error);
    res.status(500).json({ message: "Failed to delete activity" });
  }
}