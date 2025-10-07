import { db } from "../db";
import { customerDocuments, contacts, solarInstallations, serviceRecords } from "@shared/schema";
import { eq, and, desc, sql } from "drizzle-orm";
import OpenAI from "openai";

// Use OpenRouter instead of OpenAI
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://advancepowerredding.com",
    "X-Title": "Advance Power PDF Processor"
  }
});

interface PDFAnalysisResult {
  documentType: string;
  confidence: number;
  extractedData: any;
  tags: string[];
  summary: string;
  keyFields: Record<string, any>;
  addresses: string[];
  customerInfo: any;
  systemDetails: any;
  financialData: any;
  technicalSpecs: any;
  complianceData: any;
  urgencyLevel: 'low' | 'medium' | 'high' | 'critical';
  actionItems: string[];
  nextSteps: string[];
}

interface DocumentClassification {
  category: 'site_survey' | 'inspection' | 'warranty' | 'contract' | 'permit' | 'maintenance' | 'invoice' | 'proposal' | 'engineering' | 'compliance' | 'insurance' | 'correspondence' | 'technical_spec' | 'photo_documentation' | 'other';
  subType: string;
  businessUnit: 'residential' | 'commercial' | 'municipal' | 'maintenance' | 'general';
  priority: number;
  requiresReview: boolean;
  autoApproved: boolean;
}

export class AdvancedPDFProcessor {
  
  /**
   * Master PDF Analysis Function - Processes any solar industry document
   */
  async analyzePDF(fileBuffer: Buffer, filename: string, customerId?: number): Promise<PDFAnalysisResult> {
    try {
      // Convert PDF to base64 for AI analysis
      const base64PDF = fileBuffer.toString('base64');
      
      // Multi-stage analysis for maximum accuracy
      const [classification, extraction, validation] = await Promise.all([
        this.classifyDocument(base64PDF, filename),
        this.extractDocumentData(base64PDF, filename),
        this.validateAndEnrich(base64PDF, filename, customerId)
      ]);

      // Combine results
      const result: PDFAnalysisResult = {
        documentType: classification.category,
        confidence: classification.priority / 10,
        extractedData: extraction.data,
        tags: [...classification.tags, ...extraction.tags],
        summary: extraction.summary,
        keyFields: extraction.keyFields,
        addresses: extraction.addresses,
        customerInfo: validation.customerInfo,
        systemDetails: validation.systemDetails,
        financialData: validation.financialData,
        technicalSpecs: validation.technicalSpecs,
        complianceData: validation.complianceData,
        urgencyLevel: this.determineUrgency(classification, extraction),
        actionItems: extraction.actionItems,
        nextSteps: validation.nextSteps
      };

      return result;
    } catch (error) {
      
      throw new Error(`Failed to analyze PDF: ${error.message}`);
    }
  }

