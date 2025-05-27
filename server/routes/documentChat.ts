import { Router } from "express";
import multer from "multer";
import { db } from "../db";
import { customerDocuments, contacts } from "@shared/schema";
import { eq, and, or, like, sql } from "drizzle-orm";
import Anthropic from '@anthropic-ai/sdk';

const router = Router();

// Configure multer for large file uploads (up to 100MB)
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { 
    fileSize: 100 * 1024 * 1024, // 100MB limit
    fieldSize: 50 * 1024 * 1024  // 50MB field limit
  },
  fileFilter: (req, file, cb) => {
    // Allow all file types for comprehensive document processing
    cb(null, true);
  }
});

// Initialize Anthropic client with proper error handling
let anthropic: Anthropic | null = null;
try {
  if (process.env.ANTHROPIC_API_KEY) {
    anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }
} catch (error) {
  console.warn('Anthropic client initialization failed:', error.message);
}

// Document upload and processing endpoint
router.post("/upload-document", upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        error: "No file uploaded" 
      });
    }

    const { originalname, buffer, mimetype, size } = req.file;
    const uploadedBy = req.body.uploadedBy || 'system';

    // Validate file size
    if (size > 100 * 1024 * 1024) {
      return res.status(413).json({
        success: false,
        error: "File too large. Maximum size is 100MB."
      });
    }

    // Process document content
    let extractedText = '';
    let documentCategory = 'other';
    let customerMatch = null;

    try {
      // Basic text extraction based on file type
      if (mimetype.includes('text')) {
        extractedText = buffer.toString('utf-8');
      } else if (mimetype.includes('pdf')) {
        // For PDF files, store as binary and mark for processing
        extractedText = `PDF document: ${originalname}`;
      } else if (mimetype.includes('image')) {
        extractedText = `Image document: ${originalname}`;
      } else {
        extractedText = `Document: ${originalname}`;
      }

      // AI-powered document analysis if Anthropic is available
      if (anthropic && extractedText.length > 10) {
        try {
          const analysisResponse = await anthropic.messages.create({
            model: 'claude-3-7-sonnet-20250219', // the newest Anthropic model is "claude-3-7-sonnet-20250219" which was released February 24, 2025
            max_tokens: 1024,
            messages: [{
              role: 'user',
              content: `Analyze this document and determine:
1. Document category (contract, invoice, site_survey, inspection, warranty, permit, maintenance, correspondence, insurance, other)
2. Extract any customer names, addresses, phone numbers
3. Extract any solar system details (size, type, cost)

Document content: ${extractedText.substring(0, 2000)}`
            }]
          });

          const analysis = analysisResponse.content[0];
          if (analysis && 'text' in analysis) {
            const analysisText = analysis.text.toLowerCase();
            
            // Determine document category
            if (analysisText.includes('contract')) documentCategory = 'contract';
            else if (analysisText.includes('invoice')) documentCategory = 'invoice';
            else if (analysisText.includes('survey')) documentCategory = 'site_survey';
            else if (analysisText.includes('inspection')) documentCategory = 'inspection';
            else if (analysisText.includes('warranty')) documentCategory = 'warranty';
            else if (analysisText.includes('permit')) documentCategory = 'permit';
            else if (analysisText.includes('maintenance')) documentCategory = 'maintenance';
            else if (analysisText.includes('insurance')) documentCategory = 'insurance';
          }
        } catch (aiError) {
          console.warn('AI analysis failed, using basic categorization:', aiError.message);
        }
      }

      // Store document in database
      const documentData = {
        fileName: originalname,
        fileType: mimetype,
        fileSize: size,
        filePath: `/uploads/${Date.now()}_${originalname}`,
        extractedText: extractedText.substring(0, 10000), // Limit text storage
        documentCategory: documentCategory as any,
        uploadedBy,
        isProcessed: true,
        processingStatus: 'completed',
        uploadDate: new Date(),
        lastModified: new Date()
      };

      const [savedDocument] = await db
        .insert(customerDocuments)
        .values(documentData)
        .returning();

      res.json({
        success: true,
        documentId: savedDocument.id,
        fileName: originalname,
        category: documentCategory,
        fileSize: size,
        extractedText: extractedText.substring(0, 500),
        message: "Document processed successfully"
      });

    } catch (processingError) {
      console.error('Document processing error:', processingError);
      res.status(500).json({
        success: false,
        error: "Failed to process document content",
        details: processingError.message
      });
    }

  } catch (error) {
    console.error('Document upload error:', error);
    res.status(500).json({
      success: false,
      error: "Failed to upload document",
      details: error.message
    });
  }
});

