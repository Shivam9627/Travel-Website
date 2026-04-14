import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import instance from '../services/api';
import './AIPlanner.css';

const AIPlanner = () => {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(3);
  const [pace, setPace] = useState('balanced');
  const [transport, setTransport] = useState('mixed');
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!destination) return;
    
    setLoading(true);
    setErr(null);
    setPlan('');
    
    try {
      const { data } = await instance.post('/api/ai/plan', {
        destination,
        days,
        pace,
        transport,
      });
      setPlan(data.plan);
    } catch (ex) {
      console.error('AI Planning Error:', ex);
      const msg = ex.response?.data?.error || ex.response?.data?.message || ex.message;
      setErr(`AI Planner Error: ${msg}. Make sure the server is running and the OpenAI API key is valid.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-planner-page">
      <section className="planner-hero">
        <motion.div 
          className="planner-hero__content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="ai-badge">AI Powered</div>
          <h1>Your Personal Travel Assistant</h1>
          <p>Describe your dream trip and let our AI handle the rest. From hidden gems to local favorites, we've got you covered.</p>
        </motion.div>
      </section>

      <div className="planner-container">
        <div className="planner-layout">
          <motion.div 
            className="planner-sidebar"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <form onSubmit={handleSubmit} className="planner-form">
              <h3>Plan Settings</h3>
              
              <div className="form-group">
                <label>Where to?</label>
                <input 
                  type="text"
                  value={destination} 
                  onChange={(e) => setDestination(e.target.value)} 
                  placeholder="e.g. Kyoto, Japan"
                  required 
                />
              </div>
              
              <div className="form-group">
                <label>How many days?</label>
                <input
                  type="number"
                  min={1}
                  max={14}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                />
              </div>
              
              <div className="form-group">
                <label>Travel Pace</label>
                <select value={pace} onChange={(e) => setPace(e.target.value)}>
                  <option value="relaxed">Relaxed</option>
                  <option value="balanced">Balanced</option>
                  <option value="packed">Packed</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Transport</label>
                <select value={transport} onChange={(e) => setTransport(e.target.value)}>
                  <option value="mixed">Mixed (Recommended)</option>
                  <option value="car">Car Rental</option>
                  <option value="bike">Bicycle</option>
                  <option value="bus">Public Transit</option>
                </select>
              </div>
              
              <button type="submit" className="planner-submit" disabled={loading}>
                {loading ? 'Generating Magic...' : 'Generate Itinerary'}
              </button>
              
              {err && <div className="planner-error">{err}</div>}
            </form>
          </motion.div>

          <motion.div 
            className="planner-main"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  key="loading"
                  className="planner-loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="ai-loader"></div>
                  <p>Our AI is crafting your perfect journey...</p>
                </motion.div>
              ) : plan ? (
                <motion.div 
                  key="plan"
                  className="planner-result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="plan-header">
                    <h2>Your Itinerary for {destination}</h2>
                    <button onClick={() => window.print()} className="print-btn">Print / Save PDF</button>
                  </div>
                  <div className="plan-content">
                    {plan.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  className="planner-empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="empty-icon">✨</div>
                  <h3>Ready to explore?</h3>
                  <p>Fill out the form to generate your personalized AI travel plan.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AIPlanner;
