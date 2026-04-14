import React, { useEffect, useState } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchDestinationById } from '../api/destinations';
import ReviewList from '../features/reviews/ReviewList';
import ReviewForm from '../features/reviews/ReviewForm';
import { formatCurrency } from '../utils/currency';
import './Destination.css';

const Destination = () => {
  const { id } = useParams();
  const location = useLocation();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewTick, setReviewTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        // Priority 1: Check if destination was passed via location state (for AI-generated destinations)
        if (location.state?.destination) {
          if (!cancelled) {
            setDestination(location.state.destination);
            setLoading(false);
          }
          return;
        }

        // Priority 2: Check localStorage cache for AI-generated destination data
        const cacheKey = `__dest_${id}`;
        const cachedData = localStorage.getItem(cacheKey);
        if (cachedData && id.startsWith('ai-')) {
          if (!cancelled) {
            setDestination(JSON.parse(cachedData));
            setLoading(false);
          }
          return;
        }

        // Priority 3: Fetch from API
        const data = await fetchDestinationById(id);
        if (!cancelled) setDestination(data);
      } catch (err) {
        if (!cancelled) setError('Could not load this destination.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id, location.state?.destination]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loader"></div>
        <p>Discovering {id}...</p>
      </div>
    );
  }

  if (error || !destination) {
    return (
      <div className="error-screen">
        <h2>Oops!</h2>
        <p>{error || 'Destination not found'}</p>
        <Link to="/destinations" className="btn-back">← Back to Explore</Link>
      </div>
    );
  }

  const pid = destination._id || destination.id;
  const heroImage = destination.image || destination.images?.[0];

  return (
    <div className="destination-page">
      {/* Hero Header */}
      <section className="destination-hero">
        <div className="hero-image-container">
          <img src={heroImage} alt={destination.name} className="hero-img" />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="destination-tag">{destination.tag || 'Must Visit'}</span>
            <h1 className="destination-title">{destination.name}</h1>
            <div className="destination-meta">
              <span className="location">📍 {destination.country}</span>
              <span className="rating">⭐ {destination.rating || '4.5'}</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="destination-container">
        <div className="destination-grid">
          <div className="main-content">
            <section className="about-section">
              <h2>About this destination</h2>
              <p className="description">{destination.description}</p>
              
              <div className="activities-grid">
                <h3>Highlights</h3>
                <div className="tags">
                  {destination.activities?.map((activity, index) => (
                    <span key={index} className="activity-tag">{activity}</span>
                  ))}
                </div>
              </div>
            </section>

            <section className="gallery-section">
              <h2>Gallery</h2>
              <div className="image-grid">
                {destination.images?.map((img, index) => (
                  <img key={index} src={img} alt={`${destination.name} ${index}`} className="gallery-img" />
                ))}
              </div>
            </section>

            <section className="reviews-section">
              <ReviewList key={`${pid}-${reviewTick}`} destinationId={pid} />
              <ReviewForm destinationId={pid} onSubmitted={() => setReviewTick((t) => t + 1)} />
            </section>
          </div>

            <aside className="booking-sidebar">
              <div className="booking-card">
                <div className="price-header">
                  <span className="price">{formatCurrency(destination.price || 0)}</span>
                  <span className="per-night">/ night</span>
                </div>
                
                <div className="booking-features">
                  <div className="feature">✓ Free Cancellation</div>
                  <div className="feature">✓ Instant Confirmation</div>
                  <div className="feature">✓ 24/7 Support</div>
                </div>

                <Link to={`/booking?destination=${pid}`} className="btn-book">
                  Book Now
                </Link>
                
                <p className="guarantee">No hidden fees. Best price guaranteed.</p>
              </div>

              <div className="planner-cta">
                <h4>Need a plan?</h4>
                <p>Let our AI create a custom itinerary for your trip to {destination.name}.</p>
                <Link to="/planner" className="btn-planner-cta">Try AI Planner</Link>
              </div>
            </aside>
        </div>
      </div>
    </div>
  );
};

export default Destination;
