import { db } from "../db";
import { customers, customerDocuments, documentProcessingJobs } from "@shared/schema";
import { eq, like, or, and, desc, asc } from "drizzle-orm";
import OpenAI from "openai";
import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import sharp from "sharp";

// AI-powered document processing service for solar business
export class DocumentProcessor {
  private openai: OpenAI;

  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY is required for document processing");
    }
    this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }

  /**
   * Process a single document - extract text, identify customer, categorize
   */
  async processDocument(documentId: number): Promise<void> {
    try {
      // Update processing status
      await db.update(customerDocuments)
        .set({ 
          processingStatus: 'processing',
          updatedAt: new Date()
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

      // Extract text based on file type
      let extractedText = "";
      let extractedData: any = {};

      if (document.fileType.toLowerCase() === 'pdf') {
        extractedText = await this.extractTextFromPDF(document.filePath);
      } else if (['jpg', 'jpeg', 'png', 'webp'].includes(document.fileType.toLowerCase())) {
        extractedText = await this.extractTextFromImage(document.filePath);
      } else if (['doc', 'docx'].includes(document.fileType.toLowerCase())) {
        extractedText = await this.extractTextFromDocument(document.filePath);
      } else if (['xls', 'xlsx', 'csv'].includes(document.fileType.toLowerCase())) {
        extractedText = await this.extractTextFromSpreadsheet(document.filePath);
      }

      // Use AI to analyze and extract structured data
      const analysisResult = await this.analyzeDocumentWithAI(extractedText, document.fileName);

      // Find or create customer based on extracted information
      const customer = await this.findOrCreateCustomer(
        analysisResult.customerName,
        analysisResult.customerAddress,
        analysisResult.extractedData
      );

      // Update document with processed information
      await db.update(customerDocuments)
        .set({
          customerId: customer.id,
          extractedText: extractedText,
          extractedData: analysisResult.extractedData,
          customerNameFound: analysisResult.customerName,
          customerAddressFound: analysisResult.customerAddress,
          documentCategory: analysisResult.documentCategory,
          documentDate: analysisResult.documentDate,
          documentValue: analysisResult.documentValue,
          confidence: analysisResult.confidence,
          searchableContent: this.createSearchableContent(extractedText, analysisResult),
          processingStatus: 'processed',
          processedAt: new Date(),
          processedBy: 'ai-processor-v1',
          updatedAt: new Date()
        })
        .where(eq(customerDocuments.id, documentId));

      // Update customer document count
      await this.updateCustomerDocumentCount(customer.id);

      console.log(`Successfully processed document ${documentId} for customer ${customer.id}`);

    } catch (error) {
      console.error(`Error processing document ${documentId}:`, error);
      
      // Update with error status
      await db.update(customerDocuments)
        .set({
          processingStatus: 'failed',
          processingError: error instanceof Error ? error.message : 'Unknown error',
          updatedAt: new Date()
        })
        .where(eq(customerDocuments.id, documentId));

      throw error;
    }
  }

  /**
   * Extract text from PDF using AI vision
   */
  private async extractTextFromPDF(filePath: string): Promise<string> {
    try {
      // Convert PDF to images using sharp (for first page)
      const pdfBuffer = await fs.readFile(filePath);
      
      // For now, use AI vision to read the PDF content
      // In production, you'd want to use a proper PDF parser like pdf2pic + OCR
      const base64 = pdfBuffer.toString('base64');
      
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o", // Latest model with vision capabilities
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Extract all text content from this PDF document. Focus on customer information, addresses, dates, and financial information. Return the raw text content."
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:application/pdf;base64,${base64}`
                }
              }
            ]
          }
        ],
        max_tokens: 4000
      });

      return response.choices[0].message.content || "";
    } catch (error) {
      console.error("Error extracting text from PDF:", error);
      return "";
    }
  }

  /**
   * Extract text from image using AI vision
   */
  private async extractTextFromImage(filePath: string): Promise<string> {
    try {
      const imageBuffer = await fs.readFile(filePath);
      const base64 = imageBuffer.toString('base64');
      
      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Extract all text content from this image. Focus on customer information, addresses, dates, and any financial information. Return the complete text content you can read."
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64}`
                }
              }
            ]
          }
        ],
        max_tokens: 4000
      });

      return response.choices[0].message.content || "";
    } catch (error) {
      console.error("Error extracting text from image:", error);
      return "";
    }
  }

  /**
   * Extract text from document files
   */
  private async extractTextFromDocument(filePath: string): Promise<string> {
    // For DOC/DOCX files, you'd typically use a library like mammoth.js
    // For now, return placeholder - this would need proper implementation
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return content;
    } catch {
      return "";
    }
  }

  /**
   * Extract text from spreadsheet files
   */
  private async extractTextFromSpreadsheet(filePath: string): Promise<string> {
    // For XLS/XLSX files, you'd use a library like xlsx
    // For CSV, use csv-parse which is already available
    try {
      if (filePath.endsWith('.csv')) {
        const content = await fs.readFile(filePath, 'utf-8');
        return content;
      }
      return "";
    } catch {
      return "";
    }
  }

  /**
   * Use AI to analyze document and extract structured data
   */
  private async analyzeDocumentWithAI(text: string, fileName: string): Promise<any> {
    try {
      const prompt = `
Analyze this solar business document and extract key information. The document content is:

${text}

Please extract and return a JSON object with the following structure:
{
  "customerName": "Full customer name found in document",
  "customerAddress": "Complete address found in document", 
  "documentCategory": "contract|permit|inspection|invoice|quote|site_survey|electrical_diagram|roof_plan|warranty|maintenance_log|correspondence|permit_application|utility_agreement|financing|insurance|other",
  "documentDate": "YYYY-MM-DD format if found",
  "documentValue": "Numeric value if this is a financial document",
  "confidence": "0.0 to 1.0 confidence score for the extraction",
  "extractedData": {
    "systemSize": "Solar system size in kW if mentioned",
    "panelCount": "Number of panels if mentioned",
    "inverterType": "Inverter type/brand if mentioned",
    "installationYear": "Year of installation if mentioned",
    "phoneNumber": "Phone number if found",
    "email": "Email address if found",
    "propertyType": "residential|commercial if mentioned",
    "utilityCompany": "Utility company name if mentioned",
    "permitNumber": "Permit number if this is a permit document",
    "inspectionDate": "Inspection date if this is an inspection report",
    "contractValue": "Contract amount if this is a contract",
    "additionalDetails": "Any other relevant information"
  }
}

Focus on accuracy. If information is not clearly present, use null values. For addresses, try to find complete street addresses with city/state/zip if possible.
`;

      const response = await this.openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are an expert at extracting structured data from solar business documents. Always respond with valid JSON."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 2000
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      
      // Ensure confidence is set
      if (!result.confidence) {
        result.confidence = 0.7; // Default confidence
      }

      return result;
    } catch (error) {
      console.error("Error analyzing document with AI:", error);
      return {
        customerName: null,
        customerAddress: null,
        documentCategory: 'other',
        documentDate: null,
        documentValue: null,
        confidence: 0.1,
        extractedData: {}
      };
    }
  }

  /**
   * Find existing customer or create new one based on address/name
   */
  private async findOrCreateCustomer(customerName: string | null, customerAddress: string | null, extractedData: any): Promise<any> {
    let customer = null;

    // First try to find by address (primary identifier)
    if (customerAddress) {
      const addressQuery = customerAddress.toLowerCase().trim();
      const existingCustomers = await db
        .select()
        .from(customers)
        .where(like(customers.address, `%${addressQuery}%`));
      
      if (existingCustomers.length > 0) {
        customer = existingCustomers[0];
      }
    }

    // If not found by address, try by name
    if (!customer && customerName) {
      const nameQuery = customerName.toLowerCase().trim();
      const existingCustomers = await db
        .select()
        .from(customers)
        .where(
          or(
            like(customers.fullName, `%${nameQuery}%`),
            and(
              like(customers.firstName, `%${nameQuery.split(' ')[0]}%`),
              like(customers.lastName, `%${nameQuery.split(' ').slice(-1)[0]}%`)
            )
          )
        );
      
      if (existingCustomers.length > 0) {
        customer = existingCustomers[0];
      }
    }

    // Create new customer if not found
    if (!customer) {
      const nameParts = customerName ? customerName.split(' ') : ['Unknown', 'Customer'];
      const firstName = nameParts[0] || 'Unknown';
      const lastName = nameParts.slice(1).join(' ') || 'Customer';

      const [newCustomer] = await db
        .insert(customers)
        .values({
          firstName: firstName,
          lastName: lastName,
          fullName: customerName || `${firstName} ${lastName}`,
          address: customerAddress || 'Address Unknown',
          email: extractedData.email || null,
          phone: extractedData.phoneNumber || null,
          systemSize: extractedData.systemSize ? parseFloat(extractedData.systemSize).toString() : null,
          panelCount: extractedData.panelCount ? parseInt(extractedData.panelCount) : null,
          inverterType: extractedData.inverterType || null,
          installationYear: extractedData.installationYear ? parseInt(extractedData.installationYear) : null,
          customerSince: new Date().toISOString().split('T')[0],
          status: 'customer'
        })
        .returning();

      customer = newCustomer;
    } else {
      // Update existing customer with any new information
      const updateData: any = {};
      
      if (extractedData.email && !customer.email) updateData.email = extractedData.email;
      if (extractedData.phoneNumber && !customer.phone) updateData.phone = extractedData.phoneNumber;
      if (extractedData.systemSize && !customer.systemSize) updateData.systemSize = parseFloat(extractedData.systemSize);
      if (extractedData.panelCount && !customer.panelCount) updateData.panelCount = parseInt(extractedData.panelCount);
      if (extractedData.inverterType && !customer.inverterType) updateData.inverterType = extractedData.inverterType;
      if (extractedData.installationYear && !customer.installationYear) updateData.installationYear = parseInt(extractedData.installationYear);

      if (Object.keys(updateData).length > 0) {
        updateData.updatedAt = new Date();
        await db.update(customers)
          .set(updateData)
          .where(eq(customers.id, customer.id));
      }
    }

    return customer;
  }

  /**
   * Create searchable content for full-text search
   */
  private createSearchableContent(text: string, analysisResult: any): string {
    const searchableFields = [
      text,
      analysisResult.customerName,
      analysisResult.customerAddress,
      analysisResult.documentCategory,
      JSON.stringify(analysisResult.extractedData)
    ].filter(Boolean);

    return searchableFields.join(' ').toLowerCase();
  }

  /**
   * Update customer's total document count
   */
  private async updateCustomerDocumentCount(customerId: number): Promise<void> {
    const [countResult] = await db
      .select({ count: customerDocuments.id })
      .from(customerDocuments)
      .where(eq(customerDocuments.customerId, customerId));

    await db.update(customers)
      .set({
        totalDocuments: countResult?.count || 0,
        lastDocumentDate: new Date(),
        updatedAt: new Date()
      })
      .where(eq(customers.id, customerId));
  }

  /**
   * Process multiple documents in batch
   */
  async processBatch(documentIds: number[]): Promise<void> {
    const batchId = uuidv4();
    
    // Create processing jobs
    for (const documentId of documentIds) {
      await db.insert(documentProcessingJobs).values({
        batchId,
        documentId,
        status: 'pending_processing',
        priority: 5,
        aiModel: 'gpt-4o'
      });
    }

    // Process each document
    for (const documentId of documentIds) {
      try {
        await this.processDocument(documentId);
        
        // Update job status
        await db.update(documentProcessingJobs)
          .set({
            status: 'processed',
            processingCompletedAt: new Date()
          })
          .where(and(
            eq(documentProcessingJobs.documentId, documentId),
            eq(documentProcessingJobs.batchId, batchId)
          ));

      } catch (error) {
        console.error(`Failed to process document ${documentId}:`, error);
        
        // Update job with error
        await db.update(documentProcessingJobs)
          .set({
            status: 'failed',
            lastError: error instanceof Error ? error.message : 'Unknown error',
            processingCompletedAt: new Date()
          })
          .where(and(
            eq(documentProcessingJobs.documentId, documentId),
            eq(documentProcessingJobs.batchId, batchId)
          ));
      }
    }
  }

  /**
   * Search customers and documents
   */
  async searchCustomersAndDocuments(query: string, filters: any = {}) {
    const searchQuery = query.toLowerCase();
    
    // Search customers
    let customerQuery = db.select().from(customers);
    
    if (searchQuery) {
      customerQuery = customerQuery.where(
        or(
          like(customers.fullName, `%${searchQuery}%`),
          like(customers.firstName, `%${searchQuery}%`),
          like(customers.lastName, `%${searchQuery}%`),
          like(customers.address, `%${searchQuery}%`),
          like(customers.email, `%${searchQuery}%`),
          like(customers.phone, `%${searchQuery}%`)
        )
      );
    }

    // Apply filters
    if (filters.installationYear) {
      customerQuery = customerQuery.where(eq(customers.installationYear, filters.installationYear));
    }
    if (filters.status) {
      customerQuery = customerQuery.where(eq(customers.status, filters.status));
    }

    const customersResult = await customerQuery.orderBy(desc(customers.updatedAt));

    // Search documents
    let documentQuery = db
      .select({
        id: customerDocuments.id,
        fileName: customerDocuments.fileName,
        originalFileName: customerDocuments.originalFileName,
        fileType: customerDocuments.fileType,
        documentCategory: customerDocuments.documentCategory,
        documentDate: customerDocuments.documentDate,
        processingStatus: customerDocuments.processingStatus,
        confidence: customerDocuments.confidence,
        customerId: customerDocuments.customerId,
        customerName: customers.fullName,
        customerAddress: customers.address,
        createdAt: customerDocuments.createdAt
      })
      .from(customerDocuments)
      .leftJoin(customers, eq(customerDocuments.customerId, customers.id));

    if (searchQuery) {
      documentQuery = documentQuery.where(
        or(
          like(customerDocuments.searchableContent, `%${searchQuery}%`),
          like(customerDocuments.fileName, `%${searchQuery}%`),
          like(customerDocuments.extractedText, `%${searchQuery}%`)
        )
      );
    }

    if (filters.documentCategory) {
      documentQuery = documentQuery.where(eq(customerDocuments.documentCategory, filters.documentCategory));
    }
    if (filters.processingStatus) {
      documentQuery = documentQuery.where(eq(customerDocuments.processingStatus, filters.processingStatus));
    }

    const documentsResult = await documentQuery.orderBy(desc(customerDocuments.createdAt));

    return {
      customers: customersResult,
      documents: documentsResult
    };
  }
}

export const documentProcessor = new DocumentProcessor();