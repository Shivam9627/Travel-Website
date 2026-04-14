import mongoose from "mongoose";
import Destination from "../models/Destination.js";
import { seedDestinations, getDestinationById as getSeedById } from "../data/seedDestinations.js";

const useMock = () => globalThis.__MOCK_DB__ === true;

/**
 * Get all destinations
 * Priority: Database first, fallback to seed data
 */
export const getAllDestinations = async (req, res) => {
  try {
    // Use mock mode if flagged
    if (useMock()) {
      console.log("[Destinations] Returning seed data (mock mode)");
      return res.status(200).json(seedDestinations);
    }

    // Try to fetch from database
    const destinations = await Destination.find().lean();

    if (!destinations || destinations.length === 0) {
      console.warn("[Destinations] Database returned no results, falling back to seed data");
      return res.status(200).json(seedDestinations);
    }

    console.log(`[Destinations] Returned ${destinations.length} destinations from database`);
    res.status(200).json(destinations);
  } catch (error) {
    console.error("[Destinations] Error fetching from database:", error.message);
    console.log("[Destinations] Falling back to seed data due to error");
    res.status(200).json(seedDestinations);
  }
};

/**
 * Get a single destination by ID
 * Priority: Database first, fallback to seed data
 */
export const getDestinationById = async (req, res) => {
  const { id } = req.params;

  try {
    // Use mock mode if flagged
    if (useMock()) {
      const d = getSeedById(id);
      if (!d) {
        return res.status(404).json({ message: "Destination not found in seed data" });
      }
      return res.status(200).json(d);
    }

    // AI-generated destinations check (they start with 'ai-')
    if (id.startsWith('ai-')) {
      console.log(`[Destination] Request for AI-generated destination: ${id}`);
      // For AI-generated IDs, we acknowledge them but don't try to fetch from DB.
      // In a real app, you might cache these or re-generate them.
      return res.status(200).json({
        _id: id,
        name: "AI Generated Destination",
        country: "AI Land",
        description: "This is an AI-generated destination. Details will be provided by the AI Planner.",
        price: 0,
        rating: 0,
        tag: "AI",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", // Placeholder image
        images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"],
        activities: ["AI Exploration"],
        region: "AI World",
        aiGenerated: true,
      });
    }

    // Try to fetch from database - only if it looks like a valid MongoDB ObjectId
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    let destination = null;
    
    if (isValidId) {
      destination = await Destination.findById(id).lean();
    }

    if (destination) {
      console.log(`[Destination] Found in database: ${id}`);
      return res.status(200).json(destination);
    }

    // Fallback to seed data
    const seedData = getSeedById(id);
    if (seedData) {
      console.log(`[Destination] Found in seed data (not in DB): ${id}`);
      return res.status(200).json(seedData);
    }

    // Not found anywhere
    console.warn(`[Destination] Not found: ${id}`);
    res.status(404).json({ message: "Destination not found" });
  } catch (error) {
    console.error("[Destination] Error fetching by ID:", error.message);

    // Graceful fallback
    const seedData = getSeedById(id);
    if (seedData) {
      console.log(`[Destination] Returning seed data due to error: ${id}`);
      return res.status(200).json(seedData);
    }

    res.status(500).json({ message: "Error fetching destination", error: error.message });
  }
};

/**
 * Create a new destination
 */
export const createDestination = async (req, res) => {
  if (useMock()) {
    return res.status(201).json({ message: "Mock mode: create skipped", payload: req.body });
  }

  try {
    const newDestination = new Destination(req.body);
    const savedDestination = await newDestination.save();
    console.log(`[Destination] Created new destination: ${savedDestination._id}`);
    res.status(201).json(savedDestination);
  } catch (error) {
    console.error("[Destination] Error creating destination:", error.message);
    res.status(400).json({ message: "Error creating destination", error: error.message });
  }
};

/**
 * Update a destination
 */
export const updateDestination = async (req, res) => {
  const { id } = req.params;

  if (useMock()) {
    return res.status(200).json({ message: "Mock mode: update skipped", id, payload: req.body });
  }

  try {
    const updatedDestination = await Destination.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).lean();

    if (!updatedDestination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    console.log(`[Destination] Updated: ${id}`);
    res.status(200).json(updatedDestination);
  } catch (error) {
    console.error("[Destination] Error updating destination:", error.message);
    res.status(400).json({ message: "Error updating destination", error: error.message });
  }
};

/**
 * Delete a destination
 */
export const deleteDestination = async (req, res) => {
  const { id } = req.params;

  if (useMock()) {
    return res.status(200).json({ message: "Mock mode: delete skipped", id });
  }

  try {
    const deletedDestination = await Destination.findByIdAndDelete(id);

    if (!deletedDestination) {
      return res.status(404).json({ message: "Destination not found" });
    }

    console.log(`[Destination] Deleted: ${id}`);
    res.status(200).json({ message: "Destination deleted successfully" });
  } catch (error) {
    console.error("[Destination] Error deleting destination:", error.message);
    res.status(500).json({ message: "Error deleting destination", error: error.message });
  }
};