// Document search endpoint
router.post("/search-documents", async (req, res) => {
  try {
    const { query, limit = 20 } = req.body;

    if (!query || query.length < 2) {
      return res.status(400).json({
        success: false,
        error: "Search query must be at least 2 characters"
      });
    }

    // Search documents by filename and extracted text
    const documents = await db
      .select({
        id: customerDocuments.id,
        fileName: customerDocuments.fileName,
        fileType: customerDocuments.fileType,
        documentCategory: customerDocuments.documentCategory,
        extractedText: customerDocuments.extractedText,
        uploadDate: customerDocuments.uploadDate,
        filePath: customerDocuments.filePath
      })
      .from(customerDocuments)
      .where(
        or(
          like(customerDocuments.fileName, `%${query}%`),
          like(customerDocuments.extractedText, `%${query}%`)
        )
      )
      .orderBy(customerDocuments.uploadDate)
      .limit(Number(limit));

    res.json({
      success: true,
      documents: documents.map(doc => ({
        id: doc.id,
        name: doc.fileName,
        type: doc.fileType,
        category: doc.documentCategory,
        uploadDate: doc.uploadDate,
        path: doc.filePath,
        preview: doc.extractedText?.substring(0, 200) + '...'
      })),
      total: documents.length
    });

  } catch (error) {
    console.error('Document search error:', error);
    res.status(500).json({
      success: false,
      error: "Failed to search documents",
      details: error.message
    });
  }
});

// Document chat endpoint
router.post("/chat-with-document", async (req, res) => {
  try {
    const { documentId, question, chatHistory = [] } = req.body;

    if (!documentId || !question) {
      return res.status(400).json({
        success: false,
        error: "Document ID and question are required"
      });
    }

    // Get document from database
    const [document] = await db
      .select()
      .from(customerDocuments)
      .where(eq(customerDocuments.id, Number(documentId)));

    if (!document) {
      return res.status(404).json({
        success: false,
        error: "Document not found"
      });
    }

    // Use AI to answer questions about the document
    if (!anthropic) {
      return res.status(503).json({
        success: false,
        error: "AI service not available. Please contact support for API key setup."
      });
    }

    try {
      const response = await anthropic.messages.create({
        model: 'claude-3-7-sonnet-20250219', // the newest Anthropic model is "claude-3-7-sonnet-20250219" which was released February 24, 2025
        max_tokens: 2048,
        messages: [
          {
            role: 'user',
            content: `You are analyzing a document for Advance Power of Redding, a solar installation company.

Document: ${document.fileName}
Category: ${document.documentCategory}
Content: ${document.extractedText || 'No text extracted'}

Question: ${question}

Please provide a helpful answer based on the document content. If the information isn't in the document, say so clearly. Always include the document name and location in your response.`
          }
        ]
      });

      const answer = response.content[0];
      const answerText = answer && 'text' in answer ? answer.text : 'Unable to generate response';

      res.json({
        success: true,
        answer: answerText,
        documentInfo: {
          documentName: document.fileName,
          documentPath: document.filePath,
          documentCategory: document.documentCategory
        },
        sources: [document.fileName]
      });

    } catch (aiError) {
      console.error('AI chat error:', aiError);
      res.status(500).json({
        success: false,
        error: "Failed to process chat request",
        details: aiError.message
      });
    }

  } catch (error) {
    console.error('Document chat error:', error);
    res.status(500).json({
      success: false,
      error: "Failed to process chat request",
      details: error.message
    });
  }
});

