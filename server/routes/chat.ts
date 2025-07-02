import { Request, Response, Router } from "express";
import { db } from "../db";
import { chatSessions, chatMessages, ragChunks, insertChatSessionSchema, insertChatMessageSchema } from "@shared/schema";
import { generateChatResponse, simpleSemanticSearch } from "../utils/anthropic";
import { eq, desc, and, sql } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

const router = Router();

// Create a new chat session
router.post("/sessions", async (req: Request, res: Response) => {
  try {
    let sessionData = req.body;

    // If no sessionId provided, create one
    if (!sessionData.sessionId) {
      sessionData = {
        ...sessionData,
        sessionId: uuidv4(),
      };
    }

    const validation = insertChatSessionSchema.safeParse(sessionData);
    
    if (!validation.success) {
      return res.status(400).json({ error: "Invalid session data", details: validation.error });
    }
    
    // Insert the session
    const [session] = await db.insert(chatSessions).values(validation.data).returning();
    
    res.status(201).json(session);
  } catch (error) {
    
    res.status(500).json({ error: "Failed to create chat session" });
  }
});

// Get all chat sessions
router.get("/sessions", async (req: Request, res: Response) => {
  try {
    const sessions = await db.select().from(chatSessions)
      .orderBy(desc(chatSessions.updatedAt));
      
    res.json(sessions);
  } catch (error) {
    
    res.status(500).json({ error: "Failed to fetch chat sessions" });
  }
});

// Get a specific chat session with its messages
router.get("/sessions/:sessionId", async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    
    // Get the session
    const [session] = await db.select().from(chatSessions)
      .where(eq(chatSessions.sessionId, sessionId));
      
    if (!session) {
      return res.status(404).json({ error: "Chat session not found" });
    }
    
    // Get all messages for this session
    const messages = await db.select().from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(chatMessages.createdAt);
    
    res.json({ ...session, messages });
  } catch (error) {
    
    res.status(500).json({ error: "Failed to fetch chat session" });
  }
});

// Delete a chat session
router.delete("/sessions/:sessionId", async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;
    
    // Delete the session
    const [session] = await db.delete(chatSessions)
      .where(eq(chatSessions.sessionId, sessionId))
      .returning();
      
    if (!session) {
      return res.status(404).json({ error: "Chat session not found" });
    }
    
    res.json({ message: "Chat session deleted successfully" });
  } catch (error) {
    
    res.status(500).json({ error: "Failed to delete chat session" });
  }
});

// Send a message and get a response
router.post("/messages", async (req: Request, res: Response) => {
  try {
    const { sessionId, content, useRAG = true } = req.body;
    
    if (!sessionId || !content) {
      return res.status(400).json({ error: "Session ID and content are required" });
    }
    
    // Check if session exists
    const [session] = await db.select().from(chatSessions)
      .where(eq(chatSessions.sessionId, sessionId));
      
    if (!session) {
      return res.status(404).json({ error: "Chat session not found" });
    }
    
    // Update session's updatedAt timestamp
    await db.update(chatSessions)
      .set({ updatedAt: new Date() })
      .where(eq(chatSessions.sessionId, sessionId));
    
    // Save the user message
    const userMessage = {
      sessionId,
      role: "user",
      content,
      citedDocuments: []
    };
    
    await db.insert(chatMessages).values(userMessage);
    
    // Get previous messages for context
    const previousMessages = await db.select().from(chatMessages)
      .where(eq(chatMessages.sessionId, sessionId))
      .orderBy(chatMessages.createdAt);
    
    const contextMessages = previousMessages.map(msg => ({
      role: msg.role,
      content: msg.content
    }));
    
    let ragContext = "";
    let citedDocuments: number[] = [];
    
    if (useRAG) {
      // Retrieve all chunks for RAG search
      const allChunks = await db.select({
        id: ragChunks.id,
        content: ragChunks.content,
        documentId: ragChunks.documentId
      }).from(ragChunks);
      
      if (allChunks.length > 0) {
        // Find relevant chunks using semantic search
        const relevantChunkIds = simpleSemanticSearch(content, allChunks, 3);
        
        if (relevantChunkIds.length > 0) {
          // Retrieve the full content of relevant chunks
          const relevantChunks = await db.select({
            id: ragChunks.id,
            content: ragChunks.content,
            documentId: ragChunks.documentId
          }).from(ragChunks)
            .where(sql`${ragChunks.id} IN (${relevantChunkIds.join(',')})`);
          
          // Get the document IDs for citation
          const uniqueDocIds = new Set<number>();
          relevantChunks.forEach(chunk => uniqueDocIds.add(chunk.documentId));
          citedDocuments = Array.from(uniqueDocIds);
          
          // Combine chunk content for context
          ragContext = relevantChunks.map(chunk => chunk.content).join('\n\n');
        }
      }
    }
    
    // Generate a response using Claude
    const assistantResponse = await generateChatResponse(contextMessages, ragContext);
    
    // Save the assistant message
    const assistantMessage = {
      sessionId,
      role: "assistant",
      content: assistantResponse,
      citedDocuments: citedDocuments.length > 0 ? citedDocuments : null
    };
    
    const [savedMessage] = await db.insert(chatMessages).values(assistantMessage).returning();
    
    // If no title yet, generate one from the first user message and update the session
    if (!session.title && previousMessages.length <= 2) {
      const title = content.length > 50 
        ? content.substring(0, 47) + '...' 
        : content;
        
      await db.update(chatSessions)
        .set({ title })
        .where(eq(chatSessions.sessionId, sessionId));
    }
    
    res.json(savedMessage);
  } catch (error) {
    
    res.status(500).json({ error: "Failed to send message" });
  }
});

export default router;