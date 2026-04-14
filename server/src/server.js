import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
import { initializeDatabase, getDBStatus } from "./config/dbInit.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

/**
 * Establish MongoDB connection with retry logic
 * Career improvement: Production-grade database connection handling
 */
export const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.warn("[DB] MONGODB_URI not set — using in-memory demo data (no database required).");
    globalThis.__MOCK_DB__ = true;
    return { success: false, reason: "MONGODB_URI not configured" };
  }

  try {
    globalThis.__MOCK_DB__ = false;
    
    console.log("[DB] Connecting to MongoDB...");
    
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      retryWrites: true,
      connectTimeoutMS: 10000,
    });

    console.log("[DB] ✓ MongoDB connected successfully");

    // Initialize/seed database if needed
    if (process.env.DB_SEED_ON_STARTUP === "true") {
      await initializeDatabase();
    }

    const status = await getDBStatus();
    console.log(`[DB] Status: ${status.message}`);

    return { success: true, status };
  } catch (error) {
    console.error("[DB] ✗ MongoDB connection failed:", error?.message || error);
    console.error("[DB] Full error:", error);
    console.warn("[DB] Falling back to in-memory demo data mode...");
    globalThis.__MOCK_DB__ = true;
    return { success: false, reason: error?.message };
  }
};

const startServer = async () => {
  console.log("[Server] Starting application...");
  console.log(`[Server] Environment: ${process.env.NODE_ENV}`);

  const dbResult = await connectDB();

  if (!dbResult.success && !globalThis.__MOCK_DB__) {
    console.error("[Server] ✗ Database connection required but failed. Check MongoDB connection.");
  }

  const server = app.listen(PORT, () => {
    console.log(`[Server] ✓ Running on http://localhost:${PORT}`);
    console.log(`[Server] Mock DB Mode: ${globalThis.__MOCK_DB__}`);
    console.log("[Server] Ready to accept requests");
  });

  // Graceful shutdown
  process.on("SIGTERM", () => {
    console.log("[Server] SIGTERM signal received: closing HTTP server");
    server.close(() => {
      console.log("[Server] HTTP server closed");
      mongoose.connection.close();
      process.exit(0);
    });
  });
};

startServer().catch((error) => {
  console.error("[Server] Fatal error during startup:", error);
  process.exit(1);
});
