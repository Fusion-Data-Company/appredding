import OpenAI from "openai";
import { advancedPDFProcessor } from "./advancedPDFProcessor";

// Use OpenRouter for maximum AI model access
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "https://advancepowerredding.com",
    "X-Title": "Advance Power OCR Engine"
  }
});

export class PDFOCREngine {
  
  /**
   * Multi-Model OCR Processing - Uses multiple AI models for maximum accuracy
   */
  async processWithMultipleModels(fileBuffer: Buffer, filename: string): Promise<any> {
    const base64PDF = fileBuffer.toString('base64');
    
    // Process with multiple models simultaneously for maximum accuracy
    const [claudeResult, gptResult, geminiResult] = await Promise.all([
      this.processWithClaude(base64PDF, filename),
      this.processWithGPT(base64PDF, filename),
      this.processWithGemini(base64PDF, filename)
    ]);

    // Combine and validate results
    return this.consolidateResults([claudeResult, gptResult, geminiResult]);
  }

  /**
   * Claude 3.5 Sonnet - Best for detailed document analysis
   */
  private async processWithClaude(base64PDF: string, filename: string): Promise<any> {
    try {
      const response = await openai.chat.completions.create({
        model: "anthropic/claude-3.5-sonnet:beta",
        messages: [{
          role: "user",
          content: [
            {
              type: "text",
              text: `Extract EVERY piece of text and data from this solar industry document. Be extremely thorough and accurate. Return JSON with:
              {
                "fullText": "complete extracted text",
                "structuredData": "organized data extraction",
                "confidence": 0.0-1.0,
                "model": "claude"
              }`
            },
            {
              type: "image_url",
              image_url: { url: `data:application/pdf;base64,${base64PDF}` }
            }
          ]
        }],
        max_tokens: 4000,
        response_format: { type: "json_object" }
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      return { fullText: '', structuredData: {}, confidence: 0, model: 'claude', error: error.message };
    }
  }

  /**
   * GPT-4 Vision - Excellent for visual document elements
   */
  private async processWithGPT(base64PDF: string, filename: string): Promise<any> {
    try {
      const response = await openai.chat.completions.create({
        model: "openai/gpt-4-vision-preview",
        messages: [{
          role: "user",
          content: [
            {
              type: "text",
              text: `Analyze this solar document image and extract all visible text, numbers, and data. Focus on tables, forms, and technical specifications. Return JSON format.`
            },
            {
              type: "image_url",
              image_url: { url: `data:application/pdf;base64,${base64PDF}` }
            }
          ]
        }],
        max_tokens: 4000,
        response_format: { type: "json_object" }
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      return { fullText: '', structuredData: {}, confidence: 0, model: 'gpt', error: error.message };
    }
  }

  /**
   * Google Gemini - Strong for technical documents
   */
  private async processWithGemini(base64PDF: string, filename: string): Promise<any> {
    try {
      const response = await openai.chat.completions.create({
        model: "google/gemini-pro-vision",
        messages: [{
          role: "user",
          content: [
            {
              type: "text",
              text: `Process this solar industry document and extract all technical data, measurements, and specifications. Return comprehensive JSON.`
            },
            {
              type: "image_url",
              image_url: { url: `data:application/pdf;base64,${base64PDF}` }
            }
          ]
        }],
        max_tokens: 4000,
        response_format: { type: "json_object" }
      });

      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      return { fullText: '', structuredData: {}, confidence: 0, model: 'gemini', error: error.message };
    }
  }

  /**
   * Advanced Result Consolidation
   */
  private consolidateResults(results: any[]): any {
    const validResults = results.filter(r => r.confidence > 0);
    
    if (validResults.length === 0) {
      throw new Error('All OCR models failed to process the document');
    }

    // Use highest confidence result as base
    const bestResult = validResults.reduce((best, current) => 
      current.confidence > best.confidence ? current : best
    );

    // Merge data from all successful models
    const consolidatedData = {
      fullText: this.mergeTExt(validResults),
      structuredData: this.mergeStructuredData(validResults),
      confidence: Math.max(...validResults.map(r => r.confidence)),
      processedBy: validResults.map(r => r.model),
      consolidationScore: validResults.length / results.length
    };

    return consolidatedData;
  }

  private mergeTExt(results: any[]): string {
    const texts = results.map(r => r.fullText || '').filter(t => t.length > 0);
    return texts.reduce((longest, current) => 
      current.length > longest.length ? current : longest, ''
    );
  }

  private mergeStructuredData(results: any[]): any {
    const merged = {};
    
    results.forEach(result => {
      if (result.structuredData && typeof result.structuredData === 'object') {
        Object.assign(merged, result.structuredData);
      }
    });

    return merged;
  }

  /**
   * Handwriting and Signature Detection
   */
  async detectHandwritingAndSignatures(base64PDF: string): Promise<any> {
    const response = await openai.chat.completions.create({
      model: "anthropic/claude-3.5-sonnet:beta",
      messages: [{
        role: "user",
        content: [
          {
            type: "text",
            text: `Analyze this document for handwritten text, signatures, and manual annotations. Extract all handwritten content and identify signature locations. Return JSON:
            {
              "handwrittenText": "extracted handwritten content",
              "signatures": ["signature locations and descriptions"],
              "annotations": "manual notes and markings",
              "formFields": "filled form fields"
            }`
          },
          {
            type: "image_url",
            image_url: { url: `data:application/pdf;base64,${base64PDF}` }
          }
        ]
      }],
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  }

  /**
   * Table and Form Data Extraction
   */
  async extractTablesAndForms(base64PDF: string): Promise<any> {
    const response = await openai.chat.completions.create({
      model: "anthropic/claude-3.5-sonnet:beta",
      messages: [{
        role: "user",
        content: [
          {
            type: "text",
            text: `Extract all tables and form data from this document. Preserve structure and relationships. Return JSON:
            {
              "tables": [{"headers": [], "rows": [], "title": ""}],
              "forms": [{"fields": [], "values": [], "formType": ""}],
              "checkboxes": [{"label": "", "checked": boolean}],
              "calculations": "any mathematical calculations found"
            }`
          },
          {
            type: "image_url",
            image_url: { url: `data:application/pdf;base64,${base64PDF}` }
          }
        ]
      }],
      max_tokens: 3000,
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  }

  /**
   * Technical Drawing and Diagram Analysis
   */
  async analyzeTechnicalDrawings(base64PDF: string): Promise<any> {
    const response = await openai.chat.completions.create({
      model: "anthropic/claude-3.5-sonnet:beta",
      messages: [{
        role: "user",
        content: [
          {
            type: "text",
            text: `Analyze any technical drawings, diagrams, or schematics in this solar document. Extract measurements, specifications, and technical details. Return JSON:
            {
              "drawings": "descriptions of technical drawings",
              "measurements": "extracted dimensions and measurements", 
              "specifications": "technical specifications",
              "components": "identified system components",
              "layouts": "system layout descriptions"
            }`
          },
          {
            type: "image_url",
            image_url: { url: `data:application/pdf;base64,${base64PDF}` }
          }
        ]
      }],
      max_tokens: 3000,
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  }

  /**
   * Quality and Condition Assessment
   */
  async assessDocumentQuality(base64PDF: string): Promise<any> {
    const response = await openai.chat.completions.create({
      model: "anthropic/claude-3.5-sonnet:beta",
      messages: [{
        role: "user",
        content: [
          {
            type: "text",
            text: `Assess the quality and condition of this document. Return JSON:
            {
              "readability": "excellent|good|fair|poor",
              "completeness": "percentage complete",
              "damage": "any damage or quality issues",
              "clarity": "text and image clarity assessment",
              "processingDifficulty": "easy|medium|hard|very_hard",
              "recommendations": "processing recommendations"
            }`
          },
          {
            type: "image_url",
            image_url: { url: `data:application/pdf;base64,${base64PDF}` }
          }
        ]
      }],
      max_tokens: 1500,
      response_format: { type: "json_object" }
    });

    return JSON.parse(response.choices[0].message.content);
  }
}

export const pdfOCREngine = new PDFOCREngine();