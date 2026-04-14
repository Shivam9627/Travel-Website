import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Destination from "../models/Destination.js";
import { mockBookings } from "../data/mockBookingsStore.js";
import { getDestinationById } from "../data/seedDestinations.js";
import mongoose from "mongoose";

const useMock = () => globalThis.__MOCK_DB__;

const mockUserId = () => "507f1f77bcf86cd799439011";

export const createBooking = async (req, res) => {
  const userId = req.user?.id ?? mockUserId();
  const { 
    destinationId, 
    bookingDate, 
    numberOfGuests, 
    startDate, 
    guests, 
    rideName,
    paymentMethod = "cash_on_delivery" 
  } = req.body;

  const destId = destinationId;
  const numGuests = Number(numberOfGuests || guests) || 1;
  const dateRaw = bookingDate || startDate || new Date().toISOString();

  if (!destId && !rideName) {
    return res.status(400).json({ message: "destinationId or rideName is required" });
  }

  if (useMock()) {
    let totalPrice = 0;
    let destination = null;

    if (destId && destId !== 'ride-only') {
      destination = getDestinationById(destId);
      if (destination) {
        totalPrice = Math.round(destination.price * numGuests * 3);
      }
    } else if (rideName) {
      totalPrice = 50 * numGuests;
    }

    const row = {
      _id: new mongoose.Types.ObjectId().toString(),
      userId,
      destinationId: destId === 'ride-only' ? null : destId,
      rideName: rideName || null,
      bookingDate: new Date(dateRaw),
      numberOfGuests: numGuests,
      totalPrice,
      paymentMethod: paymentMethod || "cash_on_delivery",
      paymentStatus: paymentMethod === "cash_on_delivery" ? "pending" : "completed",
      status: "confirmed",
      destination,
    };
    mockBookings.unshift(row);
    return res.status(201).json(row);
  }

  try {
    const user = await User.findById(userId);
    const destination = destId && destId !== 'ride-only' ? await Destination.findById(destId) : null;

    if (!destId && !rideName) {
      return res.status(400).json({ message: "Invalid booking parameters" });
    }

    let totalPrice = 0;
    if (destination) {
      totalPrice = (destination.pricePerNight ?? destination.price ?? 100) * numGuests * 3;
    } else if (rideName) {
      totalPrice = 50 * numGuests;
    }

    const newBooking = new Booking({
      userId,
      destinationId: destId === 'ride-only' ? null : destId,
      rideName: rideName || null,
      bookingDate: new Date(dateRaw),
      numberOfGuests: numGuests,
      totalPrice,
      paymentMethod: paymentMethod || "cash_on_delivery",
      paymentStatus: paymentMethod === "cash_on_delivery" ? "pending" : "completed",
      status: "confirmed",
    });

    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    console.error("[Booking] Error creating booking:", error.message);
    res.status(500).json({ message: "Error creating booking", error: String(error) });
  }
};

export const getBookings = async (req, res) => {
  const { userId } = req.query;
  const uid = userId || req.user?.id || mockUserId();

  if (useMock()) {
    const list = mockBookings.filter((b) => b.userId === uid);
    return res.status(200).json(list);
  }

  try {
    const query = uid ? { userId: uid } : {};
    const bookings = await Booking.find(query).populate("destinationId").lean();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings", error });
  }
};

export const cancelBooking = async (req, res) => {
  const { bookingId } = req.params;

  if (useMock()) {
    const idx = mockBookings.findIndex((b) => b._id === bookingId);
    if (idx === -1) {
      return res.status(404).json({ message: "Booking not found" });
    }
    mockBookings.splice(idx, 1);
    return res.status(200).json({ message: "Booking canceled successfully" });
  }

  try {
    const booking = await Booking.findByIdAndDelete(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking canceled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error canceling booking", error });
  }
};
