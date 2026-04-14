import express from "express";
import { createBooking, getBookings, cancelBooking } from "../controllers/bookingController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authenticate, createBooking);
router.get("/", authenticate, getBookings);
router.delete("/:bookingId", authenticate, cancelBooking);

export default router;