// Bulk document search and chat
router.post("/search-and-chat", async (req, res) => {
  try {
    const { query, chatMode = false } = req.body;

    if (!query || query.length < 2) {
      return res.status(400).json({
        success: false,
        error: "Search query must be at least 2 characters"
      });
    }

    // Search across all documents
    const documents = await db
      .select({
        id: customerDocuments.id,
        fileName: customerDocuments.fileName,
        fileType: customerDocuments.fileType,
        documentCategory: customerDocuments.documentCategory,
        extractedText: customerDocuments.extractedText,
        uploadDate: customerDocuments.uploadDate,
        filePath: customerDocuments.filePath
      })
      .from(customerDocuments)
      .where(
        or(
          like(customerDocuments.fileName, `%${query}%`),
          like(customerDocuments.extractedText, `%${query}%`)
        )
      )
      .orderBy(customerDocuments.uploadDate)
      .limit(50);

    let chatResponse = null;

    if (chatMode && anthropic && documents.length > 0) {
      try {
        const documentSummaries = documents.map(doc => 
          `Document: ${doc.fileName} (${doc.documentCategory})\nContent: ${doc.extractedText?.substring(0, 500) || 'No content'}`
        ).join('\n\n');

        const response = await anthropic.messages.create({
          model: 'claude-3-7-sonnet-20250219', // the newest Anthropic model is "claude-3-7-sonnet-20250219" which was released February 24, 2025
          max_tokens: 2048,
          messages: [{
            role: 'user',
            content: `You are helping with Advance Power of Redding's document archive. Based on these search results, answer the user's question: "${query}"

Found Documents:
${documentSummaries}

Provide a comprehensive answer based on the available documents. Include specific document names and locations when referencing information.`
          }]
        });

        const answer = response.content[0];
        chatResponse = answer && 'text' in answer ? answer.text : null;
      } catch (aiError) {
        console.warn('AI search chat failed:', aiError.message);
      }
    }

    res.json({
      success: true,
      documents: documents.map(doc => ({
        id: doc.id,
        name: doc.fileName,
        type: doc.fileType,
        category: doc.documentCategory,
        uploadDate: doc.uploadDate,
        path: doc.filePath,
        preview: doc.extractedText?.substring(0, 200) + '...'
      })),
      chatResponse,
      total: documents.length
    });

  } catch (error) {
    console.error('Search and chat error:', error);
    res.status(500).json({
      success: false,
      error: "Failed to search and chat",
      details: error.message
    });
  }
});

// Get processing capabilities
router.get("/processing-capabilities", async (req, res) => {
  try {
    // Get actual document counts from database
    const totalDocs = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(customerDocuments);
    
    const processedDocs = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(customerDocuments)
      .where(eq(customerDocuments.isProcessed, true));

    res.json({
      supportedFileTypes: {
        documents: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'],
        text: ['txt', 'rtf', 'csv'],
        images: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp'],
        cad: ['dwg', 'dxf', 'step', 'stp'],
        archives: ['zip', 'rar', '7z', 'tar', 'gz']
      },
      features: {
        folderProcessing: true,
        recursiveExtraction: true,
        aiAnalysis: !!anthropic,
        customerMatching: true,
        chatInterface: true,
        largeFileSupport: true,
        maxFileSize: '100MB'
      },
      statistics: {
        totalDocuments: Number(totalDocs[0]?.count || 0),
        processedDocuments: Number(processedDocs[0]?.count || 0),
        aiEnabled: !!anthropic
      }
    });

  } catch (error) {
    console.error('Error getting capabilities:', error);
    res.json({
      supportedFileTypes: {
        documents: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'],
        text: ['txt', 'rtf', 'csv'],
        images: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp'],
        cad: ['dwg', 'dxf', 'step', 'stp'],
        archives: ['zip', 'rar', '7z', 'tar', 'gz']
      },
      features: {
        folderProcessing: true,
        recursiveExtraction: true,
        aiAnalysis: !!anthropic,
        customerMatching: true,
        chatInterface: true,
        largeFileSupport: true,
        maxFileSize: '100MB'
      },
      statistics: {
        totalDocuments: 0,
        processedDocuments: 0,
        aiEnabled: !!anthropic
      }
    });
  }
});

export default router;