import axios from "axios";
import Doc from "../models/doc.model.js"; // your schema

/**
 * Ask AI with context from MongoDB + Gemini (via Flask).
 * @param {string} query - The user’s question.
 * @param {number[]} queryEmbedding - Pre-generated embedding array.
 * @returns {Promise<string>} AI answer from Flask.
 */
export async function askAI(query, queryEmbedding) {
  try {
    // Step 1: Vector search in MongoDB Atlas
    const results = await Doc.aggregate([
      {
        $vectorSearch: {
          index: "vector_index",  // <- must match Atlas Vector Search index name
          path: "embedding",
          queryVector: queryEmbedding,
          numCandidates: 100,
          limit: 3,
        },
      },
    ]);

    if (!results.length) {
        
        throw new Error("No matching documents found for the query embedding");
    }

    // Step 2: Build context
    const context = results.map(doc => doc.content).join("\n\n");

    // Step 3: Send to Flask API
    const response = await axios.post("http://localhost:5001/generate", {
      query,
      embedding: queryEmbedding,
      context,
    });

    return response.data.answer;
  } catch (err) {
    console.error("Error in askAI:", err.message);
    throw err;
  }
}

export async function getTopicsAI(queryEmbedding) {
  try {
    // Step 1: Vector search in MongoDB Atlas to find relevant documents
    const results = await Doc.aggregate([
      {
        $vectorSearch: {
          index: "vector_index", // <- must match Atlas Vector Search index name
          path: "embedding",
          queryVector: queryEmbedding,
          numCandidates: 100,
          limit: 5, // Using a slightly higher limit to build a broader context for topics
        },
      },
    ]);

    if (!results.length) {
      throw new Error("No matching documents found for the query embedding");
    }

    // Step 2: Combine the content of the found documents to create a context
    const context = results.map(doc => doc.content).join("\n\n");

    // Step 3: Send the context to the Flask API's /topics endpoint
    const response = await axios.post("http://localhost:5001/topics", {
      context,
    });

    return response.data.topics;
  } catch (err) {
    console.error("Error in getTopicsAI:", err.message);
    // Re-throw the error to be handled by the calling function
    throw err;
  }
}

export async function categorizeQueryAI(query, topics) {
  try {
    // Step 1: Send the query and the list of topics to the Flask API
    const response = await axios.post("http://localhost:5001/categorize", {
      query,
      topics,
    });

    // Step 2: Return the single related topic identified by the AI
    return response.data.related_topic;
  } catch (err) {
    console.error("Error in categorizeQueryAI:", err.message);
    // Re-throw the error to be handled by the calling function
    throw err;
  }
}