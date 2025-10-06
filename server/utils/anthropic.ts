import Anthropic from '@anthropic-ai/sdk';

// the newest Anthropic model is "claude-3-7-sonnet-20250219" which was released February 24, 2025
const MODEL = 'claude-3-7-sonnet-20250219';

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error("ANTHROPIC_API_KEY environment variable must be set");
}

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function generateChatResponse(messages: { role: string; content: string }[], contextText?: string) {
  try {
    // Convert the messages to the format expected by Anthropic
    const formattedMessages = messages.map(msg => ({
      role: msg.role === "user" ? "user" : "assistant" as "user" | "assistant",
      content: msg.content
    }));

    const systemPrompt = contextText 
      ? `You are a friendly, helpful assistant for Advance Power Redding, a solar installation and renewable energy company serving Shasta County since 1999. 
      You help customers by providing information about solar installations, battery storage, financing options, and energy savings.
      
      When responding, only use information from the provided context or general knowledge about
      solar energy if relevant. If you don't know the answer or if the question is outside the
      scope of the provided context, politely say so and offer to connect the user with a human representative.
      
      Context information:
      ${contextText}`
      : `You are a friendly, helpful assistant for Advance Power Redding, a solar installation and renewable energy company founded by Greg Tomsik in 1999.
      
      Company Information:
      - Founded: 1999 by Greg Tomsik
      - Location: Redding, California (serving Shasta County)
      - Services: Solar installations, battery storage systems, solar repairs, energy efficiency consultations
      - Contact: (530) 241-5297 | office@apredding.net
      - Specialties: Residential solar, commercial solar, hybrid systems, battery storage solutions
      
      Battery Financing Options:
      - Federal solar tax credit (30% through 2032)
      - California solar incentives and rebates
      - Solar loans with competitive rates
      - Power Purchase Agreements (PPAs)
      - Solar leasing options
      - Zero-down financing available
      - PACE financing for qualified properties
      
      When answering questions, be concise and professional. If you don't know the answer, politely say so
      and offer to connect the user with a human representative at (530) 241-5297.`;

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 2048,
      system: systemPrompt,
      messages: formattedMessages,
    });

    return response.content[0].type === 'text' ? response.content[0].text : "I'm sorry, I couldn't process that request.";
  } catch (error) {
    
    throw new Error("Failed to generate chat response. Please try again later.");
  }
}

// Function to chunk text for RAG processing
export function chunkText(text: string, maxChunkSize: number = 1000): { content: string, chunkIndex: number }[] {
  // Split text into paragraphs
  const paragraphs = text.split(/\n\s*\n/);
  
  const chunks: { content: string, chunkIndex: number }[] = [];
  let currentChunk = "";
  let chunkIndex = 0;
  
  paragraphs.forEach(paragraph => {
    // If adding this paragraph would exceed max size and we already have content,
    // save the current chunk and start a new one
    if ((currentChunk.length + paragraph.length) > maxChunkSize && currentChunk.length > 0) {
      chunks.push({
        content: currentChunk.trim(),
        chunkIndex: chunkIndex++
      });
      currentChunk = "";
    }
    
    // If a single paragraph is larger than maxChunkSize, split it further
    if (paragraph.length > maxChunkSize) {
      // Split the paragraph into sentences
      const sentences = paragraph.match(/[^.!?]+[.!?]+/g) || [paragraph];
      
      let sentenceChunk = "";
      sentences.forEach(sentence => {
        if ((sentenceChunk.length + sentence.length) > maxChunkSize && sentenceChunk.length > 0) {
          chunks.push({
            content: sentenceChunk.trim(),
            chunkIndex: chunkIndex++
          });
          sentenceChunk = "";
        }
        
        // If a single sentence is still too long, split it into words
        if (sentence.length > maxChunkSize) {
          let wordChunk = "";
          const words = sentence.split(/\s+/);
          
          words.forEach(word => {
            if ((wordChunk.length + word.length + 1) > maxChunkSize && wordChunk.length > 0) {
              chunks.push({
                content: wordChunk.trim(),
                chunkIndex: chunkIndex++
              });
              wordChunk = "";
            }
            wordChunk += (wordChunk ? " " : "") + word;
          });
          
          if (wordChunk.length > 0) {
            sentenceChunk += (sentenceChunk ? " " : "") + wordChunk;
          }
        } else {
          sentenceChunk += (sentenceChunk ? " " : "") + sentence;
        }
      });
      
      if (sentenceChunk.length > 0) {
        currentChunk += (currentChunk ? "\n\n" : "") + sentenceChunk;
      }
    } else {
      currentChunk += (currentChunk ? "\n\n" : "") + paragraph;
    }
  });
  
  // Don't forget to add the last chunk if it has content
  if (currentChunk.length > 0) {
    chunks.push({
      content: currentChunk.trim(),
      chunkIndex: chunkIndex
    });
  }
  
  return chunks;
}

// Simple semantic search function based on exact word matching
// In a production environment, this would be replaced with a vector-based similarity search
export function simpleSemanticSearch(query: string, chunks: { id: number, content: string }[], topK: number = 3): number[] {
  // Tokenize the query - convert to lowercase and split into words
  const queryWords = new Set(
    query.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3) // Only keep words with more than 3 chars
  );
  
  // Score each chunk based on term frequency
  const scores = chunks.map(chunk => {
    const content = chunk.content.toLowerCase();
    let score = 0;
    
    // Count how many query words appear in the chunk
    queryWords.forEach(word => {
      const regex = new RegExp(`\\b${word}\\b`, 'g');
      const matches = content.match(regex);
      if (matches) {
        score += matches.length;
      }
    });
    
    return { id: chunk.id, score };
  });
  
  // Sort by score descending and take the top K results
  const topResults = scores
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .filter(result => result.score > 0) // Only return chunks with matches
    .map(result => result.id);
  
  return topResults;
}