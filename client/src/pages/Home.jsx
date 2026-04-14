import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fetchDestinations } from '../api/destinations';
import { formatCurrency } from '../utils/currency';
import DestinationCard from '../components/DestinationCard';
import SearchBar from '../features/search/SearchBar';
import './Home.css';

const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const heroRef = useRef(null);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  useEffect(() => {
    setLoading(true);
    fetchDestinations()
      .then(d => {
        if (d && d.length > 0) setDestinations(d);
        else console.warn('Empty destinations returned');
      })
      .catch(e => {
        console.error('Home fetch error:', e);
        // Fallback to empty to trigger UI message, but keep loading false
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    navigate(`/destinations?q=${q}`);
  };

  const featured = destinations.slice(0, 6);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <motion.div className="hero__bg" style={{ y: y1 }} />
        <div className="hero__overlay"></div>
        <motion.div 
          className="hero__content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero__badge">✨ The Future of Travel</div>
          <h1 className="hero__title">Discover Your Next <br/><span>Grand Adventure</span></h1>
          <p className="hero__subtitle">Experience world-class itineraries, seamless bookings, and AI-powered travel planning that puts you first.</p>
          
          <form className="hero__search-container" onSubmit={handleSearch}>
            <SearchBar value={q} onChange={setQ} placeholder="Where is your next adventure?" />
            <button type="submit" className="hero__search-btn">
              Explore Now
            </button>
          </form>

          <div className="hero__tags">
            <span>Popular:</span>
            {['Bali', 'Paris', 'Tokyo', 'Iceland'].map(tag => (
              <button key={tag} onClick={() => { setQ(tag); navigate(`/destinations?q=${tag}`); }}>{tag}</button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats__grid">
            {[
              { label: 'Destinations', value: '10k+' },
              { label: 'Happy Travelers', value: '50k+' },
              { label: 'Average Rating', value: '4.9/5' },
              { label: 'AI Support', value: '24/7' }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                className="stat-item"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="featured">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Trending Destinations</h2>
              <p className="section-subtitle">Handpicked places for your next unforgettable journey.</p>
            </div>
            <Link to="/destinations" className="view-all">View All Destinations →</Link>
          </div>

          {loading ? (
            <div className="loading-grid">
              {[1, 2, 3].map(i => <div key={i} className="skeleton-card"></div>)}
            </div>
          ) : (
            <motion.div 
              className="destinations-grid"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {featured.map((dest) => (
                <motion.div key={dest._id || dest.id} variants={itemVariants}>
                  <DestinationCard destination={dest} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Popular Destinations for Quick Booking */}
      <section className="popular-booking">
        <div className="container">
          <div className="section-header">
            <div>
              <h2 className="section-title">Book Your Next Stay</h2>
              <p className="section-subtitle">Choose from our most popular destinations and confirm your spot instantly.</p>
            </div>
          </div>
          <div className="popular-grid">
            {destinations.length > 0 ? (
              destinations.slice(0, 4).map((dest) => (
                <motion.div 
                  key={dest._id || dest.id} 
                  className="popular-item"
                  whileHover={{ y: -10 }}
                >
                  <div className="popular-item__image">
                    <img src={dest.image || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80'} alt={dest.name} />
                    <div className="popular-item__price">{formatCurrency(dest.price)}</div>
                  </div>
                  <div className="popular-item__info">
                    <h3>{dest.name}</h3>
                    <p>{dest.tag}</p>
                    <Link to={`/booking?destination=${dest._id || dest.id}`} className="btn-book-now">
                      Book Now
                    </Link>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="no-data-msg">
                <p>Unable to fetch trending destinations. Please check if the server is running on port 5000.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Ride Booking Section */}
      <section className="ride-booking">
        <div className="container">
          <div className="ride-booking__grid">
            <div className="ride-booking__content">
              <div className="ai-badge">New: AI Ride Finder</div>
              <h2>Need a Ride? <br/>We've Got You Covered</h2>
              <p>Whether you need a luxury car for a city hop or a rugged SUV for an off-road adventure, find and book your perfect transport in seconds.</p>
              <div className="ride-options">
                <div className="ride-option">
                  <span className="icon">🚲</span>
                  <span>e-Bikes</span>
                </div>
                <div className="ride-option">
                  <span className="icon">🚗</span>
                  <span>Premium Cars</span>
                </div>
                <div className="ride-option">
                  <span className="icon">🚌</span>
                  <span>Tour Buses</span>
                </div>
              </div>
              <Link to="/transport" className="btn-rides">Explore Rides</Link>
            </div>
            <div className="ride-booking__visual">
               <img src="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80" alt="Ride booking" />
               <div className="visual-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Section */}
      <section className="ai-cta">
        <div className="container">
          <div className="ai-cta__grid">
            <div className="ai-cta__content">
              <div className="ai-badge">Powered by OpenAI</div>
              <h2>Plan Your Dream Trip <br/>In Seconds</h2>
              <p>Our advanced AI analyzes thousands of data points to create the perfect itinerary just for you. No more endless searching, just pure exploration.</p>
              <Link to="/planner" className="btn-ai">Try AI Planner</Link>
            </div>
            <div className="ai-cta__visual">
               <div className="ai-orb"></div>
               <div className="ai-card ai-card--1">
                  <div className="ai-card__line"></div>
                  <div className="ai-card__line"></div>
               </div>
               <div className="ai-card ai-card--2"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="text-center mb-4">
            <h2 className="section-title">Why Choose SkyTrail?</h2>
            <p className="section-subtitle">We provide the tools you need for the journey of a lifetime.</p>
          </div>
          <div className="features-grid">
            {[
              { icon: '🚀', title: 'Fast & Easy', desc: 'Book your entire trip in just a few clicks with our intuitive interface.' },
              { icon: '🛡️', title: 'Secure Booking', desc: 'Your data and payments are always protected with industry-standard security.' },
              { icon: '💰', title: 'Best Prices', desc: 'We find the most competitive rates for hotels, flights, and transport.' }
            ].map((f, i) => (
              <motion.div 
                key={f.title}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
