import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import destinationRoutes from "./routes/destinationRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import transportRoutes from "./routes/transportRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { getDBStatus } from "./config/dbInit.js";

const app = express();

app.use(cors({
  origin: "*", // allow all origins in dev
  credentials: true
}));
app.use(express.json());

/**
 * Health check endpoint - detailed status including database
 */
app.get("/api/health", async (req, res) => {
  try {
    const dbStatus = await getDBStatus();
    res.status(dbStatus.connected ? 200 : 503).json({
      ok: true,
      timestamp: new Date().toISOString(),
      mock: Boolean(globalThis.__MOCK_DB__),
      database: dbStatus,
      environment: process.env.NODE_ENV,
    });
  } catch (error) {
    res.status(503).json({
      ok: false,
      error: "Health check failed",
      message: error.message,
    });
  }
});

/**
 * API Routes
 */
app.use("/api/auth", authRoutes);
app.use("/api/destinations", destinationRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/transport", transportRoutes);

/**
 * Error handling middleware
 */
app.use(errorHandler);

export default app;
