import { getReviewsFor } from "../data/mockReviews.js";

const extraReviews = [];

export const getReviews = async (req, res) => {
  const { destinationId } = req.params;
  const fromSeed = getReviewsFor(destinationId);
  const fromExtra = extraReviews.filter((r) => r.destinationId === destinationId);
  res.status(200).json([...fromSeed, ...fromExtra]);
};

export const createReview = async (req, res) => {
  const { destinationId, author, rating, title, body } = req.body;
  if (!destinationId || !rating) {
    return res.status(400).json({ message: "destinationId and rating are required" });
  }
  const row = {
    _id: `r-${Date.now()}`,
    destinationId,
    author: author || "Guest",
    rating: Number(rating),
    title: title || "",
    body: body || "",
    createdAt: new Date().toISOString(),
  };
  extraReviews.push(row);
  res.status(201).json(row);
};
