import { Request, Response } from "express";
import { storage } from "../storage";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import { insertContactSchema } from "@shared/schema";

/**
 * Get all contacts
 */
export async function getContacts(req: Request, res: Response) {
  try {
    const contacts = await storage.getContacts();
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
}

/**
 * Get contact by ID
 */
export async function getContactById(req: Request, res: Response) {
  try {
    const contactId = parseInt(req.params.id);
    if (isNaN(contactId)) {
      return res.status(400).json({ message: "Invalid contact ID" });
    }

    const contact = await storage.getContact(contactId);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.json(contact);
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({ message: "Failed to fetch contact details" });
  }
}

/**
 * Create a new CRM contact
 */
export async function createCRMContact(req: Request, res: Response) {
  try {
    // Validate request body
    const validatedData = insertContactSchema.parse(req.body);

    // Store contact in database
    const contact = await storage.createContact(validatedData);
    
    // Return success response
    res.status(201).json(contact);
  } catch (error) {
    // Handle validation errors
    if (error instanceof z.ZodError) {
      const validationError = fromZodError(error);
      res.status(400).json({
        message: "Validation error",
        errors: validationError.details,
      });
    } else {
      console.error("Error creating contact:", error);
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
}

/**
 * Update a contact
 */
export async function updateContact(req: Request, res: Response) {
  try {
    const contactId = parseInt(req.params.id);
    if (isNaN(contactId)) {
      return res.status(400).json({ message: "Invalid contact ID" });
    }

    const contact = await storage.getContact(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Update contact in database
    const updatedContact = await storage.updateContact(contactId, req.body);

    if (!updatedContact) {
      return res.status(500).json({ message: "Failed to update contact" });
    }

    res.json(updatedContact);
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ message: "Failed to update contact" });
  }
}

/**
 * Delete a contact
 */
export async function deleteContact(req: Request, res: Response) {
  try {
    const contactId = parseInt(req.params.id);
    if (isNaN(contactId)) {
      return res.status(400).json({ message: "Invalid contact ID" });
    }

    const success = await storage.deleteContact(contactId);

    if (!success) {
      return res.status(404).json({ message: "Contact not found or could not be deleted" });
    }

    res.status(204).end();
  } catch (error) {
    console.error("Error deleting contact:", error);
    res.status(500).json({ message: "Failed to delete contact" });
  }
}