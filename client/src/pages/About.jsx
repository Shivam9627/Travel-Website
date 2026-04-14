import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <div className="page about-page">
      <motion.header className="about-hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1>Built for modern travel ecosystems</h1>
        <p>
          SkyTrail brings elegant travel planning together with structured APIs, responsive design, and intelligent
          itinerary tools — ready to launch as a serious travel product.
        </p>
      </motion.header>

      <section className="about-grid">
        <article>
          <h2>Explore & book</h2>
          <p>Rich destination cards, reviews, and a booking flow backed by a real Express API with demo fallback.</p>
        </article>
        <article>
          <h2>Transport</h2>
          <p>Bikes, cars, and buses as first-class catalog entries so tourists can align wheels with terrain.</p>
        </article>
        <article>
          <h2>AI planner</h2>
          <p>Server-side itinerary drafting tuned to pace and transport — extend with your favorite LLM later.</p>
        </article>
        <article>
          <h2>Your data</h2>
          <p>Saved trips live in localStorage; bookings optionally persist when MongoDB is connected.</p>
        </article>
      </section>

      <p className="about-cta">
        <Link to="/destinations" className="btn btn-primary">
          Start exploring
        </Link>
      </p>
    </div>
  );
};

export default About;
