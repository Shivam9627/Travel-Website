import Destination from "../models/Destination.js";
import { seedDestinations } from "../data/seedDestinations.js";

/**
 * Initialize database with seed data if empty
 * This ensures the database is never empty when MongoDB is connected
 * Industry standard: Idempotent data initialization on server startup
 */
export const initializeDatabase = async () => {
  try {
    // Check if data already exists
    const count = await Destination.countDocuments();

    // If images are broken or we need to force update, we can check for specific conditions
    // For now, let's allow a "force seed" if we want to refresh images
    if (count === 0 || process.env.FORCE_DB_SEED === "true") {
      console.log(`[DB Init] ${count === 0 ? 'Database is empty' : 'Force seed enabled'}. Seeding destinations...`);

      if (process.env.FORCE_DB_SEED === "true") {
        await Destination.deleteMany({});
        console.log("[DB Init] Cleared existing destinations for fresh seed.");
      }

      // Insert seed data
      const inserted = await Destination.insertMany(seedDestinations, { ordered: false });

      console.log(`[DB Init] ✓ Successfully seeded ${inserted.length} destinations`);
      return { seeded: true, count: inserted.length };
    } else {
      console.log(`[DB Init] ✓ Database already contains ${count} destinations. Skipping seed.`);
      return { seeded: false, count };
    }
  } catch (error) {
    console.error("[DB Init] Error during database initialization:", error.message);

    // Log what data we tried to insert for debugging
    console.error(`[DB Init] Attempted to insert ${seedDestinations.length} seed records`);

    throw new Error(`Database initialization failed: ${error.message}`);
  }
};

/**
 * Verify database connectivity and status
 * Used for health checks
 */
export const getDBStatus = async () => {
  try {
    const count = await Destination.countDocuments();
    return {
      connected: true,
      recordCount: count,
      message: `Database connected with ${count} destinations`,
    };
  } catch (error) {
    return {
      connected: false,
      recordCount: 0,
      message: `Database error: ${error.message}`,
    };
  }
};
