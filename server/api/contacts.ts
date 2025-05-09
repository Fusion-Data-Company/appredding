import { Request, Response } from "express";
import { db } from "../db";
import { contacts, companies } from "@shared/schema";
import { eq } from "drizzle-orm";

// Get all contacts with their company information
export async function getContacts(req: Request, res: Response) {
  try {
    // Get all contacts with a SQL join to companies
    const result = await db.query.contacts.findMany({
      with: {
        company: true,
      },
    });

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return res.status(500).json({ message: "Failed to fetch contacts" });
  }
}

// Get a single contact by ID
export async function getContactById(req: Request, res: Response) {
  try {
    const contactId = parseInt(req.params.id);
    
    if (isNaN(contactId)) {
      return res.status(400).json({ message: "Invalid contact ID" });
    }
    
    const contact = await db.query.contacts.findFirst({
      where: eq(contacts.id, contactId),
      with: {
        company: true,
      },
    });
    
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    
    return res.status(200).json(contact);
  } catch (error) {
    console.error("Error fetching contact:", error);
    return res.status(500).json({ message: "Failed to fetch contact" });
  }
}

// Create a new contact
export async function createContact(req: Request, res: Response) {
  try {
    const newContact = req.body;
    
    // Insert the contact into the database
    const result = await db.insert(contacts).values(newContact).returning();
    
    return res.status(201).json(result[0]);
  } catch (error) {
    console.error("Error creating contact:", error);
    return res.status(500).json({ message: "Failed to create contact" });
  }
}

// Update an existing contact
export async function updateContact(req: Request, res: Response) {
  try {
    const contactId = parseInt(req.params.id);
    
    if (isNaN(contactId)) {
      return res.status(400).json({ message: "Invalid contact ID" });
    }
    
    const contactData = req.body;
    
    // Update the contact in the database
    const result = await db
      .update(contacts)
      .set(contactData)
      .where(eq(contacts.id, contactId))
      .returning();
    
    if (result.length === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }
    
    return res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error updating contact:", error);
    return res.status(500).json({ message: "Failed to update contact" });
  }
}

// Delete a contact
export async function deleteContact(req: Request, res: Response) {
  try {
    const contactId = parseInt(req.params.id);
    
    if (isNaN(contactId)) {
      return res.status(400).json({ message: "Invalid contact ID" });
    }
    
    // Delete the contact from the database
    const result = await db
      .delete(contacts)
      .where(eq(contacts.id, contactId))
      .returning();
    
    if (result.length === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }
    
    return res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    return res.status(500).json({ message: "Failed to delete contact" });
  }
}