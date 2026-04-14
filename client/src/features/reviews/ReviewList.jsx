import React, { useEffect, useState } from 'react';
import { fetchReviews } from '../../api/reviews';
import ReviewCard from './ReviewCard';
import './ReviewList.css';

const ReviewList = ({ destinationId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = () => {
    if (!destinationId) return;
    setLoading(true);
    fetchReviews(destinationId)
      .then(setReviews)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [destinationId]);

  if (loading) {
    return <p className="review-list__hint">Loading reviews…</p>;
  }

  if (error) {
    return <p className="review-list__err">Could not load reviews: {error}</p>;
  }

  return (
    <section className="review-list">
      <h2 className="review-list__title">Traveler reviews</h2>
      {reviews.length === 0 ? (
        <p className="review-list__empty">No reviews yet — be the first.</p>
      ) : (
        <div className="review-list__grid">
          {reviews.map((review) => (
            <ReviewCard key={review._id || review.id} review={review} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ReviewList;
