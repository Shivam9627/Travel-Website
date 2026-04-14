import React from 'react';
import './ReviewCard.css';

export default function ReviewCard({ review }) {
  return (
    <article className="review-card">
      <div className="review-card__head">
        <strong>{review.author}</strong>
        <span className="review-card__stars" aria-label={`${review.rating} out of 5`}>
          {'★'.repeat(review.rating)}
          {'☆'.repeat(5 - review.rating)}
        </span>
      </div>
      {review.title ? <h4 className="review-card__title">{review.title}</h4> : null}
      <p className="review-card__body">{review.body}</p>
      {review.createdAt ? (
        <time className="review-card__date" dateTime={review.createdAt}>
          {new Date(review.createdAt).toLocaleDateString()}
        </time>
      ) : null}
    </article>
  );
}
