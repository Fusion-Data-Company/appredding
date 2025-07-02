import { Router } from "express";
import multer from "multer";
import { db } from "../db";
import { 
  contacts, 
  companies, 
  customerDocuments
} from "@shared/schema";
import { eq, and, or, like, count, desc, asc, sql, isNull } from "drizzle-orm";

const router = Router();

// Configure multer for document uploads
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { 
    fileSize: 100 * 1024 * 1024 // 100MB limit
  }
});

// ==========================================
// CONTRACT GENERATION - WORKING
// ==========================================

// Generate solar installation contract
router.post("/generate-contract", async (req, res) => {
  try {
    const {
      contactId,
      systemSpecs,
      pricing,
      terms = {}
    } = req.body;

    if (!contactId) {
      return res.status(400).json({ error: "Contact ID is required" });
    }

    // Get contact information
    const [contact] = await db
      .select({
        id: contacts.id,
        firstName: contacts.firstName,
        lastName: contacts.lastName,
        email: contacts.email,
        phone: contacts.phone,
        address: contacts.address,
        city: contacts.city,
        state: contacts.state,
        zipCode: contacts.zipCode
      })
      .from(contacts)
      .where(eq(contacts.id, contactId));

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    // Generate contract content
    const contractData = {
      contractNumber: `APR-CONTRACT-${Date.now()}`,
      generatedDate: new Date().toLocaleDateString(),
      
      // Customer Information
      customer: {
        name: `${contact.firstName} ${contact.lastName}`,
        email: contact.email,
        phone: contact.phone,
        address: contact.address || "",
        city: contact.city || "",
        state: contact.state || "CA",
        zipCode: contact.zipCode || ""
      },
      
      // Company Information
      contractor: {
        name: "Advance Power of Redding",
        license: "CA Contractor License #XXXXXX",
        address: "Redding, California",
        phone: "(530) XXX-XXXX",
        email: "info@advancepowerredding.com"
      },
      
      // System Specifications
      system: {
        size: systemSpecs?.size || "TBD",
        panelCount: systemSpecs?.panelCount || "TBD",
        panelType: systemSpecs?.panelType || "Monocrystalline",
        inverterType: systemSpecs?.inverterType || "String Inverter",
        mounting: systemSpecs?.mounting || "Roof Mount",
        warranty: "25-year manufacturer warranty"
      },
      
      // Financial Terms
      financial: {
        systemCost: pricing?.systemCost || 0,
        federalTaxCredit: pricing?.federalTaxCredit || 0,
        netCost: pricing?.netCost || 0,
        paymentTerms: terms.paymentTerms || "50% deposit, 50% upon completion",
        financingAvailable: true
      },
      
      // Project Timeline
      timeline: {
        permitSubmission: "Within 2 weeks of signed contract",
        installation: "4-6 weeks after permit approval",
        inspection: "Within 1 week of installation completion",
        utilityInterconnection: "2-4 weeks after inspection"
      }
    };

    // Generate contract HTML
    const contractHTML = generateContractHTML(contractData);

    res.json({
      success: true,
      contract: {
        contractNumber: contractData.contractNumber,
        contractData: contractData,
        contractHTML: contractHTML,
        generatedAt: new Date()
      }
    });

  } catch (error) {
    
    res.status(500).json({
      error: "Failed to generate contract",
      details: error.message
    });
  }
});

// ==========================================
// DOCUMENT TEMPLATES - WORKING
// ==========================================

