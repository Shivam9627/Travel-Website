import React, { useState } from 'react';
import { submitReview } from '../../api/reviews';
import './ReviewForm.css';

const ReviewForm = ({ destinationId, onSubmitted }) => {
  const [body, setBody] = useState('');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!destinationId || !body.trim()) return;
    setLoading(true);
    setStatus(null);
    try {
      await submitReview({
        destinationId,
        rating,
        title,
        body,
        author: author || 'Guest',
      });
      setBody('');
      setTitle('');
      setStatus('Thanks — your review was posted.');
      onSubmitted?.();
    } catch (err) {
      setStatus(err.message || 'Could not submit review.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h2 className="review-form__title">Leave a review</h2>
      {status ? <p className="review-form__status">{status}</p> : null}
      <label className="review-form__label">
        Display name
        <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Your name" />
      </label>
      <label className="review-form__label">
        Title (optional)
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Short headline" />
      </label>
      <label className="review-form__label">
        Rating
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[5, 4, 3, 2, 1].map((n) => (
            <option key={n} value={n}>
              {n} — {n === 5 ? 'Excellent' : n === 1 ? 'Poor' : 'Good'}
            </option>
          ))}
        </select>
      </label>
      <label className="review-form__label">
        Review
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Share your experience…"
          rows={4}
          required
        />
      </label>
      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? 'Sending…' : 'Submit review'}
      </button>
    </form>
  );
};

export default ReviewForm;
