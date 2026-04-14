import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destination",
  },
  bookingDate: {
    type: Date,
    required: true,
  },
  numberOfGuests: {
    type: Number,
    required: true,
    min: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["card", "upi", "cash_on_delivery"],
    default: "cash_on_delivery",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "canceled"],
    default: "pending",
  },
  rideName: {
    type: String,
    default: null,
  },
}, { timestamps: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;