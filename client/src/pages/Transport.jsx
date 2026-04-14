import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { fetchTransport } from '../api/transport';
import { formatCurrency } from '../utils/currency';
import './Transport.css';

const Section = ({ title, children }) => (
  <section className="transport-section">
    <motion.h2
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
    >
      {title}
    </motion.h2>
    <div className="transport-section__grid">{children}</div>
  </section>
);

const Card = ({ item, priceLabel }) => (
  <motion.article
    className="transport-card"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -10 }}
    transition={{ duration: 0.4 }}
  >
    <div className="transport-card__img-wrap">
      <img src={item.image} alt={item.name} loading="lazy" />
      <div className="transport-card__badge">{item.category}</div>
    </div>
    <div className="transport-card__body">
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <div className="transport-card__footer">
        <div className="price-tag">
          <span className="label">{priceLabel}</span>
          <span className="amount">{formatCurrency(item.pricePerDay ?? item.pricePerSeat)}</span>
          <span className="unit">{item.pricePerDay ? '/ day' : '/ seat'}</span>
        </div>
        <Link to={`/booking?ride=${item.name}`} className="btn-rent">Book</Link>
      </div>
    </div>
  </motion.article>
);

const Transport = () => {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransport()
      .then(setData)
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="transport-loading">
        <div className="loader"></div>
        <p>Loading transport options...</p>
      </div>
    );
  }

  if (err) {
    return (
      <div className="transport-error">
        <div className="error-icon">⚠️</div>
        <p>{err}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="transport-page">
      <section className="transport-hero">
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Move Your Way
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            From urban e-bikes to luxury sedans, find the perfect ride for your journey.
          </motion.p>
        </div>
      </section>

      <div className="container">
        {data.bikes?.length > 0 && (
          <Section title="Bikes & e-Bikes">
            {data.bikes.map((item) => (
              <Card key={item.id} item={item} priceLabel="Starts from" />
            ))}
          </Section>
        )}

        {data.cars?.length > 0 && (
          <Section title="Cars & SUVs">
            {data.cars.map((item) => (
              <Card key={item.id} item={item} priceLabel="Starts from" />
            ))}
          </Section>
        )}

        {data.buses?.length > 0 && (
          <Section title="Buses & Coaches">
            {data.buses.map((item) => (
              <Card key={item.id} item={item} priceLabel="Per Seat" />
            ))}
          </Section>
        )}
      </div>
    </div>
  );
};

export default Transport;
