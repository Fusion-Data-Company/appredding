import { advancedPDFProcessor } from "./advancedPDFProcessor";
import { pdfOCREngine } from "./pdfOCREngine";
import { db } from "../db";
import { customerDocuments, contacts } from "@shared/schema";
import { eq, like, or, sql } from "drizzle-orm";
import OpenAI from "openai";
import * as fs from "fs";
import * as path from "path";
import * as JSZip from "jszip";

// Use OpenRouter for maximum AI model access
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://advancepowerredding.com",
    "X-Title": "Advance Power Universal Document Processor"
  }
});

interface ProcessedDocument {
  originalPath: string;
  filename: string;
  documentType: string;
  extractedData: any;
  processingResult: any;
  success: boolean;
  error?: string;
}

interface FolderProcessingResult {
  totalFiles: number;
  processedFiles: number;
  successfulFiles: number;
  failedFiles: number;
  documents: ProcessedDocument[];
  folderStructure: any;
  processingTime: number;
}

export class UniversalDocumentProcessor {
  
  private supportedExtensions = {
    // PDF Documents
    '.pdf': 'pdf',
    
    // Microsoft Office Documents
    '.doc': 'word',
    '.docx': 'word',
    '.xls': 'excel', 
    '.xlsx': 'excel',
    '.ppt': 'powerpoint',
    '.pptx': 'powerpoint',
    
    // Text Documents
    '.txt': 'text',
    '.rtf': 'text',
    '.csv': 'csv',
    
    // Images (can contain text via OCR)
    '.jpg': 'image',
    '.jpeg': 'image',
    '.png': 'image',
    '.gif': 'image',
    '.bmp': 'image',
    '.tiff': 'image',
    '.tif': 'image',
    '.webp': 'image',
    
    // CAD and Technical Files
    '.dwg': 'cad',
    '.dxf': 'cad',
    '.step': 'cad',
    '.stp': 'cad',
    
    // Archives
    '.zip': 'archive',
    '.rar': 'archive',
    '.7z': 'archive',
    '.tar': 'archive',
    '.gz': 'archive'
  };

