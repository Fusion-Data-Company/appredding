import { Request, Response, Router } from "express";
import { db } from "../db";
import { ragChunks, ragDocuments, insertRagDocumentSchema, insertRagChunkSchema } from "@shared/schema";
import { chunkText } from "../utils/anthropic";
import { eq } from "drizzle-orm";

const router = Router();

// Get all documents
router.get("/documents", async (req: Request, res: Response) => {
  try {
    const documents = await db.select().from(ragDocuments).orderBy(ragDocuments.createdAt);
    res.json(documents);
  } catch (error) {
    
    res.status(500).json({ error: "Failed to fetch documents" });
  }
});

// Get single document with its chunks
router.get("/documents/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const document = await db.select().from(ragDocuments).where(eq(ragDocuments.id, Number(id))).limit(1);
    
    if (!document.length) {
      return res.status(404).json({ error: "Document not found" });
    }
    
    const chunks = await db.select().from(ragChunks)
      .where(eq(ragChunks.documentId, Number(id)))
      .orderBy(ragChunks.chunkIndex);
    
    res.json({ ...document[0], chunks });
  } catch (error) {
    
    res.status(500).json({ error: "Failed to fetch document" });
  }
});

// Create a new document and its chunks
router.post("/documents", async (req: Request, res: Response) => {
  try {
    const validation = insertRagDocumentSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ error: "Invalid document data", details: validation.error });
    }
    
    const documentData = validation.data;
    
    // Insert the document
    const [document] = await db.insert(ragDocuments).values(documentData).returning();
    
    // Create chunks from the document content
    const chunks = chunkText(documentData.content);
    
    // Insert all chunks
    const chunkInserts = chunks.map(chunk => ({
      documentId: document.id,
      content: chunk.content,
      chunkIndex: chunk.chunkIndex,
      metadata: {}
    }));
    
    if (chunkInserts.length > 0) {
      await db.insert(ragChunks).values(chunkInserts);
    }
    
    res.status(201).json(document);
  } catch (error) {
    
    res.status(500).json({ error: "Failed to create document" });
  }
});

// Update a document
router.put("/documents/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const validation = insertRagDocumentSchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({ error: "Invalid document data", details: validation.error });
    }
    
    const documentData = validation.data;
    
    // Update the document
    const [document] = await db.update(ragDocuments)
      .set({ ...documentData, updatedAt: new Date() })
      .where(eq(ragDocuments.id, Number(id)))
      .returning();
    
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }
    
    // Delete existing chunks
    await db.delete(ragChunks).where(eq(ragChunks.documentId, Number(id)));
    
    // Create new chunks
    const chunks = chunkText(documentData.content);
    
    // Insert all chunks
    const chunkInserts = chunks.map(chunk => ({
      documentId: document.id,
      content: chunk.content,
      chunkIndex: chunk.chunkIndex,
      metadata: {}
    }));
    
    if (chunkInserts.length > 0) {
      await db.insert(ragChunks).values(chunkInserts);
    }
    
    res.json(document);
  } catch (error) {
    
    res.status(500).json({ error: "Failed to update document" });
  }
});

// Delete a document (and its chunks via CASCADE)
router.delete("/documents/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const [document] = await db.delete(ragDocuments)
      .where(eq(ragDocuments.id, Number(id)))
      .returning();
    
    if (!document) {
      return res.status(404).json({ error: "Document not found" });
    }
    
    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    
    res.status(500).json({ error: "Failed to delete document" });
  }
});

export default router;