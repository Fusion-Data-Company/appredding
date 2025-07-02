import { Request, Response } from "express";
import { storage } from "../storage";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { insertSocialMediaPostSchema, insertMarketingCampaignSchema } from "@shared/schema";

/**
 * Get all social media posts
 */
export async function getSocialMediaPosts(req: Request, res: Response) {
  try {
    // Filter by status, platform, or campaign if provided
    const status = req.query.status as string | undefined;
    const platform = req.query.platform as string | undefined;
    const campaignId = req.query.campaignId ? parseInt(req.query.campaignId as string) : undefined;
    
    const posts = await storage.getSocialMediaPosts({ status, platform, campaignId });
    res.json(posts);
  } catch (error) {
    
    res.status(500).json({ message: "Failed to fetch social media posts" });
  }
}

/**
 * Get social media post by ID
 */
export async function getSocialMediaPostById(req: Request, res: Response) {
  try {
    const postId = parseInt(req.params.id);
    if (isNaN(postId)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await storage.getSocialMediaPost(postId);

    if (!post) {
      return res.status(404).json({ message: "Social media post not found" });
    }

    res.json(post);
  } catch (error) {
    
    res.status(500).json({ message: "Failed to fetch social media post details" });
  }
}

/**
 * Create a new social media post
 */
export async function createSocialMediaPost(req: Request, res: Response) {
  try {
    // Validate request body
    const validatedData = insertSocialMediaPostSchema.parse(req.body);

    // Add created by if authenticated
    if (req.user) {
      validatedData.createdBy = req.user.id;
      if (!validatedData.assignedTo) {
        validatedData.assignedTo = req.user.id; // Default to self-assigned
      }
    }

    // Store post in database
    const post = await storage.createSocialMediaPost(validatedData);
    
    // Return success response
    res.status(201).json(post);
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      const validationError = fromZodError(error);
      res.status(400).json({
        message: "Validation error",
        errors: validationError.details,
      });
    } else {
      
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
}

/**
 * Update a social media post
 */
export async function updateSocialMediaPost(req: Request, res: Response) {
  try {
    const postId = parseInt(req.params.id);
    if (isNaN(postId)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await storage.getSocialMediaPost(postId);
    if (!post) {
      return res.status(404).json({ message: "Social media post not found" });
    }

    // Update post in database
    const updatedPost = await storage.updateSocialMediaPost(postId, req.body);

    if (!updatedPost) {
      return res.status(500).json({ message: "Failed to update social media post" });
    }

    res.json(updatedPost);
  } catch (error) {
    
    res.status(500).json({ message: "Failed to update social media post" });
  }
}

/**
 * Delete a social media post
 */
export async function deleteSocialMediaPost(req: Request, res: Response) {
  try {
    const postId = parseInt(req.params.id);
    if (isNaN(postId)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const success = await storage.deleteSocialMediaPost(postId);

    if (!success) {
      return res.status(404).json({ message: "Social media post not found or could not be deleted" });
    }

    res.status(204).end();
  } catch (error) {
    
    res.status(500).json({ message: "Failed to delete social media post" });
  }
}

/**
 * Get all marketing campaigns
 */
export async function getMarketingCampaigns(req: Request, res: Response) {
  try {
    // Filter by status if provided
    const status = req.query.status as string | undefined;
    
    const campaigns = await storage.getMarketingCampaigns(status);
    res.json(campaigns);
  } catch (error) {
    
    res.status(500).json({ message: "Failed to fetch marketing campaigns" });
  }
}

/**
 * Get marketing campaign by ID
 */
export async function getMarketingCampaignById(req: Request, res: Response) {
  try {
    const campaignId = parseInt(req.params.id);
    if (isNaN(campaignId)) {
      return res.status(400).json({ message: "Invalid campaign ID" });
    }

    const campaign = await storage.getMarketingCampaign(campaignId);

    if (!campaign) {
      return res.status(404).json({ message: "Marketing campaign not found" });
    }

    res.json(campaign);
  } catch (error) {
    
    res.status(500).json({ message: "Failed to fetch marketing campaign details" });
  }
}

/**
 * Create a new marketing campaign
 */
export async function createMarketingCampaign(req: Request, res: Response) {
  try {
    // Validate request body
    const validatedData = insertMarketingCampaignSchema.parse(req.body);

    // Add created by if authenticated
    if (req.user) {
      validatedData.createdBy = req.user.id;
    }

    // Store campaign in database
    const campaign = await storage.createMarketingCampaign(validatedData);
    
    // Return success response
    res.status(201).json(campaign);
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      const validationError = fromZodError(error);
      res.status(400).json({
        message: "Validation error",
        errors: validationError.details,
      });
    } else {
      
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
}

/**
 * Update a marketing campaign
 */
export async function updateMarketingCampaign(req: Request, res: Response) {
  try {
    const campaignId = parseInt(req.params.id);
    if (isNaN(campaignId)) {
      return res.status(400).json({ message: "Invalid campaign ID" });
    }

    const campaign = await storage.getMarketingCampaign(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: "Marketing campaign not found" });
    }

    // Update campaign in database
    const updatedCampaign = await storage.updateMarketingCampaign(campaignId, req.body);

    if (!updatedCampaign) {
      return res.status(500).json({ message: "Failed to update marketing campaign" });
    }

    res.json(updatedCampaign);
  } catch (error) {
    
    res.status(500).json({ message: "Failed to update marketing campaign" });
  }
}

/**
 * Delete a marketing campaign
 */
export async function deleteMarketingCampaign(req: Request, res: Response) {
  try {
    const campaignId = parseInt(req.params.id);
    if (isNaN(campaignId)) {
      return res.status(400).json({ message: "Invalid campaign ID" });
    }

    const success = await storage.deleteMarketingCampaign(campaignId);

    if (!success) {
      return res.status(404).json({ message: "Marketing campaign not found or could not be deleted" });
    }

    res.status(204).end();
  } catch (error) {
    
    res.status(500).json({ message: "Failed to delete marketing campaign" });
  }
}