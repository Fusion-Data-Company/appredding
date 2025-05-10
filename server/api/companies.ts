import { Request, Response } from "express";
import { storage } from "../storage";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { insertCompanySchema } from "@shared/schema";

/**
 * Get all companies
 */
export async function getCompanies(req: Request, res: Response) {
  try {
    const companies = await storage.getCompanies();
    res.json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ message: "Failed to fetch companies" });
  }
}

/**
 * Get company by ID
 */
export async function getCompanyById(req: Request, res: Response) {
  try {
    const companyId = parseInt(req.params.id);
    if (isNaN(companyId)) {
      return res.status(400).json({ message: "Invalid company ID" });
    }

    const company = await storage.getCompany(companyId);

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.json(company);
  } catch (error) {
    console.error("Error fetching company:", error);
    res.status(500).json({ message: "Failed to fetch company details" });
  }
}

/**
 * Create a new company
 */
export async function createCompany(req: Request, res: Response) {
  try {
    // Validate request body
    const validatedData = insertCompanySchema.parse(req.body);

    // Add created by if authenticated
    if (req.user) {
      validatedData.createdBy = req.user.id;
    }

    // Store company in database
    const company = await storage.createCompany(validatedData);
    
    // Return success response
    res.status(201).json(company);
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      const validationError = fromZodError(error);
      res.status(400).json({
        message: "Validation error",
        errors: validationError.details,
      });
    } else {
      console.error("Error creating company:", error);
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
}

/**
 * Update a company
 */
export async function updateCompany(req: Request, res: Response) {
  try {
    const companyId = parseInt(req.params.id);
    if (isNaN(companyId)) {
      return res.status(400).json({ message: "Invalid company ID" });
    }

    const company = await storage.getCompany(companyId);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // Update company in database
    const updatedCompany = await storage.updateCompany(companyId, req.body);

    if (!updatedCompany) {
      return res.status(500).json({ message: "Failed to update company" });
    }

    res.json(updatedCompany);
  } catch (error) {
    console.error("Error updating company:", error);
    res.status(500).json({ message: "Failed to update company" });
  }
}

/**
 * Delete a company
 */
export async function deleteCompany(req: Request, res: Response) {
  try {
    const companyId = parseInt(req.params.id);
    if (isNaN(companyId)) {
      return res.status(400).json({ message: "Invalid company ID" });
    }

    const success = await storage.deleteCompany(companyId);

    if (!success) {
      return res.status(404).json({ message: "Company not found or could not be deleted" });
    }

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting company:", error);
    res.status(500).json({ message: "Failed to delete company" });
  }
}