  /**
   * Advanced Document Classification - Identifies document type with high precision
   */
  private async classifyDocument(base64PDF: string, filename: string): Promise<any> {
    const prompt = `
    You are an expert solar industry document classifier for Advance Power Redding, a 25+ year solar company.
    
    Analyze this PDF document and classify it with maximum precision. Return JSON with this exact structure:
    
    {
      "category": "site_survey|inspection|warranty|contract|permit|maintenance|invoice|proposal|engineering|compliance|insurance|correspondence|technical_spec|photo_documentation|other",
      "subType": "specific document subtype",
      "businessUnit": "residential|commercial|municipal|maintenance|general",
      "priority": 1-10,
      "requiresReview": boolean,
      "autoApproved": boolean,
      "tags": ["tag1", "tag2", "tag3"],
      "confidence": 0.0-1.0,
      "reasoning": "why this classification was chosen"
    }
    
    Classification Guidelines:
    - site_survey: Pre-installation site assessments, roof measurements, shading analysis
    - inspection: Post-installation inspections, safety checks, code compliance
    - warranty: Warranty claims, equipment issues, manufacturer correspondence
    - contract: Sales contracts, installation agreements, financing docs
    - permit: Building permits, electrical permits, interconnection agreements
    - maintenance: Service records, cleaning logs, performance reports
    - invoice: Billing, payments, financial transactions
    - proposal: Sales quotes, system designs, cost estimates
    - engineering: Technical drawings, electrical schematics, structural analysis
    - compliance: Code compliance, safety certifications, regulatory docs
    - insurance: Insurance claims, coverage docs, liability certificates
    - correspondence: Customer emails, letters, communications
    - technical_spec: Equipment specifications, product datasheets
    - photo_documentation: Installation photos, before/after images
    
    Filename: ${filename}
    `;

    const response = await openai.chat.completions.create({
      model: "anthropic/claude-3.5-sonnet:beta",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image_url",
              image_url: {
                url: `data:application/pdf;base64,${base64PDF}`
              }
            }
          ]
        }
      ],
      max_tokens: 1000,
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  }

  /**
   * Deep Data Extraction - Extracts all relevant information from documents
   */
  private async extractDocumentData(base64PDF: string, filename: string): Promise<any> {
    const prompt = `
    You are an expert data extraction specialist for solar industry documents. Extract ALL relevant information from this document.
    
    Return JSON with this comprehensive structure:
    
    {
      "summary": "detailed document summary",
      "keyFields": {
        "customerName": "extracted name",
        "address": "property address", 
        "contactInfo": "phone/email",
        "projectId": "project or job number",
        "systemSize": "kW capacity",
        "equipmentDetails": "panels, inverters, etc",
        "installationDate": "YYYY-MM-DD",
        "cost": "total cost",
        "permit_number": "permit numbers",
        "inspector": "inspector name",
        "contractorLicense": "license number"
      },
      "addresses": ["all addresses found"],
      "dates": ["all dates found"],
      "financialData": {
        "totalCost": "amount",
        "payments": "payment info",
        "financing": "financing details",
        "incentives": "rebates/tax credits"
      },
      "technicalSpecs": {
        "panelSpecs": "panel details",
        "inverterSpecs": "inverter details", 
        "batterySpecs": "battery details",
        "systemCapacity": "kW",
        "estimatedProduction": "kWh/year",
        "roofDetails": "roof specifications"
      },
      "complianceData": {
        "permits": "permit information",
        "inspections": "inspection details",
        "codeCompliance": "code compliance notes",
        "interconnection": "utility interconnection"
      },
      "actionItems": ["required actions"],
      "tags": ["relevant tags"],
      "risks": ["identified risks"],
      "opportunities": ["business opportunities"]
    }
    
    Extract everything possible - customer details, system specifications, financial information, permits, inspections, warranties, maintenance needs, etc.
    
    Filename: ${filename}
    `;

    const response = await openai.chat.completions.create({
      model: "anthropic/claude-3.5-sonnet:beta",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image_url",
              image_url: {
                url: `data:application/pdf;base64,${base64PDF}`
              }
            }
          ]
        }
      ],
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  }

  /**
   * Validation and Enrichment - Cross-references with existing data
   */
  private async validateAndEnrich(base64PDF: string, filename: string, customerId?: number): Promise<any> {
    const prompt = `
    You are a solar industry data validation expert. Analyze this document for data accuracy and business intelligence.
    
    Return JSON:
    {
      "customerInfo": {
        "matchedCustomer": "if found in context",
        "newCustomerIndicator": boolean,
        "customerType": "residential|commercial|municipal"
      },
      "systemDetails": {
        "isExistingSystem": boolean,
        "systemUpgrade": boolean,
        "maintenanceRequired": boolean,
        "warrantyStatus": "active|expired|unknown"
      },
      "financialData": {
        "paymentStatus": "paid|pending|overdue",
        "billingIssues": "any billing concerns",
        "collectionRequired": boolean
      },
      "technicalSpecs": {
        "equipmentAge": "estimated age",
        "performanceIssues": "any performance problems",
        "upgradeOpportunities": "potential upgrades"
      },
      "complianceData": {
        "permitStatus": "active|expired|pending",
        "inspectionRequired": boolean,
        "codeViolations": "any violations noted"
      },
      "nextSteps": ["recommended actions"],
      "businessValue": "high|medium|low",
      "dataQuality": "excellent|good|fair|poor"
    }
    `;

    const response = await openai.chat.completions.create({
      model: "anthropic/claude-3.5-sonnet:beta",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt
            },
            {
              type: "image_url",
              image_url: {
                url: `data:application/pdf;base64,${base64PDF}`
              }
            }
          ]
        }
      ],
      max_tokens: 1500,
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  }

  /**
   * Smart Address Extraction and Geocoding
   */
  async extractAndGeocodeAddresses(extractedData: any): Promise<any[]> {
    const addresses = extractedData.addresses || [];
    const geocodedAddresses = [];

    for (const address of addresses) {
      try {
        // Basic address validation for Shasta County area
        if (this.isValidShastaCountyAddress(address)) {
          geocodedAddresses.push({
            original: address,
            formatted: this.formatAddress(address),
            zipCode: this.extractZipCode(address),
            city: this.extractCity(address),
            isServiceArea: true
          });
        }
      } catch (error) {
      }
    }

    return geocodedAddresses;
  }

  /**
   * Customer Matching Algorithm
   */
  async findMatchingCustomer(extractedData: any): Promise<any> {
    const { customerName, address, contactInfo } = extractedData.keyFields;

    try {
      // Search by name first
      if (customerName) {
        const nameMatch = await db.select()
          .from(contacts)
          .where(sql`LOWER(${contacts.name}) LIKE LOWER(${`%${customerName}%`})`)
          .limit(5);

        if (nameMatch.length > 0) {
          return nameMatch[0];
        }
      }

      // Search by address
      if (address) {
        const addressMatch = await db.select()
          .from(contacts)
          .where(sql`LOWER(${contacts.propertyAddress}) LIKE LOWER(${`%${address}%`})`)
          .limit(5);

        if (addressMatch.length > 0) {
          return addressMatch[0];
        }
      }

      // Search by contact info
      if (contactInfo) {
        const contactMatch = await db.select()
          .from(contacts)
          .where(sql`${contacts.email} LIKE ${`%${contactInfo}%`} OR ${contacts.phone} LIKE ${`%${contactInfo}%`}`)
          .limit(5);

        if (contactMatch.length > 0) {
          return contactMatch[0];
        }
      }

      return null;
    } catch (error) {
      
      return null;
    }
  }

  /**
   * Auto-Create Customer from Document Data
   */
  async createCustomerFromDocument(extractedData: any): Promise<number> {
    const { customerName, address, contactInfo } = extractedData.keyFields;
    
    try {
      const [newContact] = await db.insert(contacts).values({
        name: customerName || 'Unknown Customer',
        email: this.extractEmail(contactInfo) || null,
        phone: this.extractPhone(contactInfo) || null,
        propertyAddress: address || null,
        source: 'document_processing',
        status: 'lead',
        assignedTo: 'system',
        notes: `Auto-created from document processing: ${new Date().toISOString()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();

      return newContact.id;
    } catch (error) {
      
      throw error;
    }
  }

  /**
   * Smart Document Storage
   */
  async storeProcessedDocument(
    fileBuffer: Buffer, 
    filename: string, 
    analysisResult: PDFAnalysisResult,
    customerId: number
  ): Promise<number> {
    try {
      const [document] = await db.insert(customerDocuments).values({
        customerId: customerId,
        filename: filename,
        originalName: filename,
        mimeType: 'application/pdf',
        fileSize: fileBuffer.length,
        documentCategory: analysisResult.documentType as any,
        tags: analysisResult.tags.join(','),
        extractedData: JSON.stringify(analysisResult.extractedData),
        summary: analysisResult.summary,
        isProcessed: true,
        confidence: analysisResult.confidence,
        uploadedAt: new Date(),
        processedAt: new Date()
      }).returning();

      return document.id;
    } catch (error) {
      
      throw error;
    }
  }

  /**
   * Document Relationship Builder
   */
  async buildDocumentRelationships(documentId: number, analysisResult: PDFAnalysisResult): Promise<void> {
    try {
      // Link to solar installations if system details found
      if (analysisResult.systemDetails && analysisResult.customerInfo) {
        const installations = await db.select()
          .from(solarInstallations)
          .where(eq(solarInstallations.customerId, analysisResult.customerInfo.id))
          .limit(5);

        // Additional relationship logic here
      }

      // Link to service records if maintenance document
      if (analysisResult.documentType === 'maintenance') {
        // Service record linking logic
      }

    } catch (error) {
      
    }
  }

  // Helper methods
  private determineUrgency(classification: any, extraction: any): 'low' | 'medium' | 'high' | 'critical' {
    if (classification.category === 'warranty' || extraction.risks?.length > 0) return 'high';
    if (classification.category === 'inspection' || classification.requiresReview) return 'medium';
    return 'low';
  }

  private isValidShastaCountyAddress(address: string): boolean {
    const shastaKeywords = ['redding', 'anderson', 'shasta', 'palo cedro', 'shasta lake', '96001', '96002', '96003', '96019', '96073'];
    return shastaKeywords.some(keyword => address.toLowerCase().includes(keyword));
  }

  private formatAddress(address: string): string {
    return address.trim().replace(/\s+/g, ' ');
  }

  private extractZipCode(address: string): string {
    const zipMatch = address.match(/\b\d{5}(-\d{4})?\b/);
    return zipMatch ? zipMatch[0] : '';
  }

  private extractCity(address: string): string {
    const cities = ['redding', 'anderson', 'shasta lake', 'palo cedro'];
    const foundCity = cities.find(city => address.toLowerCase().includes(city));
    return foundCity ? foundCity.charAt(0).toUpperCase() + foundCity.slice(1) : '';
  }

  private extractEmail(contactInfo: string): string | null {
    if (!contactInfo) return null;
    const emailMatch = contactInfo.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    return emailMatch ? emailMatch[0] : null;
  }

  private extractPhone(contactInfo: string): string | null {
    if (!contactInfo) return null;
    const phoneMatch = contactInfo.match(/\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})/);
    return phoneMatch ? `(${phoneMatch[1]}) ${phoneMatch[2]}-${phoneMatch[3]}` : null;
  }
}

export const advancedPDFProcessor = new AdvancedPDFProcessor();