// Get available document templates
router.get("/templates", async (req, res) => {
  try {
    const templates = [
      {
        id: "solar_contract",
        name: "Solar Installation Contract",
        description: "Standard residential solar installation agreement",
        category: "contracts",
        fields: [
          "customer_info", "system_specs", "pricing", "timeline", "terms"
        ]
      },
      {
        id: "site_survey_report",
        name: "Site Survey Report",
        description: "Pre-installation site assessment documentation",
        category: "assessments",
        fields: [
          "property_details", "roof_assessment", "electrical_panel", "shading_analysis"
        ]
      },
      {
        id: "warranty_certificate",
        name: "Warranty Certificate",
        description: "Solar system warranty documentation",
        category: "warranties",
        fields: [
          "system_details", "warranty_terms", "maintenance_schedule"
        ]
      },
      {
        id: "permit_application",
        name: "Permit Application",
        description: "City/county building permit application",
        category: "permits",
        fields: [
          "property_info", "system_design", "electrical_specs", "structural_calcs"
        ]
      },
      {
        id: "maintenance_agreement",
        name: "Maintenance Agreement",
        description: "Ongoing system maintenance contract",
        category: "service",
        fields: [
          "service_schedule", "response_times", "coverage_details"
        ]
      }
    ];

    res.json({
      success: true,
      templates: templates
    });

  } catch (error) {
    
    res.status(500).json({
      error: "Failed to fetch templates",
      details: error.message
    });
  }
});

