import { db } from "../db";
import { customers, customerDocuments } from "@shared/schema";
import { eq, like, or, and, desc, asc } from "drizzle-orm";
import fs from "fs/promises";
import path from "path";

// Document processing service for Advance Power Redding
export class DocumentProcessor {
  
  constructor() {
    // No external dependencies required for basic document management
  }

  /**
   * Process a single document - basic categorization and storage
   */
  async processDocument(documentId: number): Promise<void> {
    try {
      // Update processing status
      await db.update(customerDocuments)
        .set({ 
          processingStatus: 'processing'
        })
        .where(eq(customerDocuments.id, documentId));

      // Get document details
      const [document] = await db
        .select()
        .from(customerDocuments)
        .where(eq(customerDocuments.id, documentId));

      if (!document) {
        throw new Error(`Document ${documentId} not found`);
      }

      // Basic document categorization based on filename
      const category = this.categorizeDocument(document.fileName);
      
      // Extract basic information from filename and metadata
      const extractedData = this.extractBasicInfo(document.fileName);

      // Find or create customer if we can extract address info
      let customerId = document.customerId;
      if (extractedData.address && !customerId) {
        customerId = await this.findOrCreateCustomerByAddress(extractedData.address);
      }

      // Update document with processed information
      await db.update(customerDocuments)
        .set({
          documentCategory: category,
          extractedData: extractedData,
          customerId: customerId,
          processingStatus: 'processed',
          confidence: 0.8 // Basic confidence for rule-based processing
        })
        .where(eq(customerDocuments.id, documentId));

    } catch (error) {

      // Mark as failed
      await db.update(customerDocuments)
        .set({ 
          processingStatus: 'failed'
        })
        .where(eq(customerDocuments.id, documentId));
      
      throw error;
    }
  }

  /**
   * Categorize document based on filename patterns
   */
  private categorizeDocument(fileName: string): string {
    const name = fileName.toLowerCase();
    
    if (name.includes('contract') || name.includes('agreement')) return 'contract';
    if (name.includes('permit') || name.includes('approval')) return 'permit';
    if (name.includes('inspection') || name.includes('report')) return 'inspection';
    if (name.includes('invoice') || name.includes('bill')) return 'invoice';
    if (name.includes('quote') || name.includes('estimate')) return 'quote';
    if (name.includes('survey') || name.includes('site')) return 'site_survey';
    if (name.includes('diagram') || name.includes('electrical')) return 'electrical_diagram';
    if (name.includes('roof') || name.includes('plan')) return 'roof_plan';
    if (name.includes('warranty')) return 'warranty';
    if (name.includes('maintenance') || name.includes('service')) return 'maintenance_log';
    if (name.includes('utility') || name.includes('agreement')) return 'utility_agreement';
    if (name.includes('financing') || name.includes('loan')) return 'financing';
    if (name.includes('insurance')) return 'insurance';
    
    return 'other';
  }

  /**
   * Extract basic information from filename
   */
  private extractBasicInfo(fileName: string): any {
    const extractedData: any = {
      fileName: fileName,
      processedDate: new Date().toISOString()
    };

    // Look for address patterns in filename
    const addressPattern = /(\d+\s+[A-Za-z\s]+(?:st|street|ave|avenue|rd|road|dr|drive|ln|lane|blvd|boulevard|ct|court|pl|place))/i;
    const addressMatch = fileName.match(addressPattern);
    if (addressMatch) {
      extractedData.address = addressMatch[1];
    }

    // Look for year patterns
    const yearPattern = /(20\d{2})/;
    const yearMatch = fileName.match(yearPattern);
    if (yearMatch) {
      extractedData.year = parseInt(yearMatch[1]);
    }

    return extractedData;
  }

  /**
   * Find or create customer by address
   */
  private async findOrCreateCustomerByAddress(address: string): Promise<number> {
    try {
      // Try to find existing customer by address
      const [existingCustomer] = await db
        .select()
        .from(customers)
        .where(like(customers.address, `%${address}%`));

      if (existingCustomer) {
        return existingCustomer.id;
      }

      // Create new customer with minimal information
      const [newCustomer] = await db
        .insert(customers)
        .values({
          address: address,
          fullName: `Customer at ${address}`,
          status: 'customer'
        })
        .returning();

      return newCustomer.id;
    } catch (error) {
      
      throw error;
    }
  }

  /**
   * Get all documents for a customer
   */
  async getCustomerDocuments(customerId: number) {
    return await db
      .select()
      .from(customerDocuments)
      .where(eq(customerDocuments.customerId, customerId))
      .orderBy(desc(customerDocuments.createdAt));
  }

  /**
   * Get documents by category
   */
  async getDocumentsByCategory(category: string) {
    return await db
      .select()
      .from(customerDocuments)
      .where(eq(customerDocuments.documentCategory, category))
      .orderBy(desc(customerDocuments.createdAt));
  }

  /**
   * Search documents
   */
  async searchDocuments(query: string) {
    return await db
      .select()
      .from(customerDocuments)
      .where(
        or(
          like(customerDocuments.fileName, `%${query}%`),
          like(customerDocuments.documentCategory, `%${query}%`)
        )
      )
      .orderBy(desc(customerDocuments.createdAt));
  }

  /**
   * Get processing statistics
   */
  async getProcessingStats() {
    // This would need proper aggregation queries in a real implementation
    // For now, return basic counts
    const totalDocs = await db.select().from(customerDocuments);
    
    return {
      total: totalDocs.length,
      processed: totalDocs.filter(d => d.processingStatus === 'processed').length,
      pending: totalDocs.filter(d => d.processingStatus === 'pending_processing').length,
      failed: totalDocs.filter(d => d.processingStatus === 'failed').length
    };
  }
}

// Export singleton instance
export const documentProcessor = new DocumentProcessor();