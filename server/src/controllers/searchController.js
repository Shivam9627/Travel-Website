import OpenAI from 'openai';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Destination from '../models/Destination.js';
import { seedDestinations } from '../data/seedDestinations.js';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

/**
 * Search destinations - database first, then Gemini/OpenAI for unknown destinations
 */
export const searchDestinations = async (req, res) => {
  const { query } = req.query;

  if (!query || query.trim() === '') {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  try {
    const useMock = globalThis.__MOCK_DB__ === true;

    // Step 1: Search in existing database
    let dbResults = [];
    
    if (useMock) {
      // Search in seed data
      dbResults = seedDestinations.filter(
        (d) =>
          d.name.toLowerCase().includes(query.toLowerCase()) ||
          d.country.toLowerCase().includes(query.toLowerCase()) ||
          d.description.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      // Search MongoDB
      dbResults = await Destination.find({
        $or: [
          { name: { $regex: query, $options: 'i' } },
          { country: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
        ],
      }).lean();
    }

    // Step 2: If found in database, return immediately
    if (dbResults.length > 0) {
      console.log(`[Search] Found ${dbResults.length} destinations for "${query}" in database`);
      return res.status(200).json({
        source: 'database',
        query,
        results: dbResults,
        count: dbResults.length,
      });
    }

    // Step 3: Query not found in DB - use Gemini (preferred) or OpenAI
    console.log(`[Search] No results in database for "${query}". Using AI...`);

    const prompt = `You are a travel destination expert. The user is searching for: "${query}"

Generate a detailed travel destination that matches this search query. Return JSON with exactly this structure (no extra text):
{
  "name": "exact destination name",
  "country": "country name",
  "description": "2-3 sentence detailed description of what makes this destination special",
  "price": 250,
  "rating": 4.8,
  "tag": "City",
  "activities": ["Sightseeing", "Local Food", "Walking Tour", "Museums"]
}

IMPORTANT: Only return valid JSON, nothing else.`;

    let aiResponse = "";

    if (genAI) {
      console.log("[Search] Using Gemini API...");
      try {
        // Use gemini-1.5-flash as preferred stable model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        aiResponse = response.text().replace(/```json|```/g, "").trim();
      } catch (geminiError) {
        console.error("[Search] Gemini 1.5 Flash error, trying pro:", geminiError.message);
        try {
          const model = genAI.getGenerativeModel({ model: "gemini-pro" });
          const result = await model.generateContent(prompt);
          const response = await result.response;
          aiResponse = response.text().replace(/```json|```/g, "").trim();
        } catch (innerError) {
          console.error("[Search] Gemini Pro also failed:", innerError.message);
          throw geminiError;
        }
      }
    } else {
      console.log("[Search] Using OpenAI API...");
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful travel expert who returns perfectly formatted JSON only.',
          },
          { role: 'user', content: prompt },
        ],
        max_tokens: 500,
        temperature: 0.7,
      });
      aiResponse = completion.choices[0].message.content.trim();
    }

    // Parse JSON response
    let aiDestination;
    try {
      aiDestination = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error('[Search] Failed to parse AI response:', aiResponse);
      aiDestination = {
        name: query,
        country: 'Travel Hub',
        description: `A unique destination matching "${query}" perfect for your next adventure.`,
        price: 250,
        rating: 4.5,
        tag: 'Adventure',
        activities: ['Exploration', 'Local culture', 'Photography', 'Dining'],
      };
    }

    // Generate realistic image URL using Unsplash
    const imageQuery = encodeURIComponent(aiDestination.name || query.split(',')[0]);
    aiDestination.image =
      `https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80`; // Default placeholder
    
    // Better Unsplash fallback
    const photoIds = [
      'photo-1476514525535-07fb3b4ae5f1', // Travel
      'photo-1500835595227-defbc2ba4f74', // Landscape
      'photo-1469854523086-cc02fe5d8800', // Road trip
    ];
    const randomId = photoIds[Math.floor(Math.random() * photoIds.length)];
    aiDestination.image = `https://images.unsplash.com/${randomId}?auto=format&fit=crop&w=1200&q=80`;
    
    aiDestination.images = [
      aiDestination.image,
      `https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80`,
    ];

    console.log(`[Search] Generated AI destination for "${query}":`, aiDestination.name);

    res.status(200).json({
      source: genAI ? 'gemini' : 'openai',
      query,
      results: [aiDestination],
      count: 1,
      message: `Generated result for "${query}" using AI`,
    });
  } catch (error) {
    console.error('[Search] AI Error:', error.message);

    // Fallback - return a mock destination if AI fails (quota etc)
    const fallbackDestination = {
      name: query.charAt(0).toUpperCase() + query.slice(1),
      country: 'World',
      description: `Discover the beauty of ${query}. A unique destination perfect for travelers seeking new experiences.`,
      price: 225,
      rating: 4.6,
      tag: 'Adventure',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
      images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80'],
      activities: ['Sightseeing', 'Cultural tours', 'Adventure', 'Relaxation'],
    };

    return res.status(200).json({
      source: 'fallback',
      query,
      results: [fallbackDestination],
      count: 1,
      message: 'Generated fallback destination due to AI limit',
    });
  }
};
