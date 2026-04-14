import mongoose from "mongoose";

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: { type: String, default: "" },
  description: {
    type: String,
    required: true,
  },
  image: { type: String, default: "" },
  price: { type: Number, default: 99 },
  rating: { type: Number, default: 4.5 },
  tag: { type: String, default: "" },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  images: {
    type: [String],
    default: [],
  },
  activities: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

destinationSchema.index({ location: "2dsphere" });

const Destination = mongoose.model("Destination", destinationSchema);

export default Destination;