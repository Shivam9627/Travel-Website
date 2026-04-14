import OpenAI from 'openai';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;

export const planTrip = async (req, res) => {
  const { destination, days, pace = "balanced", transport = "mixed" } = req.body;

  if (!destination || !days || Number(days) <= 0) {
    return res.status(400).json({
      message: "destination and days are required; days must be greater than 0",
    });
  }

    const dayCount = Math.min(Number(days), 10); // Increased cap to 10 days for better planning

    try {
      const prompt = `You are a professional travel planner like ChatGPT. Create a high-end, detailed, and realistic travel itinerary for ${destination} for EXACTLY ${dayCount} days.
      
      Requirements:
      1. Pace: ${pace}.
      2. Transport: ${transport}.
      3. For EACH of the ${dayCount} days, provide:
         - A specific Morning activity (with landmark names).
         - A specific Lunch recommendation (local cuisine/area).
         - A specific Afternoon activity (hidden gems or culture).
         - A specific Evening plan (nightlife, views, or dinner).
      4. DO NOT repeat the same activities. Every day must be unique.
      5. Include ${dayCount} separate "Day X" sections.
      6. Provide 3-5 specific "Pro Travel Tips" for ${destination}.
      
      Format the output with bold headings and clear bullet points. Use real-world knowledge of ${destination}.`;

      let plan = "";

      if (genAI) {
        console.log("[AI Planner] Using Gemini API...");
        try {
          // Use gemini-1.5-flash which is widely available and fast
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
          const result = await model.generateContent(prompt);
          const response = await result.response;
          plan = response.text();
        } catch (geminiError) {
          console.error("[AI Planner] Gemini 1.5 Flash error, trying pro:", geminiError.message);
          try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent(prompt);
            const response = await result.response;
            plan = response.text();
          } catch (proError) {
            console.error("[AI Planner] Gemini Pro also failed:", proError.message);
            throw proError; // Fallback will catch this
          }
        }
      } else {
      console.log("[AI Planner] Using OpenAI API...");
      const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a professional travel planner." },
          { role: "user", content: prompt }
        ],
        max_tokens: 1500,
      });
      plan = completion.choices[0].message.content;
    }

    res.json({ plan, destination, days: dayCount, pace, transport });
  } catch (error) {
    console.error("AI API error:", error);
    
    // Fallback logic
    const fallbackPlan = `Detailed ${dayCount}-day ${pace} itinerary for ${destination}:
    
Day 1: ${destination} Highlights
- Morning: Visit the most famous city center landmark and enjoy local breakfast.
- Afternoon: Explore the historical district and local markets.
- Evening: Traditional dinner at a highly-rated local restaurant.

Day 2: Culture & Art
- Morning: Visit a prominent museum or gallery.
- Afternoon: Take a walking tour of the artistic neighborhoods.
- Evening: Experience a local cultural performance or show.

${dayCount > 2 ? `Day 3: Nature & Scenery
- Morning: Head to a nearby park or natural attraction.
- Afternoon: Relaxing stroll or boat ride if applicable.
- Evening: Sunset view from a scenic lookout point.` : ''}

(Note: This is a structured fallback plan due to high AI traffic. Please try again for a fully custom version!)`;

    res.json({ plan: fallbackPlan, destination, days: dayCount, pace, transport, isFallback: true });
  }
};
