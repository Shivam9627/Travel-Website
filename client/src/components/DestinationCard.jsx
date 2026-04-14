import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatCurrency } from '../utils/currency';
import './DestinationCard.css';

const DestinationCard = ({ destination }) => {
  const id = destination._id || destination.id;
  const image = destination.image || destination.images?.[0];
  const price = destination.price ?? destination.pricePerNight;

  // For AI-generated destinations (with ai- prefixed IDs), pass full data via location state
  // This ensures the detail page has the proper destination data instead of a placeholder
  const isAIGenerated = String(id).startsWith('ai-');
  const navigationState = isAIGenerated 
    ? { state: { destination } }
    : {};

  return (
    <motion.div
      className="destination-card"
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Link to={`/destination/${id}`} {...navigationState} className="card-image-wrapper">
        <img src={image} alt={destination.name} className="card-image" loading="lazy" />
        <div className="card-overlay">
           <span className="card-tag">{destination.tag || 'Popular'}</span>
           <div className="card-rating">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFD700"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
              <span>{destination.rating || '4.5'}</span>
           </div>
        </div>
      </Link>
      
      <div className="card-content">
        <div className="card-location">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>{destination.country}</span>
        </div>
        <h3 className="card-title">
          <Link to={`/destination/${id}`} {...navigationState}>{destination.name}</Link>
        </h3>
        <p className="card-description">{destination.description}</p>
        
        <div className="card-footer">
          <div className="card-price">
            <span className="price-label">Starts from</span>
            <span className="price-value">{formatCurrency(price)}</span>
          </div>
          <Link to={`/destination/${id}`} {...navigationState} className="card-btn">
            Explore
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard;