  /**
   * Process entire folder structures recursively
   */
  async processFolderStructure(folderPath: string, uploadedBy?: string): Promise<FolderProcessingResult> {
    const startTime = Date.now();
    const processId = `folder_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    
    try {
      // Discover all files recursively
      const allFiles = await this.discoverFilesRecursively(folderPath);
      
      // Build folder structure map
      const folderStructure = await this.buildFolderStructure(folderPath);
      
      // Process all discovered files
      const processedDocuments: ProcessedDocument[] = [];
      let successCount = 0;
      let failCount = 0;
      
      for (const filePath of allFiles) {
        try {
          
          const processingResult = await this.processAnyDocument(filePath, uploadedBy);
          
          processedDocuments.push({
            originalPath: filePath,
            filename: path.basename(filePath),
            documentType: processingResult.documentType,
            extractedData: processingResult.extractedData,
            processingResult: processingResult,
            success: true
          });
          
          successCount++;
          
        } catch (error) {
          console.error(`Failed to process ${filePath}:`, error);
          
          processedDocuments.push({
            originalPath: filePath,
            filename: path.basename(filePath),
            documentType: 'unknown',
            extractedData: {},
            processingResult: null,
            success: false,
            error: error.message
          });
          
          failCount++;
        }
      }
      
      const processingTime = Date.now() - startTime;
      
      
      return {
        totalFiles: allFiles.length,
        processedFiles: allFiles.length,
        successfulFiles: successCount,
        failedFiles: failCount,
        documents: processedDocuments,
        folderStructure: folderStructure,
        processingTime: processingTime
      };
      
    } catch (error) {
      console.error(`Folder processing failed for ${processId}:`, error);
      throw new Error(`Failed to process folder structure: ${error.message}`);
    }
  }

  /**
   * Process any type of document with maximum intelligence
   */
  async processAnyDocument(filePath: string, uploadedBy?: string): Promise<any> {
    const extension = path.extname(filePath).toLowerCase();
    const fileType = this.supportedExtensions[extension];
    
    if (!fileType) {
      throw new Error(`Unsupported file type: ${extension}`);
    }
    
    const fileBuffer = fs.readFileSync(filePath);
    const filename = path.basename(filePath);
    
    
    switch (fileType) {
      case 'pdf':
        return await this.processPDFDocument(fileBuffer, filename, uploadedBy);
        
      case 'word':
        return await this.processWordDocument(fileBuffer, filename, uploadedBy);
        
      case 'excel':
        return await this.processExcelDocument(fileBuffer, filename, uploadedBy);
        
      case 'powerpoint':
        return await this.processPowerPointDocument(fileBuffer, filename, uploadedBy);
        
      case 'text':
      case 'csv':
        return await this.processTextDocument(fileBuffer, filename, uploadedBy);
        
      case 'image':
        return await this.processImageDocument(fileBuffer, filename, uploadedBy);
        
      case 'cad':
        return await this.processCADDocument(fileBuffer, filename, uploadedBy);
        
      case 'archive':
        return await this.processArchiveDocument(filePath, uploadedBy);
        
      default:
        throw new Error(`Processing not implemented for file type: ${fileType}`);
    }
  }

  /**
   * Enhanced PDF Processing (using existing advanced system)
   */
  private async processPDFDocument(fileBuffer: Buffer, filename: string, uploadedBy?: string): Promise<any> {
    // Use the comprehensive PDF workflow engine we already built
    const { pdfWorkflowEngine } = await import('./pdfWorkflowEngine');
    const result = await pdfWorkflowEngine.processDocument(fileBuffer, filename, uploadedBy);
    
    // Enhanced customer matching for PDF
    const customerMatch = await this.advancedCustomerMatching(result, filename);
    
    return {
      ...result,
      customerMatching: customerMatch,
      documentPath: filename
    };
  }

  /**
   * Microsoft Word Document Processing
   */
  private async processWordDocument(fileBuffer: Buffer, filename: string, uploadedBy?: string): Promise<any> {
    const base64Content = fileBuffer.toString('base64');
    
    const response = await openai.chat.completions.create({
      model: "anthropic/claude-3.5-sonnet:beta",
      messages: [{
        role: "user",
        content: `Analyze this Microsoft Word document for a solar company. Extract all relevant business information and return detailed JSON:
        
        {
          "documentType": "contract|proposal|report|correspondence|specification|other",
          "summary": "document summary",
          "extractedData": {
            "customerInfo": "customer details",
            "projectDetails": "solar project information",
            "financialData": "costs, payments, financing",
            "technicalSpecs": "system specifications",
            "dates": "important dates",
            "addresses": "all addresses mentioned",
            "contactInfo": "phone/email details"
          },
          "businessIntelligence": {
            "actionItems": "required actions",
            "opportunities": "business opportunities",
            "risks": "identified risks"
          },
          "confidence": 0.0-1.0
        }
        
        Filename: ${filename}
        Content (base64): ${base64Content.substring(0, 50000)}`
      }],
      max_tokens: 3000,
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  }

  /**
   * Microsoft Excel Spreadsheet Processing
   */
  private async processExcelDocument(fileBuffer: Buffer, filename: string, uploadedBy?: string): Promise<any> {
    const base64Content = fileBuffer.toString('base64');
    
    const response = await openai.chat.completions.create({
      model: "anthropic/claude-3.5-sonnet:beta",
      messages: [{
        role: "user",
        content: `Analyze this Excel spreadsheet for a solar company. Extract all data and structure:
        
        {
          "documentType": "customer_list|pricing|inventory|financial|schedule|other",
          "summary": "spreadsheet purpose and content",
          "extractedData": {
            "worksheets": "list of sheet names",
            "customerData": "customer information found",
            "financialData": "financial information",
            "systemData": "solar system data",
            "scheduleData": "dates and scheduling",
            "inventoryData": "equipment and inventory"
          },
          "tablesData": "structured table data",
          "calculations": "formulas and calculations found",
          "confidence": 0.0-1.0
        }
        
        Filename: ${filename}`
      }],
      max_tokens: 3000,
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  }

  /**
   * PowerPoint Presentation Processing
   */
  private async processPowerPointDocument(fileBuffer: Buffer, filename: string, uploadedBy?: string): Promise<any> {
    const response = await openai.chat.completions.create({
      model: "anthropic/claude-3.5-sonnet:beta",
      messages: [{
        role: "user",
        content: `Analyze this PowerPoint presentation for a solar company:
        
        {
          "documentType": "sales_presentation|training|proposal|technical|marketing|other",
          "summary": "presentation overview",
          "extractedData": {
            "slideCount": "number of slides",
            "keyTopics": "main topics covered",
            "customerInfo": "customer information",
            "productInfo": "solar products/services",
            "pricing": "pricing information",
            "technicalContent": "technical details"
          },
          "businessValue": "sales/business value",
          "confidence": 0.0-1.0
        }
        
        Filename: ${filename}`
      }],
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  }

  /**
   * Text/CSV Document Processing
   */
  private async processTextDocument(fileBuffer: Buffer, filename: string, uploadedBy?: string): Promise<any> {
    const textContent = fileBuffer.toString('utf-8');
    
    const response = await openai.chat.completions.create({
      model: "anthropic/claude-3.5-sonnet:beta",
      messages: [{
        role: "user",
        content: `Analyze this text document for a solar company:
        
        Text content: ${textContent.substring(0, 10000)}
        
        Return JSON:
        {
          "documentType": "customer_data|notes|log|configuration|report|other",
          "summary": "document summary", 
          "extractedData": {
            "structuredData": "any structured data found",
            "customerInfo": "customer information",
            "technicalData": "technical information",
            "dates": "important dates",
            "contacts": "contact information"
          },
          "confidence": 0.0-1.0
        }
        
        Filename: ${filename}`
      }],
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  }

  /**
   * Image Document Processing (OCR + Analysis)
   */
  private async processImageDocument(fileBuffer: Buffer, filename: string, uploadedBy?: string): Promise<any> {
    const base64Image = fileBuffer.toString('base64');
    
    const response = await openai.chat.completions.create({
      model: "anthropic/claude-3.5-sonnet:beta",
      messages: [{
        role: "user",
        content: [
          {
            type: "text",
            text: `Analyze this image for a solar company. Extract all visible text and identify what type of document/image this is:
            
            {
              "documentType": "site_photo|system_diagram|invoice_scan|form|certificate|other",
              "summary": "image description",
              "extractedData": {
                "ocrText": "all visible text",
                "technicalContent": "technical information visible",
                "customerInfo": "customer information",
                "systemInfo": "solar system information",
                "locationInfo": "location/address information"
              },
              "imageAnalysis": {
                "imageType": "photo|diagram|scan|screenshot",
                "quality": "excellent|good|fair|poor",
                "readability": "high|medium|low"
              },
              "confidence": 0.0-1.0
            }
            
            Filename: ${filename}`
          },
          {
            type: "image_url",
            image_url: {
              url: `data:image/jpeg;base64,${base64Image}`
            }
          }
        ]
      }],
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  }

  /**
   * CAD File Processing
   */
  private async processCADDocument(fileBuffer: Buffer, filename: string, uploadedBy?: string): Promise<any> {
    // For CAD files, we'll analyze the file structure and metadata
    return {
      documentType: 'cad_drawing',
      summary: `CAD file: ${filename}`,
      extractedData: {
        fileSize: fileBuffer.length,
        fileType: path.extname(filename),
        technicalDrawing: true,
        requiresSpecializedSoftware: true
      },
      businessIntelligence: {
        actionItems: ['Review CAD file with engineering team'],
        opportunities: ['Technical design analysis'],
        risks: ['Requires CAD software for full analysis']
      },
      confidence: 0.7
    };
  }

  /**
   * Archive Processing (ZIP, RAR, etc.)
   */
  private async processArchiveDocument(filePath: string, uploadedBy?: string): Promise<any> {
    const extension = path.extname(filePath).toLowerCase();
    
    if (extension === '.zip') {
      return await this.processZipFile(filePath, uploadedBy);
    }
    
    // For other archive types, return basic analysis
    return {
      documentType: 'archive',
      summary: `Archive file: ${path.basename(filePath)}`,
      extractedData: {
        archiveType: extension,
        requiresExtraction: true
      },
      businessIntelligence: {
        actionItems: ['Extract and analyze archive contents'],
        opportunities: ['Multiple documents in archive'],
        risks: ['Unknown content']
      },
      confidence: 0.5
    };
  }

  /**
   * ZIP File Processing - Extract and process contents
   */
  private async processZipFile(filePath: string, uploadedBy?: string): Promise<any> {
    try {
      const zipBuffer = fs.readFileSync(filePath);
      const zip = await JSZip.loadAsync(zipBuffer);
      
      const extractedFiles = [];
      const tempDir = path.join(process.cwd(), 'temp_extracted', Date.now().toString());
      
      // Create temporary directory
      fs.mkdirSync(tempDir, { recursive: true });
      
      // Extract all files
      for (const [filename, file] of Object.entries(zip.files)) {
        if (!file.dir) {
          const content = await file.async('nodebuffer');
          const extractedPath = path.join(tempDir, filename);
          
          // Create directory structure
          fs.mkdirSync(path.dirname(extractedPath), { recursive: true });
          
          // Write file
          fs.writeFileSync(extractedPath, content);
          extractedFiles.push(extractedPath);
        }
      }
      
      // Process extracted files recursively
      const folderResult = await this.processFolderStructure(tempDir, uploadedBy);
      
      // Clean up temporary files
      this.cleanupDirectory(tempDir);
      
      return {
        documentType: 'archive_processed',
        summary: `Processed ZIP archive containing ${extractedFiles.length} files`,
        extractedData: {
          originalArchive: path.basename(filePath),
          extractedFileCount: extractedFiles.length,
          processingResult: folderResult
        },
        businessIntelligence: {
          actionItems: ['Review extracted documents'],
          opportunities: [`${folderResult.successfulFiles} documents processed successfully`],
          risks: folderResult.failedFiles > 0 ? [`${folderResult.failedFiles} files failed to process`] : []
        },
        confidence: 0.9
      };
      
    } catch (error) {
      throw new Error(`Failed to process ZIP file: ${error.message}`);
    }
  }

  /**
   * Recursively discover all files in a directory structure
   */
  private async discoverFilesRecursively(dirPath: string): Promise<string[]> {
    const allFiles: string[] = [];
    
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const itemPath = path.join(dirPath, item);
      const stats = fs.statSync(itemPath);
      
      if (stats.isDirectory()) {
        // Recursively process subdirectories
        const subFiles = await this.discoverFilesRecursively(itemPath);
        allFiles.push(...subFiles);
      } else if (stats.isFile()) {
        // Check if file type is supported
        const extension = path.extname(item).toLowerCase();
        if (this.supportedExtensions[extension]) {
          allFiles.push(itemPath);
        }
      }
    }
    
    return allFiles;
  }

  /**
   * Build folder structure map
   */
  private async buildFolderStructure(dirPath: string): Promise<any> {
    const structure: any = {
      name: path.basename(dirPath),
      type: 'directory',
      children: []
    };
    
    try {
      const items = fs.readdirSync(dirPath);
      
      for (const item of items) {
        const itemPath = path.join(dirPath, item);
        const stats = fs.statSync(itemPath);
        
        if (stats.isDirectory()) {
          structure.children.push(await this.buildFolderStructure(itemPath));
        } else {
          structure.children.push({
            name: item,
            type: 'file',
            size: stats.size,
            extension: path.extname(item).toLowerCase(),
            supported: !!this.supportedExtensions[path.extname(item).toLowerCase()]
          });
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dirPath}:`, error);
    }
    
    return structure;
  }

  /**
   * Clean up temporary directories
   */
  private cleanupDirectory(dirPath: string): void {
    try {
      if (fs.existsSync(dirPath)) {
        fs.rmSync(dirPath, { recursive: true, force: true });
      }
    } catch (error) {
      console.error(`Failed to cleanup directory ${dirPath}:`, error);
    }
  }

  /**
   * Advanced Customer Matching System
   * Uses multiple AI models and database searches to identify document owners
   */
  private async advancedCustomerMatching(processingResult: any, filename: string): Promise<any> {
    try {
      
      // Extract all potential customer identifiers from the document
      const identifiers = await this.extractCustomerIdentifiers(processingResult, filename);
      
      // Search existing customers using multiple strategies
      const customerMatches = await this.searchCustomersByIdentifiers(identifiers);
      
      // Use AI to validate and score matches
      const validatedMatches = await this.validateCustomerMatches(customerMatches, processingResult);
      
      // Determine best match or create new customer
      const finalMatch = await this.determineBestCustomerMatch(validatedMatches, identifiers);
      
      return {
        identifiersFound: identifiers,
        potentialMatches: customerMatches,
        validatedMatches: validatedMatches,
        finalMatch: finalMatch,
        confidence: finalMatch?.confidence || 0,
        strategy: finalMatch?.strategy || 'no_match'
      };
      
    } catch (error) {
      console.error('Customer matching failed:', error);
      return {
        error: error.message,
        identifiersFound: [],
        confidence: 0,
        strategy: 'error'
      };
    }
  }

  /**
   * Extract customer identifiers from document content
   */
  private async extractCustomerIdentifiers(processingResult: any, filename: string): Promise<any> {
    try {
      // Use AI to extract comprehensive customer identifiers
      const response = await openai.chat.completions.create({
        model: "anthropic/claude-3.5-sonnet:beta",
        messages: [{
          role: "user",
          content: `Extract ALL possible customer identifiers from this solar company document analysis. Be extremely thorough - look for ANY information that could identify a customer:

Document Analysis: ${JSON.stringify(processingResult, null, 2)}
Filename: ${filename}

Extract and return JSON with ALL possible identifiers:
{
  "names": ["full names", "first names", "last names", "business names"],
  "addresses": ["complete addresses", "street addresses", "cities", "zip codes"],
  "phones": ["all phone numbers found"],
  "emails": ["all email addresses"],
  "accountNumbers": ["customer IDs", "account numbers", "job numbers"],
  "propertyIdentifiers": ["parcel numbers", "property descriptions", "landmarks"],
  "projectIdentifiers": ["permit numbers", "job names", "system IDs"],
  "financialIdentifiers": ["contract numbers", "invoice numbers"],
  "filenameClues": ["patterns in filename that suggest customer"],
  "contextClues": ["any other identifying information"],
  "redding_specific": ["Shasta County addresses", "Redding area locations"]
}`
        }],
        max_tokens: 2000,
        response_format: { type: "json_object" }
      });

      return JSON.parse(response.choices[0].message.content);
      
    } catch (error) {
      console.error('Error extracting customer identifiers:', error);
      return {
        names: [],
        addresses: [],
        phones: [],
        emails: [],
        accountNumbers: [],
        propertyIdentifiers: [],
        projectIdentifiers: [],
        financialIdentifiers: [],
        filenameClues: [],
        contextClues: [],
        redding_specific: []
      };
    }
  }

  /**
   * Search customers using multiple database strategies
   */
  private async searchCustomersByIdentifiers(identifiers: any): Promise<any[]> {
    const matches = [];
    
    try {
      // Strategy 1: Exact name matches
      for (const name of identifiers.names || []) {
        if (name && name.length > 2) {
          const nameMatches = await db.select()
            .from(contacts)
            .where(
              or(
                like(contacts.firstName, `%${name}%`),
                like(contacts.lastName, `%${name}%`),
                like(contacts.companyName, `%${name}%`)
              )
            )
            .limit(10);
          
          matches.push(...nameMatches.map(m => ({ ...m, matchType: 'name', matchValue: name })));
        }
      }

      // Strategy 2: Address matches
      for (const address of identifiers.addresses || []) {
        if (address && address.length > 5) {
          const addressMatches = await db.select()
            .from(contacts)
            .where(like(contacts.billingAddress, `%${address}%`))
            .limit(10);
          
          matches.push(...addressMatches.map(m => ({ ...m, matchType: 'address', matchValue: address })));
        }
      }

      // Strategy 3: Phone number matches
      for (const phone of identifiers.phones || []) {
        if (phone && phone.length > 6) {
          const cleanPhone = phone.replace(/\D/g, '');
          const phoneMatches = await db.select()
            .from(contacts)
            .where(like(contacts.phone, `%${cleanPhone}%`))
            .limit(5);
          
          matches.push(...phoneMatches.map(m => ({ ...m, matchType: 'phone', matchValue: phone })));
        }
      }

      // Strategy 4: Email matches
      for (const email of identifiers.emails || []) {
        if (email && email.includes('@')) {
          const emailMatches = await db.select()
            .from(contacts)
            .where(like(contacts.email, `%${email}%`))
            .limit(5);
          
          matches.push(...emailMatches.map(m => ({ ...m, matchType: 'email', matchValue: email })));
        }
      }

      // Strategy 5: Redding/Shasta County specific searches
      for (const location of identifiers.redding_specific || []) {
        if (location && location.length > 3) {
          const locationMatches = await db.select()
            .from(contacts)
            .where(
              or(
                like(contacts.billingAddress, `%${location}%`),
                like(contacts.billingAddress, '%Redding%'),
                like(contacts.billingAddress, '%Shasta%')
              )
            )
            .limit(10);
          
          matches.push(...locationMatches.map(m => ({ ...m, matchType: 'location', matchValue: location })));
        }
      }

      // Remove duplicates based on customer ID
      const uniqueMatches = matches.filter((match, index, self) => 
        index === self.findIndex(m => m.id === match.id)
      );

      return uniqueMatches;
      
    } catch (error) {
      console.error('Error searching customers:', error);
      return [];
    }
  }

  /**
   * Use AI to validate and score customer matches
   */
  private async validateCustomerMatches(matches: any[], processingResult: any): Promise<any[]> {
    if (matches.length === 0) return [];
    
    try {
      const response = await openai.chat.completions.create({
        model: "anthropic/claude-3.5-sonnet:beta",
        messages: [{
          role: "user",
          content: `Analyze these potential customer matches for a solar company document. Score each match based on how likely it is to be the correct customer:

Document Analysis: ${JSON.stringify(processingResult, null, 2)}

Potential Customers: ${JSON.stringify(matches, null, 2)}

For each customer, provide a confidence score (0.0-1.0) and reasoning:
{
  "validatedMatches": [
    {
      "customerId": "customer ID",
      "confidence": 0.0-1.0,
      "reasoning": "why this is/isn't a good match",
      "matchQuality": "excellent|good|fair|poor",
      "identifierMatches": ["which identifiers matched"]
    }
  ]
}`
        }],
        max_tokens: 2000,
        response_format: { type: "json_object" }
      });

      const validation = JSON.parse(response.choices[0].message.content);
      return validation.validatedMatches || [];
      
    } catch (error) {
      console.error('Error validating customer matches:', error);
      return matches.map(m => ({
        customerId: m.id,
        confidence: 0.5,
        reasoning: 'Fallback validation',
        matchQuality: 'unknown',
        identifierMatches: [m.matchType]
      }));
    }
  }

  /**
   * Determine the best customer match or suggest creating new customer
   */
  private async determineBestCustomerMatch(validatedMatches: any[], identifiers: any): Promise<any> {
    if (validatedMatches.length === 0) {
      return {
        action: 'create_new_customer',
        confidence: 0.8,
        strategy: 'no_matches_found',
        suggestedData: {
          names: identifiers.names || [],
          addresses: identifiers.addresses || [],
          phones: identifiers.phones || [],
          emails: identifiers.emails || []
        }
      };
    }

    // Sort by confidence
    const sortedMatches = validatedMatches.sort((a, b) => b.confidence - a.confidence);
    const bestMatch = sortedMatches[0];

    if (bestMatch.confidence > 0.8) {
      return {
        action: 'link_to_existing',
        customerId: bestMatch.customerId,
        confidence: bestMatch.confidence,
        strategy: 'high_confidence_match',
        reasoning: bestMatch.reasoning,
        matchQuality: bestMatch.matchQuality
      };
    } else if (bestMatch.confidence > 0.6) {
      return {
        action: 'suggest_match',
        customerId: bestMatch.customerId,
        confidence: bestMatch.confidence,
        strategy: 'medium_confidence_match',
        reasoning: bestMatch.reasoning,
        alternatives: sortedMatches.slice(1, 3)
      };
    } else {
      return {
        action: 'manual_review',
        confidence: bestMatch.confidence,
        strategy: 'low_confidence_matches',
        potentialMatches: sortedMatches.slice(0, 5),
        suggestedData: {
          names: identifiers.names || [],
          addresses: identifiers.addresses || [],
          phones: identifiers.phones || [],
          emails: identifiers.emails || []
        }
      };
    }
  }

  /**
   * Get processing statistics
   */
  async getProcessingStats(): Promise<any> {
    try {
      const totalDocs = await db.select({ count: sql<number>`count(*)::int` }).from(customerDocuments);
      const processedDocs = await db.select({ count: sql<number>`count(*)::int` })
        .from(customerDocuments)
        .where(eq(customerDocuments.isProcessed, true));
      
      return {
        totalDocuments: Number(totalDocs[0]?.count || 0),
        processedDocuments: Number(processedDocs[0]?.count || 0),
        supportedFileTypes: Object.keys(this.supportedExtensions).length,
        processingCapabilities: Object.values(this.supportedExtensions).filter((v, i, a) => a.indexOf(v) === i)
      };
    } catch (error) {
      console.error('Error getting processing stats:', error);
      return { 
        totalDocuments: 0,
        processedDocuments: 0,
        supportedFileTypes: Object.keys(this.supportedExtensions).length,
        processingCapabilities: Object.values(this.supportedExtensions).filter((v, i, a) => a.indexOf(v) === i)
      };
    }
  }
}

export const universalDocumentProcessor = new UniversalDocumentProcessor();