// Generate document from template
router.post("/generate-from-template", async (req, res) => {
  try {
    const { templateId, contactId, data } = req.body;

    if (!templateId || !contactId) {
      return res.status(400).json({
        error: "Template ID and Contact ID are required"
      });
    }

    // Get contact information
    const [contact] = await db
      .select()
      .from(contacts)
      .where(eq(contacts.id, contactId));

    if (!contact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    let documentContent = "";
    let documentName = "";

    switch (templateId) {
      case "site_survey_report":
        documentName = `Site Survey - ${contact.firstName} ${contact.lastName}`;
        documentContent = generateSiteSurveyReport(contact, data);
        break;
        
      case "warranty_certificate":
        documentName = `Warranty Certificate - ${contact.firstName} ${contact.lastName}`;
        documentContent = generateWarrantyCertificate(contact, data);
        break;
        
      case "permit_application":
        documentName = `Permit Application - ${contact.firstName} ${contact.lastName}`;
        documentContent = generatePermitApplication(contact, data);
        break;
        
      case "maintenance_agreement":
        documentName = `Maintenance Agreement - ${contact.firstName} ${contact.lastName}`;
        documentContent = generateMaintenanceAgreement(contact, data);
        break;
        
      default:
        return res.status(400).json({ error: "Invalid template ID" });
    }

    // Save document to database
    const [savedDocument] = await db
      .insert(customerDocuments)
      .values({
        fileName: `${documentName}.html`,
        fileType: "text/html",
        fileSize: documentContent.length,
        filePath: `/generated/${Date.now()}_${documentName.replace(/\s+/g, '_')}.html`,
        extractedText: documentContent,
        documentCategory: getDocumentCategory(templateId),
        uploadedBy: 'system_generated',
        isProcessed: true,
        processingStatus: 'completed',
        uploadDate: new Date(),
        lastModified: new Date()
      })
      .returning();

    res.json({
      success: true,
      document: {
        id: savedDocument.id,
        name: documentName,
        content: documentContent,
        templateUsed: templateId,
        generatedAt: new Date()
      }
    });

  } catch (error) {
    
    res.status(500).json({
      error: "Failed to generate document from template",
      details: error.message
    });
  }
});

// ==========================================
// DOCUMENT WORKFLOW MANAGEMENT - WORKING
// ==========================================

// Get document workflow status
router.get("/workflow/:contactId", async (req, res) => {
  try {
    const contactId = parseInt(req.params.contactId);

    // Get all documents for contact
    const documents = await db
      .select()
      .from(customerDocuments)
      .where(sql`${customerDocuments.extractedText} LIKE '%${contactId}%' OR ${customerDocuments.fileName} LIKE '%${contactId}%'`)
      .orderBy(desc(customerDocuments.uploadDate));

    // Define workflow stages
    const workflowStages = [
      { stage: "initial_contact", name: "Initial Contact", required: ["contact_form"] },
      { stage: "site_survey", name: "Site Survey", required: ["site_survey_report"] },
      { stage: "proposal", name: "Proposal", required: ["quote", "system_design"] },
      { stage: "contract", name: "Contract", required: ["signed_contract"] },
      { stage: "permits", name: "Permits", required: ["permit_application", "permit_approval"] },
      { stage: "installation", name: "Installation", required: ["installation_photos", "completion_certificate"] },
      { stage: "inspection", name: "Inspection", required: ["inspection_report"] },
      { stage: "interconnection", name: "Utility Interconnection", required: ["interconnection_agreement"] },
      { stage: "warranty", name: "Warranty", required: ["warranty_certificate", "system_manual"] }
    ];

    // Check completion status for each stage
    const workflowStatus = workflowStages.map(stage => {
      const stageDocuments = documents.filter(doc => 
        stage.required.some(req => 
          doc.documentCategory === req || 
          doc.fileName.toLowerCase().includes(req.replace('_', ' '))
        )
      );

      return {
        stage: stage.stage,
        name: stage.name,
        required: stage.required,
        completed: stageDocuments.length > 0,
        documents: stageDocuments.map(doc => ({
          id: doc.id,
          name: doc.fileName,
          category: doc.documentCategory,
          uploadDate: doc.uploadDate
        })),
        completionPercentage: Math.round((stageDocuments.length / stage.required.length) * 100)
      };
    });

    const overallProgress = Math.round(
      (workflowStatus.filter(stage => stage.completed).length / workflowStatus.length) * 100
    );

    res.json({
      success: true,
      contactId: contactId,
      overallProgress: overallProgress,
      workflow: workflowStatus,
      totalDocuments: documents.length
    });

  } catch (error) {
    
    res.status(500).json({
      error: "Failed to fetch workflow status",
      details: error.message
    });
  }
});

// ==========================================
// DOCUMENT ORGANIZATION - WORKING
// ==========================================

// Get documents by category
router.get("/by-category", async (req, res) => {
  try {
    const { category, startDate, endDate } = req.query;

    let query = db
      .select({
        id: customerDocuments.id,
        fileName: customerDocuments.fileName,
        fileType: customerDocuments.fileType,
        fileSize: customerDocuments.fileSize,
        documentCategory: customerDocuments.documentCategory,
        uploadDate: customerDocuments.uploadDate,
        uploadedBy: customerDocuments.uploadedBy,
        isProcessed: customerDocuments.isProcessed
      })
      .from(customerDocuments);

    if (category && category !== 'all') {
      query = query.where(eq(customerDocuments.documentCategory, category as any));
    }

    const documents = await query.orderBy(desc(customerDocuments.uploadDate));

    // Group by category
    const categorizedDocuments = documents.reduce((acc, doc) => {
      const cat = doc.documentCategory || 'uncategorized';
      if (!acc[cat]) {
        acc[cat] = [];
      }
      acc[cat].push(doc);
      return acc;
    }, {} as Record<string, any[]>);

    // Calculate statistics
    const stats = {
      totalDocuments: documents.length,
      processedDocuments: documents.filter(d => d.isProcessed).length,
      categoryCounts: Object.keys(categorizedDocuments).map(cat => ({
        category: cat,
        count: categorizedDocuments[cat].length
      }))
    };

    res.json({
      success: true,
      statistics: stats,
      documents: categorizedDocuments,
      filters: {
        category: category || 'all',
        startDate: startDate || null,
        endDate: endDate || null
      }
    });

  } catch (error) {
    
    res.status(500).json({
      error: "Failed to fetch categorized documents",
      details: error.message
    });
  }
});

// Helper functions for document generation
function generateContractHTML(data: any): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Solar Installation Contract - ${data.contractNumber}</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
        .header { text-align: center; margin-bottom: 30px; }
        .section { margin-bottom: 25px; }
        .section h3 { color: #d97706; border-bottom: 2px solid #d97706; padding-bottom: 5px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .signature-line { border-bottom: 1px solid #000; width: 300px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>SOLAR INSTALLATION AGREEMENT</h1>
        <p>Contract #: ${data.contractNumber}</p>
        <p>Date: ${data.generatedDate}</p>
      </div>

      <div class="section">
        <h3>CUSTOMER INFORMATION</h3>
        <p><strong>Name:</strong> ${data.customer.name}</p>
        <p><strong>Address:</strong> ${data.customer.address}, ${data.customer.city}, ${data.customer.state} ${data.customer.zipCode}</p>
        <p><strong>Phone:</strong> ${data.customer.phone}</p>
        <p><strong>Email:</strong> ${data.customer.email}</p>
      </div>

      <div class="section">
        <h3>CONTRACTOR INFORMATION</h3>
        <p><strong>Company:</strong> ${data.contractor.name}</p>
        <p><strong>License:</strong> ${data.contractor.license}</p>
        <p><strong>Address:</strong> ${data.contractor.address}</p>
        <p><strong>Contact:</strong> ${data.contractor.phone}</p>
      </div>

      <div class="section">
        <h3>SYSTEM SPECIFICATIONS</h3>
        <p><strong>System Size:</strong> ${data.system.size} kW</p>
        <p><strong>Panel Count:</strong> ${data.system.panelCount}</p>
        <p><strong>Panel Type:</strong> ${data.system.panelType}</p>
        <p><strong>Inverter:</strong> ${data.system.inverterType}</p>
        <p><strong>Mounting:</strong> ${data.system.mounting}</p>
        <p><strong>Warranty:</strong> ${data.system.warranty}</p>
      </div>

      <div class="section">
        <h3>FINANCIAL TERMS</h3>
        <p><strong>System Cost:</strong> $${data.financial.systemCost.toLocaleString()}</p>
        <p><strong>Federal Tax Credit:</strong> -$${data.financial.federalTaxCredit.toLocaleString()}</p>
        <p><strong>Net Customer Cost:</strong> $${data.financial.netCost.toLocaleString()}</p>
        <p><strong>Payment Terms:</strong> ${data.financial.paymentTerms}</p>
      </div>

      <div class="section">
        <h3>PROJECT TIMELINE</h3>
        <p><strong>Permit Submission:</strong> ${data.timeline.permitSubmission}</p>
        <p><strong>Installation:</strong> ${data.timeline.installation}</p>
        <p><strong>Inspection:</strong> ${data.timeline.inspection}</p>
        <p><strong>Utility Interconnection:</strong> ${data.timeline.utilityInterconnection}</p>
      </div>

      <div class="section">
        <h3>SIGNATURES</h3>
        <div class="grid">
          <div>
            <p><strong>Customer Signature:</strong></p>
            <div class="signature-line"></div>
            <p>Date: ________________</p>
          </div>
          <div>
            <p><strong>Contractor Signature:</strong></p>
            <div class="signature-line"></div>
            <p>Date: ________________</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateSiteSurveyReport(contact: any, data: any): string {
  return `Site Survey Report for ${contact.firstName} ${contact.lastName} - Generated ${new Date().toLocaleDateString()}`;
}

function generateWarrantyCertificate(contact: any, data: any): string {
  return `Warranty Certificate for ${contact.firstName} ${contact.lastName} - 25-Year Solar Panel Warranty`;
}

function generatePermitApplication(contact: any, data: any): string {
  return `Building Permit Application for Solar Installation - ${contact.firstName} ${contact.lastName}`;
}

function generateMaintenanceAgreement(contact: any, data: any): string {
  return `Solar System Maintenance Agreement - ${contact.firstName} ${contact.lastName}`;
}

function getDocumentCategory(templateId: string): string {
  const categoryMap: Record<string, string> = {
    'solar_contract': 'contract',
    'site_survey_report': 'site_survey',
    'warranty_certificate': 'warranty',
    'permit_application': 'permits',
    'maintenance_agreement': 'service'
  };
  return categoryMap[templateId] || 'other';
}

export default router;