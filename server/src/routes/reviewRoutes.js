import express from "express";
import { getReviews, createReview } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/", createReview);
router.get("/:destinationId", getReviews);

export default router;
