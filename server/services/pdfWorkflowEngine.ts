import { advancedPDFProcessor } from "./advancedPDFProcessor";
import { pdfOCREngine } from "./pdfOCREngine";
import { db } from "../db";
import { customerDocuments, contacts, solarInstallations } from "@shared/schema";
import { eq } from "drizzle-orm";

/**
 * Complete PDF Workflow Engine - Orchestrates the entire document processing pipeline
 */
export class PDFWorkflowEngine {
  
  /**
   * Master PDF Processing Pipeline - Handles complete document lifecycle
   */
  async processDocument(fileBuffer: Buffer, filename: string, uploadedBy?: string): Promise<any> {
    const processId = `proc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    console.log(`Starting PDF processing pipeline: ${processId} for file: ${filename}`);
    
    try {
      // Stage 1: Multi-Model OCR Processing
      console.log(`${processId}: Stage 1 - OCR Processing`);
      const ocrResults = await pdfOCREngine.processWithMultipleModels(fileBuffer, filename);
      
      // Stage 2: Document Quality Assessment
      console.log(`${processId}: Stage 2 - Quality Assessment`);
      const qualityAssessment = await pdfOCREngine.assessDocumentQuality(fileBuffer.toString('base64'));
      
      // Stage 3: Advanced Document Analysis
      console.log(`${processId}: Stage 3 - Advanced Analysis`);
      const analysisResult = await advancedPDFProcessor.analyzePDF(fileBuffer, filename);
      
      // Stage 4: Handwriting and Signature Detection
      console.log(`${processId}: Stage 4 - Handwriting Detection`);
      const handwritingResults = await pdfOCREngine.detectHandwritingAndSignatures(fileBuffer.toString('base64'));
      
      // Stage 5: Table and Form Extraction
      console.log(`${processId}: Stage 5 - Table/Form Extraction`);
      const tablesAndForms = await pdfOCREngine.extractTablesAndForms(fileBuffer.toString('base64'));
      
      // Stage 6: Technical Drawing Analysis
      console.log(`${processId}: Stage 6 - Technical Drawing Analysis`);
      const technicalDrawings = await pdfOCREngine.analyzeTechnicalDrawings(fileBuffer.toString('base64'));
      
      // Stage 7: Address Extraction and Geocoding
      console.log(`${processId}: Stage 7 - Address Processing`);
      const geocodedAddresses = await advancedPDFProcessor.extractAndGeocodeAddresses(analysisResult.extractedData);
      
      // Stage 8: Customer Matching
      console.log(`${processId}: Stage 8 - Customer Matching`);
      const matchedCustomer = await advancedPDFProcessor.findMatchingCustomer(analysisResult.extractedData);
      
      let customerId: number;
      if (matchedCustomer) {
        customerId = matchedCustomer.id;
        console.log(`${processId}: Found existing customer: ${matchedCustomer.name}`);
      } else {
        console.log(`${processId}: Creating new customer from document data`);
        customerId = await advancedPDFProcessor.createCustomerFromDocument(analysisResult.extractedData);
      }
      
      // Stage 9: Document Storage
      console.log(`${processId}: Stage 9 - Document Storage`);
      const documentId = await advancedPDFProcessor.storeProcessedDocument(
        fileBuffer, 
        filename, 
        analysisResult, 
        customerId
      );
      
      // Stage 10: Relationship Building
      console.log(`${processId}: Stage 10 - Building Relationships`);
      await advancedPDFProcessor.buildDocumentRelationships(documentId, analysisResult);
      
      // Stage 11: Business Intelligence Generation
      console.log(`${processId}: Stage 11 - Business Intelligence`);
      const businessIntelligence = await this.generateBusinessIntelligence(analysisResult, ocrResults, customerId);
      
      // Stage 12: Action Item Generation
      console.log(`${processId}: Stage 12 - Action Items`);
      const actionItems = await this.generateActionItems(analysisResult, matchedCustomer, documentId);
      
      // Comprehensive Processing Result
      const processingResult = {
        processId,
        documentId,
        customerId,
        filename,
        status: 'completed',
        confidence: analysisResult.confidence,
        
        // Core Analysis Results
        documentType: analysisResult.documentType,
        extractedData: analysisResult.extractedData,
        summary: analysisResult.summary,
        
        // OCR Results
        ocrResults: {
          fullText: ocrResults.fullText,
          confidence: ocrResults.confidence,
          processedBy: ocrResults.processedBy
        },
        
        // Quality Assessment
        quality: qualityAssessment,
        
        // Specialized Extractions
        handwriting: handwritingResults,
        tablesAndForms: tablesAndForms,
        technicalDrawings: technicalDrawings,
        
        // Geographic Data
        addresses: geocodedAddresses,
        
        // Customer Information
        customer: {
          id: customerId,
          isNewCustomer: !matchedCustomer,
          matchedData: matchedCustomer
        },
        
        // Business Intelligence
        businessIntelligence,
        
        // Action Items
        actionItems,
        
        // Processing Metadata
        processedAt: new Date().toISOString(),
        processingTime: Date.now() - parseInt(processId.split('_')[1]),
        uploadedBy: uploadedBy || 'system'
      };
      
      console.log(`${processId}: Processing completed successfully`);
      return processingResult;
      
    } catch (error) {
      console.error(`${processId}: Processing failed:`, error);
      
      // Store failed processing record
      await this.logProcessingFailure(processId, filename, error, uploadedBy);
      
      throw new Error(`Document processing failed: ${error.message}`);
    }
  }
  
  /**
   * Generate Business Intelligence from processed document
   */
  private async generateBusinessIntelligence(analysisResult: any, ocrResults: any, customerId: number): Promise<any> {
    try {
      // Analyze business value and opportunities
      const intelligence = {
        // Revenue Potential
        revenueAnalysis: {
          estimatedValue: this.extractFinancialValue(analysisResult.extractedData),
          paymentStatus: this.analyzePaymentStatus(analysisResult.extractedData),
          collectionRisk: this.assessCollectionRisk(analysisResult.extractedData)
        },
        
        // Customer Insights
        customerAnalysis: {
          customerType: this.determineCustomerType(analysisResult.extractedData),
          systemSize: this.extractSystemSize(analysisResult.extractedData),
          serviceNeeds: this.identifyServiceNeeds(analysisResult.extractedData)
        },
        
        // Operational Insights
        operations: {
          urgency: analysisResult.urgencyLevel,
          requiredActions: analysisResult.actionItems,
          complianceStatus: this.assessCompliance(analysisResult.extractedData),
          maintenanceNeeds: this.identifyMaintenanceNeeds(analysisResult.extractedData)
        },
        
        // Sales Opportunities
        salesOpportunities: {
          upsellPotential: this.identifyUpsellOpportunities(analysisResult.extractedData),
          referralPotential: this.assessReferralPotential(analysisResult.extractedData),
          expansionOpportunities: this.findExpansionOpportunities(analysisResult.extractedData)
        }
      };
      
      return intelligence;
    } catch (error) {
      console.error('Business intelligence generation failed:', error);
      return { error: error.message };
    }
  }
  
  /**
   * Generate specific action items based on document analysis
   */
  private async generateActionItems(analysisResult: any, customer: any, documentId: number): Promise<any[]> {
    const actionItems = [];
    
    // Document-type specific actions
    switch (analysisResult.documentType) {
      case 'site_survey':
        actionItems.push({
          type: 'follow_up',
          priority: 'high',
          action: 'Schedule installation consultation',
          dueDate: this.calculateDueDate(7), // 7 days
          assignedTo: 'sales_team'
        });
        break;
        
      case 'warranty':
        actionItems.push({
          type: 'service',
          priority: 'high',
          action: 'Process warranty claim',
          dueDate: this.calculateDueDate(3), // 3 days
          assignedTo: 'service_team'
        });
        break;
        
      case 'inspection':
        actionItems.push({
          type: 'compliance',
          priority: 'medium',
          action: 'File inspection report with county',
          dueDate: this.calculateDueDate(5), // 5 days
          assignedTo: 'admin_team'
        });
        break;
        
      case 'maintenance':
        actionItems.push({
          type: 'service',
          priority: 'medium',
          action: 'Schedule follow-up maintenance',
          dueDate: this.calculateDueDate(30), // 30 days
          assignedTo: 'service_team'
        });
        break;
    }
    
    // Customer-specific actions
    if (!customer) {
      actionItems.push({
        type: 'customer_contact',
        priority: 'high',
        action: 'Contact new customer for verification',
        dueDate: this.calculateDueDate(1), // 1 day
        assignedTo: 'sales_team'
      });
    }
    
    // Compliance actions
    if (analysisResult.extractedData.complianceData?.permitStatus === 'expired') {
      actionItems.push({
        type: 'compliance',
        priority: 'critical',
        action: 'Renew expired permits',
        dueDate: this.calculateDueDate(1), // ASAP
        assignedTo: 'admin_team'
      });
    }
    
    return actionItems;
  }
  
  /**
   * Log processing failures for debugging and improvement
   */
  private async logProcessingFailure(processId: string, filename: string, error: any, uploadedBy?: string): Promise<void> {
    try {
      console.error(`Processing failure logged: ${processId}`, {
        filename,
        error: error.message,
        uploadedBy,
        timestamp: new Date().toISOString()
      });
      
      // In a production system, you might want to store this in a dedicated error log table
      // For now, we'll just log to console
      
    } catch (logError) {
      console.error('Failed to log processing failure:', logError);
    }
  }
  
  // Helper methods for business intelligence
  private extractFinancialValue(data: any): number {
    const cost = data.keyFields?.cost || data.financialData?.totalCost;
    if (typeof cost === 'string') {
      const numericValue = cost.replace(/[^\d.]/g, '');
      return parseFloat(numericValue) || 0;
    }
    return cost || 0;
  }
  
  private analyzePaymentStatus(data: any): string {
    return data.financialData?.paymentStatus || 'unknown';
  }
  
  private assessCollectionRisk(data: any): 'low' | 'medium' | 'high' {
    const paymentStatus = this.analyzePaymentStatus(data);
    if (paymentStatus === 'overdue') return 'high';
    if (paymentStatus === 'pending') return 'medium';
    return 'low';
  }
  
  private determineCustomerType(data: any): 'residential' | 'commercial' | 'municipal' {
    const address = data.keyFields?.address || '';
    if (address.toLowerCase().includes('city') || address.toLowerCase().includes('county')) return 'municipal';
    if (data.technicalSpecs?.systemCapacity > 100) return 'commercial';
    return 'residential';
  }
  
  private extractSystemSize(data: any): number {
    return data.technicalSpecs?.systemCapacity || data.keyFields?.systemSize || 0;
  }
  
  private identifyServiceNeeds(data: any): string[] {
    const needs = [];
    if (data.risks?.length > 0) needs.push('risk_mitigation');
    if (data.technicalSpecs?.performanceIssues) needs.push('performance_optimization');
    if (data.complianceData?.inspectionRequired) needs.push('inspection');
    return needs;
  }
  
  private assessCompliance(data: any): 'compliant' | 'needs_attention' | 'non_compliant' {
    if (data.complianceData?.codeViolations) return 'non_compliant';
    if (data.complianceData?.inspectionRequired) return 'needs_attention';
    return 'compliant';
  }
  
  private identifyMaintenanceNeeds(data: any): string[] {
    const needs = [];
    if (data.technicalSpecs?.equipmentAge > 10) needs.push('aging_equipment_check');
    if (data.technicalSpecs?.performanceIssues) needs.push('performance_diagnostic');
    return needs;
  }
  
  private identifyUpsellOpportunities(data: any): string[] {
    const opportunities = [];
    if (!data.technicalSpecs?.batterySpecs) opportunities.push('battery_storage');
    if (data.technicalSpecs?.systemCapacity < 10) opportunities.push('system_expansion');
    return opportunities;
  }
  
  private assessReferralPotential(data: any): 'high' | 'medium' | 'low' {
    const customerType = this.determineCustomerType(data);
    if (customerType === 'commercial') return 'high';
    if (this.extractSystemSize(data) > 20) return 'medium';
    return 'low';
  }
  
  private findExpansionOpportunities(data: any): string[] {
    const opportunities = [];
    if (data.customerInfo?.customerType === 'commercial') opportunities.push('additional_locations');
    if (data.technicalSpecs?.roofDetails?.includes('additional space')) opportunities.push('roof_expansion');
    return opportunities;
  }
  
  private calculateDueDate(daysFromNow: number): string {
    const date = new Date();
    date.setDate(date.getDate() + daysFromNow);
    return date.toISOString().split('T')[0];
  }
}

export const pdfWorkflowEngine = new PDFWorkflowEngine();